import Chart from "@/app/_shared/components/Chart";
import GlassBox from "@/app/personal/mypage/[user_id]/_components/GlassBox";
import { useState, useEffect } from "react";
import { getChart, ChartData } from "@/app/_api/bunnyAPI";

function GrowthRate() {
    const [chartData, setChartData] = useState<ChartData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchChartData = async () => {
        setIsLoading(true);
        try {
            const sampleData: ChartData = {
                bunny_name: "sample_bunny",
                interval: "DAILY",
                chart_data_list: [
                    { date: "2024-01-01", closing_price: 100, high_price: 105, low_price: 95, buy_quantity: 1000, sell_quantity: 800, trade_volume: 1800 },
                    { date: "2024-01-02", closing_price: 105, high_price: 110, low_price: 100, buy_quantity: 1200, sell_quantity: 900, trade_volume: 2100 },
                    { date: "2024-01-03", closing_price: 110, high_price: 115, low_price: 105, buy_quantity: 1100, sell_quantity: 1000, trade_volume: 2100 },
                    { date: "2024-01-04", closing_price: 108, high_price: 112, low_price: 106, buy_quantity: 900, sell_quantity: 1100, trade_volume: 2000 },
                    { date: "2024-01-05", closing_price: 115, high_price: 120, low_price: 110, buy_quantity: 1300, sell_quantity: 950, trade_volume: 2250 },
                    { date: "2024-01-06", closing_price: 120, high_price: 125, low_price: 115, buy_quantity: 1400, sell_quantity: 1000, trade_volume: 2400 },
                    { date: "2024-01-07", closing_price: 118, high_price: 122, low_price: 116, buy_quantity: 1000, sell_quantity: 1200, trade_volume: 2200 },
                ]
            };
            setChartData(sampleData);
        } catch (error) {
            console.error('차트 데이터 가져오기 실패:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchChartData();
    }, []);

    return (
        <GlassBox
            text="성장률"
            isNoti={false}
            color="#fff"
            backgroundColor="#001035a4"
        >
            <Chart chartData={chartData} isLoading={isLoading} />
        </GlassBox>
    );
}

export default GrowthRate;