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
import SloganContainer from "./_components/SloganContainer";
import { useFundingStore } from "../../_store/fundingStore";

export default function Publish() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    
    const { bunnies, isLoading, error, fetchBunnies, clearError } = useFundingStore();

    useEffect(() => {
        fetchBunnies();
    }, [fetchBunnies]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleButtonClick = (buttonText: string) => {
        if (buttonText === "버니 구경하기" || buttonText === "버니 전체 보기") {
            router.push("/personal/publish/list");
        } else if (buttonText === "상장심사 받기") {
            handleOpenModal();
        }
    };

    const sloganData = [
        {
            id: 1,
            mainText: "버니버니, 버니버니, 당근당근",
            subText: "마음에 드는 버니에게 당근을 주세요",
            buttonText: "버니 구경하기",
        },
        {
            id: 2,
            mainText: "버니로 평가받을 준비 되셨나요?",
            subText: "상장심사를 통해 Rabbit의 버니로 거듭나세요",
            buttonText: "상장심사 받기",
        },
    ];

    // 로딩 상태 처리
    if (isLoading) {
        return (
            <>
                <MainContainer />
                <ContentContainer>
                    <Header />
                    <LoadingContainer>
                        <LoadingText>펀딩 버니 데이터를 불러오는 중...</LoadingText>
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
                        <Button onClick={() => fetchBunnies()} variant="primary" size="medium">
                            다시 시도
                        </Button>
                    </ErrorContainer>
                </ContentContainer>
            </>
        );
    }

    return (
        <>
            <MainContainer />

            <ContentContainer>
                <Header />
                <SectionTop>
                    <SloganContainer sloganData={sloganData} />
                    <ButtonContainer>
                        <Button
                            onClick={() => handleButtonClick("버니 전체 보기")}
                            variant="primary"
                            size="large"
                        >
                            버니 전체 보기
                        </Button>
                        <Button
                            onClick={() => handleButtonClick("상장심사 받기")}
                            variant="primary"
                            size="large"
                        >
                            상장심사 받기
                        </Button>
                    </ButtonContainer>
                    <TopImageContainer>
                        <AstronautImage
                            src="/images/personal/publish/astronaut.png"
                            alt="astronaut"
                            width={75}
                            height={99}
                        />
                        <MoonImage
                            src="/images/personal/publish/moon.png"
                            alt="moon"
                            width={300}
                            height={300}
                        />
                    </TopImageContainer>
                </SectionTop>

                <SectionBottom>
                    <BottomTop>
                        <BottomLeftImageContainer>
                            <Image
                                src="/images/personal/publish/rabbit1.png"
                                alt="rabbit1"
                                width={73}
                                height={155}
                            />
                            <Image
                                src="/images/personal/publish/rabbit2.png"
                                alt="rabbit1"
                                width={73}
                                height={155}
                            />
                            <Image
                                src="/images/personal/publish/rabbit3.png"
                                alt="rabbit1"
                                width={73}
                                height={155}
                            />
                        </BottomLeftImageContainer>

                        <CoinState />

                        <BottomRightImageContainer>
                            <Image
                                src="/images/personal/publish/rabbit4.png"
                                alt="rabbit1"
                                width={73}
                                height={155}
                            />
                            <Image
                                src="/images/personal/publish/rabbit5.png"
                                alt="rabbit1"
                                width={73}
                                height={155}
                            />
                        </BottomRightImageContainer>
                    </BottomTop>

                    <EndingSoon bunnies={bunnies} />
                    <NowFunding bunnies={bunnies} />
                </SectionBottom>
            </ContentContainer>

            <CreateBunnyModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    );
}

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
    justify-content: center;
    z-index: 1;
`;

const SectionTop = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    margin-top: 185px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const TopImageContainer = styled.div`
    position: absolute;
    top: -20px;
    right: 100px;
    width: 100%;
    height: 100%;
    z-index: 1;
`;

const MoonImage = styled(Image)`
    width: 250px;
    height: 250px;
    position: absolute;
    top: 10%;
    right: 10%;
    z-index: 1;
`;

const AstronautImage = styled(Image)`
    width: 75px;
    height: 99px;
    position: absolute;
    top: 5%;
    right: 23%;
    z-index: 2;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 24px;
    z-index: 1;
`;

const SectionBottom = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 400px;
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: flex-start;
    align-items: center;
    background-color: rgba(39, 39, 39, 0.18);
    box-shadow: inset 0 20px 50px rgba(5, 9, 15, 0.8);
    padding-top: 200px;
`;

const BottomTop = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    top: -200px;
    gap: 100px;
`;

const BottomLeftImageContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 24px;
    position: absolute;
    right: 400px;
    top: -100px;
    z-index: 1;
`;

const BottomRightImageContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 24px;
    position: absolute;
    top: -50px;
    left: 500px;
    z-index: 1;

    @media (max-width: 1200px) {
        right: 2%;
        gap: 16px;
    }

    @media (max-width: 768px) {
        right: 1%;
        gap: 12px;
    }
`;

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;
    gap: 20px;
`;

const LoadingText = styled.p`
    color: white;
    font-size: 18px;
    font-weight: 500;
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
