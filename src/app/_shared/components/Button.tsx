"use client";

import React from "react";
import styled from "styled-components";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    disabled?: boolean;
    variant?: "primary" | "secondary" | "danger";
    size?: "small" | "medium" | "large";
    type?: "button" | "submit" | "reset";
    className?: string;
}

export default function Button({
    children,
    onClick,
    onMouseEnter,
    onMouseLeave,
    disabled = false,
    variant = "primary",
    size = "medium",
    type = "button",
    className,
}: ButtonProps) {
    return (
        <StyledButton
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            disabled={disabled}
            variant={variant}
            size={size}
            type={type}
            className={className}
        >
            {children}
        </StyledButton>
    );
}

const StyledButton = styled.button.withConfig({
    shouldForwardProp: (prop) => !["variant", "size"].includes(prop),
})<{ variant: string; size: string }>`
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    ${(props) => {
        switch (props.size) {
            case "small":
                return `
          width: 100px;
          height: 32px;
          font-size: 14px;
          border-radius: 12px;
        `;
            case "large":
                return `
          width: 180px;
          height: 50px;
          font-size: 18px;
          border-radius: 20px;
        `;
            default: // medium
                return `
          width: 146px;
          height: 42px;
          font-size: 16px;
          border-radius: 16px;
        `;
        }
    }}

    /* Color variants */
  ${(props) => {
        switch (props.variant) {
            case "secondary":
                return `
          background: linear-gradient(135deg, #2a2a3e, #3a3a4e);
          color: #ffffff;
          border: 1px solid #555;
          box-shadow: inset -1.91px -3.83px 6.38px rgba(42, 42, 62, 0.8), inset 5.74px 3.83px 6.38px rgba(58, 58, 78, 0.8), 3px 3px 4px rgba(0, 0, 0, 0.3);
          text-shadow: 1.28px 1.28px 0.64px rgba(0, 0, 0, 0.25);
          
          &:hover:not(:disabled) {
            background: linear-gradient(135deg, #3a3a4e, #4a4a5e);
            transform: translateY(-2px);
            box-shadow: inset -1.91px -3.83px 6.38px rgba(58, 58, 78, 0.8), inset 5.74px 3.83px 6.38px rgba(74, 74, 94, 0.8), 5px 5px 8px rgba(0, 0, 0, 0.4);
          }
        `;
            case "danger":
                return `
          background-color: #FD6D6D;
          color: #ffffff;
          box-shadow: inset -1.91px -3.83px 6.38px rgba(236, 86, 86, 1), inset 5.74px 3.83px 6.38px rgba(255, 166, 166, 1), 2.55px 2.55px 3.83px rgba(251, 106, 106, 1);
          text-shadow: 1.28px 1.28px 0.64px rgba(0, 0, 0, 0.25);
          
          &:hover:not(:disabled) {
            background-color: #e55a5a;
            transform: translateY(-2px);
            box-shadow: inset -1.91px -3.83px 6.38px rgba(236, 86, 86, 1), inset 5.74px 3.83px 6.38px rgba(255, 166, 166, 1), 2.55px 2.55px 3.83px rgba(251, 106, 106, 1);
          }
        `;
            default:
                return `
          background-color: rgba(254, 226, 167, 0.88);
          color: #000;
          box-shadow: inset -1.91px -3.83px 6.38px rgba(255, 177, 14, 0.84), inset 5.74px 3.83px 6.38px #ffefce, 3px 3px 4px rgba(0, 32, 101, 0.64);
          text-shadow: 1.28px 1.28px 0.64px rgba(0, 0, 0, 0.25);
          
          &:hover:not(:disabled) {
            background-color: rgba(254, 208, 55, 0.95);
            transform: translateY(-2px);
            box-shadow: inset -1.91px -3.83px 6.38px rgba(255, 177, 14, 0.84), inset 5.74px 3.83px 6.38px #ffefce, 5px 5px 8px rgba(0, 32, 101, 0.7);
          }
        `;
        }
    }}
  
  &:active:not(:disabled) {
        transform: translateY(0);
    }

    &:disabled {
        background-color: rgba(102, 102, 102, 0.6);
        color: #ccc;
        cursor: not-allowed;
        opacity: 0.6;
        transform: none;
        box-shadow: inset -1.91px -3.83px 6.38px rgba(102, 102, 102, 0.3),
            inset 5.74px 3.83px 6.38px rgba(136, 136, 136, 0.3),
            3px 3px 4px rgba(0, 0, 0, 0.3);
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.3);
    }
`;
