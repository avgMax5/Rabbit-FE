import styled from "styled-components";

function LikeBox({ like }: { like: number }) {
    return (
        <Div>
            <HearImg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="auto"
                    viewBox="0 0 19 17"
                >
                    <path
                        d="M-0.000976562 5.78056C-0.000976562 10.4004 3.81802 12.8619 6.61292 15.0659C7.59902 15.843 8.54902 16.5754 9.49902 16.5754C10.449 16.5754 11.399 15.8439 12.3851 15.0649C15.181 12.8628 18.999 10.4004 18.999 5.78151C18.999 1.16261 13.774 -2.11584 9.49902 2.32636C5.22402 -2.11584 -0.000976562 1.16071 -0.000976562 5.78056Z"
                        fill="#ff0005"
                    />
                </svg>
            </HearImg>
            <LikeCount>{like}</LikeCount>
        </Div>
    );
}

const Div = styled.div`
    display: flex;
    width: 6.5rem;
    height: 2.4rem;
    padding: 2px 10px 2px 9px;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    flex-shrink: 0;
    border-radius: 30px;
    background: #efeeee;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
`;
const HearImg = styled.div`
    width: 1.4rem;
    height: 1.8rem;
    text-align: center;
    flex-shrink: 0;
`;
const LikeCount = styled.div`
    background-color: antiquewhite;
    font-family: var(--font-nanum-squar);
    font-weight: 900;
    font-size: 14px;
`;

export default LikeBox;
