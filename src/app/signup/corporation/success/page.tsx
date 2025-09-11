'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
  particles: {
    id: number;
    angle: number;
    distance: number;
  }[];
}

export default function SignupSuccess() {
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const router = useRouter();

  // 폭죽 색상 배열 (밝은 색 위주로 진한 배경에서 잘 보이도록)
  const colors = ['#ffffff', '#ffff00', '#00ffff', '#ff69b4', '#00ff00', '#ffa500', '#ff1493', '#00bfff'];
  
  // 폭죽 생성 함수
  const createFirework = () => {
    const newFirework = {
      id: Date.now() + Math.random(),
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      y: Math.random() * 300 + 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      particles: Array.from({ length: 8 }, (_, i) => ({
        id: i,
        angle: (i * 45) * (Math.PI / 180),
        distance: Math.random() * 80 + 40
      }))
    };
    
    setFireworks(prev => [...prev, newFirework]);
    
    // 2.5초 후 폭죽 제거
    setTimeout(() => {
      setFireworks(prev => prev.filter(fw => fw.id !== newFirework.id));
    }, 2500);
  };

  // 자동 폭죽 발사 (페이지 로드 시)
  useEffect(() => {
    // 초기 폭죽들 (성공 축하용)
    const initialFireworks = () => {
      setTimeout(() => createFirework(), 500);
      setTimeout(() => createFirework(), 1000);
      setTimeout(() => createFirework(), 1500);
      setTimeout(() => createFirework(), 2000);
    };
    
    initialFireworks();

    // 주기적으로 폭죽 발사
    const interval = setInterval(() => {
      if (Math.random() > 0) { // 70% 확률로 폭죽 발사
        createFirework();
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      {/* 폭죽 애니메이션 레이어 */}
      <FireworksContainer>
        <AnimatePresence>
          {fireworks.map((firework) => (
            <div key={firework.id}>
              {/* 발사체 애니메이션 */}
              <motion.div
                style={{
                  position: 'absolute',
                  width: '2px',
                  height: '15px',
                  backgroundColor: firework.color,
                  borderRadius: '50%',
                  left: firework.x,
                  top: '100vh'
                }}
                animate={{
                  y: [0, -(window.innerHeight - firework.y)],
                  opacity: [1, 0]
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut"
                }}
              />
              
              {/* 폭발 파티클들 */}
              {firework.particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  style={{
                    position: 'absolute',
                    width: '4px',
                    height: '4px',
                    backgroundColor: firework.color,
                    borderRadius: '50%',
                    left: firework.x,
                    top: firework.y,
                    boxShadow: `0 0 6px ${firework.color}`
                  }}
                  initial={{ 
                    scale: 0,
                    opacity: 0 
                  }}
                  animate={{
                    x: Math.cos(particle.angle) * particle.distance,
                    y: Math.sin(particle.angle) * particle.distance + 30,
                    scale: [0, 1, 0.3, 0],
                    opacity: [0, 1, 0.8, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 1.2,
                    ease: "easeOut"
                  }}
                />
              ))}
              
              {/* 중앙 폭발 효과 */}
              <motion.div
                style={{
                  position: 'absolute',
                  left: firework.x - 15,
                  top: firework.y - 15,
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${firework.color}60 0%, transparent 70%)`
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 2, 0.5, 0],
                  opacity: [0, 1, 0.6, 0]
                }}
                transition={{
                  duration: 1.2,
                  delay: 1.2,
                  ease: "easeOut"
                }}
              />
            </div>
          ))}
        </AnimatePresence>
      </FireworksContainer>

      <LogoImage
        src="/images/logo.png"
        alt="Rabbit Logo"
        width={200}
        height={60}
        quality={100}
      />

      <SuccessContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <SuccessTitle>Rabbit과 함께 도약을 시작하세요</SuccessTitle>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SuccessMessage>
            기업 계정 가입에 성공했습니다.
          </SuccessMessage>
          <SuccessMessage>
            로그인 후 Rabbit에서 제공하는 다양한 서비스를 이용하세요
          </SuccessMessage>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
           <SuccessButton
             onClick={() => {
               // 버튼 클릭 시 축하 폭죽 추가 발사
               createFirework();
               setTimeout(() => createFirework(), 200);
               // 메인 화면으로 라우팅
               router.push('/');
             }}
           >
             메인 화면으로
           </SuccessButton>
        </motion.div>
      </SuccessContainer>

      <BackgroundImage
        src="/images/login/background.png"
        alt="Background"
        width={450}
        height={450}
        quality={100}
      />
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const FireworksContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
`;

const LogoImage = styled(Image)`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 10;
  object-fit: contain;
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

const SuccessContainer = styled.div`
  background: rgba(255, 254, 254, 0.56);
  border-radius: 20px;
  padding: 60px 40px;
  text-align: center;
  max-width: 600px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  z-index: 5;
`;

const SuccessTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  font-family: 'nanum-square';
  margin-bottom: 20px;
  background: #fff;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SuccessMessage = styled.p`
  font-size: 1.1rem;
  color: #666;
  font-family: 'nanum-square';
  margin-bottom: 10px;
  
  &:last-of-type {
    margin-bottom: 40px;
  }
`;

const SuccessButton = styled.button`
  width: 200px;
  height: 50px;
  border: none;
  border-radius: 25px;
  background: #6787CE;
  color: white;
  font-family: 'nanum-square';
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }
`;