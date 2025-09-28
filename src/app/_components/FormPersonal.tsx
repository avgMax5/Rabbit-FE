import styled from 'styled-components';
import Image from 'next/image';
import { User } from 'lucide-react';
import { useUserStore } from "@/app/_store/userStore";

export default function FormPersonal() {
    const { authActions } = useUserStore();
    
    return (
        <Container>
            <HeroSection>
                <HeroText>
                    실력 있는 개발자와 성장 가능성에 투자하는
                    <br />
                    모든 <HighlightText>개인</HighlightText>을 위한 회원 유형입니다.
                </HeroText>
                <ProfileImage
                    src="/images/login/personalProfile.png"
                    alt="Personal Profile"
                    width={436}
                    height={130}
                />
            </HeroSection>
            
            <FeatureCard>
                <FeatureHeader>
                    <FeatureIcon>
                        <User size={16} color="#374151" />
                    </FeatureIcon>
                    <FeatureTitle>이런 분들을 위한 서비스입니다</FeatureTitle>
                </FeatureHeader>
                <FeatureList>
                    <FeatureItem>
                        <NumberIcon>1</NumberIcon>
                        <FeatureText>개발자로서 자신을 홍보하고 싶은 사람</FeatureText>
                    </FeatureItem>
                    <FeatureItem>
                        <NumberIcon>2</NumberIcon>
                        <FeatureText>유망한 개발자를 발굴하고 투자하고자 하는 사람</FeatureText>
                    </FeatureItem>
                </FeatureList>
            </FeatureCard>

            <SocialLoginSection>
                <SocialLoginHeader>
                    <Divider />
                    <SocialLoginTitle>SNS 소셜 로그인</SocialLoginTitle>
                    <Divider />
                </SocialLoginHeader>
                <SocialButtonGrid>
                    <SocialButton type="google" onClick={() => authActions.login("google")}>
                        <Image src="/images/login/google.jpg" alt="Google" width={18} height={18} />
                    </SocialButton>
                    <SocialButton type="kakao" onClick={() => authActions.login("kakao")}>
                        <Image src="/images/login/kakao.png" alt="Kakao" width={18} height={18} />
                    </SocialButton>
                    <SocialButton type="naver" onClick={() => authActions.login("naver")}>
                        <Image src="/images/login/naver.png" alt="Naver" width={18} height={18} />
                    </SocialButton>
                    <SocialButton type="github" onClick={() => authActions.login("github")}>
                        <Image src="/images/login/github.png" alt="GitHub" width={18} height={18} />
                    </SocialButton>
                </SocialButtonGrid>
            </SocialLoginSection>
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
    
    &:hover {
        transform: scale(1.02);
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

// Social Login Section
const SocialLoginSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
    flex-shrink: 0;
`;

const SocialLoginHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
`;

const Divider = styled.div`
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, #d1d5db 50%, transparent 100%);
`;

const SocialLoginTitle = styled.div`
    font-size: 0.8rem;
    font-family: var(--font-nanum-square);
    font-weight: 500;
    color: #6b7280;
    white-space: nowrap;
`;

const SocialButtonGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    width: 100%;
    max-width: 200px;
`;

const SocialButton = styled.button<{ type: string }>`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid #e5e7eb;
    
    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    &:active {
        transform: translateY(0);
    }
    
    ${props => {
        switch (props.type) {
            case 'github':
                return `
                    background: #ffffff;
                    &:hover {
                        background: #f9fafb;
                    }
                `;
            case 'google':
                return `
                    background: #ffffff;
                    &:hover {
                        background: #f9fafb;
                    }
                `;
            case 'kakao':
                return `
                    background: #fddc3f;
                    &:hover {
                        background: #fbbf24;
                    }
                `;
            case 'naver':
                return `
                    background: #03c75a;
                    &:hover {
                        background: #059669;
                    }
                `;
        }
    }}
`;