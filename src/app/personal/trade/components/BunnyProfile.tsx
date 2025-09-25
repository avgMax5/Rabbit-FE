"use client";
import styled from "styled-components";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

import { Bunny, useBunnyStore } from "../../../_store/bunnyStore";
import { getBunnyContext, postLike, deleteLike } from "../../../_api/bunnyAPI";
import { getBadgeIcon, getLinkIcon } from "../utils/bunnyInfoMapper";

interface ProfileProps {
  bunny: Bunny;
}

interface BunnyContext {
  is_liked: boolean;
  buyable_amount: number;
  sellable_quantity: number;
}

export default function Profile({ bunny }: ProfileProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updateBunnyLikeCount, getBunnyLikeCount } = useBunnyStore();

  useEffect(() => {
    const fetchBunnyContext = async () => {
      try {
        const context = await getBunnyContext(bunny.bunny_name);
        setIsLiked(context.is_liked);
      } catch (error) {
        console.error('Bunny context 가져오기 실패:', error);
      }
    };

    fetchBunnyContext();
  }, [bunny.bunny_name]);

  const handleHeartClick = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      if (isLiked) {
        await deleteLike(bunny.bunny_name);
        setIsLiked(false);
        updateBunnyLikeCount(bunny.bunny_name, -1); // bunnyStore에서 좋아요 수 감소
      } else {
        await postLike(bunny.bunny_name);
        setIsLiked(true);
        updateBunnyLikeCount(bunny.bunny_name, 1); // bunnyStore에서 좋아요 수 증가
      }
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <TopCardContent>
        <ProfileSection>
          <HeartSection>
            <HeartButton onClick={handleHeartClick} $isLiked={isLiked} disabled={isLoading}>
              <Heart size={20} fill={isLiked ? "#ff4757" : "none"} color={isLiked ? "#ff4757" : "#333"} />
            </HeartButton>
            <HeartCount>{getBunnyLikeCount(bunny.bunny_name)}</HeartCount>
          </HeartSection>
          
          {/* 뱃지 섹션 추가 */}
          {bunny.badges && bunny.badges.length > 0 && (
            <BadgeSection>
              {bunny.badges.map((badge, index) => {
                const badgeIcon = getBadgeIcon([badge]);
                return badgeIcon ? (
                  <Badge key={index}>
                    <img src={badgeIcon} alt={badge} />
                  </Badge>
                ) : null;
              })}
            </BadgeSection>
          )}
          
          <Avatar>
            <img src="/images/login/personalProfile.png" alt="Profile" />
          </Avatar>
          <ProfileInfo>
            <BunnyName>{bunny.bunny_name}</BunnyName>
            <KoreanName>{bunny.user_name}</KoreanName>
            <SocialLinks>
              <SocialLink>
                <img src={getLinkIcon("github")} alt="GitHub" />
              </SocialLink>
              <SocialLink>
                <img src={getLinkIcon("youtube")} alt="YouTube" />
              </SocialLink>
              <SocialLink>
                <img src={getLinkIcon("instagram")} alt="Instagram" />
              </SocialLink>
              <SocialLink>
                <img src={getLinkIcon("velog")} alt="Velog" />
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
  left: -30%;
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
  
  &:hover:not(:disabled) {
    transform: scale(1.1);
  }
  
  &:active:not(:disabled) {
    transform: scale(0.95);
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
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
  right: -60%;
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
  background: #8499B5;

  img {
    width: 80%;
    height: 80%;
    object-fit: cover;
  }
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

const BunnyName = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  font-family: rockstar;
  color: #FBC95E;
  text-shadow: 0px 5px 5px rgba(254, 226, 167, 0.25);
  margin: 0;
`;

const KoreanName = styled.p`
  font-size: 1rem;
  color: #FBC95E;
  font-weight: 700;
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

