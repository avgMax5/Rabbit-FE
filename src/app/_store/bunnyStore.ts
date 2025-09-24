import { create } from 'zustand';
import axios from 'axios';
import { postLike, deleteLike } from '../_api/bunnyAPI';

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
    likedBunnies: Set<string>; // 좋아요한 버니들의 이름을 저장
    likeLoading: Set<string>; // 좋아요 처리 중인 버니들의 이름을 저장
    
    fetchBunnies: (params?: FetchBunniesParams) => Promise<void>;
    getBunnyByName: (bunnyName: string) => Bunny | undefined;
    clearError: () => void;
    toggleLike: (bunnyName: string) => Promise<void>;
    isLiked: (bunnyName: string) => boolean;
    isLikeLoading: (bunnyName: string) => boolean;
    updateBunnyLikeCount: (bunnyName: string, delta: number) => void;
}

export const useBunnyStore = create<BunnyState>((set, get) => ({
    bunnies: [],
    isLoading: false,
    error: null,
    likedBunnies: new Set<string>(),
    likeLoading: new Set<string>(),

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

    getBunnyByName: (bunnyName: string) => {
        const { bunnies } = get();
        return bunnies.find(bunny => bunny.bunny_name === bunnyName);
    },

    clearError: () => set({ error: null }),

    toggleLike: async (bunnyName: string) => {
        const { likedBunnies, likeLoading } = get();
        
        if (likeLoading.has(bunnyName)) return;
        
        set({
            likeLoading: new Set([...likeLoading, bunnyName])
        });
        
        try {
            const isCurrentlyLiked = likedBunnies.has(bunnyName);
            
            if (isCurrentlyLiked) {
                await deleteLike(bunnyName);
                set({
                    likedBunnies: new Set([...likedBunnies].filter(name => name !== bunnyName))
                });
                get().updateBunnyLikeCount(bunnyName, -1);
            } else {
                await postLike(bunnyName);
                set({
                    likedBunnies: new Set([...likedBunnies, bunnyName])
                });
                get().updateBunnyLikeCount(bunnyName, 1);
            }
        } catch (error) {
            console.error('좋아요 처리 중 오류 발생:', error);
        } finally {
            set({
                likeLoading: new Set([...likeLoading].filter(name => name !== bunnyName))
            });
        }
    },

    isLiked: (bunnyName: string) => {
        const { likedBunnies } = get();
        return likedBunnies.has(bunnyName);
    },

    isLikeLoading: (bunnyName: string) => {
        const { likeLoading } = get();
        return likeLoading.has(bunnyName);
    },

    updateBunnyLikeCount: (bunnyName: string, delta: number) => {
        const { bunnies } = get();
        const updatedBunnies = bunnies.map(bunny => 
            bunny.bunny_name === bunnyName 
                ? { ...bunny, like_count: bunny.like_count + delta }
                : bunny
        );
        set({ bunnies: updatedBunnies });
    },
}));
