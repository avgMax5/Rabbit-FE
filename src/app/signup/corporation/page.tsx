'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { Mail, Lock, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Input from './components/Input';

export default function CorporationSignup() {
  const router = useRouter();

  const handleSignup = () => {
    alert('회원가입이 완료되었습니다.');
    router.push('/corporation');
  };

  return (
    <Container>
      <LogoImage
        src="/images/logo.png"
        alt="Rabbit Logo"
        width={200}
        height={60}
        quality={100}
      />
      <FormContainer>
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
            <SearchButton>조회</SearchButton>
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
          <Input placeholder="비밀번호를 입력해주세요" type="password" />
        </FormSection>

        <FormSection>
          <Label>비밀번호 확인</Label>
          <Input placeholder="비밀번호를 다시 입력해주세요" type="password" />
        </FormSection>

        
        <SignupButton onClick={handleSignup}>시작하기</SignupButton>
      </FormContainer>
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
  padding: 20px;
  position: relative;
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

const FormContainer = styled.div`
  background-color: #FFFEFE;
  opacity: 0.56;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  font-family: 'nanum-square';
  text-align: center;
  margin-bottom: 30px;
`;

const FormSection = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  color: #333;
  font-family: 'nanum-square';
  font-weight: 600;
  margin-bottom: 8px;
`;

const BusinessNumberContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const SearchButton = styled.button`
  height: 50px;
  width: 80px;
  padding: 0 20px;
  background: #6787CE;
  color: white;
  border: none;
  border-radius: 10px;
  font-family: 'nanum-square';
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #5a7bc7;
  }
`;


const InputContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  background-color: #ff0000;
  opacity: 0.86;
  border-radius: 15px;
  box-shadow: inset 3px 3px 3px rgba(250, 252, 255, 0.6), inset -3px -3px 4px rgba(157, 172, 193, 1), 3px 3px 4px rgba(26, 102, 203, 0.43);
`;

const InputIcon = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

const InputLabel = styled.span`
  font-size: 12px;
  color: #666;
  font-family: 'nanum-square';
  font-weight: 900;
  white-space: nowrap;
`;

const LoginInput = styled.input.withConfig({
  shouldForwardProp: (prop) => prop !== 'isFirst',
})<{ isFirst?: boolean }>`
  width: 100%;
  height: 100%;
  border: none;
  right: 10px;
  border-radius: ${props => props.isFirst ? '15px 15px 0 0' : '0 0 15px 15px'};
  background-color: #ffffff;
  padding: 10px 50px 0 60px;
  font-size: 1rem;
  font-family: 'nanum-square';
  color: #333;
  box-sizing: border-box;
  outline: none;
  border-bottom: ${props => props.isFirst ? '1px solid #e0e0e0' : 'none'};
  
  &::placeholder {
    color: #999;
  }
`;

const SignupButton = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 18px;
  background: #6787CE;
  color: #000;
  font-family: 'nanum-square';
  font-weight: 900;
  font-size: 16px;
  cursor: pointer;
  margin-top: 30px;
  transition: all 0.3s ease;
  box-shadow: inset -2px -4px 6px #6787ce, inset 6px 4px 6px #B7CEFF, 4px 4px 10px rgba(130, 164, 238, 0.64);
  
  &:hover {
    transform: translateY(-2px);
  }
`;
