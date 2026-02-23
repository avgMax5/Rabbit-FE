import styled from "styled-components";

interface MyDataType {
    name: string;
    src?: string;
}

function Profile({ name, src }: MyDataType) {
    return (
        <Div>
            <MyImg $src={src ?? "/images/personal/shared/basic_profile.png"} />
            <MyName>{name}</MyName>
        </Div>
    );
}

const Div = styled.div`
    width: 100%;
    height: 6.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

const MyImg = styled.div<{ $src: string }>`
    width: 3.2rem;
    height: 3.2rem;
    background-image: url(${(props) => props.$src});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: 12px;
`;
const MyName = styled.div`
    font-family: var(--font-nanum-square);
    font-weight: 900;
    font-size: 13px;
`;

export default Profile;
