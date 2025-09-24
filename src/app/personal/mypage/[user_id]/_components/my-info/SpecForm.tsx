import { Icon } from "@iconify/react";
import styled from "styled-components";
import { DateInput, FileInput, SelectInput, StringInput } from "./Input";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useEffect, useRef } from "react";

interface fieldDataType {
    key: string;
    value: string;
    type: "string" | "select" | "date" | "file";
}

export interface rowDataType {
    [key: string]: any;
}

interface SpecFormProps {
    title: string;
    fieldData: fieldDataType[];
    rowData: rowDataType[];
    icon: string;
    name: string;
}

interface renderFieldProps {
    fieldType: string;
    value: any;
    key: number;
    inputName: string;
    name: string;
}

const renderField = ({
    fieldType,
    value,
    key,
    inputName,
    name,
}: renderFieldProps) => {
    switch (fieldType) {
        case "string":
            return (
                <StringInput
                    key={key}
                    value={value}
                    inputName={inputName}
                    type={fieldType}
                />
            );
        case "select":
            return (
                <SelectInput
                    key={key}
                    value={value}
                    inputName={inputName}
                    name={name}
                    type={fieldType}
                />
            );
        case "date":
            return (
                <DateInput
                    key={key}
                    value={value}
                    inputName={inputName}
                    type={fieldType}
                />
            );
        case "file":
            return (
                <FileInput
                    key={key}
                    value={value}
                    inputName={inputName}
                    type={fieldType}
                />
            );
        default:
            return null;
    }
};

const changeName = (name: string) => {
    switch (name) {
        case "career":
            return "경력";
        case "education":
            return "학력";
        case "certification":
            return "자격증";
    }
};

function SpecForm({ title, fieldData, rowData, icon, name }: SpecFormProps) {
    const { control, reset, getValues } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });
    const mounted = useRef(false);

    useEffect(() => {
        if (!mounted.current && rowData.length > 0) {
            append(rowData);
            mounted.current = true;
        }
    }, [append, rowData]);
    console.log("필드 데이터", fieldData);
    console.log("행 데이터", rowData);
    return (
        <FormWrapper>
            <Title>
                <LeftDiv>
                    <Icon icon={icon} color="#149FAE" width={"1.4rem"} />
                    {title}
                </LeftDiv>
                <AddRowBtn
                    type="button"
                    onClick={() => {
                        const newRow = fieldData.reduce((acc, f) => {
                            if (f.key === "status") {
                                acc[f.key] =
                                    name === "education"
                                        ? "ENROLLED"
                                        : "EMPLOYED";
                            } else {
                                acc[f.key] = "";
                            }

                            return acc;
                        }, {} as any);

                        append(newRow);

                        const currentValues = getValues();
                        reset(currentValues);
                    }}
                />
            </Title>
            <Container>
                <FieldContainer $fieldNum={fieldData.length} $name={name}>
                    {fieldData.map((field, i) => (
                        <Field key={i}>{field.value}</Field>
                    ))}
                </FieldContainer>
                <Form>
                    {fields.length === 0 ? (
                        <NoContentDiv>
                            <span>{changeName(name)}</span>
                            <span>을</span> <span>추가</span> 해주세요 !
                        </NoContentDiv>
                    ) : (
                        fields.map((row, i) => (
                            <Row
                                key={row.id}
                                $fieldNum={fieldData.length}
                                $name={name}
                            >
                                {fieldData.map((field, j) => {
                                    const inputName = `${name}[${i}].${field.key}`;
                                    const value = (row as rowDataType)[
                                        field.key
                                    ];
                                    const fieldType = field.type;

                                    return renderField({
                                        fieldType,
                                        value,
                                        key: j,
                                        inputName,
                                        name,
                                    });
                                })}

                                <DeleteBtn
                                    onClick={() => {
                                        remove(i);
                                    }}
                                >
                                    <Icon
                                        icon="iconamoon:trash-bold"
                                        color="#ffffff"
                                    />
                                </DeleteBtn>
                            </Row>
                        ))
                    )}
                </Form>
            </Container>
        </FormWrapper>
    );
}

const FormWrapper = styled.div`
    width: 100%;
    height: 15rem;
`;

const Title = styled.div`
    display: flex;
    gap: 0.5rem;
    height: 2.2rem;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
    margin-bottom: 0.6rem;

    color: #fbc95e;
    font-size: 17px;
    font-weight: 800;
`;

const LeftDiv = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
`;

const AddRowBtn = styled.button`
    background-image: url("/images/personal/mypage/plus_btn.png");
    background-repeat: no-repeat;
    background-size: cover;
    border: none;
    background-color: transparent;
    width: 1.4rem;
    height: 1.4rem;
    cursor: pointer;
`;

const Container = styled.div`
    width: 100%;
`;

const FieldContainer = styled.div<{ $fieldNum: number; $name: string }>`
    background: rgba(5, 42, 129, 0.718);
    width: 100%;
    height: 1.6rem;
    padding: 0 0.4rem;
    border-radius: 3px;
    margin-bottom: 0.3rem;
    display: grid;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    grid-template-columns: ${(props) =>
        props.$name == "certification"
            ? `repeat(${props.$fieldNum}, 1fr) 1.8rem`
            : `7rem 4rem 7rem 8rem 8rem 1fr 1.8rem`};
`;

const Field = styled.div`
    text-align: center;
    width: 100%;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
`;

const Form = styled.div`
    background-color: #0441dd30;
    width: 100%;
    height: 10rem;
    padding: 0.3rem 0;
    border-radius: 4px;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    gap: 0.2rem;
    overflow-y: auto;
`;

const NoContentDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    gap: 3px;
    justify-content: center;
    align-items: center;
    background-color: #71717120;
    color: #dadada;
    font-weight: 500;

    & span:nth-child(1),
    :nth-child(3) {
        font-weight: 800;
        color: #deaa1a;
    }
`;

const Row = styled.div<{ $fieldNum: number; $name: string }>`
    box-sizing: border-box;
    padding: 0.3rem 0.4rem;
    width: 100%;
    min-height: 2.4rem;
    display: grid;
    gap: 0.5rem;
    justify-content: center;
    grid-template-columns: ${(props) =>
        props.$name == "certification"
            ? `repeat(${props.$fieldNum}, 1fr) 1.8rem`
            : `7rem 4rem 7rem 8rem 8rem 1fr 1.3rem`};
    align-items: center;
`;

const DeleteBtn = styled.button`
    width: 1rem;
    background: none;
    height: 1.8rem;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 15px;
`;

export default SpecForm;
