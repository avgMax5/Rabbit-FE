"use client";
import styled from "styled-components";
import OrderList from './OrderList';
import Order from './Order';
import { useState } from "react";

export default function TradeBlock() {
  const [activeTab, setActiveTab] = useState('매수');
  const [activeOrderTab, setActiveOrderTab] = useState('오더');

  return (
    <TradeBlockWrapper>
      <TopSection>
        <Order activeTab={activeTab} setActiveTab={setActiveTab} />
      </TopSection>
      
      <BottomSection>
        <OrderList 
          activeOrderTab={activeOrderTab} 
          setActiveOrderTab={setActiveOrderTab} 
        />
      </BottomSection>
    </TradeBlockWrapper>
  );
}

const TradeBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
`;

const TopSection = styled.div`
  flex: 0.4;
  display: flex;
  flex-direction: column;
  border-radius: 0.75rem;
`;

const BottomSection = styled.div`
  flex: 0.6;
  display: flex;
  flex-direction: column;
  border-radius: 0.75rem;
`;
