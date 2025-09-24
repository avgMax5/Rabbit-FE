
export interface DataType {
    id: number;
    coin_name: string;
    percent: number;
}

export interface BadgeType {
    id: number;
    src: string;
    name: string;
    amount: number;
    raise: boolean;
}

export interface ListDataType {
    id: number;
    coin_name: string;
    job: string;
    dev_type: string;
    coin_type: string;
    fluctuation_rate: number;
    current_price: number;
    badge: string[];
}