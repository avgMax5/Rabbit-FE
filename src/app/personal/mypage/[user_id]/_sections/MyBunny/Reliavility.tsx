import GlassBox from "@/app/personal/mypage/[user_id]/_components/GlassBox";
import styled from "styled-components";
import HalfChart, { ChartData } from "../../_components/chart/HalfChart";

interface ReliavilityProps {
    reliability: number;
}

const makeReliabilityData = (reliability: number) => {
    const data = [
        { value: reliability, name: "점수" },
        { value: 100 - reliability, name: "남은 점수" },
    ];

    return data;
};

function Reliavility({ reliability }: ReliavilityProps) {
    const data = makeReliabilityData(reliability);
    const score = data.find((item) => item.name === "점수")?.value;

    return (
        <GlassBox
            text="신뢰도"
            isNoti={true}
            notification="신뢰도 계산법"
            color="#e3e1e1f8"
            backgroundColor="#010b20b6"
        >
            <Number>{score}</Number>
            <HalfChart colors={["#f2ad23", "#f0ecec4e"]} data={data} />
        </GlassBox>
    );
}

const Number = styled.div`
    position: absolute;
    width: 100%;
    justify-content: center;
    z-index: 998;
    font-family: var(--font-rockstar);
    font-size: 34px;
    color: #fff;
    text-shadow: 1px 1px 2px #060606;
`;

export default Reliavility;
