"use client";
import styled from "styled-components";
import { Icon } from "@iconify/react";

export default function BunnySpec() {
  return (
    <>
      <EducationSection>
        <SectionHeader>
          <SectionTitle>학력</SectionTitle>
          <SectionIcon>
            <Icon icon="material-symbols:school" color="#149FAE" />
          </SectionIcon>
        </SectionHeader>
        <SectionContent>
          <EducationItem>하버드대학교 행정학과 2016.03.02~2020.03</EducationItem>
          <EducationItem>하버드대학교 행정학과 2016.03.02~2020.03</EducationItem>
        </SectionContent>
      </EducationSection>

      <ExperienceSection>
        <SectionHeader>
          <SectionTitle>경력</SectionTitle>
          <SectionIcon>
            <Icon icon="material-symbols:code" color="#149FAE" />
          </SectionIcon>
        </SectionHeader>
        <SectionContent>
          <ExperienceItem>하버드대학교 행정학과 2016.03.02~2020.03</ExperienceItem>
          <ExperienceItem>하버드대학교 행정학과 2016.03.02~2020.03</ExperienceItem>
        </SectionContent>
      </ExperienceSection>

      <CertificationSection>
        <SectionHeader>
          <SectionTitle>자격증</SectionTitle>
          <SectionIcon>
            <Icon icon="material-symbols:description" color="#149FAE" />
          </SectionIcon>
        </SectionHeader>
        <CertificationContent>
          <CertificationItem>정보처리기사 2023.03.04</CertificationItem>
          <CertificationItem>정보처리기사 2023.03.04</CertificationItem>
        </CertificationContent>
      </CertificationSection>

      <SkillsSection>
        <SkillsTags>
          <SkillTag>#JAVA</SkillTag>
          <SkillTag>#JAVASCRIPT</SkillTag>
          <SkillTag>#TYPESCRIPT</SkillTag>
          <SkillTag>#CSS</SkillTag>
          <SkillTag>#HTML</SkillTag>
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
