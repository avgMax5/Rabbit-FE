"use client";
import styled from "styled-components";

interface CurrentPriceProps {
  price?: string;
  change?: string;
  changePercentage?: string;
  isPositive?: boolean;
}

export default function CurrentPrice({ 
  price = "120,000", 
  change = "500", 
  changePercentage = "(+50.00%)", 
  isPositive = true 
}: CurrentPriceProps) {
  return (
    <DashboardContent>
      <MainValue>{price}</MainValue>
      <StatusDot />
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

const MainValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: white;
  margin-bottom: 0.5rem;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #FFD700;
  border-radius: 50%;
  margin-bottom: 0.5rem;
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
  color: ${({ $isPositive }) => $isPositive ? '#ff4444' : '#44ff44'};
  font-weight: bold;
`;

const ChangePercentage = styled.span<{ $isPositive: boolean }>`
  font-size: 0.8rem;
  color: ${({ $isPositive }) => $isPositive ? '#ff4444' : '#44ff44'};
  font-weight: bold;
`;

const ChangeArrow = styled.span<{ $isPositive: boolean }>`
  font-size: 0.8rem;
  color: ${({ $isPositive }) => $isPositive ? '#ff4444' : '#44ff44'};
  font-weight: bold;
`;
