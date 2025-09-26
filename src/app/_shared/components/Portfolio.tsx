import React from 'react';
import styled from 'styled-components';
import { FundBunnyDetail } from '../../_api/fundingAPI';
import { getLinkIcon } from '../../personal/trade/utils/bunnyInfoMapper';

interface PortfolioProps {
  bunnyDetail?: FundBunnyDetail | null;
}

const Portfolio: React.FC<PortfolioProps> = ({ bunnyDetail }) => {
  return (
    <LeftSection>
      <LeftGridContainer>
        <BasicProfileColumn>
          <ProfileSection>
            {bunnyDetail?.spec.image ? (
              <ProfileImage src={bunnyDetail.spec.image} alt="Profile" />
            ) : (
              <ProfileImagePlaceholder />
            )}
            <UserInfo>
              <Nickname>{bunnyDetail?.bunny_name}</Nickname>
              <RealName>{bunnyDetail?.spec.name}</RealName>
            </UserInfo>
          </ProfileSection>
          <ContactSection>
            <ContactItem>
              <ContactLabel>Email</ContactLabel>
              <ContactValue>{bunnyDetail?.spec.email}</ContactValue>
            </ContactItem>
            <ContactItem>
              <ContactLabel>Link</ContactLabel>
              <SocialIcons>
                {bunnyDetail?.spec.link && bunnyDetail.spec.link.length > 0 &&
                  bunnyDetail.spec.link.map((link, index) => {
                    const iconSrc = getLinkIcon(link.url?.toLowerCase?.() || '');
                    return (
                      <SocialImage
                        key={index}
                        src={iconSrc}
                        alt={link.type}
                      />
                    );
                  })
                }
              </SocialIcons>
            </ContactItem>
          </ContactSection>
        </BasicProfileColumn>

        <DetailedProfileColumn>
          <ExperienceSection>
            <SectionHeader>
              <SectionImage src="/images/personal/funding/company.png" alt="경력" />
              <SectionTitle>경력</SectionTitle>
              <SectionLine />
            </SectionHeader>
            {bunnyDetail?.spec.career && bunnyDetail.spec.career.length > 0 &&
              bunnyDetail.spec.career.map((career, index) => (
                <ExperienceItem key={index}>
                  <ExperiencePeriod>
                    {career.start_date} - {career.end_date || '현재'}
                  </ExperiencePeriod>
                  <ExperienceName>{career.company_name}</ExperienceName>
                </ExperienceItem>
              ))
            }
          </ExperienceSection>

          <EducationSection>
            <SectionHeader>
              <SectionImage src="/images/personal/funding/education.png" alt="학력" />
              <SectionTitle>학력</SectionTitle>
              <SectionLine />
            </SectionHeader>
            {bunnyDetail?.spec.education && bunnyDetail.spec.education.length > 0 && 
              bunnyDetail.spec.education.map((education, index) => (
                <EducationItem key={index}>
                  <EducationPeriod>
                    {education.start_date} - {education.end_date}
                  </EducationPeriod>
                  <EducationName>{education.school_name}</EducationName>
                </EducationItem>
              ))
            }
          </EducationSection>

          <CertificationSection>
            <SectionHeader>
              <SectionImage src="/images/personal/funding/certification.png" alt="자격증" />
              <SectionTitle>자격증</SectionTitle>
              <SectionLine />
            </SectionHeader>
            {bunnyDetail?.spec.certification && bunnyDetail.spec.certification.length > 0 && 
              bunnyDetail.spec.certification.map((certification, index) => (
                <CertificationItem key={index}>
                  <CertificationDate>{certification.cdate}</CertificationDate>
                  <CertificationName>{certification.name}</CertificationName>
                </CertificationItem>
              ))
            }
          </CertificationSection>

          <TechStackSection>
            <SectionHeader>
              <SectionImage src="/images/personal/funding/stack.png" alt="기술스택" />
              <SectionTitle>기술스택</SectionTitle>
              <SectionLine />
            </SectionHeader>
            <TechStackGrid>
              {bunnyDetail?.spec.skill && bunnyDetail.spec.skill.length > 0 && 
                bunnyDetail.spec.skill.map((skill, index) => (
                  <TechItem key={index}>{skill}</TechItem>
                ))
              }
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

const ProfileImage = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 0.5rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 1.25rem;
  object-fit: cover;
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
