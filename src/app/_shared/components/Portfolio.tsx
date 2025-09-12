import React from 'react';
import styled from 'styled-components';

const Portfolio: React.FC = () => {
  return (
    <LeftSection>
      <LeftGridContainer>
        <BasicProfileColumn>
          <ProfileSection>
            <ProfileImagePlaceholder />
            <UserInfo>
              <Nickname>good-relation</Nickname>
              <RealName>황호연</RealName>
            </UserInfo>
          </ProfileSection>

          <AISummarySection>
            <SectionTitle>AI 요약</SectionTitle>
            <SummaryText>안녕 난 대단한 AI, 지금 부터 요약을 시작하지</SummaryText>
          </AISummarySection>

          <ContactSection>
            <ContactItem>
              <ContactLabel>Phone</ContactLabel>
              <ContactValue>010-1234-5678</ContactValue>
            </ContactItem>
            <ContactItem>
              <ContactLabel>Email</ContactLabel>
              <ContactValue>qweasd12@gmail.com</ContactValue>
            </ContactItem>
            <ContactItem>
              <ContactLabel>Link</ContactLabel>
              <SocialIcons>
                <SocialImage src="/images/personal/publish/github.png" alt="GitHub" />
                <SocialImage src="/images/personal/publish/instagram.png" alt="Instagram" />
                <SocialImage src="/images/personal/publish/velog.png" alt="Velog" />
                <SocialImage src="/images/personal/publish/youtube.png" alt="YouTube" />
              </SocialIcons>
            </ContactItem>
          </ContactSection>
        </BasicProfileColumn>

        <DetailedProfileColumn>
          <ExperienceSection>
            <SectionHeader>
              <SectionImage src="/images/personal/publish/company.png" alt="경력" />
              <SectionTitle>경력</SectionTitle>
              <SectionLine />
            </SectionHeader>
            <ExperienceItem>
              <ExperiencePeriod>2025 - 2030</ExperiencePeriod>
              <ExperienceName>신한은행</ExperienceName>
            </ExperienceItem>
            <ExperienceItem>
              <ExperiencePeriod>2030 ~</ExperiencePeriod>
              <ExperienceName>신한DS</ExperienceName>
            </ExperienceItem>
          </ExperienceSection>

          <EducationSection>
            <SectionHeader>
              <SectionImage src="/images/personal/publish/education.png" alt="학력" />
              <SectionTitle>학력</SectionTitle>
              <SectionLine />
            </SectionHeader>
            <EducationItem>
              <EducationPeriod>2016 - 2018</EducationPeriod>
              <EducationName>신한고등학교</EducationName>
            </EducationItem>
            <EducationItem>
              <EducationPeriod>2019 - 2024</EducationPeriod>
              <EducationName>신한대학교 컴퓨터공학 전공</EducationName>
            </EducationItem>
          </EducationSection>

          <CertificationSection>
            <SectionHeader>
              <SectionImage src="/images/personal/publish/certification.png" alt="자격증" />
              <SectionTitle>자격증</SectionTitle>
              <SectionLine />
            </SectionHeader>
            <CertificationItem>
              <CertificationDate>2023.03.04</CertificationDate>
              <CertificationName>정보처리기사</CertificationName>
            </CertificationItem>
            <CertificationItem>
              <CertificationDate>2023.03.04</CertificationDate>
              <CertificationName>SQLD</CertificationName>
            </CertificationItem>
          </CertificationSection>

          <TechStackSection>
            <SectionHeader>
              <SectionImage src="/images/personal/publish/stack.png" alt="기술스택" />
              <SectionTitle>기술스택</SectionTitle>
              <SectionLine />
            </SectionHeader>
            <TechStackGrid>
              <TechItem>React</TechItem>
              <TechItem>TypeScript</TechItem>
              <TechItem>Node.js</TechItem>
              <TechItem>Python</TechItem>
              <TechItem>Java</TechItem>
              <TechItem>MySQL</TechItem>
            </TechStackGrid>
          </TechStackSection>
        </DetailedProfileColumn>
      </LeftGridContainer>
    </LeftSection>
  );
};

const LeftSection = styled.div`
  width: 36.25rem;
  height: 100%;
  border-radius: 0.25rem;
  padding: 1.5rem;
  box-sizing: border-box;
  overflow-y: auto;
`;

const LeftGridContainer = styled.div`
  display: flex;
  gap: 1rem;
  height: 100%;
  background-color: rgba(248, 248, 248, 0.1);
  border-radius: 0.25rem;
  padding: 2rem;
`;

const BasicProfileColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: rgba(248, 248, 248, 0.1);
`;

const DetailedProfileColumn = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem 1rem;
  border-radius: 0.75rem;
`;

const ProfileImagePlaceholder = styled.div`
  width: 6rem;
  height: 6rem;
  background-color: rgba(200, 200, 200, 0.3);
  border-radius: 0.5rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 1.25rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const Nickname = styled.div`
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.5);
`;

const RealName = styled.div`
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.5);
`;

const AISummarySection = styled.div`
  border-radius: 0.75rem;
  padding: 1.5rem 1.25rem;
  margin: 1rem 0;
`;

const SectionTitle = styled.h3`
  color: #FBC95E;
  font-size: 1rem;
  font-weight: 600;
  text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.5);
`;

const SummaryText = styled.p`
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.4;
  margin: 0;
  text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.5);
`;

const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 0.75rem;
  padding: 1.5rem 1.25rem;
  margin: 1rem 0;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
`;

const ContactLabel = styled.span`
  color: #cccccc;
  font-size: 0.875rem;
  font-weight: 500;
  min-width: 3rem;
  text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.5);
`;

const ContactValue = styled.span`
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 500;
  text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.5);
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SocialImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  object-fit: contain;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const EducationSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ExperienceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CertificationSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const SectionImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  object-fit: contain;
`;

const SectionLine = styled.div`
  flex: 1;
  height: 1px;
  background-color: #FBC95E;
  margin-left: 0.5rem;
`;

const EducationItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-left: 1.5rem;
`;

const EducationPeriod = styled.span`
  color: #FFE1A3;
  font-size: 0.75rem;
  font-weight: 500;
  text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.5);
`;

const EducationName = styled.span`
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 500;
  text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.5);
`;

const ExperienceItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-left: 1.5rem;
`;

const ExperiencePeriod = styled.span`
  color: #cccccc;
  font-size: 0.75rem;
  font-weight: 500;
  color: #FFE1A3;
  text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.5);
`;

const ExperienceName = styled.span`
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 500;
  text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.5);
`;

const CertificationItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-left: 1.5rem;
`;

const CertificationDate = styled.span`
  color: #FFE1A3;
  font-size: 0.75rem;
  font-weight: 500;
  text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.5);
`;

const CertificationName = styled.span`
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 500;
  text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.5);
`;

const TechStackSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const TechStackGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  padding-left: 1.5rem;
`;

const TechItem = styled.div`
  background-color: rgba(255, 225, 163, 0.2);
  color: #FFE1A3;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  text-align: center;
  border: 1px solid rgba(255, 225, 163, 0.3);
  text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.5);
`;

export default Portfolio;
