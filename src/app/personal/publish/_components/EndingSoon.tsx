'use client';

import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import FundBunnyCard from './FundBunnyCard';
import { FundBunny } from '../../../_store/fundingStore';

interface EndingSoonProps {
  bunnies: FundBunny[];
}

export default function EndingSoon({ bunnies }: EndingSoonProps) {
  const router = useRouter();
  
  const endingSoonBunnies = useMemo(() => {
    const bunniesArray = Array.isArray(bunnies) ? bunnies : [];
    
    const bunniesWithTimeLeft = bunniesArray
      .filter(bunny => bunny.end_at && bunny.end_at.trim() !== '')
      .map(bunny => {
        const now = new Date();
        const [hours, minutes, seconds] = bunny.end_at.split(':').map(Number);
        
        const endTime = new Date();
        endTime.setHours(hours, minutes, seconds, 0);
        
        if (endTime <= now) {
          endTime.setDate(endTime.getDate() + 1);
        }
        
        const timeLeft = endTime.getTime() - now.getTime();
        
        return {
          ...bunny,
          timeLeftMs: timeLeft,
          timeLeftFormatted: bunny.end_at
        };
      })
      .sort((a, b) => a.timeLeftMs - b.timeLeftMs)
      .slice(0, 3)
      .map(bunny => ({
        fund_bunny_id: bunny.fund_bunny_id,
        bunny_name: bunny.bunny_name,
        bunny_type: bunny.bunny_type,
        end_at: bunny.timeLeftFormatted,
        collected_bny: bunny.collected_bny,
        target_bny: bunny.target_bny,
        avatarSrc: "/images/personal/publish/astronaut.png"
      }));
    
    return bunniesWithTimeLeft;
  }, [bunnies]);
  return (
    <EndingSoonContainer>
      <HeaderSection>
        <EndingSoonText>마감까지 <EndingSoonHighlight>하루!</EndingSoonHighlight></EndingSoonText>
        <ViewAllLink onClick={() => router.push('/personal/publish/list')}>전체보기 &gt;</ViewAllLink>
      </HeaderSection>
      <EndingSoonDesc>아직 상장되지 못한 버니들이 당신을 기다리고 있어요</EndingSoonDesc>
      
      <CardsContainer>
        {endingSoonBunnies.length > 0 ? (
          endingSoonBunnies.map((data) => (
            <FundBunnyCard 
              key={data.fund_bunny_id}
              coinName={data.bunny_name}
              coinType={data.bunny_type}
              timeLeft={data.end_at}
              currentAmount={data.collected_bny}
              targetAmount={data.target_bny}
              avatarSrc={data.avatarSrc}
            />
          ))
        ) : (
          <NoDataText>마감 임박한 버니가 없습니다.</NoDataText>
        )}
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
  gap: 5rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  z-index: 3;
  width: 100%;
  max-width: 75rem;
`;

const NoDataText = styled.div`
  color: #cccccc;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  padding: 2rem;
`;
