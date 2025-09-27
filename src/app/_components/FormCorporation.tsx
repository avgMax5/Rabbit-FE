import styled from 'styled-components';
import Image from 'next/image';
import { Mail, Lock, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FormCorporation() {
    const router = useRouter();

    const handleSignupClick = () => {
        router.push('/signup/corporation');
    };

    const handleStartClick = () => {
        router.push('/corporation');
    };

    return (
        <Container>
            <HeroSection>
                <HeroText>
                    개발자의 능력치를 확인하고 채용하고자 하는
                    <br />
                    모든 <HighlightText>기업</HighlightText>을 위한 회원 유형입니다.
                </HeroText>
            </HeroSection>

            <ImageFormSection>
                <ProfileImage
                    src="/images/login/corporationProfile.png"
                    alt="Corporation Profile"
                    width={436}
                    height={130}
                />
                
                <LoginFormContainer>
                    <InputContainer>
                        <InputIcon>
                            <Mail size={16} color="#6b7280" />
                        </InputIcon>
                        <LoginInput placeholder="이메일을 입력하세요" />
                    </InputContainer>
                    
                    <InputContainer>
                        <InputIcon>
                            <Lock size={16} color="#6b7280" />
                        </InputIcon>
                        <LoginInput placeholder="비밀번호를 입력하세요" type="password" />
                    </InputContainer>
                </LoginFormContainer>
            </ImageFormSection>
            
            <SignupSection>
                <SignupText>계정이 없으신가요?</SignupText>
                <SignupButton onClick={handleSignupClick}>회원가입</SignupButton>
            </SignupSection>
            
            <FeatureCard>
                <FeatureHeader>
                    <FeatureIcon>
                        <Building2 size={16} color="#374151" />
                    </FeatureIcon>
                    <FeatureTitle>이런 기업을 위한 서비스입니다</FeatureTitle>
                </FeatureHeader>
                <FeatureList>
                    <FeatureItem>
                        <NumberIcon>1</NumberIcon>
                        <FeatureText>필요한 인재를 찾고싶은 기업</FeatureText>
                    </FeatureItem>
                    <FeatureItem>
                        <NumberIcon>2</NumberIcon>
                        <FeatureText>개발자에게 편하게 커피챗을 요청 하고싶은 기업</FeatureText>
                    </FeatureItem>
                </FeatureList>
            </FeatureCard>

            <StartButton onClick={handleStartClick}>시작하기</StartButton>
        </Container>
    );
}

// Container
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    padding: 1rem 1.5rem;
    width: 100%;
    max-width: 550px;
    margin: 0 auto;
    height: 100%;
    overflow: hidden;
`;

// Hero Section
const HeroSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
    flex-shrink: 0;
`;

const HeroText = styled.div`
    font-size: 0.95rem;
    color: #374151;
    font-family: var(--font-nanum-square);
    font-weight: 400;
    line-height: 1.5;
    max-width: 500px;
`;

const HighlightText = styled.span`
    font-size: 0.95rem;
    color: #1f2937;
    font-family: var(--font-nanum-square);
    font-weight: 600;
`;

const ProfileImage = styled(Image)`
    object-fit: contain;
    width: 100px;
    height: 100px;
    transition: transform 0.2s ease;
    border-radius: 10px;
    
    &:hover {
        transform: scale(1.02);
    }
`;

// Image Form Section
const ImageFormSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    width: 100%;
    flex-shrink: 0;
`;

const LoginFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    max-width: 200px;
`;

const InputContainer = styled.div`
    position: relative;
    width: 100%;
    height: 44px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    display: flex;
    align-items: center;
    transition: all 0.2s ease;
    
    &:focus-within {
        border-color: #6366f1;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
`;

const InputIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 100%;
    flex-shrink: 0;
`;

const LoginInput = styled.input`
    flex: 1;
    height: 100%;
    border: none;
    background: transparent;
    padding: 0 12px 0 0;
    font-size: 0.9rem;
    font-family: var(--font-nanum-square);
    color: #374151;
    outline: none;
    
    &::placeholder {
        color: #9ca3af;
    }
`;

const SignupSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    flex-shrink: 0;
`;

const SignupText = styled.span`
    font-size: 0.8rem;
    color: #6b7280;
    font-family: var(--font-nanum-square);
    font-weight: 400;
`;

const SignupButton = styled.button`
    background: none;
    border: none;
    color: #6366f1;
    font-family: var(--font-nanum-square);
    font-weight: 600;
    font-size: 0.8rem;
    cursor: pointer;
    text-decoration: underline;
    transition: color 0.2s ease;
    
    &:hover {
        color: #4f46e5;
    }
`;

// Feature Card
const FeatureCard = styled.div`
    width: 100%;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 1rem;
    position: relative;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
`;

const FeatureHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
`;

const FeatureIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: #f3f4f6;
    border-radius: 6px;
`;

const FeatureTitle = styled.h3`
    font-size: 0.9rem;
    font-weight: 600;
    color: #374151;
    font-family: var(--font-nanum-square);
    margin: 0;
`;

const FeatureList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const FeatureItem = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.4rem;
    background: #f9fafb;
    border-radius: 8px;
    transition: all 0.2s ease;
    
    &:hover {
        background: #f3f4f6;
    }
`;

const NumberIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    background: #374151;
    color: #ffffff;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 2px;
    font-size: 0.75rem;
    font-weight: 600;
    font-family: var(--font-nanum-square);
`;

const FeatureText = styled.span`
    font-size: 0.85rem;
    color: #4b5563;
    font-family: var(--font-nanum-square);
    font-weight: 400;
    line-height: 1.4;
`;

// Start Button
const StartButton = styled.button`
    width: 100%;
    max-width: 200px;
    height: 40px;
    border: none;
    border-radius: 10px;
    background: linear-gradient(135deg, #000046 0%,rgb(19, 19, 78) 50%,rgb(76, 76, 105) 100%);
    color: #ffffff;
    font-family: var(--font-nanum-square);
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
    box-shadow: 
        inset 2px 2px 4px rgba(255, 255, 255, 0.3),
        inset -2px -2px 4px rgba(0, 0, 0, 0.4),
        0 4px 8px rgba(0, 0, 0, 0.2);
    
    &:hover {
        background: linear-gradient(135deg,rgb(6, 6, 101) 0%,rgb(30, 30, 116) 50%,rgb(96, 96, 131) 100%);
        transform: translateY(-1px);
        box-shadow: 
            inset 2px 2px 4px rgba(255, 255, 255, 0.4),
            inset -2px -2px 4px rgba(0, 0, 0, 0.5),
            0 6px 12px rgba(0, 0, 0, 0.3);
    }
    
    &:active {
        transform: translateY(0);
        box-shadow: 
            inset 2px 2px 4px rgba(255, 255, 255, 0.2),
            inset -2px -2px 4px rgba(0, 0, 0, 0.6),
            0 2px 4px rgba(0, 0, 0, 0.2);
    }
`;