import { Client, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TEST_TOKEN = process.env.NEXT_PUBLIC_TEST_TOKEN;

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
  bidDeletes: number[];
  askUpserts: Array<{ price: number; quantity: number }>;
  askDeletes: number[];
  currentPrice?: number;
  serverTime: number;
}

export interface PriceTick {
  bunnyName: string;
  currentPrice: string | number;
  timestamp: number;
}

export interface ClosingPriceUpdate {
  bunnyName: string;
  closingPrice: string | number;
  date: string;
}

export function toNum(n: string | number | null | undefined): number {
  if (n === null || n === undefined) return 0;
  if (typeof n === 'number') return Number.isFinite(n) ? n : 0;
  const parsed = Number(n);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function calcFluctuationRate(currentPrice: number, closingPrice: number): number {
  if (!closingPrice || closingPrice === 0) return 0;
  return ((currentPrice - closingPrice) / closingPrice) * 100;
}

class WebSocketService {
  private client: Client | null = null;
  private subscriptions: Map<string, StompSubscription> = new Map();
  private desiredSubscriptions: Map<string, (data: any) => void> = new Map();

  connect() {
    if (this.client?.connected) return Promise.resolve();

    return new Promise<void>((resolve, reject) => {
      this.client = new Client({
        webSocketFactory: () =>
          new SockJS(`${API_BASE_URL}/ws/orderBook`, { withCredentials: true } as any),

        // 자동 재연결 & 하트비트
        reconnectDelay: 5000,     // 5초 간격 재시도
        heartbeatIncoming: 10000, // 서버 → 클라
        heartbeatOutgoing: 10000, // 클라 → 서버

        // 연결 직전에 최신 토큰 반영
        beforeConnect: () => {
          const token = process.env.NEXT_PUBLIC_TEST_TOKEN ?? TEST_TOKEN;
          this.client!.connectHeaders = { Authorization: `Bearer ${token}` };
        },

        debug: (str) => {
          // 개발 중에는 켜두고, 운영에서는 끄는 걸 권장
          console.log('STOMP Debug:', str);
        },

        onConnect: () => {
          console.log('WebSocket 연결 성공');
          // (재)연결 시 의도한 모든 구독 복구
          this.resubscribeAll();
          resolve();
        },

        onStompError: (frame) => {
          console.error('STOMP 에러:', frame);
          if (!this.client?.connected) {
            reject(new Error(frame.headers['message'] || 'WebSocket 연결 실패'));
          }
        },

        onWebSocketError: (error) => {
          console.error('WebSocket 에러:', error);
          if (!this.client?.connected) {
            reject(error);
          }
        },

        onWebSocketClose: () => {
          console.warn('WebSocket 닫힘: 자동 재연결 대기 중...');
        },
      });

      this.client.activate();
    });
  }

  disconnect() {
    try {
      this.subscriptions.forEach((sub) => {
        try { sub.unsubscribe(); } catch {}
      });
      this.subscriptions.clear();
      this.desiredSubscriptions.clear();
      this.client?.deactivate();
    } finally {
      this.client = null;
    }
  }

  // 공통 구독: 의도 저장 → 실제 subscribe (연결 상태에 따라 지연될 수 있음)
  private subscribeRaw(destination: string, handler: (data: any) => void) {
    // 중복 방지: 기존 동일 목적지 구독 삭제
    if (this.desiredSubscriptions.has(destination)) {
      this.unsubscribe(destination);
    }

    this.desiredSubscriptions.set(destination, handler);

    if (!this.client?.connected) {
      console.warn('연결 전 구독 요청 — 연결되면 자동 재구독됩니다:', destination);
      return;
    }

    const sub = this.client.subscribe(destination, (message) => {
      try {
        const data = JSON.parse(message.body);
        handler(data);
      } catch (err) {
        console.error('메시지 파싱 오류:', err, message.body);
      }
    });
    this.subscriptions.set(destination, sub);
  }

  // 실제 구독 해제 + 의도 삭제
  private unsubscribe(destination: string) {
    const sub = this.subscriptions.get(destination);
    if (sub) {
      try { sub.unsubscribe(); } catch {}
      this.subscriptions.delete(destination);
    }
    this.desiredSubscriptions.delete(destination);
  }

  // (재)연결 직후: 저장된 의도대로 전부 재구독
  private resubscribeAll() {
    // 기존 실제 구독은 폐기
    this.subscriptions.forEach((sub) => {
      try { sub.unsubscribe(); } catch {}
    });
    this.subscriptions.clear();

    // 의도대로 다시 subscribe
    this.desiredSubscriptions.forEach((handler, destination) => {
      const sub = this.client!.subscribe(destination, (message) => {
        try {
          const data = JSON.parse(message.body);
          handler(data);
        } catch (err) {
          console.error('메시지 파싱 오류:', err, message.body);
        }
      });
      this.subscriptions.set(destination, sub);
    });
  }

  // OrderBook (스냅샷 1회 + diff 다회차)
  requestOrderBookSnapshot(bunnyName: string) {
    if (!this.client?.connected) {
      console.error('WebSocket이 연결되지 않았습니다.');
      return;
    }
    const token = process.env.NEXT_PUBLIC_TEST_TOKEN ?? TEST_TOKEN;
    this.client.publish({
      destination: `/app/bunnies/${bunnyName}/orderbook.snapshot`,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  subscribeToOrderBook(
    bunnyName: string,
    onSnapshot: (data: OrderBookSnapshot) => void,
    onDiff: (data: OrderBookDiff) => void
  ) {
    const destination = `/topic/bunnies/${bunnyName}/orderbook`;
    this.subscribeRaw(destination, (data) => {
      // 스냅샷/차이 구분
      if (data.bids && data.asks && !data.bidUpserts) {
        onSnapshot(data as OrderBookSnapshot);
      } else {
        onDiff(data as OrderBookDiff);
      }
    });
  }

  unsubscribeFromOrderBook(bunnyName: string) {
    this.unsubscribe(`/topic/bunnies/${bunnyName}/orderbook`);
  }

  // 현재가 틱 (다회차)
  subscribeToCurrentPrice(bunnyName: string, onTick: (tick: PriceTick) => void) {
    const destination = `/topic/price/${bunnyName}`;
    this.subscribeRaw(destination, (data) => onTick(data as PriceTick));
  }
  unsubscribeFromCurrentPrice(bunnyName: string) {
    this.unsubscribe(`/topic/price/${bunnyName}`);
  }

  // 종가 (자정 1회)
  subscribeToClosingPrice(bunnyName: string, onClose: (close: ClosingPriceUpdate) => void) {
    const destination = `/topic/close/${bunnyName}`;
    this.subscribeRaw(destination, (data) => onClose(data as ClosingPriceUpdate));
  }
  unsubscribeFromClosingPrice(bunnyName: string) {
    this.unsubscribe(`/topic/close/${bunnyName}`);
  }
}

export const webSocketService = new WebSocketService();
