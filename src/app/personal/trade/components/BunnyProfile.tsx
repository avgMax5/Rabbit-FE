"use client";
import styled from "styled-components";
import { Heart } from "lucide-react";
import { useState } from "react";

export default function Profile() {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(123);

  const handleHeartClick = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <>

      <TopCardContent>
        <ProfileSection>
          <HeartSection>
            <HeartButton onClick={handleHeartClick} $isLiked={isLiked}>
              <Heart size={20} fill={isLiked ? "#ff4757" : "none"} color={isLiked ? "#ff4757" : "#333"} />
            </HeartButton>
            <HeartCount>{likeCount}</HeartCount>
          </HeartSection>
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
    </>
  );
}


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
  position: relative;
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
  top: -2rem;
  left: 0%;
  transform: translateX(-50%);
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

const BadgeSection = styled.div`
  display: flex;
  gap: 0.5rem;
  position: absolute;
  top: -0.75rem;
  right: 1.5rem;
  z-index: 10;
`;

const Badge = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
