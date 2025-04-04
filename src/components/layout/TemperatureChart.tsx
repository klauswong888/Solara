import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

interface TemperatureChartProps {
    data: { time: string; temperature: number; feelsLike: number }[];
}

export default function TemperatureChart({ data }: TemperatureChartProps) {
    const [xInterval, setXInterval] = useState(0); // 默认 1 小时

    // 自动调整横坐标间隔
    useEffect(() => {
        const handleResize = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 640) {
            setXInterval(2);
        } else {
            setXInterval(0);
        }
        };

        handleResize(); 
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <ResponsiveContainer width="90%" height={220}>
            <LineChart data={data} margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" interval={xInterval} tickFormatter={(value) => value.replace(":00", "")} label={{ value: "Time(Hour)", position: "insideBottomRight", offset: -5, dx: 10 }} />
                <YAxis label={{ value: "Temp(°C)", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temperature" name="Temperature" stroke="#FF5733" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="feelsLike" name="Apparent Temperature" stroke="#4287f5" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
        </ResponsiveContainer>
    );
}
