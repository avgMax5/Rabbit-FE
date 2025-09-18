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
        <GlassBox text="개발자 유형" isNoti={false} color="#603F00" backgroundColor="linear-gradient(135deg, #FFF9E5 0%,rgb(214, 195, 130) 100%)">
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
    color: #603F00;
`;

export default RadialGraph;
