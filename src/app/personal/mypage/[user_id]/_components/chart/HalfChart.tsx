"use client";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import * as echarts from "echarts";

export type ChartData = { value: number; name: string }[];

interface HalfChartProps {
    data: ChartData;
    colors?: string[];
    inner?: number;
    outer?: number;
}

function HalfChart({ data, colors, inner, outer }: HalfChartProps) {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;
        const myChart = echarts.init(chartRef.current);

        const option: echarts.EChartsOption = {
            color: colors,
            legend: {
                show: false,
            },
            series: [
                {
                    name: "신뢰도",
                    type: "pie",
                    radius: [inner ?? 28, outer ?? 70],
                    center: ["50%", "100%"],
                    startAngle: 180,
                    endAngle: 360,
                    label: {
                        show: false,
                        position: "center",
                    },
                    labelLine: {
                        show: false,
                    },
                    itemStyle: {
                        shadowColor: "rgba(0, 0, 0, 0.3)", // 그림자 색상
                        shadowBlur: 10, // 그림자 흐림 정도
                        shadowOffsetX: 0, // x축 이동
                        shadowOffsetY: 3, // y축 이동
                    },
                    data,
                },
            ],
        };

        myChart.setOption(option);

        const resizeHandler = () => myChart.resize();
        window.addEventListener("resize", resizeHandler);

        return () => {
            window.removeEventListener("resize", resizeHandler);
            myChart.dispose();
        };
    }, [data, colors]);

    return <ChartContainer ref={chartRef} />;
}

const ChartContainer = styled.div`
    width: 100%;
    height: 100%;
`;

export default HalfChart;
