import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import Button from '../../../_shared/components/Button';
import FundingRate from '../_components/FundingRate';
import Portfolio from '../../../_shared/components/Portfolio';

interface FundBunnyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FundBunnyModal: React.FC<FundBunnyModalProps> = ({ isOpen, onClose }) => {
  const [isAgreed, setIsAgreed] = useState(false);

  if (!isOpen) return null;

  const modalContent = (
    <ModalOverlay>
      <Wrapper>
        <Container>
          <GridContainer>
            <Portfolio />
            <RightSection>
              <TopBar>
                <ProgressText>펀딩 진행률: 65%</ProgressText>
                <ProgressBar>
                  <ProgressFill progress={65} />
                </ProgressBar>
              </TopBar>

               {/* Middle Row */}
               <MiddleRow>
                 <MiddleBlock>
                   <FundingRate />
                 </MiddleBlock>
                 <MiddleBlock />
               </MiddleRow>

              {/* Input Block */}
              <InputBlock>
                <AvailableBunny>투자 가능한 버니 수: 100 BNY</AvailableBunny>
                <InputContainer>
                  <InputField type="number"/>
                  <CurrencyLabel>BNY</CurrencyLabel>
                </InputContainer>
                <InputContainer>
                  <InputField type="number" />
                  <CurrencyLabel>CRT</CurrencyLabel>
                </InputContainer>
                <MyAccount>내 계좌: 110,000 BNY (233,000,000 C)</MyAccount>
              </InputBlock>

              {/* Agreement Block */}
              <AgreeBlock>
                <CheckboxContainer>
                  <CheckboxInput
                    type="checkbox"
                    id="agreement"
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                  />
                  <CheckboxLabel htmlFor="agreement">
                    코인은 상장되거나 폐지되기 전에는 환불할 수 없음을 확인하고 이에 동의합니다.
                  </CheckboxLabel>
                </CheckboxContainer>
              </AgreeBlock>
            </RightSection>
          </GridContainer>
          
           <StyledButtonWrapper>
             <Button onClick={onClose} variant="danger" size="large">
               취소하기
             </Button>
             <Button 
               variant="primary" 
               size="large"
               disabled={!isAgreed}
             >
               펀딩 참여하기
             </Button>
           </StyledButtonWrapper>
        </Container>
      </Wrapper>
    </ModalOverlay>
  );

  return createPortal(modalContent, document.body);
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
  background-color: rgba(3, 29, 49, 0.9);
  padding: 1.25rem;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 0.5rem;
`;

const Container = styled.div`
  width: 75rem;
  height: 50rem;
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
  gap: 1.25rem;
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
  padding: 1rem;
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
  background: linear-gradient(180deg, rgba(150, 150, 150, 0.4) 0%, rgba(100, 100, 100, 0.6) 100%);
  border-radius: 0.625rem;
  position: relative;
  box-shadow: 
    inset 0 0.1875rem 0.375rem rgba(0, 0, 0, 0.3),
    inset 0 -0.0625rem 0.125rem rgba(255, 255, 255, 0.1),
    0 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  width: ${props => props.progress}%;
  height: 100%;
  background: linear-gradient(180deg, #FFE1A3 0%, #F4C430 50%, #E6B800 100%);
  border-radius: 0.625rem;
  position: relative;
  box-shadow: 
    0 0.1875rem 0.375rem rgba(0, 0, 0, 0.3),
    inset 0 0.0625rem 0.125rem rgba(255, 255, 255, 0.4),
    inset 0 -0.0625rem 0.125rem rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: width 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 60%;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.1) 100%);
    border-radius: 0.625rem 0.625rem 0 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%);
    border-radius: 0.625rem 0.625rem 0 0;
  }
`;

const MiddleRow = styled.div`
  width: 100%;
  height: 17.5rem;
  display: flex;
  gap: 1.25rem;
`;

const MiddleBlock = styled.div`
  width: 17.5rem;
  height: 100%;
  background-color: rgba(234, 234, 234, 0.14);
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputBlock = styled.div`
  width: 100%;
  height: 12.5rem;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  box-sizing: border-box;
  background-color: rgba(234, 234, 234, 0.14);
  border: 0.0625rem solid rgba(255, 255, 255, 0.2);
`;

const AvailableBunny = styled.div`
  color: #FBE3B2;
  font-size: 14px;
  font-weight: 600;
  text-align: right;
  text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.5);
  text-decoration: underline;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const InputField = styled.input`
  flex: 1;
  height: 2.5rem;
  background-color: #ffffff;
  border: none;
  border-radius: 0.375rem;
  padding: 0 1rem;
  font-size: 16px;
  color: #000000;
  text-align: right;
  box-shadow: inset 0.095625rem 0.095625rem 0.095625rem rgba(132, 132, 132, 0.25), inset 0 0.19125rem 0.19125rem rgba(0, 0, 0, 0.25);
  
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
    box-shadow: inset 0.095625rem 0.095625rem 0.095625rem rgba(132, 132, 132, 0.25), inset 0 0.19125rem 0.19125rem rgba(0, 0, 0, 0.25);
  }
`;

const CurrencyLabel = styled.span`
  color: #cccccc;
  font-size: 18px;
  font-weight: 600;
  min-width: 2.5rem;
  text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.5);
`;

const MyAccount = styled.div`
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  text-align: right;
  text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.5);
`;

const AgreeBlock = styled.div`
  width: 100%;
  height: 5rem;
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
  accent-color: #FFE1A3;
  cursor: pointer;
  
  &:checked {
    background-color: #FFE1A3;
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
  bottom: 1.875rem;
  right: 1.875rem;
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;


export default FundBunnyModal;