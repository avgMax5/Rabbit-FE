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
          {spec.education.map((edu) => (
            <EducationItem key={edu.education_id}>
              {edu.school_name} {edu.major} {formatDateRange(edu.start_date, edu.end_date)}
            </EducationItem>
          ))}
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
          {spec.career.map((career) => (
            <ExperienceItem key={career.career_id}>
              {career.company_name} {career.position} {formatDateRange(career.start_date, career.end_date)}
            </ExperienceItem>
          ))}
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
          {spec.certification.map((cert) => (
            <CertificationItem key={cert.certification_id}>
              {cert.name} ({cert.ca}) {formatDate(cert.cdate)}
            </CertificationItem>
          ))}
        </CertificationContent>
      </CertificationSection>

      <SkillsSection>
        <SkillsTags>
          {spec.skill.map((skill, index) => (
            <SkillTag key={index}>#{skill}</SkillTag>
          ))}
        </SkillsTags>
      </SkillsSection>
    </>
  );
}


const EducationSection = styled.div`
  flex: 1;
  display: flex;
  gap: 0.75rem;
`;

const ExperienceSection = styled.div`
  flex: 1;
  display: flex;
  gap: 0.75rem;
`;

const CertificationSection = styled.div`
  flex: 1;
  display: flex;
  gap: 0.75rem;
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
`;

const SectionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const SectionTitle = styled.h4`
  font-size: 0.8rem;
  font-weight: bold;
  color: #ffd700;
  margin: 0;
  text-align: center;
`;

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  flex: 1;
  overflow: hidden;
`;

const EducationItem = styled.div`
  font-size: 0.75rem;
  color: #fff;
  line-height: 1.2;
`;

const ExperienceItem = styled.div`
  font-size: 0.75rem;
  color: #fff;
`;

const CertificationContent = styled.div`
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  flex: 1;
  overflow-y: auto;
`;

const CertificationItem = styled.div`
  font-size: 0.75rem;
  color: #fff;
  line-height: 1.2;
  background-color: rgba(197, 197, 197, 0.25);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
`;

const SkillsTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
`;

const SkillTag = styled.span`
  background: #AEAEAE;
  color: #FFF2C2;
  font-size: 0.65rem;
  padding: 0.2rem 0.4rem;
  border-radius: 1rem;
  font-weight: bold;
`;
