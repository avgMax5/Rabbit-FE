import styled, { keyframes } from "styled-components";

const rocketDrift = keyframes`
    0%, 100% { transform: translate(0px, 0px); }
    25% { transform: translate(10px, -10px); }
    50% { transform: translate(-5px, -15px); }
    75% { transform: translate(-20px, -20px); }

`;

const rocketGlow = keyframes`
    0%, 100% { filter: drop-shadow(0 0 5px rgba(255, 107, 53, 0.3)); }
    50% { filter: drop-shadow(0 0 20px rgba(255, 107, 53, 0.8)); }
`;

export const Rocket = styled.img`
    position: absolute;
    top: -6rem;
    right: 0rem;
    z-index: 999;
    width: 33rem;
    height: auto;
    animation: ${rocketDrift} 6s ease-in-out infinite,
        ${rocketGlow} 2s ease-in-out infinite;
`;
