import GlassBox from "@/app/personal/mypage/[user_id]/_components/GlassBox";
import styled from "styled-components";
import MarketCap from "./MarketCap";
import Reliavility from "./Reliavility";
import GrowthRate from "./GrowthRate";
import RadialGraph from "./RadialGraph";
import CoinType from "./CoinType";
import AiSummarize from "@/app/_shared/components/AiSummarize";
import CustomerHold from "./CustomerHold";

function MyBunny() {
    return (
        <Wrapper>
            <FirstRow>
                <Col>
                    <MarketCap />
                    <Reliavility />
                </Col>
                <GrowthRate />
                <RadialGraph />
            </FirstRow>
            <SecondRow>
                <CoinType />
                <AiSummarize />
                <CustomerHold />
            </SecondRow>
        </Wrapper>
    );
}
const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 4fr 4fr;
    gap: 0.8rem;
`;
const Row = styled.div`
    display: grid;
    gap: 0.8rem;
    width: 100%;
`;

const FirstRow = styled(Row)`
    grid-row: 1;
    width: 100%;
    grid-template-columns: 2fr 4fr 2.5fr;
`;

const Col = styled.div`
    display: grid;
    gap: 0.8rem;
    grid-template-rows: 1fr 1.5fr;
`;

const SecondRow = styled(Row)`
    grid-row: 2;
    width: 100%;
    grid-template-columns: 1.8fr 3.5fr 3.6fr;
`;

export default MyBunny;
