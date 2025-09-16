'use client';

import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import FundBunnyCard from './FundBunnyCard';
import { FundBunny } from '../../../_store/fundingStore';

interface NowFundingProps {
  bunnies: FundBunny[];
}

export default function NowFunding({ bunnies }: NowFundingProps) {
  const router = useRouter();
  
  const nowFundingBunnies = useMemo(() => {
    const bunniesArray = Array.isArray(bunnies) ? bunnies : [];
    
    return bunniesArray
      .filter(bunny => !bunny.end_at)
      .slice(0, 3)
      .map(bunny => ({
        fund_bunny_id: bunny.fund_bunny_id,
        bunny_name: bunny.bunny_name,
        bunny_type: bunny.bunny_type,
        end_at: bunny.end_at,
        collected_bny: bunny.collected_bny,
        target_bny: bunny.target_bny,
        avatarSrc: "/images/personal/publish/astronaut.png"
      }));
  }, [bunnies]);

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
        {nowFundingBunnies.length > 0 ? (
          nowFundingBunnies.map((data) => (
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
          <NoDataText>현재 펀딩 중인 버니가 없습니다.</NoDataText>
        )}
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
  gap: 5rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  z-index: 1;
  margin-bottom: 6.25rem;
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
