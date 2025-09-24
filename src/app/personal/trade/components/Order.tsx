"use client";
import styled from "styled-components";
import Button from '../../../_shared/components/Button';
import { useState } from "react";
import { Bunny } from "../../../_store/bunnyStore";
import { useUserStore } from "../../../_store/userStore";
import { validateOrderAmount, calculateTotalAmount, handlePriceIncrease } from '../utils/orderValidate';
import { createOrder } from '../../../_api/bunnyAPI';

interface OrderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bunny: Bunny;
}

export default function Order({ activeTab, setActiveTab, bunny }: OrderProps) {
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const { user } = useUserStore();


  const onPriceIncrease = (percentage: number) => {
    const newPrice = handlePriceIncrease(price, bunny.current_price, percentage);
    setPrice(newPrice);
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
          <OrderRow>
            <OrderLabel>주문 가능</OrderLabel>
            <OrderValue>{user?.carrot} BNY</OrderValue>
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
            <OrderValue>{calculateTotalAmount(quantity, price)} C</OrderValue>
          </OrderRow>
          
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
  padding: 0.5rem;
  min-width: 120px;
  
  input {
    border: none;
    background: transparent;
    outline: none;
    flex: 1;
    font-size: 0.9rem;
    color: #333;
    
    &::placeholder {
      color: #999;
    }
  }
  
  span {
    font-size: 0.8rem;
    color: #666;
    margin-left: 0.5rem;
  }
`;

const PercentageButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

const PercentageButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.8rem;
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
