import styled from "styled-components";
import React, { ReactNode, useState } from "react";
import Notification from "./my-list/Notification";

interface GlassBoxProps {
    children?: ReactNode;
    text: string;
    isNoti: boolean;
    notification?: string;
    color?: string;
    backgroundColor?: string;
}

function GlassBox({ children, text, isNoti, notification, color = "#000", backgroundColor = "#e5f0faa1" }: GlassBoxProps) {
    const [mouseEnter, setMouseEnter] = useState(false);
    const getNotiModal = () => {
        setMouseEnter(true);
    };
    const handleMouseLeave = () => {
        setMouseEnter(false);
    };

    return (
        <Div $backgroundColor={backgroundColor}>
            <Top>
                <Title $color={color}>{text}</Title>
                {isNoti && (
                    <IconContainer>
                        <svg
                            onMouseEnter={getNotiModal}
                            onMouseLeave={handleMouseLeave}
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 9 9"
                            fill="none"
                        >
                            <path
                                d="M4.5 9C2.01465 9 0 6.98535 0 4.5C0 2.01465 2.01465 0 4.5 0C6.98535 0 9 2.01465 9 4.5C9 6.98535 6.98535 9 4.5 9ZM4.05 5.85V6.75H4.95V5.85H4.05ZM4.95 5.10975C5.31165 5.00075 5.62212 4.76548 5.82487 4.44678C6.02762 4.12809 6.10915 3.74717 6.05463 3.37341C6.00011 2.99965 5.81315 2.6579 5.52781 2.41041C5.24246 2.16291 4.87772 2.02614 4.5 2.025C4.13586 2.02489 3.78293 2.15095 3.50127 2.38174C3.21961 2.61254 3.02663 2.93379 2.95515 3.29085L3.83805 3.4677C3.86311 3.34234 3.92324 3.22668 4.01147 3.13417C4.09969 3.04165 4.21237 2.97609 4.33639 2.94512C4.46042 2.91414 4.59069 2.91902 4.71205 2.95919C4.83341 2.99935 4.94087 3.07316 5.02192 3.17201C5.10298 3.27086 5.1543 3.3907 5.16991 3.51758C5.18552 3.64446 5.16477 3.77316 5.1101 3.88871C5.05542 4.00426 4.96905 4.10191 4.86105 4.1703C4.75304 4.23868 4.62784 4.27499 4.5 4.275C4.38065 4.275 4.26619 4.32241 4.1818 4.4068C4.09741 4.49119 4.05 4.60565 4.05 4.725V5.4H4.95V5.10975Z"
                                fill="#120F0F"
                            />
                        </svg>
                        {mouseEnter && notification && (
                            <Notification notification={notification} />
                        )}
                    </IconContainer>
                )}
            </Top>
            <Main>{children}</Main>
        </Div>
    );
}

const Div = styled.div<{ $backgroundColor: string }>`
    width: 100%;
    height: 100%;
    padding: 0.6rem;
    display: grid;
    grid-template-rows: 1.6rem 1fr;
    text-align: center;
    border-radius: 12px;
    background: ${({ $backgroundColor }) => $backgroundColor};
    box-shadow: -2px -2px 4px 0 rgba(0, 0, 0, 0.14) inset,
        2px 2px 4px 0 rgba(231, 231, 231, 0.25) inset;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25));
    transition: transform 0.3s ease;
    cursor: pointer;
    
    &:hover {
        transform: translateY(-2px);
    }
`;

const Top = styled.div`
    width: 100%;
    height: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.2rem;
`;

const IconContainer = styled.div`
    position: relative;
    width: 1rem;
    height: 1rem;
`;

const Title = styled.div<{ $color: string }>`
    font-size: 16px;
    font-weight: 800;
    color: ${({ $color }) => $color};
`;

const Main = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

export default GlassBox;
