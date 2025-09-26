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
import { useState, useEffect } from "react";
import { useBunnyStore, Bunny } from "../../../_store/bunnyStore";
import { getChart, ChartData } from "../../../_api/bunnyAPI";
import { Cctv } from "lucide-react";



export default function Trade() {
  const params = useParams();
  const bunnyName = params.bunnyName as string;
  const { allBunnies, fetchAllBunnies, getBunnyByName, status  } = useBunnyStore();
  const [currentBunny, setCurrentBunny] = useState<Bunny | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [chartLoading, setChartLoading] = useState(false);

  useEffect(() => {
    if (!allBunnies || allBunnies.length === 0) {
      fetchAllBunnies();
    }
  }, [allBunnies, fetchAllBunnies]);

  useEffect(() => {
    if (allBunnies.length > 0 && bunnyName) {
      const bunny = getBunnyByName(bunnyName);
      setCurrentBunny(bunny || null);
    }
  }, [allBunnies, bunnyName, getBunnyByName]);

  // 차트 데이터 가져오기
  const fetchChartData = async (period: string = "일") => {
    if (!currentBunny?.bunny_name) return;
    
    setChartLoading(true);
    try {
      const interval = period === "일" ? "DAILY" : period === "주" ? "WEEKLY" : "MONTHLY";
      const data = await getChart(currentBunny.bunny_name, interval);
      setChartData(data);
    } catch (error) {
      console.error('차트 데이터 가져오기 실패:', error);
    } finally {
      setChartLoading(false);
    }
  };

  const handlePeriodChange = (period: string) => {
    fetchChartData(period);
  };

  useEffect(() => {
    if (currentBunny?.bunny_name) {
      fetchChartData();
    }
  }, [currentBunny?.bunny_name]);

  if (status.allBunnies.isLoading) {
    return (
      <Wrapper>
        <Header />
        <Container>
          <div>로딩 중...</div>
        </Container>
      </Wrapper>
    );
  }

  if (!currentBunny) {
    return (
      <Wrapper>
        <Header />
        <Container>
          <div>버니를 찾을 수 없습니다.</div>
        </Container>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Header />
      <Container>
        <LayoutGrid>
          <TopLeftBlock>
            <Profile bunny={currentBunny} />
          </TopLeftBlock>
          <MiddleLeftBlock>
            <BunnyType bunny={currentBunny} />
          </MiddleLeftBlock>
          <BottomLeftBlock>
            <BunnySpec bunny={currentBunny} />
          </BottomLeftBlock>
          
          <RightCard>
            <MainContent>
              <LeftSection>
                <NewTopBlock>
                  {currentBunny.ai_review}
                </NewTopBlock>
                <TopRow>
                  <ChartTopLeftBlock>
                    <PentagonChart data={currentBunny} />
                  </ChartTopLeftBlock>
                  <TopRightBlock>
                    <CurrentPrice bunny={currentBunny} />
                  </TopRightBlock>
                </TopRow>
                <ChartBottomLeftBlock>
                  <Chart chartData={chartData} isLoading={chartLoading} onPeriodChange={handlePeriodChange} />
                </ChartBottomLeftBlock>
              </LeftSection>
              
              <RightSection>
                <TradeBlock bunny={currentBunny} />
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
  grid-template-rows: auto auto 1fr;
  gap: 1.25rem;
  max-width: 90rem;
  margin: 0 auto;
  min-height: 48rem;
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
  flex: 1;
  min-width: 0;
`;

const NewTopBlock = styled.div`
  background: rgba(3, 29, 49, 0.43);
  border-radius: 0.75rem;
  padding: 1rem;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const TopRow = styled.div`
  display: flex;
  gap: 1rem;
  flex: 0 0 150px;
`;

const ChartTopLeftBlock = styled.div`
  background: rgba(3, 29, 49, 0.43);
  border-radius: 0.75rem;
  padding: 1rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TopRightBlock = styled.div`
  background: rgba(3, 29, 49, 0.43);
  border-radius: 0.75rem;
  padding: 1rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChartBottomLeftBlock = styled.div`
  background: rgba(234, 234, 234, 0.14);
  border-radius: 0.75rem;
  padding: 1rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TopLeftBlock = styled.div`
  background-color: rgba(184, 209, 241, 0.17);
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
  min-width: 0;
`;













