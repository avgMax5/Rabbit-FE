import styled from "styled-components";
import Link from "next/link";
import MarketCap from "./MarketCap";
import Reliavility from "./Reliavility";
import GrowthRate from "./GrowthRate";
import RadialGraph from "./RadialGraph";
import CoinType from "./CoinType";
import AiSummarize from "@/app/personal/mypage/[user_id]/_sections/MyBunny/AiFeedBack";
import CustomerHold from "./CustomerHold";
import { useEffect, useState } from "react";
import { BunnyHolder, BunnyInfo, getBunnyMe } from "@/app/_api/bunnyAPI";
import { useUserStore } from "@/app/_store/userStore";
import { motion } from "framer-motion";
import { Bunny, useBunnyStore } from "@/app/_store/bunnyStore";

const bounceTopVariants = {
    animate: {
        y: [-2, -6, 0, -3, 0, -2, -2], // 살짝 위로 올랐다 내려오는 패턴
    },
};

const bounceTopTransition = {
    duration: 1.5,
    times: [0, 0.2, 0.4, 0.6, 0.75, 0.9, 1],
    ease: "easeInOut" as const,
    repeat: Infinity,
    repeatType: "loop" as const,
};

const radialObject: Bunny = {
    bunny_id: "",
    user_name: "레빗",
    bunny_name: "레빗 코인",
    developer_type: "디벨로퍼",
    bunny_type: "A형",
    position: "프론트엔드",
    reliability: 0,
    current_price: 0,
    closing_price: 0,
    market_cap: 0,
    fluctuation_rate: 0,
    growth: 0,
    stability: 0,
    value: 0,
    popularity: 0,
    balance: 0,
    badges: ["KAKAO"],
    like_count: 0,
    created_at: "2025-09-25",
};

function MyBunny() {
    const [bunnyInfo, setBunnyInfo] = useState<BunnyInfo>();
    const [bunnyHolder, setBunnyHolder] = useState<BunnyHolder[]>([]);
    const { user } = useUserStore();

    const bunnyRole = user?.role ?? "ROLE_USER";
    const bunnyName = user?.my_bunny_name ?? "";
    const devType = useBunnyStore((state) =>
        state.getBunnyByName(bunnyName)
    )?.developer_type;

    const radialData = useBunnyStore((state) =>
        state.getBunnyByName(bunnyName)
    );

    useEffect(() => {
        const fetchBunnyInfo = async () => {
            try {
                const data = await getBunnyMe();

                const customInfoData: BunnyInfo = {
                    bunny_type: data.bunny_type,
                    badges: data.badges,
                    reliability: data.reliability,
                    market_cap: data.market_cap,
                    current_price: data.current_price,
                    ai_feedback: data.ai_feedback,
                    like_count: data.like_count,
                };

                const customHolderData: BunnyHolder[] = data.holders.map(
                    (hold: BunnyHolder) => ({
                        developer_type: hold.developer_type,
                        percentage: hold.percentage,
                        count: hold.count,
                    })
                );
                console.log("커스텀홀더", customHolderData);
                console.log("커스텀인포", customInfoData);

                setBunnyInfo(customInfoData);
                setBunnyHolder(customHolderData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBunnyInfo();
    }, []);

    return (
        <>
            {bunnyRole === "ROLE_USER" ? (
                <BeforeBunny>
                    <BigTitle>상장이 필요합니다</BigTitle>
                    <SmallTitle>
                        아직 버니들에게 당신을 보여주지 않았어요
                        <br /> 상장을 통해 <b>로켓</b>에 탑승해주세요
                    </SmallTitle>
                    <ClosedImage src="/images/personal/mypage/closed_bunny.png" />
                    <Link href="/personal/publish">
                        <MoveFundingBtn
                            variants={bounceTopVariants}
                            animate="animate"
                            transition={bounceTopTransition}
                        >
                            <SmallRocketImage src="/images/personal/mypage/small_rocket.png" />
                            상장 페이지로 이동
                        </MoveFundingBtn>
                    </Link>
                </BeforeBunny>
            ) : (
                <Wrapper>
                    <FirstRow>
                        <Col>
                            <MarketCap
                                total={
                                    bunnyInfo?.market_cap.toLocaleString() ??
                                    "0"
                                }
                                price={
                                    bunnyInfo?.current_price.toLocaleString() ??
                                    "0"
                                }
                            />
                            <Reliavility
                                reliability={bunnyInfo?.reliability ?? 0}
                            />
                        </Col>
                        <GrowthRate bunnyName={bunnyName} />
                        <RadialGraph
                            data={radialData ?? radialObject}
                            devType={devType ?? "기본형"}
                        />
                    </FirstRow>
                    <SecondRow>
                        <CoinType type={bunnyInfo?.bunny_type} />
                        <AiSummarize
                            text={
                                bunnyInfo?.ai_feedback ??
                                "아직 AI 피드백이 완성되지 않았습니다"
                            }
                        />
                        <CustomerHold holderData={bunnyHolder} />
                    </SecondRow>
                </Wrapper>
            )}
        </>
    );
}
const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 16rem 1fr;
    gap: 1rem;
`;
const Row = styled.div`
    display: grid;
    gap: 1rem;
    width: 100%;
    height: 100%;
`;

const FirstRow = styled(Row)`
    width: 100%;
    height: 16rem;
    grid-template-columns: 2fr 4fr 2.5fr;
`;

const Col = styled.div`
    display: grid;
    gap: 1rem;
    grid-template-rows: 1fr 1.2fr;
`;

const SecondRow = styled(Row)`
    grid-row: 2;
    width: 100%;
    grid-template-columns: 1.8fr 3.5fr 3.6fr;
`;

const BeforeBunny = styled.div`
    display: flex;
    gap: 8px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 20px 10px;
    border-radius: 20px;
    background: rgba(135, 133, 133, 0.39);
`;

const BigTitle = styled.div`
    margin-bottom: 1rem;
    color: #fff;
    font-size: 45px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
`;

const SmallTitle = styled.div`
    color: #fff;
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 100;
    line-height: normal;
`;

const ClosedImage = styled.img`
    width: 160px;
    height: auto;
`;

const SmallRocketImage = styled.img`
    width: 20px;
    height: 20px;
`;

const MoveFundingBtn = styled(motion.button)`
    width: 9.6rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: 16px;
    border: none;
    background: rgba(254, 226, 167, 0.88);
    box-shadow: -1.913px -3.825px 6.376px 0 rgba(255, 177, 14, 0.84) inset,
        5.738px 3.825px 6.376px 0 #ffefce inset,
        2.55px 2.55px 3.825px 0 rgba(0, 32, 101, 0.366);

    color: #001f38;
    text-shadow: 1.275px 1.275px 0.638px rgba(0, 0, 0, 0.25);
    font-size: 13px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;

    cursor: pointer;
`;

export default MyBunny;
