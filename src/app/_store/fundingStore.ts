import { create } from 'zustand';
import axios from 'axios';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TEST_TOKEN = process.env.NEXT_PUBLIC_TEST_TOKEN;

export interface FetchFundBunniesParams {
    sortType?: string;
    page?: number;
    size?: number;
}

export interface FundBunny {
    fund_bunny_id: string;
    bunny_name: string;
    bunny_type: string;
    target_bny: number;
    collected_bny: number;
    remaining_bny: number;
    created_at: string;
    end_at: string;
}

interface FundingState {
    fundBunnies: FundBunny[];
    bunnies: FundBunny[]; // fetchBunnies에서 사용할 별도 상태
    isLoading: boolean;
    error: string | null;
    fetchFundBunnies: (params?: FetchFundBunniesParams) => Promise<void>;
    clearError: () => void;
}

export const useFundingStore = create<FundingState>((set, get) => ({
    fundBunnies: [],
    bunnies: [],
    isLoading: false,
    error: null,

    fetchFundBunnies: async (params: FetchFundBunniesParams = {}) => {
        const { sortType = 'newest', page = 0, size = 30 } = params;
        
        set({ isLoading: true, error: null });
        
        try {
            const url = new URL(`${API_BASE_URL}/fund-bunnies`, window.location.origin);
            url.searchParams.append('page', page.toString());
            url.searchParams.append('size', size.toString());
            url.searchParams.append('sortType', sortType);
            
            console.log('API 호출 URL:', url.toString());
            
            const response = await axios.get(url.toString(), {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${TEST_TOKEN}`

                }
            });
            
            const fundBunnies = response.data.fund_bunnies;

            console.log('받은 데이터:', fundBunnies);
            
            set({ fundBunnies, isLoading: false });
        } catch (error) {
            console.warn('API 호출 실패, 더미 데이터를 사용합니다:', error);
            set({ 
                isLoading: false, 
                error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.' 
            });
        }
    },

    clearError: () => set({ error: null }),
}));

