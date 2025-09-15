'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '@/app/_shared/components/Header';
import FundBunnyCard from '../_components/FundBunnyCard';

// 정렬 타입 정의
type SortType = 'latest' | 'oldest' | 'highInvestment' | 'lowInvestment';

// 목 데이터 생성
const generateMockData = () => {
  const coinNames = ['비트코인', '이더리움', '리플', '도지코인', '카르다노', '솔라나', '폴리곤', '체인링크', '유니스왑', '아발란체'];
  const coinTypes = ['BTC', 'ETH', 'XRP', 'DOGE', 'ADA', 'SOL', 'MATIC', 'LINK', 'UNI', 'AVAX'];
  const avatars = [
    '/images/login/personalProfile.png',
    '/images/login/personalProfile.png',
    '/images/login/personalProfile.png',
    '/images/login/personalProfile.png',
    '/images/login/personalProfile.png'
  ];

  return Array.from({ length: 20 }, (_, index) => {
    const targetAmount = Math.floor(Math.random() * 10000000) + 1000000; // 100만~1000만
    const currentAmount = Math.floor(Math.random() * targetAmount);
    const timeLeft = Math.random() > 0.5 ? `${Math.floor(Math.random() * 7) + 1}일 남음` : null;
    
    return {
      id: index + 1,
      coinName: coinNames[index % coinNames.length],
      coinType: coinTypes[index % coinTypes.length],
      timeLeft,
      currentAmount,
      targetAmount,
      avatarSrc: avatars[index % avatars.length],
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // 최근 30일 내
    };
  });
};

export default function List() {
  const [sortType, setSortType] = useState<SortType>('latest');
  const [mockData, setMockData] = useState(generateMockData());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSort = (type: SortType) => {
    setSortType(type);
    
    const sortedData = [...mockData].sort((a, b) => {
      switch (type) {
        case 'latest':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'oldest':
          return a.createdAt.getTime() - b.createdAt.getTime();
        case 'highInvestment':
          return b.currentAmount - a.currentAmount;
        case 'lowInvestment':
          return a.currentAmount - b.currentAmount;
        default:
          return 0;
      }
    });
    
    setMockData(sortedData);
  };

  if (!mounted) {
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
          {mockData.map((item) => (
            <FundBunnyCard
              key={item.id}
              coinName={item.coinName}
              coinType={item.coinType}
              timeLeft={item.timeLeft}
              currentAmount={item.currentAmount}
              targetAmount={item.targetAmount}
              avatarSrc={item.avatarSrc}
            />
          ))}
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
