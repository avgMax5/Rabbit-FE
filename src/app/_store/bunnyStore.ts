import { create } from "zustand";
import axios from "axios";
import { webSocketService } from "../_utils/websocket";
import {
  PriceTick,
  ClosingPriceUpdate,
  toNum,
  calcFluctuationRate,
} from "../_utils/websocket";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TEST_TOKEN = process.env.NEXT_PUBLIC_TEST_TOKEN;

export interface Bunny {
    bunny_id: string;
    user_name: string;
    bunny_name: string;
    image: string;
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

export interface BunnyContext {
    is_liked: boolean;
    buyable_amount: number;
    sellable_quantity: number;
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
    bunnyContexts: Record<string, BunnyContext>; // bunnyName을 키로 하는 컨텍스트 맵

    status: {
        bunnies: {
            isLoading: boolean;
            error: string | null; 
        },
        allBunnies: { 
            isLoading: boolean;
            error: string | null;
        },
        bunnyContexts: {
            isLoading: boolean;
            error: string | null;
        }
    }

    fetchBunnies: (params?: FetchBunniesParams) => Promise<void>;
    fetchAllBunnies: (params?: FetchBunniesParams) => Promise<void>;
    fetchBunnyContext: (bunnyName: string) => Promise<void>;

    getBunnyByName: (bunnyName: string) => Bunny | undefined;
    getBunnyContext: (bunnyName: string) => BunnyContext | undefined;
    clearError: () => void;
    updateBunnyLikeCount: (bunnyName: string, delta: number) => void;
    getBunnyLikeCount: (bunnyName: string) => number;
    updateBunnyContext: (bunnyName: string, context: Partial<BunnyContext>) => void;

    // 실시간 가격 스트림 제어
    startPriceRealtime: (bunnyName: string) => Promise<void>;
    stopPriceRealtime: (bunnyName: string) => void;

    filters: Filters;
    setFilter: (key: string, value: number | number[] | null) => void;
}

export const useBunnyStore = create<BunnyState>((set, get) => ({
    bunnies: [],
    allBunnies: [],
    bunnyContexts: {},

    status: {
        bunnies: { isLoading: false, error: null },
        allBunnies: { isLoading: false, error: null },
        bunnyContexts: { isLoading: false, error: null },
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

            const newBunnies: Bunny[] = response.data.content;
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

            const bunnies: Bunny[] = response.data.content;

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

    fetchBunnyContext: async (bunnyName: string) => {
        set((state) => ({
            status: {
                ...state.status,
                bunnyContexts: { isLoading: true, error: null },
            },
        }));

        try {
            const response = await axios.get(
                `${API_BASE_URL}/bunnies/${bunnyName}/user-context`,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${TEST_TOKEN}`,
                    },
                }
            );

            set((state) => ({
                bunnyContexts: {
                    ...state.bunnyContexts,
                    [bunnyName]: response.data,
                },
                status: {
                    ...state.status,
                    bunnyContexts: { isLoading: false, error: null },
                },
            }));
        } catch (error) {
            console.error('Bunny context 가져오기 실패:', error);
            set((state) => ({
                status: {
                    ...state.status,
                    bunnyContexts: {
                        isLoading: false,
                        error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
                    },
                },
            }));
        }
    },

    getBunnyByName: (bunnyName: string) => {
        const { allBunnies } = get();
        return allBunnies.find((bunny) => bunny.bunny_name === bunnyName);
    },

    getBunnyContext: (bunnyName: string) => {
        const { bunnyContexts } = get();
        return bunnyContexts[bunnyName];
    },

    clearError: () =>
        set((state) => ({
            status: {
                bunnies: { ...state.status.bunnies, error: null },
                allBunnies: { ...state.status.allBunnies, error: null },
                bunnyContexts: { ...state.status.bunnyContexts, error: null },
            },
        })
    ),

    updateBunnyContext: (bunnyName: string, context: Partial<BunnyContext>) => {
        set((state) => ({
            bunnyContexts: {
                ...state.bunnyContexts,
                [bunnyName]: {
                    ...state.bunnyContexts[bunnyName],
                    ...context,
                },
            },
        }));
    },

    updateBunnyLikeCount: (bunnyName: string, delta: number) => {
        const { bunnies, allBunnies } = get();
        const updateList = (list: Bunny[]) =>
            list.map((bunny) =>
                bunny.bunny_name === bunnyName
                    ? { ...bunny, like_count: bunny.like_count + delta }
                    : bunny
            );
        
        set({ 
            bunnies: updateList(bunnies),
            allBunnies: updateList(allBunnies)
        });
    },

    getBunnyLikeCount: (bunnyName: string) => {
        const { bunnies, allBunnies } = get();
        const bunny = bunnies.find((b) => b.bunny_name === bunnyName) || 
                     allBunnies.find((b) => b.bunny_name === bunnyName);
        return bunny ? bunny.like_count : 0;
    },

    startPriceRealtime: async (bunnyName: string) => {
        // 1) ws 연결 보장
        await webSocketService.connect();

        // 2) 현재가 틱 구독
        webSocketService.subscribeToCurrentPrice(bunnyName, (tick: PriceTick) => {
            const cur = toNum(tick.currentPrice);

            set((state) => {
                const updateList = (list: Bunny[]) =>
                    list.map((bunny) =>
                        bunny.bunny_name === bunnyName
                            ? {
                                  ...bunny,
                                  current_price: cur,
                                  fluctuation_rate: calcFluctuationRate(cur, bunny.closing_price),
                            }
                            : bunny
                    );
                return {
                    bunnies: updateList(state.bunnies),
                    allBunnies: updateList(state.allBunnies),
                };
            });
        });

        // 3) 종가(자정 1회) 구독
        webSocketService.subscribeToClosingPrice(bunnyName, (close: ClosingPriceUpdate) => {
            const closing = toNum(close.closingPrice);

            set((state) => {
                const updateList = (list: Bunny[]) =>
                    list.map((bunny) =>
                        bunny.bunny_name === bunnyName
                            ? {
                                ...bunny,
                                closing_price: closing,
                                fluctuation_rate: calcFluctuationRate(bunny.current_price, closing),
                            }
                            : bunny
                    );

                return {
                    bunnies: updateList(state.bunnies),
                    allBunnies: updateList(state.allBunnies),
                };
            });
        });
    },

    stopPriceRealtime: (bunnyName: string) => {
        webSocketService.unsubscribeFromCurrentPrice(bunnyName);
        webSocketService.unsubscribeFromClosingPrice(bunnyName);
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
