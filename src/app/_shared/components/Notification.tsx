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
    top: 100%;
    left: 0;
    display: flex;
    text-align: start;
    line-height: 1.2;
    justify-content: start;
    z-index: 9999;
    left: 0.2rem;
    width: ${(props) => props.$width};
    height: auto;
    padding: 6px;
    border-radius: 3px;
    background: linear-gradient(to right, #c2cffae3, #e2e2e2df);
    box-shadow: -2px -2px 4px 0 #eeeeeeea inset, 1px 1px 4px 0 #ffffffea inset;
    backdrop-filter: blur(25px);
    box-shadow: 2px 2px 4px #00000076;

    font-size: 12px;
    font-family: var(--font-nanum-square);
    font-weight: 500;
    white-space: pre-line;
    color: #0e0e0eac;
`;

export default Notification;
