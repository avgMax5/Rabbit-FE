"use client";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import * as echarts from "echarts";

export type ProgressDataType = {
    label: string;
    value: number;
};

export type ProgressData = ProgressDataType[];

interface ProgressBarProps {
    data: ProgressData;
}

function ProgressBar({ data }: ProgressBarProps) {
    const chartRef = useRef<HTMLDivElement>(null);
    const colors = ["#ff6848", "#ff836a", "#FF9782", "#FFBDAF", "#fecfc6"];

    useEffect(() => {
        if (!chartRef.current) return;
        const myChart = echarts.init(chartRef.current);

        const option: echarts.EChartsOption = {
            color: colors,
            xAxis: {
                type: "value",
                axisLine: { show: false },
                axisTick: { show: false }, // 눈금선 제거
                splitLine: { show: false }, // 격자선 제거
            },
            yAxis: {
                type: "category",
                data: data.map((item) => item.label),
                axisLine: { show: false }, // y축 실선 제거
                axisTick: { show: false }, // 눈금선 제거
                splitLine: { show: false },
            },
            series: [
                {
                    data: data.map((item, i) => ({
                        value: item.value,
                        itemStyle: {
                            color: colors[i % colors.length],
                            borderRadius: [10, 10, 10, 10, 10],
                        },
                    })),
                    type: "bar",
                    showBackground: true,
                    backgroundStyle: {
                        color: "rgba(180, 180, 180, 0.2)",
                        borderRadius: [10, 10, 10, 10, 10],
                    },
                    barWidth: 10,
                },
            ],
        };

        myChart.setOption(option);

        const resizeHandler = () => myChart.resize();
        window.addEventListener("resize", resizeHandler);

        const resizeObserver = new ResizeObserver(() => {
            myChart.resize();
        });
        resizeObserver.observe(chartRef.current);

        return () => {
            window.removeEventListener("resize", resizeHandler);
            myChart.dispose();
        };
    }, [data]);

    return <ProgressContainer ref={chartRef} />;
}

const ProgressContainer = styled.div`
    width: 20rem;
    height: 14rem;
    background-color: #fff;
`;

export default ProgressBar;
