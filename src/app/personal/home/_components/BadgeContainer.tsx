import { useEffect, useMemo } from "react";
import { BadgeData } from "../_constants/constants";
import Badge from "./Badge";
import { useBunnyStore } from "@/app/_store/bunnyStore";

export function BadgeContainer(){
    const { allBunnies, fetchAllBunnies } = useBunnyStore();
    
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

    return(
        <>
            {BadgeData.map((badge, i) => (
                <Badge key={badge.id} badge={badge} amount={badgeCount[badge.name] ?? 0}/>
            ))}
        </>
    );

}