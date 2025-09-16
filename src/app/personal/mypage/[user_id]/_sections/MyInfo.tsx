import { Certificate } from "crypto";
import styled from "styled-components";
import { handleEnterBackground, handleLeaveBackground } from "../_utils/mouse";
import { Icon } from "@iconify/react";

const Skills: string[] = [
    "HTML5",
    "CSS3",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Vue.js",
    "Svelte / SvelteKit",
    "Node.js",
    "Java",
    "SpringBoot",
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
            certification_id: "01HZXCERTIFICATION00000000000000001",
            certificate_url: "https://fileurl.com",
            name: "정보처리기사",
            ca: "에이비지맥스",
            cdate: "2015-09-01",
        },
        {
            certification_id: "01HZXCERTIFICATION00000000000000002",
            certificate_url: "https://fileurl.com",
            name: "SQLD",
            ca: "에이비지맥스",
            cdate: "2015-09-02",
        },
    ],
    skill: ["Java", "JavaScript", "SpringBoot", "React"],
};

function MyInfo() {
    const infoField = [
        { value: "이름", disabled: true },
        { value: "코인명", disabled: false },
        { value: "이메일", disabled: false },
    ];

    const stackData = ["frontend", "backend", "fullstack"];

    const specField = {
        education: [
            "학교명",
            "상태",
            "전공",
            "입학일",
            "졸업일",
            "증명서 파일",
        ],
        career: ["회사명", "상태", "전공", "입사일", "퇴사일", "증명서 파일"],
        certification: ["자격증명", "발급기관", "발급일자", "자격증 파일"],
    };

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

                    {/* 이름 코인명 이메일 받기 */}
                    <InfoForm>
                        {infoField.map((info, i) => (
                            <InfoRow key={i}>
                                <TitleText>{info.value}</TitleText>
                                <NameInput disabled={info.disabled} />
                            </InfoRow>
                        ))}
                    </InfoForm>

                    {/* 링크 받기 */}
                    <FormTitle>
                        <LeftDiv>
                            <Icon
                                icon="ic:round-school"
                                color="#149FAE"
                                width={"1.6rem"}
                            />
                            링크
                        </LeftDiv>
                        <PlusBtn />
                    </FormTitle>
                    <LinkForm>
                        {MyData.link.map((link, i) => (
                            <LinkRow key={i}>
                                <Favicon />
                                <LinkInput placeholder={link.link} />
                            </LinkRow>
                        ))}
                        <LinkRow>
                            <Favicon />
                            <LinkInput />
                        </LinkRow>
                        <LinkRow>
                            <Favicon />
                            <LinkInput />
                        </LinkRow>
                        <LinkRow>
                            <Favicon />
                            <LinkInput />
                        </LinkRow>
                    </LinkForm>
                </InfoSection>

                <SpecSection>
                    <div>
                        <FormTitle>
                            <LeftDiv>
                                <Icon
                                    icon="ic:round-school"
                                    color="#149FAE"
                                    width={"1.6rem"}
                                />
                                스택
                            </LeftDiv>
                        </FormTitle>
                        <PositionContainer>
                            {stackData.map((stack, i) => (
                                <PositionBtn
                                    key={i}
                                    onMouseEnter={(e) =>
                                        handleEnterBackground(
                                            {
                                                backgroundColor: "#fba57c",
                                                color: "#000",
                                            },
                                            e
                                        )
                                    }
                                    onMouseLeave={handleLeaveBackground}
                                >
                                    {stack}
                                </PositionBtn>
                            ))}
                        </PositionContainer>
                    </div>
                    <div>
                        <FormTitle>
                            <LeftDiv>
                                <Icon
                                    icon="ic:round-school"
                                    color="#149FAE"
                                    width="1.7rem"
                                />
                                학력
                            </LeftDiv>
                            <PlusBtn />
                        </FormTitle>
                        <EducationContainer>
                            <FieldContainer
                                $fieldNum={specField.education.length}
                            >
                                {specField.education.map((edu, i) => (
                                    <Field key={i}>{edu}</Field>
                                ))}
                            </FieldContainer>
                            <SpecForm>
                                {MyData.education.map((data, i) => (
                                    <SpecRow
                                        key={i}
                                        $fieldNum={specField.education.length}
                                    >
                                        <div>{data.school_name}</div>
                                        <div>{data.status}</div>
                                        <div>{data.major}</div>
                                        <div>{data.start_date}</div>
                                        <div>{data.end_date}</div>
                                        <div>{data.certificate_url}</div>
                                    </SpecRow>
                                ))}
                            </SpecForm>
                        </EducationContainer>
                    </div>
                    <div>
                        <FormTitle>
                            <LeftDiv>
                                <Icon
                                    icon="ic:round-school"
                                    color="#149FAE"
                                    width="1.7rem"
                                />
                                경력
                            </LeftDiv>
                            <PlusBtn />
                        </FormTitle>
                        <CareerContainer>
                            <FieldContainer $fieldNum={specField.career.length}>
                                {specField.career.map((edu, i) => (
                                    <Field key={i}>{edu}</Field>
                                ))}
                            </FieldContainer>
                            <SpecForm>
                                {MyData.career.map((data, i) => (
                                    <SpecRow
                                        key={i}
                                        $fieldNum={specField.career.length}
                                    >
                                        <div>{data.company_name}</div>
                                        <div>{data.status}</div>
                                        <div>{data.position}</div>
                                        <div>{data.start_date}</div>
                                        <div>{data.end_date}</div>
                                        <div>{data.certificate_url}</div>
                                    </SpecRow>
                                ))}
                            </SpecForm>
                        </CareerContainer>
                    </div>
                    <div>
                        <FormTitle>
                            <LeftDiv>
                                <Icon
                                    icon="ic:round-school"
                                    color="#149FAE"
                                    width="1.7rem"
                                />
                                자격증
                            </LeftDiv>
                            <PlusBtn />
                        </FormTitle>
                        <CertificateContainer>
                            <FieldContainer
                                $fieldNum={specField.certification.length}
                            >
                                {specField.certification.map((edu, i) => (
                                    <Field key={i}>{edu}</Field>
                                ))}
                            </FieldContainer>
                            <SpecForm>
                                {MyData.certification.map((data, i) => (
                                    <SpecRow
                                        key={i}
                                        $fieldNum={
                                            specField.certification.length
                                        }
                                    >
                                        <div>{data.name}</div>
                                        <div>{data.ca}</div>
                                        <div>{data.cdate}</div>
                                        <div>{data.certificate_url}</div>
                                    </SpecRow>
                                ))}
                            </SpecForm>
                        </CertificateContainer>
                    </div>
                    <div>
                        <FormTitle>
                            <LeftDiv>
                                <Icon
                                    icon="ic:round-school"
                                    color="#149FAE"
                                    width="1.7rem"
                                />
                                스택
                            </LeftDiv>
                        </FormTitle>
                        <SkillsContainer>
                            {Skills.map((skill, i) => (
                                <Skill
                                    key={i}
                                    style={{
                                        backgroundColor: MyData.skill.includes(
                                            skill
                                        )
                                            ? "#FFAE3C"
                                            : "#d1d1d1",
                                        color: MyData.skill.includes(skill)
                                            ? "#000"
                                            : "#423b24",
                                    }}
                                >
                                    {skill}
                                </Skill>
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
                        handleEnterBackground(
                            { backgroundColor: "#fac150", color: "#000" },
                            e
                        )
                    }
                    onMouseLeave={handleLeaveBackground}
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
    gap: 1.2rem;
    box-sizing: border-box;
`;

const TitleText = styled.div`
    display: flex;
    justify-content: end;
    width: 3rem;
    color: #fbc95e;
    font-weight: 700;
`;

const FormTitle = styled.div`
    display: flex;
    gap: 0.5rem;
    height: 2.2rem;
    color: #fbc95e;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.4rem;
    font-size: 18px;
`;

const LeftDiv = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
`;

const PlusBtn = styled.div`
    background-image: url("/images/personal/mypage/plus_btn.png");
    background-repeat: no-repeat;
    background-size: contain;
    width: 1.8rem;
    height: 1.8rem;
`;

//나의 정보
const Section = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem;
    border-radius: 15px;
    background: rgba(11, 8, 63, 0.15);
    box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.25);
`;

const InfoSection = styled(Section)`
    display: grid;
    /* gap: 0.8rem; */
    grid-template-rows: 10.5rem 0.5fr 0.1fr 1fr;
`;

const ImgContainer = styled.div`
    position: relative;
    width: 10rem;
    height: 10rem;
`;

const ProfileImg = styled.div`
    width: 9.5rem;
    height: 9.5rem;
    background: #d9d9d9;
    background-image: url("/images/personal/shared/basic_profile.png");
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: 10px;
`;

const EditBtn = styled.img`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 1.5rem;
    height: 1.5rem;
`;

const InfoForm = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-bottom: 1rem;
`;

const InfoRow = styled.div`
    display: flex;
    gap: 0.6rem;
    width: 100%;
    padding: 0 1rem;
`;

const InfoBox = styled.input`
    width: 80%;
    height: 1.8rem;
    border: none;
    flex-shrink: 0;
    background: rgba(255, 255, 255, 0.13);
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.25);
`;

const NameInput = styled(InfoBox)``;

const CoinNameInput = styled(InfoBox)``;

const EmailInput = styled(InfoBox)``;

const LinkForm = styled.form`
    background-color: #afb1b36e;
    width: 100%;
    height: 8.5rem;
    display: flex;
    gap: 0.6rem;
    padding: 0.4rem 0rem;
    flex-direction: column;
    overflow-y: auto;
`;

const LinkRow = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    height: 1.7rem;
    padding: 0 0.2rem;
`;

const Favicon = styled.div`
    background-color: #909;
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 5px;
`;

const LinkInput = styled.input`
    width: 90%;
    height: 1.5rem;
    padding: 0 0.3rem;
    border: none;
`;
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

const FieldContainer = styled.div<{ $fieldNum: number }>`
    background-color: #999666;
    width: 100%;
    height: 1.6rem;
    display: grid;
    align-items: center;
    padding: 0 1rem;
    grid-template-columns: repeat(${(props) => props.$fieldNum}, 1fr);
`;

const Field = styled.div`
    width: 100%;
    font-size: 16px;
`;

const SpecForm = styled.form`
    background-color: #fff;
    width: 100%;
    height: 6rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    overflow-y: auto;
`;

const SpecRow = styled.div<{ $fieldNum: number }>`
    background-color: #461;
    width: 100%;
    height: 1.8rem;
    padding: 0 1rem;
    display: grid;
    grid-template-columns: repeat(${(props) => props.$fieldNum}, 1fr);
    align-items: center;
    font-size: 12px;
`;

const Array = styled.div`
    width: 100%;
    height: 8rem;
    background-color: #679;
    margin-bottom: 1.4rem;
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
    border-radius: 7px;
    padding: 0 0.5rem;
    text-align: center;
    line-height: 1.5rem;
    background-color: #aeaeae;
    color: #ffea9c;

    font-size: 12px;
    font-weight: 700;
`;

const Bottom = styled.div`
    width: 100%;
    height: 2.8rem;
    margin-top: 1.3rem;
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
