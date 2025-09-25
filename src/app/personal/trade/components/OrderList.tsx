"use client";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Bunny } from "../../../_store/bunnyStore";
import { getOrderBookSnapshot, OrderBookData, cancelOrder, getOrderList } from "../../../_api/bunnyAPI";
import { webSocketService, OrderBookSnapshot, OrderBookDiff } from "../../../_utils/websocket";

interface OrderItem {
  id: number;
  quantity: number;
  price: string;
  changeRate: string;
  order_type: 'BUY' | 'SELL';
}

interface OrderHistoryItem {
  order_id: number;
  orderTime: string;
  orderType: 'BUY' | 'SELL';
  quantity: number;
  unitPrice: number;
  settlementAmount: number;
  changeRate: string;
}

interface OrderListProps {
  activeOrderTab: string;
  setActiveOrderTab: (tab: string) => void;
  bunny: Bunny;
}

export default function OrderList({ activeOrderTab, setActiveOrderTab, bunny }: OrderListProps) {
  const [orderBookData, setOrderBookData] = useState<OrderBookData | null>(null);
  const [orderHistoryData, setOrderHistoryData] = useState<OrderHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const wsConnected = useRef(false);
  
  const maxQuantity = orderBookData ? Math.max(
    ...orderBookData.bids.map(bid => bid.quantity),
    ...orderBookData.asks.map(ask => ask.quantity)
  ) : 0;
  
  const getQuantityPercentage = (quantity: number) => {
    return maxQuantity > 0 ? (quantity / maxQuantity) * 100 : 0;
  };

  const calculateChangeRate = (price: number, currentPrice: number): string => {
    const changeRate = ((price - currentPrice) / currentPrice) * 100;
    const sign = changeRate >= 0 ? '+' : '';
    return `${sign}${changeRate.toFixed(2)}%`;
  };

  const formatDateTime = (dateTimeString: string): string => {
    try {
      const date = new Date(dateTimeString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    } catch (error) {
      console.error('날짜 포맷팅 오류:', error);
      return dateTimeString;
    }
  };

  // WebSocket 연결
  const connectWebSocket = async () => {
    try {
      await webSocketService.connect();
      wsConnected.current = true;
      console.log('WebSocket 연결 완료');
    } catch (error) {
      console.error('WebSocket 연결 실패:', error);
      wsConnected.current = false;
    }
  };

  // 호가창 스냅샷 처리
  const handleOrderBookSnapshot = (snapshot: OrderBookSnapshot) => {
    console.log('호가창 스냅샷 수신:', snapshot);
    setOrderBookData({
      bunnyName: snapshot.bunnyName,
      bids: snapshot.bids,
      asks: snapshot.asks,
      currentPrice: snapshot.currentPrice,
      serverTime: snapshot.serverTime
    });
  };

  // 호가창 차이 처리
  const handleOrderBookDiff = (diff: OrderBookDiff) => {
    console.log('호가창 차이 수신:', diff);
    
    setOrderBookData(prevData => {
      if (!prevData) return prevData;

      // 기존 데이터 복사
      let newBids = [...prevData.bids];
      let newAsks = [...prevData.asks];

      // Bid 업데이트/삭제
      diff.bidUpserts.forEach(upsert => {
        const index = newBids.findIndex(bid => bid.price === upsert.price);
        if (index >= 0) {
          newBids[index] = upsert;
        } else {
          newBids.push(upsert);
        }
      });

      diff.bidDeletes.forEach(del => {
        newBids = newBids.filter(bid => bid.price !== del.price);
      });

      // Ask 업데이트/삭제
      diff.askUpserts.forEach(upsert => {
        const index = newAsks.findIndex(ask => ask.price === upsert.price);
        if (index >= 0) {
          newAsks[index] = upsert;
        } else {
          newAsks.push(upsert);
        }
      });

      diff.askDeletes.forEach(del => {
        newAsks = newAsks.filter(ask => ask.price !== del.price);
      });

      // 가격순 정렬
      newBids.sort((a, b) => b.price - a.price);
      newAsks.sort((a, b) => a.price - b.price);

      return {
        ...prevData,
        bids: newBids,
        asks: newAsks,
        currentPrice: diff.currentPrice,
        serverTime: diff.serverTime
      };
    });
  };

  const fetchOrderHistory = async () => {
    setIsLoading(true);
    try {
      const response = await getOrderList(bunny.bunny_name);
      console.log('API 응답 구조:', response);
      
      const orderList = response?.orders || [];
      
      const mappedOrderHistoryData = orderList.map((orders: any) => ({
        order_id: orders.order_id,
        orderTime: formatDateTime(orders.ordered_at),
        orderType: orders.order_type,
        quantity: orders.quantity,
        unitPrice: orders.unit_price,
        settlementAmount: (orders.quantity || orders.order_quantity || 0) * (orders.unit_price || 0),
        changeRate: orders.changeRate || '0.00%'
      }));
      setOrderHistoryData(mappedOrderHistoryData);
    } catch (error) {
      console.error('주문 내역 데이터 가져오기 실패:', error);
      setOrderHistoryData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrderBook = async () => {
    setIsLoading(true);
    try {
      if (wsConnected.current) {
        // 1. REST API로 초기 스냅샷 가져오기
        console.log('REST API로 스냅샷 요청:', bunny.bunny_name);
        const snapshot = await getOrderBookSnapshot(bunny.bunny_name);
        console.log('스냅샷 수신:', snapshot);
        
        // 2. 스냅샷으로 상태 세팅
        setOrderBookData(snapshot);
        
        // 3. WebSocket 구독 시작 (이미 연결되어 있음)
        console.log('WebSocket 구독 시작:', bunny.bunny_name);
        webSocketService.subscribeToOrderBook(
          bunny.bunny_name,
          handleOrderBookSnapshot,
          handleOrderBookDiff
        );
      } else {
        // HTTP API로 폴백
        const data = await getOrderBookSnapshot(bunny.bunny_name);
        setOrderBookData(data);
      }
    } catch (error) {
      console.error('Orderbook 데이터 가져오기 실패:', error);
      setOrderBookData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    if (window.confirm('정말로 이 주문을 취소하시겠습니까?')) {
      try {
        await cancelOrder(bunny.bunny_name, orderId.toString());
        await fetchOrderHistory();
        alert('주문이 취소되었습니다.');
      } catch (error) {
        console.error('주문 취소 실패:', error);
        alert('주문 취소에 실패했습니다.');
      }
    }
  };

  useEffect(() => {
    if (bunny.bunny_name) {
      if (activeOrderTab === '호가창') {
        fetchOrderBook();
      } else if (activeOrderTab === '내 주문') {
        fetchOrderHistory();
      }
    }
  }, [bunny.bunny_name, activeOrderTab]);

  // WebSocket 연결 및 정리
  useEffect(() => {
    const initializeWebSocket = async () => {
      await connectWebSocket();
    };

    initializeWebSocket();

    return () => {
      // 컴포넌트 언마운트 시 WebSocket 정리
      if (bunny.bunny_name) {
        webSocketService.unsubscribeFromOrderBook(bunny.bunny_name);
      }
      webSocketService.disconnect();
    };
  }, []);

  // bunny 변경 시 이전 구독 해제
  useEffect(() => {
    return () => {
      if (bunny.bunny_name) {
        webSocketService.unsubscribeFromOrderBook(bunny.bunny_name);
      }
    };
  }, [bunny.bunny_name]);


  return (
    <OrderListWrapper>
      <OrderTabContainer>
        <OrderTabButton
          $active={activeOrderTab === '호가창'}
          onClick={() => setActiveOrderTab('호가창')}
        >
          호가창
        </OrderTabButton>
        <OrderTabButton 
          $active={activeOrderTab === '내 주문'}
          onClick={() => setActiveOrderTab('내 주문')}
        >
          내 주문
        </OrderTabButton>
      </OrderTabContainer>
      
      <OrderArea>
        {activeOrderTab === '호가창' ? (
          <>
            <OrderHeader>
              <HeaderLeftSection>
                <HeaderCell>수량</HeaderCell>
              </HeaderLeftSection>
              <HeaderRightSection>
                <HeaderCell>가격</HeaderCell>
                <HeaderCell>등락비</HeaderCell>
              </HeaderRightSection>
            </OrderHeader>
            <OrderItemsContainer>
              {isLoading ? (
                <EmptyState>데이터를 불러오는 중...</EmptyState>
              ) : orderBookData ? (
                <>
                  {orderBookData.bids.map((bid, index) => (
                    <OrderItem key={`bid-${index}`}>
                      <OrderLeftArea>
                        <OrderBar 
                          $orderType="BUY"
                          $widthPercentage={getQuantityPercentage(bid.quantity)}
                        >
                          {bid.quantity}
                        </OrderBar>
                      </OrderLeftArea>
                      <OrderRightArea>
                        <OrderPrice>{bid.price.toLocaleString()}</OrderPrice>
                        <OrderChange $isPositive={bid.price >= orderBookData.currentPrice}>
                          {calculateChangeRate(bid.price, orderBookData.currentPrice)}
                        </OrderChange>
                      </OrderRightArea>
                    </OrderItem>
                  ))}
                  
                  {orderBookData.asks.map((ask, index) => (
                    <OrderItem key={`ask-${index}`}>
                      <OrderLeftArea>
                        <OrderBar 
                          $orderType="SELL"
                          $widthPercentage={getQuantityPercentage(ask.quantity)}
                        >
                          {ask.quantity}
                        </OrderBar>
                      </OrderLeftArea>
                      <OrderRightArea>
                        <OrderPrice>{ask.price.toLocaleString()}</OrderPrice>
                        <OrderChange $isPositive={ask.price >= orderBookData.currentPrice}>
                          {calculateChangeRate(ask.price, orderBookData.currentPrice)}
                        </OrderChange>
                      </OrderRightArea>
                    </OrderItem>
                  ))}
                  
                  {orderBookData.bids.length === 0 && orderBookData.asks.length === 0 && (
                    <EmptyState>호가 데이터가 없습니다.</EmptyState>
                  )}
                </>
              ) : (
                <EmptyState>호가 데이터가 없습니다.</EmptyState>
              )}
            </OrderItemsContainer>
          </>
        ) : (
          <OrderHistoryContainer>
            <OrderHistoryHeader>
              <HeaderCell>주문시간</HeaderCell>
              <HeaderCell>주문 유형</HeaderCell>
              <HeaderCell>수량</HeaderCell>
              <HeaderCell>단가</HeaderCell>
              <HeaderCell>정산금액</HeaderCell>
            </OrderHistoryHeader>
            {orderHistoryData.length > 0 ? (
              orderHistoryData.map((item) => (
                <OrderHistoryItem key={item.order_id}>
                  <HistoryCell>{item.orderTime}</HistoryCell>
                  <HistoryCell>
                    <OrderTypeBadge $orderType={item.orderType}>
                      {item.orderType}
                    </OrderTypeBadge>
                  </HistoryCell>
                  <HistoryCell>{item.quantity}</HistoryCell>
                  <HistoryCell>{item.unitPrice.toLocaleString()}</HistoryCell>
                  <HistoryCell>
                    <SettlementAmountContainer>
                      <SettlementAmount>{item.settlementAmount.toLocaleString()}</SettlementAmount>
                      <CancelButton 
                        onClick={() => handleCancelOrder(item.order_id.toString())}
                        title="주문 취소"
                      >
                        취소하기
                      </CancelButton>
                    </SettlementAmountContainer>
                  </HistoryCell>
                </OrderHistoryItem>
              ))
            ) : (
              <EmptyState>주문 내역이 없습니다.</EmptyState>
            )}
          </OrderHistoryContainer>
        )}
      </OrderArea>
    </OrderListWrapper>
  );
}

const OrderListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 0.75rem;
  overflow: hidden;
`;

const OrderTabContainer = styled.div`
  display: flex;
  gap: 0.2rem;
`;

const OrderTabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 0.5rem 0.5rem 0 0;
  
  ${({ $active }) => {
    if ($active) {
      return `
        background-color: rgba(252, 252, 252, 0.34);
        color: #FAE7C1;
      `;
    } else {
      return `
        background-color: rgba(255, 255, 255, 0.56);
        color: #697077;
        &:hover {
          background-color: rgba(255, 255, 255, 0.7);
        }
      `;
    }
  }}
`;

const OrderArea = styled.div`
  flex: 1;
  border-radius: 0 0 0.75rem 0.75rem;
  padding: 0;
  overflow: hidden;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: rgba(252, 252, 252, 0.4);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 0.8rem;
  font-weight: 600;
  color: #555;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const HeaderLeftSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const HeaderRightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
`;

const OrderItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  gap: 0.5rem;
  padding: 0.5rem 0;
  background-color: rgba(252, 252, 252, 0.25);
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 3px;
  }
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: rgba(252, 252, 252, 0.34);
  transition: background-color 0.2s ease;
  
  &:hover {
    backgroun-color: rgba(252, 252, 252, 0.5);
  }
`;

const OrderLeftArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const OrderRightArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;

const OrderBar = styled.div<{ $orderType: 'BUY' | 'SELL'; $widthPercentage: number }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 1.5rem;
  width: ${({ $widthPercentage }) => $widthPercentage}%;
  min-width: 2rem;
  padding: 0 0.5rem;
  background-color: ${({ $orderType }) => $orderType === 'BUY' ? 'rgba(255, 102, 102, 0.44)' : 'rgba(82, 131, 255, 0.44)'};
  border-radius: 0.25rem;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  transition: width 0.3s ease;
`;

const OrderPrice = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
`;

const OrderChange = styled.span<{ $isPositive: boolean }>`
  font-size: 0.7rem;
  font-weight: 600;
  color: ${({ $isPositive }) => $isPositive ? '#e74c3c' : '#4a90e2'};
`;

// Order History Styles
const OrderHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  background-color: rgba(252, 252, 252, 0.25);
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 3px;
  }
`;

const OrderHistoryHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 0.8fr 1fr 1.2fr;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: rgba(252, 252, 252, 0.4);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 0.8rem;
  font-weight: 600;
  color: #555;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const OrderHistoryItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 0.8fr 1fr 1.2fr;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s ease;
  
  &:hover {
    background: rgba(252, 252, 252, 0.3);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const HeaderCell = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 600;
  color: #555;
`;

const SortIcon = styled.span`
  font-size: 0.7rem;
  color: #FAE7C1;
`;

const HistoryCell = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: #333;
`;

const OrderTypeBadge = styled.span<{ $orderType: 'BUY' | 'SELL' }>`
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.7rem;
  font-weight: 600;
  background-color: ${({ $orderType }) => $orderType === 'BUY' ? '#e74c3c' : '#4a90e2'};
  color: white;
`;

const SettlementAmountContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const SettlementAmount = styled.span`
  font-size: 0.8rem;
  color: #333;
  transition: opacity 0.2s ease;
  
  ${OrderHistoryItem}:hover & {
    opacity: 0;
  }
`;

const CancelButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 24px;
  border: 1px solid #e74c3c;
  border-radius: 0.25rem;
  background-color: transparent;
  color: #e74c3c;
  font-size: 0.65rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #e74c3c;
    color: white;
  }
  
  ${OrderHistoryItem}:hover & {
    opacity: 1;
  }
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #999;
  font-size: 0.9rem;
  font-weight: 500;
`;

