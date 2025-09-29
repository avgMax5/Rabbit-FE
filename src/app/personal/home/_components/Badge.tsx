import styled from "styled-components";
import { BadgeType } from "../_types/interfaces";

interface CorporationBadgeProps {
    badge: BadgeType;
    amount: number;
}

function CorporationBadge({ badge, amount }: CorporationBadgeProps) {
    console.log(badge, "src");
    return (
        <Corporation>
            <img src={badge.src} alt={badge.alias} />
            <div>
                <TotalAmount>{amount}</TotalAmount>
                <span>버니</span>
            </div>
        </Corporation>
    );
}

const Corporation = styled.div`
    width: 11rem;
    height: 100%;
    padding: 15px;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #daf0ff;
    text-shadow: 1px 1px 0 rgba(16, 12, 12, 0.25);

    border-right: 0.1px solid #ffffff14;

    & > img {
        width: 40px;
        height: auto;
    }

    & > div {
        font-size: 15px;
        font-weight: 700;
        display: flex;
        align-items: end;
        gap: 0.2rem;
    }

    & span {
        font-size: 10px;
        color: #c2c2c2;
    }
`;

const TotalAmount = styled.div``;

export default CorporationBadge;
