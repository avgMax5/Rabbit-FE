
import { BadgeType } from "../_types/interfaces";

export const SelectData: string[][] = [
    ["A", "B", "C"],
    ["BACKEND", "FRONTEND", "FULLSTACK"],
    ["GROWTH", "STABLE", "VALUE", "POPULAR", "BALANCE", "BASIC"],
    ["KAKAO", "NAVER", "SHINHAN"],
];

export const BadgeData: BadgeType[] = [
    {
        id: 0,
        src: "/images/personal/shared/kakao-badge.png",
        name: "KAKAO",
        alias: "카카오", 
        raise: true,
    },
    {
        id: 1,
        src: "/images/personal/shared/naver-badge.png",
        name: "NAVER",
        alias: "네이버", 
        raise: false,
    },
    {
        id: 2,
        src: "/images/personal/shared/shinhan-badge.png",
        name: "SHINHAN",
        alias: "신한", 
        raise: true,
    },
];

export const BunnyFundingTypeData = [
    { id: 0, alias: "희소 자산형 (A)", name: "A" },
    { id: 0, alias: "밸런스형 (B)", name: "B" },
    { id: 0, alias: "단가 친화형 (C)", name: "C" },
];

export const PositionData = [
    { id: 0, alias: "백엔드", name: "BACKEND" },
    { id: 1, alias: "프론트엔드", name: "FRONTEND" },
    { id: 2, alias: "풀스택", name: "FULLSTACK" },
];

export const BunnyTraitsData = [   
    { id: 0, alias: "성장형", name: "GROWTH" },
    { id: 1, alias: "안정형", name: "STABLE" },
    { id: 2, alias: "가치형", name: "VALUE" },
    { id: 3, alias: "인기형", name: "POPULAR" },
    { id: 4, alias: "밸런스형", name: "BALANCE" },
    { id: 5, alias: "기본형", name: "BASIC" },
];

export const fieldList = [
    { key: "bunny_name", label: "버니 이름" },
    { key: "developer_type", label: "버니 성향" },
    { key: "position", label: "포지션" },
    { key: "current_price", label: "현재 가격" },
    { key: "fluctuation_rate", label: "변동률" },
    { key: "badges", label: "뱃지" },
];

export const notificationData = [
    { value: "reliavility", noti: `Rabbit 지수

    - 체결 강도 + 거래량 + 급등락 횟수 종합
    - 일 매수 체결 강도 수치 → 점수화 ⇒ 시장 심리 점수 산출

    - 지수 200 이상 : 심리 90점 (매우 긍정적)
    - 지수 100 이상: 심리 50점 (중립)
    - 지수 50 이상: 심리 20점 (매우 부정적)` },
    {
        value: "tradeStrength",
        noti: `· 거래된 매수 체결과 매도 체결의 비율을 의미하며, 아래의 수식으로 체결강도를 계산합니다.

(매수 체결량 / 매도 체결량) x 100

· 체결강도는 100% 초과 시 매수세가 강하며, 100% 미만 시 매도세가 강함을 의미합니다. (최대 500%까지 표기)

· 당일 매수 또는 매도가 없는 디지털 자산, 일 거래대금이 1 BTC 미만인 BTC 마켓의 디지털 자산은 체결강도 순위에 보이지 않습니다.`,
    },
];