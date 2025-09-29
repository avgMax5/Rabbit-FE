'use client';

import React from 'react';
import styled from 'styled-components';
import Button from '../components/Button';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  title: string;
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
  showCloseButton?: boolean;
  blurIntensity?: 'light' | 'normal';
}

export default function ResultModal({
  isOpen,
  onClose,
  type,
  title,
  message,
  buttonText = '확인',
  onButtonClick,
  showCloseButton = true,
  blurIntensity = 'normal'
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
    <ModalOverlay onClick={handleBackdropClick} blurIntensity={blurIntensity}>
      <ModalContainer type={type}>
        {showCloseButton && (
          <CloseButtonContainer>
            <CloseButton onClick={onClose}>
              X
            </CloseButton>
          </CloseButtonContainer>
        )}
        
        <ModalContent>
          <IconContainer type={type}>
            <RabbitIcon type={type}>
              🐰
            </RabbitIcon>
            <StatusIcon type={type}>
              {type === 'success' ? '✨' : '⚠️'}
            </StatusIcon>
          </IconContainer>
          
          <Title type={type}>{title}</Title>
          <Message>{message}</Message>
          
          <ButtonContainer>
            <StyledButton
              variant={type === 'success' ? 'primary' : 'danger'}
              size="medium"
              onClick={handleButtonClick}
              type={type}
            >
              {buttonText}
            </StyledButton>
          </ButtonContainer>
        </ModalContent>
        
        {/* 우주적 장식 요소들 */}
        <CosmicElement className="star-1">⭐</CosmicElement>
        <CosmicElement className="star-2">✦</CosmicElement>
        <CosmicElement className="planet-1">🪐</CosmicElement>
        <CosmicElement className="rocket">🚀</CosmicElement>
        
        {/* 우주 배경 효과 */}
        <StarField>
          <Star className="twinkle-1" />
          <Star className="twinkle-2" />
          <Star className="twinkle-3" />
          <Star className="twinkle-4" />
          <Star className="twinkle-5" />
        </StarField>
      </ModalContainer>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'blurIntensity',
})<{ blurIntensity: 'light' | 'normal' }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => 
    props.blurIntensity === 'light' 
      ? 'radial-gradient(ellipse at center, rgba(30, 41, 59, 0.1) 0%, rgba(15, 23, 42, 0.2) 40%, rgba(0, 0, 0, 0.3) 100%)'
      : 'radial-gradient(ellipse at center, rgba(30, 41, 59, 0.3) 0%, rgba(15, 23, 42, 0.6) 40%, rgba(0, 0, 0, 0.8) 100%)'
  };
  backdrop-filter: ${props => 
    props.blurIntensity === 'light' ? 'blur(6px)' : 'blur(12px)'
  };
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: cosmicFadeIn 0.4s ease-out;

  @keyframes cosmicFadeIn {
    from { 
      opacity: 0; 
      transform: scale(0.95);
    }
    to { 
      opacity: 1; 
      transform: scale(1);
    }
  }
`;

const ModalContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'type',
})<{ type: 'success' | 'error' }>`
  position: relative;
  background: ${props => 
    props.type === 'success' 
      ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 58, 138, 0.9) 30%, rgba(67, 56, 202, 0.85) 100%)'
      : 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(127, 29, 29, 0.9) 30%, rgba(153, 27, 27, 0.85) 100%)'
  };
  border: 1px solid ${props => 
    props.type === 'success' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(239, 68, 68, 0.3)'
  };
  border-radius: 24px;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.4),
    0 0 100px ${props => 
      props.type === 'success' 
        ? 'rgba(59, 130, 246, 0.1)' 
        : 'rgba(239, 68, 68, 0.1)'
    },
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  max-width: 420px;
  width: 90%;
  max-height: 90vh;
  overflow: hidden;
  animation: modalSpaceEntry 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);

  @keyframes modalSpaceEntry {
    0% {
      opacity: 0;
      transform: translateY(-100px) scale(0.7) rotateX(-15deg);
    }
    60% {
      transform: translateY(10px) scale(1.02) rotateX(2deg);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1) rotateX(0deg);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => 
      props.type === 'success' 
        ? 'linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent, rgba(147, 51, 234, 0.1))'
        : 'linear-gradient(45deg, transparent, rgba(239, 68, 68, 0.1), transparent, rgba(245, 158, 11, 0.1))'
    };
    border-radius: 24px;
    animation: auroraBorealis 4s ease-in-out infinite;
  }

  @keyframes auroraBorealis {
    0%, 100% { opacity: 0.3; transform: translateX(-10px); }
    25% { opacity: 0.8; transform: translateX(5px); }
    50% { opacity: 0.5; transform: translateX(-5px); }
    75% { opacity: 0.7; transform: translateX(10px); }
  }
`;

const CloseButtonContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
`;

const CloseButton = styled.button`
  background: #fee2a7;
  box-shadow: inset -0.125rem -0.25rem 0.625rem #ffc54a,
      inset 0.125rem 0.125rem 0.125rem #fffbf2,
      0.125rem 0.0625rem 0.25rem rgba(254, 226, 167, 0.3);
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #ffa629;
  font-weight: 800;

  &:hover {
    background: #ffed4e;
    transform: scale(1.1);
  }
`;

const ModalContent = styled.div`
  padding: 50px 35px 35px;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const IconContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'type',
})<{ type: 'success' | 'error' }>`
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 24px;
  background: ${props => 
    props.type === 'success' 
      ? 'radial-gradient(circle, rgba(59, 130, 246, 0.2), rgba(30, 58, 138, 0.1))'
      : 'radial-gradient(circle, rgba(239, 68, 68, 0.2), rgba(127, 29, 29, 0.1))'
  };
  border: 2px solid ${props => 
    props.type === 'success' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(239, 68, 68, 0.3)'
  };
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 8px 32px ${props => 
      props.type === 'success' 
        ? 'rgba(59, 130, 246, 0.3)' 
        : 'rgba(239, 68, 68, 0.3)'
    },
    inset 0 2px 8px rgba(255, 255, 255, 0.1);
  animation: spaceFloat 4s ease-in-out infinite;

  @keyframes spaceFloat {
    0%, 100% { 
      transform: translateY(0px) rotateZ(0deg); 
      box-shadow: 0 8px 32px ${props => 
        props.type === 'success' 
          ? 'rgba(59, 130, 246, 0.3)' 
          : 'rgba(239, 68, 68, 0.3)'
      };
    }
    50% { 
      transform: translateY(-12px) rotateZ(2deg); 
      box-shadow: 0 16px 48px ${props => 
        props.type === 'success' 
          ? 'rgba(59, 130, 246, 0.4)' 
          : 'rgba(239, 68, 68, 0.4)'
      };
    }
  }
`;

const RabbitIcon = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'type',
})<{ type: 'success' | 'error' }>`
  font-size: 48px;
  animation: ${props => 
    props.type === 'success' ? 'rabbitLaunch' : 'rabbitAlert'
  } 0.8s ease-out;
  filter: drop-shadow(0 4px 16px rgba(59, 130, 246, 0.3));

  @keyframes rabbitLaunch {
    0% { transform: scale(0) rotateY(-180deg); }
    60% { transform: scale(1.2) rotateY(20deg); }
    100% { transform: scale(1) rotateY(0deg); }
  }

  @keyframes rabbitAlert {
    0% { transform: scale(0.8) rotateZ(-10deg); }
    30% { transform: scale(1.1) rotateZ(5deg); }
    60% { transform: scale(0.95) rotateZ(-2deg); }
    100% { transform: scale(1) rotateZ(0deg); }
  }
`;

const StatusIcon = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'type',
})<{ type: 'success' | 'error' }>`
  position: absolute;
  bottom: -8px;
  right: -8px;
  font-size: 20px;
  background: rgba(15, 23, 42, 0.8);
  border: 2px solid ${props => 
    props.type === 'success' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(239, 68, 68, 0.5)'
  };
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  animation: statusOrbit 3s ease-in-out infinite;

  @keyframes statusOrbit {
    0% { transform: scale(1) rotateZ(0deg); }
    25% { transform: scale(1.1) rotateZ(90deg); }
    50% { transform: scale(0.9) rotateZ(180deg); }
    75% { transform: scale(1.05) rotateZ(270deg); }
    100% { transform: scale(1) rotateZ(360deg); }
  }
`;

const Title = styled.h2.withConfig({
  shouldForwardProp: (prop) => prop !== 'type',
})<{ type: 'success' | 'error' }>`
  font-size: 22px;
  font-weight: 700;
  background: ${props => 
    props.type === 'success' 
      ? 'linear-gradient(135deg, #60a5fa, #a78bfa, #06b6d4)'
      : 'linear-gradient(135deg, #f87171, #fbbf24, #a78bfa)'
  };
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
  line-height: 1.4;
  text-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
  animation: titleGlow 2s ease-in-out infinite;

  @keyframes titleGlow {
    0%, 100% { filter: brightness(1); }
    50% { filter: brightness(1.2); }
  }
`;

const Message = styled.p`
  font-size: 16px;
  color: rgba(226, 232, 240, 0.8);
  line-height: 1.7;
  margin-bottom: 32px;
  white-space: pre-line;
  font-weight: 500;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled(Button).withConfig({
  shouldForwardProp: (prop) => prop !== 'type',
})<{ type: 'success' | 'error' }>`
  background: ${props => 
    props.type === 'success' 
      ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8))'
      : 'linear-gradient(135deg, rgba(239, 68, 68, 0.8), rgba(245, 158, 11, 0.8))'
  };
  border: 1px solid ${props => 
    props.type === 'success' ? 'rgba(59, 130, 246, 0.4)' : 'rgba(239, 68, 68, 0.4)'
  };
  padding: 12px 32px;
  border-radius: 20px;
  color: white;
  font-weight: 600;
  font-size: 15px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  box-shadow: 
    0 4px 16px ${props => 
      props.type === 'success' 
        ? 'rgba(59, 130, 246, 0.3)' 
        : 'rgba(239, 68, 68, 0.3)'
    },
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 
      0 8px 32px ${props => 
        props.type === 'success' 
          ? 'rgba(59, 130, 246, 0.4)' 
          : 'rgba(239, 68, 68, 0.4)'
      },
      inset 0 1px 0 rgba(255, 255, 255, 0.3);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
  }
`;

const CosmicElement = styled.div`
  position: absolute;
  font-size: 18px;
  opacity: 0.6;
  pointer-events: none;
  animation: cosmicDrift 8s ease-in-out infinite;

  &.star-1 {
    top: 15%;
    left: 15%;
    animation-delay: -2s;
    font-size: 14px;
  }

  &.star-2 {
    top: 25%;
    right: 20%;
    animation-delay: -4s;
    font-size: 16px;
  }

  &.planet-1 {
    bottom: 20%;
    left: 10%;
    animation-delay: -6s;
    font-size: 20px;
  }

  &.rocket {
    bottom: 15%;
    right: 15%;
    animation-delay: -1s;
    font-size: 16px;
  }

  @keyframes cosmicDrift {
    0%, 100% { 
      transform: translateY(0px) rotateZ(0deg); 
      opacity: 0.4;
    }
    25% { 
      transform: translateY(-15px) rotateZ(5deg); 
      opacity: 0.8;
    }
    50% { 
      transform: translateY(-8px) rotateZ(-3deg); 
      opacity: 0.6;
    }
    75% { 
      transform: translateY(-20px) rotateZ(8deg); 
      opacity: 0.9;
    }
  }
`;

const StarField = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
`;

const Star = styled.div`
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: twinkle 3s ease-in-out infinite;

  &.twinkle-1 {
    top: 20%;
    left: 30%;
    animation-delay: -0.5s;
  }

  &.twinkle-2 {
    top: 40%;
    right: 25%;
    animation-delay: -1.5s;
  }

  &.twinkle-3 {
    bottom: 30%;
    left: 20%;
    animation-delay: -2.5s;
  }

  &.twinkle-4 {
    top: 60%;
    left: 70%;
    animation-delay: -1s;
  }

  &.twinkle-5 {
    bottom: 40%;
    right: 30%;
    animation-delay: -2s;
  }

  @keyframes twinkle {
    0%, 100% { 
      opacity: 0.3; 
      transform: scale(1); 
    }
    50% { 
      opacity: 1; 
      transform: scale(1.5); 
    }
  }
`;