import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

interface TemperatureChartProps {
    data: { time: string; temperature: number }[];
}

export default function TemperatureChart({ data }: TemperatureChartProps) {
    return (
        <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temperature" stroke="#FF5733" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
        </ResponsiveContainer>
    );
}
