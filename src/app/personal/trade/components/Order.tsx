"use client";
import styled from "styled-components";
import Button from '../../../_shared/components/Button';
import { useState, useEffect } from "react";
import { Bunny, useBunnyStore } from "../../../_store/bunnyStore";
import { useUserStore } from "../../../_store/userStore";
import { validateOrderAmount, handlePriceIncrease } from '../utils/orderValidate';
import { createOrder, getBunnyContext } from '../../../_api/bunnyAPI';
import {
  webSocketService,
  OrderBookSnapshot,
  OrderBookDiff
} from '../../../_utils/websocket';
import ResultModal from '../../../_shared/modal/Result';

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

/** 숫자만 허용(정수), 앞자리 0 정리 */
const toIntInput = (v: string) => {
  const onlyDigits = v.replace(/[^\d]/g, "");
  // 불필요한 선행 0 제거 (단, "0" 자체는 허용)
  return onlyDigits.replace(/^0+(?=\d)/, "");
};

export default function Order({ activeTab, setActiveTab, bunny }: OrderProps) {
  const [quantity, setQuantity] = useState(''); // 문자열 입력 상태
  const [price, setPrice] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [bunnyContext, setBunnyContext] = useState<BunnyContext | null>(null);
  const [orderBook, setOrderBook] = useState<OrderBookSnapshot | null>(null);
  const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [resultType, setResultType] = useState<'success' | 'error'>('success');
  const [resultMessage, setResultMessage] = useState('');
  const { user, fetchUser } = useUserStore();
  const { getBunnyByName } = useBunnyStore();

  // 1) 컨텍스트(주문 가능 수량/액수 등) 로드
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const context = await getBunnyContext(bunny.bunny_name);
        if (!mounted) return;
        setBunnyContext(context);
      } catch (error) {
        console.error('Bunny context 가져오기 실패:', error);
      }
    })();
    return () => { mounted = false; };
  }, [bunny.bunny_name]);

  // 2) 웹소켓 연결 + 호가창 스냅샷 요청 + 구독 설정
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        await webSocketService.connect();
        if (!mounted) return;
        setIsWebSocketConnected(true);

        // 최초 1회 스냅샷 요청
        webSocketService.requestOrderBookSnapshot(bunny.bunny_name);

        // 실시간 호가창 구독(스냅샷/디프 분기)
        webSocketService.subscribeToOrderBook(
          bunny.bunny_name,
          (snapshot: OrderBookSnapshot) => {
            setOrderBook(snapshot);
          },
          (diff: OrderBookDiff) => {
            setOrderBook((prev) => {
              if (!prev) return null;

              const next = { ...prev };

              // 매수 upsert
              diff.bidUpserts.forEach((u) => {
                const i = next.bids.findIndex((b) => b.price === u.price);
                if (i >= 0) next.bids[i] = u;
                else next.bids.push(u);
              });
              // 매수 delete (숫자 배열: 가격)
              diff.bidDeletes.forEach((price) => {
                next.bids = next.bids.filter((b) => b.price !== price);
              });

              // 매도 upsert
              diff.askUpserts.forEach((u) => {
                const i = next.asks.findIndex((a) => a.price === u.price);
                if (i >= 0) next.asks[i] = u;
                else next.asks.push(u);
              });
              // 매도 delete (숫자 배열: 가격)
              diff.askDeletes.forEach((price) => {
                next.asks = next.asks.filter((a) => a.price !== price);
              });

              // 정렬 (매수: 내림차순, 매도: 오름차순)
              next.bids.sort((a, b) => b.price - a.price);
              next.asks.sort((a, b) => a.price - b.price);

              // 현재가 갱신(optional)
              if (typeof diff.currentPrice === 'number') {
                next.currentPrice = diff.currentPrice;
              }

              return next;
            });
          }
        );
      } catch (error) {
        console.error('웹소켓 연결 실패:', error);
        if (mounted) setIsWebSocketConnected(false);
      }
    })();

    // cleanup: 구독 해제만 여기서 수행
    return () => {
      mounted = false;
      webSocketService.unsubscribeFromOrderBook(bunny.bunny_name);
    };
  }, [bunny.bunny_name]);

  // 현재 가격 가져오기 (실시간 업데이트된 가격 우선)
  const getCurrentPrice = () => {
    const storeBunny = getBunnyByName(bunny.bunny_name);
    return storeBunny?.current_price || orderBook?.currentPrice || bunny.current_price;
  };

  // 가격 범위 계산 (±50%)
  const getPriceRange = () => {
    const currentPrice = getCurrentPrice();
    const minPrice = Math.floor(currentPrice * 0.5); // -50%
    const maxPrice = Math.floor(currentPrice * 1.5); // +50%
    return { minPrice, maxPrice, currentPrice };
  };

  // 가격 유효성 검사
  const isPriceInRange = (priceValue: string) => {
    if (!priceValue) return true; // 빈 값은 허용
    const numPrice = Number(priceValue);
    const { minPrice, maxPrice } = getPriceRange();
    return numPrice >= minPrice && numPrice <= maxPrice;
  };

  // 가격 +% 버튼
  const onPriceIncrease = (percentage: number) => {
    const currentPrice = getCurrentPrice();
    const newPrice = handlePriceIncrease(price, currentPrice, percentage);
    const { minPrice, maxPrice } = getPriceRange();
    
    // 범위 내로 제한
    const limitedPrice = Math.max(minPrice, Math.min(maxPrice, Number(newPrice)));
    setPrice(toIntInput(limitedPrice.toString()));
  };

  // 호가 클릭하여 가격 입력
  const selectPrice = (selectedPrice: number) => {
    const { minPrice, maxPrice } = getPriceRange();
    const limitedPrice = Math.max(minPrice, Math.min(maxPrice, selectedPrice));
    setPrice(String(limitedPrice));
  };

  // 가격 입력 핸들러
  const handlePriceChange = (value: string) => {
    const cleanValue = toIntInput(value);
    setPrice(cleanValue);
  };

  // 주문 유효성 (금액은 기존 로직 유지)
  const orderValidation = validateOrderAmount(quantity, price);
  const isPriceValid = isPriceInRange(price);
  const isOrderValid = orderValidation.isValid && isPriceValid;

  // 주문 처리
  const handleOrder = async () => {
    try {
      // 입력을 정수로 강제(백엔드: BigDecimal 정수 + @Digits(fraction=0))
      const qtyStr = toIntInput(quantity);
      const unitStr = toIntInput(price);

      const qty = Number(qtyStr);
      const unit = Number(unitStr);

      if (!Number.isFinite(qty) || qty <= 0) {
        setResultType('error');
        setResultMessage('수량은 0보다 큰 정수여야 합니다.');
        setIsResultModalOpen(true);
        return;
      }
      if (!Number.isFinite(unit) || unit <= 0) {
        setResultType('error');
        setResultMessage('가격은 0보다 큰 정수여야 합니다.');
        setIsResultModalOpen(true);
        return;
      }

      await createOrder(bunny.bunny_name, {
        quantity: qty,
        unit_price: unit,
        order_type: activeTab === '매수' ? 'BUY' : 'SELL',
      });

      setQuantity('');
      setPrice('');
      setResultType('success');
      setResultMessage(`${activeTab} 주문이 성공적으로 처리되었습니다.`);
      setIsResultModalOpen(true);
    } catch (error: any) {
      console.error('주문 처리 중 오류 발생:', error);
      setResultType('error');
      setResultMessage(error.response?.data?.message || '주문 처리 중 오류가 발생했습니다.');
      setIsResultModalOpen(true);
    }
  };

  const handleResultModalClose = async () => {
    setIsResultModalOpen(false);

    const updatedContext = await getBunnyContext(bunny.bunny_name);
    setBunnyContext(updatedContext);

    await fetchUser();
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
          <OrderRow>
            <OrderLabel>{activeTab === '매수' ? '주문 가능' : '매도 가능'}</OrderLabel>
            <OrderValue>
              {activeTab === '매수'
                ? `${bunnyContext?.buyable_amount?.toLocaleString() || 0} BNY`
                : `${bunnyContext?.sellable_quantity || 0} BNY`}
            </OrderValue>
          </OrderRow>

          <OrderRow>
            <OrderLabel>주문 수량</OrderLabel>
            <OrderInput>
              <input
                type="text"
                inputMode="numeric"
                placeholder="0"
                value={quantity}
                onChange={(e) => setQuantity(toIntInput(e.target.value))}
              />
              <span>BNY</span>
            </OrderInput>
          </OrderRow>

          <OrderRow>
            <OrderLabel>{activeTab === '매수' ? '매수 가격' : '매도 가격'}</OrderLabel>
            <OrderInput>
              <input
                type="text"
                inputMode="numeric"
                placeholder="0"
                value={price}
                onChange={(e) => handlePriceChange(e.target.value)}
                style={{
                  border: !isPriceValid && price ? '1px solid #e74c3c' : 'none',
                  backgroundColor: !isPriceValid && price ? '#ffeaea' : 'transparent'
                }}
              />
              <span>C</span>
            </OrderInput>
          </OrderRow>

          <PercentageButtons>
            <PercentageButton onClick={() => onPriceIncrease(10)}>+10%</PercentageButton>
            <PercentageButton onClick={() => onPriceIncrease(20)}>+20%</PercentageButton>
            <PercentageButton onClick={() => onPriceIncrease(50)}>+50%</PercentageButton>
            <PercentageButton onClick={() => onPriceIncrease(100)}>+100%</PercentageButton>
          </PercentageButtons>

          <OrderRow>
            <OrderLabel>주문 총액</OrderLabel>
            <OrderValue>
              {quantity && price
                ? `${Math.round(Number(quantity) * Number(price) * 1.001).toLocaleString()} C`
                : '0 C'}
            </OrderValue>
          </OrderRow>      
          <ActionButtons>
            <Button variant="secondary" size="small" onClick={handleReset}>
              초기화
            </Button>
            <ButtonContainer>
              <Button
                variant="primary"
                size="small"
                disabled={!isOrderValid}
                onClick={handleOrder}
                onMouseEnter={() => {
                  if (!isOrderValid) setShowTooltip(true);
                }}
                onMouseLeave={() => setShowTooltip(false)}
              >
                {activeTab === '매수' ? '매수하기' : '매도하기'}
              </Button>
              {showTooltip && !isOrderValid && (
                <Tooltip>
                  {!isPriceValid && price 
                    ? `가격은 현재가의 ±50% 범위 내에서만 입력 가능합니다`
                    : '최소 주문 금액은 1,000C입니다'
                  }
                </Tooltip>
              )}
            </ButtonContainer>
          </ActionButtons>
        </OrderForm>
      </TradeArea>
      
      <ResultModal
        isOpen={isResultModalOpen}
        onClose={handleResultModalClose}
        type={resultType}
        title={resultType === 'success' ? '주문 완료!' : '주문 실패'}
        message={resultMessage}
        buttonText="확인"
      />
    </>
  );
}

/* ==== styled-components (변경 없음) ==== */

const TabContainer = styled.div`
  display: flex;
  gap: 0.2rem;
  margin-bottom: 0;
`;

const TabButton = styled.button<{ $active: boolean; $type: 'buy' | 'sell' }>`
  flex: 0.5;
  padding: 0.5rem 0.75rem;
  border: none;
  border-bottom: none;
  font-size: 0.9rem;
  font-weight: 600;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
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

const TradeArea = styled.div`
  flex: 1;
  background-color: rgba(252, 252, 252, 0.34);
  border-radius: 0 0 0.75rem 0.75rem;
  padding: 0.8rem;
`;

const OrderForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  height: auto;
  max-height: 400px;
`;

const OrderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.3rem;
`;

const OrderLabel = styled.span`
  font-size: 0.8rem;
  font-weight: 800;
  color: #333;
`;

const OrderValue = styled.span`
  font-size: 0.8rem;
  color: #FAE7C1;
  font-weight: 700;
`;

const OrderInput = styled.div`
  display: flex;
  align-items: center;
  background: #f0f8ff;
  border-radius: 0.4rem;
  padding: 0.3rem;
  min-width: 90px;
  max-width: 100px;

  input {
    border: none;
    background: transparent;
    outline: none;
    flex: 1;
    font-size: 0.8rem;
    color: #333;
    min-width: 0;

    &::placeholder {
      color: #999;
    }
  }

  span {
    font-size: 0.7rem;
    color: #666;
    margin-left: 0.2rem;
    white-space: nowrap;
    flex-shrink: 0;
  }
`;

const PercentageButtons = styled.div`
  display: flex;
  gap: 0.4rem;
  justify-content: flex-end;
`;

const PercentageButton = styled.button`
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 0.3rem;
  font-size: 0.65rem;
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
  gap: 0.8rem;
  justify-content: flex-end;
  margin-top: 0.8rem;
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
  color: ${({ $connected }) => ($connected ? '#4CAF50' : '#F44336')};
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
    $type === 'bid' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)'};

  &:hover {
    background-color: ${({ $type }) =>
      $type === 'bid' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)'};
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