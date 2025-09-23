'use client'

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getBunniesCount, FundingCount } from '../../../_api/fundingAPI'
import Loading from '../../../_shared/components/Loading'

interface CoinStateItem {
  title: string
  value: string
}

export default function CoinState() {
  const [fundingData, setFundingData] = useState<FundingCount | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBunniesCount();
        if (data) {
          setFundingData(data);
        }
      } catch (error) {
        console.error('펀딩 데이터를 가져오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <BottomCoinStatus>
        <LoadingContainer>
          <Loading variant="pulse" size="small" text="데이터 로딩 중..." />
        </LoadingContainer>
      </BottomCoinStatus>
    );
  }

  const coinStates: CoinStateItem[] = [
    { title: "펀딩중인 코인 수", value: `${fundingData?.fund_bunny_count || 0}개` },
    { title: "상장된 코인 수", value: `${fundingData?.listed_bunny_count || 0}개` },
    { title: "마감 임박", value: `${fundingData?.closing_soon_bunny_count || 0}개` }
  ];

  return (
    <BottomCoinStatus>
      {coinStates.map((state, index) => (
        <BottomCoinContents key={index}>
          <BottomCoinStatusTitle>{state.title}</BottomCoinStatusTitle>
          <BottomCoinStateValue>{state.value}</BottomCoinStateValue>
        </BottomCoinContents>
      ))}
    </BottomCoinStatus>
  )
}

const BottomCoinStatus = styled.div`
  background-color: #ffffff;
  width: 35.8125rem;
  height: 6.25rem;
  position: absolute;
  top: -3.125rem;
  border-radius: 3.125rem;
  box-shadow: inset 0.3125rem 0.3125rem 0.25rem rgba(213, 213, 213, 0.25), inset -0.3125rem -0.3125rem 0.625rem rgba(51, 51, 51, 0.37);
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 2;
`;

const BottomCoinContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  flex: 1;
  height: 100%;
`;

const BottomCoinStatusTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #333333;
  text-align: center;
`;

const BottomCoinStateValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #000000;
  text-align: center;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

