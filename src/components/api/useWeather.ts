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
            const params = {
                latitude: lat,
                longitude: lng,
                hourly: "temperature_2m",
                current: "temperature_2m",
            };
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m&current_weather=true`;
            console.log("Fetching weather data from:", url);
            const response = await fetch(url);
            const data = await response.json();
            console.log("Weather API response:", data);

            if (!data || !data.current_weather || !data.hourly) {
                throw new Error("Incomplete weather data received");
            }

            const currentTemperature = data.current_weather.temperature;
            const hourlyTemperature = data.hourly.temperature_2m;
            const hourlyTime = data.hourly.time.map((t: string) => new Date(t));

            setWeatherData({
                currentTemperature,
                hourlyTemperature,
                hourlyTime,
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
