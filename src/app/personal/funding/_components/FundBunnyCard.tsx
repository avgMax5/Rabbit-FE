'use client'

import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import FundBunnyModal from '../_modal/FundBunnyModal'
import { updateCountdown } from '../_utils/countdown'

export default function FundBunnyCard({ 
  fundBunnyId,
  bunnyName, 
  bunnyType, 
  endAt, 
  currentAmount, 
  targetBny,
  avatarSrc,
  countdownColor = '#ff0000',
  showCountdown = false
}: {
  fundBunnyId: string
  bunnyName: string
  bunnyType: string
  endAt: string | null
  currentAmount: number
  targetBny: number
  avatarSrc: string
  countdownColor?: string
  showCountdown?: boolean
}) {
  const safeCurrentAmount = currentAmount ?? 0;
  const safeTargetBny = targetBny ?? 1;
  const progress = Math.round((safeCurrentAmount / safeTargetBny) * 100 * 10) / 10;
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countdown, setCountdown] = useState<string>('');

  // bunnyType에 따른 아이콘 매핑
  const getCoinTypeIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case 'A':
        return '/images/icon/coin_rare.png';
      case 'B':
        return '/images/icon/coin_balance.png';
      case 'C':
        return '/images/icon/coin_friend.png';
      default:
        return '/images/icon/coin_balance.png'; // 기본값
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!endAt) return;

    updateCountdown(endAt, setCountdown);

    const interval = setInterval(() => {
      updateCountdown(endAt, setCountdown);
    }, 1000);

    return () => clearInterval(interval);
  }, [endAt]);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CardContainer onClick={handleCardClick}>
        <TopSection>
          <LeftGroup>
            <AvatarContainer>
              <img 
                src={avatarSrc} 
                alt="coin avatar" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderRadius: '12px' 
                }} 
              />
            </AvatarContainer>
            <CoinInfo>
              <CoinName>{bunnyName}</CoinName>
              <CoinType>
                <img 
                  src={getCoinTypeIcon(bunnyType)} 
                  alt={`${bunnyType} coin type`}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain' 
                    
                  }} 
                />
              </CoinType>
            </CoinInfo>
          </LeftGroup>
          <ProgressCircle progress={progress}>
            <ProgressText>
              {progress}%
            </ProgressText>
          </ProgressCircle>
        </TopSection>
        
        {endAt && showCountdown && (
          <CountdownSection>
            <CountdownText countdownColor={countdownColor}>{countdown}</CountdownText>
          </CountdownSection>
        )}
        
        <BottomSection>
          <ProgressBarContainer>
            <ProgressBar>
              <ProgressFill progress={progress}>
                <ProgressEndCircle />
              </ProgressFill>
            </ProgressBar>
            
            <AmountBubble progress={progress}>
              {safeCurrentAmount.toLocaleString()}
            </AmountBubble>
            
            <TotalAmount>
              {safeTargetBny.toLocaleString()}
            </TotalAmount>
          </ProgressBarContainer>
        </BottomSection>
      </CardContainer>

      <FundBunnyModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        fundBunnyId={fundBunnyId}
      />
    </>
  )
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const progressFill = keyframes`
  from {
    width: 0%;
  }
  to {
    width: var(--progress-width);
  }
`;

const circleAppear = keyframes`
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const bubbleSlide = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(10px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
`;

const CardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 0.375rem;
  padding: 1.5rem;
  box-shadow: 0 0.25rem 1.25rem rgba(0, 0, 0, 0.1);
  min-width: 25rem;
  min-height: 15rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  animation: ${fadeInUp} 0.6s ease-out both;
  flex-shrink: 0;

  &:hover {
    background-color: rgba(149, 185, 252, 0.68);
    transform: scale(1.05);
  }
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
`;

const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const AvatarContainer = styled.div`
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 0.75rem;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const CoinInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CoinName = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #000000;
`;

const CoinType = styled.div`
  font-size: 10px;
  font-weight: 400;
  color: #999999;
  background-color: #f5f5f5;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1;
`;

const ProgressCircle = styled.div<{ progress: number }>`
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 50%;
  background: conic-gradient( #F7B5A7 ${props => props.progress * 3.6}deg, #f0f0f0 ${props => props.progress * 3.6}deg, #f0f0f0 360deg);
  box-shadow: inset 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.37), 0.1875rem 0.1875rem 0.1875rem rgba(225, 87, 57, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: ${scaleIn} 0.8s ease-out 0.3s both;
  
  &::before {
    content: '';
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
    background-color: #ffffff;
    border-radius: 50%;
  }
`;

const ProgressText = styled.div`
  font-size: 12px;
  font-weight: 900;
  color: #000000;
  z-index: 1;
  animation: ${fadeIn} 0.3s ease-out 1s both;
`;

const CountdownSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${scaleIn} 0.4s ease-out 0.5s both;
`;

const CountdownText = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'countdownColor',
})<{ countdownColor: string }>`
  font-size: 32px;
  font-weight: 900;
  font-family: 'rockstar';
  text-shadow: 2px 2px 2px rgba(48, 0, 0, 0.25);
  color: ${props => props.countdownColor};
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1rem;
  animation: ${fadeIn} 0.5s ease-out 0.7s both;
`;

const ProgressBarContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
  overflow: visible;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 0.9375rem;
  background-color: #f0f0f0;
  margin-top: 0.625rem;
  border-radius: 0.25rem;
  position: relative;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background-color: #007bff;
  border-radius: 0.25rem;
  position: relative;
  --progress-width: ${props => props.progress}%;
  animation: ${progressFill} 1.5s ease-out 0.8s both;
`;

const ProgressEndCircle = styled.div`
  position: absolute;
  right: -0.375rem;
  top: -0.125rem;
  width: 1.1875rem;
  height: 1.1875rem;
  background-color: #007bff;
  border-radius: 50%;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 123, 255, 0.3);
  animation: ${circleAppear} 0.3s ease-out 2.0s both;
`;

const AmountBubble = styled.div<{ progress: number }>`
  position: absolute;
  top: -2rem;
  left: ${props => props.progress}%;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 50%, #2E6DA4 100%);
  color: #ffffff;
  padding: 0.375rem 0.625rem;
  border-radius: 0.75rem;
  font-size: 12px;
  font-weight: 700;
  transform: translateX(-50%);
  box-shadow: 
    0 0.25rem 0.9375rem rgba(74, 144, 226, 0.4),
    inset 0 0.125rem 0 rgba(255, 255, 255, 0.4),
    inset 0 -0.125rem 0 rgba(0, 0, 0, 0.15),
    0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  z-index: 10;
  animation: ${bubbleSlide} 0.5s ease-out 2.3s both;
  text-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.4);
  border: 0.125rem solid rgba(255, 255, 255, 0.3);
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.375rem;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 0.375rem solid transparent;
    border-right: 0.375rem solid transparent;
    border-top: 0.375rem solid #2E6DA4;
    filter: drop-shadow(0 0.125rem 0.25rem rgba(0, 0, 0, 0.2));
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(0, 0, 0, 0.1) 100%);
    border-radius: 0.75rem;
    pointer-events: none;
  }
`;

const TotalAmount = styled.div`
  font-size: 12px;
  color: #666666;
  text-align: right;
  animation: ${fadeIn} 0.5s ease-out 2.6s both;
`;