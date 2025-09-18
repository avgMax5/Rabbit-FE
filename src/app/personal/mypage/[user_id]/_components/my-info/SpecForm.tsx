import { Icon } from "@iconify/react";
import styled from "styled-components";
import { DateInput, FileInput, SelectInput, StringInput } from "./Input";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useEffect } from "react";

interface fieldDataType {
    key: string;
    value: string;
    type: "string" | "select" | "date" | "file";
}

interface rowDataType {
    id: string;
    [key: string]: string | number | boolean;
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
}

const renderField = ({
    fieldType,
    value,
    key,
    inputName,
}: renderFieldProps) => {
    switch (fieldType) {
        case "string":
            return (
                <StringInput key={key} value={value} inputName={inputName} />
            );
        case "select":
            return (
                <SelectInput key={key} value={value} inputName={inputName} />
            );
        case "date":
            return <DateInput key={key} value={value} inputName={inputName} />;
        case "file":
            return <FileInput key={key} value={value} inputName={inputName} />;
        default:
            return null;
    }
};

function SpecForm({ title, fieldData, rowData, icon, name }: SpecFormProps) {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });

    useEffect(() => {
        if (fields.length === 0 && rowData.length > 0) {
            append(rowData);
        }
    }, []); // 초기 마운트 시 한번만 실행

    useEffect(() => {
        console.log(fields, "이건 필드"); // append 후 fields 확인
    }, [fields]);

    return (
        <FormWrapper>
            <Title>
                <LeftDiv>
                    <Icon icon={icon} color="#149FAE" width={"1.4rem"} />
                    {title}
                </LeftDiv>
                <AddRowBtn
                    onClick={() => {
                        append(
                            fieldData.reduce((acc, f) => {
                                acc[f.key] = "";
                                return acc;
                            }, {} as any)
                        );
                        console.log("클릭");
                    }}
                />
            </Title>
            <Container>
                <FieldContainer $fieldNum={fieldData.length}>
                    {fieldData.map((field, i) => (
                        <Field key={i}>{field.value}</Field>
                    ))}
                </FieldContainer>
                <Form>
                    {/* fields == rowData */}
                    {fields.map((row, i) => (
                        <Row key={row.id} $fieldNum={fieldData.length}>
                            {fieldData.map((field, j) => {
                                const inputName = `${name}[${i}].${field.key}`;
                                const value = row[field.key];
                                const fieldType = field.type;

                                return renderField({
                                    fieldType,
                                    value,
                                    key: j,
                                    inputName,
                                });
                            })}
                        </Row>
                    ))}
                </Form>
            </Container>
        </FormWrapper>
    );
}

const FormWrapper = styled.div`
    width: 100%;
    height: 100%;
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
    background-color: #999;
`;

const FieldContainer = styled.div<{ $fieldNum: number }>`
    background-color: #999666;
    width: 100%;
    height: 1.6rem;
    display: grid;
    padding: 0 0.4rem;
    justify-content: center;
    align-items: center;
    grid-template-columns: repeat(${(props) => props.$fieldNum}, 1fr);
`;

const Field = styled.div`
    text-align: center;
    width: 100%;
    font-size: 14px;
    font-weight: 700;
`;

const Form = styled.div`
    background-color: #a14040;
    width: 100%;
    height: 10rem;
    padding: 0.3rem 0;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    gap: 0.3rem;
    overflow-y: auto;
`;

const Row = styled.div<{ $fieldNum: number }>`
    background-color: #461;
    box-sizing: border-box;
    padding: 0.3rem 0.4rem;
    width: 100%;
    min-height: 2rem;
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: repeat(${(props) => props.$fieldNum}, 1fr);
`;

export default SpecForm;
