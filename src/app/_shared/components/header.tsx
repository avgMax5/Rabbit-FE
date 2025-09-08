import styled from "styled-components";

function Header() {
    return (
        <Div>
            <Logo src="./images/personal/main/rabbit_logo.png" alt="토끼로고" />
            <Navigate>
                <Main>메인</Main>
                <MyPage>마이페이지</MyPage>
                <Funding>펀딩</Funding>
            </Navigate>
            <Money>
                <CarrotImg src="./images/personal/main/carrot.png" alt="당근" />
                233,000,000
            </Money>
        </Div>
    );
}

const NavButton = styled.div`
    width: 7rem;
    height: 2rem;
    border-radius: 20px;
    text-align: center;
    line-height: 2rem;
`;

const WhiteContainer = styled.div`
    display: flex;
    gap: 2rem;
    height: 3rem;
    padding: 0.5rem;
    align-items: center;
    flex-shrink: 0;

    border-radius: 36px;
    background: rgba(245, 245, 245, 0.68);
    box-shadow: 5px 5px 8px 0 rgba(130, 150, 176, 0.25),
        6px 3px 4px 0 #f7f7f7 inset,
        -4px -2px 15px 0 rgba(71, 87, 122, 0.67) inset;
`;

const Div = styled.div`
    display: flex;
    justify-content: space-between;
    gap: auto;
    width: 100%;
    padding: 2rem 0rem;
    align-items: center;
    justify-content: center;
`;

const Logo = styled.img`
    width: 9.5rem;
`;

const Navigate = styled(WhiteContainer)`
    margin: 0 auto;
`;

const Main = styled(NavButton)`
    background: #f8b2a3;
    box-shadow: -2px -4px 10px 0 #d7654d inset, 6px 4px 10px 0 #ffd6cd inset,
        4px 4px 10px 0 rgba(255, 181, 166, 0.64);
`;

const MyPage = styled(NavButton)``;

const Funding = styled(NavButton)``;

const CarrotImg = styled.img`
    height: 1.5rem;
`;
const Money = styled(WhiteContainer)`
    padding: 0.5rem 0.8rem;
    gap: 0.8rem;
`;

export default Header;
