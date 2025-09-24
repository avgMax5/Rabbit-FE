import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";

const Skills = [
    { name: "C", include: false },
    { name: "C++", include: false },
    { name: "C#", include: false },
    { name: "HTML5", include: false },
    { name: "CSS3", include: false },
    { name: "JavaScript", include: false },
    { name: "TypeScript", include: false },
    { name: "React", include: false },
    { name: "Next.js", include: false },
    { name: "Vue.js", include: false },
    { name: "Svelte", include: false },
    { name: "Node.js", include: false },
    { name: "Java", include: false },
    { name: "SpringBoot", include: false },
    { name: "Python", include: false },
    { name: "Django", include: false },
    { name: "Flask", include: false },
    { name: "FastAPI", include: false },
    { name: "Kotlin", include: false },
    { name: "Swift", include: false },
    { name: "Go", include: false },
    { name: "Rust", include: false },
    { name: "PostgreSQL", include: false },
    { name: "MySQL", include: false },
    { name: "MongoDB", include: false },
    { name: "Redis", include: false },
    { name: "Docker", include: false },
    { name: "Kubernetes", include: false },
    { name: "Nginx", include: false },
    { name: "AWS/GCP/Azure", include: false },
];

interface StackProps {
    skillData: string[];
    name: string;
}

function Stack({ skillData, name }: StackProps) {
    const { setValue, watch } = useFormContext();
    const selectedStacks = watch(name) || [];

    const [skills, setSkills] = useState(
        Skills.map((skill) => ({
            ...skill,
            include: skillData.includes(skill.name),
        }))
    );

    useEffect(() => {
        if (skillData.length) {
            setValue(name, skillData);
        }
    }, [skillData, name, setValue]);

    console.log(watch("skill"));

    const toggleStack = (skill: string) => {
        const newStacks = selectedStacks.includes(skill)
            ? selectedStacks.filter((s: string) => s !== skill)
            : [...selectedStacks, skill];

        setValue(name, newStacks);
    };

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
