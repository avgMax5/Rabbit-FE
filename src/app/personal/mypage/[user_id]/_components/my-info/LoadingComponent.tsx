import { Loading } from "@/app/_shared/components";
import styled from "styled-components";

function LoadingComponent() {
    return (
        <>
            <LoadingContainer>
                <Loading
                    variant="bunny"
                    size="medium"
                    text="나의 정보를 불러오는 중..."
                />
            </LoadingContainer>
        </>
    );
}

const MainContainer = styled.div`
    width: 100vw !important;
    height: 100vh !important;
    min-height: 100vh !important;
    background: linear-gradient(
        to bottom,
        #000000 0%,
        #002554 17%,
        #325f9b 47%,
        #3c7bcd 71%,
        #7cb0f3 100%
    ) !important;
    background-attachment: fixed !important;
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    z-index: -1 !important;
`;

const ContentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    z-index: 1;
    padding-top: 100px;
`;

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;
    gap: 20px;
`;

export default LoadingComponent;
