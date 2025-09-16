declare module "react-bubble-chart" {
    import * as React from "react";

    export interface BubbleChartDataItem {
        name: string;
        value: number;
        color?: string;
        children?: BubbleChartDataItem[];
    }

    export interface BubbleChartProps {
        data: BubbleChartDataItem[];
        className?: string;
        onClick?: (data: BubbleChartDataItem) => void;
        [key: string]: any;
    }

    const ReactBubbleChart: React.ComponentType<BubbleChartProps>;
    export default ReactBubbleChart;
}
