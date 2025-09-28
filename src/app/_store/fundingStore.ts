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
    image: string;
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
    clearFundBunnies: () => void;
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
            
            const newFundBunnies = response.data.fund_bunnies;

            console.log('받은 데이터:', newFundBunnies);
            
            // 페이지가 0이면 교체, 0보다 크면 추가
            if (page === 0) {
                set({ fundBunnies: newFundBunnies, isLoading: false });
            } else {
                const currentFundBunnies = get().fundBunnies;
                set({ fundBunnies: [...currentFundBunnies, ...newFundBunnies], isLoading: false });
            }
        } catch (error) {
            console.error('API 호출 실패:', error);
            set({ 
                error: '데이터를 불러오는데 실패했습니다.',
                isLoading: false
            });
        }
    },

    clearFundBunnies: () => set({ fundBunnies: [] }),

    clearError: () => set({ error: null }),
}));

