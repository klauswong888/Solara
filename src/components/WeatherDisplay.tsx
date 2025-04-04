import React from "react";
import TemperatureBox from "./layout/TemperatureBox";
import TemperatureChart from "./layout/TemperatureChart";

interface WeatherDisplayProps {
    type: "next24hours" | "3days" | "7days";
    data: { date?: string; time?: string; temperature?: number; feelsLike?: number; maxTemperature?: number; maxFeelsLike?: number }[];
}

export default function WeatherDisplay({ type, data }: WeatherDisplayProps) {
    if (!Array.isArray(data) || data.length === 0) {
        return <p>No weather data available.</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4 mt-2">
            {/* Today: Show chart */}
            {type === "next24hours" && (
                <TemperatureChart data={data} />
            )}

            {/* 3 days and 7 days: Show temperature boxes */}
            {(type === "3days" || type === "7days") && (
                <div className="flex justify-start gap-2 mt-2 h-[150px]">
                    {/* Left Column for Labels */}
                    <div className="flex flex-col justify-end items-center gap-7 min-w-[100px] h-full pr-2 pb-5">
                        <div className="text-large font-bold">Max Temperature</div>
                        <div className="text-large font-bold">Max Apparent Temperature</div>
                    </div>

                    {/* Date and Temperature Columns */}
                    <div className="flex gap-4 overflow-x-auto">
                        {data.map((d, index) => (
                            <div key={index} className="flex flex-col items-center gap-2 min-w-[150px] border border-gray-300 p-2 rounded-md">
                                {/* Date */}
                                <div className="text-center font-bold">{d.date}</div>

                                {/* Max Temperature */}
                                {d.maxTemperature !== undefined && d.maxTemperature !== null ? (
                                    <TemperatureBox
                                        temperature={d.maxTemperature}
                                        feelsLike={0}
                                        label="Max Temp"
                                    />
                                ) : (
                                    <div className="text-gray-500">-</div>
                                )}

                                {/* Max Apparent Temperature */}
                                {d.maxFeelsLike !== undefined && d.maxFeelsLike !== null ? (
                                    <TemperatureBox
                                        temperature={d.maxFeelsLike}
                                        feelsLike={0}
                                        label="Apparent Temp"
                                    />
                                ) : (
                                    <div className="text-gray-500">-</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Disclaimer Section */}
            <div className="flex mt-2 justify-end text-gray-500 text-sm">
                <p>
                    Disclaimer: Weather data is sourced from OpenMeteo. OpenMeteo reserves the right of final interpretation.
                    Learn more at <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">OpenMeteo</a>.
                </p>
            </div>
        </div>
    );
}
