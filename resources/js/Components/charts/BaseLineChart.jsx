import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import ChartCard from "./ChartCard";

export default function BaseLineChart({
    title,
    data,
    xKey,
    dataKey,
    stroke = "#4F46E5",
    height = 300,
}) {
    return (
        <ChartCard title={title}>
            <ResponsiveContainer width="100%" height={height}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey={xKey} />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey={dataKey}
                        stroke={stroke}
                        strokeWidth={3}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}