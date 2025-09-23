import styled from "styled-components";
import SortBigButton from "../_components/my-list/SortBigButton";
import ListTable from "../_components/my-list/ListTable";
import { useEffect, useState } from "react";
import ListButton from "../_components/my-list/ListButton";
import {
    BunnyStats,
    getHoldBunnies,
    getHoldBunniesStats,
    getMatches,
    getOrders,
    HoldBunny,
    MatchBunny,
    OrderBunny,
} from "@/app/_api/userAPI";

const historyFieldList = [
    { key: "matched_at", label: "체결시간" },
    { key: "ordered_at", label: "주문시간" },
    { key: "bunny_name", label: "코인명" },
    { key: "quantity", label: "거래수량" },
    { key: "price", label: "거래단가" },
    { key: "fee", label: "수수료" },
    { key: "amount", label: "거래금액" },
    { key: "order_type", label: "거래타입" },
];

const fieldList = [
    { key: "bunny_name", label: "코인명" },
    { key: "profit_loss", label: "평가손익" },
    { key: "yield", label: "수익률" },
    { key: "valuation_amount", label: "평가금액" },
    { key: "current_price", label: "현재가" },
    { key: "purchase_price", label: "매입가" },
    { key: "average_price", label: "평균단가" },
    { key: "change_from_yesterday", label: "전일비" },
];

interface HistoryItem {
    matched_at?: string;
    ordered_at?: string;
    bunny_name: string;
    quantity: number;
    price: number;
    fee: number;
    amount: number;
    order_type: string;
}

function MyBunnyList() {
    const [isHistory, setIsHistory] = useState(false);
    const [holdDataList, setHoldDataList] = useState<HoldBunny[]>([]);
    const [historyDataList, setHistoryDataList] = useState<HistoryItem[]>([]);
    const [bunnyStats, setBunnyStats] = useState<BunnyStats>();

    const position = bunnyStats?.position;
    const developer = bunnyStats?.developer_type;
    const coin = bunnyStats?.coin_type;
    //이렇게 직접 넣으면 안됨..
    const posData = [
        { value: position?.frontend ?? 0, name: "프론트엔드" },
        { value: position?.backend ?? 0, name: "백엔드" },
        { value: position?.fullstack ?? 0, name: "풀스택" },
    ];

    const devData = [
        { value: developer?.growth ?? 0, name: "성장형" },
        { value: developer?.stable ?? 0, name: "안정형" },
        { value: developer?.value ?? 0, name: "가치형" },
        { value: developer?.popular ?? 0, name: "인기형" },
        { value: developer?.balance ?? 0, name: "밸런스형" },
    ];

    const coinData = [
        { value: coin?.a ?? 0, name: "희소자산형" },
        { value: coin?.b ?? 0, name: "밸런스형" },
        { value: coin?.c ?? 0, name: "단가친화형" },
    ];

    const handleGetList = () => {
        setIsHistory(false);
    };

    const handleGetHistory = () => {
        setIsHistory(true);
    };

    useEffect(() => {
        const fetchBunnyStats = async () => {
            try {
                const data = await getHoldBunniesStats();
                setBunnyStats(data);
                console.log("fetchData에서 받아온 holdBunnyStats", data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBunnyStats();
    }, []);

    useEffect(() => {
        const fetchHoldBunnies = async () => {
            try {
                const data = await getHoldBunnies();
                setHoldDataList(data.hold_bunnies);
                console.log(
                    "fetchData에서 받아온 holdBunny",
                    data.hold_bunnies
                );
            } catch (error) {
                console.error(error);
            }
        };
        fetchHoldBunnies();
    }, []);

    useEffect(() => {
        const fetchHistoryBunnies = async () => {
            try {
                const orderData = await getOrders();
                const matchData = await getMatches();

                const orderItems: HistoryItem[] = orderData.orders.map(
                    (order: OrderBunny) => ({
                        matched_at: "-",
                        ordered_at: order.ordered_at,
                        bunny_name: order.bunny_name,
                        quantity: order.quantity,
                        price: order.unit_price,
                        fee: order.fee,
                        amount: order.total_amount,
                        order_type: order.order_type,
                    })
                );

                const matchItems: HistoryItem[] = matchData.matches.map(
                    (match: MatchBunny) => ({
                        matched_at: match.matched_at,
                        ordered_at: "-",
                        bunny_name: match.bunny_name,
                        quantity: match.quantity,
                        price: match.unit_price,
                        fee: match.fee,
                        amount: match.total_amount,
                        order_type: match.order_type,
                    })
                );

                setHistoryDataList([...orderItems, ...matchItems]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchHistoryBunnies();
    }, []);

    return (
        <Wrapper>
            <FirstRow>
                <SortBigButton
                    sortTitle="직군"
                    top1Title={position?.top.type}
                    top1Carrot={position?.top.total_market_cap}
                    chartData={posData}
                    colors={["#ff9e30", "#ffbb6e", "#ffd8ac"]}
                />
                <SortBigButton
                    sortTitle="개발자 유형"
                    top1Title={developer?.top.type}
                    top1Carrot={developer?.top.total_market_cap}
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
                        totalLength={holdDataList.length}
                        content="보유 내역 보기"
                    />
                    <ListButton
                        onGetList={handleGetHistory}
                        totalLength={historyDataList.length}
                        content="주문 내역 보기"
                    />
                </ButtonContainer>
            </FirstRow>
            <SecondRow>
                {isHistory ? (
                    <ListTable
                        fieldList={historyFieldList}
                        dataList={historyDataList}
                        title="주문"
                    />
                ) : (
                    <ListTable
                        fieldList={fieldList}
                        dataList={holdDataList}
                        title="보유"
                    />
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
