'use client';

import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import FundBunnyCard from './FundBunnyCard';

interface FundingData {
  fund_bunny_id: number;
  bunny_name: string;
  bunny_type: string;
  end_at: string | null;
  collected_bny: number;
  target_bny: number;
  avatarSrc: string;
}

export default function NowFunding() {
  const router = useRouter();
  
  // 더미 데이터 배열
  const fundingData: FundingData[] = [
    {
      fund_bunny_id: 4,
      bunny_name: "코인명1",
      bunny_type: "😀",
      end_at: null,
      collected_bny: 8000000,
      target_bny: 12000000,
      avatarSrc: "/images/personal/publish/astronaut.png"
    },
    {
      fund_bunny_id: 5,
      bunny_name: "코인명2", 
      bunny_type: "😀",
      end_at: null,
      collected_bny: 15000000,
      target_bny: 20000000,
      avatarSrc: "/images/personal/publish/astronaut.png"
    },
    {
      fund_bunny_id: 6,
      bunny_name: "코인명3",
      bunny_type: "😀", 
      end_at: null,
      collected_bny: 9000000,
      target_bny: 20000000,
      avatarSrc: "/images/personal/publish/astronaut.png"
    }
  ];

  return (
    <NowFundingContainer>
      <HeaderSection>
        <TitleContainer>
          <NowFundingText>NOW FUNDING</NowFundingText>
          <DescriptionText>현재 상장심사에 등록된 버니들입니다.</DescriptionText>
        </TitleContainer>
        <ViewAllLink onClick={() => router.push('/personal/publish/list')}>전체보기 &gt;</ViewAllLink>
      </HeaderSection>
      
      <CardsContainer>
        {fundingData.map((data) => (
          <FundBunnyCard 
            key={data.fund_bunny_id}
            coinName={data.bunny_name}
            coinType={data.bunny_type}
            timeLeft={data.end_at}
            currentAmount={data.collected_bny}
            targetAmount={data.target_bny}
            avatarSrc={data.avatarSrc}
          />
        ))}
      </CardsContainer>
    </NowFundingContainer>
  );
}

const NowFundingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  z-index: 1;
  flex: 1;
  margin-top: 5rem;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 75rem;
  padding: 0 1.25rem;
  position: relative;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const NowFundingText = styled.div`
  font-size: 50px;
  font-weight: 800;
  color: #ffffff;
  font-family: 'rockstar';
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.3);
`;

const DescriptionText = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #cccccc;
  text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.3);
`;

const ViewAllLink = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  cursor: pointer;
  position: absolute;
  right: 1.25rem;
  &:hover {
    opacity: 0.8;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  z-index: 1;
  margin-bottom: 6.25rem;
  width: 100%;
  max-width: 75rem;
`;
