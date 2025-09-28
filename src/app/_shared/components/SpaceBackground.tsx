'use client';

import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

interface SpaceBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

const SpaceBackground: React.FC<SpaceBackgroundProps> = ({ children, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 별과 은하수 파티클 배열
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      twinkleSpeed: number;
      twinklePhase: number;
      twinkleType: 'normal' | 'slow' | 'fast' | 'random';
      lifeCycle: number; // 0~1 사이의 생명주기
      lifeSpeed: number; // 생명주기 변화 속도
      maxOpacity: number; // 최대 투명도
      isVisible: boolean; // 현재 보이는지 여부
      isFloating: boolean; // 떠다니는 별인지 여부
      velocityX: number; // X축 이동 속도
      velocityY: number; // Y축 이동 속도
      originalX: number; // 원래 X 위치
      originalY: number; // 원래 Y 위치
      isShooting: boolean; // 별똥별인지 여부
      shootingProgress: number; // 별똥별 진행도 (0~1)
      shootingSpeed: number; // 별똥별 속도
      trailLength: number; // 별똥별 꼬리 길이
    }> = [];

    const galaxies: Array<{
      x: number;
      y: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
    }> = [];

    // 별 생성
    for (let i = 0; i < 120; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const twinkleTypes: Array<'normal' | 'slow' | 'fast' | 'random'> = ['normal', 'slow', 'fast', 'random'];
      const isFloating = Math.random() < 0.3; // 30%는 떠다니는 별
      const isShooting = Math.random() < 0.03; // 3%는 별똥별 (더 자주 보이도록)
      
      stars.push({
        x,
        y,
        size: Math.random() * 2 + 0.5,
        opacity: 0,
        twinkleSpeed: Math.random() * 0.003 + 0.001,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleType: twinkleTypes[Math.floor(Math.random() * twinkleTypes.length)],
        lifeCycle: Math.random(), // 랜덤한 생명주기 시작점
        lifeSpeed: Math.random() * 0.008 + 0.002, // 생명주기 변화 속도
        maxOpacity: Math.random() * 0.8 + 0.4,
        isVisible: Math.random() > 0.5, // 50% 확률로 시작 시 보임
        isFloating,
        velocityX: isFloating ? (Math.random() - 0.5) * 0.3 : 0, // 떠다니는 별만 X축 이동
        velocityY: isFloating ? (Math.random() - 0.5) * 0.3 : 0, // 떠다니는 별만 Y축 이동
        originalX: x,
        originalY: y,
        isShooting,
        shootingProgress: isShooting ? 0 : 1, // 별똥별은 0에서 시작, 일반별은 1로 설정
        shootingSpeed: isShooting ? Math.random() * 0.005 + 0.003 : 0, // 별똥별 속도 (더 느리게)
        trailLength: isShooting ? Math.random() * 30 + 20 : 0, // 별똥별 꼬리 길이
      });
    }

    // 은하수 생성
    for (let i = 0; i < 3; i++) {
      galaxies.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 200 + 100,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: Math.random() * 0.005 + 0.002,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 별 그리기
      stars.forEach((star) => {
        // 별똥별 처리
        if (star.isShooting) {
          star.shootingProgress += star.shootingSpeed;
          
          // 별똥별이 화면을 벗어나면 재시작
          if (star.shootingProgress > 1) {
            star.shootingProgress = 0;
            // 화면 어디서든 시작
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * canvas.height;
            star.originalX = star.x;
            star.originalY = star.y;
          }
          
          // 별똥별 위치 계산 (우측상단에서 좌측하단으로 짧게 이동)
          const startX = star.originalX;
          const startY = star.originalY;
          const endX = startX - 200; // 좌측으로 200px
          const endY = startY + 200; // 하단으로 200px
          
          star.x = startX + (endX - startX) * star.shootingProgress;
          star.y = startY + (endY - startY) * star.shootingProgress;
        } else {
          // 일반 별의 생명주기 업데이트
          star.lifeCycle += star.lifeSpeed;
          
          // 생명주기가 1을 넘으면 리셋
          if (star.lifeCycle > 1) {
            star.lifeCycle = 0;
            star.isVisible = Math.random() > 0.3; // 70% 확률로 다시 나타남
            
            // 떠다니는 별의 경우 위치와 속도 재설정
            if (star.isFloating) {
              star.x = Math.random() * canvas.width;
              star.y = Math.random() * canvas.height;
              star.originalX = star.x;
              star.originalY = star.y;
              star.velocityX = (Math.random() - 0.5) * 0.3;
              star.velocityY = (Math.random() - 0.5) * 0.3;
            }
          }
        }
        
        // 떠다니는 별의 위치 업데이트 (별똥별이 아닌 경우만)
        if (star.isFloating && star.isVisible && !star.isShooting) {
          star.x += star.velocityX;
          star.y += star.velocityY;
          
          // 화면 경계를 벗어나면 반대편으로 이동
          if (star.x < 0) star.x = canvas.width;
          if (star.x > canvas.width) star.x = 0;
          if (star.y < 0) star.y = canvas.height;
          if (star.y > canvas.height) star.y = 0;
        }
        
        // 별똥별 그리기
        if (star.isShooting) {
          // 별똥별 꼬리 그리기
          const trailOpacity = 1 - star.shootingProgress;
          const trailSteps = 8;
          
          for (let i = 0; i < trailSteps; i++) {
            const stepProgress = (star.shootingProgress - (i * 0.03));
            if (stepProgress < 0) continue;
            
            const stepX = star.originalX + (star.x - star.originalX) * stepProgress;
            const stepY = star.originalY + (star.y - star.originalY) * stepProgress;
            const stepOpacity = trailOpacity * (1 - i / trailSteps) * 0.8;
            
            ctx.save();
            ctx.globalAlpha = stepOpacity;
            ctx.fillStyle = '#ffffff';
            ctx.shadowBlur = star.size * 2;
            ctx.shadowColor = '#ffffff';
            
            ctx.beginPath();
            ctx.arc(stepX, stepY, star.size * 0.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
          
          // 별똥별 본체 그리기
          ctx.save();
          ctx.globalAlpha = trailOpacity * 0.9;
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = star.size * 3;
          ctx.shadowColor = '#ffffff';
          
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          // 일반 별 그리기
          // 반짝임 효과
          star.twinklePhase += star.twinkleSpeed;
          let twinkle: number;
          
          switch (star.twinkleType) {
            case 'slow':
              twinkle = Math.sin(star.twinklePhase * 0.2) * 0.5 + 0.5;
              break;
            case 'fast':
              twinkle = Math.sin(star.twinklePhase * 0.6) * 0.5 + 0.5;
              break;
            case 'random':
              twinkle = Math.random() > 0.9 ? Math.sin(star.twinklePhase * 0.4) * 0.5 + 0.5 : 0.3;
              break;
            default: // normal
              twinkle = Math.sin(star.twinklePhase * 0.3) * 0.5 + 0.5;
          }
          
          // 생명주기에 따른 투명도 계산 (부드러운 페이드 인/아웃)
          let lifeOpacity: number;
          if (star.lifeCycle < 0.2) {
            // 나타나는 단계 (0~0.2)
            lifeOpacity = star.lifeCycle / 0.2;
          } else if (star.lifeCycle < 0.8) {
            // 유지 단계 (0.2~0.8)
            lifeOpacity = 1;
          } else {
            // 사라지는 단계 (0.8~1.0)
            lifeOpacity = (1 - star.lifeCycle) / 0.2;
          }
          
          // 최종 투명도 계산
          const currentOpacity = star.isVisible ? 
            star.maxOpacity * lifeOpacity * (0.3 + twinkle * 0.7) : 0;

          // 투명도가 너무 낮으면 그리지 않음
          if (currentOpacity < 0.05) {
            return;
          }

          ctx.save();
          ctx.globalAlpha = currentOpacity;
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = star.size * 2;
          ctx.shadowColor = '#ffffff';

          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <SpaceContainer className={className}>
      <GradientBackground />
      <StarCanvas ref={canvasRef} />
      {children}
    </SpaceContainer>
  );
};


const SpaceContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const GradientBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background:
    radial-gradient(ellipse at top left, rgba(0, 0, 70, 0.3) 0%, rgba(28, 181, 224, 0.2) 40%, rgba(0, 0, 70, 0.4) 70%),
    radial-gradient(ellipse at bottom right, rgba(28, 181, 224, 0.2) 0%, rgba(0, 0, 70, 0.3) 25%, rgba(0, 0, 37, 0.5) 50%),
    linear-gradient(135deg, #000046 0%,rgb(148, 111, 208) 20%,rgb(28, 100, 224) 40%,rgb(23, 28, 83) 60%,rgb(0, 0, 23) 80%,rgb(4, 1, 24) 100%);
  animation: auroraFlow 12s ease-in-out infinite;
  
  @keyframes auroraFlow {
    0% {
      filter: saturate(1) brightness(1) contrast(1);
      transform: scale(1) rotate(0deg);
    }
    25% {
      filter: saturate(1.1) brightness(1.05) contrast(1.05);
      transform: scale(1.02) rotate(1deg);
    }
    50% {
      filter: saturate(1.2) brightness(1.1) contrast(1.1);
      transform: scale(1.05) rotate(0deg);
    }
    75% {
      filter: saturate(1.1) brightness(1.05) contrast(1.05);
      transform: scale(1.02) rotate(-1deg);
    }
    100% {
      filter: saturate(1) brightness(1) contrast(1);
      transform: scale(1) rotate(0deg);
    }
  }
`;

const StarCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
`;

export default SpaceBackground;
