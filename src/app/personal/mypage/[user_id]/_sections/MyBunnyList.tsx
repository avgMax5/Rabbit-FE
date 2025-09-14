import GlassBox from "@/app/personal/mypage/[user_id]/_components/GlassBox";
import List from "@/app/personal/home/_components/List";
import styled from "styled-components";
import SortBigButton from "../_components/SortBigButton";
import HistoryButton from "../_components/HistoryButton";

const fieldList = [
    { key: "coin_name", label: "코인명" },
    { key: "profit_loss", label: "평가손익" },
    { key: "yield", label: "수익률" },
    { key: "valuation_amount", label: "평가금액" },
    { key: "current_price", label: "현재가" },
    { key: "purchase_price", label: "매입가" },
    { key: "average_price", label: "평균단가" },
    { key: "change_from_yesterday", label: "전일비" },
];

interface DataType {
    id: number;
    coin_name: string;
    profit_loss: number; // 평가손익
    profit_rate: number; // 수익률 (%)
    evaluation_amount: number; // 평가금액
    current_price: number; // 현재가
    purchase_price: number; // 매입가
    average_price: number; // 평균단가
    change_from_yesterday: number; // 전일비
}

const dataList: DataType[] = [
    {
        id: 0,
        coin_name: "Bitcoin",
        profit_loss: 1500000,
        profit_rate: 12.5,
        evaluation_amount: 13500000,
        current_price: 45000000,
        purchase_price: 40000000,
        average_price: 42000000,
        change_from_yesterday: 500000,
    },
    {
        id: 1,
        coin_name: "Ethereum",
        profit_loss: -500000,
        profit_rate: -3.2,
        evaluation_amount: 15000000,
        current_price: 3000000,
        purchase_price: 3150000,
        average_price: 3100000,
        change_from_yesterday: -100000,
    },
    {
        id: 2,
        coin_name: "Ripple",
        profit_loss: 250000,
        profit_rate: 8.0,
        evaluation_amount: 3400000,
        current_price: 1200,
        purchase_price: 1100,
        average_price: 1150,
        change_from_yesterday: 50,
    },
    {
        id: 3,
        coin_name: "Cardano",
        profit_loss: 100000,
        profit_rate: 5.0,
        evaluation_amount: 2100000,
        current_price: 900,
        purchase_price: 850,
        average_price: 870,
        change_from_yesterday: 20,
    },
    {
        id: 4,
        coin_name: "Solana",
        profit_loss: -80000,
        profit_rate: -2.5,
        evaluation_amount: 1200000,
        current_price: 48000,
        purchase_price: 50000,
        average_price: 49000,
        change_from_yesterday: -500,
    },
    {
        id: 5,
        coin_name: "Polkadot",
        profit_loss: 50000,
        profit_rate: 4.0,
        evaluation_amount: 1300000,
        current_price: 35000,
        purchase_price: 33000,
        average_price: 34000,
        change_from_yesterday: 200,
    },
    {
        id: 6,
        coin_name: "Dogecoin",
        profit_loss: -30000,
        profit_rate: -1.5,
        evaluation_amount: 1950000,
        current_price: 130,
        purchase_price: 132,
        average_price: 131,
        change_from_yesterday: -2,
    },
    {
        id: 7,
        coin_name: "Shiba Inu",
        profit_loss: 10000,
        profit_rate: 2.0,
        evaluation_amount: 510000,
        current_price: 0.028,
        purchase_price: 0.027,
        average_price: 0.0275,
        change_from_yesterday: 0.001,
    },
    {
        id: 8,
        coin_name: "Litecoin",
        profit_loss: 70000,
        profit_rate: 3.5,
        evaluation_amount: 2100000,
        current_price: 95000,
        purchase_price: 90000,
        average_price: 92000,
        change_from_yesterday: 2000,
    },
    {
        id: 9,
        coin_name: "Chainlink",
        profit_loss: 120000,
        profit_rate: 6.0,
        evaluation_amount: 2120000,
        current_price: 4200,
        purchase_price: 3950,
        average_price: 4075,
        change_from_yesterday: 50,
    },
    {
        id: 10,
        coin_name: "Chainlink",
        profit_loss: 120000,
        profit_rate: 6.0,
        evaluation_amount: 2120000,
        current_price: 4200,
        purchase_price: 3950,
        average_price: 4075,
        change_from_yesterday: 50,
    },
    {
        id: 11,
        coin_name: "Chainlink",
        profit_loss: 120000,
        profit_rate: 6.0,
        evaluation_amount: 2120000,
        current_price: 4200,
        purchase_price: 3950,
        average_price: 4075,
        change_from_yesterday: 50,
    },
];

function MyBunnyList() {
    return (
        <Wrapper>
            <FirstRow>
                <SortBigButton />
                <SortBigButton />
                <SortBigButton />
                <HistoryButton />
            </FirstRow>
            <SecondRow>
                <Div>
                    <FieldContainer $fieldNum={fieldList.length}>
                        {fieldList.map((field) => (
                            <span key={field.key}>{field.label}</span>
                        ))}
                    </FieldContainer>
                    <RowContainer>
                        {dataList.map((data, i) => {
                            const RowComponent = i % 2 === 0 ? Erow : Orow;
                            return (
                                <RowComponent
                                    key={i}
                                    $fieldNum={fieldList.length}
                                >
                                    {fieldList.map((field) => (
                                        <span key={field.key}>
                                            {
                                                (data as Record<string, any>)[
                                                    field.key
                                                ]
                                            }
                                        </span>
                                    ))}
                                </RowComponent>
                            );
                        })}
                    </RowContainer>
                </Div>
            </SecondRow>
        </Wrapper>
    );
}
const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 10rem 1fr;
    gap: 1rem;
    box-sizing: border-box;
`;

const Div = styled.div`
    background-color: #8ea8bf81;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 3rem 37vh;
    gap: 0.5rem;
`;
const FieldContainer = styled.div<{ $fieldNum: number }>`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(${(props) => props.$fieldNum}, 1fr);
    align-items: center;
    text-align: center;
    flex-shrink: 0;

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
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow-y: auto;
`;

const Row = styled.div<{ $fieldNum: number }>`
    width: 100%;
    height: 2.2rem;
    display: grid;
    grid-template-columns: repeat(${(props) => props.$fieldNum}, 1fr);
    align-items: center;
    text-align: center;
    flex-shrink: 0;
    padding: 0.7rem 0rem;

    font-family: var(--font-nanum-squar);
    font-weight: 800;
    font-size: 12px;
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

const FirstRow = styled.div`
    display: grid;
    grid-row: 1;
    width: 100%;
    height: 100%;
    gap: 0.8rem;
    grid-template-columns: 2fr 2fr 2fr 1fr;
`;

const SecondRow = styled.div`
    display: grid;
    grid-row: 2;
    width: 100%;
    height: 100%;
    padding: 0.8rem 0;
`;

export default MyBunnyList;
