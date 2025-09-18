import GlassBox from "@/app/personal/mypage/[user_id]/_components/GlassBox";
import styled from "styled-components";

const getTypeInfo = (type: "A" | "B" | "C") => {
    switch (type) {
        case "A":
            return {
                title: "A 희소 자산형",
                icon: "/images/icon/coin_rare.png",
                rarity: [true, true, true, true, true],
                liquidity: [true, false, false, false, false],
                accessibility: "다소 낮음",
            };
        case "B":
            return {
                title: "B 밸런스형",
                icon: "/images/icon/coin_balance.png",
                rarity: [true, true, true, false, false],
                liquidity: [true, true, true, false, false],
                accessibility: "중간",
            };
        case "C":
            return {
                title: "C 단가 친화형",
                icon: "/images/icon/coin_friend.png",
                rarity: [true, false, false, false, false],
                liquidity: [true, true, true, true, false],
                accessibility: "높음",
            };
    }
};

interface CoinTypeProps {
    type: "A" | "B" | "C";
}

function CoinType({ type }: CoinTypeProps) {
    const typeInfo = getTypeInfo(type);

    return (
        <GlassBox text="코인 유형" isNoti={true} notification="" color="#fff" backgroundColor="#000000">
            <TitleIconContainer>
                <TypeIcon src={typeInfo.icon} />
                <TypeTitle>{typeInfo.title}</TypeTitle>
            </TitleIconContainer>
            <TypeAttributes>
                <AttributeRow>
                    <AttributeLabel>희소성</AttributeLabel>
                    <AttributeBars>
                        {typeInfo.rarity.map((filled, index) => (
                            <Bar key={index} filled={filled} />
                        ))}
                    </AttributeBars>
                </AttributeRow>
                <AttributeRow>
                    <AttributeLabel>유동성</AttributeLabel>
                    <AttributeBars>
                        {typeInfo.liquidity.map((filled, index) => (
                            <Bar key={index} filled={filled} />
                        ))}
                    </AttributeBars>
                </AttributeRow>
                <AttributeRow>
                    <AttributeLabel>투자자 접근성</AttributeLabel>
                    <AttributeText>{typeInfo.accessibility}</AttributeText>
                </AttributeRow>
            </TypeAttributes>
        </GlassBox>
    );
}

const TitleIconContainer = styled.div`
    background-image: url("/images/personal/shared/space.jpeg");
    height: 7rem;
    padding: 1rem 0;
    margin-top: 0.6rem;
    margin-bottom: 0.8rem;
    box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.25);
`;

const TypeIcon = styled.img`
    width: 3rem;
    height: auto;
`;

const TypeTitle = styled.h3`
    color: #fff;
    font-size: 23px;
    font-weight: 900;
    text-align: center;
    margin: 0.5rem 0 0 0;
`;

const TypeAttributes = styled.div`
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
`;

const AttributeRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const AttributeLabel = styled.span`
    color: #ffffff;
    font-size: 0.7rem;
    font-weight: 600;
`;

const AttributeBars = styled.div`
    display: flex;
    gap: 0.25rem;
`;

const Bar = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "filled",
})<{ filled?: boolean }>`
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background: ${(props) => (props.filled ? "#0044e4" : "#555")};
`;

const AttributeText = styled.span`
    color: #225dfd;
    font-size: 0.7rem;
    font-weight: 600;
`;

export default CoinType;
