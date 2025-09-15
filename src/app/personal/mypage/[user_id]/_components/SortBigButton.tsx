import styled from "styled-components";

function SortBigButton() {
    return (
        <Div>
            <SortTitle>직군</SortTitle>
            <MainSection>
                <LeftContainer>
                    <Top1Title>FRONTEND</Top1Title>
                    <Top1Carrot>20,000</Top1Carrot>
                    <GraphRatio></GraphRatio>
                </LeftContainer>
                <GraphContainer></GraphContainer>
            </MainSection>
        </Div>
    );
}

const Div = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 8px;
    display: grid;
    grid-template-rows: 0.6fr 3fr;
    background-color: #eaeaea4a;
    box-shadow: -2px -2px 4px 0 rgba(0, 0, 0, 0.14) inset,
        2px 2px 4px 0 rgba(231, 231, 231, 0.25) inset;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25));
`;

const SortTitle = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 0.6rem 0 0 0.6rem;

    font-size: 18px;
    font-weight: 700;
`;

const MainSection = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 0.8rem;
    display: grid;
    grid-template-columns: 4fr 4.5fr;
`;

const LeftContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 0.5rem 0rem;
    display: grid;
    grid-template-rows: 1fr 1.5fr 3fr;
`;

const Top1Title = styled.div`
    width: 100%;
    height: 100%;

    font-size: 10px;
    font-weight: 500;
`;

const Top1Carrot = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-shrink: 0;
    justify-content: start;

    font-size: 21px;
    font-weight: 900;
`;

const GraphRatio = styled.div`
    width: 100%;
    height: 100%;
    background-color: #592;
`;

const GraphContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #019;
`;

export default SortBigButton;
