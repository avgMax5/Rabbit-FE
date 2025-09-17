"use client";
import styled from "styled-components";
import Header from "../../../_shared/components/Header";
import PentagonChart from '../../../_shared/components/PentagonChart';
import Chart from '../../../_shared/components/Chart';
import Button from '../../../_shared/components/Button';
import OrderList from '../components/OrderList';
import { useParams } from "next/navigation";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Icon } from "@iconify/react";



export default function Trade() {
  const params = useParams();
  const bunnyName = params.bunnyName as string;
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(123);
  const [activeTab, setActiveTab] = useState('매수');
  const [activeOrderTab, setActiveOrderTab] = useState('오더');
  const [selectedPercentage, setSelectedPercentage] = useState('100%'); 

  const handleHeartClick = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <Wrapper>
      <Header />
      <Container>
        <LayoutGrid>
          <TopLeftCard>
            <HeartSection>
              <HeartButton onClick={handleHeartClick} $isLiked={isLiked}>
                <Heart size={20} fill={isLiked ? "#ff4757" : "none"} color={isLiked ? "#ff4757" : "#333"} />
              </HeartButton>
              <HeartCount>{likeCount}</HeartCount>
            </HeartSection>
            <TopCardContent>
              <ProfileSection>
                <Avatar>
                  <img src="/images/login/personalProfile.png" alt="Profile" />
                </Avatar>
                <ProfileInfo>
                  <Name>GOOD-RELATION</Name>
                  <KoreanName>황호연</KoreanName>
                  <SocialLinks>
                    <SocialLink>
                      <img src="/images/login/github.png" alt="GitHub" />
                    </SocialLink>
                    <SocialLink>
                      <img src="/images/personal/publish/youtube.png" alt="YouTube" />
                    </SocialLink>
                    <SocialLink>
                      <img src="/images/personal/publish/instagram.png" alt="Instagram" />
                    </SocialLink>
                    <SocialLink>
                      <img src="/images/personal/publish/velog.png" alt="Velog" />
                    </SocialLink>
                  </SocialLinks>
                </ProfileInfo>
              </ProfileSection>
            </TopCardContent>
          </TopLeftCard>
          
          <MiddleLeftCard>
            <CategorySection>
              <CategoryItem>
                <CategoryIcon>
                  <img src="/images/trade/frontend.png" alt="Frontend" />
                </CategoryIcon>
                <CategoryLabel>직군</CategoryLabel>
                <CategoryValue>프론트엔드</CategoryValue>
              </CategoryItem>
              <CategoryItem>
                <CategoryIcon>
                  <img src="/images/trade/unique.png" alt="Unique" />
                </CategoryIcon>
                <CategoryLabel>버니 유형</CategoryLabel>
                <CategoryValue>희소 자산형</CategoryValue>
              </CategoryItem>
              <CategoryItem>
                <CategoryIcon>
                  <img src="/images/trade/growth.png" alt="Growth" />
                </CategoryIcon>
                <CategoryLabel>개발자 유형</CategoryLabel>
                <CategoryValue>성장형</CategoryValue>
              </CategoryItem>
            </CategorySection>
          </MiddleLeftCard>
          
          <BottomLeftCard>
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
          </BottomLeftCard>
          
          <RightCard>
            <MainContent>
              <LeftSection>
                <TopRow>
                  <TopLeftBlock>
                    <PentagonChart data={[
                        { value: 80, name: 'A' },
                        { value: 60, name: 'B' },
                        { value: 70, name: 'C' },
                        { value: 60, name: 'D' },
                        { value: 50, name: 'E' }
                      ]} />
                  </TopLeftBlock>
                  <TopRightBlock>
                    <DashboardContent>
                      <MainValue>120,000</MainValue>
                      <StatusDot />
                      <ChangeInfo>
                        <ChangeValue>500</ChangeValue>
                        <ChangePercentage>(+50.00%)</ChangePercentage>
                        <ChangeArrow>▲</ChangeArrow>
                      </ChangeInfo>
                    </DashboardContent>
                  </TopRightBlock>
                </TopRow>
                <BottomLeftBlock>
                  <Chart />
                </BottomLeftBlock>
              </LeftSection>
              
              <RightSection>
                <RightTopSection>
                  <TabContainer>
                    <TabButton 
                      $active={activeTab === '매수'} 
                      $type="buy"
                      onClick={() => setActiveTab('매수')}
                    >
                      매수
                    </TabButton>
                    <TabButton 
                      $active={activeTab === '매도'} 
                      $type="sell"
                      onClick={() => setActiveTab('매도')}
                    >
                      매도
                    </TabButton>
                  </TabContainer>
                  <TradeArea>
                    <OrderForm>
                      <OrderRow>
                        <OrderLabel>주문 가능</OrderLabel>
                        <OrderValue>C 200,000,000</OrderValue>
                      </OrderRow>
                      
                      <OrderRow>
                        <OrderLabel>주문 수량</OrderLabel>
                        <OrderInput>
                          <input type="text" placeholder="0" />
                          <span>BNY</span>
                        </OrderInput>
                      </OrderRow>
                      
                      <OrderRow>
                        <OrderLabel>{activeTab === '매수' ? '매수 가격' : '매도 가격'}</OrderLabel>
                        <OrderInput>
                          <input type="text" placeholder="0" />
                          <span>C</span>
                        </OrderInput>
                      </OrderRow>
                      
                      <PercentageButtons>
                        <PercentageButton 
                          $active={selectedPercentage === '10%'}
                          onClick={() => setSelectedPercentage('10%')}
                        >
                          10%
                        </PercentageButton>
                        <PercentageButton 
                          $active={selectedPercentage === '20%'}
                          onClick={() => setSelectedPercentage('20%')}
                        >
                          20%
                        </PercentageButton>
                        <PercentageButton 
                          $active={selectedPercentage === '50%'}
                          onClick={() => setSelectedPercentage('50%')}
                        >
                          50%
                        </PercentageButton>
                        <PercentageButton 
                          $active={selectedPercentage === '100%'}
                          onClick={() => setSelectedPercentage('100%')}
                        >
                          100%
                        </PercentageButton>
                      </PercentageButtons>
                      
                      <OrderRow>
                        <OrderLabel>주문 총액</OrderLabel>
                        <OrderValue>200,000,000 C</OrderValue>
                      </OrderRow>
                      
                      <ActionButtons>
                        <Button variant="secondary" size="small">초기화</Button>
                        <Button variant="primary" size="small">{activeTab === '매수' ? '매수하기' : '매도하기'}</Button>
                      </ActionButtons>
                    </OrderForm>
                  </TradeArea>
                </RightTopSection>
                
                <RightBottomSection>
                  <OrderTabContainer>
                    <OrderTabButton 
                      $active={activeOrderTab === '오더'}
                      onClick={() => setActiveOrderTab('오더')}
                    >
                      오더
                    </OrderTabButton>
                    <OrderTabButton 
                      $active={activeOrderTab === '오더 리스트'}
                      onClick={() => setActiveOrderTab('오더 리스트')}
                    >
                      오더 리스트
                    </OrderTabButton>
                  </OrderTabContainer>
                  <OrderArea>
                    <OrderList />
                  </OrderArea>
                </RightBottomSection>
              </RightSection>
            </MainContent>
          </RightCard>
        </LayoutGrid>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Container = styled.div`
  margin-top: 8rem;
  padding: 1.25rem;
`;

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 22rem 1fr;
  grid-template-rows: 12.5rem 9.375rem 23.75rem;
  gap: 1.25rem;
  max-width: 90rem;
  margin: 0 auto;
  height: 48rem;
`;

const TopLeftCard = styled.div`
  background: rgba(3, 29, 49, 0.43);
  border-radius: 0.75rem;
  padding: 1rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  position: relative;
`;

const TopCardContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const Avatar = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  text-align: center;
`;

const Name = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  font-family: rockstar;
  margin: 0;
`;

const KoreanName = styled.p`
  font-size: 1rem;
  color: #ffffff;
  margin: 0;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SocialLink = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.25rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HeartSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  position: absolute;
  top: -0.75rem;
  left: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const HeartButton = styled.button<{ $isLiked: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  ${({ $isLiked }) => $isLiked && `
    animation: sparkle 0.6s ease-in-out;
  `}
  
  @keyframes sparkle {
    0% { transform: scale(1); }
    25% { transform: scale(1.3) rotate(5deg); }
    50% { transform: scale(1.2) rotate(-5deg); }
    75% { transform: scale(1.1) rotate(2deg); }
    100% { transform: scale(1) rotate(0deg); }
  }
`;

const HeartCount = styled.span`
  font-size: 0.875rem;
  font-weight: bold;
  color: #333;
`;

const MiddleLeftCard = styled.div`
  background-color: rgba(184, 209, 241, 0.17);
  border-radius: 1.25rem;
  grid-column: 1;
  grid-row: 2;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BottomLeftCard = styled.div`
  background-color: rgba(184, 209, 241, 0.17);
  border-radius: 1.25rem;
  grid-column: 1;
  grid-row: 3;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow: hidden;
`;

const CategorySection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  height: 100%;
`;

const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  flex: 1;
  text-align: center;
`;

const CategoryIcon = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const CategoryLabel = styled.span`
  font-size: 0.75rem;
  color: #000;
  font-weight: 400;
`;

const CategoryValue = styled.span`
  font-size: 12px;
  font-weight: 900;
  color: #ffa500;
  text-shadow: 1px 1px 2px rgba(251, 201, 94, 0.25);
`;

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

const RightCard = styled.div`
  background-color: rgba(184, 209, 241, 0.17);
  border-radius: 1.25rem;
  grid-column: 2;
  grid-row: 1 / 4;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FrameLabel = styled.div`
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  font-weight: bold;
  flex: 1;
  text-align: center;
`;

const DashboardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

const MainValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: white;
  margin-bottom: 0.5rem;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #FFD700;
  border-radius: 50%;
  margin-bottom: 0.5rem;
`;

const ChangeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`;

const ChangeValue = styled.span`
  font-size: 0.8rem;
  color: #ff4444;
  font-weight: bold;
`;

const ChangePercentage = styled.span`
  font-size: 0.8rem;
  color: #ff4444;
  font-weight: bold;
`;

const ChangeArrow = styled.span`
  font-size: 0.8rem;
  color: #ff4444;
  font-weight: bold;
`;

const MainContent = styled.div`
  display: flex;
  gap: 1rem;
  flex: 1;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 0.7;
`;

const TopRow = styled.div`
  display: flex;
  gap: 1rem;
  flex: 1;
`;

const TopLeftBlock = styled.div`
  background: rgba(3, 29, 49, 0.43);
  border-radius: 0.75rem;
  padding: 1rem;
  flex: 2;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TopRightBlock = styled.div`
  background: rgba(3, 29, 49, 0.43);
  border-radius: 0.75rem;
  padding: 1rem;
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BottomLeftBlock = styled.div`
  background: rgba(234, 234, 234, 0.14);
  border-radius: 0.75rem;
  padding: 1rem;
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 0.4;
`;

const RightTopSection = styled.div`
  flex: 0.4;
  display: flex;
  flex-direction: column;
  border-radius: 0.75rem;
`;

const RightBottomSection = styled.div`
  flex: 0.6;
  display: flex;
  flex-direction: column;
  border-radius: 0.75rem;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 0.2rem;
  margin-bottom: 0;
`;

const TabButton = styled.button<{ $active: boolean; $type: 'buy' | 'sell' }>`
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: none;
  border-bottom: none;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 0.5rem 0.5rem 0 0;
  
  ${({ $active, $type }) => {
    if ($active) {
      return `
        background-color: rgba(252, 252, 252, 0.34);
        color: #FAE7C1;
      `;
    } else {
      return `
        background-color: rgba(255, 255, 255, 0.56);
        color: #E2E2E2;
        &:hover {
          background-color: rgba(255, 255, 255, 0.7);
        }
      `;
    }
  }}
`;

const OrderTabContainer = styled.div`
  display: flex;
  gap: 0.2rem;
  margin-bottom: 0;
`;

const OrderTabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: none;
  border-bottom: none;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 0.5rem 0.5rem 0 0;
  
  ${({ $active }) => 
    $active 
      ? `
        background-color: rgba(252, 252, 252, 0.34);
        color: #FAE7C1;
      `
      : `
        background-color: rgba(255, 255, 255, 0.56);
        color: #E2E2E2;
        &:hover {
          background-color: rgba(255, 255, 255, 0.7);
        }
      `
  }
`;

const TradeArea = styled.div`
  flex: 1;
  background: rgba(252, 252, 252, 0.34);
  border-radius: 0 0 0.75rem 0.75rem;
  padding: 1rem;
`;

const OrderArea = styled.div`
  flex: 1;
  background: rgba(252, 252, 252, 0.34);
  border-radius: 0 0 0.75rem 0.75rem;
  padding: 1rem;
`;

const OrderForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
`;

const OrderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OrderLabel = styled.span`
  font-size: 0.9rem;
  font-weight: 800;
  color: #333;
`;

const OrderValue = styled.span`
  font-size: 0.9rem;
  color: #FAE7C1;
  font-weight: 700;
`;

const OrderInput = styled.div`
  display: flex;
  align-items: center;
  background: #f0f8ff;
  border-radius: 0.5rem;
  padding: 0.5rem;
  min-width: 120px;
  
  input {
    border: none;
    background: transparent;
    outline: none;
    flex: 1;
    font-size: 0.9rem;
    color: #333;
    
    &::placeholder {
      color: #999;
    }
  }
  
  span {
    font-size: 0.8rem;
    color: #666;
    margin-left: 0.5rem;
  }
`;

const PercentageButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

const PercentageButton = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  
  ${({ $active }) => 
    $active 
      ? `
        background-color: rgba(16, 145, 255, 0.9);
      `
      : `
        background-color: rgba(27, 101, 164, 1);
        &:hover {
          background-color: rgba(16, 145, 255, 0.7);
        }
      `
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;
