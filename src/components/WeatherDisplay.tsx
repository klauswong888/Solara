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
        <div className="flex flex-col items-center justify-center gap-4 mt-2 w-full">
            {/* Today: Show chart */}
            {type === "next24hours" && (
                <TemperatureChart data={data} />
            )}

            {/* 3 days and 7 days: Show temperature cards */}
            {(type === "3days" || type === "7days") && (
                <div className="flex flex-wrap gap-4 justify-center mt-4 w-full">
                {data.map((d, index) => (
                    <div
                    key={index}
                    className="flex flex-col md:flex-col items-center md:items-stretch w-full sm:w-[45%] md:w-[20%] bg-white/50 backdrop-blur-md shadow-md rounded-xl p-4"
                    >
                    {/* 日期 */}
                    <div className="text-center font-bold text-sm mb-2">{d.date}</div>

                    {/* Max Temperature */}
                    <div className="flex flex-col items-center justify-center w-full mb-2">
                        <div className="text-xs font-semibold text-gray-500 mb-1">Max Temperature</div>
                        {d.maxTemperature !== undefined && d.maxTemperature !== null ? (
                        <TemperatureBox
                            temperature={d.maxTemperature}
                            feelsLike={0}
                            label="Max Temp"
                        />
                        ) : (
                        <div className="text-gray-500">-</div>
                        )}
                    </div>

                    {/* Max Apparent Temperature */}
                    <div className="flex flex-col items-center justify-center w-full">
                        <div className="text-xs font-semibold text-gray-500 mb-1">Max Apparent Temperature</div>
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
                    </div>
                ))}
                </div>
            )}

            {/* Disclaimer Section */}
            <div className="flex mt-6 justify-end text-gray-500 text-sm w-full px-2 md:px-0">
                <p className="text-center md:text-right w-full md:w-auto">
                Disclaimer: Weather data is sourced from OpenMeteo. OpenMeteo reserves the right of final interpretation.
                Learn more at{" "}
                <a
                    href="https://open-meteo.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                >
                    OpenMeteo
                </a>.
                </p>
            </div>
        </div>
    );
}
