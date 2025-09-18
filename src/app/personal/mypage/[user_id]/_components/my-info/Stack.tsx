import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";

const Skills = [
    { name: "HTML5", include: false },
    { name: "CSS3", include: false },
    { name: "JavaScript", include: false },
    { name: "TypeScript", include: false },
    { name: "React", include: false },
    { name: "Next.js", include: false },
    { name: "Vue.js", include: false },
    { name: "Svelte / SvelteKit", include: false },
    { name: "Node.js", include: false },
    { name: "Java", include: false },
    { name: "SpringBoot", include: false },
    { name: "Django", include: false },
    { name: "Flask", include: false },
    { name: "PostgreSQL", include: false },
    { name: "MySQL", include: false },
    { name: "MongoDB", include: false },
    { name: "Redis", include: false },
    { name: "Docker", include: false },
    { name: "Nginx", include: false },
    { name: "AWS / GCP / Azure", include: false },
];

interface StackProps {
    skillData: string[];
    name: string;
}

function Stack({ skillData, name }: StackProps) {
    const { setValue, watch } = useFormContext();
    const selectedStacks = watch(name) || [];
    console.log(selectedStacks, "sected1");

    const [skills, setSkills] = useState(
        Skills.map((skill) => ({
            ...skill,
            include: skillData.includes(skill.name),
        }))
    );

    useEffect(() => {
        if (skillData.length) {
            setValue(name, skillData); // RHF 초기값 설정
        }
    }, [skillData, name, setValue]);
    console.log(selectedStacks, "sected2");

    console.log(watch(name));

    // const handleInclude = (index: number) => {
    //     const newStackes = [...skills];
    //     newSkills[index].include = !newSkills[index].include;
    //     setSkills(newSkills);
    // };

    const toggleStack = (stack: string) => {
        const newStacks = selectedStacks.includes(stack)
            ? selectedStacks.filter((s: string) => s !== stack) // 제거
            : [...selectedStacks, stack]; // 추가

        setValue(name, newStacks);
    };

    console.log(selectedStacks, "sected3");

    return (
        <>
            <Title>
                <LeftDiv>
                    <Icon
                        icon="fa7-solid:tools"
                        color="#149FAE"
                        width="1.4rem"
                    />
                    스택
                </LeftDiv>
            </Title>
            <Container>
                {skills.map((skill, i) => (
                    <Skill
                        onClick={() => toggleStack(skill.name)}
                        key={i}
                        style={{
                            backgroundColor: selectedStacks.includes(skill.name)
                                ? "#FFAE3C"
                                : "#aeaeae",
                            color: selectedStacks.includes(skill.name)
                                ? "#000"
                                : "#ffea9c",
                        }}
                    >
                        {skill.name}
                    </Skill>
                ))}
            </Container>
        </>
    );
}

const Title = styled.div`
    display: flex;
    gap: 0.5rem;
    height: 2.2rem;
    color: #fbc95e;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.4rem;

    font-size: 17px;
    font-weight: 800;
`;

const LeftDiv = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
`;

const Container = styled.div`
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
    cursor: pointer;
`;

export default Stack;
