"use client";
import styled from "styled-components";
import OrderList from './OrderList';
import Order from './Order';
import { useState } from "react";
import { Bunny } from "../../../_store/bunnyStore";

interface TradeBlockProps {
  bunny: Bunny;
}

export default function TradeBlock({ bunny }: TradeBlockProps) {
  const [activeTab, setActiveTab] = useState('매수');
  const [activeOrderTab, setActiveOrderTab] = useState('호가창');

  return (
    <TradeBlockWrapper>
      <TopSection>
        <Order activeTab={activeTab} setActiveTab={setActiveTab} bunny={bunny} />
      </TopSection>
      
      <BottomSection>
        <OrderList 
          activeOrderTab={activeOrderTab}
          setActiveOrderTab={setActiveOrderTab}
          bunny={bunny}
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
