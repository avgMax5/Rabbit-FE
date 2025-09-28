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

interface Top5Props {
    standard:
        | "개발자 성향별 Top 1"
        | "포지션별 가치 Top 1"
        | "코인 가치 순위 Top 5";
    isSwipper: boolean;
    type: "dev" | "position" | "";
}

function Top5({ standard, isSwipper, type }: Top5Props) {
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

            result = Object.values(grouped).map(
                (group) => group.sort((a, b) => b.money - a.money)[0]
            );
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
        <Div $isSwipper={isSwipper}>
            <Standard>{standard}</Standard>

            {isSwipper ? (
                <Swiper
                    direction="vertical"
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    modules={[Autoplay]}
                    speed={800}
                    style={{ width: "100%", height: "6rem" }}
                >
                    {processedTop5.map((data, i) => (
                        <SwiperSlide key={i}>
                            <Content>
                                <Line>
                                    <div>
                                        <Number>{i + 1}</Number>
                                        <CoinName>{data.coin_name}</CoinName>
                                        <Badge $type="dev">
                                            {BunnyTraitsData.find(
                                                (b) => b.name === data.dev_type
                                            )?.alias ?? ""}
                                        </Badge>
                                        <Badge $type="position">
                                            {PositionData.find(
                                                (b) => b.name === data.position
                                            )?.alias ?? ""}
                                        </Badge>
                                    </div>
                                    <div
                                        style={{
                                            justifyContent: "end",
                                            gap: "4px",
                                        }}
                                    >
                                        <Carrot>
                                            {data.money.toLocaleString()}
                                        </Carrot>
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
            ) : (
                // 그냥 리스트 렌더링
                <div style={{ width: "100%" }}>
                    {processedTop5.map((data, i) => (
                        <Content key={i} $isSwipper={isSwipper}>
                            <Line>
                                <div>
                                    {type === "dev" ? (
                                        <Badge $type="dev">
                                            {BunnyTraitsData.find(
                                                (b) => b.name === data.dev_type
                                            )?.alias ?? ""}
                                        </Badge>
                                    ) : (
                                        <Badge $type="position">
                                            {PositionData.find(
                                                (b) => b.name === data.position
                                            )?.alias ?? ""}
                                        </Badge>
                                    )}
                                    <CoinName>{data.coin_name}</CoinName>
                                </div>
                                <div
                                    style={{
                                        justifyContent: "end",
                                        gap: "4px",
                                    }}
                                >
                                    <Carrot>
                                        {data.money.toLocaleString()}
                                    </Carrot>
                                    <CarrotImg
                                        src="/images/personal/home/carrot.png"
                                        alt="당근"
                                    />
                                </div>
                            </Line>
                        </Content>
                    ))}
                </div>
            )}
        </Div>
    );
}

const Div = styled.div<{ $isSwipper: boolean }>`
    display: flex;
    width: 100%;
    height: ${(props) => (props.$isSwipper ? "6rem" : "auto")};
    padding: 10px;
    border-radius: 6px;
    margin-bottom: 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
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

const Content = styled.div<{ $isSwipper?: boolean }>`
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    padding: 10px 8px;
    margin-bottom: ${(props) => (props.$isSwipper ? 0 : "10px")};
    border-radius: 7px;
    background-color: #f0f8ff38;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
        transform: scale(1.02);
    }
`;

const Line = styled.div`
    width: 100%;
    height: 2rem;
    display: flex;
    gap: 10px;
    text-align: center;
    line-height: 2rem;

    justify-content: space-between;
    & > div {
        display: flex;
        align-items: center;
        gap: 10px;
    }
`;

const Standard = styled.div`
    color: #ffffff;
    font-family: var(--font-nanum-squar);
    font-weight: 900;
    font-size: 12px;
`;

const Number = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
    font-size: 10px;
    font-weight: 900;
    background: linear-gradient(to right, #c654e3e8, #d77f9cdd);
    flex-shrink: 0;
`;

const Badge = styled.span<{ $type?: "dev" | "position" | "" }>`
    font-size: 11px;
    text-align: center;
    line-height: 25px;
    height: 25px;
    padding: 0 8px;
    border-radius: 16px;
    background: ${(props) =>
        props.$type === "dev"
            ? "rgba(6, 181, 212, 0.596)"
            : "rgba(169, 85, 247, 0.695)"};
    color: ${(props) => (props.$type === "dev" ? "#d1f8fe" : "#e6ccff")};
    font-weight: 800;
    white-space: nowrap;
`;

const CoinName = styled.div`
    color: #fff;
    font-size: 14px;
    font-weight: 800;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Carrot = styled.div`
    color: #34a2fc;
    font-size: 15px;
    font-weight: 800;
`;

const CarrotImg = styled.img`
    height: 1.2rem;
`;

export default Top5;
