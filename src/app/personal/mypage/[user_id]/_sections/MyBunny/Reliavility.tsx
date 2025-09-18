import GlassBox from "@/app/personal/mypage/[user_id]/_components/GlassBox";
import styled from "styled-components";
import HalfChart, { ChartData } from "../../_components/chart/HalfChart";

interface ReliavilityProps {
    data: ChartData;
}

function Reliavility({ data }: ReliavilityProps) {
    const score = data.find((item) => item.name === "점수")?.value;

    return (
        <GlassBox text="신뢰도" isNoti={true} notification="신뢰도 계산법" color="#fff" backgroundColor="#001035">
            <Number>{score}</Number>
            <HalfChart colors={["#f2ad23", "#8c8c8c"]} data={data} />
        </GlassBox>
    );
}

const Number = styled.div`
    position: absolute;
    z-index: 998;
    bottom: 46%;
    left: 43%;
    font-family: var(--font-rockstar);
    font-size: 34px;
    color: #fff;
`;

export default Reliavility;
