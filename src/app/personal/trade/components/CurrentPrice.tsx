"use client";
import styled from "styled-components";
import { useEffect, useMemo } from "react";
import { Bunny, useBunnyStore } from "../../../_store/bunnyStore";

interface CurrentPriceProps {
  bunny: Bunny;
}

export default function CurrentPrice({ bunny }: CurrentPriceProps) {
  // 스토어에서 실시간 값 읽기
  const { bunnies, allBunnies, startPriceRealtime, stopPriceRealtime } = useBunnyStore();

  // 현재 화면 대상 bunnyName
  const bunnyName = bunny.bunny_name;

  // 스토어에서 동일 bunny 찾기 (실시간 값 우선)
  const live = useMemo(() => {
    const foundInAll = allBunnies.find((bunny) => bunny.bunny_name === bunnyName);
    if (foundInAll) return foundInAll;
    return bunnies.find((bunny) => bunny.bunny_name === bunnyName);
  }, [allBunnies, bunnies, bunnyName]);

  // 마운트 시 구독 시작, 언마운트 시 해제
  useEffect(() => {
    startPriceRealtime(bunnyName);
    return () => {
      stopPriceRealtime(bunnyName);
    };
  }, [bunnyName, startPriceRealtime, stopPriceRealtime]);

  // 표시값: 스ㅌ어 값이 있으면 사용, 없으면 prop 값 사용
  const current = live?.current_price ?? bunny.current_price ?? 0;
  const close   = live?.closing_price ?? bunny.closing_price ?? 0;
  const rate    = live?.fluctuation_rate ?? bunny.fluctuation_rate ?? 0;

  const price = Number(current).toLocaleString();
  const change = (Number(current) - Number(close)).toLocaleString();
  const changePercentage = `(${rate > 0 ? '+' : ''}${Number(rate).toFixed(2)}%)`;
  const isPositive = Number(rate) >= 0;
  
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
