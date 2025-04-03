import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

interface TemperatureChartProps {
    data: { time: string; temperature: number }[];
}

export default function TemperatureChart({ data }: TemperatureChartProps) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="time"
                    interval={3} // 每隔3小时显示一次
                    tickFormatter={(value) => value.replace(":00", "")} // 精简显示
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="#FF5733"
                    strokeWidth={2}
                    dot={{ r: 4 }}  // 调整点的大小
                    activeDot={{ r: 6 }} // 高亮点
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
