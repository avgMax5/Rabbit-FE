"use client";

import styled from "styled-components";
import Header from "../../_shared/components/Header";
import Title from "./_components/Title";
import List from "./_components/List";
import SortButton from "./_components/SortButton";
import MarketScore from "../../_shared/components/MarketScore";
import Top5 from "./_components/Top5";
import Rank from "./_components/Rank";
import Badge from "./_components/Badge";
import Banner from "./_components/BannerContainer";
import Alarm from "./_components/Alarm";
import WithAuth from "@/app/_components/WithAuth";

import { updateData, RankData } from "./_mocks/mocks";
import { BadgeData, SelectData, notificationData } from "./_constants/constants";
import { ListContainer, BunnyListContainer } from "./_components/ListContainer";

function Personal() {
    return (
        <>
            <Wrapper>
                <Header />
                <Banner />
                <Alarm updateData={updateData} />
                <Main>
                    <LeftSection>
                        {/* 갓 상장한 버니들 */}
                        <Container>
                            <Title
                                content={"GOT 탑승한 버니들"}
                                isNoti={false}
                                icon="hugeicons:start-up-02"
                            />
                            <ListContainer />
                        </Container>

                        <Container>
                            <CorporationCotainer>
                                {BadgeData.map((badge, i) => (
                                    <Badge key={badge.id} badge={badge} />
                                ))}
                            </CorporationCotainer>
                            <Title
                                content={"로켓에 탑승한 버니들"}
                                isNoti={false}
                                icon="flowbite:rocket-solid"
                            />
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
                            <BunnyListContainer />
                        </Container>
                    </LeftSection>

                    <RightSection>
                        <Container>
                            <Title
                                content={"시장심리점수"}
                                isNoti={true}
                                notification={notificationData[0].noti}
                                icon="tabler:number"
                            />
                            <MarketScore />
                        </Container>

                        <Container>
                            <Title
                                content={"TOP 5 버니들"}
                                isNoti={false}
                                icon="fluent-emoji-high-contrast:top-arrow"
                            />
                            <RankContainer>
                                <Top5 standard="개발자 유형별" />
                                <Top5 standard="직군별" />
                                <Top5 standard="코인별" />
                            </RankContainer>
                        </Container>

                        <Container>
                            <Title
                                content={"일 매수 체결강도 순위"}
                                isNoti={true}
                                notification={notificationData[1].noti}
                                icon="icon-park-solid:list-top"
                            />
                            {/* 일 매수 체결강도 순위 */}
                            <RankContainer>
                                {RankData.map((data, i) => (
                                    <Rank key={i} data={data} />
                                ))}
                            </RankContainer>
                        </Container>

                        <Container>
                            <Title
                                content={"일 매도 체결강도 순위"}
                                isNoti={true}
                                notification={notificationData[1].noti}
                                icon="icon-park-solid:list-top"
                            />
                            {/* 일 매도 체결강도 순위 */}
                            <RankContainer>
                                {RankData.map((data, i) => (
                                    <Rank key={i} data={data} />
                                ))}
                            </RankContainer>
                        </Container>

                        <Container>
                            <Title
                                content={"지표"}
                                isNoti={false}
                                icon="solar:graph-new-bold"
                            />
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
    gap: 2rem;
    margin: 0 auto;
    margin-top: 12rem;
`;

const Main = styled.div`
    width: 100%;
    height: 100%;
    padding: 0rem 2rem;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
`;
const LeftSection = styled.div`
    width: 100%;
    /* height: 80%; */
    display: grid;
    grid-template-rows: 0.2fr 2fr;
    gap: 2rem;
`;

const SortButtons = styled.div`
    width: 100%;
    height: 3rem;
    margin-bottom: 1rem;
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

export default WithAuth(Personal);