"use client";
import React, { useEffect, useRef } from "react";
import { Bunny } from "../../_store/bunnyStore";

interface PentagonChartProps {
    data: Bunny;
}

const PentagonChart = ({ data }: PentagonChartProps) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!window.echarts) {
            const script = document.createElement("script");
            script.src =
                "https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.3/echarts.min.js";
            script.onload = () => {
                initChart();
            };
            document.head.appendChild(script);
        } else {
            initChart();
        }

        return () => {
            if (chartRef.current && window.echarts) {
                window.echarts.dispose(chartRef.current);
            }
        };
    }, []);

    const initChart = () => {
        if (!chartRef.current || !window.echarts) return;

        const myChart = window.echarts.init(chartRef.current);
        const values = [
            data.growth,
            data.stability,
            data.popularity,
            data.value,
            data.reliability,
        ];

        const option = {
            radar: {
                indicator: [
                    { name: "성장형", max: 100 },
                    { name: "안정형", max: 100 },
                    { name: "인기형", max: 100 },
                    { name: "가치형", max: 100 },
                    { name: "밸런스형", max: 100 },
                ],
                center: ["50%", "50%"],
                radius: "65%",
                axisName: {
                    color: "#ffffff",
                    fontSize: 12,
                    fontWeight: "bold",
                },
                splitLine: {
                    lineStyle: {
                        color: "rgba(65, 65, 65, 0.3)",
                        width: 1,
                    },
                },
                splitArea: {
                    areaStyle: {
                        color: ["rgba(65, 65, 65, 0.05)", "transparent"],
                        opacity: 0.3,
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: "rgba(65, 65, 65, 0.4)",
                    },
                },
            },
            series: [
                {
                    name: "능력 지표",
                    type: "radar",
                    data: [
                        {
                            value: values,
                            name: "능력 지표",
                        },
                    ],
                    symbol: "circle",
                    symbolSize: 6,
                    lineStyle: {
                        color: "#909",
                        width: 2,
                    },
                    areaStyle: {
                        color: "#a017a0bd",
                    },
                    itemStyle: {
                        color: "#008b61",
                    },
                },
            ],
        };

        myChart.setOption(option);

        const handleResize = () => {
            myChart.resize();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    };

    return (
        <div
            ref={chartRef}
            style={{
                width: "100%",
                height: "100%",
                minHeight: "150px",
            }}
        />
    );
};

export default PentagonChart;
