"use client";
import styled from "styled-components";

export default function BunnyType() {
  return (
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
  );
}


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
