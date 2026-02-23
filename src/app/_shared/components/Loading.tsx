'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  variant?: 'spinner' | 'dots' | 'pulse' | 'bunny';
  color?: string;
  fullScreen?: boolean;
}

export default function Loading({
  size = 'medium',
  text,
  variant = 'spinner',
  color = '#FEDEA7',
  fullScreen = false
}: LoadingProps) {
  const renderLoading = () => {
    switch (variant) {
      case 'dots':
        return <DotsLoader size={size} color={color} />;
      case 'pulse':
        return <PulseLoader size={size} color={color} />;
      case 'bunny':
        return <BunnyLoader size={size} color={color} />;
      default:
        return <SpinnerLoader size={size} color={color} />;
    }
  };

  const content = (
    <LoadingContainer fullScreen={fullScreen}>
      {renderLoading()}
      {text && <LoadingText size={size}>{text}</LoadingText>}
    </LoadingContainer>
  );

  return content;
}

// 스피너 로더
const SpinnerLoader = styled.div.withConfig({
  shouldForwardProp: (prop) => !['size', 'color'].includes(prop),
})<{ size: string; color: string }>`
  width: ${props => {
    switch (props.size) {
      case 'small': return '24px';
      case 'large': return '64px';
      default: return '40px';
    }
  }};
  height: ${props => {
    switch (props.size) {
      case 'small': return '24px';
      case 'large': return '64px';
      default: return '40px';
    }
  }};
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid ${props => props.color};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// 점들 로더
const DotsLoader = styled.div.withConfig({
  shouldForwardProp: (prop) => !['size', 'color'].includes(prop),
})<{ size: string; color: string }>`
  display: flex;
  gap: ${props => {
    switch (props.size) {
      case 'small': return '4px';
      case 'large': return '12px';
      default: return '8px';
    }
  }};
  
  div {
    width: ${props => {
      switch (props.size) {
        case 'small': return '6px';
        case 'large': return '16px';
        default: return '10px';
      }
    }};
    height: ${props => {
      switch (props.size) {
        case 'small': return '6px';
        case 'large': return '16px';
        default: return '10px';
      }
    }};
    background-color: ${props => props.color};
    border-radius: 50%;
    animation: bounce 1.4s ease-in-out infinite both;
    
    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
    &:nth-child(3) { animation-delay: 0s; }
  }
  
  @keyframes bounce {
    0%, 80%, 100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
  
  &::before,
  &::after {
    content: '';
    width: ${props => {
      switch (props.size) {
        case 'small': return '6px';
        case 'large': return '16px';
        default: return '10px';
      }
    }};
    height: ${props => {
      switch (props.size) {
        case 'small': return '6px';
        case 'large': return '16px';
        default: return '10px';
      }
    }};
    background-color: ${props => props.color};
    border-radius: 50%;
    position: absolute;
    animation: bounce 1.4s ease-in-out infinite both;
  }
  
  &::before {
    left: -${props => {
      switch (props.size) {
        case 'small': return '10px';
        case 'large': return '28px';
        default: return '18px';
      }
    }};
    animation-delay: -0.32s;
  }
  
  &::after {
    right: -${props => {
      switch (props.size) {
        case 'small': return '10px';
        case 'large': return '28px';
        default: return '18px';
      }
    }};
    animation-delay: -0.16s;
  }
`;

// 펄스 로더
const PulseLoader = styled.div.withConfig({
  shouldForwardProp: (prop) => !['size', 'color'].includes(prop),
})<{ size: string; color: string }>`
  width: ${props => {
    switch (props.size) {
      case 'small': return '24px';
      case 'large': return '64px';
      default: return '40px';
    }
  }};
  height: ${props => {
    switch (props.size) {
      case 'small': return '24px';
      case 'large': return '64px';
      default: return '40px';
    }
  }};
  background-color: ${props => props.color};
  border-radius: 50%;
  animation: pulse 1.5s ease-in-out infinite;
  
  @keyframes pulse {
    0% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.2);
      opacity: 1;
    }
    100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
  }
`;

// 버니 로더 (프로젝트 테마에 맞는 특별한 로더)
const BunnyLoader = styled.div.withConfig({
  shouldForwardProp: (prop) => !['size', 'color'].includes(prop),
})<{ size: string; color: string }>`
  width: ${props => {
    switch (props.size) {
      case 'small': return '32px';
      case 'large': return '80px';
      default: return '48px';
    }
  }};
  height: ${props => {
    switch (props.size) {
      case 'small': return '32px';
      case 'large': return '80px';
      default: return '48px';
    }
  }};
  position: relative;
  
  &::before {
    content: '🐰';
    font-size: ${props => {
      switch (props.size) {
        case 'small': return '24px';
        case 'large': return '60px';
        default: return '36px';
      }
    }};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: bunnyHop 1.2s ease-in-out infinite;
  }
  
  @keyframes bunnyHop {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1) rotate(0deg);
    }
    25% {
      transform: translate(-50%, -60%) scale(1.1) rotate(-5deg);
    }
    50% {
      transform: translate(-50%, -70%) scale(1.2) rotate(0deg);
    }
    75% {
      transform: translate(-50%, -60%) scale(1.1) rotate(5deg);
    }
  }
`;

const LoadingContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'fullScreen',
})<{ fullScreen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  
  ${props => props.fullScreen && `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(4px);
    z-index: 9999;
  `}
`;

const LoadingText = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'size',
})<{ size: string }>`
  color: #ffffff;
  font-weight: 600;
  text-align: center;
  font-size: ${props => {
    switch (props.size) {
      case 'small': return '14px';
      case 'large': return '20px';
      default: return '16px';
    }
  }};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;
