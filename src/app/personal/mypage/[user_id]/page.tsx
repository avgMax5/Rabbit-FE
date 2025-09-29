"use client";

import { useEffect, useState } from "react";
import MyBunny from "./_sections/MyBunny";
import MyBunnyList from "./_sections/MyBunnyList";
import MyInfo from "./_sections/MyInfo";
import styled from "styled-components";
import Aside from "./_components/Aside";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/_store/userStore";
import ResultModal from "@/app/_shared/modal/Result";

function MyPage() {
    const [activeTab, setActiveTab] = useState<
        "info" | "bunny" | "list" | "logout"
    >("bunny");
    const router = useRouter();
    const { authActions } = useUserStore();
    
    // Result 모달 상태 관리
    const [modalState, setModalState] = useState({
        isOpen: false,
        type: 'success' as 'success' | 'error',
        title: '',
        message: ''
    });

    const handleLogout = () => {
        authActions.logout();
        router.replace("/"); // 로그인 페이지로 이동
    };

    const handleShowModal = (type: 'success' | 'error', title: string, message: string) => {
        setModalState({
            isOpen: true,
            type,
            title,
            message
        });
    };

    useEffect(() => {
        const savedTab = localStorage.getItem("mypageTab") as
            | "info"
            | "bunny"
            | "list"
            | null;
        if (savedTab) setActiveTab(savedTab);
    }, []);

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
                {activeTab === "info" && <MyInfo onShowModal={handleShowModal} />}
                {activeTab === "bunny" && <MyBunny />}
                {activeTab === "list" && <MyBunnyList />}
            </Div>
            
            <ResultModal
                isOpen={modalState.isOpen}
                onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
                type={modalState.type}
                title={modalState.title}
                message={modalState.message}
                buttonText="확인"
                blurIntensity="light"
            />
        </>
    );
}

const Div = styled.div`
    width: 100%;
    height: 100%;
`;

export default MyPage;
