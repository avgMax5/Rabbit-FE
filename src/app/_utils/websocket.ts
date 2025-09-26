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
}

export interface OrderBookDiff {
  bunnyName: string;
  bidUpserts: Array<{ price: number; quantity: number }>;
  bidDeletes: Array<{ price: number; quantity: number }>;
  askUpserts: Array<{ price: number; quantity: number }>;
  askDeletes: Array<{ price: number; quantity: number }>;   
  currentPrice: number;
}

class WebSocketService {
  private client: Client | null = null;
  private subscriptions: Map<string, any> = new Map();

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

    const destination = `/topic/bunnies/${bunnyName}/orderbook`;
    
    const subscription = this.client.subscribe(destination, (message) => {
      try {
        const data = JSON.parse(message.body);
        
        // 스냅샷인지 차이인지 구분
        if (data.bids && data.asks && !data.bidUpserts) {
          // 스냅샷 데이터
          onSnapshot(data as OrderBookSnapshot);
        } else {
          // 차이 데이터
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
  }
}

export const webSocketService = new WebSocketService();

