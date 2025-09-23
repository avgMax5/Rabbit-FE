import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TEST_TOKEN = process.env.NEXT_PUBLIC_TEST_TOKEN;

export interface FundingCount {
    listed_bunny_count: number;
    fund_bunny_count: number;
    closing_soon_bunny_count: number;
}

export interface HoldingStatus {
    top1: number;
    top2: number;
    top3: number;
    others: number;
    remaining: number;
}

export interface SnsInfo {
    sns_id: string;
    url: string;
    type: string;
    favicon: string;
    image?: string;
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
    priority: number;
}

export interface Spec {
    name: string;
    birthdate: string;
    email: string;
    phone: string;
    image: string;
    resume: string;
    position: string;
    link: SnsInfo[];
    sns: SnsInfo[];
    skill: string[];
    certification: Certification[];
    career: Career[];
    education: Education[];
    ai_review: string;
}

export interface FundBunnyDetail {
    fund_bunny_id: string;
    bunny_name: string;
    bunny_type: string;
    target_bny: number;
    collected_bny: number;
    available_bny: number;
    my_holding_quantity: number;
    holding_status: HoldingStatus;
    my_account_bny: number;
    my_account_c: number;
    spec: Spec;
}

export interface FundingData {
    fund_bny: number;
}

export const getBunniesCount = async () => {
    try {
        if (!API_BASE_URL) {
            throw new Error("API_BASE_URL이 설정되지 않았습니다.");
        }

        console.log(TEST_TOKEN);
        const response = await axios.get(`${API_BASE_URL}/fund-bunnies/count`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TEST_TOKEN}`,
            },
        });

        return response.data;
    } catch (error) {
        console.warn("API 호출 실패, 더미 데이터를 사용합니다:", error);
        return null;
    }
}

export const postFundBunny = async (bunnyName: string, bunnyType: string) => {
    try {
        if (!API_BASE_URL) {
            throw new Error("API_BASE_URL이 설정되지 않았습니다.");
        }

        const response = await axios.post(
            `${API_BASE_URL}/fund-bunnies`,
            {
                bunny_name: bunnyName,
                bunny_type: bunnyType,
            },
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TEST_TOKEN}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("API 호출 실패:", error);
        throw error;
    }
};

export const checkBunnyName = async (bunnyName: string) => {
    try{
        const response = await axios.head(`${API_BASE_URL}/fund-bunnies/${bunnyName}`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TEST_TOKEN}`
            }
        });

        if (response.status === 200) {
            console.log('버니 이름 사용 가능');
            return { success: true, isDuplicate: false, message: '사용 가능한 이름입니다.' };
        } else {
            console.log("버니 이름이 이미 존재합니다 (중복)");
            return {
                success: true,
                isDuplicate: true,
                message: "이미 사용 중인 이름입니다.",
            };
        }
        
    } catch (error) {
    }
}

export const getFundBunniesDetail = async (fundBunnyId: string) => {
    try {
        if (!API_BASE_URL) {
            throw new Error('API_BASE_URL이 설정되지 않았습니다.');
        }
        
        const response = await axios.get(`${API_BASE_URL}/fund-bunnies/${fundBunnyId}`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TEST_TOKEN}`
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('API 호출 실패:', error);
        throw error;
    }
}

export const postFundBunnyFunding = async (fundBunnyId: string, fundingData: FundingData) => {
    try {
        if (!API_BASE_URL) {
            throw new Error('API_BASE_URL이 설정되지 않았습니다.');
        }
        
        const response = await axios.post(`${API_BASE_URL}/fund-bunnies/${fundBunnyId}/fundings`, fundingData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TEST_TOKEN}`
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('펀딩 참여 API 호출 실패:', error);
        throw error;
    }
}