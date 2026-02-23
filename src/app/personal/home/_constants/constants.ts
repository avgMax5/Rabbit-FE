import { BadgeType } from "../_types/interfaces";

export const SelectData: string[][] = [
    ["A", "B", "C"],
    ["BACKEND", "FRONTEND", "FULLSTACK"],
    ["GROWTH", "STABLE", "VALUE", "POPULAR", "BALANCE", "BASIC"],
    ["KAKAO", "NAVER", "SHINHAN", "COUPANG", "DAANGN", "HYUNDAI", "LG", "LINE", "SAMSUNG", "SK", "TOSS", "WOOWAHAN"],
];

export const BadgeData: BadgeType[] = [
    {
        id: 0,
        src: "/images/badge/kakao.png",
        name: "KAKAO",
        alias: "카카오",
        raise: true,
    },
    {
        id: 1,
        src: "/images/badge/naver.png",
        name: "NAVER",
        alias: "네이버",
        raise: false,
    },
    {
        id: 2,
        src: "/images/badge/shinhan.png",
        name: "SHINHAN",
        alias: "신한",
        raise: true,
    },
    {
        id: 3,
        src: "/images/badge/coupang.png",
        name: "COUPANG",
        alias: "쿠팡",
        raise: true,
    },
    {
        id: 4,
        src: "/images/badge/daangn.png",
        name: "DAANGN",
        alias: "당근",
        raise: true,
    },
    {
        id: 5,
        src: "/images/badge/hyundai.png",
        name: "HYUNDAI",
        alias: "현대",
        raise: true,
    },
    {
        id: 6,
        src: "/images/badge/lg.png",
        name: "LG",
        alias: "엘지",
        raise: true,
    },
    {
        id: 7,
        src: "/images/badge/line.png",
        name: "LINE",
        alias: "라인",
        raise: true,
    },
    {
        id: 8,
        src: "/images/badge/samsung.png",
        name: "SAMSUNG",
        alias: "삼성",
        raise: true,
    },
    {
        id: 9,
        src: "/images/badge/sk.png",
        name: "SK",
        alias: "에스케이",
        raise: true,
    },
    {
        id: 10,
        src: "/images/badge/toss.png",
        name: "TOSS",
        alias: "토스",
        raise: true,
    },
    {
        id: 11,
        src: "/images/badge/woowahan.png",
        name: "WOOWAHAN",
        alias: "우아한",
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
    { key: "user_name", label: "개발자" },
    { key: "developer_type", label: "개발자 유형" },
    { key: "position", label: "포지션" },
    { key: "current_price", label: "현재 가격" },
    { key: "fluctuation_rate", label: "변동률" },
    { key: "badges", label: "뱃지" },
];

export const notificationData = [
    {
        value: "reliavility",
        noti: `Rabbit 지수

    - 체결 강도 + 거래량 + 급등락 횟수 종합
    - 일 매수 체결 강도 수치 → 점수화 ⇒ 시장 심리 점수 산출

    - 지수 200 이상 : 심리 90점 (매우 긍정적)
    - 지수 100 이상: 심리 50점 (중립)
    - 지수 50 이상: 심리 20점 (매우 부정적)`,
    },
    {
        value: "tradeStrength",
        noti: `· 거래된 매수 체결과 매도 체결의 비율을 의미하며, 아래의 수식으로 체결강도를 계산합니다.

(매수 체결량 / 매도 체결량) x 100

· 체결강도는 100% 초과 시 매수세가 강하며, 100% 미만 시 매도세가 강함을 의미합니다. (최대 500%까지 표기)

· 당일 매수 또는 매도가 없는 디지털 자산, 일 거래대금이 1 BTC 미만인 BTC 마켓의 디지털 자산은 체결강도 순위에 보이지 않습니다.`,
    },
];
