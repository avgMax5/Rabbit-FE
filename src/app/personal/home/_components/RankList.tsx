"use client";
import { useEffect, useState } from "react";
import Rank from "./Rank";
import { getPressureTop5 } from "@/app/_api/bunnyAPI";
import { BunnyPressureData, PressureResponse } from "../_types/interfaces";
import styled from "styled-components";

interface RankListProps {
    type: "buy" | "sell";
}

export function RankList({ type }: RankListProps) {
    const [data, setData] = useState<BunnyPressureData[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res: PressureResponse = await getPressureTop5();

                setData(type === "buy" ? res.buy_top5 : res.sell_top5);
            } catch (err) {
                console.error("압력 데이터 가져오기 실패:", err);
            }
        }
        fetchData();
    }, [type]);

    if (!data || data.length === 0) return <div>Loading...</div>;

    return (
        <Div>
            {data.map((item, i) => (
                <Rank
                    key={`${type}-${item.bunny_id}`}
                    rank={i + 1}
                    data={item}
                />
            ))}
        </Div>
    );
}

const Div = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    padding: 8px 6px;
    border-radius: 6px;
    flex-shrink: 0;
    background: linear-gradient(
        135deg,
        rgba(247, 227, 255, 0.305) 0%,
        rgba(177, 106, 179, 0.292) 50%,
        rgba(0, 0, 70, 0.284) 100%
    );
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
