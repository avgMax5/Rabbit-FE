import styled from "styled-components";

interface NotificationProps {
    notification: string;
}

function Notification({ notification }: NotificationProps) {
    return <Div>{notification}</Div>;
}

const Div = styled.div`
    position: absolute;
    z-index: 999;
    left: 0.2rem;
    width: 10rem;
    height: auto;
    border-radius: 3px;
    padding: 6px;
    display: flex;
    flex-wrap: wrap;
    background-color: #c2d6fd;
    box-shadow: 2px 2px 4px #00000076;
`;

export default Notification;
