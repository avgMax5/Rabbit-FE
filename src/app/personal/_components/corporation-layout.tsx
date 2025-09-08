import styled from "styled-components";

type CorporationBadgeProps = {
    src: string;
};

function CorporationBadge({ src }: CorporationBadgeProps) {
    return (
        <Corporation>
            <img src={src} alt="카카오" />
            <div>
                <TotalAmount>16</TotalAmount>
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
