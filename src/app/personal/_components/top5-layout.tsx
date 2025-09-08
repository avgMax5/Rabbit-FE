import styled from "styled-components";

const Div = styled.div`
    display: flex;
    width: 100%;
    height: 6rem;
    padding: 10px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    flex-shrink: 0;

    color: #000;
    background: rgba(255, 255, 255, 0.673);
    box-shadow: -2px -2px 4px 0 rgba(17, 17, 17, 0.25) inset,
        2px 2px 4px 0 rgba(255, 255, 255, 0.323) inset, 3px 3px 4px 0 #c0c0c0;
`;

const Content = styled.div`
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
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

const Standard = styled.div`
    color: #707070;
    font-family: "NanumSquare Neo variable";
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
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

const Carrot = styled.div``;

const CarrotImg = styled.img`
    height: 1.5rem;
`;

function Top5() {
    return (
        <Div>
            <Standard>직군별</Standard>
            <Content>
                <Line>
                    <div>
                        <Number>1</Number>
                        <CoinName>minmin</CoinName>
                    </div>
                    <div>
                        <Carrot>20,000</Carrot>
                        <CarrotImg
                            src="./images/personal/main/carrot.png"
                            alt="당근"
                        />
                    </div>
                </Line>
            </Content>
        </Div>
    );
}

export default Top5;
