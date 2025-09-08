import styled from 'styled-components';
import Image from 'next/image';
import { Check, Mail, Lock } from 'lucide-react';

export default function FormCorporation() {
    return (
        <>
            <FormText>
                개발자의 능력치를 확인하고 채용하고자 하는<br />
                모든 기업을 위한 회원 유형입니다.
            </FormText>
            <ImageFormContainer>
                <StyledImage
                    src="/images/login/corporationProfile.png"
                    alt="Corporation Logo"
                    width={436}
                    height={130}
                />
                
                <LoginFormContainer>
                    <InputContainer>
                        <InputIcon>
                            <Mail size={20} color="#666" />
                        </InputIcon>
                        <LoginInput placeholder="아이디" isFirst={true} />
                    </InputContainer>
                    
                    <InputContainer>
                        <InputIcon>
                            <Lock size={20} color="#666" />
                        </InputIcon>
                        <LoginInput placeholder="비밀번호" type="password" isFirst={false} />
                    </InputContainer>
                </LoginFormContainer>
            </ImageFormContainer>
            
            <Signup>
                <SignupText>계정이 없으신가요?</SignupText>
                <SignupButton>회원가입</SignupButton>
            </Signup>
            
            <FeatureBox>
                <FeatureTitle>이런 기업을 원해요!</FeatureTitle>
                <FeatureList>
                    <FeatureItem>
                        <FeatureText><CheckIcon><Check color="#14ae5c" size={16} /></CheckIcon>필요한 인재를 찾고싶은 기업</FeatureText>
                    </FeatureItem>
                    <FeatureItem>
                        <FeatureText><CheckIcon><Check color="#14ae5c" size={16} /></CheckIcon>개발자에게 편하게 커피챗을 요청 하고싶은 기업</FeatureText>
                    </FeatureItem>
                </FeatureList>
            </FeatureBox>

            <StartButton>시작하기</StartButton>
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

const ImageFormContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 30px;
    margin-top: 20px;
`;

const StyledImage = styled(Image)`
    object-fit: contain;
    width: 123px;
    height: 123px;
    opacity: 1;
    border-radius: 10px;
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

const LoginFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const InputContainer = styled.div`
    position: relative;
    width: 288px;
    height: 60px;
`;

const InputIcon = styled.div`
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
`;

const LoginInput = styled.input.withConfig({
    shouldForwardProp: (prop) => prop !== 'isFirst',
})<{ isFirst?: boolean }>`
    width: 100%;
    height: 100%;
    border: none;
    border-radius: ${props => props.isFirst ? '15px 15px 0 0' : '0 0 15px 15px'};
    background-color: #ffffff;
    padding: 0 50px 0 50px;
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

const Signup = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 5px;
    margin-top: 20px;
    margin-right: 20px;
`;

const SignupText = styled.span`
    font-size: 0.9rem;
    color: #697077;
    font-family: 'nanum-square';
    font-weight: 400;
`;

const SignupButton = styled.button`
    background: none;
    border: none;
    color: #7F90D9;
    font-family: 'nanum-square';
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    text-decoration: underline;
    
    &:hover {
        color: #2a1a9e;
    }
`;

const StartButton = styled.button`
    width: 180px;
    height: 38px;
    border: none;
    border-radius: 18px;
    background: #6787CE;
    color: #ffffff;
    font-family: 'nanum-square';
    font-weight: 600;
    font-size: 1.1rem;
    cursor: pointer;
    margin-top: 30px;
    transition: all 0.3s ease;
    box-shadow: inset -2px -4px 6px #6787ce, inset 6px 4px 6px #B7CEFF, 4px 4px 10px rgba(130, 164, 238, 0.64);
    &:hover {
        transform: translateY(-2px);
    }
`;