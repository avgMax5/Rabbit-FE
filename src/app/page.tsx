'use client';

import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Image from 'next/image';
import { useHomeAnimation } from './_hooks/useHomeAnimation';
import Intro from './_components/Intro';
import Form from './_components/Form';
import LogoSlogan from './_components/LogoSlogan';
import { SpaceBackground } from './_shared/components';

export default function Home() {
  const { showLogo, showHomeText } = useHomeAnimation();

  return (
    <SpaceBackground>
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
              <AnimatedBackground>
                <EarthImage
                  src="/images/login/earth5.png"
                  alt="Earth"
                  width={2000}
                  height={2000}
                  quality={100}
                />
                <RocketImage
                  src="/images/login/rocket.png"
                  alt="Rocket"
                  width={300}
                  height={300}
                  animate={{
                    y: [-10, 10, -10],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <Bunny1Image
                  src="/images/login/bunny1.png"
                  alt="Bunny 1"
                  width={120}
                  height={120}
                  animate={{
                    y: [-8, 8, -8],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
                <Bunny2Image
                  src="/images/login/bunny2.png"
                  alt="Bunny 2"
                  width={80}
                  height={80}
                  animate={{
                    y: [-6, 6, -6],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </AnimatedBackground>
            </HomeComponent>
          )}
        </AnimatePresence>
      </Container>
    </SpaceBackground>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
`;


const HomeComponent = styled(motion.div)`
  display: flex;
  flex-direction: row;
  gap: 147px;
  position: relative;
`;

const AnimatedBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 5;
  pointer-events: none;
`;

const EarthImage = styled(Image)`
  position: absolute;
  width: 700px;
  height: 700px;
  left: -200px;
  bottom: -450px;
  object-fit: cover;
`;

const RocketImage = styled(motion.img)`
  position: absolute;
  width: 300px;
  height: 300px;
  left: 100px;
  bottom: 50px;
  object-fit: cover;
`;

const Bunny1Image = styled(motion.img)`
  position: absolute;
  width: 120px;
  height: 120px;
  left: 400px;
  bottom: 250px;
  object-fit: cover;
`;

const Bunny2Image = styled(motion.img)`
  position: absolute;
  width: 80px;
  height: 80px;
  left: 100px;
  bottom: 250px;
  object-fit: cover;
`;