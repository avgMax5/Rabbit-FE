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

const fieldList = [
    { key: "coin_name", label: "코인명" },
    { key: "job", label: "직군" },
    { key: "dev_type", label: "개발자유형" },
    { key: "coin_type", label: "코인유형" },
    { key: "fluctuation_rate", label: "등락률" },
    { key: "current_price", label: "현재가" },
    { key: "badge", label: "뱃지" },
];

interface ListDataType {
    id: number;
    coin_name: string;
    job: string;
    dev_type: string;
    coin_type: string;
    fluctuation_rate: number;
    current_money: number;
    // badge: string[];
}

const Data: ListDataType[] = [
    {
        id: 0,
        coin_name: "coin1",
        job: "프론트엔드",
        dev_type: "희소 자산형",
        coin_type: "안정형",
        fluctuation_rate: -20.2,
        current_money: 20000,
        // badge: [],
    },
    {
        id: 1,
        coin_name: "coin2",
        job: "프론트엔드",
        dev_type: "희소 자산형",
        coin_type: "안정형",
        fluctuation_rate: -20.2,
        current_money: 20000,
        // badge: [],
    },
    {
        id: 2,
        coin_name: "coin3",
        job: "프론트엔드",
        dev_type: "희소 자산형",
        coin_type: "안정형",
        fluctuation_rate: -20.2,
        current_money: 20000,
        // badge: [],
    },
    {
        id: 3,
        coin_name: "coin4",
        job: "프론트엔드",
        dev_type: "희소 자산형",
        coin_type: "안정형",
        fluctuation_rate: -20.2,
        current_money: 20000,
        // badge: [],
    },
];

const updateData = [
    { coin_name: "min", fund_bunny_id: "123" },
    { coin_name: "minwoo", fund_bunny_id: "123" },
    { coin_name: "minw", fund_bunny_id: "125" },
    { coin_name: "wooo", fund_bunny_id: "126" },
    { coin_name: "woo3", fund_bunny_id: "126" },
    { coin_name: "woo4", fund_bunny_id: "126" },
    { coin_name: "woo5", fund_bunny_id: "126" },
    { coin_name: "woo6", fund_bunny_id: "126" },
    { coin_name: "woo7", fund_bunny_id: "126" },
];

const notificationData = [
    { value: "reliavility", noti: "시장심리점수계산공식" },
    {
        value: "tradeStrength",
        noti: `· 거래된 매수 체결과 매도 체결의 비율을 의미하며, 아래의 수식으로 체결강도를 계산합니다.

(매수 체결량 / 매도 체결량) x 100

· 체결강도는 100% 초과 시 매수세가 강하며, 100% 미만 시 매도세가 강함을 의미합니다. (최대 500%까지 표기)

· 당일 매수 또는 매도가 없는 디지털 자산, 일 거래대금이 1 BTC 미만인 BTC 마켓의 디지털 자산은 체결강도 순위에 보이지 않습니다.`,
    },
];

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
                            <List
                                fieldList={fieldList}
                                dataList={Data}
                                backgroundColor="rgba(255, 255, 255, 0.05)"
                            />
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
                            <List
                                fieldList={fieldList}
                                dataList={Data}
                                backgroundColor="#ffffff37"
                            />
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
    grid-template-rows: 0.6fr 2fr;
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