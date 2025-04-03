import React from "react";
import TemperatureBox from "./layout/TemperatureBox";
import TemperatureChart from "./layout/TemperatureChart";

interface WeatherDisplayProps {
    type: "today" | "3days" | "7days";
    data: { date: string; temperature: number; feelsLike: number }[];
}

export default function WeatherDisplay({ type, data }: WeatherDisplayProps) {
    if (!Array.isArray(data) || data.length === 0) {
        return <p>No weather data available.</p>;
    }

    if (type === "today") {
        // Show temperature chart for "today"
        return (
            <TemperatureChart
                data={data.map((d) => ({ time: d.date, temperature: d.temperature }))}
            />
        );
    }

    // Show temperature boxes for "3days" or "7days"
    return (
        <div className="grid grid-cols-7 gap-2">
            {data.map((d, index) => (
                <TemperatureBox key={index} temperature={d.temperature} label={d.date} />
            ))}
        </div>
    );
}
