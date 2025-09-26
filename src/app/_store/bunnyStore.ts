import { create } from "zustand";
import axios from "axios";

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
    ai_review: string;
    created_at: string;
}

export interface FetchBunniesParams {
    sortType?: string;
    page?: number;
    size?: number;
}

export interface Filters {
    bunnyType: number | null;
    position: number | null;
    bunnyTraits: number | null;
    badges: number[];
}

interface BunnyState {
    bunnies: Bunny[];
    allBunnies: Bunny[];

    status: {
        bunnies: {
            isLoading: boolean;
            error: string | null; 
        },
        allBunnies: { 
            isLoading: boolean;
            error: string | null;
        },
    }

    fetchBunnies: (params?: FetchBunniesParams) => Promise<void>;
    fetchAllBunnies: (params?: FetchBunniesParams) => Promise<void>;

    getBunnyByName: (bunnyName: string) => Bunny | undefined;
    clearError: () => void;
    updateBunnyLikeCount: (bunnyName: string, delta: number) => void;
    getBunnyLikeCount: (bunnyName: string) => number;

    filters: Filters;
    setFilter: (key: string, value: number | number[] | null) => void;
}

export const useBunnyStore = create<BunnyState>((set, get) => ({
    bunnies: [],
    allBunnies: [],

    status: {
        bunnies: { isLoading: false, error: null },
        allBunnies: { isLoading: false, error: null },
    },

    fetchBunnies: async (params: FetchBunniesParams = {}) => {
        const sortType = params.sortType ?? "";
        const page = params.page ?? 0;
        const size = params.size ?? 10;
  
        set((state) => ({
            status: {
                ...state.status,
                bunnies: { isLoading: true, error: null },
            },
        }));

        try {
            const url = new URL(`${API_BASE_URL}/bunnies`, window.location.origin);
            url.searchParams.append('page', page.toString());
            url.searchParams.append('size', size.toString());
            url.searchParams.append('sortType', sortType);
            
            const response = await axios.get(url.toString(), {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TEST_TOKEN}`,
                },
            });

            const newBunnies = response.data.content;
            if (page === 0) {
            set((state) => ({
                bunnies: newBunnies,
                status: {
                ...state.status,
                bunnies: { ...state.status.bunnies, isLoading: false },
                },
            }));
            } else {
            set((state) => ({
                bunnies: [...get().bunnies, ...newBunnies],
                status: {
                ...state.status,
                bunnies: { ...state.status.bunnies, isLoading: false },
                },
            }));
            }
        } catch (error) {
            console.warn("Bunnies API 호출 실패:", error);
            set((state) => ({
                status: {
                    ...state.status,
                    bunnies: {
                        isLoading: false,
                        error:
                            error instanceof Error
                            ? error.message
                            : "알 수 없는 오류가 발생했습니다.",
                        },
                    },
            }));
        }
    },

    
    fetchAllBunnies: async () => {
        set((state) => ({
            status: {
                ...state.status,
                allBunnies: { isLoading: true, error: null },
            },
        }));

        try {
            const url = new URL(`${API_BASE_URL}/bunnies?filter=ALL`, window.location.origin);
            
            const response = await axios.get(url.toString(), {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TEST_TOKEN}`,
                },
            });

            const bunnies = response.data.content;

            set((state) => ({
                allBunnies: bunnies,
                status: {
                    ...state.status,
                    allBunnies: { ...state.status.allBunnies, isLoading: false },
                },
            }));
        } catch (error) {
            console.warn("Bunnies API 호출 실패:", error);
            set((state) => ({
            status: {
                ...state.status,
                allBunnies: {
                    isLoading: false,
                    error:
                        error instanceof Error
                        ? error.message
                        : "알 수 없는 오류가 발생했습니다.",
                    },
                },
            }));
        }
    },

    getBunnyByName: (bunnyName: string) => {
        const { allBunnies } = get();
        return allBunnies.find((bunny) => bunny.bunny_name === bunnyName);
    },

    clearError: () =>
        set((state) => ({
            status: {
                bunnies: { ...state.status.bunnies, error: null },
                allBunnies: { ...state.status.allBunnies, error: null },
            },
        })
    ),

    updateBunnyLikeCount: (bunnyName: string, delta: number) => {
        const { bunnies } = get();
        const updatedBunnies = bunnies.map((bunny) =>
            bunny.bunny_name === bunnyName
                ? { ...bunny, like_count: bunny.like_count + delta }
                : bunny
        );
        set({ bunnies: updatedBunnies });
    },

    getBunnyLikeCount: (bunnyName: string) => {
        const { bunnies } = get();
        const bunny = bunnies.find((b) => b.bunny_name === bunnyName);
        return bunny ? bunny.like_count : 0;
    },

    filters: {
        bunnyType: null,
        position: null,
        bunnyTraits: null,
        badges: [],
    },
    
    setFilter: (key, value) =>
        set((state) => ({
        filters: {
            ...state.filters,
            [key]: value,
        },
    })),
}));
