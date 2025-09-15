'use client';

import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Image from 'next/image';
import { useHomeAnimation } from './_hooks/useHomeAnimation';
import Intro from './_components/Intro';
import Form from './_components/Form';
import LogoSlogan from './_components/LogoSlogan';

export default function Home() {
  const { showLogo, showHomeText } = useHomeAnimation();

  return (
    <Container>
      <AnimatePresence>
        {showLogo && <Intro />}
      </AnimatePresence>

      <AnimatePresence>
        {showHomeText && (
          <HomeComponent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          > 
            <LogoSlogan
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            />
            <Form
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            />
            <BackgroundImage
              src="/images/login/background.png"
              alt="Background"
              width={400}
              height={400}
              quality={100}
            />
          </HomeComponent>
        )}
      </AnimatePresence>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
`;


const HomeComponent = styled(motion.div)`
  display: flex;
  flex-direction: row;
  gap: 147px;
  position: relative;
`;

const BackgroundImage = styled(Image)`
  position: fixed;
  width: 450px;
  height: 450px;
  left: 0;
  bottom: 0;
  z-index: -1;
  object-fit: cover;
`;