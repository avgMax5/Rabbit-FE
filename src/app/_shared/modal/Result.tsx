'use client';

import React from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import CloseButton from '../components/CloseButton';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  title: string;
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
  showCloseButton?: boolean;
}

export default function ResultModal({
  isOpen,
  onClose,
  type,
  title,
  message,
  buttonText = '확인',
  onButtonClick,
  showCloseButton = true
}: ResultModalProps) {
  if (!isOpen) return null;

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleBackdropClick}>
      <ModalContainer type={type}>
        {showCloseButton && (
          <CloseButton 
            onClick={onClose} 
            size={24}
            color="#999"
            hoverColor="#666"
          />
        )}
        
        <ModalContent>
          <IconContainer type={type}>
            {type === 'success' ? (
              <SuccessIcon>✓</SuccessIcon>
            ) : (
              <ErrorIcon>✕</ErrorIcon>
            )}
          </IconContainer>
          
          <Title type={type}>{title}</Title>
          <Message>{message}</Message>
          
          <ButtonContainer>
            <Button
              variant={type === 'success' ? 'primary' : 'danger'}
              size="medium"
              onClick={handleButtonClick}
            >
              {buttonText}
            </Button>
          </ButtonContainer>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'type',
})<{ type: 'success' | 'error' }>`
  position: relative;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 20px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  max-width: 400px;
  width: 90%;
  max-height: 90vh;
  overflow: hidden;
  animation: modalSlideIn 0.3s ease-out;

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const ModalContent = styled.div`
  padding: 40px 30px 30px;
  text-align: center;
`;

const IconContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'type',
})<{ type: 'success' | 'error' }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  background: ${props => 
    props.type === 'success' 
      ? 'linear-gradient(135deg, #4CAF50, #45a049)' 
      : 'linear-gradient(135deg, #f44336, #d32f2f)'
  };
  box-shadow: 0 8px 16px ${props => 
    props.type === 'success' 
      ? 'rgba(76, 175, 80, 0.3)' 
      : 'rgba(244, 67, 54, 0.3)'
  };
`;

const SuccessIcon = styled.div`
  color: white;
  font-size: 40px;
  font-weight: bold;
  animation: successPulse 0.6s ease-out;
  
  @keyframes successPulse {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const ErrorIcon = styled.div`
  color: white;
  font-size: 40px;
  font-weight: bold;
  animation: errorShake 0.6s ease-out;
  
  @keyframes errorShake {
    0%, 100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    75% {
      transform: translateX(5px);
    }
  }
`;

const Title = styled.h2.withConfig({
  shouldForwardProp: (prop) => prop !== 'type',
})<{ type: 'success' | 'error' }>`
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.type === 'success' ? '#4CAF50' : '#f44336'};
  margin-bottom: 16px;
  line-height: 1.4;
`;

const Message = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
  white-space: pre-line;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;
