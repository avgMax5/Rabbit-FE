import styled from "styled-components";

function Badges({ badges }: { badges: string[] }) {
    return (
        <Div>
            {badges.map((b, i) => (
                <img
                    src={`/images/personal/shared/${b.toLowerCase}-badge.png`}
                />
            ))}
        </Div>
    );
}

const Div = styled.div`
    width: auto;
    background-color: #909;
    & img {
        width: 2.3rem;
        height: 2.3rem;
    }
`;

export default Badges;
