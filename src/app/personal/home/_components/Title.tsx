import styled from "styled-components";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Notification from "@/app/_shared/components/Notification";
import { getYesterdayMidnight } from "../_components/ListContainer";

interface TitleProps {
    content: string;
    isNoti: boolean;
    notification?: string;
    icon?: string;
    time: boolean;
    notiWidth?: string;
}

function Title({
    content,
    isNoti,
    notification,
    icon,
    time,
    notiWidth = "220px",
}: TitleProps) {
    const [mouseEnter, setMouseEnter] = useState(false);
    const getNotiModal = () => {
        setMouseEnter(true);
    };
    const handleMouseLeave = () => {
        setMouseEnter(false);
    };
    const date = getYesterdayMidnight();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 1 → 01
    const day = String(date.getDate()).padStart(2, "0");
    const formatted = `${year}-${month}-${day} 00:00`;

    return (
        <Container>
            <div>
                <Icon icon={icon ?? "none"} width="24px" color="#ffffff" />
                <Content>{content}</Content>
                {isNoti && (
                    <IconContainer>
                        <Icon
                            icon="mingcute:question-fill"
                            color="#fcfcfc"
                            width="18px"
                            onMouseEnter={getNotiModal}
                            onMouseLeave={handleMouseLeave}
                        />
                        {mouseEnter && notification && (
                            <Notification
                                notification={notification}
                                width={notiWidth}
                            />
                        )}
                    </IconContainer>
                )}
            </div>
            <Time>{time ? formatted : ""}</Time>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 3.5rem;
    line-height: 2.6rem;
    display: flex;
    gap: 1.7rem;
    text-align: center;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 800;
    color: #fff;
    cursor: pointer;

    padding: 0 1rem;
    margin-bottom: 1.2rem;
    border: none;
    border-radius: 8px;
    background-size: 300% 100%;
    background-image: linear-gradient(
        to right,
        #667eeabb,
        #a86ce5a1,
        #89acf7fe,
        #9539e1ba
    );
    box-shadow: 4px 4px 4px 0 rgba(116, 79, 168, 0.242);
    transition: all 0.4s ease-in-out;

    &:hover {
        background-position: 100% 0;
        transition: all 0.4s ease-in-out;
    }

    &:focus {
        outline: none;
    }

    & > div {
        display: flex;
        align-items: center;
        gap: 0.4rem;
    }
`;

const IconImg = styled.div`
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 1.6rem;
    background-color: #113b60;
`;

const Content = styled.div`
    width: auto;
    color: #fff;
`;

const IconContainer = styled.div`
    position: relative;
    text-align: center;
    width: 1.2rem;
    height: 2rem;
    cursor: pointer;
`;

const Time = styled.div`
    font-size: 12.5px;
    color: #ffffff;
`;

export default Title;
