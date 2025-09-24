import axios from "axios";
import { rowDataType } from "../personal/mypage/[user_id]/_components/my-info/SpecForm";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TEST_TOKEN = process.env.NEXT_PUBLIC_TEST_TOKEN;

export interface SnsInfo {
    sns_id: string;
    url: string;
    type: string;
    favicon: string;
}

export interface Certification {
    certification_id: string;
    certificate_url: string;
    name: string;
    ca: string;
    cdate: string;
}

export interface Career {
    career_id: string;
    company_name: string;
    status: string;
    position: string;
    start_date: string;
    end_date: string | null;
    certificate_url: string;
}

export interface Education {
    education_id: string;
    school_name: string;
    status: string;
    major: string;
    start_date: string;
    end_date: string;
    certificate_url: string;
    //priority: number;
}

export interface MyInfo {
    user_id: string;
    name: string;
    birthdate: string;
    image: string;
    email: string;
    link: SnsInfo[];
    position: string;
    education: Education[];
    career: Career[];
    certification: Certification[];
    skill: string[];
}

export interface HoldBunny {
    bunny_id: string;
    bunny_name: string;
    hold_quantity: string; //보유랑
    profit_loss: string; //평가손익
    profit_rate: string; //수익률
    evaluation_amount: number; // 평가금액
    current_price: number; // 현재가
    purchase_price: number; // 매입가
    average_price: number; // 평균단가
    change_from_yesterday: number; // 전일비
}

export interface MatchBunny {
    match_id: string;
    bunny_name: string;
    quantity: number;
    unit_price: number;
    total_amount: number; //거래금액
    fee: number;
    order_type: string;
    matched_at: string;
}

export interface OrderBunny {
    order_id: string;
    bunny_name: string;
    bunny_id: string;
    quantity: number;
    unit_price: number;
    total_amount: number; //거래금액
    final_amount: number;
    fee: number;
    order_type: string;
    ordered_at: string;
}

type Top = {
    type: string;
    total_market_cap: number;
};

export interface Position {
    frontend: number;
    backend: number;
    fullstack: number;
    top: Top;
}

export interface DeveloperType {
    basic: number;
    growth: number;
    stable: number;
    value: number;
    popular: number;
    balance: number;
    top: Top;
}

export interface CoinType {
    a: number;
    b: number;
    c: number;
    top: Top;
}

export interface BunnyStats {
    timestamp: string;
    total_market_cap: string;
    position: Position;
    developer_type: DeveloperType;
    coin_type: CoinType;
}

export const getInfo = async () => {
    try {
        if (!API_BASE_URL) {
            throw new Error("API_BASE_URL이 설정되지 않았습니다.");
        }

        const response = await axios.get(`${API_BASE_URL}/personal/me/info`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TEST_TOKEN}`,
            },
            withCredentials: true,
        });
        
        if (!response.data || !response.data.user_id) {
            throw new Error("유효한 사용자 데이터가 아닙니다.");
        }

        console.log("사용자 정보 가져오기 성공:", response.data);

        return response.data;
    } catch (error) {
        console.error("사용자 정보 가져오기 실패: ", error);
        throw error;
    }
};

export const putInfo = async (myInfo: MyInfo) => {
    try {
        if (!API_BASE_URL) {
            throw new Error("API_BASE_URL이 설정되지 않았습니다.");
        }

        const response = await axios.put(
            `${API_BASE_URL}/personal/me/info`,
            myInfo,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TEST_TOKEN}`,
                },
                withCredentials: true,
            }
        );

        console.log("수정한 response: ", response.data);

        return response.data;
    } catch (error) {
        console.error("버니 정보 수정 실패:", error);
        throw error;
    }
};

export const getHoldBunnies = async () => {
    try {
        if (!API_BASE_URL) {
            throw new Error("API_BASE_URL이 설정되지 않았습니다.");
        }

        const response = await axios.get(
            `${API_BASE_URL}/personal/me/hold-bunnies`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TEST_TOKEN}`,
                },
                withCredentials: true,
            }
        );
        
        if (!response.data || !response.data.hold_bunnies) {
            return []; // 받은 데이터에 hold_bunnies가 없을 때 빈 배열 반환
        }

        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error("보유 버니 목록 가져오기 실패: ", error);
        throw error;
    }
};

export const getHoldBunniesStats = async () => {
    try {
        if (!API_BASE_URL) {
            throw new Error("API_BASE_URL이 설정되지 않았습니다.");
        }

        const response = await axios.get(
            `${API_BASE_URL}/personal/me/hold-bunnies/stats`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TEST_TOKEN}`,
                },
                withCredentials: true,
            }
        );
        console.log(response.data);


        return response.data;
    } catch (error) {
        console.error("보유 버니 통계 가져오기 실패: ", error);
        throw error;
    }
};

export const getOrders = async () => {
    try {
        if (!API_BASE_URL) {
            throw new Error("API_BASE_URL이 설정되지 않았습니다.");
        }

        const response = await axios.get(`${API_BASE_URL}/personal/me/orders`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TEST_TOKEN}`,
            },
            withCredentials: true,
        });
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error("미체결 주문 목록 가져오기 실패: ", error);
        throw error;
    }
};

export const getMatches = async () => {
    try {
        if (!API_BASE_URL) {
            throw new Error("API_BASE_URL이 설정되지 않았습니다.");
        }

        const response = await axios.get(
            `${API_BASE_URL}/personal/me/matches`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TEST_TOKEN}`,
                },
                withCredentials: true,
            }
        );
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error("체결된 버니 목록 가져오기 실패: ", error);
        throw error;
    }
};

export const postUpload = async (file: File) => {
    try {
        if (!API_BASE_URL) {
            throw new Error("API_BASE_URL이 설정되지 않았습니다.");
        }

        const formData = new FormData();
        console.log(formData, "formData");
        formData.append("file", file);

        const response = await axios.post(
            `${API_BASE_URL}/personal/me/upload`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${TEST_TOKEN}`,
                },
                withCredentials: true,
            }
        );

        console.log("파일 업로드 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("파일 업로드 실패:", error);
        throw error;
    }
};
