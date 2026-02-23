import styled from "styled-components";
import {
    handleEnterBackground,
    handleLeaveBackground,
} from "../../_utils/mouse";

interface ListButtonProps {
    onGetList: () => void;
    totalLength: number;
    content: string;
}

function ListButton({ onGetList, totalLength, content }: ListButtonProps) {
    return (
        <Div>
            <Main
                onMouseEnter={(e) =>
                    handleEnterBackground(
                        { backgroundColor: "#2f2f2f73", color: "#fff" },
                        e
                    )
                }
                onMouseLeave={handleLeaveBackground}
                onClick={onGetList}
                $content={content}
            >
                {/* <RabbitImg src="/images/personal/mypage/sit_rabbit.png" /> */}
                <span>총</span>
                <TotalLength>{totalLength}</TotalLength>
                <span>건</span>
                <div>{content}</div>
            </Main>
        </Div>
    );
}

const Div = styled.div`
    width: 100%;
    height: 100%;
`;

const Main = styled.div<{ $content: string }>`
    position: relative;
    padding: 1rem;
    width: 100%;
    height: 100%;
    background-image: ${({ $content }) =>
        $content === "거래 기록 보기"
            ? `url("/images/personal/mypage/earth.png")`
            : `url("/images/personal/shared/space.jpeg")`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: ${({ $content }) =>
        $content === "거래 기록 보기" ? "right bottom" : ""};
    border-radius: 10px;
    box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25);

    font-weight: 800;
    color: #fff;
    cursor: pointer;
`;
const TotalLength = styled.span`
    color: #fcd676;
    font-weight: 900;
`;

export default ListButton;
