import { dummyBunnies } from './dummyData';

const API_BASE_URL = 'https://rabbit.avgmax.team/api';
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
    url: string;
    image: string;
}

export interface Certification {
    certificate_url: string;
    name: string;
    ca: string;
    cdate: string;
}

export interface Career {
    company_name: string;
    status: string;
    position: string;
    start_date: string;
    end_date: string | null;
    certificate_url: string;
}

export interface Education {
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
    image: string;
    resume: string;
    position: string;
    sns: SnsInfo[];
    skill: string[];
    certification: Certification[];
    career: Career[];
    education: Education[];
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

export const getBunniesCount = async () => {
    try {
        if (!API_BASE_URL) {
            throw new Error('API_BASE_URL이 설정되지 않았습니다.');
        }
        
        const url = new URL(`${API_BASE_URL}/fund-bunnies/count`);
        
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TEST_TOKEN}`
            }
        });
        
        if (!response.ok) {
            console.log(response);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.warn('API 호출 실패, 더미 데이터를 사용합니다:', error);
        // 더미 데이터 반환 로직 추가 필요
        return null;
    }
}

export const postFundBunny = async () => {
    try{
        if (!API_BASE_URL) {
            throw new Error('API_BASE_URL이 설정되지 않았습니다.');
        }
        
        const url = new URL(`${API_BASE_URL}/fund-bunnies`);

        const response = await fetch(url.toString(), {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return console.log(response);
    } catch (error) {
        console.error('API 호출 실패:', error);
    }
}