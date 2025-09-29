import { useEffect, useMemo, useRef, useState } from "react";
import { BadgeData } from "../_constants/constants";
import Badge from "./Badge";
import { useBunnyStore } from "@/app/_store/bunnyStore";
import { Icon } from "@iconify/react";
import styled from "styled-components";

export function BadgeContainer() {
    const { allBunnies, fetchAllBunnies } = useBunnyStore();
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: string) => {
        if (scrollRef.current) {
            const scrollAmount = 300; // 스크롤 이동 거리
            const newScrollLeft =
                scrollRef.current.scrollLeft +
                (direction === "left" ? -scrollAmount : scrollAmount);

            scrollRef.current.scrollTo({
                left: newScrollLeft,
                behavior: "smooth",
            });
        }
    };

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        if (!allBunnies || allBunnies.length === 0) {
            fetchAllBunnies();
        }
    }, [allBunnies, fetchAllBunnies]);

    const badgeCount = useMemo(() => {
        const countMap: Record<string, number> = {};

        allBunnies.forEach((bunny) => {
            bunny.badges.forEach((badgeName) => {
                countMap[badgeName] = (countMap[badgeName] ?? 0) + 1;
            });
        });

        return countMap;
    }, [allBunnies]);

    return (
        <>
            {showLeftArrow && (
                <ArrowButton $direction="left" onClick={() => scroll("left")}>
                    <Icon icon="mdi:arrow-left" />
                </ArrowButton>
            )}

            <Wrapper ref={scrollRef} onScroll={checkScroll}>
                {BadgeData.map((badge, i) => (
                    <Badge
                        key={badge.id}
                        badge={badge}
                        amount={badgeCount[badge.name] ?? 0}
                    />
                ))}
            </Wrapper>

            {showRightArrow && (
                <ArrowButton $direction="right" onClick={() => scroll("right")}>
                    <Icon icon="mdi:arrow-right" />
                </ArrowButton>
            )}
        </>
    );
}

const Wrapper = styled.div`
    display: flex;
    overflow-x: auto;
    height: 100%;
    width: 100;
    padding: 0 10px;

    &::-webkit-scrollbar {
        display: none;
    }

    scrollbar-width: none;
`;

const ArrowButton = styled.button<{ $direction: string }>`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    ${(props) =>
        props.$direction === "left" ? "left: -15px;" : "right: -15px;"}

    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.453);
    color: #2b014d;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;

    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transition: all 0.2s ease;

    &:hover {
        background: #fff;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        transform: translateY(-50%) scale(1.05);
    }

    &:active {
        transform: translateY(-50%) scale(0.95);
    }
`;
