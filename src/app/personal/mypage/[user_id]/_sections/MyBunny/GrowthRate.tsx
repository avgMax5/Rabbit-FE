import Chart from "@/app/_shared/components/Chart";
import GlassBox from "@/app/personal/mypage/[user_id]/_components/GlassBox";
import { useState, useEffect } from "react";
import { getChart, ChartData } from "@/app/_api/bunnyAPI";

function GrowthRate({ bunnyName }: { bunnyName: string }) {
    const [chartData, setChartData] = useState<ChartData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchChartData = async (period: string = "일") => {
        if (bunnyName === "") return;
        setIsLoading(true);
        try {
            const interval =
                period === "일"
                    ? "DAILY"
                    : period === "주"
                    ? "WEEKLY"
                    : "MONTHLY";
            const data = await getChart(bunnyName, interval);
            setChartData(data);
        } catch (error) {
            console.error("성장 차트 데이터 가져오기 실패:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchChartData();
    }, []);

    const handlePeriodChange = (period: string) => {
        fetchChartData(period);
    };

    return (
        <GlassBox
            text="성장곡선"
            isNoti={false}
            color="#e3e1e1f8"
            backgroundColor="#010b20b6"
        >
            <Chart
                chartData={chartData}
                isLoading={isLoading}
                onPeriodChange={handlePeriodChange}
                isMypage={true}
            />
        </GlassBox>
    );
}

export default GrowthRate;
