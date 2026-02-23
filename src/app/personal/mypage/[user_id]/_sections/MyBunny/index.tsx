import styled from "styled-components";
import Link from "next/link";
import MarketCap from "./MarketCap";
import Reliavility from "./Reliavility";
import GrowthRate from "./GrowthRate";
import RadialGraph from "./RadialGraph";
import CoinType from "./CoinType";
import AiSummarize from "@/app/personal/mypage/[user_id]/_sections/MyBunny/AiFeedBack";
import CustomerHold from "./CustomerHold";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { BunnyHolder, BunnyInfo, getBunnyMe } from "@/app/_api/bunnyAPI";
import { useUserStore } from "@/app/_store/userStore";
import { motion } from "framer-motion";
import { Bunny, useBunnyStore } from "@/app/_store/bunnyStore";
import { useRouter } from "next/navigation";

const radialObject: Bunny = {
    bunny_id: "",
    user_name: "레빗",
    bunny_name: "레빗 코인",
    image: "/images/login/personalProfile.png",
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
    ai_review: "",
};

function MyBunny() {
    const [bunnyInfo, setBunnyInfo] = useState<BunnyInfo>();
    const [bunnyHolder, setBunnyHolder] = useState<BunnyHolder[]>([]);
    const { user } = useUserStore();
    const router = useRouter();

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
                console.log(data, "홀더스");

                const customInfoData: BunnyInfo = {
                    bunny_type: data.bunny_type,
                    badges: data.badges,
                    reliability: data.reliability,
                    market_cap: data.market_cap,
                    current_price: data.current_price,
                    ai_feedback: data.ai_feedback,
                    like_count: data.like_count,
                };

                const customHolderData: BunnyHolder[] = data.holder_types.map(
                    (hold: BunnyHolder) => ({
                        developerType: hold.developerType,
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
                </BeforeBunny>
            ) : (
                <Wrapper>
                    {bunnyRole === "ROLE_BUNNY" && (
                        <GoMyTrade
                            onClick={() =>
                                router.push(`/personal/trade/${bunnyName}`)
                            }
                        >
                            <Icon icon="subway:round-arrow-5" color="#fafafa" />
                            <GoTradeText>내 코인 거래</GoTradeText>
                        </GoMyTrade>
                    )}

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

const GoMyTrade = styled.div`
    position: absolute;
    top: 2.2rem;
    left: 15rem;
    display: flex;
    width: 9rem;
    height: 2.4rem;
    padding: 2px 10px 2px 9px;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    flex-shrink: 0;
    border-radius: 30px;
    background: #efeeee3e;
    border: 1px solid #ffffffca;
    box-shadow: 0 4px 4px 0 rgba(64, 64, 64, 0.189);

    cursor: pointer;
`;

const GoTradeText = styled.div`
    font-size: 13px;
    font-weight: 800;
    color: #fff;
`;

export default MyBunny;
