import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import styled from "styled-components";

type InputProps = {
    value: string;
    inputName: string;
    name?: string;
    type: string;
};

const getValidationRules = (type: string) => {
    const rules: Record<string, any> = {
        required: "빈 칸을 채워주세요",
    };

    return rules;
};

export const DateInput = ({ value, inputName, type }: InputProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <InputDate
            type="date"
            defaultValue={value}
            {...register(inputName, getValidationRules(type))}
        />
    );
};

export const StringInput = ({ value, inputName, type }: InputProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <InputString
                type="string"
                defaultValue={value}
                {...register(inputName, getValidationRules(type))}
            />
        </>
    );
};

export const FileInput = ({ value, inputName, type }: InputProps) => {
    const { control } = useFormContext();
    const [fileName, setFileName] = useState<string>("선택한 파일 없음");
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    useEffect(() => {
        if (value) {
            if (value.startsWith("http")) {
                setFileName(value.split("/").pop() || "파일");
                setFileUrl(value);
            } else {
                setFileName(value);
            }
        }
    }, [value]);

    return (
        <FileDiv>
            <Controller
                name={inputName}
                control={control}
                defaultValue={null}
                render={({ field }) => (
                    <Label>
                        <Icon
                            icon="stash:plus-solid"
                            fill="#000"
                            width={"1rem"}
                        />
                        <InputFile
                            type="file"
                            onChange={(e) => {
                                const files = e.target.files;
                                if (files && files.length > 0) {
                                    setFileName(files[0].name);
                                    setFileUrl(null);
                                    field.onChange(files[0]); // RHF에 파일 전달
                                } else {
                                    setFileName("선택한 파일 없음");
                                    setFileUrl(null);
                                    field.onChange(null);
                                }
                            }}
                        />
                    </Label>
                )}
            />
            {fileUrl ? (
                <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                    {fileName}
                </a>
            ) : (
                <FileName>{fileName}</FileName>
            )}
        </FileDiv>
    );
};

export const SelectInput = ({ value, inputName, name, type }: InputProps) => {
    const { control } = useFormContext();

    return (
        <SelectDiv>
            <Controller
                name={inputName}
                control={control}
                defaultValue={value}
                render={({ field }) => (
                    <Select {...field}>
                        {name == "education" ? (
                            <>
                                <Option value="GRADUATED">졸업</Option>
                                <Option value="ENROLLED">재학</Option>
                            </>
                        ) : (
                            <>
                                <Option value="EMPLOYED">재직중</Option>
                                <Option value="UNENROLLED">퇴사</Option>
                            </>
                        )}
                    </Select>
                )}
            />
        </SelectDiv>
    );
};

const Input = styled.input`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 3px;
    border-radius: 4px;
    border: none;

    font-weight: 600;
    background-color: #ffffff98;

    &:focus {
        border: 1px solid #0558f4;
        background: #ffffff !important;
    }
`;

const InputDate = styled(Input)``;

const InputString = styled(Input)`
    padding: 6px;
`;

const FileDiv = styled.div`
    background-color: #ffffff75;
    height: 100%;
    padding: 4px;
    border-radius: 3px;
    display: flex;
    gap: 4px;
    align-items: center;
    overflow: hidden;

    font-size: 12px;

    & > a {
        max-width: 100px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        border-bottom: 1px solid #0000006a; /* 글자색과 같은 밑줄 */
        padding-bottom: 1.2px;
    }
`;

const Label = styled.label`
    background-color: #259;
    color: #fff;
    cursor: pointer;
    width: 1rem;
    height: 1rem;
    border-radius: 3px;
`;

const InputFile = styled.input`
    display: none;
    color: #0825a8;
`;

const FileName = styled.div`
    display: inline-block;
    max-width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: 0.2rem;
    font-size: 12px;
    color: #0825a8;
`;

const SelectDiv = styled.div`
    height: 100%;
`;

const Select = styled.select`
    width: 4rem;
    height: 100%;
    box-sizing: border-box;
    padding: 4px;
    background-color: #c7dff5;
    border-radius: 16px;
    border: none;

    font-weight: 600;
`;

const Option = styled.option`
    border: none;
`;

const ErrorMessage = styled.div`
    margin-top: 3.5px;
    text-align: end;
    font-size: 10px;
    font-weight: 800;
    color: #af072e;
`;
