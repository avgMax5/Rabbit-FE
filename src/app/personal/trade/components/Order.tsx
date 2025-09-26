"use client";
import styled from "styled-components";
import Button from '../../../_shared/components/Button';
import { useState, useEffect } from "react";
import { Bunny, useBunnyStore } from "../../../_store/bunnyStore";
import { useUserStore } from "../../../_store/userStore";
import { validateOrderAmount, handlePriceIncrease } from '../utils/orderValidate';
import { createOrder, getBunnyContext } from '../../../_api/bunnyAPI';
import { webSocketService, OrderBookSnapshot, OrderBookDiff } from '../../../_utils/websocket';

interface OrderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bunny: Bunny;
}

interface BunnyContext {
  is_liked: boolean;
  buyable_amount: number;
  sellable_quantity: number;
}

export default function Order({ activeTab, setActiveTab, bunny }: OrderProps) {
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [bunnyContext, setBunnyContext] = useState<BunnyContext | null>(null);
  const [orderBook, setOrderBook] = useState<OrderBookSnapshot | null>(null);
  const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);
  const { user } = useUserStore();

  useEffect(() => {
    const fetchBunnyContext = async () => {
      try {
        const context = await getBunnyContext(bunny.bunny_name);
        setBunnyContext(context);
      } catch (error) {
        console.error('Bunny context 가져오기 실패:', error);
      }
    };

    fetchBunnyContext();
  }, [bunny.bunny_name]);

  // 웹소켓 연결 및 호가창 구독
  useEffect(() => {
    const connectWebSocket = async () => {
      try {
        await webSocketService.connect();
        setIsWebSocketConnected(true);
        
        // 호가창 스냅샷 요청
        webSocketService.requestOrderBookSnapshot(bunny.bunny_name);
        
        // 호가창 구독
        const subscription = webSocketService.subscribeToOrderBook(
          bunny.bunny_name,
          (snapshot: OrderBookSnapshot) => {
            console.log('호가창 스냅샷 수신:', snapshot);
            setOrderBook(snapshot);
          },
          (diff: OrderBookDiff) => {
            console.log('호가창 차이 수신:', diff);
            // 차이 데이터를 기반으로 호가창 업데이트
            setOrderBook(prev => {
              if (!prev) return null;
              
              // 새로운 호가창 데이터 생성
              const newOrderBook = { ...prev };
              
              // 매수 호가 업데이트
              diff.bidUpserts.forEach(upsert => {
                const existingIndex = newOrderBook.bids.findIndex(bid => bid.price === upsert.price);
                if (existingIndex >= 0) {
                  newOrderBook.bids[existingIndex] = upsert;
                } else {
                  newOrderBook.bids.push(upsert);
                }
              });
              
              diff.bidDeletes.forEach(del => {
                newOrderBook.bids = newOrderBook.bids.filter(bid => bid.price !== del.price);
              });
              
              // 매도 호가 업데이트
              diff.askUpserts.forEach(upsert => {
                const existingIndex = newOrderBook.asks.findIndex(ask => ask.price === upsert.price);
                if (existingIndex >= 0) {
                  newOrderBook.asks[existingIndex] = upsert;
                } else {
                  newOrderBook.asks.push(upsert);
                }
              });
              
              diff.askDeletes.forEach(del => {
                newOrderBook.asks = newOrderBook.asks.filter(ask => ask.price !== del.price);
              });
              
              // 가격 정렬
              newOrderBook.bids.sort((a, b) => b.price - a.price);
              newOrderBook.asks.sort((a, b) => a.price - b.price);
              
              // 현재 가격 업데이트
              if (diff.currentPrice) {
                newOrderBook.currentPrice = diff.currentPrice;
              }
              
              return newOrderBook;
            });
          }
        );
        
        return () => {
          if (subscription) {
            webSocketService.unsubscribeFromOrderBook(bunny.bunny_name);
          }
        };
      } catch (error) {
        console.error('웹소켓 연결 실패:', error);
        setIsWebSocketConnected(false);
      }
    };

    connectWebSocket();
    
    // 컴포넌트 언마운트 시 웹소켓 연결 해제
    return () => {
      webSocketService.unsubscribeFromOrderBook(bunny.bunny_name);
    };
  }, [bunny.bunny_name]);


  const onPriceIncrease = (percentage: number) => {
    const currentPrice = orderBook?.currentPrice || bunny.current_price;
    const newPrice = handlePriceIncrease(price, currentPrice, percentage);
    setPrice(newPrice);
  };

  // 호가창에서 가격 선택
  const selectPrice = (selectedPrice: number) => {
    setPrice(selectedPrice.toString());
  };

  const orderValidation = validateOrderAmount(quantity, price);
  const isOrderValid = orderValidation.isValid;

  const handleOrder = async () => {
    try {
      const orderRequest = {
        quantity: parseFloat(quantity),
        unit_price: parseFloat(price),
        order_type: activeTab === '매수' ? 'BUY' : 'SELL'
      };

      await createOrder(bunny.bunny_name, orderRequest);
      
      setQuantity('');
      setPrice('');
      alert(`${activeTab} 주문이 성공적으로 처리되었습니다.`);
    } catch (error) {
      console.error('주문 처리 중 오류 발생:', error);
    }
  };

  const handleReset = () => {
    setQuantity('');
    setPrice('');
  };

  return (
    <>
      <TabContainer>
        <TabButton 
          $active={activeTab === '매수'} 
          $type="buy"
          onClick={() => setActiveTab('매수')}
        >
          매수
        </TabButton>
        <TabButton 
          $active={activeTab === '매도'} 
          $type="sell"
          onClick={() => setActiveTab('매도')}
        >
          매도
        </TabButton>
      </TabContainer>
      <TradeArea>
        <OrderForm>
          {/* 현재 가격 및 웹소켓 연결 상태 */}
          <OrderRow>
            <OrderLabel>현재 가격</OrderLabel>
            <OrderValue>
              {orderBook?.currentPrice?.toLocaleString() || bunny.current_price?.toLocaleString() || 0} C
              {isWebSocketConnected && <ConnectionStatus $connected={true}>●</ConnectionStatus>}
              {!isWebSocketConnected && <ConnectionStatus $connected={false}>●</ConnectionStatus>}
            </OrderValue>
          </OrderRow>
          
          <OrderRow>
            <OrderLabel>{activeTab === '매수' ? '주문 가능' : '매도 가능'}</OrderLabel>
            <OrderValue>
              {activeTab === '매수' 
                ? `${bunnyContext?.buyable_amount?.toLocaleString() || 0} C`
                : `${bunnyContext?.sellable_quantity || 0} C`
              }
            </OrderValue>
          </OrderRow>
          
          <OrderRow>
            <OrderLabel>주문 수량</OrderLabel>
            <OrderInput>
              <input 
                type="text" 
                placeholder="0" 
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <span>BNY</span>
            </OrderInput>
          </OrderRow>
          
          <OrderRow>
            <OrderLabel>{activeTab === '매수' ? '매수 가격' : '매도 가격'}</OrderLabel>
            <OrderInput>
              <input 
                type="text" 
                placeholder="0" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <span>C</span>
            </OrderInput>
          </OrderRow>
          
          <PercentageButtons>
            <PercentageButton 
              onClick={() => onPriceIncrease(10)}
            >
              +10%
            </PercentageButton>
            <PercentageButton 
              onClick={() => onPriceIncrease(20)}
            >
              +20%
            </PercentageButton>
            <PercentageButton 
              onClick={() => onPriceIncrease(50)}
            >
              +50%
            </PercentageButton>
            <PercentageButton 
              onClick={() => onPriceIncrease(100)}
            >
              +100%
            </PercentageButton>
          </PercentageButtons>
          
          <OrderRow>
            <OrderLabel>주문 총액</OrderLabel>
            <OrderValue>
              {quantity && price 
                ? `${Math.round(parseFloat(quantity) * parseFloat(price) * 1.001).toLocaleString()} C`
                : '0 C'
              }
            </OrderValue>
          </OrderRow>
          
          {/* 간단한 호가창 표시 */}
          {orderBook && (
            <OrderBookSection>
              <OrderBookTitle>호가창</OrderBookTitle>
              <OrderBookContainer>
                <BidSection>
                  <BidTitle>매수</BidTitle>
                  {orderBook.bids.slice(0, 3).map((bid, index) => (
                    <OrderBookRow 
                      key={`bid-${bid.price}`}
                      onClick={() => selectPrice(bid.price)}
                      $type="bid"
                    >
                      <span>{bid.price.toLocaleString()}</span>
                      <span>{bid.quantity}</span>
                    </OrderBookRow>
                  ))}
                </BidSection>
                <AskSection>
                  <AskTitle>매도</AskTitle>
                  {orderBook.asks.slice(0, 3).map((ask, index) => (
                    <OrderBookRow 
                      key={`ask-${ask.price}`}
                      onClick={() => selectPrice(ask.price)}
                      $type="ask"
                    >
                      <span>{ask.price.toLocaleString()}</span>
                      <span>{ask.quantity}</span>
                    </OrderBookRow>
                  ))}
                </AskSection>
              </OrderBookContainer>
            </OrderBookSection>
          )}
          
          <ActionButtons>
            <Button variant="secondary" size="small" onClick={handleReset}>초기화</Button>
            <ButtonContainer>
              <Button 
                variant="primary" 
                size="small"
                disabled={!isOrderValid}
                onClick={handleOrder}
                onMouseEnter={() => {
                  if (!isOrderValid) {
                    setShowTooltip(true);
                  }
                }}
                onMouseLeave={() => setShowTooltip(false)}
              >
                {activeTab === '매수' ? '매수하기' : '매도하기'}
              </Button>
              {showTooltip && !isOrderValid && (
                <Tooltip>
                  최소 주문 금액은 1,000C입니다
                </Tooltip>
              )}
            </ButtonContainer>
          </ActionButtons>
        </OrderForm>
      </TradeArea>
    </>
  );
}


const TabContainer = styled.div`
  display: flex;
  gap: 0.2rem;
  margin-bottom: 0;
`;

const TabButton = styled.button<{ $active: boolean; $type: 'buy' | 'sell' }>`
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: none;
  border-bottom: none;
  font-size: 0.9rem;
  font-weight: 600;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 0.5rem 0.5rem 0 0;
  
  ${({ $active, $type }) => {
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

const TradeArea = styled.div`
  flex: 1;
  background-color: rgba(252, 252, 252, 0.34);
  border-radius: 0 0 0.75rem 0.75rem;
  padding: 1rem;
`;

const OrderForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
`;

const OrderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`;

const OrderLabel = styled.span`
  font-size: 0.9rem;
  font-weight: 800;
  color: #333;
`;

const OrderValue = styled.span`
  font-size: 0.9rem;
  color: #FAE7C1;
  font-weight: 700;
`;

const OrderInput = styled.div`
  display: flex;
  align-items: center;
  background: #f0f8ff;
  border-radius: 0.5rem;
  padding: 0.4rem;
  min-width: 100px;
  max-width: 110px;
  
  input {
    border: none;
    background: transparent;
    outline: none;
    flex: 1;
    font-size: 0.85rem;
    color: #333;
    min-width: 0;
    
    &::placeholder {
      color: #999;
    }
  }
  
  span {
    font-size: 0.75rem;
    color: #666;
    margin-left: 0.2rem;
    white-space: nowrap;
    flex-shrink: 0;
  }
`;

const PercentageButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

const PercentageButton = styled.button`
  padding: 0.3rem 0.6rem;
  border: none;
  border-radius: 0.4rem;
  font-size: 0.7rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  background-color: rgba(27, 101, 164, 1);
  
  &:hover {
    background-color: rgba(16, 145, 255, 0.7);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
    background-color: rgba(16, 145, 255, 0.9);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const ButtonContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
  padding: 8px 12px;
  background-color: rgba(0, 0, 0, 0.95);
  color: white;
  font-size: 12px;
  font-weight: 500;
  border-radius: 6px;
  white-space: nowrap;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  pointer-events: none;
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: rgba(0, 0, 0, 0.95);
  }
`;

const ConnectionStatus = styled.span<{ $connected: boolean }>`
  margin-left: 0.5rem;
  color: ${({ $connected }) => $connected ? '#4CAF50' : '#F44336'};
  font-size: 0.8rem;
`;

const OrderBookSection = styled.div`
  margin-top: 1rem;
  padding: 0.8rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const OrderBookTitle = styled.h4`
  margin: 0 0 0.8rem 0;
  font-size: 0.9rem;
  font-weight: 700;
  color: #333;
  text-align: center;
`;

const OrderBookContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const BidSection = styled.div`
  flex: 1;
`;

const AskSection = styled.div`
  flex: 1;
`;

const BidTitle = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: #4CAF50;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const AskTitle = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: #F44336;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const OrderBookRow = styled.div<{ $type: 'bid' | 'ask' }>`
  display: flex;
  justify-content: space-between;
  padding: 0.3rem 0.5rem;
  margin-bottom: 0.2rem;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.8rem;
  
  background-color: ${({ $type }) => 
    $type === 'bid' 
      ? 'rgba(76, 175, 80, 0.1)' 
      : 'rgba(244, 67, 54, 0.1)'
  };
  
  &:hover {
    background-color: ${({ $type }) => 
      $type === 'bid' 
        ? 'rgba(76, 175, 80, 0.2)' 
        : 'rgba(244, 67, 54, 0.2)'
    };
    transform: translateY(-1px);
  }
  
  span:first-child {
    font-weight: 600;
    color: #333;
  }
  
  span:last-child {
    color: #666;
  }
`;
