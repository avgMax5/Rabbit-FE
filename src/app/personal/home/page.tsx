"use client";

import styled from "styled-components";
import Header from "../../_shared/components/header";
import { LongTitle, ShortTitle } from "./_components/Title";
import List from "./_components/List";
import SortButton from "./_components/SortButton";
import MarketScore from "../../_shared/components/MarketScore";
import Top5 from "./_components/Top5";
import Rank from "./_components/Rank";
import Badge from "./_components/Badge";
import Banner from "./_components/BannerContainer";

export interface DataType {
    id: number;
    coin_name: string;
    percent: number;
}
export interface BadgeType {
    id: number;
    src: string;
    amount: number;
    raise: boolean;
}

export default function Personal() {
    const RankData: DataType[] = [
        {
            id: 0,
            coin_name: "coin1",
            percent: 200.3,
        },
        {
            id: 1,
            coin_name: "coin2",
            percent: 200.3,
        },
        {
            id: 2,
            coin_name: "coin3",
            percent: 200.3,
        },
        {
            id: 3,
            coin_name: "coin4",
            percent: 200.3,
        },
        {
            id: 4,
            coin_name: "coin5",
            percent: 200.3,
        },
    ];

    const SelectData: string[][] = [
        ["희소자산형", "밸런스형", "단가친화형"],
        ["프론트엔드", "백엔드", "풀스택"],
        ["성장형", "안정형", "가치형", "인기형", "밸런스형"],
        ["카카오", "네이버", "신한"],
    ];

    const BadgeData: BadgeType[] = [
        {
            id: 0,
            src: "/images/personal/shared/kakao-badge.png",
            amount: 16,
            raise: true,
        },
        {
            id: 1,
            src: "/images/personal/shared/naver-badge.png",
            amount: 19,
            raise: false,
        },
        {
            id: 2,
            src: "/images/personal/shared/shinhan-badge.png",
            amount: 16,
            raise: true,
        },
    ];

    return (
        <>
            <Wrapper>
                <Header />
                <Banner />
                <Main>
                    <LeftSection>
                        {/* 갓 상장한 버니들 */}
                        <Container>
                            <LongTitle content={"GOT 탑승한 버니들"} />
                            <List />
                        </Container>

                        <Container>
                            <CorporationCotainer>
                                {BadgeData.map((badge, i) => (
                                    <Badge key={badge.id} badge={badge} />
                                ))}
                            </CorporationCotainer>
                            <LongTitle content={"로켓에 탑승한 버니들"} />
                            <SortButtons>
                                <SortButton
                                    text={"코인유형"}
                                    data={SelectData[0]}
                                />
                                <SortButton
                                    text={"직무"}
                                    data={SelectData[1]}
                                />
                                <SortButton
                                    text={"개발자 유형"}
                                    data={SelectData[2]}
                                />
                                <SortButton
                                    text={"뱃지"}
                                    data={SelectData[3]}
                                    isMulti={true}
                                />
                            </SortButtons>
                            <List />
                        </Container>
                    </LeftSection>

                    <RightSection>
                        <Container>
                            <ShortTitle content={"시장심리점수"} />
                            <MarketScore />
                        </Container>

                        <Container>
                            <ShortTitle content={"TOP 5 버니들"} />
                            <RankContainer>
                                <Top5 standard="개발자 유형별" />
                                <Top5 standard="직군별" />
                                <Top5 standard="코인별" />
                            </RankContainer>
                        </Container>

                        <Container>
                            <ShortTitle content={"일 매수 체결강도 순위"} />
                            {/* 일 매수 체결강도 순위 */}
                            <RankContainer>
                                {RankData.map((data, i) => (
                                    <Rank key={i} data={data} />
                                ))}
                            </RankContainer>
                        </Container>

                        <Container>
                            <ShortTitle content={"일 매도 체결강도 순위"} />
                            {/* 일 매도 체결강도 순위 */}
                            <RankContainer>
                                {RankData.map((data, i) => (
                                    <Rank key={i} data={data} />
                                ))}
                            </RankContainer>
                        </Container>

                        <Container>
                            <ShortTitle content={"지표"} />
                            <RankContainer>
                                <GraphContainer />
                                <GraphContainer />
                                <GraphContainer />
                            </RankContainer>
                        </Container>
                    </RightSection>
                </Main>
            </Wrapper>
        </>
    );
}

const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 5rem;
    margin: 0 auto;
    padding: 0 2rem;
`;

const Main = styled.div`
    width: 100%;
    height: 100%;
    padding: 1.5rem 0 rem;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
`;
const LeftSection = styled.div`
    width: 100%;
    /* height: 80%; */
    display: grid;
    grid-template-rows: 0.8fr 2fr;
    gap: 4rem;
`;

const SortButtons = styled.div`
    width: 100%;
    height: 3rem;
    display: flex;
    gap: 1rem;
    margin-top: 2.2rem;
`;
const RightSection = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: auto;
    gap: 2.5rem;
`;

const Container = styled.div`
    width: 100%;
`;
const CorporationCotainer = styled.div`
    width: 100%;
    height: 5.5rem;

    display: inline-flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 60px;
    flex-shrink: 0;

    margin-bottom: 2rem;

    border-radius: 8px;
    background: rgba(32, 45, 74, 0.06);
    box-shadow: 6px 6px 20px 0 #b9c4dc inset,
        4px 4px 4px 0 rgba(19, 35, 70, 0.26);
`;

const RankContainer = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const GraphContainer = styled.div`
    width: 100%;
    height: 15rem;
    flex-shrink: 0;
    border-radius: 10.7px;
    background: rgba(255, 254, 254, 0.56);
    box-shadow: 4px 4px 4px 0 #fbfbfb inset, -4px -4px 4px 0 #d6dbdf inset,
        4px 4px 10px 0 rgba(0, 0, 0, 0.25);
`;
