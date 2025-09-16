import React from "react";
import styled from "styled-components";

export type BubbleDataItem = [number, number, number, string];
// [x, y, size, label]

interface BubbleChartProps {
    data: BubbleDataItem[];
    width?: number;
    height?: number;
    xMin?: number;
    xMax?: number;
    yMin?: number;
    yMax?: number;
    maxRadius?: number;
    minRadius?: number;
}

function BubbleChart({
    data,
    width = 240,
    height = 200,
    xMin = 0,
    xMax = 50,
    yMin = 0,
    yMax = 50,
    maxRadius = 120,
    minRadius = 10,
}: BubbleChartProps) {
    const scaleX = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
    const scaleY = (y: number) =>
        height - ((y - yMin) / (yMax - yMin)) * height;
    const scaleRadius = (r: number) =>
        Math.max(minRadius, Math.min(maxRadius, r));
    const colors = ["#ff6848", "#ff836a", "#FF9782", "#FFBDAF", "#fecfc6"];

    return (
        <ChartContainer style={{ width, height }}>
            {data.map(([x, y, size, label], i) => (
                <Bubble
                    key={i}
                    size={scaleRadius(size)}
                    color={colors[i % colors.length]}
                    style={{
                        top: scaleY(y) - scaleRadius(size),
                        left: scaleX(x) - scaleRadius(size),
                    }}
                >
                    {label}
                </Bubble>
            ))}
        </ChartContainer>
    );
}

const ChartContainer = styled.div`
    position: relative;
    margin: 5% 0rem 0.6rem 1rem;
    overflow: hidden;
`;

const Bubble = styled.div<{ size: number; color: string }>`
    position: absolute;
    width: ${({ size }) => size * 2}px;
    height: ${({ size }) => size * 2}px;
    background-color: ${({ color }) => color};
    border-radius: 50%;
    box-shadow: 2px 2px 2px 0 #fe947f inset, -4px -4px 4px 0 #0704033e inset;
    filter: drop-shadow(2px 2px 4px rgba(44, 44, 44, 0.5));
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 10px;
    font-weight: 600;
`;

export default BubbleChart;
