import axios from "axios";
import { PressureResponse } from "../personal/home/_types/interfaces";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TEST_TOKEN = process.env.NEXT_PUBLIC_TEST_TOKEN;

export interface Order {
    order_type: string;
    order_price: string;
    order_quantity: string;
}

export interface OrderRequest {
    quantity: number;
    unit_price: number;
    order_type: string;
}

export interface OrderBookItem {
    price: number;
    quantity: number;
    type: 'BUY' | 'SELL';
}

export interface OrderBookData {
    bunnyName: string;
    orders: Array<{ price: number; quantity: number; type: 'BUY' | 'SELL' }>;
    currentPrice: number;
    serverTime: number;
}

// REST API로 호가창 스냅샷 가져오기
export const getOrderBookSnapshot = async (
    bunnyName: string
): Promise<OrderBookData> => {
    const response = await axios.get(
        `${API_BASE_URL}/bunnies/${bunnyName}/orderbook`,
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TEST_TOKEN}`,
            },
        }
    );
    return response.data;
};

// 기존 함수명 유지 (하위 호환성)
export const getOrder = getOrderBookSnapshot;

export const getOrderList = async (bunnyName: string) => {
    const response = await axios.get(
        `${API_BASE_URL}/bunnies/${bunnyName}/mylist`,
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TEST_TOKEN}`,
            },
        }
    );
    return response.data;
};

export const createOrder = async (
    bunnyName: string,
    orderRequest: {
        quantity: number;
        unit_price: number;
        order_type: "BUY" | "SELL";
    }
) => {
    // 정수 강제 + 문자열로 전송(BigDecimal 정밀도 안전)
    const payload = {
        quantity: Math.trunc(orderRequest.quantity).toString(),
        unit_price: Math.trunc(orderRequest.unit_price).toString(),
        order_type: orderRequest.order_type, // "BUY" | "SELL"
    };

    try {
        const response = await axios.post(
            `${API_BASE_URL}/bunnies/${encodeURIComponent(bunnyName)}/orders`,
            payload,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TEST_TOKEN}`,
                },
            }
        );
        return response.data;
    } catch (err: any) {
        // 서버가 내려주는 에러 메시지 확인
        console.error(
            "createOrder error:",
            err.response?.status,
            err.response?.data || err.message
        );
        throw err;
    }
};

export const cancelOrder = async (bunnyName: string, orderId: string) => {
    const response = await axios.delete(
        `${API_BASE_URL}/bunnies/${bunnyName}/orders/${orderId}`,
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TEST_TOKEN}`,
            },
        }
    );
    return response.data;
};

export const bunnyChart = async (bunnyName: string) => {
    const response = await axios.get(`${API_BASE_URL}/${bunnyName}/chart`, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TEST_TOKEN}`,
        },
    });
    console.log(response.data);
    return response.data;
};

export const postLike = async (bunnyName: string) => {
    const response = await axios.post(
        `${API_BASE_URL}/bunnies/${bunnyName}/like`,
        {},
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TEST_TOKEN}`,
            },
        }
    );
    return response.data;
};

export const deleteLike = async (bunnyName: string) => {
    const response = await axios.delete(
        `${API_BASE_URL}/bunnies/${bunnyName}/like`,
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TEST_TOKEN}`,
            },
        }
    );
    return response.data;
};

export interface ChartDataItem {
    date: string;
    high_price: number;
    low_price: number;
    closing_price: number;
    buy_quantity: number;
    sell_quantity: number;
    trade_volume: number;
}

export interface ChartData {
    bunny_name: string;
    interval: string;
    chart_data_list: ChartDataItem[];
}

export interface BunnyInfo {
    bunny_type: string;
    badges: string[];
    reliability: number;
    market_cap: number;
    current_price: number;
    ai_feedback: string;
    like_count: number;
}

export interface BunnyHolder {
    developerType: string;
    percentage: number;
    count: number;
}

export const getChart = async (
    bunnyName: string,
    interval: string
): Promise<ChartData> => {
    const response = await axios.get(
        `${API_BASE_URL}/bunnies/${bunnyName}/chart?interval=${interval}`,
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TEST_TOKEN}`,
            },
        }
    );
    return response.data;
};

export const getBunnyMe = async () => {
    if (!API_BASE_URL) {
        throw new Error("API_BASE_URL이 설정되지 않았습니다.");
    }
    try {
        const response = await axios.get(`${API_BASE_URL}/bunnies/me`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TEST_TOKEN}`,
            },
        });
        console.log("bunny/me get 성공", response.data);

        return response.data;
    } catch (error) {
        console.error("bunny me를 가져오지 못 했습니다", error);
        throw error;
    }
};

export const getRabbitIndex = async () => {
    try {
        if (!API_BASE_URL) {
            throw new Error("API_BASE_URL이 설정되지 않았습니다.");
        }

        const response = await axios.get(
            `${API_BASE_URL}/bunnies/rabbit-index`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TEST_TOKEN}`,
                },
                withCredentials: true,
            }
        );

        if (!response.data || !response.data.rabbit_index) {
            return 0;
        }

        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error("Rabbit 지수 가져오기 실패: ", error);
        throw error;
    }
};

export const getBunnyContext = async (bunnyName: string) => {
    const response = await axios.get(
        `${API_BASE_URL}/bunnies/${bunnyName}/user-context`,
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TEST_TOKEN}`,
            },
        }
    );
    return response.data;
};

export const getPressureTop5 = async () => {
    const response = await axios.get(`${API_BASE_URL}/bunnies/pressure-top5`, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TEST_TOKEN}`,
        },
    });

    return response.data;
};
