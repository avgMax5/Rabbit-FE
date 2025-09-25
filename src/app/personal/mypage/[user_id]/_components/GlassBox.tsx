import styled from "styled-components";
import React, { ReactNode, useState } from "react";
import { Icon } from "@iconify/react";
import Notification from "../../../../_shared/components/Notification";

interface GlassBoxProps {
    children?: ReactNode;
    text: string;
    isNoti: boolean;
    notification?: string;
    color?: string;
    backgroundColor?: string;
    backgroundImage?: string;
    iconColor?: string;
}

function GlassBox({
    children,
    text,
    isNoti,
    notification,
    color = "#333232fe",
    backgroundColor = "#ffffff",
    backgroundImage = "none",
    iconColor = "#ffffffc2",
}: GlassBoxProps) {
    const [mouseEnter, setMouseEnter] = useState(false);
    const getNotiModal = () => {
        setMouseEnter(true);
    };
    const handleMouseLeave = () => {
        setMouseEnter(false);
    };

    return (
        <Div
            $backgroundColor={backgroundColor}
            $backgroundImage={backgroundImage}
        >
            <Top>
                <Title $color={color}>{text}</Title>
                {isNoti && (
                    <IconContainer>
                        <Icon
                            icon="mingcute:question-fill"
                            color={iconColor}
                            width="13px"
                            onMouseEnter={getNotiModal}
                            onMouseLeave={handleMouseLeave}
                        />
                        {mouseEnter && notification && (
                            <Notification
                                notification={notification}
                                width="10px"
                            />
                        )}
                    </IconContainer>
                )}
            </Top>
            <Main>{children}</Main>
        </Div>
    );
}

const Div = styled.div<{ $backgroundColor: string; $backgroundImage: string }>`
    width: 100%;
    height: 100%;
    padding: 0.6rem;
    display: grid;
    grid-template-rows: 1.6rem 1fr;
    text-align: center;
    border-radius: 12px;
    background: ${({ $backgroundColor, $backgroundImage }) =>
        $backgroundImage && $backgroundImage !== "none"
            ? `url(${$backgroundImage})`
            : $backgroundColor};
    background-repeat: no-repeat;
    background-size: cover;

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
    justify-content: start;
    align-items: center;
    gap: 0.2rem;
`;

const IconContainer = styled.div`
    position: relative;
    width: 1rem;
    height: 1rem;
`;

const Title = styled.div<{ $color: string }>`
    margin-left: 3px;
    font-size: 12px;
    font-weight: 800;
    color: ${({ $color }) => $color};
`;

const Main = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

export default GlassBox;
