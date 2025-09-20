import styled from "styled-components";
import SortBigButton from "../_components/my-list/SortBigButton";
import ListTable from "../_components/my-list/ListTable";
import { useState } from "react";
import ListButton from "../_components/my-list/ListButton";

const historyFieldList = [
    { key: "tradeTime", label: "체결시간" },
    { key: "coinName", label: "코인명" },
    { key: "quantity", label: "거래수량" },
    { key: "price", label: "거래단가" },
    { key: "amount", label: "거래금액" },
    { key: "fee", label: "수수료" },
    { key: "orderTime", label: "주문시간" },
];

const historyDataList = [
    {
        tradeTime: "2025-09-15 10:32:45",
        coinName: "RAB",
        quantity: 120,
        price: 250,
        amount: 30000,
        fee: 150,
        orderTime: "2025-09-15 10:31:10",
    },
    {
        tradeTime: "2025-09-15 09:12:10",
        coinName: "BIT",
        quantity: 50,
        price: 800,
        amount: 40000,
        fee: 200,
        orderTime: "2025-09-15 09:10:05",
    },
    {
        tradeTime: "2025-09-14 18:45:20",
        coinName: "DEV",
        quantity: 10,
        price: 1500,
        amount: 15000,
        fee: 75,
        orderTime: "2025-09-14 18:43:00",
    },
    {
        tradeTime: "2025-09-14 16:25:31",
        coinName: "RAB",
        quantity: 300,
        price: 210,
        amount: 63000,
        fee: 315,
        orderTime: "2025-09-14 16:24:00",
    },
    {
        tradeTime: "2025-09-14 14:02:05",
        coinName: "BIT",
        quantity: 80,
        price: 780,
        amount: 62400,
        fee: 312,
        orderTime: "2025-09-14 14:00:00",
    },
    {
        tradeTime: "2025-09-14 12:55:42",
        coinName: "DEV",
        quantity: 25,
        price: 1700,
        amount: 42500,
        fee: 213,
        orderTime: "2025-09-14 12:54:10",
    },
    {
        tradeTime: "2025-09-13 22:40:15",
        coinName: "RAB",
        quantity: 150,
        price: 230,
        amount: 34500,
        fee: 173,
        orderTime: "2025-09-13 22:38:50",
    },
    {
        tradeTime: "2025-09-13 21:10:25",
        coinName: "BIT",
        quantity: 40,
        price: 900,
        amount: 36000,
        fee: 180,
        orderTime: "2025-09-13 21:09:00",
    },
    {
        tradeTime: "2025-09-13 19:33:59",
        coinName: "DEV",
        quantity: 15,
        price: 1600,
        amount: 24000,
        fee: 120,
        orderTime: "2025-09-13 19:32:00",
    },
    {
        tradeTime: "2025-09-13 17:22:11",
        coinName: "RAB",
        quantity: 500,
        price: 205,
        amount: 102500,
        fee: 512,
        orderTime: "2025-09-13 17:20:45",
    },
    {
        tradeTime: "2025-09-13 15:14:37",
        coinName: "BIT",
        quantity: 70,
        price: 820,
        amount: 57400,
        fee: 287,
        orderTime: "2025-09-13 15:12:30",
    },
    {
        tradeTime: "2025-09-13 11:05:00",
        coinName: "DEV",
        quantity: 5,
        price: 2000,
        amount: 10000,
        fee: 50,
        orderTime: "2025-09-13 11:03:20",
    },
];

const jobData = [
    { value: 40, name: "프론트엔드" },
    { value: 38, name: "백엔드" },
    { value: 32, name: "풀스택" },
];

const devData = [
    { value: 40, name: "성장형" },
    { value: 18, name: "안정형" },
    { value: 12, name: "가치형" },
    { value: 12, name: "인기형" },
    { value: 12, name: "밸런스형" },
];

const coinData = [
    { value: 40, name: "A형" },
    { value: 68, name: "B형" },
    { value: 32, name: "C형" },
];

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
    const [isHistory, setIsHistory] = useState(false);

    const handleGetList = () => {
        setIsHistory(false);
    };

    const handleGetHistory = () => {
        setIsHistory(true);
    };

    return (
        <Wrapper>
            <FirstRow>
                <SortBigButton
                    sortTitle="직군"
                    top1Title="frontend"
                    top1Carrot={200000}
                    chartData={jobData}
                    colors={["#ff9e30", "#ffbb6e", "#ffd8ac"]}
                />
                <SortBigButton
                    sortTitle="개발자 유형"
                    top1Title="성장형"
                    top1Carrot={200000}
                    chartData={devData}
                    colors={[
                        "#008b61",
                        "#33a280",
                        "#66b9a0",
                        "#99d0bf",
                        "#cce7df",
                    ]}
                />
                <SortBigButton
                    sortTitle="버니 유형"
                    top1Title="희소자산형"
                    top1Carrot={200000}
                    chartData={coinData}
                    colors={["#9d00a0", "#ba4cbc", "#d799d9"]}
                />
                <ButtonContainer>
                    <ListButton
                        onGetList={handleGetList}
                        totalLength={dataList.length}
                        content="보유 내역 보기"
                    />
                    <ListButton
                        onGetList={handleGetHistory}
                        totalLength={historyDataList.length}
                        content="거래 기록 보기"
                    />
                </ButtonContainer>
            </FirstRow>
            <SecondRow>
                {isHistory ? (
                    <ListTable
                        fieldList={historyFieldList}
                        dataList={historyDataList}
                    />
                ) : (
                    <ListTable fieldList={fieldList} dataList={dataList} />
                )}
            </SecondRow>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 35% 1fr;
    gap: 1rem;
    box-sizing: border-box;
`;

const FirstRow = styled.div`
    display: grid;
    gap: 0.8rem;
    grid-template-columns: 2fr 2fr 2fr 1fr;
    grid-row: 1;
    width: 100%;
    height: 100%;
`;

const SecondRow = styled.div`
    display: grid;
    grid-row: 2;
    width: 100%;
    height: 100%;
`;

const ButtonContainer = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 0.8rem;
`;

export default MyBunnyList;
