"use client";
import styled from "styled-components";
import OrderList from './OrderList';
import Order from './Order';
import { useState } from "react";
import { Bunny } from "../../../_store/bunnyStore";
import { useUserStore } from "../../../_store/userStore";

interface TradeBlockProps {
  bunny: Bunny;
}

export default function TradeBlock({ bunny }: TradeBlockProps) {
  const [activeTab, setActiveTab] = useState('매수');
  const [activeOrderTab, setActiveOrderTab] = useState('호가창');
  const { user } = useUserStore();

  if (user?.role === 'ROLE_CORPORATION') {
    return (
      <TradeBlockWrapper>
        <RestrictedTradeArea>
          <RestrictionOverlay>
            <RestrictionMessage>
              버니들만
            </RestrictionMessage>
            <RestrictionMessage>
              참여할 수 있어요
            </RestrictionMessage>
            <NoText>NO</NoText>
            <NoBunnyImg src="/images/trade/no_bunny.png"></NoBunnyImg>
          </RestrictionOverlay>
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
        </RestrictedTradeArea>
      </TradeBlockWrapper>
    );
  }

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
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 0.75rem;
  min-height: 0;
`;

const BottomSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 0.75rem;
  min-height: 0;
`;

const RestrictedTradeArea = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RestrictionOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 0.5rem;
`;

const RestrictionMessage = styled.div`
  color: white;
  font-size: 1.2rem;
  font-weight: 900;
  margin-bottom: 1rem;
  text-align: center;
`;

const NoText = styled.div`
  color: #ff4444;
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 1rem;
`;

const NoBunnyImg = styled.img`

`;
