"use client";
import styled from "styled-components";
import { Bunny } from "../../../_store/bunnyStore";
import { bunnyTypeValidate, positionValidate, developerTypeValidate, getPositionIcon, getDeveloperTypeIcon, getBunnyTypeIcon } from "../utils/bunnyInfoMapper";

interface BunnyTypeProps {
  bunny: Bunny;
}

export default function BunnyType({ bunny }: BunnyTypeProps) {
  return (
    <CategorySection>
      <CategoryItem>
        <CategoryIcon>
          <img src={getPositionIcon(bunny.position)} alt="Position" />
        </CategoryIcon>
        <CategoryLabel>직군</CategoryLabel>
        <CategoryValue>{positionValidate(bunny.position)}</CategoryValue>
      </CategoryItem>
      <CategoryItem>
        <CategoryIcon>
          <img src={getBunnyTypeIcon(bunny)} alt="Bunny Type" />
        </CategoryIcon>
        <CategoryLabel>버니 유형</CategoryLabel>
        <CategoryValue>{bunnyTypeValidate(bunny)}</CategoryValue>
      </CategoryItem>
      <CategoryItem>
        <CategoryIcon>
          <img src={getDeveloperTypeIcon(bunny.developer_type)} alt="Developer Type" />
        </CategoryIcon>
        <CategoryLabel>개발자 유형</CategoryLabel>
        <CategoryValue>{developerTypeValidate(bunny.developer_type)}</CategoryValue>
      </CategoryItem>
    </CategorySection>
  );
}


const CategorySection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  height: 100%;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.25rem;
  }
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
  
  @media (max-width: 768px) {
    gap: 0.4rem;
    padding: 0.6rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.3rem;
    padding: 0.4rem;
  }
`;

const CategoryIcon = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  @media (max-width: 480px) {
    width: 1.2rem;
    height: 1.2rem;
  }
  
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
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.65rem;
  }
`;

const CategoryValue = styled.span`
  font-size: 12px;
  font-weight: 900;
  color: #ffa500;
  text-shadow: 1px 1px 2px rgba(251, 201, 94, 0.25);
  
  @media (max-width: 768px) {
    font-size: 11px;
  }
  
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;
