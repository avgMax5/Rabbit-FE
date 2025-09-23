import axios from "axios";
import { rowDataType } from "../personal/mypage/[user_id]/_components/my-info/SpecForm";

const API_BASE_URL = "https://rabbit.avgmax.team/api";
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
        });

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
            }
        );
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
            }
        );
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error("체결된 버니 목록 가져오기 실패: ", error);
        throw error;
    }
};

export const postFileUpload = async (file: string) => {
    try {
        if (!API_BASE_URL) {
            throw new Error("API_BASE_URL이 설정되지 않았습니다.");
        }

        const response = await axios.post(
            `${API_BASE_URL}/personal/me/upload`,
            { file: file },
            {
                headers: {
                    "Content-Types": "application/json",
                    Authorization: `Bearer ${TEST_TOKEN}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.log("파일 가져오기 실패");
        return null;
    }
};
