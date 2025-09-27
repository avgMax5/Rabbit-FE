"use client";

import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import FundBunnyModal from "../_modal/FundBunnyModal";
import { updateCountdown } from "../_utils/countdown";

export default function FundBunnyCard({
    fundBunnyId,
    bunnyName,
    bunnyType,
    endAt,
    currentAmount,
    targetBny,
    avatarSrc,
    countdownColor = "#ff435f",
    showCountdown = false,
}: {
    fundBunnyId: string;
    bunnyName: string;
    bunnyType: string;
    endAt: string | null;
    currentAmount: number;
    targetBny: number;
    avatarSrc: string;
    countdownColor?: string;
    showCountdown?: boolean;
}) {
    const safeCurrentAmount = currentAmount ?? 0;
    const safeTargetBny = targetBny ?? 1;
    const progress =
        Math.round((safeCurrentAmount / safeTargetBny) * 100 * 10) / 10;
    const [mounted, setMounted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [countdown, setCountdown] = useState<string>("");

    // bunnyType에 따른 아이콘 매핑
    const getCoinTypeIcon = (type: string) => {
        switch (type.toUpperCase()) {
            case "A":
                return "/images/icon/coin_rare.png";
            case "B":
                return "/images/icon/coin_balance.png";
            case "C":
                return "/images/icon/coin_friend.png";
            default:
                return "/images/icon/coin_balance.png"; // 기본값
        }
    };

    const matchCoinTypeName = (type: string) => {
        switch (type.toUpperCase()) {
            case "A":
                return "희소자산형";
            case "B":
                return "밸런스형";
            case "C":
                return "단가친화형";
            default:
                return "밸런스형"; // 기본값
        }
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!endAt) return;

        updateCountdown(endAt, setCountdown);

        const interval = setInterval(() => {
            updateCountdown(endAt, setCountdown);
        }, 1000);

        return () => clearInterval(interval);
    }, [endAt]);

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <CardContainer onClick={handleCardClick}>
                <TopSection>
                    <LeftGroup>
                        <AvatarContainer>
                            <img
                                src={
                                    avatarSrc ??
                                    "/images/login/personalProfile.png"
                                }
                                alt="coin avatar"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "12px",
                                }}
                            />
                        </AvatarContainer>
                        <CoinInfo>
                            <CoinName>{bunnyName}</CoinName>
                            <CoinType>
                                <img
                                    src={getCoinTypeIcon(bunnyType)}
                                    alt={`${bunnyType} coin type`}
                                    style={{
                                        width: "25px",
                                        height: "100%",
                                        objectFit: "contain",
                                    }}
                                />
                                {matchCoinTypeName(bunnyType)}
                            </CoinType>
                        </CoinInfo>
                    </LeftGroup>
                    <ProgressCircle progress={progress}>
                        <svg>
                            <circle
                                className="bg-circle"
                                cx="30"
                                cy="30"
                                r="25"
                            />
                            <circle
                                className="progress-circle"
                                cx="30"
                                cy="30"
                                r="25"
                            />
                        </svg>
                        <ProgressText>{progress}%</ProgressText>
                    </ProgressCircle>
                </TopSection>

                {endAt && showCountdown && (
                    <CountdownSection>
                        <CountdownText countdownColor={countdownColor}>
                            {countdown}
                        </CountdownText>
                    </CountdownSection>
                )}

                <BottomSection>
                    <ProgressBarContainer>
                        <ProgressBar>
                            <ProgressFill progress={progress}>
                                <ProgressEndCircle />
                            </ProgressFill>
                        </ProgressBar>

                        <AmountBubble progress={progress}>
                            {safeCurrentAmount.toLocaleString()}
                        </AmountBubble>

                        <TotalAmount>
                            {safeTargetBny.toLocaleString()}
                        </TotalAmount>
                    </ProgressBarContainer>
                </BottomSection>
            </CardContainer>

            <FundBunnyModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                fundBunnyId={fundBunnyId}
            />
        </>
    );
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const progressFill = keyframes`
  from {
    width: 0%;
  }
  to {
    width: var(--progress-width);
  }
`;

const circleAppear = keyframes`
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const bubbleSlide = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(10px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
`;

const CardContainer = styled.div`
    background: rgba(255, 255, 255, 0.49);
    backdrop-filter: blur(60px);
    border-radius: 18px;
    border: 1px solid #ffffff98;
    padding: 1.5rem;
    box-shadow: 0 0.25rem 1.25rem rgba(0, 0, 0, 0.1);
    min-width: 22rem;
    min-height: 12rem;

    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    gap: 1rem;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        transform: translateY(-8px) !important;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
`;

const TopSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
`;

const LeftGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;
`;

const AvatarContainer = styled.div`
    width: 3.75rem;
    height: 3.75rem;
    border-radius: 0.75rem;
    background: linear-gradient(to right, #000428bb, #004e92bc);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const CoinInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const CoinName = styled.div`
    font-size: 18px;
    font-weight: 900;
    color: #ffffff;
`;

const CoinType = styled.div`
    font-size: 12px;
    font-weight: 700;
    color: #eefaff;
    background-color: #f5f5f561;
    width: 6.2rem;
    height: 1.8rem;
    padding: 0 8px 0 4px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

// const ProgressCircle = styled.div<{ progress: number }>`
//     width: 3.75rem;
//     height: 3.75rem;
//     border-radius: 50%;
//     background: conic-gradient(
//         #db7dfa90 ${(props) => props.progress * 3.6}deg,
//         #e2e2e2b0 ${(props) => props.progress * 3.6}deg,
//         #e0e0e088 360deg
//     );
//     box-shadow: inset 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.37);
//     //0.1875rem 0.1875rem 0.1875rem rgba(225, 87, 57, 0.25);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     position: relative;
//     animation: ${scaleIn} 0.8s ease-out 0.3s both;

//     &::before {
//         content: "";
//         position: absolute;
//         width: 2.5rem;
//         height: 2.5rem;
//         background-color: #fffffff1;
//         border-radius: 50%;
//     }
// `;

// const ProgressText = styled.div`
//     font-size: 12px;
//     font-weight: 900;
//     color: #000000;
//     z-index: 1;
//     animation: ${fadeIn} 0.3s ease-out 1s both;
// `;

const ScaleIn = keyframes`
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const FadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ProgressCircle = styled.div<{ progress: number }>`
    position: relative;
    width: 3.75rem;
    height: 3.75rem;
    animation: ${ScaleIn} 0.8s ease-out 0.3s both;

    svg {
        transform: rotate(-90deg);
        width: 100%;
        height: 100%;
    }

    circle {
        fill: none;
        stroke-width: 7;
    }

    .bg-circle {
        stroke: #e2e2e29b;
    }

    .progress-circle {
        stroke: #fb778f;
        stroke-linecap: round;
        stroke-dasharray: 157; // 2π × 25 (반지름)
        stroke-dashoffset: ${(props) => 157 - (props.progress / 100) * 157};
        transition: stroke-dashoffset 0.3s ease;
    }
`;

const ProgressText = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
    font-weight: 900;
    color: #000000;
    z-index: 1;
    animation: ${FadeIn} 0.3s ease-out 1s both;
`;

const CountdownSection = styled.div`
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${scaleIn} 0.4s ease-out 0.5s both;
`;

const CountdownText = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "countdownColor",
})<{ countdownColor: string }>`
    font-size: 36px;
    font-weight: 800;
    color: ${(props) => props.countdownColor};
`;

const BottomSection = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    animation: ${fadeIn} 0.5s ease-out 0.7s both;
`;

const ProgressBarContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
    overflow: visible;
`;

const ProgressBar = styled.div`
    width: 100%;
    height: 1.2rem;
    background-color: #ffffffa4;
    margin-top: 0.5rem;
    border-radius: 0.5rem;
    position: relative;
    overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
    height: 100%;
    background: radial-gradient(
            circle at top right,
            #9a87f2 0%,
            transparent 70%
        ),
        linear-gradient(
            253deg,
            #bee2f8 17.48%,
            #9de3fc 43.84%,
            #90c4fb 61%,
            #d0e5f6 94.06%
        );
    border-radius: 0.25rem;
    position: relative;
    --progress-width: ${(props) => props.progress}%;
    animation: ${progressFill} 1.5s ease-out 0.8s both;
`;

const ProgressEndCircle = styled.div`
    position: absolute;
    right: -0.375rem;
    width: 1.25rem;
    height: 1.25rem;
    background-color: #a38eff;
    border-radius: 50%;
    box-shadow: 0.125rem 0 0.25rem rgba(45, 1, 87, 0.3);
    animation: ${circleAppear} 0.3s ease-out 2s both;
`;

const AmountBubble = styled.div<{ progress: number }>`
    position: absolute;
    top: -2rem;
    left: ${(props) => props.progress}%;
    background: linear-gradient(135deg, #4a90e2 0%, #357abd 50%, #2e6da4 100%);
    color: #ffffff;
    padding: 0.375rem 0.625rem;
    border-radius: 0.75rem;
    font-size: 12px;
    font-weight: 800;
    transform: translateX(-50%);
    box-shadow: 0 0.25rem 0.9375rem rgba(74, 144, 226, 0.4),
        inset 0 1px 2px rgba(255, 255, 255, 0.4),
        inset 0 -1px 0 rgba(0, 0, 0, 0.15),
        0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
    white-space: nowrap;
    z-index: 10;
    animation: ${bubbleSlide} 0.5s ease-out 2.3s both;
    text-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.4);

    &::after {
        content: "";
        position: absolute;
        bottom: -0.35rem;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 0.375rem solid transparent;
        border-right: 0.375rem solid transparent;
        border-top: 0.375rem solid #2e6da4;
        filter: drop-shadow(0 0.125rem 0.25rem rgba(0, 0, 0, 0.2));
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(0, 0, 0, 0.1) 100%
        );
        border-radius: 0.75rem;
        pointer-events: none;
    }
`;

const TotalAmount = styled.div`
    font-size: 12px;
    font-weight: 600;
    color: #4d4d4d;
    text-align: right;
    animation: ${fadeIn} 0.5s ease-out 2.6s both;
`;
