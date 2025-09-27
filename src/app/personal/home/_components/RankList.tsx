"use client";
import { useEffect, useState } from "react";
import Rank from "./Rank";
import { getPressureTop5 } from "@/app/_api/bunnyAPI";
import { BunnyPressureData, PressureResponse } from "../_types/interfaces";

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
    <>
        {data.map((item, i) => (
            <Rank key={`${type}-${item.bunny_id}`} rank={i + 1} data={item} />
        ))}
    </>
  );
}