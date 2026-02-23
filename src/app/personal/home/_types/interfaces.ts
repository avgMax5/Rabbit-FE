
export interface DataType {
    id: number;
    bunny_name: string;
    percent: number;
}


export interface BadgeType {
    id: number;
    src: string;
    name: string;
    alias: string;
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

export interface BunnyPressureData {
  bunny_id: string;
  bunny_name: string;
  date: string;
  pressure: number;
}

export interface PressureResponse {
  buy_top5: BunnyPressureData[];
  sell_top5: BunnyPressureData[];
}