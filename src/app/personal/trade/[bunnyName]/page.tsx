"use client";
import styled from "styled-components";
import Header from "../../../_shared/components/Header";
import PentagonChart from '../../../_shared/components/PentagonChart';
import Chart from '../../../_shared/components/Chart';
import Button from '../../../_shared/components/Button';  
import Profile from '../components/BunnyProfile';
import BunnyType from '../components/BunnyType';
import BunnySpec from '../components/BunnySpec';
import CurrentPrice from '../components/CurrentPrice';
import TradeBlock from '../components/Trade';
import { useParams } from "next/navigation";
import { useState } from "react";



export default function Trade() {
  const params = useParams();
  const bunnyName = params.bunnyName as string;

  return (
    <Wrapper>
      <Header />
      <Container>
        <LayoutGrid>
          <TopLeftBlock>
            <Profile />
          </TopLeftBlock>
          <MiddleLeftBlock>
            <BunnyType />
          </MiddleLeftBlock>
          <BottomLeftBlock>
            <BunnySpec />
          </BottomLeftBlock>
          
          <RightCard>
            <MainContent>
              <LeftSection>
                <TopRow>
                  <ChartTopLeftBlock>
                    <PentagonChart data={[]} />
                  </ChartTopLeftBlock>
                  <TopRightBlock>
                    <CurrentPrice />
                  </TopRightBlock>
                </TopRow>
                <ChartBottomLeftBlock>
                  <Chart />
                </ChartBottomLeftBlock>
              </LeftSection>
              
              <RightSection>
                <TradeBlock />
              </RightSection>
            </MainContent>
          </RightCard>
        </LayoutGrid>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Container = styled.div`
  margin-top: 8rem;
  padding: 1.25rem;
`;

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 22rem 1fr;
  grid-template-rows: 12.5rem 9.375rem 23.75rem;
  gap: 1.25rem;
  max-width: 90rem;
  margin: 0 auto;
  height: 48rem;
`;

const RightCard = styled.div`
  background-color: rgba(184, 209, 241, 0.17);
  border-radius: 1.25rem;
  grid-column: 2;
  grid-row: 1 / 4;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MainContent = styled.div`
  display: flex;
  gap: 1rem;
  flex: 1;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 0.7;
`;

const TopRow = styled.div`
  display: flex;
  gap: 1rem;
  flex: 1;
`;

const ChartTopLeftBlock = styled.div`
  background: rgba(3, 29, 49, 0.43);
  border-radius: 0.75rem;
  padding: 1rem;
  flex: 2;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TopRightBlock = styled.div`
  background: rgba(3, 29, 49, 0.43);
  border-radius: 0.75rem;
  padding: 1rem;
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChartBottomLeftBlock = styled.div`
  background: rgba(234, 234, 234, 0.14);
  border-radius: 0.75rem;
  padding: 1rem;
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TopLeftBlock = styled.div`
  background: rgba(3, 29, 49, 0.43);
  border-radius: 0.75rem;
  padding: 1rem;
  grid-column: 1;
  grid-row: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MiddleLeftBlock = styled.div`
  background-color: rgba(184, 209, 241, 0.17);
  border-radius: 1.25rem;
  grid-column: 1;
  grid-row: 2;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BottomLeftBlock = styled.div`
  background-color: rgba(184, 209, 241, 0.17);
  border-radius: 1.25rem;
  grid-column: 1;
  grid-row: 3;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow: hidden;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 0.4;
`;













