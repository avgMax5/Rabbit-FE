"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import styled from "styled-components";
import { BunnyHolder } from "@/app/_api/bunnyAPI";

interface BubbleChartProps {
    data: BunnyHolder[];
}

const defaultData = [
    { type: "GROWTH", value: 0 },
    { type: "STABLE", value: 0 },
    { type: "VALUE", value: 0 },
    { type: "POPULAR", value: 0 },
    { type: "BALANCE", value: 0 },
];

function BubbleChart({ data }: BubbleChartProps) {
    const chartRef = useRef<HTMLDivElement>(null);
    const colors = ["#ff6848", "#ff836a", "#FF9782", "#FFBDAF", "#fecfc6"];

    const chartData = defaultData.map((d) => {
        const match = data.find((item) => item.developer_type === d.type);
        return {
            ...d,
            value: match ? match.percentage : 0,
        };
    });

    const seriesData = chartData.map((d, i) => ({
        value: d.value,
        itemStyle: { color: colors[i % colors.length] },
    }));

    console.log(seriesData);

    useEffect(() => {
        if (!chartRef.current) return;

        const myChart = echarts.init(chartRef.current, undefined, {
            width: 300,
            height: 240,
        });

        const option: echarts.EChartsOption = {
            grid: { top: "10px", containLabel: false },
            color: colors,
            xAxis: {
                type: "category",
                data: ["성장형", "안정형", "가치형", "인기형", "밸런스형"],
                axisLabel: {
                    color: "#f5ca4a",
                    fontSize: 8,
                    fontWeight: "bold",
                },
                axisLine: {
                    lineStyle: { color: "#ffffff" },
                },
                axisTick: {
                    lineStyle: { color: "#ffffff" },
                },
            },
            yAxis: {
                type: "value",
            },
            series: [
                {
                    data: seriesData,
                    type: "bar",
                    barWidth: 20,
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
    }, [data]);

    return <ChartContainer ref={chartRef} />;
}

const ChartContainer = styled.div`
    width: 20rem;
    height: 14rem;
    padding: 20px 25px;
    margin: 0 auto;
`;

export default BubbleChart;
