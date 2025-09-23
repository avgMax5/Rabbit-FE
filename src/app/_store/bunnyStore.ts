import { create } from 'zustand';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TEST_TOKEN = process.env.NEXT_PUBLIC_TEST_TOKEN;

export interface Bunny {
    bunny_id: string;
    user_name: string;
    bunny_name: string;
    developer_type: string;
    bunny_type: string;
    position: string;
    reliability: number;
    current_price: number;
    closing_price: number;
    market_cap: number;
    fluctuation_rate: number | null;
    growth: number;
    stability: number;
    value: number;
    popularity: number;
    balance: number;
    badges: string[];
    like_count: number;
    created_at: string;
}

export interface FetchBunniesParams {
    sortType?: string;
    page?: number;
    size?: number;
}

interface BunnyState {
    bunnies: Bunny[];
    isLoading: boolean;
    error: string | null;
    
    fetchBunnies: (params?: FetchBunniesParams) => Promise<void>;
    clearError: () => void;
}

export const useBunnyStore = create<BunnyState>((set, get) => ({
    bunnies: [],
    isLoading: false,
    error: null,

    fetchBunnies: async (params: FetchBunniesParams = {}) => {
        const { sortType = 'newest', page = 0, size = 30 } = params;
        
        set({ isLoading: true, error: null });
        
        try {
            const url = new URL(`${API_BASE_URL}/bunnies`, window.location.origin);
            url.searchParams.append('page', page.toString());
            url.searchParams.append('size', size.toString());
            url.searchParams.append('sortType', sortType);
            
            console.log('Bunnies API 호출 URL:', url.toString());
            
            const response = await axios.get(url.toString(), {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${TEST_TOKEN}`
                }
            });
            
            const bunnies = response.data;

            console.log('받은 Bunnies 데이터:', bunnies);
            
            set({ bunnies, isLoading: false });
        } catch (error) {
            console.warn('Bunnies API 호출 실패:', error);
            set({ 
                isLoading: false, 
                error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.' 
            });
        }
    },

    clearError: () => set({ error: null }),
}));
