import { useFormContext } from "react-hook-form";
import styled from "styled-components";

interface fieldType {
    key: string;
    text: string;
    disabled: boolean;
    value: string | undefined;
}

interface InfoRowProps {
    field: fieldType;
    rowIndex: number;
    type: string;
}

function InfoRow({ field, rowIndex, type }: InfoRowProps) {
    const { register } = useFormContext();
    const inputName = `info.${field.text}`;

    return (
        <Row key={rowIndex}>
            <InfoText>{field.text}</InfoText>
            {field.value === "" && field.key === "coin_name" ? (
                <Input
                    {...register(inputName)}
                    disabled={true}
                    $show={true}
                    placeholder="- - 아직 상장 전입니다 - -"
                />
            ) : (
                <Input
                    type={type}
                    {...register(inputName)}
                    disabled={field.disabled}
                    $show={field.disabled}
                    defaultValue={field.value}
                />
            )}
        </Row>
    );
}

const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0rem;
`;

const InfoText = styled.div`
    display: flex;
    justify-content: end;
    width: 3rem;
    white-space: nowrap;
    color: #fbc95e;
    font-size: 12px;
    font-weight: 900;
`;

const Input = styled.input<{ $show: boolean }>`
    width: 78%;
    height: 1.5rem;
    padding: 0 0.3rem;
    border: none;
    border-radius: 5px;
    flex-shrink: 0;
    background: ${({ $show }) => ($show ? "transparent" : "#e7e7e765")};
    color: ${({ $show }) => ($show ? "#ffffff" : "#000")};
    box-shadow: ${({ $show }) =>
        $show ? "none" : "0 1px 1px 0 rgba(0, 0, 0, 0.25)"};
    font-size: 12px;
    font-weight: 600;

    &:focus {
        border: 1px solid #0558f4;
        background: #ffffff !important;
    }
    &::placeholder {
        color: #f4b327;
        //font-style: italic;
        font-size: 12px;
        font-weight: 400;
    }
`;

export default InfoRow;
