"use client";

import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useUserStore } from "@/app/_store/userStore";
import ShopModal from "./Shop";

function Header() {
    const [mouseEnter, setMouseEnter] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isShopModalOpen, setIsShopModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    const carrot = useUserStore((state) => state.user?.carrot);
    const user_id = useUserStore((state) => state.user?.user_id);
    const user = useUserStore((state) => state.user);
    const user_role = useUserStore((state) => state.user?.role);
    const isLoading = useUserStore((state) => state.isLoading);
    const fetchUser = useUserStore((state) => state.fetchUser);

    useEffect(() => {
        if (!user && !isLoading) {
            fetchUser();
        }
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    console.log("user_role", user_role);

    const getActive = () => {
        if (pathname === "/personal/home") return "home";
        if (pathname.startsWith("/personal/mypage")) return "mypage";
        if (pathname.startsWith("/personal/funding")) return "funding";
        if (pathname.startsWith("/personal/trade")) return "trade";
        return null;
    };
    const activate = getActive();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const handleMouseEnter = () => {
        setMouseEnter(true);
    };
    const handleMouseLeave = () => {
        setMouseEnter(false);
    };

    const handleMoneyClick = () => {
        setIsShopModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsShopModalOpen(false);
    };

    return (
        <Div>
            <Link href="/personal/home">
                <Logo src="/images/logo.png" alt="토끼로고" />
            </Link>
            <Navigate>
                <Link href={`/personal/home`}>
                    <Home
                        $activate={activate === "home"}
                        $isLoaded={isLoaded}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        홈
                    </Home>
                </Link>
                <Link href={user_id ? `/personal/mypage/${user_id}` : "#"}>
                    <MyPage
                        $activate={activate === "mypage"}
                        $isLoaded={isLoaded}
                    >
                        마이페이지
                    </MyPage>
                </Link>
                {pathname === "/personal/funding/list" ? (
                    <Link href={`/personal/funding/list`}>
                        <Funding
                            $activate={activate === "funding"}
                            $isLoaded={isLoaded}
                        >
                            모든 펀딩
                        </Funding>
                    </Link>
                ) : (
                    <Link href={`/personal/funding`}>
                        <Funding
                            $activate={activate === "funding"}
                            $isLoaded={isLoaded}
                        >
                            펀딩
                        </Funding>
                    </Link>
                )}
                {pathname.startsWith("/personal/trade") && (
                    <Trade
                        $activate={activate === "trade"}
                        $isLoaded={isLoaded}
                        style={{ cursor: "pointer" }}
                    >
                        거래
                    </Trade>
                )}
            </Navigate>
            <Money onClick={handleMoneyClick}>
                <CarrotImg src="/images/personal/home/carrot.png" alt="당근" />
                {Number(carrot).toLocaleString()}
            </Money>
            {mounted &&
                createPortal(
                    <ShopModal
                        isOpen={isShopModalOpen}
                        onClose={handleCloseModal}
                    />,
                    document.body
                )}
        </Div>
    );
}

const NavButton = styled.div<{ $activate?: boolean; $isLoaded?: boolean }>`
    width: 7rem;
    height: 2.1rem;
    border-radius: 12px;
    text-align: center;
    line-height: 2.1rem;
    transition: all 0.5s ease-in-out;

    color: ${({ $activate }) => ($activate ? "#000" : "#454545")};
    background: ${({ $activate, $isLoaded }) => {
        if (!$isLoaded) return "none";
        return $activate ? "#fbb1a0cd" : "none";
    }};
    box-shadow: ${({ $activate, $isLoaded }) => {
        if (!$isLoaded) return "none";
        return $activate
            ? `-2px -2px 5px 0 #d7654d inset, 
         2px 2px 3px 0 #ffd6cd inset,
         1px 1px 2px 0 rgba(255, 181, 166, 0.64)`
            : "none";
    }};
`;

const WhiteContainer = styled.div`
    display: flex;
    gap: 2rem;
    height: 3rem;
    padding: 0.5rem;
    align-items: center;
    flex-shrink: 0;
    border-radius: 18px;
    background: rgba(245, 245, 245, 0.68);
    box-shadow: 5px 5px 8px 0 rgba(130, 150, 176, 0.25),
        1.5px 1.5px 4px 0 #f7f7f7 inset,
        -4px -2px 8px 0 rgba(71, 87, 122, 0.67) inset;
`;

const Div = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    gap: auto;
    width: 100%;
    padding: 1rem 2rem 1.6rem 2rem;
    align-items: center;
    justify-content: center;
    font-family: var(--font-rockstar);
    font-weight: 800;
    backdrop-filter: blur(6px);

    -webkit-mask-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 1) 80%,
        rgba(0, 0, 0, 0) 100%
    );
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: cover;

    mask-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 1) 80%,
        rgba(0, 0, 0, 0) 100%
    );
    mask-repeat: no-repeat;
    mask-size: cover;
`;

const Logo = styled.img`
    width: 8.5rem;
    cursor: pointer;
`;

const Navigate = styled(WhiteContainer)`
    width: auto;
    margin: 0 auto;
`;

const Home = styled(NavButton)``;

const MyPage = styled(NavButton)``;

const Funding = styled(NavButton)``;

const Trade = styled(NavButton)``;

const CarrotImg = styled.img`
    height: 1.5rem;
`;
const Money = styled(WhiteContainer)`
    padding: 0.5rem 1.2rem;
    border-radius: 45px;
    gap: 0.4rem;
    font-size: 15px;
    cursor: pointer;
    color: #000;
    transition: all 0.2s ease;

    &:hover {
        transform: scale(1.05);
    }
`;

export default Header;
