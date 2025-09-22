'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '@/app/_shared/components/Header';
import FundBunnyCard from '../_components/FundBunnyCard';
import { useFundingStore, FundBunny } from '@/app/_store/fundingStore';

// 정렬 타입 정의
type SortType = 'latest' | 'oldest' | 'highInvestment' | 'lowInvestment';

export default function List() {
  const [sortType, setSortType] = useState<SortType>('latest');
  const [mounted, setMounted] = useState(false);
  const { bunnies, isLoading, error, fetchBunnies } = useFundingStore();

  useEffect(() => {
    setMounted(true);
    fetchBunnies({ sortType: 'newest', page: 0, size: 50 });
  }, [fetchBunnies]);

  const handleSort = (type: SortType) => {
    setSortType(type);
    
    let apiSortType: string;
    switch (type) {
      case 'latest':
        apiSortType = 'newest';
        break;
      case 'oldest':
        apiSortType = 'oldest';
        break;
      case 'highInvestment':
        apiSortType = 'high_investment';
        break;
      case 'lowInvestment':
        apiSortType = 'low_investment';
        break;
      default:
        apiSortType = 'newest';
    }
    
    fetchBunnies({ sortType: apiSortType, page: 0, size: 50 });
  };

  if (!mounted || isLoading) {
    return (
      <Container>
        <Header />
        <MainContent>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            로딩 중...
          </div>
        </MainContent>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header />
        <MainContent>
          <div style={{ textAlign: 'center', padding: '2rem', color: '#ff6b6b' }}>
            오류가 발생했습니다: {error}
          </div>
        </MainContent>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      
      <SortSectionWrapper>
        <SortSection>
          <SortButtons>
            <SortButton 
              active={sortType === 'latest'} 
              onClick={() => handleSort('latest')}
            >
              최신순
            </SortButton>
            <SortButton 
              active={sortType === 'oldest'} 
              onClick={() => handleSort('oldest')}
            >
              오래된순
            </SortButton>
            <SortButton 
              active={sortType === 'highInvestment'} 
              onClick={() => handleSort('highInvestment')}
            >
              투자 많은순
            </SortButton>
            <SortButton 
              active={sortType === 'lowInvestment'} 
              onClick={() => handleSort('lowInvestment')}
            >
              투자 적은순
            </SortButton>
          </SortButtons>
        </SortSection>
      </SortSectionWrapper>

      <MainContent>

        <GridContainer>
          {bunnies.length === 0 ? (
            <div style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              padding: '3rem',
              color: '#B8B8B8'
            }}>
              등록된 펀드 버니가 없습니다.
            </div>
          ) : (
            bunnies.map((item) => (
              <FundBunnyCard
                key={item.fund_bunny_id}
                fundBunnyId={item.fund_bunny_id}
                bunnyName={item.bunny_name}
                bunnyType={item.bunny_type}
                endAt={item.end_at}
                currentAmount={item.collected_bny}
                targetBny={item.target_bny}
                avatarSrc="/images/login/personalProfile.png"
              />
            ))
          )}
        </GridContainer>
      </MainContent>
    </Container>
  );
}
  
const Container = styled.div`
  min-height: 100vh;
  padding-top: 120px; /* Header 높이만큼 상단 여백 추가 */
`;

const MainContent = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const SortSectionWrapper = styled.div`
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  padding: 0 2rem;
`;

const SortSection = styled.section`
  width: 100%;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SortButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const SortButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>`
  background: ${props => props.active 
    ? 'linear-gradient(135deg, rgba(251, 201, 94, 0.2) 0%, rgba(255, 225, 163, 0.15) 100%)' 
    : 'rgba(255, 255, 255, 0.05)'
  };
  color: ${props => props.active ? '#FBC95E' : '#B8B8B8'};
  border: ${props => props.active 
    ? '2px solid rgba(251, 201, 94, 0.4)' 
    : '1px solid rgba(255, 255, 255, 0.1)'
  };
  padding: 0.875rem 1.75rem;
  border-radius: 12px;
  font-size: 14px;
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 120px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.6s;
  }
  
  &:hover {
    background: ${props => props.active 
      ? 'linear-gradient(135deg, rgba(251, 201, 94, 0.3) 0%, rgba(255, 225, 163, 0.2) 100%)' 
      : 'rgba(255, 255, 255, 0.08)'
    };
    border-color: ${props => props.active 
      ? 'rgba(251, 201, 94, 0.6)' 
      : 'rgba(255, 255, 255, 0.2)'
    };
    color: ${props => props.active ? '#FBC95E' : '#E0E0E0'};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  ${props => props.active && `
    box-shadow: 0 4px 16px rgba(251, 201, 94, 0.15);
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 12px;
      width: 6px;
      height: 6px;
      background: #FBC95E;
      border-radius: 50%;
      transform: translateY(-50%);
      box-shadow: 0 0 8px rgba(251, 201, 94, 0.6);
    }
  `}
  
  @media (max-width: 768px) {
    min-width: 100px;
    padding: 0.75rem 1.25rem;
    font-size: 13px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  justify-items: center;
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
