import Chart from "@/app/_shared/components/Chart";
import GlassBox from "@/app/personal/mypage/[user_id]/_components/GlassBox";

function GrowthRate() {
    return (
        <GlassBox text="성장률" isNoti={false} color="#fff" backgroundColor="#091429">
            <Chart />
        </GlassBox>
    );
}

export default GrowthRate;
