// userStore.ts
import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TEST_TOKEN = process.env.NEXT_PUBLIC_TEST_TOKEN;

export interface User {
    user_id: string;
    name: string;
    image: string;
    role: string;
    carrot: string;
    my_bunny_name: string;
}

interface UserState {
    user: User | null;
    isLoading: boolean;
    error: string | null;

    fetchUser: () => Promise<void>;
    authActions: {
        login: (provider: "google" | "github" | "kakao" | "naver") => void;
        logout: () => void;
    };
}

export const useUserStore = create<UserState>((set, get) => ({
    user: null,
    isLoading: true,
    error: null,

    fetchUser: async () => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.get(`${API_BASE_URL}/personal/me`, {
                headers: {
                    Authorization: `Bearer ${TEST_TOKEN}`,
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (!response.data || !response.data.user_id) {
                throw new Error("유효한 사용자 데이터가 아닙니다.");
            }

            set({ user: response.data, isLoading: false });
        } catch (error) {
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : "사용자 정보를 가져오는데 실패했습니다.",
                isLoading: false,
                user: null
            });
        }
    },
    authActions: {
        login: (provider: "google" | "github" | "kakao" | "naver") => {
            try {
                const url = `${API_BASE_URL}/login/${provider}`;
                window.location.assign(url);
            } catch (error) {
                set({
                    error: error instanceof Error 
                        ? error.message 
                        : "로그인에 실패했습니다."
                });
            }
        },
        
        logout: () => {
            try {
                set({ user: null, error: null });
                
                const url = `${API_BASE_URL}/auth/logout`;
                window.location.assign(url);
            } catch (error) {
                set({
                    error: error instanceof Error 
                        ? error.message 
                        : "로그아웃에 실패했습니다."
                });
            }
        }
    }
}));
