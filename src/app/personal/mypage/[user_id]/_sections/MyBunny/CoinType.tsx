import GlassBox from "@/app/personal/mypage/[user_id]/_components/GlassBox";
import styled from "styled-components";

const getTypeInfo = (type?: string) => {
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
        default:
            return {
                title: "유형 미지정",
                icon: "/images/icon/coin_default.png",
                rarity: [false, false, false, false, false],
                liquidity: [false, false, false, false, false],
                accessibility: "정보 없음",
            };
    }
};

interface CoinTypeProps {
    type?: string;
}

function CoinType({ type }: CoinTypeProps) {
    const typeInfo = getTypeInfo(type);

    return (
        <GlassBox
            text="코인 유형"
            isNoti={true}
            notification="코인유형에 대한 설명"
            color="#e3e1e1f8"
            backgroundImage="/images/personal/shared/space.jpeg"
        >
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
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #46464682;
    height: 5rem;
    padding: 1rem 0;
    border-radius: 6px;
    margin-top: 1.3rem;
    margin-bottom: 0.8rem;
    box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.25);
`;

const TypeIcon = styled.img`
    width: 35px;
    height: auto;
`;

const TypeTitle = styled.h3`
    position: absolute;
    top: -19px;
    color: #fff;
    font-size: 22px;
    font-weight: 900;
    text-align: center;
    margin: 0.5rem 0 0 0;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.281);
`;

const TypeAttributes = styled.div`
    width: 100%;
    margin: 0 auto;
    margin-top: 2rem;
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
    background: ${(props) => (props.filled ? "#0d01ed" : "#a4a3a3b6")};
`;

const AttributeText = styled.span`
    color: #cddafc;
    font-size: 0.7rem;
    font-weight: 800;
`;

export default CoinType;
