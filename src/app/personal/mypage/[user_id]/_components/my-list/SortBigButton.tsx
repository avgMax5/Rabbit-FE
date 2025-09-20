import styled from "styled-components";
import NightingaleChart, { ChartData } from "../chart/NightingaleChart";

interface SortBigButtonProps {
    sortTitle: string;
    top1Title: string;
    top1Carrot: number;
    chartData: ChartData;
    colors?: string[];
}

function SortBigButton({
    sortTitle,
    top1Title,
    top1Carrot,
    chartData,
    colors,
}: SortBigButtonProps) {
    // 직군별 호버 배경색 결정
    const getHoverBackgroundColor = (title: string) => {
        if (title.includes("직군")) {
            return "rgb(251, 244, 237)";
        } else if (title.includes("개발자 유형")) {
            return "rgb(235, 247, 244)";
        } else if (title.includes("버니 유형")) {
            return "rgb(246, 236, 246)";
        }
        return "rgba(223, 223, 223)";
    };

    return (
        <Div $hoverColor={getHoverBackgroundColor(sortTitle)}>
            <TopContainer>
                <SortTitle className="sort-title">{sortTitle}</SortTitle>
                <GraphBox>
                    <NightingaleChart
                        data={chartData}
                        colors={colors}
                        inner={"30%"}
                        outer={"80%"}
                    />
                </GraphBox>
            </TopContainer>

            <BottomContainer>
                <TextBox>
                    <Top1Text>TOP 1</Top1Text>
                    <Top1Title>{top1Title}</Top1Title>
                </TextBox>
                <Top1Carrot>{top1Carrot}</Top1Carrot>
            </BottomContainer>
        </Div>
    );
}

const Div = styled.div<{ $hoverColor: string }>`
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0.6rem;
    box-sizing: border-box;
    border-radius: 8px;

    display: grid;
    grid-template-rows: 3fr 1fr;
    background: #ffffffec;
    box-shadow: -2px -2px 4px 0 rgba(0, 0, 0, 0.14) inset,
        2px 2px 4px 0 rgba(231, 231, 231, 0.25) inset;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25));
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.02);
        background: ${(props) => props.$hoverColor};
        filter: drop-shadow(4px 8px 12px rgba(0, 0, 0, 0.2));
        z-index: 10;

        .sort-title {
            font-weight: 900;
        }
    }
`;

const TopContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const SortTitle = styled.div`
    position: absolute;
    font-size: 17px;
    font-weight: 600;
`;

const GraphBox = styled.div`
    width: 100%;
    height: 100%;
`;

const BottomContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const TextBox = styled.div`
    width: 3rem;
    height: 100%;
    display: grid;
    justify-content: space-between;
`;

const Top1Title = styled.div`
    width: 100%;
    height: 100%;
    font-size: 10px;
    font-weight: 600;
`;

const Top1Carrot = styled.div`
    font-size: 22px;
    font-weight: 800;
`;

const Top1Text = styled.div`
    font-size: 15px;
    font-weight: 800;
`;

export default SortBigButton;
