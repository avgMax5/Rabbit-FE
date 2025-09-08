"use client";

import styled from "styled-components";
import Header from "../_shared/components/header";
import { LongTitle, ShortTitle } from "./_components/title-layout";
import List from "./_components/list-layout";
import SortButton from "./_components/sort-button";
import MarketScore from "../_shared/components/market-score";
import Top5 from "./_components/top5-layout";
import Rank from "./_components/rank-layout";
import Bedge from "./_components/corporation-layout";
import Banner from "./_components/banner";

export default function Personal() {
    return (
        <>
            <Wrapper>
                <Header />
                <Banner />
                <Main>
                    <LeftSection>
                        {/* 갓 상장한 버니들 */}
                        <Container>
                            <LongTitle />
                            <List />
                        </Container>

                        <Container>
                            <CorporationCotainer>
                                <Bedge
                                    src={
                                        "./images/personal/shared/kakao-badge.png"
                                    }
                                />
                                <Bedge
                                    src={
                                        "./images/personal/shared/naver-badge.png"
                                    }
                                />
                                <Bedge
                                    src={
                                        "./images/personal/shared/shinhan-badge.png"
                                    }
                                />
                            </CorporationCotainer>
                            <LongTitle />
                            <SortButtons>
                                <SortButton text={"Coin Type"} />
                                <SortButton text={"Role"} />
                                <SortButton text={"Dev Type"} />
                                <SortButton text={"Badge"} />
                            </SortButtons>
                            <List />
                        </Container>
                    </LeftSection>
                    <RightSection>
                        <Container>
                            <ShortTitle />
                            <MarketScore />
                        </Container>
                        <Container>
                            <ShortTitle />
                            <RankList>
                                <Top5 />
                                <Top5 />
                                <Top5 />
                            </RankList>
                        </Container>
                        <Container>
                            <ShortTitle />
                            {/* 일 매수 체결강도 순위 */}
                            <RankList>
                                <Rank />
                                <Rank />
                                <Rank />
                                <Rank />
                                <Rank />
                            </RankList>
                        </Container>
                        <Container>
                            <ShortTitle />
                            {/* 일 매도 체결강도 순위 */}
                            <RankList>
                                <Rank />
                                <Rank />
                                <Rank />
                                <Rank />
                                <Rank />
                            </RankList>
                        </Container>
                        <Container>
                            <ShortTitle />
                            <RankList></RankList>
                        </Container>
                    </RightSection>
                </Main>
            </Wrapper>
        </>
    );
}

const Wrapper = styled.div`
    width: 100vw;
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 1rem;
    padding: 0rem 2rem;
    background: linear-gradient(
        0deg,
        #f3f1eb 10.64%,
        rgba(145, 176, 217, 0.72) 51.81%,
        rgba(44, 107, 192, 0.9) 77.75%,
        rgba(7, 14, 25, 0.9) 99.95%
    );
`;

const Main = styled.div`
    width: 100%;
    height: 100%;
    padding: 1.5rem;
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
    /* height: 100%; */
    display: grid;
    grid-template-rows: auto;
    gap: 3rem;
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

const RankList = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
`;
