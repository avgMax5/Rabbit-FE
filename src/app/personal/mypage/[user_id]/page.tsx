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
import Link from "next/link";

function MyPage() {
    const [activeTab, setActiveTab] = useState<
        "info" | "bunny" | "list" | "logout"
    >("bunny");
    const router = useRouter();
    const { authActions } = useUserStore();

    // Result 모달 상태 관리
    const [modalState, setModalState] = useState({
        isOpen: false,
        type: "success" as "success" | "error",
        title: "",
        message: "",
    });
    const { user } = useUserStore();

    const bunnyRole = user?.role ?? "ROLE_USER";

    const handleLogout = () => {
        authActions.logout();
        router.replace("/"); // 로그인 페이지로 이동
    };

    const handleShowModal = (
        type: "success" | "error",
        title: string,
        message: string
    ) => {
        setModalState({
            isOpen: true,
            type,
            title,
            message,
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
                {activeTab === "info" && (
                    <MyInfo onShowModal={handleShowModal} />
                )}
                {activeTab === "bunny" && <MyBunny />}
                {activeTab === "list" && <MyBunnyList />}
            </Div>

            <ResultModal
                isOpen={modalState.isOpen}
                onClose={() =>
                    setModalState((prev) => ({ ...prev, isOpen: false }))
                }
                type={modalState.type}
                title={modalState.title}
                message={modalState.message}
                buttonText="확인"
                blurIntensity="light"
            />
            {bunnyRole === "ROLE_USER" && activeTab === "bunny" && (
                <ButtonContainer>
                    <MoveBtn
                        onClick={() => {
                            setActiveTab("info");
                            localStorage.setItem("mypageTab", "info");
                        }}
                    >
                        <SmallRocketImage src="/images/icon/backend.png" />내
                        정보 업데이트 하기
                    </MoveBtn>

                    <Link href="/personal/funding">
                        <MoveBtn>
                            <SmallRocketImage src="/images/personal/mypage/small_rocket.png" />
                            상장 페이지로 이동
                        </MoveBtn>
                    </Link>
                </ButtonContainer>
            )}
        </>
    );
}

const Div = styled.div`
    width: 100%;
    height: 100%;
`;

const SmallRocketImage = styled.img`
    width: 20px;
    height: 20px;
`;

const MoveBtn = styled.div`
    width: 11rem;
    height: 2.5rem;
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 16px;
    border: none;
    background-image: linear-gradient(135deg, #667eeabb, #a86ce5a1, #9539e1ba);
    box-shadow: 4px 4px 4px 0 rgba(116, 79, 168, 0.242);
    transition: all 0.4s ease-in-out;

    &:hover {
        background-image: linear-gradient(
            135deg,
            #2d4fe3ba,
            #8c34e5a0,
            #6705b7b9
        );
        transform: translateY(-4px);
        box-shadow: 2px 2px 6px #00000036;
    }

    cursor: pointer;

    color: #ffffff;
    text-shadow: 1.275px 1.275px 0.638px rgba(0, 0, 0, 0.25);
    font-size: 13px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
`;

const ButtonContainer = styled.div`
    position: absolute;
    top: 82%;
    left: 38%;
    display: flex;
    gap: 13px;
    justify-content: center;
`;

export default MyPage;
