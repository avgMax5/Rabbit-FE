import styled from "styled-components";

import React, { ReactNode } from "react";

interface GlassBoxProps {
    children?: ReactNode;
}

function GlassBox({ children }: GlassBoxProps) {
    return <Div>{children}</Div>;
}

const Div = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background-color: #f0f8ff87;
    box-shadow: -2px -2px 4px 0 rgba(0, 0, 0, 0.14) inset,
        2px 2px 4px 0 rgba(231, 231, 231, 0.25) inset;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25));
`;

export default GlassBox;
