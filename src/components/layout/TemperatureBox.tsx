import React from "react";

interface TemperatureBoxProps {
    temperature: number;
    feelsLike: number;
    label: string;
}

function getColorByTemperature(temp: number): string {
    if (temp < 25) return "bg-yellow-200";
    if (temp < 35) return "bg-orange-300";
    if (temp < 40) return "bg-orange-500";
    return "bg-red-600";
}

export default function TemperatureBox({ temperature, feelsLike, label }: TemperatureBoxProps) {
    const tempColorClass = getColorByTemperature(temperature);
    const feelsLikeColorClass = getColorByTemperature(feelsLike);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className={`p-2 text-center ${tempColorClass} rounded-md m-1 w-24`}>
                <p className="font-bold">{temperature}°C</p>
            </div>
            <div className={`p-2 text-center ${feelsLikeColorClass} rounded-md m-1 w-24`}>
                <p className="font-bold">{feelsLike}°C</p>
            </div>
        </div>
    );
}
