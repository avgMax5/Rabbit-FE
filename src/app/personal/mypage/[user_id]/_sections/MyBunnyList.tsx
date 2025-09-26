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
import Top1Container from "../_components/my-bunny/Top1Container";

const orderFieldList = [
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
    { key: "profit_or_loss", label: "평가손익" },
    { key: "return_rate", label: "수익률" },
    { key: "valuation", label: "평가금액" },
    { key: "current_price", label: "현재가" },
    { key: "total_buy_amount", label: "매입가" },
    { key: "avg_price", label: "평균단가" },
    { key: "price_diff_from_yesterday", label: "전일비" },
];

interface OrderItem {
    ordered_at: string;
    bunny_name: string;
    quantity: number;
    price: number;
    fee: number;
    amount: number;
    order_type: string;
}

interface MatchItem {
    matched_at: string;
    bunny_name: string;
    quantity: number;
    price: number;
    fee: number;
    amount: number;
    order_type: string;
}

export interface Top {
    title: string;
    type?: string;
    carrot?: number;
}

function MyBunnyList() {
    const [isHistory, setIsHistory] = useState(false);
    const [holdDataList, setHoldDataList] = useState<HoldBunny[]>([]);
    const [orderDataList, setOrderDataList] = useState<OrderItem[]>([]);
    const [bunnyStats, setBunnyStats] = useState<BunnyStats>();

    const position = bunnyStats?.position;
    const developer = bunnyStats?.developer_type;
    const coin = bunnyStats?.coin_type;

    // const orderDummyData = [
    //     {
    //         ordered_at: "2025-09-26T15:30:00",
    //         bunny_name: "BUNNY",
    //         quantity: 120,
    //         price: 1500,
    //         fee: 30,
    //         amount: 180000,
    //         order_type: "BUY",
    //     },
    //     {
    //         ordered_at: "2025-09-26T15:45:00",
    //         bunny_name: "CARROT",
    //         quantity: 50,
    //         price: 3200,
    //         fee: 16,
    //         amount: 160000,
    //         order_type: "SELL",
    //     },
    //     {
    //         ordered_at: "2025-09-26T16:00:00",
    //         bunny_name: "HOP",
    //         quantity: 200,
    //         price: 980,
    //         fee: 40,
    //         amount: 196000,
    //         order_type: "BUY",
    //     },
    // ];

    const topData = [
        {
            title: "직군",
            type: position?.top.type,
            carrot: position?.top.total_market_cap,
        },
        {
            title: "개발자 유형",
            type: developer?.top.type,
            carrot: developer?.top.total_market_cap,
        },
        {
            title: "버니 유형",
            type: coin?.top.type,
            carrot: coin?.top.total_market_cap,
        },
    ];

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
        { value: developer?.basic ?? 0, name: "기본형" },
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
        const fetchOrderBunnies = async () => {
            try {
                const orderData = await getOrders();

                const orderItems: OrderItem[] = orderData.orders.map(
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
                setOrderDataList(orderItems);
            } catch (error) {
                console.error("order 리스트 받기 실패", error);
            }
        };
        fetchOrderBunnies();
    }, []);

    return (
        <Wrapper>
            <Top1Container data={topData} />
            <FirstRow>
                <SortBigButton
                    sortTitle="직군"
                    chartData={posData}
                    colors={["#ff9e30", "#ffbb6e", "#ffd8ac"]}
                />
                <SortBigButton
                    sortTitle="개발자 유형"
                    chartData={devData}
                    colors={[
                        "#043f2e",
                        "#008b61",
                        "#33a280",
                        "#66b9a0",
                        "#99d0bf",
                        "#cce7df",
                    ]}
                />
                <SortBigButton
                    sortTitle="버니 유형"
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
                        totalLength={orderDataList.length}
                        content="주문 내역 보기"
                    />
                </ButtonContainer>
            </FirstRow>
            <SecondRow>
                {isHistory ? (
                    <ListTable
                        fieldList={orderFieldList}
                        dataList={orderDataList}
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
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 35% 1fr;
    gap: 1.2rem;
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
    position: relative;
    display: grid;
    gap: 10px;
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
