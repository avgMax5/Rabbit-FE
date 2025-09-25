import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";

interface Top5Props {
    standard: string;
}

export interface DeveloperTypeData {
    id: number;
    coin_name: string;
    money: number;
}

const Top5DeveloperTypeData: DeveloperTypeData[] = [
    {
        id: 0,
        coin_name: "min1",
        money: 20000,
    },
    {
        id: 1,
        coin_name: "min2",
        money: 21000,
    },
    {
        id: 2,
        coin_name: "min3",
        money: 22000,
    },
];

function Top5({ standard }: Top5Props) {
   
    return (
        <Div>
            <Standard>{standard}</Standard>
            <Swiper
                direction="vertical"
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                modules={[Autoplay]}
                style={{
                    width: "100%",
                    height: "6rem",
                }}
            >
                {Top5DeveloperTypeData.map((data, i) => (
                    <SwiperSlide key={i}>
                        <Content>
                            <Line>
                                <div>
                                    <Number>{data.id + 1}</Number>
                                    <CoinName>{data.coin_name}</CoinName>
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
