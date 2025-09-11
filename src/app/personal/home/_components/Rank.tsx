import styled from "styled-components";
import { DataType } from "../page";

interface RankProps {
    data: DataType;
}

function Rank({ data }: RankProps) {
    return (
        <Div>
            <Line>
                <div>
                    <Number>{data.id + 1}</Number>
                    <CoinName>{data.coin_name}</CoinName>
                </div>
                <div>
                    <Percent>{data.percent}</Percent>
                    <span>%</span>
                </div>
            </Line>
        </Div>
    );
}

const Div = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 3rem;
    padding: 0 0.8rem;
    align-items: center;
    flex-shrink: 0;

    background: rgba(255, 255, 255, 0.7);
    box-shadow: 2px 2px 4px 0 rgba(255, 255, 255, 0.25) inset,
        3px 3px 4px 0 #c0c0c0;

    font-family: var(--font-nanum-squar);
    font-weight: 900;
    font-size: 16px;
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

const Number = styled.div`
    width: 1.8rem;
    height: 1%.8;
    border-radius: 2rem;
    text-align: center;
    line-height: 2rem;
    background-color: #facdc2;
    box-shadow: -2px -2px 2px 0 #ffaa97 inset, 2px 2px 2px 0 #ffdcd4 inset;
    filter: drop-shadow(2px 2px 2px #dfb8af);
`;

const CoinName = styled.div``;

const Percent = styled.div``;

export default Rank;
