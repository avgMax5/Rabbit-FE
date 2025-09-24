import styled from "styled-components";
import { BadgeType } from "../_types/interfaces";

interface CorporationBadgeProps {
    badge: BadgeType;
}

function CorporationBadge({ badge }: CorporationBadgeProps) {
    return (
        <Corporation>
            <img src={badge.src} alt="카카오" />
            <div>
                <TotalAmount>{badge.amount}</TotalAmount>
                <span>개</span>
                <Triangle
                    viewBox="0 0 23 18"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {badge.raise ? (
                        <path
                            d="M11.5 0L22.7583 18H0.24167L11.5 0Z"
                            fill="#064DE3"
                        />
                    ) : (
                        <path
                            d="M11.5 18L0.241669 0H22.7583L11.5 18Z"
                            fill="#FF967F"
                        />
                    )}
                </Triangle>
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

const Triangle = styled.svg`
    width: 23px;
    height: 18px;
    fill: none;
    margin-left: 0.5rem;
`;

export default CorporationBadge;
