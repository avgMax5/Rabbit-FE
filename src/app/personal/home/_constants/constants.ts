
import { BadgeType } from "../_types/interfaces";

export const SelectData: string[][] = [
    ["희소자산형", "밸런스형", "단가친화형"],
    ["프론트엔드", "백엔드", "풀스택"],
    ["성장형", "안정형", "가치형", "인기형", "밸런스형"],
    ["카카오", "네이버", "신한"],
];


export const BadgeData: BadgeType[] = [
    {
        id: 0,
        src: "/images/personal/shared/kakao-badge.png",
        name: "KAKAO",
        amount: 16,
        raise: true,
    },
    {
        id: 1,
        src: "/images/personal/shared/naver-badge.png",
        amount: 19,
        name: "NAVER",
        raise: false,
    },
    {
        id: 2,
        src: "/images/personal/shared/shinhan-badge.png",
        amount: 16,
        name: "SHINHAN",
        raise: true,
    },
];

export const fieldList = [
    { key: "bunny_name", label: "버니 이름" },
    { key: "developer_type", label: "개발자 타입" },
    { key: "position", label: "포지션" },
    { key: "current_price", label: "현재 가격" },
    { key: "fluctuation_rate", label: "변동률" },
    { key: "badges", label: "뱃지" },
];

export const notificationData = [
    { value: "reliavility", noti: "시장심리점수계산공식" },
    {
        value: "tradeStrength",
        noti: `· 거래된 매수 체결과 매도 체결의 비율을 의미하며, 아래의 수식으로 체결강도를 계산합니다.

(매수 체결량 / 매도 체결량) x 100

· 체결강도는 100% 초과 시 매수세가 강하며, 100% 미만 시 매도세가 강함을 의미합니다. (최대 500%까지 표기)

· 당일 매수 또는 매도가 없는 디지털 자산, 일 거래대금이 1 BTC 미만인 BTC 마켓의 디지털 자산은 체결강도 순위에 보이지 않습니다.`,
    },
];