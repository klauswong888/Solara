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
        <div className="flex flex-col items-center justify-center gap-4 mt-4">
            {/* Today: Show chart */}
            {type === "next24hours" && (
                <TemperatureChart data={data} />
            )}

            {/* 3 days and 7 days: Show temperature boxes */}
            {(type === "3days" || type === "7days") && (
                <>
                    <div className="flex justify-center gap-4">
                        {data.map((d, index) => (
                            <div key={index} className="text-center font-bold p-2">{d.date}</div>
                        ))}
                    </div>

                    {/* Max Temperature Section */}
                    <div className="flex items-center gap-4">
                        <div className="text-xl font-bold">Max Temperature</div>
                        <div className="flex justify-start gap-4 flex-wrap">
                            {data
                                .filter((d) => d.maxTemperature !== undefined && d.maxTemperature !== null)
                                .map((d, index) => (
                                    <TemperatureBox
                                        key={`temp-${index}`}
                                        temperature={d.maxTemperature!}
                                        feelsLike={0}
                                        label={d.date || ""}
                                    />
                                ))}
                        </div>
                    </div>

                    {/* Feels Like Section */}
                    <div className="flex items-center gap-4">
                        <div className="text-xl font-bold">Max Apparent Temperature</div>
                        <div className="flex justify-start gap-4 flex-wrap">
                            {data
                                .filter((d) => d.maxFeelsLike !== undefined && d.maxFeelsLike !== null)
                                .map((d, index) => (
                                    <TemperatureBox
                                        key={`feelslike-${index}`}
                                        temperature={d.maxFeelsLike!}
                                        feelsLike={0}
                                        label={d.date || ""}
                                    />
                                ))}
                        </div>
                    </div>
                </>
            )}

            {/* Disclaimer Section */}
            <div className="flex justify-end mt-4 text-gray-500 text-sm">
                <p>
                    Disclaimer: Weather data is sourced from OpenMeteo. OpenMeteo reserves the right of final interpretation.
                    Learn more at <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">OpenMeteo</a>.
                </p>
            </div>
        </div>
    );
}
