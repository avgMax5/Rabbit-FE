import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { useBunnyStore } from "@/app/_store/bunnyStore";
import { useEffect, useMemo } from "react";
import { BunnyTraitsData, PositionData } from "../_constants/constants";

export interface DeveloperTypeData {
    id: string;
    coin_name: string;
    money: number;
    position: string;
    dev_type: string;
}

function Top5({ standard }: { standard: "개발자 성향별 Top 1" | "포지션별 가치 Top 1" | "코인 가치 순위 Top 5" }) {
    const { allBunnies, fetchAllBunnies } = useBunnyStore();

    useEffect(() => {
        if (!allBunnies || allBunnies.length === 0) {
            fetchAllBunnies();
        }
    }, [allBunnies, fetchAllBunnies]);

    const processedTop5: DeveloperTypeData[] = useMemo(() => {
        if (!allBunnies) return [];

        // Bunny[] -> DeveloperTypeData[]
        const mappedList: (DeveloperTypeData & {
            dev_type?: string;
            position?: string;
        })[] = allBunnies.map((bunny, idx) => ({
            id: bunny.bunny_id ?? idx,
            coin_name: bunny.bunny_name ?? "unknown",
            money: bunny.market_cap ?? 0,
            dev_type: bunny.developer_type,
            position: bunny.position,
        }));

        let result: DeveloperTypeData[] = [];

        if (standard === "개발자 성향별 Top 1") {
            const grouped: Record<string, DeveloperTypeData[]> = {};
            mappedList.forEach((item) => {
                if (!item.dev_type) return;
                if (!grouped[item.dev_type]) grouped[item.dev_type] = [];
                grouped[item.dev_type].push(item);
            });

            result = Object.values(grouped)
                .map((group) => group.sort((a, b) => b.money - a.money)[0]);
        } else if (standard === "포지션별 가치 Top 1") {
            const grouped: Record<string, DeveloperTypeData[]> = {};
            mappedList.forEach((item) => {
                if (!item.position) return;
                if (!grouped[item.position]) grouped[item.position] = [];
                grouped[item.position].push(item);
            });

            result = Object.values(grouped)
                .map((group) => group.sort((a, b) => b.money - a.money)[0])
                .slice(0, 3); // 포지션은 3개네..
        } else if (standard === "코인 가치 순위 Top 5") {
            result = mappedList.sort((a, b) => b.money - a.money).slice(0, 5);
        }

        return result;
    }, [allBunnies, standard]);


    return (
        <Div>
            <Standard>{standard}</Standard>
            <Swiper
                direction="vertical"
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                modules={[Autoplay]}
                style={{ width: "100%", height: "6rem" }}
            >
                {processedTop5.map((data, i) => (
                    <SwiperSlide key={i}>
                        <Content>
                            <Line>
                                <div>
                                    <Number>{i + 1}</Number>
                                    <CoinName>{data.coin_name}</CoinName>
                                    <CoinName>{BunnyTraitsData.find((b) => b.name === data.dev_type)?.alias ?? ""}</CoinName>
                                    <CoinName> {PositionData.find((b) => b.name === data.position)?.alias ?? ""}</CoinName>
                                </div>
                                <div>
                                    <Carrot>{data.money.toLocaleString()}</Carrot>
                                    <CarrotImg
                                        src="/images/personal/home/carrot.png"
                                        alt="당근"
                                    />
                                </div>
                            </Line>
                        </Content>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Div>
    );
}

const Div = styled.div`
    display: flex;
    width: 100%;
    height: 6rem;
    padding: 10px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    flex-shrink: 0;

    color: #000;
    background: rgba(255, 255, 255, 0.754);
    box-shadow: -2px -2px 4px 0 rgba(17, 17, 17, 0.25) inset,
        2px 2px 4px 0 rgba(255, 255, 255, 0.323) inset, 3px 3px 4px 0 #c0c0c0;

    font-family: var(--font-nanum-squar);
    font-weight: 900;
    font-size: 16px;
`;

const Content = styled.div`
    background-color: #f0f8ff38;
    width: 100%;
    height: 3rem;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    box-sizing: border-box;
`;

const Line = styled.div`
    width: 100%;
    height: 2rem;
    display: flex;
    text-align: center;
    line-height: 2rem;

    justify-content: space-between;
    & > div {
        display: flex;
        gap: 0.5rem;
    }
`;

const Standard = styled.div`
    color: #707070;
    font-family: var(--font-nanum-squar);
    font-weight: 900;
    font-size: 12px;
`;

const Number = styled.div`
    width: 2rem;
    height: 2rem;
    border-radius: 2rem;
    text-align: center;
    line-height: 2rem;
    background-color: #ffccc1;
    box-shadow: -2px -2px 2px 0 #ff9e88 inset, 2px 2px 2px 0 #ffdcd4 inset;
    filter: drop-shadow(2px 2px 2px #dfb8af);
`;

const CoinName = styled.div``;

const Carrot = styled.div``;

const CarrotImg = styled.img`
    height: 1.5rem;
`;

export default Top5;
