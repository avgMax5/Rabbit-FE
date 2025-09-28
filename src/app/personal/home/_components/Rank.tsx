import styled from "styled-components";
import { BunnyPressureData } from "../_types/interfaces";

interface RankProps {
    rank: number;
    data: BunnyPressureData;
}

function Rank({ rank, data }: RankProps) {
    return (
        <Div>
            <Line>
                <LeftBox>
                    <Number>{rank}</Number>
                    <CoinName>{data.bunny_name}</CoinName>
                </LeftBox>
                <RightBox>
                    <Percent>{Math.min(data.pressure, 500)}</Percent>
                    <span>%</span>
                </RightBox>
            </Line>
        </Div>
    );
}

const Div = styled.div`
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    padding: 10px 8px;
    border-radius: 7px;
    background-color: #f0f8ff38;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
        transform: scale(1.02);
    }
`;

const Line = styled.div`
    width: 100%;
    height: 2rem;
    display: flex;
    text-align: center;
    line-height: 2rem;

    justify-content: space-between;
    & > div {
        display: flex;
        gap: 0.5rem;
    }
`;

const LeftBox = styled.div`
    display: flex;
    align-items: center;
`;

const Number = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
    font-size: 10px;
    font-weight: 900;
    background: linear-gradient(to right, #c654e3e8, #d77f9cdd);
    flex-shrink: 0;
`;

const CoinName = styled.div`
    color: #fff;
    font-size: 14px;
    font-weight: 800;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const RightBox = styled.div`
    font-size: 16px;
    font-weight: 900;
    color: #8696ff;
`;
const Percent = styled.div``;

export default Rank;
