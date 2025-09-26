'use client';

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useBunnyStore, Bunny } from '../_store/bunnyStore';
import { useRouter } from 'next/navigation';


// 리뷰 데이터 타입 정의
interface Review {
  id: number;
  company: string;
  reviewer: string;
  role: string;
  rating: number;
  title: string;
  content: string;
  date: string;
}

// 더미 리뷰 데이터
const reviews: Review[] = [
  {
    id: 1,
    company: "네이버",
    reviewer: "황호연",
    role: "HR Manager",
    rating: 5,
    title: "개발자 매칭이 정확합니다",
    content: "Rabbit 서비스를 통해 우리 회사에 꼭 맞는 개발자를 빠르게 찾을 수 있었습니다. 개발자의 기술 스택과 프로젝트 경험이 상세히 제공되어 매칭 정확도가 높았습니다.",
    date: "2025-09-20"
  },
  {
    id: 2,
    company: "카카오 엔터프라이즈",
    reviewer: "홍민우",
    role: "CTO",
    rating: 4,
    title: "유용하고 재밌어요",
    content: "매칭된 개발자들의 퀄리티가 우수하고, 대시보드 UI가 재밌었어요! 덕분에 빠른 채용 의사결정에 큰 도움이 되었습니다.",
    date: "2025-09-18"
  },
  {
    id: 3,
    company: "신한DS",
    reviewer: "장하진",
    role: "Recruiter",
    rating: 5,
    title: "빠르고 효율적인 개발자 매칭",
    content: "기존 채용 방식보다 훨씬 효율적입니다. 개발자 추천이 매우 적절했고, 기술 역량 검증 자료도 함께 제공되어 신뢰도가 높습니다.",
    date: "2025-08-15"
  }
];

export default function Corporation() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [activeTab, setActiveTab] = useState<'search' | 'matching'>('search');
  const router = useRouter();
  const { bunnies, isLoading, fetchBunnies } = useBunnyStore();

  const handleUnreleasedFeature = () => {
    alert('아직 출시되지 않은 기능입니다.');
  };

  useEffect(() => {
    // Bunny 데이터 가져오기
    fetchBunnies({ size: 3 });
    
    // 스크롤 애니메이션 설정
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // 카드 요소들에 애니메이션 적용
    const cards = document.querySelectorAll('.service-card, .talent-card, .timeline-card');
    cards.forEach(card => {
      const element = card as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observerRef.current?.observe(element);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <Container>
      {/* Header */}
      <Header>
        <InnerContainer>
          <Nav>
            <Logo onClick={() => router.push('/')}>
              <img src="/images/logo_pastel.png" alt="Rabbit Logo" />
            </Logo>
          <NavMenu>
            <NavItem 
              className={activeTab === 'search' ? 'active' : ''}
              onClick={() => setActiveTab('search')}
            >
              Rabbit 인재 탐색
            </NavItem>
            <NavItem 
              className={activeTab === 'matching' ? 'active' : ''}
              onClick={() => setActiveTab('matching')}
            >
              Rabbit 인재 매칭
            </NavItem>
          </NavMenu>
            <NavRight>로그아웃</NavRight>
          </Nav>
        </InnerContainer>
      </Header>

      {activeTab === 'search' ? (
        <>
          {/* Hero Section */}
          <Hero>
            <InnerContainer>
              <HeroContent>
                <HeroText>
                  <HeroTitle>실력있는 개발자를 찾는<br />가장 효율적인 방법</HeroTitle>
                  <HeroSubtitle>Rabbit에는 업계<br />No.1 개발자가 모여있습니다.</HeroSubtitle>
                  <CtaButton href="/personal/home">개발자 둘러보기</CtaButton>
                </HeroText>
                <HeroVisual>
                  <VisualPlaceholder>
                    
                    <FallingStar $delay="5s" $left="20%" $top="10%" />
                    <FallingStar $delay="6.5s" $left="80%" $top="15%" />
                    <FallingStar $delay="3s" $left="30%" $top="5%" />
                    <FallingStar $delay="4.5s" $left="70%" $top="12%" />
                    <FloatingRocket />
                  </VisualPlaceholder>
                </HeroVisual>
              </HeroContent>
            </InnerContainer>
          </Hero>

          {/* CTA Section */}
          <CtaSection>
            <InnerContainer>
              <CtaTitle>
                지금 Rabbit과<br />
                제휴를 시작해보세요
              </CtaTitle>
              <CtaSubtitle>
                제휴 기업이 되어 우수한 개발자들에게<br />
                기업 뱃지를 부여하고 당신의 회사를 알려보세요
              </CtaSubtitle>
              <CtaButtonLarge onClick={handleUnreleasedFeature}>제휴 신청하기</CtaButtonLarge>
            </InnerContainer>
          </CtaSection>
        </>
      ) : (
        <>
          {/* Matching Hero Section */}
          <MatchingHero>
            <InnerContainer>
              <MatchingHeroContent>
                <MatchingHeroText>
                  <MatchingHeroTitle>개발자 채용,<br />Rabbit에서 더 빠르고 똑똑하게</MatchingHeroTitle>
                  <MatchingHeroSubtitle>Rabbit에 등록된 <span style={{fontWeight: '900', color: 'yellow'}}>32</span>명의 개발자 중에서<br />회사에게 필요한 개발자를 매칭해 드립니다</MatchingHeroSubtitle>
                  <MatchingCtaButton onClick={handleUnreleasedFeature}>시작하기</MatchingCtaButton>
                </MatchingHeroText>
                <MatchingHeroVisual>
                  <MatchingAnimationContainer>
                    <TargetImage 
                      src="/images/corporation/rbt_target.png" 
                      alt="타겟 이미지"
                    />
                    <StarImage $size="large" $position="top-left">
                      <img src="/images/corporation/rbt_star.png" alt="별" />
                    </StarImage>
                    <StarImage $size="medium" $position="top-right">
                      <img src="/images/corporation/rbt_star.png" alt="별" />
                    </StarImage>
                    <StarImage $size="small" $position="bottom-left">
                      <img src="/images/corporation/rbt_star.png" alt="별" />
                    </StarImage>
                    <StarImage $size="small" $position="bottom-right">
                      <img src="/images/corporation/rbt_star.png" alt="별" />
                    </StarImage>
                  </MatchingAnimationContainer>
                </MatchingHeroVisual>
              </MatchingHeroContent>
            </InnerContainer>
          </MatchingHero>

          {/* Service Cards Section */}
          <ServiceSection>
            <InnerContainer>
              <SectionTitle>Rabbit 인재 매칭 서비스 사용 후기</SectionTitle>
              <ServiceCards>
                {reviews.map((review) => (
                  <ServiceCard key={review.id} className="service-card">
                    <ReviewHeader>
                      <ReviewCompany>{review.company}</ReviewCompany>
                      <ReviewRating>
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star key={i} $filled={i < review.rating}>★</Star>
                        ))}
                      </ReviewRating>
                    </ReviewHeader>
                    <ReviewTitle>{review.title}</ReviewTitle>
                    <ReviewContent>{review.content}</ReviewContent>
                    <ReviewFooter>
                      <ReviewerInfo>
                        <ReviewerName>{review.reviewer}</ReviewerName>
                        <ReviewerRole>{review.role}</ReviewerRole>
                      </ReviewerInfo>
                      <ReviewDate>{review.date}</ReviewDate>
                    </ReviewFooter>
                  </ServiceCard>
                ))}
              </ServiceCards>
            </InnerContainer>
          </ServiceSection>

          {/* Talent Section */}
          <TalentSection>
            <InnerContainer>
              <SectionTitle>Rabbit에 등록된 인재</SectionTitle>
              <TalentDescription>
                Rabbit 거래를 기반으로 실력이 검증된 인재들을 만나보세요!
              </TalentDescription>
              <TalentCards>
                {isLoading ? (
                  <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                    로딩 중...
                  </div>
                ) : (
                  bunnies.slice(0, 5).map((bunny: Bunny) => (
                    <TalentCard 
                      key={bunny.bunny_id} 
                      className="talent-card"
                      onClick={() => router.push(`/personal/trade/${bunny.bunny_name}`)}
                    >
                      <TalentHeader>
                        <TalentAvatar></TalentAvatar>
                        <TalentNameContainer>
                          <TalentName>{bunny.bunny_name}</TalentName>
                          <TalentUserName>
                            {bunny.user_name}
                          </TalentUserName>
                        </TalentNameContainer>
                      </TalentHeader>
                      <TalentSkills>
                        <SkillTag>{bunny.position}</SkillTag>
                      </TalentSkills>
                      <TalentPrice 
                        style={{ 
                          color: bunny.fluctuation_rate && bunny.fluctuation_rate > 0 ? '#ef4444' : '#3b82f6' 
                        }}
                      >
                        {bunny.current_price.toLocaleString()}C
                        {bunny.fluctuation_rate && (
                          <span style={{ 
                            color: bunny.fluctuation_rate > 0 ? '#ef4444' : '#3b82f6',
                            fontSize: '0.9rem',
                            marginLeft: '0.5rem'
                          }}>
                            {bunny.fluctuation_rate > 0 ? '+' : ''}{bunny.fluctuation_rate.toFixed(2)}%
                          </span>
                        )}
                      </TalentPrice>
                    </TalentCard>
                  ))
                )}
              </TalentCards>
            </InnerContainer>
          </TalentSection>

          {/* Info Section */}
          <InfoSection>
            <InnerContainer>
              <SectionTitle>Rabbit<br />무엇이 다를까요?</SectionTitle>
              <InfoGrid>
                <InfoCard>
                  <InfoIcon>🎯</InfoIcon>
                  <InfoTitle>매칭 정확도</InfoTitle>
                  <InfoDescription>
                    단순 추천이 아닌, 우리 회사에 꼭 맞는 개발자 매칭. 기술과 경험까지 고려한 정밀한 개발자 추천
                  </InfoDescription>
                </InfoCard>
                <InfoCard>
                  <InfoIcon>⚡</InfoIcon>
                  <InfoTitle>속도·효율</InfoTitle>
                  <InfoDescription>
                    몇 번의 클릭으로 채용 속도를 혁신하다. 빠른 개발자 매칭, 효율적인 채용 결정
                  </InfoDescription>
                </InfoCard>
                <InfoCard>
                  <InfoIcon>🛡️</InfoIcon>
                  <InfoTitle>신뢰·검증</InfoTitle>
                  <InfoDescription>
                    많은 기업들의 후기가 증명하는 검증된 개발자. 프로젝트 경험과 역량까지 확인된 개발자만 추천
                  </InfoDescription>
                </InfoCard>
                <InfoCard>
                  <InfoIcon>🤖</InfoIcon>
                  <InfoTitle>편리성·자동화</InfoTitle>
                  <InfoDescription>
                    채용 고민을 줄여주는 스마트 매칭 서비스. 자동화된 추천으로 인재 매칭이 쉬워집니다
                  </InfoDescription>
                </InfoCard>
                <InfoCard>
                  <InfoIcon>🏢</InfoIcon>
                  <InfoTitle>전체 포지션 대응</InfoTitle>
                  <InfoDescription>
                    스타트업부터 대기업까지, 모든 포지션에 최적화. 개발자 채용의 새로운 기준, Rabbit
                  </InfoDescription>
                </InfoCard>
              </InfoGrid>
            </InnerContainer>
          </InfoSection>

          {/* Matching Service Section */}
          <MatchingServiceSection>
            <InnerContainer>
              <SectionTitle>매칭 서비스 타임라인</SectionTitle>
              <TimelineContainer>
                <MatchingTimelineCard>
                  <MatchingTimelineHeader>
                    <MatchingTimelineStepNumber>1</MatchingTimelineStepNumber>
                    <MatchingTimelineTitle>원하는 인재상 제출</MatchingTimelineTitle>
                  </MatchingTimelineHeader>
                  <MatchingTimelineDescription>
                    <MatchingTimelineDescriptionLine>
                      회사의 <strong>필요 역량, 기술 스택, 경험 수준, 문화 적합성</strong> 등 원하는 인재 조건을 제출합니다.
                    </MatchingTimelineDescriptionLine>
                    <MatchingTimelineDescriptionLine>
                      <strong>간단한 폼 입력</strong>만으로 채용팀의 기준을 Rabbit에 전달할 수 있습니다.
                    </MatchingTimelineDescriptionLine>
                  </MatchingTimelineDescription>
                </MatchingTimelineCard>
                <MatchingTimelineCard>
                  <MatchingTimelineHeader>
                    <MatchingTimelineStepNumber>2</MatchingTimelineStepNumber>
                    <MatchingTimelineTitle>Rabbit 인재 매칭</MatchingTimelineTitle>
                  </MatchingTimelineHeader>
                  <MatchingTimelineDescription>
                    <MatchingTimelineDescriptionLine>
                      제출된 인재상에 맞춰 <strong>Rabbit의 데이터베이스와 AI 매칭 알고리즘</strong>이 최적의 개발자를 선별합니다.
                    </MatchingTimelineDescriptionLine>
                    <MatchingTimelineDescriptionLine>
                      개발자의 <strong>기술 스택, 프로젝트 경험, 이전 평가 자료</strong>까지 종합적으로 분석하여 추천합니다.
                    </MatchingTimelineDescriptionLine>
                  </MatchingTimelineDescription>
                </MatchingTimelineCard>
                <MatchingTimelineCard>
                  <MatchingTimelineHeader>
                    <MatchingTimelineStepNumber>3</MatchingTimelineStepNumber>
                    <MatchingTimelineTitle>매칭 성공</MatchingTimelineTitle>
                  </MatchingTimelineHeader>
                  <MatchingTimelineDescription>
                    <MatchingTimelineDescriptionLine>
                      최적 개발자가 선정되면 기업에게 <strong>상세 프로필과 평가 자료</strong>가 제공됩니다.
                    </MatchingTimelineDescriptionLine>
                    <MatchingTimelineDescriptionLine>
                      관심 개발자와 <strong>빠르게 인터뷰 일정</strong>을 잡아 채용 과정을 단축할 수 있습니다.
                    </MatchingTimelineDescriptionLine>
                  </MatchingTimelineDescription>
                </MatchingTimelineCard>
                <MatchingTimelineCard>
                  <MatchingTimelineHeader>
                    <MatchingTimelineStepNumber>4</MatchingTimelineStepNumber>
                    <MatchingTimelineTitle>커피챗 지원</MatchingTimelineTitle>
                  </MatchingTimelineHeader>
                  <MatchingTimelineDescription>
                    <MatchingTimelineDescriptionLine>
                      개발자와 보다 <strong>자유로운 분위기</strong>에서 소통할 수 있도록 커피챗을 지원합니다.
                    </MatchingTimelineDescriptionLine>
                    <MatchingTimelineDescriptionLine>
                      <strong>장소와 비용을 Rabbit이 일부 지원</strong>하여 부담 없이 초기 만남을 진행할 수 있습니다.
                    </MatchingTimelineDescriptionLine>
                  </MatchingTimelineDescription>
                </MatchingTimelineCard>
              </TimelineContainer>
            </InnerContainer>
          </MatchingServiceSection>

          {/* Benefits Section */}
          <BenefitsSection>
            <InnerContainer>
              <SectionTitle>왜 Rabbit 매칭 서비스인가요?</SectionTitle>
              <BenefitsGrid>
                <BenefitItem>
                  <BenefitIcon>⚡</BenefitIcon>
                  <BenefitTitle>빠른 매칭</BenefitTitle>
                  <BenefitDescription>AI 기반 매칭 알고리즘으로 48시간 내에 최적의 개발자를 찾아드립니다.</BenefitDescription>
                </BenefitItem>
                <BenefitItem>
                  <BenefitIcon>✨</BenefitIcon>
                  <BenefitTitle>검증된 인재</BenefitTitle>
                  <BenefitDescription>엄격한 심사를 통과한 상위 5% 개발자들만 등록되어 있습니다.</BenefitDescription>
                </BenefitItem>
                <BenefitItem>
                  <BenefitIcon>🎯</BenefitIcon>
                  <BenefitTitle>정확한 매칭</BenefitTitle>
                  <BenefitDescription>기술 스택부터 협업 스타일까지 고려한 정밀 매칭 서비스를 제공합니다.</BenefitDescription>
                </BenefitItem>
              </BenefitsGrid>
            </InnerContainer>
          </BenefitsSection>

          {/* Matching CTA Section */}
          <MatchingCtaSection>
            <InnerContainer>
              <MatchingCtaContent>
                <MatchingCtaText>
                  <MatchingCtaTitle>지금 Rabbit에서<br />인재 매칭을 시작해 보세요</MatchingCtaTitle>
                </MatchingCtaText>
                <MatchingCtaButtonLarge onClick={handleUnreleasedFeature}>지금 시작하기</MatchingCtaButtonLarge>
              </MatchingCtaContent>
            </InnerContainer>
          </MatchingCtaSection>
        </>
      )}
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  position: relative;
  background: transparent;
  overflow-x: hidden;
`;

const InnerContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Header = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 1rem 0;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  
  img {
    height: 40px;
    width: auto;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const NavMenu = styled.div`
  display: flex;
  gap: 2.5rem;
`;

const NavItem = styled.button`
  color: #64748b;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 0;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover,
  &.active {
    color: #667eea;
    transform: translateY(-1px);

    &::after {
      width: 100%;
    }
  }
`;

const NavRight = styled.div`
  color: #94a3b8;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.1);
    color: #667eea;
  }
`;

const Hero = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6rem 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      #667eea 0%,
      #764ba2 25%,
      #667eea 50%,
      #764ba2 75%,
      #667eea 100%
    );
    background-size: 400% 400%;
    animation: gradientShift 8s ease-in-out infinite;
    opacity: 0.8;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
    animation: float 6s ease-in-out infinite;
  }

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

const HeroContent = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
`;

const HeroText = styled.div`
  flex: 1;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  line-height: 1.6;
  font-weight: 400;
`;

const CtaButton = styled.a`
  background: rgba(255,255,255,0.15);
  border: 2px solid rgba(255,255,255,0.3);
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.6s;
  }

  &:hover {
    background: rgba(255,255,255,0.25);
    border-color: rgba(255,255,255,0.5);
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);

    &::before {
      left: 100%;
    }
  }
`;

const HeroVisual = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VisualPlaceholder = styled.div`
  width: 400px;
  height: 300px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 300px;
    height: 200px;
  }
`;

const FloatingRocket = styled.div`
  width: 300px;
  height: 300px;
  background-image: url('/images/corporation/rbt_rocket.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  animation: floatingRocket 3s ease-in-out infinite;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));

  @keyframes floatingRocket {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    25% {
      transform: translateY(-15px) rotate(1deg);
    }
    50% {
      transform: translateY(-10px) rotate(0deg);
    }
    75% {
      transform: translateY(-20px) rotate(-1deg);
    }
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;


const FallingStar = styled.div<{ $delay: string; $left: string; $top: string }>`
  position: absolute;
  left: ${({ $left }) => $left};
  top: ${({ $top }) => $top};
  width: 30px;
  height: 30px;
  background-image: url('/images/corporation/rbt_star.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  animation: fallingStar ${({ $delay }) => $delay} 6s ease-in infinite;
  opacity: 0;
  pointer-events: none;

  @keyframes fallingStar {
    0% {
      opacity: 0;
      transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
    }
    10% {
      opacity: 1;
      transform: translateY(10px) translateX(-5px) scale(1.2) rotate(45deg);
    }
    20% {
      opacity: 1;
      transform: translateY(30px) translateX(-15px) scale(1) rotate(90deg);
    }
    30% {
      opacity: 1;
      transform: translateY(60px) translateX(-30px) scale(0.8) rotate(135deg);
    }
    40% {
      opacity: 1;
      transform: translateY(100px) translateX(-50px) scale(0.6) rotate(180deg);
    }
    50% {
      opacity: 0.8;
      transform: translateY(150px) translateX(-75px) scale(0.4) rotate(225deg);
    }
    60% {
      opacity: 0.6;
      transform: translateY(200px) translateX(-100px) scale(0.2) rotate(270deg);
    }
    70% {
      opacity: 0.4;
      transform: translateY(250px) translateX(-125px) scale(0.1) rotate(315deg);
    }
    80% {
      opacity: 0.2;
      transform: translateY(300px) translateX(-150px) scale(0.05) rotate(360deg);
    }
    100% {
      opacity: 0;
      transform: translateY(350px) translateX(-175px) scale(0) rotate(405deg);
    }
  }

  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
  }
`;

const ServiceSection = styled.section`
  padding: 6rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23667eea" stroke-width="0.5" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  position: relative;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 2px;
  }
`;

const ServiceCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 2.5rem;
  border-radius: 24px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px rgba(102, 126, 234, 0.15);
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);

    &::before {
      transform: scaleX(1);
    }
  }
`;

const CardIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);

  &::after {
    content: '✨';
    font-size: 2rem;
    color: white;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1e293b;
  letter-spacing: -0.01em;
`;

const CardDescription = styled.p`
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
  font-weight: 400;
`;

// 리뷰 카드 스타일 컴포넌트들
const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ReviewCompany = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
`;

const ReviewRating = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const Star = styled.span<{ $filled: boolean }>`
  color: ${props => props.$filled ? '#fbbf24' : '#d1d5db'};
  font-size: 1rem;
`;

const ReviewTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #1e293b;
  letter-spacing: -0.01em;
`;

const ReviewContent = styled.p`
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.6;
  font-weight: 400;
  margin-bottom: 1.5rem;
`;

const ReviewFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`;

const ReviewerInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewerName = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: #1e293b;
`;

const ReviewerRole = styled.div`
  font-size: 0.8rem;
  color: #64748b;
  margin-top: 0.25rem;
`;

const ReviewDate = styled.div`
  font-size: 0.8rem;
  color: #94a3b8;
`;

const TalentSection = styled.section`
  padding: 6rem 0;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="circles" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="%23667eea" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23circles)"/></svg>');
    opacity: 0.2;
  }
`;

const TalentDescription = styled.p`
  text-align: center;
  color: #64748b;
  margin-bottom: 3rem;
  font-size: 1.1rem;
  line-height: 1.6;
  font-weight: 400;
  position: relative;
  z-index: 1;
`;

const TalentCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TalentCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 25px 50px rgba(102, 126, 234, 0.15);

    &::before {
      opacity: 1;
    }
  }
`;

const TalentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
`;

const TalentAvatar = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  position: relative;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);

  &::after {
    content: '👨‍💻';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
  }
`;

const TalentName = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.01em;
`;

const TalentNameContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TalentUserName = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 2px;
`;

const TalentSkills = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
`;

const SkillTag = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
`;

const TalentPrice = styled.div`
  font-size: 1.75rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: right;
  position: relative;
  z-index: 1;
`;

const InfoSection = styled.section`
  padding: 4rem 0;
  background: white;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  text-align: center;
  padding: 2rem 1.5rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);

    &::before {
      opacity: 1;
    }
  }
`;

const InfoIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  display: block;
  position: relative;
  z-index: 1;
`;

const InfoTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1e293b;
  letter-spacing: -0.01em;
  position: relative;
  z-index: 1;
`;

const InfoDescription = styled.p`
  color: #64748b;
  line-height: 1.7;
  font-size: 0.7rem;
  font-weight: 400;
  position: relative;
  text-align: center;
  margin: 0;
  word-break: keep-all;
  hyphens: auto;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
    line-height: 1.6;
  }
`;

const CtaSection = styled.section`
  padding: 6rem 0;
  background: white;
  color: #2c3e50;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="%23667eea" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
    opacity: 0.3;
  }
`;

const CtaTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CtaButtonLarge = styled.a`
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: 2px solid transparent;
  color: white;
  padding: 1.25rem 3.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.02em;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.6s;
  }

  &:hover {
    background: linear-gradient(135deg, #5a6fd8, #6a4190);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 25px 50px rgba(102, 126, 234, 0.4);

    &::before {
      left: 100%;
    }
  }
`;

// 매칭 페이지용 컴포넌트들

const BenefitsSection = styled.section`
  padding: 6rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="benefits-pattern" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="15" cy="15" r="2" fill="%233498db" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23benefits-pattern)"/></svg>');
    opacity: 0.2;
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const BenefitCard = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);

    &::before {
      opacity: 1;
    }
  }
`;

const BenefitIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  position: relative;
  z-index: 1;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
`;

const BenefitTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2c3e50;
  position: relative;
  z-index: 1;
`;

const BenefitDescription = styled.p`
  color: #666;
  line-height: 1.6;
  position: relative;
  z-index: 1;
`;

const CtaSubtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

// 매칭 페이지용 컴포넌트들
const MatchingHero = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 6rem 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      #667eea 0%,
      #764ba2 25%,
      #667eea 50%,
      #764ba2 75%,
      #667eea 100%
    );
    background-size: 400% 400%;
    animation: gradientShiftMatching 10s ease-in-out infinite;
    opacity: 0.8;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots-matching" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23dots-matching)"/></svg>');
    opacity: 0.3;
    animation: floatMatching 8s ease-in-out infinite;
  }

  @keyframes gradientShiftMatching {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes floatMatching {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-15px);
    }
  }
`;

const MatchingHeroContent = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
`;

const MatchingHeroText = styled.div`
  flex: 1;
`;

const MatchingHeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const MatchingHeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  font-weight: 400;
`;

const MatchingCtaButton = styled.a`
  background: rgba(255,255,255,0.15);
  border: 2px solid rgba(255,255,255,0.3);
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.6s;
  }

  &:hover {
    background: rgba(255,255,255,0.25);
    border-color: rgba(255,255,255,0.5);
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);

    &::before {
      left: 100%;
    }
  }
`;

const MatchingHeroVisual = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MatchingAnimationContainer = styled.div`
  position: relative;
  width: 400px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: floatMatching 8s ease-in-out infinite;

  @media (max-width: 768px) {
    width: 300px;
    height: 200px;
  }

  @keyframes floatMatching {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-15px);
    }
  }
`;

const TargetImage = styled.img`
  width: 280px;
  height: 280px;
  object-fit: contain;
  z-index: 2;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const StarImage = styled.div<{ $size: 'small' | 'medium' | 'large'; $position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }>`
  position: absolute;
  z-index: 1;
  
  img {
    width: ${props => {
      switch (props.$size) {
        case 'small': return '70px';
        case 'medium': return '90px';
        case 'large': return '110px';
        default: return '90px';
      }
    }};
    height: ${props => {
      switch (props.$size) {
        case 'small': return '70px';
        case 'medium': return '90px';
        case 'large': return '110px';
        default: return '90px';
      }
    }};
    object-fit: contain;
    filter: drop-shadow(0 4px 8px rgba(255, 215, 0, 0.3));
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.2);
    }
  }

  ${props => {
    switch (props.$position) {
      case 'top-left':
        return `
          top: 10px;
          left: 10px;
          animation: starFloatLeft 4s ease-in-out infinite;
          animation-delay: 0s;
        `;
      case 'top-right':
        return `
          top: 10px;
          right: 10px;
          animation: starFloatRight 5s ease-in-out infinite;
          animation-delay: 1s;
        `;
      case 'bottom-left':
        return `
          bottom: 10px;
          left: 10px;
          animation: starFloatLeft 6s ease-in-out infinite;
          animation-delay: 2s;
        `;
      case 'bottom-right':
        return `
          bottom: 10px;
          right: 10px;
          animation: starFloatRight 4.5s ease-in-out infinite;
          animation-delay: 3s;
        `;
    }
  }}

  @keyframes starFloatLeft {
    0%, 100% {
      transform: translateY(0px) translateX(0px);
    }
    25% {
      transform: translateY(-8px) translateX(-5px);
    }
    50% {
      transform: translateY(-12px) translateX(0px);
    }
    75% {
      transform: translateY(-6px) translateX(5px);
    }
  }

  @keyframes starFloatRight {
    0%, 100% {
      transform: translateY(0px) translateX(0px);
    }
    25% {
      transform: translateY(-6px) translateX(5px);
    }
    50% {
      transform: translateY(-10px) translateX(0px);
    }
    75% {
      transform: translateY(-8px) translateX(-5px);
    }
  }

  @media (max-width: 768px) {
    img {
      width: ${props => {
        switch (props.$size) {
          case 'small': return '50px';
          case 'medium': return '65px';
          case 'large': return '80px';
          default: return '65px';
        }
      }};
      height: ${props => {
        switch (props.$size) {
          case 'small': return '50px';
          case 'medium': return '65px';
          case 'large': return '80px';
          default: return '65px';
        }
      }};
    }
  }
`;

const MatchingServiceSection = styled.section`
  padding: 6rem 0;
  background: white;
  position: relative;
`;

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 4rem;
  align-items: stretch;
  position: relative;
  z-index: 1;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const MatchingTimelineCard = styled.div<{ $featured?: boolean }>`
  flex: 1;
  background: ${props => props.$featured 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    : 'white'};
  color: ${props => props.$featured ? 'white' : 'inherit'};
  padding: 0.5rem;
  border-radius: 24px;
  text-align: left;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.$featured 
    ? '0 20px 40px rgba(102, 126, 234, 0.3)' 
    : '0 10px 30px rgba(0,0,0,0.08)'};
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;

  ${props => props.$featured && `
    transform: scale(1.02);
  `}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.$featured 
      ? 'rgba(255, 255, 255, 0.3)' 
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
    transform: scaleX(${props => props.$featured ? '1' : '0'});
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: ${props => props.$featured ? 'scale(1.02) translateY(-8px)' : 'translateY(-8px)'};
    box-shadow: ${props => props.$featured 
      ? '0 25px 50px rgba(102, 126, 234, 0.4)' 
      : '0 20px 40px rgba(0,0,0,0.15)'};

    &::before {
      transform: scaleX(1);
    }
  }

  @media (max-width: 768px) {
    ${props => props.$featured && `
      transform: none;
    `}
    
    &:hover {
      transform: translateY(-8px);
    }
  }
`;

const MatchingTimelineHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
`;

const MatchingTimelineStepNumber = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  flex-shrink: 0;
`;

const MatchingTimelineTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.01em;
  position: relative;
  z-index: 1;
  flex: 1;
`;

const MatchingTimelineDescription = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const MatchingTimelineDescriptionLine = styled.div`
  font-size: 0.9rem;
  line-height: 1.5;
  opacity: 0.9;
  color: inherit;
  font-weight: 400;
  letter-spacing: -0.01em;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  background: rgba(102, 126, 234, 0.03);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  font-family: var(--font-nanum-square);
  
  strong {
    font-weight: 600;
    color: inherit;
  }
  
  &:hover {
    background: rgba(102, 126, 234, 0.08);
    border-color: rgba(102, 126, 234, 0.4);
    transform: translateY(-1px);
  }
`;

const ProcessSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  position: relative;
  z-index: 1;
`;

const ProcessStep = styled.div`
  background: #f8f9fa;
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(52, 152, 219, 0.05) 0%, rgba(41, 128, 185, 0.05) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: white;
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
    transform: translateY(-5px);

    &::before {
      opacity: 1;
    }
  }
`;

const StepNumber = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.4rem;
  margin: 0 auto 1.5rem;
  position: relative;
  z-index: 1;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
`;

const StepTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2c3e50;
  position: relative;
  z-index: 1;
`;

const StepDescription = styled.p`
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
  position: relative;
  z-index: 1;
`;

const BenefitItem = styled.div`
  text-align: center;
  padding: 2.5rem;
  background: white;
  border-radius: 24px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(52, 152, 219, 0.05) 0%, rgba(41, 128, 185, 0.05) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);

    &::before {
      opacity: 1;
    }
  }
`;

const MatchingCtaSection = styled.section`
  padding: 6rem 0;
  background: #f8f9fa;
  text-align: center;
  position: relative;
`;

const MatchingCtaContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }
`;

const MatchingCtaText = styled.div`
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const MatchingCtaTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  letter-spacing: -0.02em;
`;

const MatchingCtaButtonLarge = styled.a`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 1.25rem 3rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.6s;
  }

  &:hover {
    background: linear-gradient(135deg, #5a6fd8, #6a4190);
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(102, 126, 234, 0.4);

    &::before {
      left: 100%;
    }
  }
`;