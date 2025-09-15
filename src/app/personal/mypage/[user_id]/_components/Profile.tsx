import styled from "styled-components";

interface MyDataType {
    name: string;
    src: string;
}

function Profile() {
    const MyData: MyDataType = {
        name: "홍민우",
        src: "/images/personal/shared/basic_profile.png",
    };

    return (
        <Div>
            <MyImg src={MyData.src} />
            <MyName>{MyData.name}</MyName>
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

const MyImg = styled.img`
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 12px;
`;
const MyName = styled.div`
    font-family: var(--font-nanum-square);
    font-weight: 700;
    font-size: 16px;
`;

export default Profile;
