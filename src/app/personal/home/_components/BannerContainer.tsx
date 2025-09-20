import styled from "styled-components";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

function Banner() {
    const slides = [
        () => (
            <BannerContent key="slide1">
                <Slogan>
                    <div>JUMP</div>
                    <div style={{ color: "#338ADA" }}>WITH</div>
                    <span
                        style={{
                            color: "rgba(51, 138, 218, 0.73)",
                        }}
                    >
                        YOUR
                    </span>
                    <span>BUNNY</span>
                </Slogan>
                <Rocket src={"/images/personal/home/main_rocket.png"} />
            </BannerContent>
        ),

        () => (
            <BannerContent key="slide2">
                <Slogan>
                    <div>2</div>
                    <div style={{ color: "#338ADA" }}>WITH</div>
                    <span
                        style={{
                            color: "rgba(51, 138, 218, 0.73)",
                        }}
                    >
                        YOUR
                    </span>
                    <span>BUNNY</span>
                </Slogan>
            </BannerContent>
        ),

        () => (
            <BannerContent key="slide3">
                <Slogan>
                    <div>3</div>
                    <div style={{ color: "#338ADA" }}>WITH</div>
                    <span
                        style={{
                            color: "rgba(51, 138, 218, 0.73)",
                        }}
                    >
                        YOUR
                    </span>
                    <span>BUNNY</span>
                </Slogan>
            </BannerContent>
        ),
    ];

    return (
        <Wrapper>
            <Swiper
                spaceBetween={20}
                pagination={{
                    clickable: true,
                    el: ".custom-pagination",
                }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                modules={[Pagination, Autoplay]}
                observer={true}
                observeParents={true}
                slidesPerView={1}
                style={{
                    width: "1200px",
                    height: "100%",
                    overflow: "visible",
                }}
            >
                {slides.map((Slide, i) => (
                    <SwiperSlide key={i} style={{ width: "100%" }}>
                        <Slide />
                    </SwiperSlide>
                ))}
            </Swiper>

            <CustomPagination className="custom-pagination" />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: 31rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    overflow: visible;
    box-sizing: border-box;
`;

const Rocket = styled.img`
    position: absolute;
    top: -6rem;
    right: 0rem;
    z-index: 999;
    width: 33rem;
    height: auto;
`;

const Slogan = styled.div`
    position: absolute;
    top: -3rem;
    left: 4rem;
    width: 30rem;
    color: rgba(255, 255, 255, 0.81);
    text-shadow: 4.315px 4.315px 8px #738398;
    font-family: var(--font-rockstar);
    font-size: 115.055px;
`;

const BannerContent = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    border-radius: 16px;
    background: linear-gradient(
        268deg,
        rgba(66, 0, 189, 0.64) -2.14%,
        rgba(0, 86, 205, 0.72) 37.22%,
        rgba(184, 214, 255, 0.72) 76.57%,
        rgba(224, 237, 255, 0.72) 99.55%
    );
    box-shadow: -3px 0 10px 0 rgba(26, 51, 123, 0.44) inset,
        3px 3px 10px 0 #9dbaff inset;
    filter: drop-shadow(-8px 8px 20px rgba(0, 0, 0, 0.27));
`;

const CustomPagination = styled.div`
    text-align: center;
    .swiper-pagination-bullet {
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
        background: #b6b6b6;
        opacity: 1;
    }

    .swiper-pagination-bullet-active {
        background: #ff8969;
    }
`;

export default Banner;
