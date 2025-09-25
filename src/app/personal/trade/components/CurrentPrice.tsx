"use client";
import styled from "styled-components";
import { Bunny } from "../../../_store/bunnyStore";

interface CurrentPriceProps {
  bunny: Bunny;
}

export default function CurrentPrice({ bunny }: CurrentPriceProps) {
  const price = bunny.current_price.toLocaleString();
  const change = bunny.fluctuation_rate ? (bunny.current_price - bunny.closing_price).toLocaleString() : "0";
  const changePercentage = bunny.fluctuation_rate ? `(${bunny.fluctuation_rate > 0 ? '+' : ''}${bunny.fluctuation_rate.toFixed(2)}%)` : "(0.00%)";
  const isPositive = bunny.fluctuation_rate ? bunny.fluctuation_rate >= 0 : true;
  return (
    <DashboardContent>
      <PriceSection>
        <MainValue>{price}</MainValue>
        <StatusDot />
      </PriceSection>
      <ChangeInfo>
        <ChangeValue $isPositive={isPositive}>{change}</ChangeValue>
        <ChangePercentage $isPositive={isPositive}>{changePercentage}</ChangePercentage>
        <ChangeArrow $isPositive={isPositive}>{isPositive ? '▲' : '▼'}</ChangeArrow>
      </ChangeInfo>
    </DashboardContent>
  );
}

const DashboardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const MainValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: white;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #FEE2A7;
  border-radius: 50%;
  box-shadow: 
    inset -0.56px -1.13px 2.81px #FFC54A,
    inset 0.56px 0.56px 0.56px #FFFBF2,
    1px 1px 2px #FEE2A7;
`;

const ChangeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`;

const ChangeValue = styled.span<{ $isPositive: boolean }>`
  font-size: 0.8rem;
  color: ${({ $isPositive }) => $isPositive ? '#ff4444' : '#4444ff'};
  font-weight: bold;
`;

const ChangePercentage = styled.span<{ $isPositive: boolean }>`
  font-size: 0.8rem;
  color: ${({ $isPositive }) => $isPositive ? '#ff4444' : '#4444ff'};
  font-weight: bold;
`;

const ChangeArrow = styled.span<{ $isPositive: boolean }>`
  font-size: 0.8rem;
  color: ${({ $isPositive }) => $isPositive ? '#ff4444' : '#4444ff'};
  font-weight: bold;
`;
