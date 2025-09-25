import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

declare global {
  interface Window {
    SockJS: any;
  }
}

export interface OrderBookSnapshot {
  bunnyName: string;
  bids: Array<{ price: number; quantity: number }>;
  asks: Array<{ price: number; quantity: number }>;
  currentPrice: number;
  serverTime: number;
}

export interface OrderBookDiff {
  bunnyName: string;
  bidUpserts: Array<{ price: number; quantity: number }>;
  bidDeletes: Array<{ price: number; quantity: number }>;
  askUpserts: Array<{ price: number; quantity: number }>;
  askDeletes: Array<{ price: number; quantity: number }>;   
  currentPrice: number;
  serverTime: number;
}

class OrderBookManager {
  private buffer: OrderBookDiff[] = [];
  private lastServerTime: number = 0;
  private isInitialized: boolean = false;
  private onDataUpdate: ((data: OrderBookSnapshot) => void) | null = null;

  constructor(onDataUpdate: (data: OrderBookSnapshot) => void) {
    this.onDataUpdate = onDataUpdate;
  }

  handleSnapshot(snapshot: OrderBookSnapshot) {
    console.log('스냅샷 수신:', snapshot);
    this.lastServerTime = snapshot.serverTime;
    this.isInitialized = true;
    
    // 스냅샷 적용
    this.onDataUpdate?.(snapshot);
    
    // 버퍼된 diff들을 순서대로 적용
    this.flushBuffer();
  }

  handleDiff(diff: OrderBookDiff) {
    console.log('Diff 수신:', diff);
    
    if (!this.isInitialized) {
      // 스냅샷 도착 전: 버퍼에 저장
      console.log('스냅샷 대기 중, diff 버퍼에 저장:', diff);
      this.buffer.push(diff);
    } else if (diff.serverTime > this.lastServerTime) {
      // 스냅샷 도착 후: 즉시 적용
      console.log('Diff 즉시 적용:', diff);
      this.applyDiff(diff);
      this.lastServerTime = diff.serverTime;
    } else {
      console.log('오래된 diff 무시:', diff.serverTime, '<=', this.lastServerTime);
    }
  }

  private flushBuffer() {
    if (this.buffer.length === 0) return;
    
    console.log('버퍼 flush 시작, 버퍼 크기:', this.buffer.length);
    
    // serverTime 오름차순으로 정렬
    const sortedDiffs = this.buffer.sort((a, b) => a.serverTime - b.serverTime);
    
    // 순서대로 적용
    sortedDiffs.forEach(diff => {
      if (diff.serverTime > this.lastServerTime) {
        this.applyDiff(diff);
        this.lastServerTime = diff.serverTime;
      }
    });
    
    this.buffer = [];
    console.log('버퍼 flush 완료');
  }

  private applyDiff(diff: OrderBookDiff) {
    console.log('Diff 적용:', diff);
  }

  reset() {
    this.buffer = [];
    this.lastServerTime = 0;
    this.isInitialized = false;
  }
}

class WebSocketService {
  private client: Client | null = null;
  private subscriptions: Map<string, any> = new Map();
  private orderBookManagers: Map<string, OrderBookManager> = new Map();

  connect() {
    if (this.client?.connected) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
      const API_BASE_URL = "http://localhost:8080/api";
      const TEST_TOKEN = process.env.NEXT_PUBLIC_TEST_TOKEN;
      
      this.client = new Client({
        webSocketFactory: () => new SockJS(`${API_BASE_URL}/ws/orderBook`, {
          withCredentials: true
        } as any),
        connectHeaders: {
          'Authorization': `Bearer ${TEST_TOKEN}`
        },
        debug: (str) => {
          console.log('STOMP Debug:', str);
        },
        onConnect: () => {
          console.log('WebSocket 연결 성공');
          resolve();
        },
        onStompError: (frame) => {
          console.error('STOMP 에러:', frame);
          reject(new Error(frame.headers['message'] || 'WebSocket 연결 실패'));
        },
        onWebSocketError: (error) => {
          console.error('WebSocket 에러:', error);
          reject(error);
        }
      });

      this.client.activate();
    });
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
      this.client = null;
    }
    this.subscriptions.clear();
  }

  // 호가창 스냅샷 요청
  requestOrderBookSnapshot(bunnyName: string) {
    if (!this.client?.connected) {
      console.error('WebSocket이 연결되지 않았습니다.');
      return;
    }

    const TEST_TOKEN = process.env.NEXT_PUBLIC_TEST_TOKEN;

    this.client.publish({
      destination: `/app/bunnies/${bunnyName}/orderbook.snapshot`,
      headers: {
        'Authorization': `Bearer ${TEST_TOKEN}`
      }
    });
  }

  // 호가창 데이터 구독
  subscribeToOrderBook(
    bunnyName: string, 
    onSnapshot: (data: OrderBookSnapshot) => void,
    onDiff: (data: OrderBookDiff) => void
  ) {
    if (!this.client?.connected) {
      console.error('WebSocket이 연결되지 않았습니다.');
      return;
    }

    // OrderBookManager 생성
    const manager = new OrderBookManager(onSnapshot);
    this.orderBookManagers.set(bunnyName, manager);

    const destination = `/topic/bunnies/${bunnyName}/orderbook`;
    
    const subscription = this.client.subscribe(destination, (message) => {
      try {
        console.log('백엔드에서 받은 원본 메시지:', message.body);
        const data = JSON.parse(message.body);
        console.log('파싱된 데이터:', data);
        
        // OrderBookManager를 통해 처리
        const manager = this.orderBookManagers.get(bunnyName);
        if (!manager) return;
        
        // 스냅샷인지 차이인지 구분
        if (data.bids && data.asks && !data.bidUpserts) {
          // 스냅샷 데이터
          manager.handleSnapshot(data as OrderBookSnapshot);
        } else {
          // 차이 데이터
          manager.handleDiff(data as OrderBookDiff);
          // diff 콜백도 호출 (기존 로직 유지)
          onDiff(data as OrderBookDiff);
        }
      } catch (error) {
        console.error('WebSocket 메시지 파싱 오류:', error);
      }
    });

    this.subscriptions.set(destination, subscription);
    return subscription;
  }

  unsubscribeFromOrderBook(bunnyName: string) {
    const destination = `/topic/bunnies/${bunnyName}/orderbook`;
    const subscription = this.subscriptions.get(destination);
    
    if (subscription) {
      subscription.unsubscribe();
      this.subscriptions.delete(destination);
    }
    
    // OrderBookManager 정리
    const manager = this.orderBookManagers.get(bunnyName);
    if (manager) {
      manager.reset();
      this.orderBookManagers.delete(bunnyName);
    }
  }
}

export const webSocketService = new WebSocketService();