'use client';

import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import FundBunnyCard from './FundBunnyCard';

interface FundBunnyData {
  fund_bunny_id: number;
  bunny_name: string;
  bunny_type: string;
  end_at: string | null;
  collected_bny: number;
  target_bny: number;
  avatarSrc: string;
}

export default function EndingSoon() {
  const router = useRouter();
  
  // 더미 데이터 배열
  const fundBunnyData: FundBunnyData[] = [
    {
      fund_bunny_id: 1,
      bunny_name: "코인명1",
      bunny_type: "😀",
      end_at: "23 : 56 : 43",
      collected_bny: 11000000,
      target_bny: 12000000,
      avatarSrc: "/images/personal/publish/astronaut.png"
    },
    {
      fund_bunny_id: 2,
      bunny_name: "코인명2", 
      bunny_type: "😀",
      end_at: "12 : 30 : 15",
      collected_bny: 15000000,
      target_bny: 20000000,
      avatarSrc: "/images/personal/publish/astronaut.png"
    },
    {
      fund_bunny_id: 3,
      bunny_name: "코인명3",
      bunny_type: "😀", 
      end_at: "05 : 15 : 22",
      collected_bny: 9000000,
      target_bny: 20000000,
      avatarSrc: "/images/personal/publish/astronaut.png"
    }
  ];
  return (
    <EndingSoonContainer>
      <HeaderSection>
        <EndingSoonText>마감까지 <EndingSoonHighlight>하루!</EndingSoonHighlight></EndingSoonText>
        <ViewAllLink onClick={() => router.push('/personal/publish/list')}>전체보기 &gt;</ViewAllLink>
      </HeaderSection>
      <EndingSoonDesc>아직 상장되지 못한 버니들이 당신을 기다리고 있어요</EndingSoonDesc>
      
      <CardsContainer>
        {fundBunnyData.map((data) => (
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
    </EndingSoonContainer>
  );
}

const EndingSoonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  z-index: 3;
  flex: 1;
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

const EndingSoonText = styled.div`
  font-size: 50px;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
`;

const EndingSoonHighlight = styled.span`
  font-family: 'rockstar';
  font-size: 60px;
  font-weight: 900;
  color: #ED2020;
  text-shadow: 6px 6px 6px rgba(48, 0, 0, 0.25);
`;

const EndingSoonDesc = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #cccccc;
  text-align: center;
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
  z-index: 3;
  width: 100%;
  max-width: 75rem;
`;
