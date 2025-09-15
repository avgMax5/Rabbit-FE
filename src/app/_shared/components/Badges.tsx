import styled from "styled-components";

function Badges() {
    return (
        <Div>
            <img src="/images/personal/shared/kakao-badge.png" />
            <img src="/images/personal/shared/naver-badge.png" />
            <img src="/images/personal/shared/shinhan-badge.png" />
        </Div>
    );
}

const Div = styled.div`
    width: auto;
    & img {
        width: 2.3rem;
        height: 2.3rem;
    }
`;

export default Badges;
