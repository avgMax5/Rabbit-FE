'use client'

import React from 'react'
import styled from 'styled-components'

interface CoinStateItem {
  title: string
  value: string
}

export default function CoinState() {
  const coinStates: CoinStateItem[] = [
    { title: "펀딩중인 코인 수", value: "4개" },
    { title: "상장된 코인 수", value: "12개" },
    { title: "마감 임박", value: "2개" }
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

