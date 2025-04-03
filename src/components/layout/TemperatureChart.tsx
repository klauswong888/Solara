import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface TemperatureChartProps {
    data: { time: string; temperature: number }[];
}

export default function TemperatureChart({ data }: TemperatureChartProps) {
    return (
        <ResponsiveContainer width="100%" height={100}>
            <LineChart data={data}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="temperature" stroke="#FF5733" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    );
}
