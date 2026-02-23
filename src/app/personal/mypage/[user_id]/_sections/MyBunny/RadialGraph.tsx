import PentagonChart from "@/app/_shared/components/PentagonChart";
import GlassBox from "@/app/personal/mypage/[user_id]/_components/GlassBox";
import styled from "styled-components";
import { Bunny } from "@/app/_store/bunnyStore";

interface RadialGraphProps {
    data: Bunny;
    devType: string;
}

function RadialGraph({ data, devType }: RadialGraphProps) {
    return (
        <GlassBox
            text="개발자 유형"
            isNoti={false}
            color="#e3e1e1f8"
            // backgroundColor="linear-gradient(to bottom, #fff4d1, #ffffff)"
            backgroundColor="#03154a66"
        >
            <DevType>{devType}</DevType>
            <PentagonChart data={data} />
        </GlassBox>
    );
}

const DevType = styled.div`
    position: absolute;
    top: -1.3rem;
    right: 0.6rem;
    font-size: 12px;
    font-weight: 700;
    /* color: #603f00; */
    color: #ffffff;
`;

export default RadialGraph;
