import styled from "styled-components";
import { SetStateAction, Dispatch, useState } from "react";
import { Icon } from "@iconify/react";
import { handleEnterBackground, handleLeaveBackground } from "../_utils/mouse";

interface AsideProps {
    activeTab: string;
    setActiveTab: Dispatch<
        SetStateAction<"info" | "bunny" | "list" | "logout">
    >;
    onLogout: () => void;
}

function Aside({ activeTab, setActiveTab, onLogout }: AsideProps) {
    return (
        <Div>
            <MyInfoBtn
                $active={activeTab === "info"}
                onClick={() => setActiveTab("info")}
                onMouseEnter={(e) =>
                    handleEnterBackground(
                        { backgroundColor: "#268BD4", color: "#fff" },
                        e
                    )
                }
                onMouseLeave={handleLeaveBackground}
            >
                <Icon
                    icon="material-symbols:person"
                    color={activeTab === "info" ? "#fff" : "#0d99ff"}
                    width={24}
                />
                <div>My Info</div>
            </MyInfoBtn>
            <MyBunntBtn
                $active={activeTab === "bunny"}
                onClick={() => setActiveTab("bunny")}
                onMouseEnter={(e) =>
                    handleEnterBackground(
                        { backgroundColor: "#268BD4", color: "#fff" },
                        e
                    )
                }
                onMouseLeave={handleLeaveBackground}
            >
                <Icon
                    icon="lucide:rabbit"
                    color={activeTab === "bunny" ? "#fff" : "#0d99ff"}
                    width={24}
                />
                <div>My Bunny</div>
            </MyBunntBtn>
            <BunnyListBtn
                $active={activeTab === "list"}
                onClick={() => setActiveTab("list")}
                onMouseEnter={(e) =>
                    handleEnterBackground(
                        { backgroundColor: "#268BD4", color: "#fff" },
                        e
                    )
                }
                onMouseLeave={handleLeaveBackground}
            >
                <Icon
                    icon="mi:list"
                    color={activeTab === "list" ? "#fff" : "#0d99ff"}
                    width={28}
                />
                <div>Bunny List</div>
            </BunnyListBtn>
            <LogoutBtn
                $active={activeTab === "logout"}
                onClick={onLogout}
                onMouseEnter={(e) =>
                    handleEnterBackground(
                        { backgroundColor: "#268BD4", color: "#fff" },
                        e
                    )
                }
                onMouseLeave={handleLeaveBackground}
            >
                <Icon icon="tabler:logout" color="#0D99FF" width={24} />
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
    background-color: rgba(3, 29, 49, 0.5);
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

    background: ${({ $active }) => ($active ? "#268BD4" : "transparent")};
    box-shadow: ${({ $active }) =>
        $active
            ? `1px 1px 2px 0 #354e73,
        3px 3px 4px 0 rgba(255, 255, 255, 0.18) inset,
        -2px -2px 4px 0 rgba(36, 57, 86, 0.72) inset`
            : "none"};
    font-family: var(--font-rockstar);
    font-size: 14px;
    color: ${({ $active }) => ($active ? "#fff" : "#0d99ff;")};
`;

const MyInfoBtn = styled(Btn)``;
const MyBunntBtn = styled(Btn)``;
const BunnyListBtn = styled(Btn)``;
const LogoutBtn = styled(Btn)``;

export default Aside;
