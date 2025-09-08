'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styled from 'styled-components';

export default function LogoSlogan() {
  return (
    <ContentWrapper
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* 로고 */}
      <LogoContainer
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <StyledImage
          src="/images/logo.png"
          alt="Rabbit Logo"
          width={436}
          height={130}
          priority
        />
      </LogoContainer>

      {/* 문구 */}
      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      >
        개발자들의 가치,{' '}
        <HighlightText
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Rabbit과 같이
        </HighlightText>
      </Title>
    </ContentWrapper>
  );
}

const ContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoContainer = styled(motion.div)`
  position: relative;
`;

const StyledImage = styled(Image)`
  object-fit: contain;
  width: 100%;
  height: 100%;

`;

const Title = styled(motion.h1)`
  font-size: 2rem;
  font-weight: 500;
  color: white;
  text-align: center;
  line-height: 1.6;
  margin: 0;
  white-space: nowrap;
`;

const HighlightText = styled(motion.span)`
  font-weight: 600;
`;
