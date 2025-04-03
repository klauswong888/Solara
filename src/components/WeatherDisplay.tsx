import React from "react";
import TemperatureBox from "./layout/TemperatureBox";
import TemperatureChart from "./layout/TemperatureChart";

interface WeatherDisplayProps {
    type: "today" | "3days" | "7days";
    data: { date: string; time: string; temperature: number; feelsLike: number }[];
}

// Summarize daily data
function summarizeDailyData(data: { date: string; temperature: number; feelsLike: number }[]) {
    const dailySummary: { date: string; temperature: number; feelsLike: number }[] = [];
    const dailyData: { [key: string]: { maxTemp: number; maxFeelsLike: number } } = {};

    data.forEach((d) => {
        const day = d.date;
        if (!dailyData[day]) {
            dailyData[day] = { maxTemp: d.temperature, maxFeelsLike: d.feelsLike };
        } else {
            dailyData[day].maxTemp = Math.max(dailyData[day].maxTemp, d.temperature);
            dailyData[day].maxFeelsLike = Math.max(dailyData[day].maxFeelsLike, d.feelsLike);
        }
    });

    for (const [day, values] of Object.entries(dailyData)) {
        dailySummary.push({ date: day, temperature: values.maxTemp, feelsLike: values.maxFeelsLike });
    }

    return dailySummary;
}

export default function WeatherDisplay({ type, data }: WeatherDisplayProps) {
    if (!Array.isArray(data) || data.length === 0) {
        return <p>No weather data available.</p>;
    }

    // **Today**: 显示折线图
    if (type === "today") {
        return (
            <TemperatureChart
                data={data.map((d) => ({ time: d.time, temperature: d.temperature }))}
            />
        );
    }

    // **3days** 和 **7days**: 显示汇总温度块
    if (type === "3days" || type === "7days") {
        return (
            <div className="flex flex-col items-center justify-center gap-2 mt-4">
                <div className="flex justify-center gap-4">
                    {data.map((d, index) => (
                        <div key={index} className="text-center font-bold p-2">{d.date}</div>
                    ))}
                </div>
                <div className="flex justify-center gap-4">
                    {data.map((d, index) => (
                        <TemperatureBox
                            key={index}
                            temperature={d.maxTemperature}
                            feelsLike={d.maxFeelsLike}
                            label={d.date}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return null;
}

