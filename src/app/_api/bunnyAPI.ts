import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TEST_TOKEN = process.env.NEXT_PUBLIC_TEST_TOKEN;

export interface Order{
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
}

export interface OrderBookData {
    bunnyName: string;
    bids: OrderBookItem[];
    asks: OrderBookItem[];
    currentPrice: number;
}

export const getOrder = async (bunnyName: string): Promise<OrderBookData> => {
    const response = await axios.get(`${API_BASE_URL}/bunnies/${bunnyName}/orderbook`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TEST_TOKEN}`
        }
    });
    return response.data;
}

export const getOrderList = async (bunnyName: string) => {
    const response = await axios.get(`${API_BASE_URL}/bunnies/${bunnyName}/mylist`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TEST_TOKEN}`
        }
    });
    return response.data;
}

export const postOrder = async (bunnyName: string, order: Order) => {
    const response = await axios.post(`${API_BASE_URL}/${bunnyName}/order`, order, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TEST_TOKEN}`
        }
    });
    return response.data;
}

export const createOrder = async (bunnyName: string, orderRequest: OrderRequest) => {
    const response = await axios.post(`${API_BASE_URL}/bunnies/${bunnyName}/orders`, orderRequest, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TEST_TOKEN}`
        }
    });
    return response.data;
}

export const cancelOrder = async (bunnyName: string, orderId: string) => {
    const response = await axios.delete(`${API_BASE_URL}/bunnies/${bunnyName}/orders/${orderId}`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TEST_TOKEN}`
        }
    });
    return response.data;
}

export const bunnyChart = async (bunnyName: string) => {
    const response = await axios.get(`${API_BASE_URL}/${bunnyName}/chart`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TEST_TOKEN}`
        }
    });
    console.log(response.data);
    return response.data;
}

export const postLike = async (bunnyName: string) => {
    const response = await axios.post(`${API_BASE_URL}/bunnies/${bunnyName}/like`, {}, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TEST_TOKEN}`
        }
    });
    return response.data;
}

export const deleteLike = async (bunnyName: string, orderId: string) => {
    const response = await axios.delete(`${API_BASE_URL}/bunnies/${bunnyName}/orders/${orderId}`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TEST_TOKEN}`
        }
    });
    return response.data;
}

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

export const getChart = async (bunnyName: string, interval: string): Promise<ChartData> => {
    const response = await axios.get(`${API_BASE_URL}/bunnies/${bunnyName}/chart?interval=${interval}`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TEST_TOKEN}`
        }
    });
    return response.data;
}