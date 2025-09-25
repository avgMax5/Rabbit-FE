// import React from "react";
// import styled from "styled-components";
// import * as echarts from "echarts";

// export type BubbleDataItem = [number, number, number, string];
// // [x, y, size, label]

// interface BubbleChartProps {
//     data: BubbleDataItem[];
//     width?: number;
//     height?: number;
//     xMin?: number;
//     xMax?: number;
//     yMin?: number;
//     yMax?: number;
//     maxRadius?: number;
//     minRadius?: number;
// }

// function BubbleChart({
//     data,
//     width = 240,
//     height = 200,
//     xMin = 0,
//     xMax = 50,
//     yMin = 0,
//     yMax = 50,
//     maxRadius = 120,
//     minRadius = 10,
// }: BubbleChartProps) {
//     const scaleX = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
//     const scaleY = (y: number) =>
//         height - ((y - yMin) / (yMax - yMin)) * height;
//     const scaleRadius = (r: number) =>
//         Math.max(minRadius, Math.min(maxRadius, r));
//     const colors = ["#ff6848", "#ff836a", "#FF9782", "#FFBDAF", "#fecfc6"];

//     return (
//         <ChartContainer style={{ width, height }}>
//             {data.map(([x, y, size, label], i) => (
//                 <Bubble
//                     key={i}
//                     size={scaleRadius(size)}
//                     color={colors[i % colors.length]}
//                     style={{
//                         top: scaleY(y) - scaleRadius(size),
//                         left: scaleX(x) - scaleRadius(size),
//                     }}
//                 >
//                     {label}
//                 </Bubble>
//             ))}
//         </ChartContainer>
//     );
// }

// const ChartContainer = styled.div`
//     position: relative;
//     margin: 5% 0rem 0.6rem 1rem;
//     overflow: hidden;
// `;

// const Bubble = styled.div<{ size: number; color: string }>`
//     position: absolute;
//     width: ${({ size }) => size * 2}px;
//     height: ${({ size }) => size * 2}px;
//     background-color: ${({ color }) => color};
//     border-radius: 50%;
//     box-shadow: 2px 2px 2px 0 #fe947f inset, -4px -4px 4px 0 #0704033e inset;
//     filter: drop-shadow(2px 2px 4px rgba(44, 44, 44, 0.5));
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     color: white;
//     font-size: 10px;
//     font-weight: 600;
// `;

// export default BubbleChart;

"use client"; // Next.js 환경이라면 필요

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
            width: 280,
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
