import styled from "styled-components";

interface TitleProps {
    content: string;
}

function Title({ content }: TitleProps) {
    return (
        <Container>
            <div>
                <Icon />
                <Content>{content}</Content>
            </div>
            <Time>09.01 12:00</Time>
        </Container>
    );
}

export const LongTitle = styled(Title)``;
export const ShortTitle = styled(Title)`
    width: 100%;
    height: 60px;
`;

const Container = styled.div`
    width: 100%;
    height: 3.5rem;
    display: flex;
    text-align: center;
    justify-content: space-between;
    align-items: center;
    gap: 1.7rem;
    padding: 0 1rem;
    margin-bottom: 1.2rem;
    border-radius: 8px;
    background: #a9c7ef;
    box-shadow: -2px -4px 10px 0 #597296 inset, 6px 4px 10px 0 #d8e8ff inset,
        3px 3px 8px 0 rgba(11, 61, 131, 0.64);

    font-family: var(--font-nanum-squar);
    font-weight: 900;
    font-size: 19px;

    & > div {
        display: flex;
        align-items: center;
        gap: 0.4rem;
    }
`;

const Icon = styled.div`
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 1.6rem;
    background-color: #113b60;
`;

const Content = styled.div`
    width: auto;
`;

const Time = styled.div`
    font-size: 12.5px;
    color: #343235;
`;
