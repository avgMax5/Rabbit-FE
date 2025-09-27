import GlassBox from "@/app/personal/mypage/[user_id]/_components/GlassBox";
import BarChart from "../../_components/chart/BarChart";
import styled from "styled-components";
import { BunnyHolder } from "@/app/_api/bunnyAPI";

interface CustomerHoldProps {
    holderData: BunnyHolder[];
}

function CustomerHold({ holderData }: CustomerHoldProps) {
    return (
        <GlassBox
            text="보유자"
            isNoti={false}
            color="#fff"
            backgroundColor="linear-gradient(135deg, rgb(41, 59, 90) 0%, rgb(0, 16, 57) 70%)"
        >
            <SubTitle>나의 코인 보유자 비율 : 개발자 유형 기준</SubTitle>

            <BarChart data={holderData} />
        </GlassBox>
    );
}

const SubTitle = styled.div`
    position: absolute;
    top: -24px;
    right: 6px;
    height: 1rem;
    display: flex;
    justify-content: start;
    font-size: 12px;
    color: #acaaaa;
`;

export default CustomerHold;
