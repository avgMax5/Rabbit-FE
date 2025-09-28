"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CoinState from "./_components/CoinState";
import EndingSoon from "./_components/EndingSoon";
import NowFunding from "./_components/NowFunding";
import CreateBunnyModal from "./_modal/CreateBunnyModal";
import Button from "@/app/_shared/components/Button";
import Header from "@/app/_shared/components/Header";
import Loading from "@/app/_shared/components/Loading";
import { useFundingStore } from "../../_store/fundingStore";
import WithAuth from "@/app/_components/WithAuth";
import HeaderForCorporation from "@/app/_shared/components/HeaderForCorporation";
import { SpaceBackground } from "@/app/_shared/components";

function Funding() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const { fundBunnies, isLoading, error, fetchFundBunnies, clearError } =
        useFundingStore();

    useEffect(() => {
        fetchFundBunnies();
    }, [fetchFundBunnies]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // 로딩 상태 처리
    if (isLoading) {
        return (
            <>
                <MainContainer />
                <ContentContainer>
                    <Header />
                    <LoadingContainer>
                        <Loading
                            variant="bunny"
                            size="large"
                            text="펀딩 버니 데이터를 불러오는 중..."
                        />
                    </LoadingContainer>
                </ContentContainer>
            </>
        );
    }

    // 에러 상태 처리
    if (error) {
        return (
            <>
                <MainContainer />
                <ContentContainer>
                    <Header />
                    <ErrorContainer>
                        <ErrorText>오류가 발생했습니다: {error}</ErrorText>
                        <Button
                            onClick={() => fetchFundBunnies()}
                            variant="primary"
                            size="medium"
                        >
                            다시 시도
                        </Button>
                    </ErrorContainer>
                </ContentContainer>
            </>
        );
    }

    return (
        <Wrapper>
            <MainContainer />

            <ContentContainer>
                <Header />
                {/* 온보딩 섹션 1: 메인 소개 */}
                <OnboardingSection>
                    <OnboardingContent>
                        <MainTitle>버니버니, 버니버니, 당근당근</MainTitle>
                        <MainDescription>
                            마음에 드는 버니에게 당근을 주세요
                            <br />
                            당신의 선택이 버니의 미래를 결정합니다
                        </MainDescription>

                        <FeatureGrid>
                            <FeatureCard>
                                <FeatureIcon>🚀</FeatureIcon>
                                <FeatureTitle>펀딩 참여</FeatureTitle>
                                <FeatureDesc>
                                    진행 중인 펀딩에
                                    <br />
                                    참여하여 버니를 상장시켜 보세요
                                </FeatureDesc>
                            </FeatureCard>

                            <FeatureCard>
                                <FeatureIcon>⭐</FeatureIcon>
                                <FeatureTitle>상장 심사</FeatureTitle>
                                <FeatureDesc>
                                    당신의 버니를
                                    <br />
                                    Rabbit에서 선보이세요
                                </FeatureDesc>
                            </FeatureCard>
                        </FeatureGrid>
                    </OnboardingContent>

                    <OnboardingImageContainer>
                        <AstronautImage
                            src="/images/personal/funding/astronaut.png"
                            alt="astronaut"
                            width={120}
                            height={160}
                        />
                        <MoonImage
                            src="/images/personal/funding/moon.png"
                            alt="moon"
                            width={380}
                            height={380}
                        />
                        <RabbitImage
                            src="/images/personal/funding/space_rabbit.png"
                            alt="bottom_rabbit"
                            width={80}
                            height={120}
                        />
                    </OnboardingImageContainer>
                </OnboardingSection>

                <ActionSection>
                    <ActionContent>
                        <ActionTitle>지금 바로 시작해보세요!</ActionTitle>
                        <ActionDescription>
                            버니의 세계에서 투자자가 되거나, 자신만의 버니를
                            직접 상장해보세요!
                        </ActionDescription>

                        <ActionGrid>
                            <ActionCard
                                onClick={() =>
                                    router.push("/personal/funding/list")
                                }
                            >
                                <ActionCardIcon>👀</ActionCardIcon>
                                <ActionCardTitle>버니 둘러보기</ActionCardTitle>
                                <ActionCardDesc>
                                    다양한 버니들을 구경하고
                                    <br />
                                    마음에 드는 버니에게 투자해보세요
                                </ActionCardDesc>
                                <ActionButton variant="secondary" size="medium">
                                    구경하러 가기
                                </ActionButton>
                            </ActionCard>

                            <ActionCard onClick={handleOpenModal}>
                                <ActionCardIcon>📝</ActionCardIcon>
                                <ActionCardTitle>버니 상장하기</ActionCardTitle>
                                <ActionCardDesc>
                                    나만의 버니를 만들어
                                    <br />
                                    Rabbit에서 펀딩을 받아보세요
                                </ActionCardDesc>
                                <ActionButton variant="primary" size="medium">
                                    상장 신청하기
                                </ActionButton>
                            </ActionCard>
                        </ActionGrid>
                    </ActionContent>
                </ActionSection>

                {/* 기존 펀딩 정보 섹션 */}
                <FundingSection>
                    <FundingTop>
                        <RabbitImageContainer>
                            <Image
                                src="/images/personal/funding/standing_rabbit2.png"
                                alt="rabbit1"
                                width={100}
                                height={180}
                            />
                            <Image
                                src="/images/personal/funding/sitting_rabbit2.png"
                                alt="rabbit2"
                                width={80}
                                height={155}
                            />
                            <Image
                                src="/images/personal/funding/sitting_rabbit2.png"
                                alt="rabbit3"
                                width={80}
                                height={155}
                            />
                        </RabbitImageContainer>

                        <CoinState />

                        <RabbitImageContainer style={{ right: "-65rem" }}>
                            <Image
                                src="/images/personal/funding/standing_rabbit3.png"
                                alt="rabbit4"
                                width={100}
                                height={180}
                            />
                            <Image
                                src="/images/personal/funding/standing_rabbit3.png"
                                alt="rabbit4"
                                width={100}
                                height={180}
                            />
                        </RabbitImageContainer>
                    </FundingTop>

                    <EndingSoon />
                    <NowFunding />
                </FundingSection>
            </ContentContainer>

            <CreateBunnyModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
`;

const MainContainer = styled.div`
    width: 100vw !important;
    height: 100vh !important;
    min-height: 100vh !important;
    background: linear-gradient(
        to bottom,
        #000000 0%,
        #002554 17%,
        #325f9b 47%,
        #3c7bcd 71%,
        #7cb0f3 100%
    ) !important;
    background-attachment: fixed !important;
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    z-index: -1 !important;
`;

const ContentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    z-index: 1;
    padding-top: 100px;
`;

const OnboardingSection = styled.section`
    width: 100%;
    max-width: 1200px;
    padding: 120px 40px 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
        gap: 60px;
    }
`;

const OnboardingContent = styled.div`
    flex: 1;
    max-width: 600px;
    z-index: 2;
`;

const WelcomeText = styled.p`
    color: rgba(255, 255, 255, 0.8);
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 16px;
    letter-spacing: 0.5px;
`;

const MainTitle = styled.h1`
    color: white;
    font-size: 48px;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 24px;
    background: linear-gradient(135deg, #ffffff 0%, #7cb0f3 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    @media (max-width: 768px) {
        font-size: 36px;
    }
`;

const MainDescription = styled.p`
    color: rgba(255, 255, 255, 0.9);
    font-size: 22px;
    font-weight: 500;
    line-height: 1.6;
    margin-bottom: 60px;

    @media (max-width: 768px) {
        font-size: 18px;
        margin-bottom: 40px;
    }
`;

const FeatureGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 24px;
    margin-bottom: 40px;
`;

const FeatureCard = styled.div`
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 24px 20px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.15);
        transform: translateY(-4px);
    }
`;

const FeatureIcon = styled.div`
    font-size: 32px;
    margin-bottom: 12px;
`;

const FeatureTitle = styled.h3`
    color: white;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
`;

const FeatureDesc = styled.p`
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
    line-height: 1.4;
`;

const OnboardingImageContainer = styled.div`
    position: relative;
    flex: 1;
    max-width: 500px;
    height: 400px;
    z-index: 1;

    @media (max-width: 768px) {
        width: 100%;
        max-width: 350px;
        height: 300px;
    }
`;

const MoonImage = styled(Image)`
    position: absolute;
    top: 0;
    right: 0;
    opacity: 0.9;
    animation: duwoong 3s ease-in-out infinite;

    @media (max-width: 768px) {
        width: 280px;
        height: 280px;
    }

    @keyframes duwoong {
        0%,
        100% {
            transform: translateY(0);
        }
        25% {
            transform: translateY(-8px);
        }
        50% {
            transform: translateY(0);
        }
        75% {
            transform: translateY(-4px);
        }
    }
`;

const RabbitImage = styled(Image)`
    position: absolute;
    bottom: 0;
    right: 0;
    animation: duwoong 3s ease-in-out infinite;

    display: inline-block;
    transform: rotate(36deg);
    @media (max-width: 768px) {
        width: 280px;
        height: 280px;
    }
`;

const AstronautImage = styled(Image)`
    position: absolute;
    top: 0%;
    left: 15%;
    z-index: 2;
    animation: duwoong 3s ease-in-out infinite;

    @media (max-width: 768px) {
        width: 100px;
        height: 130px;
    }
`;

const ActionSection = styled.section`
    width: 100%;
    max-width: 1200px;
    padding: 80px 40px;
    text-align: center;
`;

const ActionContent = styled.div`
    width: 100%;
`;

const ActionTitle = styled.h2`
    color: white;
    font-size: 38px;
    font-weight: 800;
    margin-bottom: 18px;

    @media (max-width: 768px) {
        font-size: 28px;
    }
`;

const ActionDescription = styled.p`
    color: rgba(255, 255, 255, 0.8);
    font-size: 20px;
    margin-bottom: 64px;

    @media (max-width: 768px) {
        font-size: 16px;
        margin-bottom: 46px;
    }
`;

const ActionGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
    max-width: 800px;
    margin: 0 auto;
`;

const ActionCard = styled.div`
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(15px);
    border-radius: 20px;
    padding: 40px 32px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        background: rgba(255, 255, 255, 0.15);
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
`;

const ActionCardIcon = styled.div`
    font-size: 48px;
    margin-bottom: 20px;
`;

const ActionCardTitle = styled.h3`
    color: white;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 16px;
`;

const ActionCardDesc = styled.p`
    color: rgba(255, 255, 255, 0.8);
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 32px;
`;

const ActionButton = styled(Button)`
    width: 100%;
`;

const FundingSection = styled.section`
    width: 100%;
    margin-top: 100px;
    display: flex;
    gap: 45px;
    flex-direction: column;
    position: relative;
    justify-content: flex-start;
    align-items: center;
    background: rgba(39, 39, 39, 0.18);
    box-shadow: inset 0 20px 50px rgba(5, 9, 15, 0.599);
    padding: 0px 40px 60px;
`;

const FundingTop = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    position: relative;
    top: -40px;
    width: 100%;
    max-width: 1360px;
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 40px;
        top: -100px;
    }
`;

const RabbitImageContainer = styled.div`
    position: absolute;
    left: 0rem;
    top: -6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    z-index: 1;
`;

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;
    gap: 20px;
`;

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;
    gap: 20px;
`;

const ErrorText = styled.p`
    color: #ff6b6b;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
`;

export default WithAuth(Funding);
