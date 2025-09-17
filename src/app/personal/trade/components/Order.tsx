"use client";
import styled from "styled-components";
import Button from '../../../_shared/components/Button';
import { useState } from "react";

interface OrderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Order({ activeTab, setActiveTab }: OrderProps) {
  const [selectedPercentage, setSelectedPercentage] = useState('100%');

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
            <OrderValue>C 200,000,000</OrderValue>
          </OrderRow>
          
          <OrderRow>
            <OrderLabel>주문 수량</OrderLabel>
            <OrderInput>
              <input type="text" placeholder="0" />
              <span>BNY</span>
            </OrderInput>
          </OrderRow>
          
          <OrderRow>
            <OrderLabel>{activeTab === '매수' ? '매수 가격' : '매도 가격'}</OrderLabel>
            <OrderInput>
              <input type="text" placeholder="0" />
              <span>C</span>
            </OrderInput>
          </OrderRow>
          
          <PercentageButtons>
            <PercentageButton 
              $active={selectedPercentage === '10%'}
              onClick={() => setSelectedPercentage('10%')}
            >
              10%
            </PercentageButton>
            <PercentageButton 
              $active={selectedPercentage === '20%'}
              onClick={() => setSelectedPercentage('20%')}
            >
              20%
            </PercentageButton>
            <PercentageButton 
              $active={selectedPercentage === '50%'}
              onClick={() => setSelectedPercentage('50%')}
            >
              50%
            </PercentageButton>
            <PercentageButton 
              $active={selectedPercentage === '100%'}
              onClick={() => setSelectedPercentage('100%')}
            >
              100%
            </PercentageButton>
          </PercentageButtons>
          
          <OrderRow>
            <OrderLabel>주문 총액</OrderLabel>
            <OrderValue>200,000,000 C</OrderValue>
          </OrderRow>
          
          <ActionButtons>
            <Button variant="secondary" size="small">초기화</Button>
            <Button variant="primary" size="small">{activeTab === '매수' ? '매수하기' : '매도하기'}</Button>
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
        color: #E2E2E2;
        &:hover {
          background-color: rgba(255, 255, 255, 0.7);
        }
      `;
    }
  }}
`;

const TradeArea = styled.div`
  flex: 1;
  background: rgba(252, 252, 252, 0.34);
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

const PercentageButton = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  
  ${({ $active }) => 
    $active 
      ? `
        background-color: rgba(16, 145, 255, 0.9);
      `
      : `
        background-color: rgba(27, 101, 164, 1);
        &:hover {
          background-color: rgba(16, 145, 255, 0.7);
        }
      `
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;
