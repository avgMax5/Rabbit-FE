import { Certificate } from "crypto";
import styled from "styled-components";
import { useForm, FormProvider } from "react-hook-form";
import {
    handleBtnEnterBackground,
    handleBtnLeaveBackground,
    handleEnterBackground,
    handleLeaveBackground,
} from "../_utils/mouse";
import { Icon } from "@iconify/react";
import SpecForm from "../_components/my-info/SpecForm";
import Link from "../_components/my-info/Link";
import Position from "../_components/my-info/Position";
import Stack from "../_components/my-info/Stack";
import InfoRow from "../_components/my-info/InfoRow";

const MyData = {
    user_id: "01HZXUSER00000000000000001",
    name: "홍민우",
    coin_name: "MINWOO",
    image: "https://picsum.photos/200",
    email: "user01@test.com",
    resume: "https://example.com/resume.pdf",
    portfolio: "https://example.com/portfolio.pdf",
    link: [
        {
            sns_id: "01HZXSNS00000000000000001",
            url: "https://github.com/jjweidon",
            type: "GITHUB",
            favicon: "https://github.com/favicon",
        },
        {
            sns_id: "01HZXSNS00000000000000002",
            url: "https://instagram.com/jwoong_8",
            type: "INSTAGRAM",
            favicon: "https://instagram.com/favicon",
        },
        {
            sns_id: "01HZXSNS00000000000000003",
            url: "https://linkedin.com/jwoong_8",
            type: "LINKEDIN",
            favicon: "https://linkedin.com/favicon",
        },
    ],
    position: "BACKEND",
    education: [
        {
            id: "0",
            school_name: "신한고등학교",
            status: "GRADUATED",
            major: "자연계",
            certificate_url: "https://example.com/certificate.pdf",
            start_date: "2020-09-01",
            end_date: "2023-06-30",
        },
        {
            id: "1",
            school_name: "신한대학교",
            status: "ENROLLED",
            major: "컴퓨터공학과",
            certificate_url: "https://example.com/certificate.pdf",
            start_date: "2020-09-01",
            end_date: "2023-06-30",
        },
        {
            id: "2",
            school_name: "신한대학교",
            status: "GRADUATED",
            major: "컴퓨터공학과",
            certificate_url: "https://example.com/certificate.pdf",
            start_date: "2020-09-01",
            end_date: "2023-06-30",
        },
        {
            id: "3",
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
            id: "0",
            company_name: "신한은행",
            status: "UNEMPLOYED",
            position: "마케터",
            certificate_url: "https://example.com/certificate.pdf",
            start_date: "2023-09-01",
            end_date: "2025-12-31",
        },
        {
            id: "1",
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
            id: "0",
            certification_id: "01HZXCERTIFICATION00000000000000001",
            certificate_url: "https://fileurl.com",
            name: "정보처리기사",
            ca: "에이비지맥스",
            cdate: "2015-09-01",
        },
        {
            id: "1",
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
    type FieldType = "string" | "select" | "date" | "file";

    interface FieldData {
        key: string;
        value: string;
        type: FieldType;
    }

    interface SpecField {
        education: FieldData[];
        career: FieldData[];
        certification: FieldData[];
    }

    const infoField = [
        { key: "name", text: "이름", disabled: true, value: MyData.name },
        {
            key: "coin_name",
            text: "코인명",
            disabled: false,
            value: MyData.coin_name,
        },
        { key: "email", text: "이메일", disabled: false, value: MyData.email },
    ];

    const specField: SpecField = {
        education: [
            { key: "school_name", value: "학교명", type: "string" },
            { key: "status", value: "상태", type: "select" },
            { key: "major", value: "전공", type: "string" },
            { key: "start_date", value: "입학일", type: "date" },
            { key: "end_date", value: "졸업일", type: "date" },
            {
                key: "certificate_url",
                value: "재학/졸업 증명서",
                type: "file",
            },
        ],
        career: [
            { key: "company_name", value: "회사명", type: "string" },
            { key: "status", value: "상태", type: "select" },
            { key: "position", value: "직군", type: "string" },
            { key: "start_date", value: "입사일", type: "date" },
            { key: "end_date", value: "퇴사일", type: "date" },
            { key: "certificate_url", value: "재직 증명서", type: "file" },
        ],
        certification: [
            { key: "name", value: "자격증명", type: "string" },
            { key: "ca", value: "발급기관", type: "string" },
            { key: "cdate", value: "발급일자", type: "date" },
            { key: "certificate_url", value: "자격증", type: "file" },
        ],
    };

    const SpecFormData = [
        {
            titile: "학력",
            fieldData: specField.education,
            rowData: MyData.education,
            icon: "ic:round-school",
            name: "education",
        },
        {
            titile: "경력",
            fieldData: specField.career,
            rowData: MyData.career,
            icon: "ph:code-fill",
            name: "career",
        },
        {
            titile: "자격증",
            fieldData: specField.certification,
            rowData: MyData.certification,
            icon: "mdi:paper",
            name: "certification",
        },
    ];

    const methods = useForm();
    const onSubmit = (data: any) => {
        console.log("폼 전체 값:", data);
        //api 호출
    };
    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    return (
        <FormProvider {...methods}>
            <PlainForm onSubmit={methods.handleSubmit(onSubmit)}>
                <Main>
                    <InfoSection>
                        <ImgContainer>
                            <ProfileImg />
                            <EditBtn
                                src={"/images/personal/mypage/edit_img_btn.png"}
                            />
                        </ImgContainer>

                        <InfoForm>
                            {infoField.map((field, i) => (
                                <InfoRow key={i} field={field} rowIndex={i} />
                            ))}
                        </InfoForm>

                        <Link linkData={MyData.link} name="link" />
                    </InfoSection>

                    <SpecSection>
                        <PositionContainer>
                            <Position
                                position={MyData.position}
                                name="position"
                            />
                        </PositionContainer>

                        {SpecFormData.map((formData, index) => (
                            <SpecForm
                                key={index}
                                title={formData.titile}
                                fieldData={formData.fieldData}
                                rowData={formData.rowData}
                                icon={formData.icon}
                                name={formData.name}
                            />
                        ))}

                        <div>
                            <Stack skillData={MyData.skill} name="stacks" />
                        </div>
                    </SpecSection>
                </Main>
                <Bottom>
                    <Guide>
                        <img src={"/images/personal/mypage/fly_rabbit.png"} />
                        <div>저장하기를 꼬옥 눌러주세요!</div>
                    </Guide>
                    <SaveBtn
                        type="submit"
                        onMouseEnter={(e) =>
                            handleBtnEnterBackground(
                                {
                                    backgroundColor: "#fac150",
                                    color: "#000",
                                },
                                e
                            )
                        }
                        onMouseLeave={handleBtnLeaveBackground}
                    >
                        저장하기
                    </SaveBtn>
                </Bottom>
            </PlainForm>
        </FormProvider>
    );
}

const Main = styled.div`
    width: 100%;
    height: 94%;
    padding: 0 0.2rem;
    display: grid;
    grid-template-columns: 1.5fr 5fr;
    gap: 1.2rem;
    box-sizing: border-box;

    font-family: var(--font-nanum-square);
`;

const PlainForm = styled.form`
    all: unset; /* 브라우저 기본 스타일 초기화 */
    display: contents; /* children만 렌더링, 레이아웃 영향 없음 */
`;

//나의 정보
const Section = styled.div`
    width: 100%;
    height: 62vh;
    padding: 1rem;
    border-radius: 15px;
    background-color: rgb(118 177 224 / 8%);
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

const InfoForm = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-bottom: 1rem;
`;

// 나의 스펙
const SpecSection = styled(Section)`
    width: 100%;
    display: grid;
    gap: 1.4rem;
    overflow-y: auto;
`;

const PositionContainer = styled.div`
    width: 100%;
    height: 5rem;
`;

const Bottom = styled.div`
    width: 100%;
    height: 2.7rem;
    padding: 0.1rem 1rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
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
        height: 96%;
    }
`;

const SaveBtn = styled.button`
    width: 6.6rem;
    height: 2rem;
    text-align: center;
    line-height: 1.8rem;
    border: none;
    border-radius: 16px;
    background-color: rgba(254, 226, 167, 0.88);
    box-shadow: -1.913px -3.825px 6.376px 0 rgba(255, 177, 14, 0.84) inset,
        5.738px 3.825px 6.376px 0 #ffefce inset;

    font-weight: 800;
`;

export default MyInfo;
