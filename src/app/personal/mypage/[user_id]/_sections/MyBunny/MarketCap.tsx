import GlassBox from "@/app/personal/mypage/[user_id]/_components/GlassBox";
import styled from "styled-components";

interface MarketCapProps {
    total: string;
    price: string;
}

function MarketCap({ total, price }: MarketCapProps) {
    return (
        <GlassBox
            text="시가총액"
            isNoti={true}
            notification="시가총액계산"
            iconColor="#2d2d2d"
        >
            <TotalContainer>
                <Total>{total}</Total>
                <CarrotImg src="/images/personal/home/carrot.png" />
            </TotalContainer>
            <Bny>
                <span>1BNY</span>
                <span>{price}</span>
            </Bny>
        </GlassBox>
    );
}

const TotalContainer = styled.div`
    width: 100%;
    height: 3rem;
    padding: 4px;
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 3rem;
`;

const Total = styled.div`
    height: 20px;
    text-align: center;
    line-height: 25px;
    font-family: var(--font-rockstar);
    font-size: 20px;
    font-weight: 900;
`;

const CarrotImg = styled.img`
    width: 18px;
    height: 18px;
`;

const Bny = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 0.3rem;
    font-size: 12px;
    font-weight: 700;
    color: #373737;
`;

export default MarketCap;
