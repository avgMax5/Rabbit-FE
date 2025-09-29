import styled from "styled-components";

function Badges({ badges }: { badges: string[] }) {
    const length = badges.length;
    return (
        <>
            {length !== 0 && (
                <Div>
                    {badges.map((b, i) => (
                        <img
                            key={i}
                            src={`/images/badge/${b.toLowerCase()}.png`}
                        />
                    ))}
                </Div>
            )}
        </>
    );
}

const Div = styled.div`
    display: flex;
    gap: 12px;
    width: 20rem;
    padding: 10px 10px;
    overflow-x: auto;
    background-color: #ffffff49;
    border-radius: 8px;

    & img {
        width: 1.5rem;
        height: 1.5rem;
    }

    &::-webkit-scrollbar {
        display: none;
    }

    scrollbar-width: none;
`;

export default Badges;
