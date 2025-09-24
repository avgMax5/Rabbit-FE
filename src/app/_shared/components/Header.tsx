"use client";

import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ShopModal from "./Shop";
import { useUserStore } from "@/app/_store/userStore";

function Header() {
    const [mouseEnter, setMouseEnter] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const pathname = usePathname();
    
    const carrot = useUserStore((state) => state.user?.carrot);
    const user_id = useUserStore((state) => state.user?.user_id);
    const user = useUserStore((state) => state.user);
    const isLoading = useUserStore((state) => state.isLoading);
    const fetchUser = useUserStore((state) => state.fetchUser);
    
    useEffect(() => {
        if (!user && !isLoading) {
            fetchUser();
        }
    }, []);
    console.log("carrot", carrot);

    const getActive = () => {
        if (pathname === "/personal/home") return "home";
        if (pathname.startsWith("/personal/mypage")) return "mypage";
        if (pathname === "/personal/publish") return "funding";
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

    const [isShopModalOpen, setIsShopModalOpen] = useState(false);
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
                        메인
                    </Home>
                </Link>
                {/* <Link href={`/personal/mypage/${user_id}`}> */}
                <Link href={user_id ? `/personal/mypage/${user_id}` : "#"}>
                    <MyPage
                        $activate={activate === "mypage"}
                        $isLoaded={isLoaded}
                    >
                        마이페이지
                    </MyPage>
                </Link>
                <Link href={`/personal/publish`}>
                    <Funding
                        $activate={activate === "funding"}
                        $isLoaded={isLoaded}
                    >
                        펀딩
                    </Funding>
                </Link>
            </Navigate>
            <Money onClick={handleMoneyClick}>
                <CarrotImg src="/images/personal/home/carrot.png" alt="당근" />
                {carrot}
            </Money>
            <ShopModal isOpen={isShopModalOpen} onClose={handleCloseModal} />
        </Div>
    );
}

const NavButton = styled.div<{ $activate?: boolean; $isLoaded?: boolean }>`
    width: 7rem;
    height: 2rem;
    border-radius: 10px;
    text-align: center;
    line-height: 2rem;
    transition: all 0.5s ease-in-out;

    color: ${({ $activate }) => ($activate ? "#000" : "#454545")};
    background: ${({ $activate, $isLoaded }) => {
        if (!$isLoaded) return "none";
        return $activate ? "#ffbb6e" : "none";
    }};
    box-shadow: ${({ $activate, $isLoaded }) => {
        if (!$isLoaded) return "none";
        return $activate
            ? `-2px -4px 10px 0 #d7654d inset, 
         6px 4px 10px 0 #ffd6cd inset,
         4px 4px 10px 0 rgba(255, 181, 166, 0.64)`
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
        4px 3px 4px 0 #f7f7f7 inset,
        -4px -2px 15px 0 rgba(71, 87, 122, 0.67) inset;
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
    backdrop-filter: blur(5px);
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

const CarrotImg = styled.img`
    height: 1.5rem;
`;
const Money = styled(WhiteContainer)`
    padding: 0.5rem 1.2rem;
    gap: 0.4rem;
    font-size: 15px;
    cursor: pointer;
    color: #000;
`;

export default Header;
