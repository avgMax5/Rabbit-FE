import GlassBox from "@/app/personal/mypage/[user_id]/_components/GlassBox";
import BubbleChart, {
    BubbleDataItem,
} from "../../_components/chart/BubbleChart";
import styled from "styled-components";
import ProgressContainer, { ProgressData } from "../../_components/my-bunny/ProgressBar";

interface CustomerHoldProps {
    bubbleData: BubbleDataItem[];
    progressData: ProgressData;
}

function CustomerHold({ bubbleData, progressData }: CustomerHoldProps) {
    return (
        <GlassBox text="보유자" isNoti={false}>
            <SubTitle>나의 코인 보유자 비율 : 개발자 유형 기준</SubTitle>
            <Container>
                <BubbleChart data={bubbleData} />
                {/* <ProgressContainer data={progressData} /> */}
            </Container>
        </GlassBox>
    );
}

const SubTitle = styled.div`
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: start;
    font-size: 13px;
`;

const Container = styled.div`
    width: 100%;
    height: 94%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
`;

export default CustomerHold;
