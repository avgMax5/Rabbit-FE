"use client";
import HalfChart from "@/app/personal/mypage/[user_id]/_components/chart/HalfChart";
import styled from "styled-components";
import { getRabbitIndex } from "@/app/_api/bunnyAPI";
import { useEffect, useState } from "react";

function MarketScore() {
    const [value, setValue] = useState<number | null>(null);

    useEffect(() => {
        const fetchValue = async () => {
            try {
                const result = await getRabbitIndex();
                setValue(result.rabbit_index);
            } catch (err) {
                console.error("getRabbitIndex API 호출 실패:", err);
            }
        };

        fetchValue();
    }, []);

    if (value === null) return <div>로딩 중...</div>;

    const reliavilityData = [
        { value: value, name: "점수" },
        { value: 100 - value, name: "남은 점수" },
    ];

    return (
        <Div>
            <Score>{reliavilityData[0].value}</Score>
            <HalfChart
                colors={["#1682109d", "#e9e9e9"]}
                data={reliavilityData}
                inner={60}
                outer={120}
            />
        </Div>
    );
}

const Div = styled.div`
    position: relative;
    width: 100%;
    height: 13rem;
    padding-bottom: 0.2rem;
    flex-shrink: 0;
    border-radius: 10.7px;
    background: rgba(255, 254, 254, 0.56);
    box-shadow: 4px 4px 6px 0 #fbfbfb93 inset, -4px -4px 4px 0 #707070 inset,
        2px 3px 10px 0 rgba(0, 0, 0, 0.25);
`;

const Score = styled.div`
    position: absolute;
    z-index: 999;
    left: 45%;
    bottom: 50%;
    font-family: var(--font-rockstar);
    font-size: 45px;
    font-weight: 800;
    color: #111111;
`;

export default MarketScore;
