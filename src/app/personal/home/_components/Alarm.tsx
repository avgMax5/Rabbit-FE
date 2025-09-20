import Link from "next/link";
import { useState } from "react";
import styled, { keyframes } from "styled-components";

interface updateDataType {
    coin_name: string;
    fund_bunny_id: string;
}

interface AlarmProps {
    updateData: updateDataType[];
}

const shake = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(15deg); }
  50% { transform: rotate(-15deg); }
  75% { transform: rotate(15deg); }
  100% { transform: rotate(0deg); }
  110% { transform: rotate(0deg); }
`;

function Alarm({ updateData }: AlarmProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <Wrapper
            $hovered={hovered}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Img src={"/images/personal/home/bell.png"} />
            <Div $hovered={hovered}>
                <UpdateText>업데이트 | </UpdateText>
                <UpdateCoins>
                    {updateData.map((data, i) => (
                        <Link href={`/trade/${data.fund_bunny_id}`} key={i}>
                            <Coin>{data.coin_name}</Coin>
                        </Link>
                    ))}
                    <Coin />
                </UpdateCoins>
            </Div>
        </Wrapper>
    );
}

const Wrapper = styled.div<{ $hovered: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.8rem;
    /* width: auto;
    max-width: 95%; */
    max-width: ${(props) => (props.$hovered ? "95%" : "4rem")};
    height: 4rem;
    box-sizing: border-box;
    margin: 0rem 2rem;
    padding: 0 1rem;
    border-radius: 8rem;
    background: #fff1cd;
    box-shadow: 2px 2px 3px 0 #4d6381;
    font-size: 17px;
`;

const Img = styled.img`
    width: 2rem;
    height: 2rem;
    border-radius: 1.5rem;
    cursor: pointer;
    animation: ${shake} 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
`;

const Div = styled.div<{ $hovered: boolean }>`
    display: ${(props) => (props.$hovered ? "flex" : "none")};
    align-items: center;
    gap: 0.6rem;
`;

const UpdateText = styled.div`
    color: #909090;
    font-weight: 800;
`;

const UpdateCoins = styled.div`
    display: flex;
    gap: 0.4rem;
`;

const Coin = styled.div`
    width: auto;
    font-weight: 800;
    text-decoration: underline;
    text-decoration-thickness: 1.3px; /* 두께 조절 */
    text-decoration-color: black; /* 색상 */
    text-underline-offset: 4px;
    cursor: pointer;
`;

export default Alarm;
