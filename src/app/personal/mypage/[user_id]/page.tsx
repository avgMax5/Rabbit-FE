"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import MyBunny from "./_sections/MyBunny";
import MyBunnyList from "./_sections/MyBunnyList";
import MyInfo from "./_sections/MyInfo";
import styled from "styled-components";
import Aside from "./_components/Aside";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/_store/userStore";

function MyPage() {
    const [activeTab, setActiveTab] = useState<
        "info" | "bunny" | "list" | "logout"
    >("info");
    const router = useRouter();
    const { authActions } = useUserStore();

    const handleLogout = () => {
        authActions.logout();
        router.replace("/"); // 로그인 페이지로 이동
    };

    useEffect(() => {
        const savedTab = localStorage.getItem("mypageTab") as
            | "info"
            | "bunny"
            | "list"
            | null;
        if (savedTab) setActiveTab(savedTab);
    }, []);

    // activeTab 변경 시 localStorage에 저장
    useEffect(() => {
        localStorage.setItem("mypageTab", activeTab);
    }, [activeTab]);

    return (
        <>
            <Aside
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onLogout={handleLogout}
            />
            <Div>
                {activeTab === "info" && <MyInfo />}
                {activeTab === "bunny" && <MyBunny />}
                {activeTab === "list" && <MyBunnyList />}
            </Div>
        </>
    );
}

const Div = styled.div`
    width: 100%;
    height: 100%;
`;

export default MyPage;
