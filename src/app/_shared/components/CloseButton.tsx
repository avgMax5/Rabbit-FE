import React from 'react';
import styled from 'styled-components';

interface CloseButtonProps {
  onClick: () => void;
  size?: number;
  color?: string;
  hoverColor?: string;
}

const CloseButton: React.FC<CloseButtonProps> = ({ 
  onClick, 
  size = 30, 
  color = '#ff4444', 
  hoverColor = '#ff6666' 
}) => {
  return (
    <StyledCloseButton 
      onClick={onClick}
      size={size}
      color={color}
      hoverColor={hoverColor}
    >
      ×
    </StyledCloseButton>
  );
};

const StyledCloseButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['size', 'color', 'hoverColor'].includes(prop),
})<{
  size: number;
  color: string;
  hoverColor: string;
}>`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: ${props => props.color};
  color: white;
  border: none;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.hoverColor};
  }
`;

export default CloseButton;
