import { useState, useEffect } from "react";
import { fetchWeatherApi } from "openmeteo";

interface WeatherData {
  currentTemperature: number | null;
  hourlyTemperature: number[] | null;
  hourlyTime: Date[] | null;
  timezone: string;
  error: string | null;
}

export default function useWeather(lat: number, lng: number): WeatherData {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    currentTemperature: null,
    hourlyTemperature: null,
    hourlyTime: null,
    timezone: "UTC",
    error: null,
  });

  useEffect(() => {
    async function fetchWeather() {
        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,apparent_temperature_max&hourly=temperature_2m&timezone=GMT`;
            const response = await fetch(url);
            const data = await response.json();

            if (!data.daily || !data.hourly) {
                throw new Error("Incomplete weather data received");
            }

            const currentTemperature = data.current_weather?.temperature;
            const hourlyTemperature = data.hourly.temperature_2m;
            const hourlyTime = data.hourly.time;

            // 提取每日最高温度和最高体感温度
            const dailyMaxTemperature = data.daily.temperature_2m_max;
            const dailyMaxFeelsLike = data.daily.apparent_temperature_max;
            const dailyTime = data.daily.time;

            setWeatherData({
                currentTemperature,
                hourlyTemperature,
                hourlyTime,
                dailyMaxTemperature,
                dailyMaxFeelsLike,
                dailyTime,
                timezone: data.timezone,
                error: null,
            });
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setWeatherData((prev) => ({
                ...prev,
                error: "Error fetching weather data",
            }));
        }
    }

    if (lat && lng) {
        fetchWeather();
    }
}, [lat, lng]);

  return weatherData;
}
