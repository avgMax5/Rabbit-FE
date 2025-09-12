'use client';

import React from 'react';
import styled from 'styled-components';

interface TypeCardProps {
  type: 'A' | 'B' | 'C';
  isSelected: boolean;
  onClick: () => void;
}

export default function TypeCard({ type, isSelected, onClick }: TypeCardProps) {
  const getTypeInfo = (type: 'A' | 'B' | 'C') => {
    switch (type) {
      case 'A':
        return {
          title: 'A 희소 자산형',
          icon: '💎',
          rarity: [true, true, true, true, true],
          liquidity: [true, false, false, false, false],
          accessibility: '다소 낮음'
        };
      case 'B':
        return {
          title: 'B 밸런스형',
          icon: '💎',
          rarity: [true, true, true, false, false],
          liquidity: [true, true, true, false, false],
          accessibility: '중간'
        };
      case 'C':
        return {
          title: 'C 단가 친화형',
          icon: '💎',
          rarity: [true, false, false, false, false],
          liquidity: [true, true, true, true, false],
          accessibility: '높음'
        };
    }
  };

  const typeInfo = getTypeInfo(type);

  return (
    <StyledTypeCard isSelected={isSelected} onClick={onClick}>
      <TypeIcon>{typeInfo.icon}</TypeIcon>
      <TypeTitle>{typeInfo.title}</TypeTitle>
      <TypeAttributes>
        <AttributeRow>
          <AttributeLabel>희소성</AttributeLabel>
          <AttributeBars>
            {typeInfo.rarity.map((filled, index) => (
              <Bar key={index} filled={filled} />
            ))}
          </AttributeBars>
        </AttributeRow>
        <AttributeRow>
          <AttributeLabel>유동성</AttributeLabel>
          <AttributeBars>
            {typeInfo.liquidity.map((filled, index) => (
              <Bar key={index} filled={filled} />
            ))}
          </AttributeBars>
        </AttributeRow>
        <AttributeRow>
          <AttributeLabel>투자자 접근성</AttributeLabel>
          <AttributeText>{typeInfo.accessibility}</AttributeText>
        </AttributeRow>
      </TypeAttributes>
    </StyledTypeCard>
  );
}

const StyledTypeCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected: boolean }>`
  background: ${props => props.isSelected ? '#FFAC9B' : '#2a2a3e'};
  border-radius: 0.9375rem;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  
  &:hover {
    transform: translateY(-0.3125rem);
    box-shadow: 0 0.625rem 1.25rem rgba(0, 0, 0, 0.3);
  }
`;

const TypeIcon = styled.div`
  font-size: 24px;
  text-align: center;
  margin-bottom: 0.625rem;
`;

const TypeTitle = styled.h3`
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  margin: 0 0 0.9375rem 0;
`;

const TypeAttributes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

const AttributeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AttributeLabel = styled.span`
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
`;

const AttributeBars = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const Bar = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'filled',
})<{ filled?: boolean }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: ${props => props.filled ? '#ffd700' : '#555'};
`;

const AttributeText = styled.span`
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
`;
