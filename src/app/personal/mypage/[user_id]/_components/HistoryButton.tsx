import styled from "styled-components";

function HistoryButton() {
    return (
        <Div>
            <Main>
                <RabbitImg src="/images/personal/mypage/sit_rabbit.png" />
                <span>총</span>
                <TotalLength>14</TotalLength>
                <span>건</span>
                <div>거래 기록 보기</div>
            </Main>
        </Div>
    );
}

const Div = styled.div`
    width: 98%;
    height: 100%;
    padding-top: 2rem;
`;

const RabbitImg = styled.img`
    position: absolute;
    top: -1.2rem;
    right: 0;
    width: 1.3rem;
    height: auto;
`;

const Main = styled.div`
    position: relative;
    width: 98%;
    height: 8rem;
    background-image: url("/images/personal/mypage/earth.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: right bottom;
    border-radius: 10px;
    box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25);
`;
const TotalLength = styled.span``;

export default HistoryButton;
