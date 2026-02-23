import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import GlassBox from "../../_components/GlassBox";

interface AiFeedBackProps {
    text: string;
}

function AiFeedBack({ text }: AiFeedBackProps) {
    //     const longText = `### 기술 역량 및 학습 방향
    // 현재 백엔드 분야에서 강력한 경력과 자격증을 보유하고 있으나, 시장 경쟁력을 더욱 높이기 위해서는 클라우드 네이티브 환경과 최신 DevOps 트렌드에 대한 심화 학습이 필요합니다. Kubernetes와 MySQL 기술 스택을 기반으로, 컨테이너 오케스트레이션, CI/CD 파이프라인, 보안 강화 등의 분야에서 전문성을 확대하는 것을 추천합니다.₩n 또한, AI, 빅데이터 또는 분산 시스템 관련 자격증 또는 프로젝트 경험을 쌓아 기술 포트폴리오를 다각화함으로써, 시장 내 신뢰성과 성장 잠재력을 강화할 수 있습니다. 이와 같은 학습 및 자격증 취득은 Bunny 시장에서의 인지도와 신뢰도를 높이는 핵심 전략입니다.

    // ### 경력 확장 및 프로젝트 강화
    // 경력 측면에서는 글로벌 대형 기업과의 협업 또는 오픈소스 프로젝트 참여를 통해 실전 경험을 확장하는 것이 중요합니다. 구글, 카카오페이, 신한카드 등에서의 다양한 역할 경험을 토대로, 리더십과 프로젝트 관리 능력을 더욱 강화하고, 기술 리더 또는 아키텍트 직무로의 성장 방향을 모색하십시오. 또한, 최신 기술 트렌드와 시장 수요를 반영한 신규 프로젝트 또는 스타트업 참여를 통해 성장률과 시장 인지도를 높일 수 있습니다. 이러한 경험과 활동은 Bunny 시장에서의 신뢰와 인기 지표를 상승시키는 데 결정적 역할을 할 것입니다.

    // ### 시장 지표별 가치 향상 전략
    // 지표별 강화를 위해서는 적극적인 거래 활동과 커뮤니티 내 인지도 향상이 필요합니다. Bunny 거래를 활성화하고, 관련 온라인 커뮤니티 또는 SNS를 활용하여 자신의 전문성과 시장 내 존재감을 알리세요. 또한, 안정성과 성장률을 동시에 고려한 포트폴리오 전략을 수립하여, 투자자 및 채용자에게 신뢰와 매력을 동시에 보여줄 수 있어야 합니다. 마지막으로, 균형 잡힌 투자 성향을 유지하면서, 지속적인 자기계발과 시장 트렌드 분석을 통해 장기적인 성장과 안정성을 동시에 확보하는 것이 중요합니다. 이러한 전략은 Bunny 지표의 전반적 향상과 함께, 시장 내 경쟁력을 지속적으로 제고.`;
    const formattedText = text.replace(/₩n/g, "\n");
    console.log(text);

    return (
        <CustomGlassBox
            text="AI 피드백"
            isNoti={false}
            backgroundColor="radial-gradient(circle at top left, #fcf4cd, transparent 60%), radial-gradient(circle at top right, #c7dff9, transparent 60%), radial-gradient(circle at bottom right, #f3c3d8, transparent 60%),#ffffff"
        >
            <Text>
                <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                    {formattedText}
                </ReactMarkdown>
            </Text>
        </CustomGlassBox>
    );
}

const CustomGlassBox = styled(GlassBox)`
    animation: colorChange 3s ease infinite;
    @keyframes colorChange {
        0% {
            background-position: 0% 60%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
`;

const Text = styled.div`
    width: 30rem;
    height: 100%;
    max-height: 14.2rem;
    margin-top: 6px;
    display: flex;
    flex-direction: column;
    align-items: start;
    text-align: start;
    white-space: normal;
    overflow-wrap: break-word;
    overflow: auto;

    line-height: 1.2;

    p {
        margin-bottom: 18px;
        padding: 6px;
        font-size: 13px;
        font-weight: 500;
        background-color: #ffffff77;
        box-shadow: 2px 2px 5px #0000001d;
    }

    h1 {
        margin: 16px 0 10px 0;
        padding: 6px;
        border-radius: 4px;
        font-size: 18px;
        font-weight: 900;
        background: linear-gradient(135deg, #53a8f36d, #abf199a9);
        &:first-child {
            margin: 0 0 10px 0;
        }
    }
    h2 {
        margin: 12px 0 10px 0;
        padding: 6px;
        border-radius: 4px;
        font-size: 16px;
        font-weight: 900;
        background: linear-gradient(135deg, #53a8f36d, #abf199a9);
        &:first-child {
            margin: 0 0 10px 0;
        }
    }
    h3 {
        margin: 8px 0 10px 0;
        padding: 6px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 900;
        background: linear-gradient(135deg, #53a8f36d, #abf199a9);
        &:first-child {
            margin: 0 0 10px 0;
        }
    }
`;

export default AiFeedBack;
