'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterTop>
          <LogoSection>
            <LogoImage
              src="/images/logo.png"
              alt="Rabbit Logo"
              width={120}
              height={40}
            />
            <Slogan>개발자의 가치, Rabbit과 같이</Slogan>
          </LogoSection>
        </FooterTop>
        
        <FooterBottom>
          <Copyright>
            © 2025 Rabbit. All rights reserved.
          </Copyright>
          
          <SocialLinks>
            <SocialLink 
              href="https://www.youtube.com/@rabbit-dev" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <Image
                src="/images/favicon/youtube.svg"
                alt="YouTube"
                width={24}
                height={24}
              />
            </SocialLink>
            <SocialLink 
              href="https://github.com/avgMax5/Rabbit-FE" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Image
                src="/images/favicon/github.svg"
                alt="GitHub"
                width={24}
                height={24}
              />
            </SocialLink>
            <SocialLink 
              href="https://www.notion.so/27cc4f6364d08085a032cee662ed4aaf" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Notion"
            >
              <Image
                src="/images/favicon/notion.svg"
                alt="Notion"
                width={24}
                height={24}
              />
            </SocialLink>
          </SocialLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  width: 100%;
  background: transparent;
  margin-top: auto;
  position: relative;
  z-index: 10;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 40px 30px;
  
  @media (max-width: 768px) {
    padding: 40px 20px 20px;
  }
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
    margin-bottom: 30px;
  }
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LogoImage = styled(Image)`
  filter: brightness(0) invert(1);
  opacity: 0.9;
`;

const Slogan = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 400;
  margin: 0;
  letter-spacing: 0.5px;
`;

const LinksSection = styled.div`
  display: flex;
  gap: 60px;
  
  @media (max-width: 768px) {
    gap: 40px;
    flex-wrap: wrap;
  }
  
  @media (max-width: 480px) {
    gap: 30px;
  }
`;

const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LinkTitle = styled.h3`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  letter-spacing: 0.5px;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LinkItem = styled.a`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  font-weight: 400;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    color: rgba(124, 176, 243, 0.9);
    transform: translateX(4px);
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  font-weight: 400;
  margin: 0;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(124, 176, 243, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(124, 176, 243, 0.3);
  }
  
  img {
    filter: brightness(0.8);
    transition: opacity 0.3s ease;
  }
  
  &:hover img {
    opacity: 1;
  }
`;

export default Footer;
