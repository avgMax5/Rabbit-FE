import styled from "styled-components";
import { BadgeType } from "../_types/interfaces";

interface CorporationBadgeProps {
    badge: BadgeType;
    amount: number;
}

function CorporationBadge({ badge, amount }: CorporationBadgeProps) {
    return (
        <Corporation>
            <img src={badge.src} alt={badge.alias} />
            <div>
                <TotalAmount>{amount}</TotalAmount>
                <span>개</span>
            </div>
        </Corporation>
    );
}

const Corporation = styled.div`
    width: 20%;
    height: 100%;
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    color: #fff;
    text-shadow: 1px 1px 0 rgba(16, 12, 12, 0.25);

    & > img {
        width: auto;
        height: 100%;
    }

    & > div {
        display: flex;
        gap: 0.2rem;
    }
`;

const TotalAmount = styled.div``;

export default CorporationBadge;
