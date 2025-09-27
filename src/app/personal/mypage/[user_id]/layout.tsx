"use client";
import Header from "@/app/_shared/components/Header";
import styled from "styled-components";
import Badges from "@/app/_shared/components/Badges";
import LikeBox from "@/app/_shared/components/LikeBox";
import Profile from "./_components/Profile";
import WithAuth from "@/app/_components/WithAuth";
import { useBunnyStore } from "@/app/_store/bunnyStore";
import { useUserStore } from "@/app/_store/userStore";
import StarryBackground from "@/app/_shared/components/StarryBackground";

interface MyPageLayoutProps {
    children: React.ReactNode;
}

interface DataType {
    like: number;
    badges: string[];
}

const getBadgeAndLike = (bunnyName: string) => {
    const bunny = useBunnyStore((state) =>
        state.bunnies.find((b) => b.bunny_name === bunnyName)
    );

    if (!bunny)
        return {
            like: 0,
            badges: [],
        };

    console.log(bunny, "bunny");

    return { like: bunny.like_count, badges: bunny.badges };
};

function MyPageLayout({ children }: MyPageLayoutProps) {
    const { user } = useUserStore();
    const bunnyName = user?.my_bunny_name ?? "";
    const bunnyProfile = user?.image;
    const data: DataType = getBadgeAndLike(bunnyName);

    return (
        <Wrapper>
            <Header />
            <Body>
                <ProfileLogoSection>
                    <Profile name={bunnyName} src={bunnyProfile} />
                </ProfileLogoSection>
                <MainSection>
                    <TopContainer>
                        <LikeBox like={data.like} />
                        <Badges badges={data.badges} />
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
    //max-width: 1280px;
    min-height: 100vh;
    background-image: url("/images/personal/shared/background.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    overflow: hidden;
`;

const Body = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 82%;
    max-width: 1220px;
    transform: translate(-50%, -50%);
    height: 100%;
    max-height: 680px;
    margin: 0 auto;
    margin-top: 24px;
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
    justify-content: end;
    align-items: center;
`;

const MainSection = styled.div`
    grid-column: 2;
    width: 100%;
    height: 100%;
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
    padding-top: 0.2rem;
    box-sizing: border-box;
    overflow: visible;
    grid-row: 2;
`;

const Rabbit = styled.img`
    position: absolute;
    bottom: -5rem;
    right: -3rem;
    width: 18rem;
    height: auto;
    z-index: 999;
`;

export default WithAuth(MyPageLayout);
