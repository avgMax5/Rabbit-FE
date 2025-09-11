import styled from "styled-components";

function List() {
    const fieldList = [
        "코인명",
        "직군",
        "개발자유형",
        "코인유형",
        "등락률",
        "현재가",
        "뱃지",
    ];

    interface DataType {
        id: number;
        coin_name: string;
        job: string;
        dev_type: string;
        coin_type: string;
        fluctuation_rate: number;
        current_money: number;
        // badge: string[];
    }

    const Data: DataType[] = [
        {
            id: 0,
            coin_name: "coin1",
            job: "프론트엔드",
            dev_type: "희소 자산형",
            coin_type: "안정형",
            fluctuation_rate: -20.2,
            current_money: 20000,
            // badge: [],
        },
        {
            id: 1,
            coin_name: "coin2",
            job: "프론트엔드",
            dev_type: "희소 자산형",
            coin_type: "안정형",
            fluctuation_rate: -20.2,
            current_money: 20000,
            // badge: [],
        },
        {
            id: 2,
            coin_name: "coin3",
            job: "프론트엔드",
            dev_type: "희소 자산형",
            coin_type: "안정형",
            fluctuation_rate: -20.2,
            current_money: 20000,
            // badge: [],
        },
        {
            id: 3,
            coin_name: "coin4",
            job: "프론트엔드",
            dev_type: "희소 자산형",
            coin_type: "안정형",
            fluctuation_rate: -20.2,
            current_money: 20000,
            // badge: [],
        },
    ];

    return (
        <Div>
            <FieldContainer>
                {fieldList.map((field, i) => (
                    <span key={i}>{field}</span>
                ))}
            </FieldContainer>
            <RowContainer>
                {Data.map((data, i) => {
                    const RowComponent = i % 2 === 0 ? Erow : Orow;
                    return (
                        <RowComponent key={data.id}>
                            <span>{data.coin_name}</span>
                            <span>{data.job}</span>
                            <span>{data.dev_type}</span>
                            <span>{data.coin_type}</span>
                            <span>{data.fluctuation_rate}%</span>
                            <span>{data.current_money.toLocaleString()}</span>
                        </RowComponent>
                    );
                })}
            </RowContainer>
        </Div>
    );
}

const Row = styled.div`
    width: 100%;
    height: 2.2rem;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    align-items: center;
    text-align: center;
    flex-shrink: 0;
    padding: 0.7rem 0rem;

    font-family: var(--font-nanum-squar);
    font-weight: 800;
    font-size: 12px;
`;

const Div = styled.div`
    display: grid;
    grid-template-rows: 2fr 8fr;
    gap: 0.5rem;
    width: 100%;
    height: 22rem;
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
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    align-items: center;
    text-align: center;
    flex-shrink: 0;
    padding: 0.7rem 0rem;

    font-family: var(--font-nanum-squar);
    font-weight: 900;
    font-size: 14px;
    color: #ddd;

    & span {
        flex: 1;
        text-align: center;
    }
`;

const RowContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    gap: 0.6rem;
`;

const Erow = styled(Row)`
    background: #fff;
    box-shadow: 1px 1px 10px 0 rgba(204, 204, 204, 0.25) inset,
        0 2px 2px 0 rgba(0, 0, 0, 0.25);
`;

const Orow = styled(Row)`
    background: #f1f1f1;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
`;

export default List;
