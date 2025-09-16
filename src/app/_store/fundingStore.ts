import { create } from 'zustand';
import { dummyBunnies } from '../_api/dummyData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const AUTH_TOKEN = 'Bearer accessToken';

export interface FetchBunniesParams {
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
    bunnies: FundBunny[];
    isLoading: boolean;
    error: string | null;
    fetchBunnies: (params?: FetchBunniesParams) => Promise<void>;
    clearError: () => void;
}

export const useFundingStore = create<FundingState>((set, get) => ({
    bunnies: [],
    isLoading: false,
    error: null,

    fetchBunnies: async (params: FetchBunniesParams = {}) => {
        const { sortType = 'newest', page = 0, size = 10 } = params;
        
        set({ isLoading: true, error: null });
        
        try {
            const url = new URL(`${API_BASE_URL}/fund-bunnies`);
            url.searchParams.append('page', page.toString());
            url.searchParams.append('size', size.toString());
            url.searchParams.append('sortType', sortType);
            
            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    'Authorization': AUTH_TOKEN,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                console.log(response);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            const bunnies = data?.fund_bunnies || [];

            if (bunnies.length === 0) {
                console.log('데이터 없어서 더미 사용');
                set({ bunnies: dummyBunnies, isLoading: false });
                return;
            }
            
            set({ bunnies, isLoading: false });
        } catch (error) {
            console.warn('API 호출 실패, 더미 데이터를 사용합니다:', error);
            set({ 
                bunnies: dummyBunnies, 
                isLoading: false, 
                error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.' 
            });
        }
    },

    clearError: () => set({ error: null }),
}));

