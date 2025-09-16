'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Button from '../../../_shared/components/Button';
import TypeCard from '../_components/TypeCard';

interface CreateBunnyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateBunnyModal({ isOpen, onClose }: CreateBunnyModalProps) {
  const [bunnyName, setBunnyName] = useState('');
  const [selectedType, setSelectedType] = useState<'A' | 'B' | 'C'>('B');
  const [agreement1, setAgreement1] = useState(false);
  const [agreement2, setAgreement2] = useState(false);
  const [isCheckingDuplicate, setIsCheckingDuplicate] = useState(false);

  React.useEffect(() => {
    if (!isOpen) {
      setBunnyName('');
      setSelectedType('B');
      setAgreement1(false);
      setAgreement2(false);
      setIsCheckingDuplicate(false);
    }
  }, [!isOpen]);

  const marketCap = 100000000;

  const getTypeValues = (type: 'A' | 'B' | 'C') => {
    switch (type) {
      case 'A':
        return { issuance: 1000, unitPrice: 100000 };
      case 'B':
        return { issuance: 100000, unitPrice: 1000 };
      case 'C':
        return { issuance: 1000000, unitPrice: 100 };
      default:
        return { issuance: 100000, unitPrice: 1000 };
    }
  };

  const { issuance, unitPrice } = getTypeValues(selectedType);

  const isSubmitEnabled = agreement1 && agreement2;

  if (!isOpen) return null;

  const handleSubmit = () => {
    // 제출 로직 후에 services에 구현
  };

  const handleCheckDuplicate = async () => {
    if (!bunnyName.trim()) {
      alert('버니 이름을 입력해주세요.');
      return;
    }
    
    setIsCheckingDuplicate(true);
    try {
      // TODO: API 호출로 중복 체크 구현
      // const response = await checkBunnyNameDuplicate(bunnyName);
      // if (response.isDuplicate) {
      //   alert('이미 사용 중인 버니 이름입니다.');
      // } else {
      //   alert('사용 가능한 버니 이름입니다.');
      // }
      
      // 임시로 성공 메시지 표시
      setTimeout(() => {
        alert('사용 가능한 버니 이름입니다.');
        setIsCheckingDuplicate(false);
      }, 1000);
    } catch (error) {
      alert('중복 체크 중 오류가 발생했습니다.');
      setIsCheckingDuplicate(false);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Image src="/images/personal/publish/astronaut.png" alt="close" width={48} height={48} />
          <CloseButton onClick={onClose} >
            X
          </CloseButton>
        </ModalHeader>

        <FormContainer>
          {/* 버니 이름 섹션 */}
          <Section>
            <InputRow>
              <InputLabel>버니 이름</InputLabel>
              <InputWithButton>
                <NameInput
                  type="text"
                  value={bunnyName}
                  onChange={(e) => setBunnyName(e.target.value)}
                  placeholder="버니 이름을 입력하세요"
                />
                <CheckDuplicateButton 
                  onClick={handleCheckDuplicate}
                  disabled={isCheckingDuplicate}
                >
                  {isCheckingDuplicate ? '확인중...' : '중복체크'}
                </CheckDuplicateButton>
              </InputWithButton>
            </InputRow>
            <InputDescription>
              이름은 영어 소문자, 숫자, 하이픈(연속, 시작/끝 위치 불가)으로 이루어진 3~20 자리 이름만 가능합니다.
            </InputDescription>
          </Section>

          {/* 버니 타입 선택 섹션 */}
          <Section>
            <TypeCardsContainer>
              <TypeCard 
                type="A"
                isSelected={selectedType === 'A'}
                onClick={() => setSelectedType('A')}
              />
              <TypeCard 
                type="B"
                isSelected={selectedType === 'B'}
                onClick={() => setSelectedType('B')}
              />
              <TypeCard 
                type="C"
                isSelected={selectedType === 'C'}
                onClick={() => setSelectedType('C')}
              />
            </TypeCardsContainer>
          </Section>

          {/* 코인 상세 정보 섹션 */}
          <InfoSection>
            <InfoRow>
              <InfoLabel>시가 총액</InfoLabel>
              <InfoValueWithUnit>
                <InfoValue>{marketCap.toLocaleString()}</InfoValue>
                <InfoUnit>C</InfoUnit>
              </InfoValueWithUnit>
            </InfoRow>

            <InfoRow>
              <InfoLabel>발행량</InfoLabel>
              <InfoValueWithUnit>
                <InfoValue>{issuance.toLocaleString()}</InfoValue>
                <InfoUnit>BNY</InfoUnit>
              </InfoValueWithUnit>
            </InfoRow>

            <InfoRow>
              <InfoLabel>단가</InfoLabel>
              <InfoValueWithUnit>
                <InfoValue>{unitPrice.toLocaleString()}</InfoValue>
                <InfoUnit>C</InfoUnit>
              </InfoValueWithUnit>
            </InfoRow>
          </InfoSection>

          {/* 동의 사항 섹션 */}
          <AgreementSection>
            <AgreementItem>
              <Checkbox
                type="checkbox"
                checked={agreement1}
                onChange={(e) => setAgreement1(e.target.checked)}
              />
              <AgreementText>
                3일 내에 상장되지 못하면 자동으로 폐지되는 것에 동의합니다.
              </AgreementText>
            </AgreementItem>

            <AgreementItem>
              <Checkbox
                type="checkbox"
                checked={agreement2}
                onChange={(e) => setAgreement2(e.target.checked)}
              />
              <AgreementText>
                한번 상장된 코인은 정보를 임의로 변경/삭제 할 수 없음에 동의합니다.
              </AgreementText>
            </AgreementItem>
          </AgreementSection>

          {/* 제출 버튼 */}
          <ButtonContainer>
            <Button 
              onClick={handleSubmit}
              disabled={!isSubmitEnabled}
              variant="primary"
              size="medium"
              type="button"
            >
              상장심사 받기
            </Button>
          </ButtonContainer>
        </FormContainer>
      </ModalContent>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: rgba(3, 29, 49, 0.9);
  border-radius: 1.25rem;
  padding: 2.5rem;
  max-width: 50rem;
  width: 90%;
  max-height: 95vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 1.25rem 2.5rem rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.875rem;
`;

const CloseButton = styled.button`
  background: #FEE2A7;
  box-shadow: inset -0.125rem -0.25rem 0.625rem #FFC54A, inset 0.125rem 0.125rem 0.125rem #fffbf2, 0.125rem 0.0625rem 0.25rem rgba(254, 226, 167, 0.3);
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #FFA629;
  
  &:hover {
    background: #ffed4e;
    transform: scale(1.1);
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SectionTitle = styled.h2`
  color: #DEDCDC;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

const NameInput = styled.input`
  background: #ffffff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 0.9375rem;
  font-size: 16px;
  color: #333;
  flex: 1;
  
  &::placeholder {
    color: #999;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.125rem #ffd700;
  }
`;

const InputDescription = styled.p`
  color: #cccccc;
  font-size: 10px;
  margin: 0;
  line-height: 1.4;
  text-align: right;
`;

const TypeCardsContainer = styled.div`
  display: flex;
  gap: 1.25rem;
  justify-content: space-between;
  
  @media (max-width: 48rem) {
    flex-direction: column;
  }
`;


const InputRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
`;

const InputLabel = styled.label`
  color: #DEDCDC;
  text-shadow: 1.24px 1.24px 3.71px rgba(160, 160, 160, 1), 3.71px 3.71px 4.95px rgba(0, 0, 0, 0.25);
  font-size: 24px;
  font-weight: 700;
  min-width: 6.25rem;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 0.75rem 0;
  width: 100%;
  max-width: 25rem;
`;

const InfoLabel = styled.div`
  color: #DEDCDC;
  text-shadow: 1.24px 1.24px 3.71px rgba(160, 160, 160, 1), 3.71px 3.71px 4.95px rgba(0, 0, 0, 0.25);
  font-size: 20px;
  font-weight: 700;
  min-width: 6.25rem;
`;

const InfoValueWithUnit = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
`;

const InfoValue = styled.div`
  color: #FEE2A7;
  font-size: 24px;
  font-weight: 900;
`;

const InfoUnit = styled.div`
  color: #C9B281;
  font-size: 12px;
  font-weight: 700;
`;

const InputWithUnit = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  flex: 1;
`;

const InputWithButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
`;

const CheckDuplicateButton = styled.button`
  background: #FEE2A7;
  box-shadow: inset -0.125rem -0.25rem 0.625rem #FFC54A, inset 0.125rem 0.125rem 0.125rem #fffbf2, 0.125rem 0.0625rem 0.25rem rgba(254, 226, 167, 0.3);
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  color: #FFA629;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  min-width: 5rem;
  
  &:hover:not(:disabled) {
    background: #ffed4e;
    transform: translateY(-0.0625rem);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: inset 0.125rem 0.25rem 0.625rem #FFC54A, inset -0.125rem -0.125rem 0.125rem #fffbf2, 0.0625rem 0.03125rem 0.125rem rgba(254, 226, 167, 0.3);
  }
`;

const NumberInput = styled.input`
  background: #f5f5f5;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 0.9375rem;
  font-size: 16px;
  color: #666;
  flex: 1;
  
  &::placeholder {
    color: #999;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.125rem #ffd700;
  }
  
  &[readonly] {
    background: #f5f5f5;
    color: #666;
    cursor: not-allowed;
  }
`;

const UnitLabel = styled.span`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  min-width: 2.5rem;
`;

const AgreementSection = styled.div`
  background: #2a2a3e;
  border-radius: 0.9375rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;
`;

const AgreementItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const Checkbox = styled.input`
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.125rem;
  cursor: pointer;
  appearance: none;
  border: 0.125rem solid #FEE2A7;
  border-radius: 0.25rem;
  background: transparent;
  position: relative;
  transition: all 0.3s ease;
  
  &:checked {
    background: #FEE2A7;
    border-color: #FEE2A7;
    
    &::after {
      content: '✓';
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

const AgreementText = styled.span`
  color: #ffffff;
  font-size: 14px;
  line-height: 1.4;
  flex: 1;
`;

