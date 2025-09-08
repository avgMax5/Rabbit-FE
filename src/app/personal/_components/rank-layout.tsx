import styled from "styled-components";

function Rank() {
    return (
        <Div>
            <Line>
                <div>
                    <Number>1</Number>
                    <CoinName>minmin</CoinName>
                </div>
                <div>
                    <Percent>20,000</Percent>
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
    width: 2rem;
    height: 2rem;
    border-radius: 2rem;
    text-align: center;
    line-height: 2rem;
    background-color: #ffccc1;
    box-shadow: -2px -2px 2px 0 #ff9e88 inset, 2px 2px 2px 0 #ffdcd4 inset;
    filter: drop-shadow(2px 2px 2px #dfb8af);
`;

const CoinName = styled.div``;
const Percent = styled.div``;

export default Rank;
