import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

interface TemperatureChartProps {
    data: { time: string; temperature: number; feelsLike: number }[];
}

export default function TemperatureChart({ data }: TemperatureChartProps) {
    return (
        <ResponsiveContainer width="90%" height={220}>
            <LineChart data={data} margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" interval={1} tickFormatter={(value) => value.replace(":00", "")} label={{ value: "Time", position: "insideRight", offset: -5 }} />
                <YAxis label={{ value: "Temp(°C)", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temperature" name="Temperature" stroke="#FF5733" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="feelsLike" name="Apparent Temperature" stroke="#4287f5" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
        </ResponsiveContainer>
    );
}
