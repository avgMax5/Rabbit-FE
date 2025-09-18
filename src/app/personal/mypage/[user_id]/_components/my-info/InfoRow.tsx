import { useFormContext } from "react-hook-form";
import styled from "styled-components";

interface fieldType {
    text: string;
    disabled: boolean;
    value: string;
}

interface InfoRowProps {
    field: fieldType;
    rowIndex: number;
}

function InfoRow({ field, rowIndex }: InfoRowProps) {
    const { register } = useFormContext();
    const inputName = `info.${field.text}`;

    return (
        <Row key={rowIndex}>
            <InfoText>{field.text}</InfoText>
            <Input
                {...register(inputName)}
                disabled={field.disabled}
                $show={field.disabled}
                defaultValue={field.value}
            />
        </Row>
    );
}

const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 0.2rem;
    width: 100%;
    padding: 0 0.3rem;
`;

const InfoText = styled.div`
    display: flex;
    justify-content: start;
    width: 3rem;
    white-space: nowrap;
    color: #fbc95e;
    font-size: 12px;
    font-weight: 900;
`;

const Input = styled.input<{ $show: boolean }>`
    width: 80%;
    height: 1.8rem;
    padding: 0 6px;
    border: none;
    border-radius: 5px;
    flex-shrink: 0;
    background: ${({ $show }) => ($show ? "transparent" : "#e7e7e765")};
    color: ${({ $show }) => ($show ? "#ffffff" : "#000")};
    box-shadow: ${({ $show }) =>
        $show ? "none" : "0 1px 1px 0 rgba(0, 0, 0, 0.25)"};
    font-size: 16px;
    font-weight: 600;

    &:focus {
        border: 1px solid #0558f4;
        background: #ffffff !important;
    }
`;

export default InfoRow;
