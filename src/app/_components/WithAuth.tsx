"use client";

import { useUserStore } from "@/app/_store/userStore";
import { useRouter } from "next/navigation";
import { useEffect, ComponentType } from "react";
import styled from "styled-components";
import Loading from "@/app/_shared/components/Loading";

const WithAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const AuthComponent = (props: P) => {
        const { user, isLoading, error, fetchUser } = useUserStore();
        const router = useRouter();

        useEffect(() => {
            if (!user && !error) {
                fetchUser();
            }
        }, [user, error, fetchUser]);

        useEffect(() => {
            if (!isLoading && (error || !user)) {
                router.replace('/');
            }
        }, [isLoading, error, user, router]);

        if (isLoading || !user) {
            return (
                <LoadingWrapper>
                    <Loading 
                        variant="bunny" 
                        size="large" 
                        text="사용자 정보를 불러오는 중..." 
                        fullScreen={true}
                    />
                </LoadingWrapper>
            );
        }

        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
};

const LoadingWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
        to bottom,
        rgba(7, 14, 25, 0.9) 0%,
        rgba(44, 107, 192, 0.9) 33%,
        rgba(145, 176, 217, 0.72) 66%,
        rgba(243, 241, 235, 1) 100%
    );
`;

export default WithAuth;
