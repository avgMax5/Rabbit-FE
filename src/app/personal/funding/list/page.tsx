"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "@/app/_shared/components/Header";
import Loading from "@/app/_shared/components/Loading";
import Footer from "@/app/_shared/components/Footer";
import FundBunnyCard from "../_components/FundBunnyCard";
import { useFundingStore, FundBunny } from "@/app/_store/fundingStore";
import Link from "next/link";
import { SpaceBackground } from "@/app/_shared/components";

// 정렬 타입 정의
type SortType = "latest" | "oldest" | "highInvestment" | "lowInvestment";

export default function List() {
    const [sortType, setSortType] = useState<SortType>("latest");
    const [mounted, setMounted] = useState(false);
    const { fundBunnies, isLoading, error, fetchFundBunnies, clearFundBunnies } =
        useFundingStore();

    useEffect(() => {
        setMounted(true);
        fetchFundBunnies({ sortType: "newest", page: 0, size: 50 });
    }, [fetchFundBunnies]);

    const handleSort = (type: SortType) => {
        setSortType(type);
        clearFundBunnies(); // 기존 데이터 초기화

        let apiSortType: string;
        switch (type) {
            case "latest":
                apiSortType = "newest";
                break;
            case "oldest":
                apiSortType = "oldest";
                break;
            case "highInvestment":
                apiSortType = "mostInvested";
                break;
            case "lowInvestment":
                apiSortType = "leastInvested";
                break;
            default:
                apiSortType = "newest";
        }

        fetchFundBunnies({ sortType: apiSortType, page: 0, size: 50 });
    };


    if (!mounted || isLoading) {
        return (
            <SpaceBackground>
                <Container>
                    <Header />
                    <MainContent>
                        <LoadingContainer>
                            <Loading
                                variant="dots"
                                size="large"
                                text="펀딩 목록을 불러오는 중..."
                            />
                        </LoadingContainer>
                    </MainContent>
                </Container>
            </SpaceBackground>
        );
    }

    if (error) {
        return (
            <SpaceBackground>
                <Container>
                    <Header />
                    <MainContent>
                        <div
                            style={{
                                textAlign: "center",
                                padding: "2rem",
                                color: "#ff6b6b",
                            }}
                        >
                            오류가 발생했습니다: {error}
                        </div>
                    </MainContent>
                </Container>
            </SpaceBackground>
        );
    }

    return (
        <SpaceBackground>
            <Container>
                <Header />
                <Link href="/personal/funding">
                    <GoFundingMain>
                        &lt; &nbsp; 심사 메인으로 돌아가기
                    </GoFundingMain>
                </Link>
                <PageDescription>
                    <PageTitle>펀드 버니 목록</PageTitle>
                    <PageSubtitle>
                        다양한 펀드 버니들의 투자 현황을 확인하고, 원하는 조건으로 정렬해보세요.
                        <br />
                        투자 기회를 놓치지 마세요!
                    </PageSubtitle>
                </PageDescription>
                <SortSectionWrapper>
                    <SortSection>
                        <SortButtons>
                            <SortButton
                                active={sortType === "latest"}
                                onClick={() => handleSort("latest")}
                            >
                                최신순
                            </SortButton>
                            <SortButton
                                active={sortType === "highInvestment"}
                                onClick={() => handleSort("highInvestment")}
                            >
                                상장 임박
                            </SortButton>
                            <SortButton
                                active={sortType === "oldest"}
                                onClick={() => handleSort("oldest")}
                            >
                                마감임박
                            </SortButton>
                        </SortButtons>
                    </SortSection>
                </SortSectionWrapper>

                <MainContent>
                    <GridContainer>
                        {fundBunnies.length === 0 ? (
                            <div
                                style={{
                                    gridColumn: "1 / -1",
                                    textAlign: "center",
                                    padding: "3rem",
                                    color: "#B8B8B8",
                                }}
                            >
                                등록된 펀드 버니가 없습니다.
                            </div>
                        ) : (
                            fundBunnies.map((item) => (
                                <FundBunnyCard
                                    key={item.fund_bunny_id}
                                    fundBunnyId={item.fund_bunny_id}
                                    bunnyName={item.bunny_name}
                                    bunnyType={item.bunny_type}
                                    endAt={item.end_at}
                                    currentAmount={item.collected_bny}
                                    targetBny={item.target_bny}
                                    avatarSrc={item.image || "/images/login/personalProfile.png"}
                                    showCountdown={true}
                                />
                            ))
                        )}
                    </GridContainer>
                </MainContent>
                <Footer />
            </Container>
        </SpaceBackground>
    );
}

const Container = styled.div`
    min-height: 100vh;
    padding-top: 120px; /* Header 높이만큼 상단 여백 추가 */
    display: flex;
    flex-direction: column;
`;

const GoFundingMain = styled.div`
    width: 10rem;
    font-size: 14px;
    color: #ddddddcc;
    padding-bottom: 4.4px;
    margin-left: 3rem;
    border-bottom: 0.8px solid #ddddddcc;
    position: relative;
    z-index: 10;
    display: inline;

    &:hover {
        color: #ffffff;
        font-weight: 600;
        border-bottom: 0.8px solid #ffffffcc;
    }
`;

const PageDescription = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    z-index: 10;
    padding: 2rem 2rem 0.5rem 2rem;

    @media (max-width: 768px) {
        padding: 1.5rem 2rem 0.5rem 2rem;
    }
`;

const PageTitle = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    color: #FBC95E;
    margin-bottom: 0.75rem;
    letter-spacing: -0.5px;
    text-shadow: 0 2px 4px rgba(251, 201, 94, 0.3);

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
`;

const PageSubtitle = styled.p`
    font-size: 1rem;
    color: #B8B8B8;
    line-height: 1.5;
    max-width: 600px;
    margin: 0 auto;

    @media (max-width: 768px) {
        font-size: 0.9rem;
    }
`;

const MainContent = styled.main`
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    flex: 1;
`;

const SortSectionWrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
`;

const SortSection = styled.section`
    width: 100%;
    padding: 2rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
`;

const SortButtons = styled.div`
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        gap: 0.5rem;
    }
`;

const SortButton = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>`
    background: ${(props) =>
        props.active
            ? "linear-gradient(135deg, rgba(251, 201, 94, 0.2) 0%, rgba(255, 225, 163, 0.15) 100%)"
            : "rgba(255, 255, 255, 0.126)"};
    color: ${(props) => (props.active ? "#FBC95E" : "#ededed")};
    border: ${(props) =>
        props.active
            ? "2px solid rgba(251, 201, 94, 0.4)"
            : "1px solid rgba(255, 255, 255, 0.33)"};
    padding: 0.875rem 1.75rem;
    border-radius: 12px;
    font-size: 14px;
    font-weight: ${(props) => (props.active ? "600" : "500")};
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    min-width: 120px;
    position: relative;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
        );
        transition: left 0.6s;
    }

    &:hover {
        background: ${(props) =>
            props.active
                ? "linear-gradient(135deg, rgba(251, 201, 94, 0.3) 0%, rgba(255, 225, 163, 0.2) 100%)"
                : "rgba(255, 255, 255, 0.08)"};
        border-color: ${(props) =>
            props.active
                ? "rgba(251, 201, 94, 0.6)"
                : "rgba(255, 255, 255, 0.2)"};
        color: ${(props) => (props.active ? "#FBC95E" : "#E0E0E0")};
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);

        &::before {
            left: 100%;
        }
    }

    &:active {
        transform: translateY(0);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    ${(props) =>
        props.active &&
        `
    box-shadow: 0 4px 16px rgba(251, 201, 94, 0.15);
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 12px;
      width: 6px;
      height: 6px;
      background: #FBC95E;
      border-radius: 50%;
      transform: translateY(-50%);
      box-shadow: 0 0 8px rgba(251, 201, 94, 0.6);
    }
  `}

    @media (max-width: 768px) {
        min-width: 100px;
        padding: 0.75rem 1.25rem;
        font-size: 13px;
    }
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    padding: 2rem;
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    justify-items: center;

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;
