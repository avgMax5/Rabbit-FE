import GlassBox from "@/app/personal/mypage/[user_id]/_components/GlassBox";
import styled from "styled-components";

function MarketCap() {
    return (
        <GlassBox text="시가총액" isNoti={true} notification="시가총액계산">
            <TotalContainer>
                <Total>20,000</Total>
                <CarrotImg src="/images/personal/home/carrot.png" />
            </TotalContainer>
            <Bny>
                <span>1BNY</span>
                <span>2,000</span>
            </Bny>
        </GlassBox>
    );
}

const TotalContainer = styled.div`
    width: 100%;
    height: 3rem;
    display: flex;
    gap: 0.8rem;
    align-items: center;
    justify-content: center;
`;

const Total = styled.div`
    font-size: 22px;
    font-weight: 900;
`;

const CarrotImg = styled.img`
    width: 18px;
    height: auto;
`;

const Bny = styled.div`
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 0.3rem;
    font-size: 12px;
    color: #373737;
`;

export default MarketCap;
