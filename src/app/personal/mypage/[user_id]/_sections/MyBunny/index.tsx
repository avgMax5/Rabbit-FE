import GlassBox from "@/app/personal/mypage/[user_id]/_components/GlassBox";
import styled from "styled-components";
import MarketCap from "./MarketCap";
import Reliavility from "./Reliavility";
import GrowthRate from "./GrowthRate";
import RadialGraph from "./RadialGraph";
import CoinType from "./CoinType";
import AiSummarize from "@/app/_shared/components/AiSummarize";
import CustomerHold from "./CustomerHold";
import { BubbleDataItem } from "../../_components/chart/BubbleChart";

const reliavilityData = [
    { value: 60, name: "점수" },
    { value: 40, name: "남은 점수" },
];

const petagonData = [
    { name: "성장형", value: 82 },
    { name: "밸런스형", value: 47 },
    { name: "인기형", value: 95 },
    { name: "가치형", value: 63 },
    { name: "안정형", value: 71 },
];

const sampleData: BubbleDataItem[] = [
    //내림차순으로 하기!!
    [25, 30, 70, "Label D"],
    [35, 20, 50, "Label E"],
    [10, 20, 40, "Label A"], // x=10, y=20, size=30
    [20, 14, 30, "Label B"],
    [28, 12, 20, "Label C"],
];

const progressData = [
    { label: "성장형", value: 200 },
    { label: "안정형", value: 150 },
    { label: "가치형", value: 110 },
    { label: "인기형", value: 90 },
    { label: "기본형", value: 10 },
];

function MyBunny() {
    return (
        <Wrapper>
            <FirstRow>
                <Col>
                    <MarketCap />
                    <Reliavility data={reliavilityData} />
                </Col>
                <GrowthRate />
                <RadialGraph data={petagonData} devType="안정형" />
            </FirstRow>
            <SecondRow>
                <CoinType type="A" />
                <AiSummarize />
                {/* <CustomerHold
                    bubbleData={sampleData}
                    progressData={progressData}
                /> */}
            </SecondRow>
        </Wrapper>
    );
}
const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 16rem 1fr;
    gap: 1rem;
`;
const Row = styled.div`
    display: grid;
    gap: 1rem;
    width: 100%;
    height: 100%;
`;

const FirstRow = styled(Row)`
    width: 100%;
    height: 16rem;
    grid-template-columns: 2fr 4fr 2.5fr;
`;

const Col = styled.div`
    display: grid;
    gap: 1rem;
    grid-template-rows: 1fr 1.2fr;
`;

const SecondRow = styled(Row)`
    grid-row: 2;
    width: 100%;
    grid-template-columns: 1.8fr 3.5fr 3.6fr;
`;

export default MyBunny;
