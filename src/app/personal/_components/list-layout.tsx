import styled from "styled-components";

function List() {
    return (
        <Div>
            <FieldContainer>
                <span>Coin</span>
                <span>Role</span>
                <span>Dev Type</span>
                <span>Coin Type</span>
                <span>Current Price</span>
                <span>Badge</span>
            </FieldContainer>
            <RowContainer>
                <Erow />
                <Orow />
            </RowContainer>
        </Div>
    );
}

const row = styled.div`
    width: 100%;
    height: 2.2rem;
    text-align: center;
    line-height: 2.2rem;
`;

const Div = styled.div`
    display: grid;
    grid-template-rows: 2fr 8fr;
    gap: 0.5rem;
    width: 100%;
    height: 20rem;
    align-items: center;
    flex-shrink: 0;

    border-radius: 2px;
    background: rgba(255, 255, 255, 0.18);
    box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25);
    margin-top: 1rem;
`;
const FieldContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12%;
    padding: 0.7rem 1.2rem;
`;
const RowContainer = styled.div`
    overflow-y: auto;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
`;
const Erow = styled(row)`
    background: #fff;
    box-shadow: 1px 1px 10px 0 rgba(204, 204, 204, 0.25) inset,
        0 2px 2px 0 rgba(0, 0, 0, 0.25);
`;
const Orow = styled(row)`
    background: #f1f1f1;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
`;

export default List;
