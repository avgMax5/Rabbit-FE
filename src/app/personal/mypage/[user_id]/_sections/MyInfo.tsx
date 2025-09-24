import styled from "styled-components";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import {
    handleBtnEnterBackground,
    handleBtnLeaveBackground,
} from "../_utils/mouse";
import SpecForm from "../_components/my-info/SpecForm";
import Link from "../_components/my-info/Link";
import Position from "../_components/my-info/Position";
import Stack from "../_components/my-info/Stack";
import InfoRow from "../_components/my-info/InfoRow";
import {
    getInfo,
    MyInfo as MyInfoType,
    postUpload,
    putInfo,
} from "@/app/_api/userAPI";
import { useUserStore } from "@/app/_store/userStore";

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

function MyInfo() {
    const methods = useForm();
    const { register } = methods;
    const { onChange: regOnChange, ref, ...rest } = register("image");
    const [MyData, setInfoData] = useState<MyInfoType>();
    const [preview, setPreview] = useState(
        MyData?.image || "/images/personal/shared/basic_profile.png"
    );
    const { user } = useUserStore();
    const coinName = user?.my_bunny_name ?? "";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getInfo();
                setInfoData(data);
                console.log(data, " : fetchData에서 받아온 data");
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (MyData) {
            methods.reset(MyData);
            setPreview(MyData.image || preview);
        }
    }, [MyData]);

    if (!MyData) return <div>로딩중...</div>;

    const infoField = [
        { key: "name", text: "이름", disabled: false, value: MyData.name },
        {
            key: "coin_name",
            text: "코인명",
            disabled: true,
            value: coinName,
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

    const onSubmit = async (data: any) => {
        console.log("저장하기 클릭 시 폼 전체 값:", data);
        // let imageUrl = null;

        // if (data.image && data.image[0]) {
        //     imageUrl = await postUpload(data.image[0]);
        // }

        // const payload = { ...data, image: imageUrl };

        const uploadFile = async (file: File | string) => {
            if (file instanceof File) {
                const url = await postUpload(file); // 파일 → URL
                return url;
            }
            return file; // 이미 URL이면 그대로
        };

        // education 배열 처리
        const education = await Promise.all(
            data.education.map(async (edu: any) => ({
                ...edu,
                certificate_url: await uploadFile(edu.certificate_url),
            }))
        );

        // career 배열 처리
        const career = await Promise.all(
            data.career.map(async (car: any) => ({
                ...car,
                certificate_url: await uploadFile(car.certificate_url),
            }))
        );

        // certification 배열 처리
        const certification = await Promise.all(
            data.certification.map(async (cer: any) => ({
                ...cer,
                certificate_url: await uploadFile(cer.certificate_url),
            }))
        );

        // 최종 payload
        const payload = {
            ...data,
            education,
            career,
            certification,
        };

        console.log("파일->URL 변경", payload);

        try {
            const response = await putInfo(payload);
            console.log("서버 저장 완료", response);

            alert("정보가 저장되었습니다!");
        } catch (error) {
            console.error("저장 실패", error);
        }
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
                            <ProfileImg $url={preview} />
                            <EditBtn
                                $url={
                                    "/images/personal/mypage/edit_img_btn.png"
                                }
                            >
                                <HiddenInput
                                    type="file"
                                    onChange={(e) => {
                                        regOnChange(e); // formState에 파일 저장
                                        const file = e.target.files?.[0];
                                        if (file)
                                            setPreview(
                                                URL.createObjectURL(file)
                                            );
                                    }}
                                    ref={ref}
                                    {...rest}
                                />
                            </EditBtn>
                        </ImgContainer>

                        <InfoForm>
                            {infoField.map((field, i) => (
                                <InfoRow
                                    key={i}
                                    field={field}
                                    rowIndex={i}
                                    type={field.key}
                                />
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
                            <Stack skillData={MyData.skill} name="skill" />
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
    all: unset;
    display: contents;
`;

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
    grid-template-rows: 10.5rem 0.8fr 1fr;
`;

const ImgContainer = styled.div`
    position: relative;
    width: 10rem;
    height: 10rem;
`;

const ProfileImg = styled.div<{ $url: string }>`
    width: 9.5rem;
    height: 9.5rem;
    background: #d9d9d9;
    background-image: url(${(props) => props.$url});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: 10px;
`;

const EditBtn = styled.label<{ $url: string }>`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 1.5rem;
    height: 1.5rem;
    background-image: url(${(props) => props.$url});
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
`;

const HiddenInput = styled.input`
    display: none;
`;

const InfoForm = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
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
        3px 3px 2px 0 #ffefce inset;

    font-weight: 800;
`;

export default MyInfo;
