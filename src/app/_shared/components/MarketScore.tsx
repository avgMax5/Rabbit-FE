"use client";
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
        </Div>
    );
}

const Div = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 5rem;
    border-radius: 8px;
    background-color: rgba(240, 211, 251, 0.462);
    backdrop-filter: blur(25px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 8px 32px rgba(176, 106, 179, 0.25),
        0 4px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.02);
        box-shadow: 0 12px 40px rgba(8, 5, 8, 0.35),
            0 6px 20px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
    }
`;

const Score = styled.div`
    font-family: var(--font-rockstar);
    font-size: 40px;
    font-weight: 800;
    color: #fff;
`;

export default MarketScore;
