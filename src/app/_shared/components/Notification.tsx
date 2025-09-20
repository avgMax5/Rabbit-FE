import styled from "styled-components";

interface NotificationProps {
    notification: string;
    width: string;
}

function Notification({ notification, width }: NotificationProps) {
    return <Div $width={width}>{notification}</Div>;
}

const Div = styled.div<{ $width: string }>`
    position: absolute;
    display: flex;
    /* flex-wrap: wrap; */
    justify-content: start;
    z-index: 999;
    left: 0.2rem;
    width: ${(props) => props.$width};
    height: auto;
    border-radius: 3px;
    padding: 6px;
    background-color: #c2d6fd;
    box-shadow: 2px 2px 4px #00000076;

    font-size: 12px;
    font-family: var(--font-nanum-square);
    font-weight: 500;
    white-space: pre-line;
`;

export default Notification;
