import styled from 'styled-components';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { useUserStore } from "@/app/_store/userStore";

export default function FormPersonal() {
    const { authActions } = useUserStore();
    
    return (
        <>
            <FormText>
                <FontHighlight>실력 있는 개발자와 성장 가능성에 투자하는</FontHighlight><br />
                모든<FontHighlight> 개인</FontHighlight>을 위한 회원 유형입니다.
            </FormText>
            <StyledImage
                src="/images/login/personalProfile.png"
                alt="Rabbit Logo"
                width={436}
                height={130}
            />
            
            <FeatureBox>
                <FeatureTitle>이런 기업을 원해요!</FeatureTitle>
                <FeatureList>
                    <FeatureItem>
                        <FeatureText><CheckIcon><Check color="#14ae5c" size={16} /></CheckIcon>개발자로서 자신을 홍보하고 싶은 사람</FeatureText>
                    </FeatureItem>
                    <FeatureItem>
                        <FeatureText><CheckIcon><Check color="#14ae5c" size={16} /></CheckIcon>유망한 개발자를 발굴하고 투자하고자 하는 사람</FeatureText>
                    </FeatureItem>
                </FeatureList>
            </FeatureBox>

            <SnsLogin>
                <SnsLoginTitle>
                    <Line></Line><SnsLoginText>SNS 소셜 로그인</SnsLoginText><Line></Line>
                </SnsLoginTitle>
                <SnsLoginButtonContainer>
                    <SnsLoginButton type="google" onClick={() => authActions.login("google")}>
                        <Image src="/images/login/google.jpg" alt="Google" width={30} height={30} />
                    </SnsLoginButton>
                    <SnsLoginButton type="kakao" onClick={() => authActions.login("kakao")}>
                        <Image src="/images/login/kakao.png" alt="Kakao" width={30} height={30} />
                    </SnsLoginButton>
                    <SnsLoginButton type="naver" onClick={() => authActions.login("naver")}>
                        <Image src="/images/login/naver.png" alt="Naver" width={30} height={30} />
                    </SnsLoginButton>
                    <SnsLoginButton type="github" onClick={() => authActions.login("github")}>
                        <Image src="/images/login/github.png" alt="GitHub" width={30} height={30} />
                    </SnsLoginButton>
                </SnsLoginButtonContainer>
            </SnsLogin>
        </>
    );
}

const FormText = styled.div`
    font-size: 1rem;
    color: #000000;
    font-family: 'nanum-square';
    font-weight: 400;
    text-align: center;
    margin-top: 40px;
`;

const StyledImage = styled(Image)`
    object-fit: contain;
    width: 123px;
    height: 123px;
    margin-top: 40px;
    opacity: 1;
`;

const FontHighlight = styled.span`
    font-size: 1rem;
    color: #000000;
    font-family: 'nanum-square';
    font-weight: 700;
`;

const FeatureBox = styled.div`
    width: 100%;
    max-width: 500px;
    position: relative;
    background-color: #B2D2FF;
    border-radius: 12px;
    padding: 5px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FeatureTitle = styled.h3`
    position: absolute;
    top: -12px;
    left: 10px;
    font-size: 1.1rem;
    font-weight: 700;
    color: #000000;
    font-family: 'nanum-square';
    margin: 0 0 15px 0;
    text-align: center;
`;

const FeatureList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

const FeatureItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const CheckIcon = styled.span`
    color: #14AE5C;
    font-weight: bold;
    font-size: 1rem;
    min-width: 20px;
`;

const FeatureText = styled.span`
    font-size: 1rem;
    color: #333;
    font-family: 'nanum-square';
    margin-top: 10px;
    font-weight: 400;
    line-height: 1.4;
`;

const SnsLogin = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    gap: 20px;
`;

const SnsLoginTitle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

const Line = styled.div`
    width: 100px;
    height: 1px;
    background-color: #412AEF;
`;

const SnsLoginText = styled.div`
    font-size: 12px;
    font-family: 'nanum-square';
    font-weight: 700;
    font-size: 1rem;
    color: #000000;
`;

const SnsLoginButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 40px;
`;

const SnsLoginButton = styled.div<{ type: string }>`
    width: 50px;
    height: 50px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s ease;
    
    &:hover {
        transform: scale(1.05);
    }
    
    ${props => {
        switch (props.type) {
            case 'github':
                return `
                    background-color: #ffffff;
                `;
            case 'google':
                return `
                    background-color: #ffffff;
                `;
            case 'kakao':
                return `
                    background-color: #FDDC3F;
                `;
            case 'naver':
                return `
                    background-color: #03C75A;
                `;
        }
    }}
`;