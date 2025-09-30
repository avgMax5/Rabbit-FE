"use client";
import styled from "styled-components";
import Header from "../../../_shared/components/Header";
import PentagonChart from "../../../_shared/components/PentagonChart";
import Chart from "../../../_shared/components/Chart";
import Button from "../../../_shared/components/Button";
import Profile from "../components/BunnyProfile";
import BunnyType from "../components/BunnyType";
import BunnySpec from "../components/BunnySpec";
import CurrentPrice from "../components/CurrentPrice";
import TradeBlock from "../components/Trade";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useBunnyStore, Bunny } from "../../../_store/bunnyStore";
import { getChart, ChartData } from "../../../_api/bunnyAPI";
import { Cctv } from "lucide-react";
import SpaceBackground from "../../../_shared/components/SpaceBackground";
import { webSocketService } from "../../../_utils/websocket";

export default function Trade() {
    const params = useParams();
    const bunnyName = params.bunnyName as string;
    const { allBunnies, fetchAllBunnies, getBunnyByName, status } =
        useBunnyStore();
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
            const interval =
                period === "일"
                    ? "DAILY"
                    : period === "주"
                    ? "WEEKLY"
                    : "MONTHLY";
            const data = await getChart(currentBunny.bunny_name, interval);
            setChartData(data);
        } catch (error) {
            console.error("차트 데이터 가져오기 실패:", error);
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

    // 페이지 진입 시 즉시 웹소켓 연결
    useEffect(() => {
        const initializeWebSocket = async () => {
            try {
                await webSocketService.connect();
                console.log('Trade 페이지에서 웹소켓 연결 완료');
            } catch (error) {
                console.error('Trade 페이지 웹소켓 연결 실패:', error);
            }
        };

        initializeWebSocket();

        // 페이지 언마운트 시 웹소켓 정리
        return () => {
            if (currentBunny?.bunny_name) {
                webSocketService.unsubscribeFromOrderBook(currentBunny.bunny_name);
            }
        };
    }, [currentBunny?.bunny_name]);

    if (status.allBunnies.isLoading) {
        return (
            <SpaceBackground>
                <TradeBackground />
                <Wrapper>
                    <Header />
                    <Container>
                        <div>로딩 중...</div>
                    </Container>
                </Wrapper>
            </SpaceBackground>
        );
    }

    if (!currentBunny) {
        return (
            <SpaceBackground>
                <TradeBackground />
                <Wrapper>
                    <Header />
                    <Container>
                        <div>버니를 찾을 수 없습니다.</div>
                    </Container>
                </Wrapper>
            </SpaceBackground>
        );
    }

    return (
        <SpaceBackground>
            <TradeBackground />
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
                                            <PentagonChart
                                                data={currentBunny}
                                            />
                                        </ChartTopLeftBlock>
                                        <TopRightBlock>
                                            <CurrentPrice
                                                bunny={currentBunny}
                                            />
                                        </TopRightBlock>
                                    </TopRow>
                                    <ChartBottomLeftBlock>
                                        <Chart
                                            chartData={chartData}
                                            isLoading={chartLoading}
                                            onPeriodChange={handlePeriodChange}
                                        />
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
        </SpaceBackground>
    );
}

const TradeBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("/images/personal/shared/background2.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    z-index: 5;
    pointer-events: none;
`;

const Wrapper = styled.div`
    position: relative;
    z-index: 10;
`;

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
    border-radius: 0.75rem;
    padding: 1rem;
    grid-column: 1;
    grid-row: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
        135deg,
        rgba(247, 227, 255, 0.305) 0%,
        rgba(177, 106, 179, 0.292) 50%,
        rgba(0, 0, 70, 0.284) 100%
    );
    backdrop-filter: blur(25px);
    box-shadow: 0 8px 32px rgba(176, 106, 179, 0.25),
        0 4px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
`;

const MiddleLeftBlock = styled.div`
    border-radius: 1.25rem;
    grid-column: 1;
    grid-row: 2;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: linear-gradient(
        135deg,
        rgba(247, 227, 255, 0.305) 0%,
        rgba(177, 106, 179, 0.292) 50%,
        rgba(0, 0, 70, 0.284) 100%
    );
    backdrop-filter: blur(25px);
    box-shadow: 0 8px 32px rgba(176, 106, 179, 0.25),
        0 4px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
`;

const BottomLeftBlock = styled.div`
    border-radius: 1.25rem;
    grid-column: 1;
    grid-row: 3;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    overflow: hidden;

    background: linear-gradient(
        135deg,
        rgba(247, 227, 255, 0.305) 0%,
        rgba(177, 106, 179, 0.292) 50%,
        rgba(0, 0, 70, 0.284) 100%
    );
    backdrop-filter: blur(25px);
    box-shadow: 0 8px 32px rgba(176, 106, 179, 0.25),
        0 4px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
`;

const RightSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 0.4;
    min-width: 0;
`;
