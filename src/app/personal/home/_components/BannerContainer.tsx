import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Sparkles, TrendingUp, Award } from "lucide-react";
import { Rocket } from "./Rocket";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

function Banner() {
    const coffeeFeatures = [
        {
            icon: "👤",
            title: "직접 인정하는 성장",
            desc: "개발자의 성장을 기업이 직접 인정할 때, 뱃지는 단순한 아이콘을 넘어선 새로운 연결의 증표가 됩니다.",
            gradient: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
        },
        {
            icon: "☕",
            title: "실제 네트워킹 기회",
            desc: "제휴 기업이 부여한 뱃지를 얻은 개발자는 실제 인사담당자와 커피챗을 통해 네트워킹할 수 있습니다.",
            gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)",
        },
        {
            icon: "🚀",
            title: "특별한 기회의 시작",
            desc: "검증된 실력을 바탕으로 더 많은 기회와 새로운 가능성의 문을 열어보세요.",
            gradient: "linear-gradient(135deg, #ec4899, #f59e0b)",
        },
    ];

    const slides = [
        () => (
            <BannerContent key="slide1">
                <Slogan>
                    <div>JUMP</div>
                    <div style={{ color: "#338ADA" }}>WITH</div>
                    <span
                        style={{
                            color: "rgba(51, 138, 218, 0.73)",
                        }}
                    >
                        YOUR
                    </span>
                    <span>BUNNY</span>
                </Slogan>
                <Rocket src={"/images/personal/home/main_rocket.png"} />
            </BannerContent>
        ),

        () => (
            <BannerContent
                key="slide2"
                style={{
                    background:
                        "linear-gradient(135deg, #16163a9a 0%, #16213e7a 25%, #0f33607c 50%)",
                    display: "flex",
                }}
            >
                <TextSection>
                    <Title>
                        기업 회원에게{" "}
                        <span
                            style={{
                                display: "block",
                                background:
                                    "linear-gradient(135deg, #94b8fe , #0a41c0)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            추천을 받아 뱃지를 모아보세요
                        </span>
                    </Title>
                    <Content>
                        <DescriptionContainer>
                            <FeatureCard
                                $gradient="linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(168, 85, 247, 0.1))"
                                $borderColor="rgba(34, 211, 238, 0.2)"
                            >
                                <IconContainer
                                    $iconGradient="linear-gradient(135deg, #22d3ee, #a855f7)"
                                    $boxShadow="0 4px 12px rgba(34, 211, 238, 0.3)"
                                >
                                    <Sparkles size={20} color="white" />
                                </IconContainer>
                                <div>
                                    <FeatureTitle>
                                        서로 다른 기업에서 얻은 뱃지의 특별함
                                    </FeatureTitle>
                                    <FeatureDescription>
                                        단순한 성과의 모음이 아니라, 시장
                                        전반에서 실력을 검증받았다는 신뢰의
                                        증거입니다.
                                    </FeatureDescription>
                                </div>
                            </FeatureCard>

                            <FeatureCard
                                $gradient="linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))"
                                $borderColor="rgba(168, 85, 247, 0.2)"
                            >
                                <IconContainer
                                    $iconGradient="linear-gradient(135deg, #a855f7, #ec4899)"
                                    $boxShadow="0 4px 12px rgba(168, 85, 247, 0.3)"
                                >
                                    <Award size={20} color="white" />
                                </IconContainer>
                                <div>
                                    <FeatureTitle>
                                        3개+ 기업 뱃지 보유시 특별 혜택
                                    </FeatureTitle>
                                    <FeatureDescription>
                                        상위 리스트 등록, 채용 추천과 컨퍼런스
                                        초청 등 차별화된 혜택을 받으세요.
                                    </FeatureDescription>
                                </div>
                            </FeatureCard>

                            <FeatureCard
                                $gradient="linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(245, 158, 11, 0.1))"
                                $borderColor="rgba(236, 72, 153, 0.2)"
                            >
                                <IconContainer
                                    $iconGradient="linear-gradient(135deg, #ec4899, #f59e0b)"
                                    $boxShadow="0 4px 12px rgba(236, 72, 153, 0.3)"
                                >
                                    <TrendingUp size={20} color="white" />
                                </IconContainer>
                                <div>
                                    <FeatureTitle>
                                        새로운 가능성의 시작
                                    </FeatureTitle>
                                    <FeatureDescription>
                                        검증된 실력으로 더 많은 기회와
                                        네트워킹의 문을 열어보세요.
                                    </FeatureDescription>
                                </div>
                            </FeatureCard>
                        </DescriptionContainer>
                    </Content>
                </TextSection>
                <CorporationSection>
                    <SmallTitle>신뢰하는 파트너들</SmallTitle>
                    <p
                        style={{
                            color: "#c3c8d0ec",
                            fontSize: "16px",
                            margin: 0,
                        }}
                    >
                        업계 최고 기업들과 함께
                    </p>
                    <ImgContainer>
                        <img
                            src="/images/badge/naver.png"
                            width="60px"
                            height="60px"
                        />
                        <img
                            src="/images/badge/shinhan.png"
                            width="60px"
                            height="60px"
                        />
                        <img
                            src="/images/badge/kakao.png"
                            width="60px"
                            height="60px"
                        />
                        <img
                            src="/images/badge/hyundai.png"
                            width="60px"
                            height="60px"
                        />
                        <img
                            src="/images/badge/coupang.png"
                            width="60px"
                            height="60px"
                        />
                    </ImgContainer>
                    <BottomContainer>
                        <div
                            style={{
                                fontSize: "1.8rem",
                                fontWeight: "700",
                                color: "#22d3ee",
                                marginBottom: "0.25rem",
                            }}
                        >
                            15+
                        </div>
                        <div
                            style={{
                                fontSize: "0.8rem",
                                color: "#94a3b8",
                            }}
                        >
                            파트너 기업
                        </div>
                    </BottomContainer>
                </CorporationSection>
            </BannerContent>
        ),

        () => (
            <BannerContent
                key="slide3"
                style={{
                    background:
                        "linear-gradient(135deg, #16163a9a 0%, #16213e7a 25%, #0f33607c 50%)",
                    display: "flex",
                }}
            >
                <CoffeeSlideContainer>
                    <CoffeeBackground />
                    {[...Array(8)].map((_, i) => (
                        <FloatingCoffeeIcon
                            key={i}
                            left={`${20 + Math.random() * 60}%`}
                            top={`${20 + Math.random() * 60}%`}
                            duration={`${3 + Math.random() * 2}s`}
                            delay={`${Math.random() * 2}s`}
                        />
                    ))}
                    <CoffeeContentSection>
                        <CoffeeTitle>
                            관심 가진 기업과
                            <br />
                            <CoffeeTitleHighlight>
                                커피 한 잔 하실래요?
                            </CoffeeTitleHighlight>
                        </CoffeeTitle>

                        <CoffeeCardsContainer>
                            {coffeeFeatures.map((item, index) => (
                                <CoffeeCard key={index}>
                                    <CoffeeCardIcon gradient={item.gradient}>
                                        {item.icon}
                                    </CoffeeCardIcon>
                                    <div>
                                        <CoffeeCardTitle>
                                            {item.title}
                                        </CoffeeCardTitle>
                                        <CoffeeCardDescription>
                                            {item.desc}
                                        </CoffeeCardDescription>
                                    </div>
                                </CoffeeCard>
                            ))}
                        </CoffeeCardsContainer>
                    </CoffeeContentSection>

                    <CoffeeIllustrationSection>
                        <CoffeeIllustrationCircle>
                            <CoffeeMainImage
                                src="/images/personal/home/coffee.png"
                                alt="커피 메인 이미지"
                            />
                            <CoffeeFloatingImage
                                src="/images/personal/home/bag.png"
                                alt="서류가방"
                                position="top-right"
                                delay="0.5s"
                            />
                            <CoffeeFloatingImage
                                src="/images/personal/home/hands.png"
                                alt="악수"
                                position="bottom-left"
                                delay="1s"
                            />
                        </CoffeeIllustrationCircle>

                        <CoffeeStatsContainer>
                            <CoffeeStatCard>
                                <CoffeeStatNumber color="#fbbf24">
                                    1,200+
                                </CoffeeStatNumber>
                                <CoffeeStatLabel>성공한 커피챗</CoffeeStatLabel>
                            </CoffeeStatCard>

                            <CoffeeStatCard>
                                <CoffeeStatNumber color="#f59e0b">
                                    84%
                                </CoffeeStatNumber>
                                <CoffeeStatLabel>취업 성공률</CoffeeStatLabel>
                            </CoffeeStatCard>
                        </CoffeeStatsContainer>
                    </CoffeeIllustrationSection>
                </CoffeeSlideContainer>
            </BannerContent>
        ),
    ];

    return (
        <Wrapper>
            <Swiper
                spaceBetween={70}
                pagination={{
                    clickable: true,
                    el: ".custom-pagination",
                }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                modules={[Pagination]}
                observer={true}
                observeParents={true}
                slidesPerView={1}
                speed={800}
                loop={true}
                style={{
                    width: "1350px",
                    height: "100%",
                    overflow: "visible",
                }}
            >
                {slides.map((Slide, i) => (
                    <SwiperSlide key={i} style={{ width: "100%" }}>
                        <Slide />
                    </SwiperSlide>
                ))}
            </Swiper>

            <CustomPagination className="custom-pagination" />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: 31rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    overflow: visible;
    box-sizing: border-box;
`;

const Slogan = styled.div`
    position: absolute;
    top: -3rem;
    left: 4rem;
    width: 30rem;
    color: rgba(255, 255, 255, 0.81);
    text-shadow: 4.315px 4.315px 8px #738398;
    font-family: var(--font-rockstar);
    font-size: 115.055px;
`;

const TextSection = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 2rem;
`;

const Title = styled.div`
    color: white;
    font-size: 48px;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 24px;
    color: #fff;

    @media (max-width: 768px) {
        font-size: 36px;
    }
`;

const Content = styled.div`
    font-size: 20px;
    font-weight: 900;
    font-size: 20px;
    line-height: 1.6;
`;

const CorporationSection = styled.div`
    width: 40%;
    height: 90%;
    margin-top: 25px;
    margin-right: 25px;
    border-radius: 10px;
    display: flex;
    gap: 10px;
    padding: 3rem;
    align-items: center;
    flex-direction: column;
    background-color: #ffffff16;
`;

const SmallTitle = styled.div`
    font-size: 25px;
    font-weight: 800;
    color: #fff;
`;
const ImgContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    justify-items: center;

    img {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        cursor: pointer;

        &:hover {
            transform: translateY(-10px) scale(1.05);
        }
    }
`;

const BottomContainer = styled.div`
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 1rem;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
`;

const BannerContent = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    border-radius: 16px;
    background: linear-gradient(
        268deg,
        rgba(66, 0, 189, 0.494) -2.14%,
        rgba(0, 85, 205, 0.639) 37.22%,
        rgba(139, 175, 224, 0.72) 76.57%,
        rgba(219, 232, 249, 0.847) 99.55%
    );
    filter: drop-shadow(-8px 8px 20px rgba(0, 0, 0, 0.27));
`;

const CustomPagination = styled.div`
    text-align: center;
    .swiper-pagination-bullet {
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
        background: #eaeaea6e;
        opacity: 1;
    }

    .swiper-pagination-bullet-active {
        background: #fd8563;
    }
`;

const DescriptionContainer = styled.div`
    margin-bottom: 2rem;
    max-width: 450px;
`;

const FeatureCard = styled.div<{ $borderColor: string; $gradient: string }>`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.2rem;
    height: 5.2rem;
    padding: 1rem 1rem;
    border-radius: 12px;
    border: 1px solid ${(props) => props.$borderColor};
    backdrop-filter: blur(10px);
    background: ${(props) => props.$gradient};

    &:last-child {
        margin-bottom: 0;
    }
`;

const IconContainer = styled.div<{ $iconGradient: string; $boxShadow: string }>`
    width: 2.5rem;
    height: 2.5rem;
    background: ${(props) => props.$iconGradient};
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: ${(props) => props.$boxShadow};
`;

const FeatureTitle = styled.h4`
    color: #fefefe;
    font-size: 15px;
    font-weight: 700;
    margin: 0 0 0.25rem 0;
`;

const FeatureDescription = styled.p`
    color: #cbd5e1;
    font-size: 0.85rem;
    margin: 0;
    line-height: 1.4;
`;

const float = keyframes`
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
`;

// 커피챗 슬라이드 전용 스타일드 컴포넌트들
const CoffeeSlideContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
`;

const CoffeeBackground = styled.div`
    position: absolute;
    inset: 0;
    background: radial-gradient(
            circle at 20% 80%,
            rgba(59, 130, 246, 0.3) 0%,
            transparent 50%
        ),
        radial-gradient(
            circle at 80% 20%,
            rgba(139, 92, 246, 0.3) 0%,
            transparent 50%
        );
`;

const FloatingCoffeeIcon = styled.div<{
    delay?: string;
    duration?: string;
    left?: string;
    top?: string;
}>`
    position: absolute;
    left: ${(props) => props.left || "50%"};
    top: ${(props) => props.top || "50%"};
    font-size: 24px;
    opacity: 0.1;
    animation: ${float} ${(props) => props.duration || "4s"} ease-in-out
        infinite;
    animation-delay: ${(props) => props.delay || "0s"};

    &::before {
        content: "☕";
    }
`;

const CoffeeContentSection = styled.div`
    width: 65%;
    padding: 2rem;
    z-index: 10;
`;

const CoffeeTitle = styled.h1`
    font-size: 2.5rem;
    font-weight: 800;
    color: white;
    margin-bottom: 1.5rem;
    margin-top: 2rem;
    line-height: 1.2;
`;

const CoffeeTitleHighlight = styled.span`
    background: linear-gradient(135deg, #fbbf24, #f59e0b, #d97706);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const CoffeeCardsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

interface CoffeeCardProps {
    gradient?: string;
}

const CoffeeCard = styled.div<CoffeeCardProps>`
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.2rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(15px);
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
`;

const CoffeeCardIcon = styled.div<{ gradient: string }>`
    width: 3rem;
    height: 3rem;
    background: ${(props) => props.gradient};
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    flex-shrink: 0;
`;

const CoffeeCardTitle = styled.h4`
    color: white !important;
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    background: none !important;
    -webkit-text-fill-color: white !important;
`;

const CoffeeCardDescription = styled.p`
    color: #e2e8f0 !important;
    font-size: 0.9rem;
    margin: 0;
    line-height: 1.5;
    background: none !important;
    -webkit-text-fill-color: #e2e8f0 !important;
`;

const CoffeeIllustrationSection = styled.div`
    width: 35%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
`;

const CoffeeIllustrationCircle = styled.div`
    position: relative;
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    border: 2px solid rgba(251, 191, 36, 0.3);
    margin-bottom: 2rem;

    &::before {
        content: "";
        position: absolute;
        inset: -10px;
        border-radius: 50%;
        background: linear-gradient(
            135deg,
            rgba(251, 191, 36, 0.2),
            rgba(245, 158, 11, 0.2)
        );
        z-index: -1;
    }
`;

const CoffeeMainImage = styled.img`
    width: 120px;
    height: 120px;
    object-fit: contain;
    animation: ${float} 3s ease-in-out infinite;
`;

const CoffeeFloatingImage = styled.img<{
    delay?: string;
    position: "top-right" | "bottom-left";
}>`
    position: absolute;
    object-fit: contain;
    animation: ${float} 3s ease-in-out infinite;
    animation-delay: ${(props) => props.delay || "0s"};

    ${(props) =>
        props.position === "top-right" &&
        `
        top: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
    `}

    ${(props) =>
        props.position === "bottom-left" &&
        `
        bottom: 20px;
        left: 20px;
        width: 70px;
        height: 70px;
    `}
`;

const CoffeeStatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 200px;
`;

const CoffeeStatCard = styled.div`
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 1rem;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
`;

const CoffeeStatNumber = styled.div<{ color: string }>`
    font-size: 1.8rem;
    font-weight: 700;
    color: ${(props) => props.color};
    margin-bottom: 0.25rem;
`;

const CoffeeStatLabel = styled.div`
    font-size: 0.8rem;
    color: #94a3b8;
`;

export default Banner;
