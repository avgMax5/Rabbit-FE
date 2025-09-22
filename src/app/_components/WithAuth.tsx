"use client";

import { useUserStore } from "@/app/_store/userStore";
import { useRouter } from "next/navigation";
import { useEffect, ComponentType } from "react";
import styled from "styled-components";

const WithAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const AuthComponent = (props: P) => {
        const { user, isLoading, error, fetchUser } = useUserStore();
        const router = useRouter();

        console.log("WithAuth 렌더링:", { isLoading, user, error }); 
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
            return <LoadingWrapper>Loading...</LoadingWrapper>;
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
    font-size: 2rem;
    background-color: #0a1a2e;
    color: white;
`;

export default WithAuth;
