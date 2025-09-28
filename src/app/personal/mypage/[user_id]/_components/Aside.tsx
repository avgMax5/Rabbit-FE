import styled from "styled-components";
import { SetStateAction, Dispatch } from "react";
import { Icon } from "@iconify/react";

interface AsideProps {
    activeTab: string;
    setActiveTab: Dispatch<
        SetStateAction<"info" | "bunny" | "list" | "logout">
    >;
    onLogout: () => void;
}

function Aside({ activeTab, setActiveTab, onLogout }: AsideProps) {
    const getActiveIndex = () => {
        switch (activeTab) {
            case "info":
                return 0;
            case "bunny":
                return 1;
            case "list":
                return 2;
            case "logout":
                return 3;
            default:
                return 0;
        }
    };

    return (
        <Div>
            <Slider $activeIndex={getActiveIndex()} />
            <MyInfoBtn
                $active={activeTab === "info"}
                onClick={() => setActiveTab("info")}
            >
                <StyledIcon
                    icon="material-symbols:person"
                    color={activeTab === "info" ? "#fff" : "#57B8FF"}
                    width={24}
                />
                <div>My Info</div>
            </MyInfoBtn>
            <MyBunnyBtn
                $active={activeTab === "bunny"}
                onClick={() => setActiveTab("bunny")}
            >
                <StyledIcon
                    icon="lucide:rabbit"
                    color={activeTab === "bunny" ? "#fff" : "#57B8FF"}
                    width={24}
                />
                <div>My Bunny</div>
            </MyBunnyBtn>
            <BunnyListBtn
                $active={activeTab === "list"}
                onClick={() => setActiveTab("list")}
            >
                <StyledIcon
                    icon="mi:list"
                    color={activeTab === "list" ? "#fff" : "#57B8FF"}
                    width={28}
                />
                <div>Bunny List</div>
            </BunnyListBtn>
            <LogoutBtn $active={activeTab === "logout"} onClick={onLogout}>
                <StyledIcon
                    icon="tabler:logout"
                    color={activeTab === "logout" ? "#fff" : "#57B8FF"}
                    width={24}
                />
                <div>Logout</div>
            </LogoutBtn>
        </Div>
    );
}

const Div = styled.div`
    position: absolute;
    top: 25%;
    left: -3rem;
    width: 6rem;
    height: 20rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-shrink: 0;
    box-sizing: border-box;
    border-radius: 18px;
    box-shadow: 2px 2px 8px 0 #dedede inset,
        3px 3px 8px 0 rgba(70, 104, 148, 0.88);
    backdrop-filter: blur(20px);
    background-image: linear-gradient(135deg, #1e459bfc, #1e3187b3, #3a3cc19f);
`;

const Btn = styled.div<{ $active: boolean }>`
    width: 4.6rem;
    height: 3.6rem;
    border-radius: 9px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;

    background: transparent;
    font-family: var(--font-rockstar);
    font-size: 14px;
    color: ${({ $active }) => ($active ? "#fff" : "#57B8FF")};
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        color: #fff;

        svg {
            color: #fff !important;
        }
    }
`;

const Slider = styled.div<{ $activeIndex: number }>`
    position: absolute;
    top: 1.4rem;
    left: 0.7rem;
    width: 4.6rem;
    height: 3.6rem;
    background: #ffffff69;
    border-radius: 9px;
    transition: transform 0.2s ease;
    transform: translateY(${({ $activeIndex }) => $activeIndex * 4.6}rem);
    z-index: 0;
`;

const StyledIcon = styled(Icon)`
    transition: color 0.3s ease;
`;

const MyInfoBtn = styled(Btn)`
    position: relative;
    z-index: 1;
`;
const MyBunnyBtn = styled(Btn)`
    position: relative;
    z-index: 1;
`;
const BunnyListBtn = styled(Btn)`
    position: relative;
    z-index: 1;
`;
const LogoutBtn = styled(Btn)`
    position: relative;
    z-index: 1;
`;

export default Aside;
