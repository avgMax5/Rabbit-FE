'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

interface SloganData {
  id: number;
  mainText: string;
  subText: string;
  buttonText: string;
}

interface BannerContainerProps {
  sloganData: SloganData[];
}

function BannerContainer({ sloganData }: BannerContainerProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    setCurrentSlideIndex(swiper.realIndex);
  };

  return (
    <Container>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ 
          clickable: true,
          el: '.custom-pagination'
        }}
        modules={[Autoplay, Pagination]}
        loop={true}
        onSlideChange={handleSlideChange}
        style={{ width: '100%', height: '100%' }}
      >
        {sloganData.map((slogan) => (
          <SwiperSlide key={slogan.id}>
            <Slogan>
              <SloganText>{slogan.mainText}</SloganText>
              <SloganDesc>{slogan.subText}</SloganDesc>
            </Slogan>
          </SwiperSlide>
        ))}
      </Swiper>
      <CustomPagination className="custom-pagination" />
    </Container>
  );
}

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 18.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2;
    gap: 2rem;
`;

const Slogan = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    z-index: 2;
    width: 100%;
    height: 100%;
`;

const SloganText = styled.div`
    font-size: 35px;
    font-weight: 800;
    color: #DEDCDC;
    margin: 0;
    white-space: nowrap;
`;

const SloganDesc = styled.div`
    font-size: 72px;
    font-weight: 800;
`;

const CustomPagination = styled.div`
    position: absolute;
    bottom: 5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    
    .swiper-pagination-bullet {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        opacity: 1;
        margin: 0 0.375rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .swiper-pagination-bullet-active {
        background: #f8b2a3;
        transform: scale(1.2);
    }
`;


export default BannerContainer;
