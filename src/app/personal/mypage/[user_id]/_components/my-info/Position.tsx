import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";

interface PositionProps {
    position: string;
    name: string;
}
const positionData = ["FRONTEND", "BACKEND", "FULLSTACK"];

function Position({ position, name }: PositionProps) {
    const { setValue, watch } = useFormContext();
    const [selected, setSelected] = useState(position);

    const handleSelect = (value: string) => {
        setSelected(value); // UI용 상태
        setValue(name, value); // RHF 값 갱신
    };

    useEffect(() => {
        if (position) {
            setValue(name, position); // 초기값 RHF에 반영
        }
    }, [position, name, setValue]);

    console.log(watch("position"));

    return (
        <>
            <Title>
                <LeftDiv>
                    <Icon
                        icon="material-symbols:work"
                        color="#149FAE"
                        width={"1.3rem"}
                    />
                    직군
                </LeftDiv>
            </Title>
            <Container>
                {positionData.map((p, i) => (
                    <PositionBtn
                        key={i}
                        onClick={(e) => handleSelect(p)}
                        style={{
                            backgroundColor:
                                selected === p ? "#fba57c" : "#a7a7a7b1",
                        }}
                    >
                        {p}
                    </PositionBtn>
                ))}
            </Container>
        </>
    );
}

const Title = styled.div`
    display: flex;
    gap: 0.5rem;
    height: 2.2rem;
    justify-content: space-between;
    align-items: center;
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

const Container = styled.div`
    display: flex;
    gap: 1rem;
    width: 100%;
    height: 3rem;
`;
const PositionBtn = styled.div`
    width: 7rem;
    height: 2rem;
    border-radius: 6px;
    text-align: center;
    line-height: 2rem;
    background-color: #a7a7a7b1;

    font-size: 13px;
    font-weight: 800;
    box-shadow: 2px 2px 4px 0 #1d1d1d39;
    cursor: pointer;
`;

export default Position;
