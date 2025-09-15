"use client";

import styled from 'styled-components';

export default function TradeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TradeLayoutWrapper>
      {children}
    </TradeLayoutWrapper>
  );
}

const TradeLayoutWrapper = styled.div`
  background-image: url('/images/personal/shared/background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
`;
