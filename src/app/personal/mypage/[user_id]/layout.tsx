"use client";
import Header from "@/app/_shared/components/Header";
import styled from "styled-components";
import Badges from "@/app/_shared/components/Badges";
import LikeBox from "@/app/_shared/components/LikeBox";
import Profile from "./_components/Profile";

interface MyPageLayoutProps {
    children: React.ReactNode;
}

function MyPageLayout({ children }: MyPageLayoutProps) {
    return (
        <Wrapper>
            <Header />
            <Body>
                <ProfileLogoSection>
                    <SmallLogo src={"/images/personal/shared/small_logo.png"} />
                    <Profile />
                </ProfileLogoSection>
                <MainSection>
                    <TopContainer>
                        <LikeBox />
                        <Badges />
                    </TopContainer>
                    <Main>{children}</Main>
                </MainSection>
            </Body>
            <Rabbit src="/images/personal/shared/background_rabbit.png" />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: relative;
    min-height: 100vh;
    background-image: url("/images/personal/shared/background.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    overflow: hidden;
`;

const Body = styled.div`
    position: relative;
    width: 82%;
    height: 83vh;
    margin: 0 auto;
    margin-top: 10vh;
    box-sizing: border-box;
    padding: 1.2rem;
    display: grid;
    grid-template-columns: 0.6fr 8fr;
    gap: 0.3rem;
    flex-shrink: 0;
    border-radius: 20px;
    background: radial-gradient(
        237.26% 135.97% at 1.21% 0%,
        rgba(3, 29, 49, 0.4) 0%,
        rgba(255, 255, 255, 0.1) 100%
    );
    box-shadow: 3px 4px 4px 0 rgba(179, 179, 179, 0.59) inset;
    backdrop-filter: blur(25px);
`;

const ProfileLogoSection = styled.div`
    grid-column: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;
const SmallLogo = styled.img`
    width: 2rem;
    height: auto;
`;

const MainSection = styled.div`
    grid-column: 2;
    margin-top: 1rem;
    width: 100%;
    height: 78vh;
    //max-height: 42rem;
    display: grid;
    grid-template-rows: 2.3rem 1fr;
    gap: 1rem;
    box-sizing: border-box;
    padding: 1rem;
    flex-shrink: 0;
    border-radius: 1rem;
    background: rgba(165, 155, 155, 0.31);
    box-shadow: 4px 4px 10px 0 rgba(169, 189, 216, 0.3);
`;

const TopContainer = styled.div`
    width: 100%;
    height: 2.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    grid-row: 1;
`;

const Main = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    grid-row: 2;
    overflow: hidden;
`;

const Rabbit = styled.img`
    position: absolute;
    bottom: -5rem;
    right: -3rem;
    width: 18rem;
    height: auto;
    z-index: 999;
`;
export default MyPageLayout;
