import { Icon } from "@iconify/react";
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import styled from "styled-components";

type InputProps = { value: string; inputName: string };

export const DateInput = ({ value, inputName }: InputProps) => {
    const { register } = useFormContext();
    return (
        <InputDate type="date" defaultValue={value} {...register(inputName)} />
    );
};

export const StringInput = ({ value, inputName }: InputProps) => {
    const { register } = useFormContext();
    return (
        <InputString
            type="string"
            defaultValue={value}
            {...register(inputName)}
        />
    );
};

export const FileInput = ({ value, inputName }: InputProps) => {
    const { control } = useFormContext();
    const [fileName, setFileName] = useState<string>(
        value || "선택한 파일 없음"
    );

    return (
        <FileDiv>
            <Controller
                name={inputName}
                control={control}
                defaultValue={null} // 초기값 없으면 null
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
                                    field.onChange(files[0]); // RHF에 파일 전달
                                } else {
                                    setFileName("선택한 파일 없음");
                                    field.onChange(null);
                                }
                            }}
                        />
                    </Label>
                )}
            />
            <FileName>{fileName}</FileName>
        </FileDiv>
    );
};

export const SelectInput = ({ value, inputName }: InputProps) => {
    const { control } = useFormContext();
    return (
        <SelectDiv>
            <Controller
                name={inputName}
                control={control}
                defaultValue={value} // 초기값
                render={({ field }) => (
                    <Select {...field}>
                        <Option value="GRADUATED">GRADUATED</Option>
                        <Option value="ENROLLED">ENROLLED</Option>
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
`;

const InputDate = styled(Input)`
    width: 100%;
`;

const InputString = styled(Input)``;

const FileDiv = styled.div`
    background-color: #de838e;
    display: flex;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Label = styled.label`
    background-color: #259;
    color: #fff;
    cursor: pointer;
    width: 1rem;
    height: 1rem;
`;

const InputFile = styled.input`
    display: none;
`;

const FileName = styled.div`
    color: #000;
    font-size: 13px;
    margin-left: 0.2rem;
`;

const SelectDiv = styled.div`
    height: 100%;
`;

const Select = styled.select`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: aliceblue;
`;

const Option = styled.option`
    border: none;
`;
