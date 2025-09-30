"use client";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { Bunny } from "../../../_store/bunnyStore";

interface Link {
  sns_id: string;
  url: string;
  type: string;
  favicon: string;
}

interface Certification {
  certification_id: string;
  certificate_url: string;
  name: string;
  ca: string;
  cdate: string;
}

interface Career {
  career_id: string;
  company_name: string;
  status: string;
  position: string;
  start_date: string;
  end_date: string | null;
  certificate_url: string;
}

interface Education {
  education_id: string;
  school_name: string;
  status: string;
  major: string;
  start_date: string;
  end_date: string;
  certificate_url: string;
}

interface Spec {
  name: string;
  birthdate: string;
  email: string;
  phone: string;
  image: string;
  resume: string;
  position: string;
  link: Link[];
  skill: string[];
  certification: Certification[];
  career: Career[];
  education: Education[];
  ai_review: string;
}

interface BunnyWithSpec extends Bunny {
  spec?: Spec;
}

interface BunnySpecProps {
  bunny: BunnyWithSpec;
}

export default function BunnySpec({ bunny }: BunnySpecProps) {
  const spec = bunny.spec;
  
  if (!spec) {
    return <div>스펙 정보가 없습니다.</div>;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const formatDateRange = (startDate: string, endDate: string | null) => {
    const start = formatDate(startDate);
    const end = endDate ? formatDate(endDate) : '현재';
    return `${start} ~ ${end}`;
  };

  return (
    <>
      <EducationSection>
        <SectionHeader>
          <SectionIcon>
            <Icon icon="material-symbols:school" color="#149FAE" />
          </SectionIcon>
          <SectionTitle>학력</SectionTitle>
        </SectionHeader>
        <SectionContent>
          {spec.education && spec.education.length > 0 ? (
            spec.education.map((edu) => (
              <EducationItem key={edu.education_id}>
                <EducationInfo>{edu.school_name} {edu.major}</EducationInfo>
                <EducationDate>{formatDateRange(edu.start_date, edu.end_date)}</EducationDate>
              </EducationItem>
            ))
          ) : (
            <NoDataMessage>학력 정보가 없습니다🐰</NoDataMessage>
          )}
        </SectionContent>
      </EducationSection>

      <ExperienceSection>
        <SectionHeader>
          <SectionIcon>
            <Icon icon="material-symbols:code" color="#149FAE" />
          </SectionIcon>
          <SectionTitle>경력</SectionTitle>
        </SectionHeader>
        <SectionContent>
          {spec.career && spec.career.length > 0 ? (
            spec.career.map((career) => (
              <ExperienceItem key={career.career_id}>
                <ExperienceInfo>{career.company_name} {career.position}</ExperienceInfo>
                <ExperienceDate>{formatDateRange(career.start_date, career.end_date)}</ExperienceDate>
              </ExperienceItem>
            ))
          ) : (
            <NoDataMessage>경력 정보가 없습니다 🐰</NoDataMessage>
          )}
        </SectionContent>
      </ExperienceSection>

      <CertificationSection>
        <SectionHeader>
          <SectionIcon>
            <Icon icon="material-symbols:description" color="#149FAE" />
          </SectionIcon>
          <SectionTitle>자격증</SectionTitle>
        </SectionHeader>
        <CertificationContent>
          {spec.certification && spec.certification.length > 0 ? (
            spec.certification.map((cert) => (
              <CertificationItem key={cert.certification_id}>
                <CertificationInfo>
                  {cert.name} <CertificationCA>({cert.ca})</CertificationCA>
                </CertificationInfo>
                <CertificationDate>{formatDate(cert.cdate)}</CertificationDate>
              </CertificationItem>
            ))
          ) : (
            <NoDataMessage>자격증 정보가 없습니다 🐰</NoDataMessage>
          )}  
        </CertificationContent>
      </CertificationSection>

      <SkillsSection>
        <SkillsTags>
          {spec.skill && spec.skill.length > 0 ? (
            spec.skill.map((skill, index) => (
              <SkillTag key={index}>#{skill}</SkillTag>
            ))
          ) : (
            <NoDataMessage>기술스택 정보가 없습니다 🐰</NoDataMessage>
          )}
        </SkillsTags>
      </SkillsSection>
    </>
  );
}


const EducationSection = styled.div`
  flex: 1;
  display: flex;
  gap: 0.75rem;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.25rem;
  }
`;

const ExperienceSection = styled.div`
  flex: 1;
  display: flex;
  gap: 0.75rem;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.25rem;
  }
`;

const CertificationSection = styled.div`
  flex: 1;
  display: flex;
  gap: 0.75rem;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.25rem;
  }
`;

const SkillsSection = styled.div`
  flex: 0 0 auto;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  flex: 0 0 auto;
  min-width: 3rem;
  
  @media (max-width: 768px) {
    min-width: 2.5rem;
  }
  
  @media (max-width: 480px) {
    min-width: 2rem;
  }
`;

const SectionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const SectionTitle = styled.h4`
  font-size: 0.8rem;
  font-weight: bold;
  color: #ffd700;
  margin: 0;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`;

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  flex: 1;
  overflow: hidden;
`;

const EducationItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  margin-bottom: 0.3rem;
  background: linear-gradient(135deg, rgba(197, 197, 197, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%);
  padding: 0.4rem 0.6rem;
  border-radius: 0.4rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, rgba(197, 197, 197, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%);
  }
`;

const EducationInfo = styled.div`
  font-size: 0.75rem;
  color: #fff;
  line-height: 1.2;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.65rem;
  }
`;

const EducationDate = styled.div`
  font-size: 0.6rem;
  color: #ccc;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 0.55rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.5rem;
  }
`;

const ExperienceItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  margin-bottom: 0.3rem;
  background: linear-gradient(135deg, rgba(197, 197, 197, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%);
  padding: 0.4rem 0.6rem;
  border-radius: 0.4rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, rgba(197, 197, 197, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%);
  }
`;

const ExperienceInfo = styled.div`
  font-size: 0.75rem;
  color: #fff;
  line-height: 1.2;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.65rem;
  }
`;

const ExperienceDate = styled.div`
  font-size: 0.6rem;
  color: #ccc;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 0.55rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.5rem;
  }
`;

const CertificationContent = styled.div`
  border-radius: 0.5rem;
  padding: 0.2rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  flex: 1;
  overflow-y: auto;
`;

const CertificationItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  margin-bottom: 0.3rem;
  background: linear-gradient(135deg, rgba(197, 197, 197, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%);
  padding: 0.4rem 0.6rem;
  border-radius: 0.4rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, rgba(197, 197, 197, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%);
  }
`;

const CertificationInfo = styled.div`
  font-size: 0.75rem;
  color: #fff;
  line-height: 1.2;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.65rem;
  }
`;

const CertificationCA = styled.span`
  font-size: 0.65rem;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.55rem;
  }
`;

const CertificationDate = styled.div`
  font-size: 0.6rem;
  color: #ccc;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 0.55rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.5rem;
  }
`;

const SkillsTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
`;

const SkillTag = styled.span`
  background: linear-gradient(135deg, #AEAEAE 0%, #8A8A8A 100%);
  color: #FFF2C2;
  font-size: 0.65rem;
  padding: 0.3rem 0.6rem;
  border-radius: 1.2rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: default;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background: linear-gradient(135deg, #B8B8B8 0%, #9A9A9A 100%);
  }
  
  @media (max-width: 768px) {
    font-size: 0.6rem;
    padding: 0.25rem 0.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.55rem;
    padding: 0.2rem 0.4rem;
  }
`;

const NoDataMessage = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  padding: 0.8rem;
  text-align: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
  border-radius: 0.5rem;
  border: 1px dashed rgba(255, 255, 255, 0.2);
  font-style: italic;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 0.4rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.65rem;
    padding: 0.3rem;
  }
`;
