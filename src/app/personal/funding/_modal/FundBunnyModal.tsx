import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import Button from "../../../_shared/components/Button";
import FundingRate from "../_components/FundingRate";
import Portfolio from "../../../_shared/components/Portfolio";
import ResultModal from "../../../_shared/modal/Result";

import {
    getFundBunniesDetail,
    FundBunnyDetail,
    postFundBunnyFunding,
    FundingData,
} from "../../../_api/fundingAPI";

interface FundBunnyModalProps {
    isOpen: boolean;
    onClose: () => void;
    fundBunnyId: string;
}

const FundBunnyModal: React.FC<FundBunnyModalProps> = ({
    isOpen,
    onClose,
    fundBunnyId,
}) => {
    const [isAgreed, setIsAgreed] = useState(false);
    const [bunnyDetail, setBunnyDetail] = useState<FundBunnyDetail | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [bnyAmount, setBnyAmount] = useState<number>(0);
    const [isResultModalOpen, setIsResultModalOpen] = useState(false);
    const [resultType, setResultType] = useState<'success' | 'error'>('success');
    const [resultMessage, setResultMessage] = useState('');

    useEffect(() => {
        if (isOpen && fundBunnyId) {
            fetchBunnyDetail();
        }
    }, [isOpen, fundBunnyId]);

    const fetchBunnyDetail = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const detail = await getFundBunniesDetail(fundBunnyId);
            setBunnyDetail(detail);
        } catch (err) {
            setError("버니 정보를 불러오는데 실패했습니다.");
            console.error("Failed to fetch bunny detail:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFunding = async () => {
        if (!bunnyDetail || bnyAmount <= 0) {
            alert("투자 금액을 입력해주세요.");
            return;
        }

        try {
            const fundingData: FundingData = {
                fund_bny: bnyAmount,
            };

            const response = await postFundBunnyFunding(fundBunnyId, fundingData);
            
            // 성공 시 Result 모달 표시
            setResultType('success');
            setResultMessage('펀딩 참여가 성공적으로 완료되었습니다!');
            setIsResultModalOpen(true);
        } catch (err: any) {
            console.error("펀딩 참여 실패:", err);
            
            // 실패 시 Result 모달 표시
            setResultType('error');
            setResultMessage(err.response?.data?.message || '펀딩 참여에 실패했습니다. 다시 시도해주세요.');
            setIsResultModalOpen(true);
        }
    };

    const handleResultModalClose = () => {
        setIsResultModalOpen(false);
        if (resultType === 'success') {
            onClose(); // 성공 시 모달 닫기
        }
    };

    if (!isOpen) return null;

    const modalContent = (
        <ModalOverlay>
            <Wrapper>
                <Container>
                    {isLoading ? (
                        <LoadingContainer>
                            <LoadingText>
                                버니 정보를 불러오는 중...
                            </LoadingText>
                        </LoadingContainer>
                    ) : error ? (
                        <ErrorContainer>
                            <ErrorText>{error}</ErrorText>
                            <Button
                                onClick={fetchBunnyDetail}
                                variant="primary"
                                size="medium"
                            >
                                다시 시도
                            </Button>
                        </ErrorContainer>
                    ) : bunnyDetail ? (
                        <GridContainer>
                            <Portfolio bunnyDetail={bunnyDetail} />
                            <RightSection>
                                <TopBar>
                                    <ProgressText>
                                        펀딩 진행률:{" "}
                                        {Math.round(
                                            (bunnyDetail.collected_bny /
                                                bunnyDetail.target_bny) *
                                                100
                                        )}
                                        %
                                    </ProgressText>
                                    <ProgressBar>
                                        <ProgressFill
                                            progress={Math.round(
                                                (bunnyDetail.collected_bny /
                                                    bunnyDetail.target_bny) *
                                                    100
                                            )}
                                        />
                                    </ProgressBar>
                                </TopBar>

                                <MiddleRow>
                                    <MiddleBlock>
                                        <FundingRate
                                            holdingStatus={
                                                bunnyDetail.holding_status
                                            }
                                        />
                                    </MiddleBlock>
                                    <MiddleBlock>
                                        <AISummarySection>
                                            <SectionTitle>AI 요약</SectionTitle>
                                            <SummaryText>
                                                {bunnyDetail.spec.ai_review}
                                            </SummaryText>
                                        </AISummarySection>
                                    </MiddleBlock>
                                </MiddleRow>

                                <InputBlock>
                                    <AvailableBunny>
                                        투자 가능한 버니 수:{" "}
                                        {bunnyDetail.available_bny.toLocaleString()}{" "}
                                        BNY
                                    </AvailableBunny>
                                    <InputContainer>
                                        <InputField
                                            type="number"
                                            value={bnyAmount || ""}
                                            onChange={(e) =>
                                                setBnyAmount(
                                                    Number(e.target.value) || 0
                                                )
                                            }
                                        />
                                        <CurrencyLabel>BNY</CurrencyLabel>
                                    </InputContainer>
                                    <InputContainer>
                                        <InputField
                                            type="number"
                                            value={bnyAmount * 1000}
                                            readOnly
                                        />
                                        <CurrencyLabel>CRT</CurrencyLabel>
                                    </InputContainer>
                                    <MyAccount>
                                        내 계좌:{" "}
                                        {bunnyDetail.my_account_bny.toLocaleString()}{" "}
                                        BNY (
                                        {bunnyDetail.my_account_c.toLocaleString()}{" "}
                                        C)
                                    </MyAccount>
                                </InputBlock>

                                <AgreeBlock>
                                    <CheckboxContainer>
                                        <CheckboxInput
                                            type="checkbox"
                                            id="agreement"
                                            checked={isAgreed}
                                            onChange={(e) =>
                                                setIsAgreed(e.target.checked)
                                            }
                                        />
                                        <CheckboxLabel htmlFor="agreement">
                                            코인은 상장되거나 폐지되기 전에는
                                            환불할 수 없음을 확인하고 이에
                                            동의합니다.
                                        </CheckboxLabel>
                                    </CheckboxContainer>
                                </AgreeBlock>
                            </RightSection>
                        </GridContainer>
                    ) : null}

                    {!isLoading && !error && bunnyDetail && (
                        <StyledButtonWrapper>
                            <Button
                                onClick={onClose}
                                variant="danger"
                                size="medium"
                            >
                                취소하기
                            </Button>
                            <Button
                                variant="primary"
                                size="medium"
                                disabled={!isAgreed || bnyAmount <= 0}
                                onClick={handleFunding}
                            >
                                펀딩 참여하기
                            </Button>
                        </StyledButtonWrapper>
                    )}
                </Container>
            </Wrapper>
        </ModalOverlay>
    );

    return (
        <>
            {createPortal(modalContent, document.body)}
            <ResultModal
                isOpen={isResultModalOpen}
                onClose={handleResultModalClose}
                type={resultType}
                title={resultType === 'success' ? '펀딩 참여 완료!' : '펀딩 참여 실패'}
                message={resultMessage}
                buttonText="확인"
            />
        </>
    );
};

// Styled Components
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1.25rem;
    box-sizing: border-box;
`;

const Wrapper = styled.div`
    background-image: linear-gradient(135deg, #081e45, #010a1fe8, #1c2e82dc);
    padding: 1.25rem;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 0.5rem;
`;

const Container = styled.div`
    width: 75rem;
    height: 40rem;
    box-sizing: border-box;
    position: relative;
`;

const GridContainer = styled.div`
    display: flex;
    gap: 1.25rem;
    height: 100%;
`;

const RightSection = styled.div`
    width: 36.25rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const TopBar = styled.div`
    width: 100%;
    height: 5rem;
    background-color: transparent;
    border-radius: 0.25rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 1rem 1rem 1rem 0rem;
    box-sizing: border-box;
`;

const ProgressText = styled.span`
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.5);
`;

const ProgressBar = styled.div`
    width: 100%;
    height: 1.25rem;
    background: linear-gradient(
        180deg,
        rgba(150, 150, 150, 0.4) 0%,
        rgba(100, 100, 100, 0.6) 100%
    );
    border-radius: 0.625rem;
    position: relative;
    box-shadow: inset 0 0.1875rem 0.375rem rgba(0, 0, 0, 0.3),
        inset 0 -0.0625rem 0.125rem rgba(255, 255, 255, 0.1),
        0 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(0, 0, 0, 0.2);
    overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
    width: ${(props) => props.progress}%;
    height: 100%;
    background: radial-gradient(
            circle at top right,
            #9a87f2 0%,
            transparent 70%
        ),
        linear-gradient(
            253deg,
            #bee2f8 17.48%,
            #9de3fc 43.84%,
            #90c4fb 61%,
            #d0e5f6 94.06%
        );
    border-radius: 0.625rem;
    position: relative;
    box-shadow: 0 0.1875rem 0.375rem rgba(0, 0, 0, 0.3),
        inset 0 0.0625rem 0.125rem rgba(255, 255, 255, 0.4),
        inset 0 -0.0625rem 0.125rem rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: width 0.3s ease;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 60%;
        background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.5) 0%,
            rgba(255, 255, 255, 0.1) 100%
        );
        border-radius: 0.625rem 0.625rem 0 0;
    }

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.6) 50%,
            transparent 100%
        );
        border-radius: 0.625rem 0.625rem 0 0;
    }
`;

const MiddleRow = styled.div`
    width: 100%;
    height: 17rem;
    display: flex;
    gap: 1.25rem;
    margin-top: -20px;
`;

const MiddleBlock = styled.div`
    width: 17rem;
    height: 100%;
    background-color: rgba(234, 234, 234, 0.14);
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const InputBlock = styled.div`
    width: 97%;
    height: 8rem;
    border-radius: 0.25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    box-sizing: border-box;
    background-color: rgba(234, 234, 234, 0.14);
    border: 0.0625rem solid rgba(255, 255, 255, 0.2);
`;

const AvailableBunny = styled.div`
    color: #fbe3b2;
    font-size: 12px;
    font-weight: 600;
    text-align: right;
    text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.5);
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.4rem;
`;

const InputField = styled.input`
    flex: 1;
    height: 1.4rem;
    background-color: #ffffff;
    border: none;
    border-radius: 0.375rem;
    padding: 0 1rem;
    font-size: 14px;
    color: #000000;
    text-align: right;
    line-height: 1.4rem;
    box-shadow: inset 0.095625rem 0.095625rem 0.095625rem
            rgba(132, 132, 132, 0.25),
        inset 0 0.19125rem 0.19125rem rgba(0, 0, 0, 0.25);

    /* Hide number input spinner */
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &::placeholder {
        color: #999999;
    }

    &:focus {
        outline: none;
        box-shadow: inset 0.095625rem 0.095625rem 0.095625rem
                rgba(132, 132, 132, 0.25),
            inset 0 0.19125rem 0.19125rem rgba(0, 0, 0, 0.25);
    }
`;

const CurrencyLabel = styled.span`
    color: #cccccc;
    font-size: 14px;
    font-weight: 600;
    min-width: 2.5rem;
    text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.5);
`;

const MyAccount = styled.div`
    color: #ffffff;
    font-size: 12px;
    font-weight: 600;
    text-align: right;
    text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.5);
`;

const AgreeBlock = styled.div`
    width: 97%;
    height: 3rem;
    background-color: rgba(248, 248, 248, 0.4);
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    padding: 1rem;
    box-sizing: border-box;
`;

const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
`;

const CheckboxInput = styled.input`
    width: 1.25rem;
    height: 1.25rem;
    margin-top: 0.125rem;
    cursor: pointer;
    appearance: none;
    border: 0.125rem solid #f7d282;
    border-radius: 0.25rem;
    background: transparent;
    position: relative;
    transition: all 0.3s ease;

    &:checked {
        background: #fee2a7;
        border-color: #fee2a7;

        &::after {
            content: "✓";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #333;
            font-size: 14px;
            font-weight: bold;
        }
    }

    &:hover {
        border-color: #ffd700;
        box-shadow: 0 0 0 0.125rem rgba(254, 226, 167, 0.3);
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 0.1875rem rgba(254, 226, 167, 0.5);
    }
`;

const CheckboxLabel = styled.label`
    color: #ffffff;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.4;
    cursor: pointer;
    text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.5);
    flex: 1;
`;

const StyledButtonWrapper = styled.div`
    position: absolute;
    right: 1.8rem;
    bottom: 1.4rem;
    display: flex;
    gap: 0.75rem;
    align-items: center;
`;

const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`;

const LoadingText = styled.div`
    color: #ffffff;
    font-size: 18px;
    font-weight: 600;
    text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.5);
`;

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    gap: 1rem;
`;

const ErrorText = styled.div`
    color: #ff6b6b;
    font-size: 16px;
    font-weight: 600;
    text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.5);
    text-align: center;
`;

const AISummarySection = styled.div`
    border-radius: 0.75rem;
    padding: 1.5rem 1.25rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const SectionTitle = styled.h3`
    color: #fbc95e;
    font-size: 1rem;
    font-weight: 600;
    text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.5);
    margin: 0;
`;

const SummaryText = styled.p`
    color: #ffffff;
    font-size: 0.875rem;
    line-height: 1.4;
    margin: 0;
    text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.5);
    flex: 1;
    overflow-y: auto;
`;

export default FundBunnyModal;