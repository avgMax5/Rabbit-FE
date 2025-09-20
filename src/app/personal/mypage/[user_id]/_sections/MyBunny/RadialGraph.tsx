import PentagonChart from "@/app/_shared/components/PentagonChart";
import GlassBox from "@/app/personal/mypage/[user_id]/_components/GlassBox";

import { PentagonChartData } from "@/app/_shared/components/PentagonChart";
import styled from "styled-components";

interface RadialGraphProps {
    data: PentagonChartData;
    devType: string;
}

function RadialGraph({ data, devType }: RadialGraphProps) {
    return (
        <GlassBox text="개발자 유형" isNoti={false}>
            <DevType>{devType}</DevType>
            <PentagonChart data={data} />
        </GlassBox>
    );
}

const DevType = styled.div`
    position: absolute;
    top: 0.6rem;
    right: 0.6rem;
    font-size: 16px;
    font-weight: 900;
    color: #603f00;
`;

export default RadialGraph;
