import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Top } from "../../_sections/MyBunnyList";
import { Icon } from "@iconify/react";

interface Top1ContainerProps {
    data: Top[];
}

interface getTypeNameProps {
    title: string;
    type: string | undefined;
}

const positionName = [
    { type: "frontend", name: "프론트엔드" },
    { type: "backend", name: "백엔드" },
    { type: "fullstack", name: "풀스택" },
];

const devName = [
    { type: "growth", name: "성장형" },
    { type: "stable", name: "안정형" },
    { type: "value", name: "가치형" },
    { type: "popular", name: "인기형" },
    { type: "balance", name: "밸런스형" },
    { type: "basic", name: "기본형" },
];

const coinName = [
    { type: "a", name: "희소자산형" },
    { type: "b", name: "밸런스형" },
    { type: "c", name: "단가친화형" },
];

const getTypeName = ({ title, type }: getTypeNameProps) => {
    let targetList;

    if (title === "직군") {
        targetList = positionName;
    } else if (title === "개발자 유형") {
        targetList = devName;
    } else {
        targetList = coinName;
    }

    const match = targetList.find((item) => item.type === type);
    return match?.name;
};

function Top1Container({ data }: Top1ContainerProps) {
    return (
        <Wrapper>
            <Container>
                <Swiper
                    direction="vertical"
                    autoplay={{ delay: 6000, disableOnInteraction: false }}
                    modules={[Autoplay]}
                    style={{
                        width: "100%",
                        height: "6rem",
                    }}
                >
                    {data.map((item, i) => (
                        <SwiperSlide key={i}>
                            <Content>
                                <Line>
                                    <TextBox>
                                        <Top1Title>{item.title}</Top1Title>
                                        <Icon
                                            icon="solar:cup-first-broken"
                                            color="#fed064"
                                            width="10px"
                                        />
                                        <Top1Type>
                                            {getTypeName({
                                                title: item.title,
                                                type: item.type,
                                            })}
                                        </Top1Type>
                                    </TextBox>
                                    <Top1Carrot>
                                        {item.carrot?.toLocaleString()}
                                    </Top1Carrot>
                                </Line>
                            </Content>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -57px;
    left: 13%;
`;

const Container = styled.div`
    width: 17rem;
    height: 2rem;
    border-radius: 4px;
    overflow: hidden;
    border-radius: 10px;
    background: linear-gradient(to left, #355c7d, #987daf, #c06c84);
    box-shadow: 2px 2px 4px #00000027;
`;

const Content = styled.div`
    background-color: #f0f8ff12;
    width: 100%;
    height: 2rem;
    border-radius: 4px;
    padding: 0 0.4rem;
    display: flex;
    align-items: center;
    box-sizing: border-box;
`;

const Line = styled.div`
    width: 100%;
    height: 2rem;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 2rem;

    justify-content: space-between;
    & > div {
        display: flex;
        gap: 0.5rem;
    }
`;

const TextBox = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Top1Title = styled.div`
    width: auto;
    height: 1.5rem;
    text-align: center;
    line-height: 1.5rem;
    padding: 0 8px;
    border-radius: 7px;
    background-color: #fee2e2e2;
    font-size: 10px;
    font-weight: 900;
`;
const Top1Type = styled.div`
    font-size: 12px;
    font-weight: 900;
`;

const Top1Carrot = styled.div`
    font-size: 12px;
    font-weight: 900;
    color: #fff;
`;

export default Top1Container;
