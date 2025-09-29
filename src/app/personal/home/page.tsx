"use client";

import styled from "styled-components";
import Header from "../../_shared/components/Header";
import Title from "./_components/Title";
import SortButton from "./_components/SortButton";
import MarketScore from "../../_shared/components/MarketScore";
import Top5 from "./_components/Top5";
import Banner from "./_components/BannerContainer";
import Alarm from "./_components/Alarm";
import WithAuth from "@/app/_components/WithAuth";
import SpaceBackground from "../../_shared/components/SpaceBackground";

import { updateData } from "./_mocks/mocks";
import { SelectData, notificationData } from "./_constants/constants";
import { ListContainer, BunnyListContainer } from "./_components/ListContainer";
import { BadgeContainer } from "./_components/BadgeContainer";
import { RankList } from "./_components/RankList";
import HeaderForCorporation from "@/app/_shared/components/HeaderForCorporation";
import Footer from "@/app/_shared/components/Footer";

function Personal() {
    return (
        <SpaceBackground>
            <Wrapper>
                <Header />
                {/* <HeaderForCorporation /> */}
                <Banner />
                {/* <Alarm updateData={updateData} /> */}
                <Main>
                    <LeftSection>
                        <Container>
                            <Title
                                content={"GOT 탑승한 버니들"}
                                isNoti={false}
                                icon="hugeicons:start-up-02"
                                time={true}
                            />
                            <ListContainer />
                        </Container>

                        <Container>
                            <Title
                                content={"기업에게 인정받은 버니 수"}
                                isNoti={false}
                                icon="solar:medal-star-bold"
                                time={false}
                            />
                            <CorporationCotainer>
                                <BadgeContainer />
                            </CorporationCotainer>
                            <Title
                                content={"래빗의 로켓에 탑승하고 있는 버니들"}
                                isNoti={false}
                                icon="flowbite:rocket-solid"
                                time={false}
                            />
                            <SortButtons>
                                <SortButton
                                    text={"버니 타입"}
                                    data={SelectData[0]}
                                    filterKey="bunnyType"
                                />
                                <SortButton
                                    text={"포지션"}
                                    data={SelectData[1]}
                                    filterKey="position"
                                />
                                <SortButton
                                    text={"버니 성향"}
                                    data={SelectData[2]}
                                    filterKey="bunnyTraits"
                                />
                                <SortButton
                                    text={"뱃지"}
                                    data={SelectData[3]}
                                    isMulti={true}
                                    filterKey="badges"
                                />
                            </SortButtons>
                            <BunnyListContainer />
                        </Container>
                    </LeftSection>

                    <RightSection>
                        <Container>
                            <Title
                                content={"Rabbit 지수"}
                                isNoti={true}
                                notification={notificationData[0].noti}
                                time={true}
                                notiWidth="240px"
                            />
                            <MarketScore />
                        </Container>

                        <Container>
                            <Title
                                content={"버니 시가총액 순위"}
                                isNoti={false}
                                time={false}
                            />
                            <RankContainer>
                                <Top5
                                    standard="코인 가치 순위 Top 5"
                                    isSwipper={true}
                                    type=""
                                />
                                <Top5
                                    standard="개발자 유형별 Top 1"
                                    isSwipper={false}
                                    type="dev"
                                />
                                <Top5
                                    standard="포지션별 가치 Top 1"
                                    isSwipper={false}
                                    type="position"
                                />
                            </RankContainer>
                        </Container>

                        <Container>
                            {/* 일 매수 체결강도 순위 */}
                            <Title
                                content={"일 매수 체결강도 순위"}
                                isNoti={true}
                                notification={notificationData[1].noti}
                                time={false}
                            />
                            <RankContainer>
                                <RankList type="buy" />
                            </RankContainer>
                        </Container>

                        <Container>
                            {/* 일 매도 체결강도 순위 */}
                            <Title
                                content={"일 매도 체결강도 순위"}
                                isNoti={true}
                                notification={notificationData[1].noti}
                                time={false}
                            />
                            <RankContainer>
                                <RankList type="sell" />
                            </RankContainer>
                        </Container>
                        {/*                         
                        <Container>
                            <Title
                                content={"지표"}
                                isNoti={false}
                                icon="solar:graph-new-bold"
                                time={false}
                            />
                            <RankContainer>
                                <GraphContainer />
                                <GraphContainer />
                                <GraphContainer />
                            </RankContainer>
                        </Container> */}
                    </RightSection>
                </Main>
                <Footer />
            </Wrapper>
        </SpaceBackground>
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 2rem;
    margin: 0 auto;
    padding-top: 12rem;
    position: relative;
    z-index: 10;
    overflow-y: auto;
    overflow-x: hidden;
`;

const Main = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 6rem;
    padding: 0rem 2rem;
    display: grid;
    grid-template-columns: 2.5fr 1fr;
    gap: 2rem;
`;

const LeftSection = styled.div`
    width: 100%;
    min-width: 0;
    display: grid;
    grid-template-rows: 0.45fr 2fr;
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
    min-width: 0;
`;

const CorporationCotainer = styled.div`
    width: 100%;
    height: 5.5rem;
    padding: 10px;
    margin-bottom: 5rem;
    //background-color: #ffffff2b;
    background-color: #b108082b;
    border-radius: 8px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
`;

const RankContainer = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
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
