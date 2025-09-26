"use client";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import * as echarts from "echarts";

export type ChartData = { value: number; name: string }[];

interface NightingaleChartProps {
    data: ChartData;
    colors?: string[];
    inner?: number | string;
    outer?: number | string;
}

function NightingaleChart({
    data,
    colors,
    inner,
    outer,
}: NightingaleChartProps) {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;
        const myChart = echarts.init(chartRef.current);
        const sum = data.reduce((a, b) => a + b.value, 0);
        const seriesData = sum === 0 ? [] : data;

        const option: echarts.EChartsOption = {
            color: colors,
            tooltip: {
                trigger: "item",
            },
            series: [
                {
                    name: "Access From",
                    type: "pie",
                    radius: [inner ?? 15, outer ?? 60],
                    center: ["68%", "50%"],
                    avoidLabelOverlap: false,
                    padAngle: 3,
                    itemStyle: {
                        borderRadius: 5,
                    },
                    label: {
                        show: false,
                        position: "center",
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 20,
                            fontWeight: "bold",
                        },
                    },
                    labelLine: {
                        show: false,
                    },

                    emptyCircleStyle: {
                        color: "#e0e0e0",
                    },
                    data: seriesData,
                },
            ],
            legend: {
                show: true,
                orient: "vertical", // 세로로 나열
                left: 0, // 오른쪽에 배치
                top: "20%", // 세로 중앙 정렬
                itemWidth: 14, // 범례 아이콘 너비
                itemHeight: 8, // 범례 아이콘 높이
                textStyle: {
                    fontSize: "10px",
                    color: "#000", // 글씨 색상
                },
            },
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

export default NightingaleChart;
