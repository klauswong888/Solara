import React from "react";

interface TemperatureBoxProps {
    temperature: number;
    label: string;
}

function getColorByTemperature(temp: number): string {
    if (temp < 25) return "bg-yellow-200";
    if (temp < 35) return "bg-orange-300";
    if (temp < 40) return "bg-orange-500";
    return "bg-red-600";
}

export default function TemperatureBox({ temperature, label }: TemperatureBoxProps) {
    const colorClass = getColorByTemperature(temperature);

    return (
        <div className={`p-2 text-center ${colorClass} rounded-md m-1`}>
            <p>{label}</p>
            <p className="font-bold">{temperature}°C</p>
        </div>
    );
}
