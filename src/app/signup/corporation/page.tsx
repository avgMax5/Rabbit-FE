'use client';

import { motion } from 'framer-motion';
import styled from 'styled-components';
import Image from 'next/image';
import { Mail, Lock, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Input from './components/Input';
import { SpaceBackground } from '../../_shared/components';

export default function CorporationSignup() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSearchClick = () => {
    alert('사업자등록번호가 확인되었습니다.');
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (confirmPassword && value !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (password && value !== password) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError('');
    }
  };

  const handleSignupClick = () => {
    if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }
    alert('회원가입이 완료되었습니다.');
    router.push('/');
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <SpaceBackground>
      <Container>
        <LogoImage
          src="/images/logo.png"
          alt="Rabbit Logo"
          width={200}
          height={60}
          quality={100}
          onClick={handleLogoClick}
        />
        <FormContainer
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Title>기업 회원가입</Title>
          
          <FormSection>
            <Label>사업자등록번호</Label>
            <BusinessNumberContainer>
              <Input 
                placeholder="-제외 10자리" 
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
              />
              <SearchButton onClick={handleSearchClick}>조회</SearchButton>
            </BusinessNumberContainer>
          </FormSection>

          <FormSection>
            <Label>기업명</Label>
            <Input placeholder="기업명을 입력해주세요" />
          </FormSection>

          <FormSection>
            <Label>회사 이메일(ID)</Label>
            <Input placeholder="이메일을 입력해주세요" type="email" inputMode="email" />
          </FormSection>

          <FormSection>
            <Label>비밀번호</Label>
            <Input 
              placeholder="비밀번호를 입력해주세요" 
              type="password" 
              value={password}
              onChange={handlePasswordChange}
            />
          </FormSection>

          <FormSection>
            <Label>비밀번호 확인</Label>
            <Input 
              placeholder="비밀번호를 다시 입력해주세요" 
              type="password" 
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
          </FormSection>

          
          <SignupButton onClick={handleSignupClick}>시작하기</SignupButton>
        </FormContainer>
        
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
      </Container>
    </SpaceBackground>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  z-index: 10;
`;

const LogoImage = styled(Image)`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 15;
  object-fit: contain;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const FormContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 48px;
  width: 100%;
  max-width: 520px;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
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
  width: 350px;
  height: 350px;
  left: -100px;
  bottom: -225px;
  object-fit: cover;
`;

const RocketImage = styled(motion.img)`
  position: absolute;
  width: 150px;
  height: 150px;
  left: 50px;
  bottom: 25px;
  object-fit: cover;
`;

const Bunny1Image = styled(motion.img)`
  position: absolute;
  width: 60px;
  height: 60px;
  left: 200px;
  bottom: 125px;
  object-fit: cover;
`;

const Bunny2Image = styled(motion.img)`
  position: absolute;
  width: 40px;
  height: 40px;
  left: 50px;
  bottom: 125px;
  object-fit: cover;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  font-family: 'nanum-square';
  text-align: center;
  margin-bottom: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const FormSection = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.95rem;
  color: #374151;
  font-family: 'nanum-square';
  font-weight: 600;
  margin-bottom: 10px;
`;

const BusinessNumberContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const SearchButton = styled.button`
  height: 56px;
  width: 90px;
  padding: 0 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-family: 'nanum-square';
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    inset 4px 4px 8px rgba(255, 255, 255, 0.5),
    inset -4px -4px 8px rgba(0, 0, 0, 0.4),
    0 4px 15px rgba(102, 126, 234, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      inset 4px 4px 8px rgba(255, 255, 255, 0.6),
      inset -4px -4px 8px rgba(0, 0, 0, 0.5),
      0 6px 20px rgba(102, 126, 234, 0.4);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 
      inset 4px 4px 8px rgba(255, 255, 255, 0.3),
      inset -4px -4px 8px rgba(0, 0, 0, 0.6),
      0 2px 8px rgba(102, 126, 234, 0.3);
  }
`;

const SignupButton = styled.button`
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-family: 'nanum-square';
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 32px;
  transition: all 0.3s ease;
  box-shadow: 
    inset 5px 5px 10px rgba(255, 255, 255, 0.5),
    inset -5px -5px 10px rgba(0, 0, 0, 0.4),
    0 8px 25px rgba(102, 126, 234, 0.3);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 
      inset 5px 5px 10px rgba(255, 255, 255, 0.6),
      inset -5px -5px 10px rgba(0, 0, 0, 0.5),
      0 12px 35px rgba(102, 126, 234, 0.4);
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 
      inset 5px 5px 10px rgba(255, 255, 255, 0.3),
      inset -5px -5px 10px rgba(0, 0, 0, 0.6),
      0 4px 15px rgba(102, 126, 234, 0.3);
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.85rem;
  font-family: 'nanum-square';
  font-weight: 500;
  margin-top: 8px;
  padding-left: 4px;
`;
