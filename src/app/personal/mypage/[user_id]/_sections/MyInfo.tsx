import { Certificate } from "crypto";
import styled from "styled-components";
import { handleMouseEnter, handleMouseLeave } from "../utils/mouse";

const Skills: string[] = [
    "HTML5",
    "CSS3",
    "JavaScript (ES6+)",
    "TypeScript",
    "React",
    "Next.js",
    "Vue.js",
    "Svelte / SvelteKit",
    "Node.js",
    "Express.js",
    "Spring Boot",
    "Django",
    "Flask",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Redis",
    "Docker",
    "Nginx",
    "AWS / GCP / Azure",
];

const MyData = {
    name: "홍민우",
    birthdate: "1999-11-19",
    link: [
        {
            link: "https://github.com/jjweidon",
            favicon: "https://github.com/jjweidon/favicon",
        },
        {
            link: "https://www.instagram.com/jwoong_8",
            favicon: "https://www.instagram.com/jwoong_8/favicon",
        },
    ],
    position: "BACKEND",
    education: [
        {
            school_name: "신한고등학교",
            status: "GRADUATED",
            major: "자연계",
            certificate_url: "https://example.com/certificate.pdf",
            start_date: "2020-09-01",
            end_date: "2023-06-30",
        },
        {
            school_name: "신한대학교",
            status: "ENROLLED",
            major: "컴퓨터공학과",
            certificate_url: "https://example.com/certificate.pdf",
            start_date: "2020-09-01",
            end_date: "2023-06-30",
        },
    ],
    career: [
        {
            company_name: "신한은행",
            status: "UNEMPLOYED",
            position: "마케터",
            certificate_url: "https://example.com/certificate.pdf",
            start_date: "2023-09-01",
            end_date: "2025-12-31",
        },
        {
            company_name: "신한DS",
            status: "EMPLOYED",
            position: "백엔드 엔지니어",
            certificate_url: "https://example.com/certificate.pdf",
            start_date: "2023-09-01",
            end_date: "2025-12-31",
        },
    ],
    certification: [
        {
            file: "https://fileurl.com",
            name: "정보처리기사",
            cdate: "2025-05-02",
        },
        {
            file: "https://fileurl.com",
            name: "SQLD",
            cdate: "2025-05-02",
        },
    ],
    skill: ["Java", "Javascript", "SpringBoot", "React"],
};

function MyInfo() {
    return (
        <>
            <Main>
                <InfoSection>
                    <ImgContainer>
                        <ProfileImg />
                        <EditBtn
                            src={"/images/personal/mypage/edit_img_btn.png"}
                        />
                    </ImgContainer>
                    <NameContainer></NameContainer>
                    <CoinContainer></CoinContainer>
                    <EmailContainer></EmailContainer>
                    <LinkContainer>
                        <Link>
                            <Favicon />
                            <URL />
                        </Link>
                    </LinkContainer>
                </InfoSection>
                <SpecSection>
                    <div>
                        <TitleText>스택</TitleText>
                        <PositionContainer>
                            <PositionBtn
                                onMouseEnter={(e) =>
                                    handleMouseEnter(
                                        {
                                            backgroundColor: "#fba57c",
                                            color: "#000",
                                        },
                                        e
                                    )
                                }
                                onMouseLeave={handleMouseLeave}
                            >
                                frontend
                            </PositionBtn>
                            <PositionBtn>backend</PositionBtn>
                            <PositionBtn>fullstack</PositionBtn>
                        </PositionContainer>
                    </div>
                    <div>
                        <TitleText>
                            <LeftDiv>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 38 38"
                                    fill="none"
                                >
                                    <path
                                        d="M7.91653 20.8684V25.3175C7.91653 26.4734 8.54987 27.55 9.5632 28.1042L17.4799 32.4267C18.4299 32.9492 19.5699 32.9492 20.5199 32.4267L28.4365 28.1042C29.4499 27.55 30.0832 26.4734 30.0832 25.3175V20.8684L20.5199 26.0934C19.5699 26.6159 18.4299 26.6159 17.4799 26.0934L7.91653 20.8684ZM17.4799 5.57336L4.13236 12.8567C3.03986 13.4584 3.03986 15.0417 4.13236 15.6434L17.4799 22.9267C18.4299 23.4492 19.5699 23.4492 20.5199 22.9267L33.2499 15.9759V25.3334C33.2499 26.2042 33.9624 26.9167 34.8332 26.9167C35.704 26.9167 36.4165 26.2042 36.4165 25.3334V15.1842C36.4165 14.5984 36.0999 14.0759 35.5932 13.7909L20.5199 5.57336C20.0521 5.32387 19.53 5.19336 18.9999 5.19336C18.4697 5.19336 17.9477 5.32387 17.4799 5.57336Z"
                                        fill="#149FAE"
                                    />
                                </svg>
                                학력
                            </LeftDiv>
                            <PlusBtn />
                        </TitleText>
                        <EducationContainer></EducationContainer>
                    </div>
                    <div>
                        <TitleText>경력</TitleText>
                        <CareerContainer></CareerContainer>
                    </div>
                    <div>
                        <TitleText>자격증</TitleText>
                        <CertificateContainer></CertificateContainer>
                    </div>
                    <div>
                        <TitleText>스택</TitleText>
                        <SkillsContainer>
                            {Skills.map((skill, i) => (
                                <Skill key={i}>{skill}</Skill>
                            ))}
                        </SkillsContainer>
                    </div>
                </SpecSection>
            </Main>
            <Bottom>
                <Guide>
                    <img src={"/images/personal/mypage/fly_rabbit.png"} />
                    <div>저장하기를 꼬옥 눌러주세요!</div>
                </Guide>
                <SaveBtn
                    onMouseEnter={(e) =>
                        handleMouseEnter(
                            { backgroundColor: "#fac150", color: "#000" },
                            e
                        )
                    }
                    onMouseLeave={handleMouseLeave}
                >
                    저장하기
                </SaveBtn>
            </Bottom>
        </>
    );
}

const Main = styled.div`
    width: 100%;
    height: 90%;
    padding: 0 0.2rem;
    display: grid;
    grid-template-columns: 3fr 5fr;
    gap: 0.4rem;
    box-sizing: border-box;
`;
const TitleText = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.4rem;
    color: #fbc95e;
    font-size: 16px;
    font-weight: 700;
`;

const LeftDiv = styled.div`
    display: flex;
    gap: 0.2rem;
    align-items: center;
`;

const PlusBtn = styled.div`
    background-image: url("/images/personal/mypage/plus_btn.png");
    background-repeat: no-repeat;
    background-size: contain;
    width: 1.2rem;
    height: 1.2rem;
`;

//나의 정보
const Section = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.16);
    box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.25);
`;
const InfoSection = styled(Section)`
    display: grid;
    grid-template-rows: 4fr 2rem 2rem 2rem 4fr;
`;
const ImgContainer = styled.div`
    position: relative;
    width: 10.5rem;
    height: 10.5rem;
`;
const ProfileImg = styled.div`
    width: 10rem;
    height: 10rem;
    background: #d9d9d9;
    background-image: url;
`;
const EditBtn = styled.img`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 1.5rem;
    height: 1.5rem;
`;
const InfoBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 15px;
    flex-shrink: 0;
    background: rgba(255, 255, 255, 0.13);
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.25);
`;
const NameContainer = styled(InfoBox)``;
const CoinContainer = styled(InfoBox)``;
const EmailContainer = styled(InfoBox)``;
const LinkContainer = styled.div`
    background-color: aliceblue;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;
const Link = styled.div`
    width: 100%;
    height: 2rem;
    background-color: #090;
`;
const Favicon = styled.img``;
const URL = styled.div``;
// 나의 스펙
const SpecSection = styled(Section)`
    width: 100%;
    height: 100%;
    display: grid;
    gap: 1rem;
    overflow-y: auto;
`;

const PositionContainer = styled.div`
    display: flex;
    gap: 1rem;
    width: 100%;
    height: 3rem;
`;

const PositionBtn = styled.div`
    width: 5rem;
    height: 2rem;
    border-radius: 3px;
    text-align: center;
    line-height: 2rem;
    background-color: #a7a7a7;
`;
const Array = styled.div`
    width: 100%;
    height: 10rem;
    background-color: #679;
`;
const EducationContainer = styled(Array)``;
const CareerContainer = styled(Array)``;
const CertificateContainer = styled(Array)``;
const SkillsContainer = styled.div`
    width: 100%;
    height: 6rem;
    display: flex;
    gap: 0.3rem;
    flex-wrap: wrap;
`;
const Skill = styled.div`
    width: auto;
    height: 1.5rem;
    border-radius: 4px;
    padding: 0 0.5rem;
    text-align: center;
    line-height: 1.5rem;
    background-color: #aeaeae;
    color: #ffea9c;

    font-size: 12px;
    font-weight: 500;
`;
const Bottom = styled.div`
    width: 100%;
    height: 2.8rem;
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
`;
const Guide = styled.div`
    width: 14rem;
    height: 100%;
    display: flex;
    gap: 0.5rem;
    align-items: center;

    & div {
        color: #fff;
        font-size: 13px;
        font-weight: 700;
    }

    & img {
        width: auto;
        height: 98%;
    }
`;
const SaveBtn = styled.div`
    width: 8rem;
    height: 2.2rem;
    text-align: center;
    line-height: 2.2rem;
    border-radius: 16.576px;
    background-color: rgba(254, 226, 167, 0.88);
    box-shadow: -1.913px -3.825px 6.376px 0 rgba(255, 177, 14, 0.84) inset,
        5.738px 3.825px 6.376px 0 #ffefce inset;
`;

export default MyInfo;
