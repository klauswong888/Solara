import { useState, useEffect } from "react";
import { fetchWeatherApi } from "openmeteo";

// 定义天气数据接口
interface WeatherData {
  currentTemperature: number | null;
  currentFeelsLike: number | null;
  hourlyTemperature: number[] | null;
  hourlyFeelsLike: number[] | null;
  hourlyTime: string[] | null;
  dailyMaxTemperature: number[] | null;
  dailyMaxFeelsLike: number[] | null;
  dailyTime: string[] | null;
  timezone: string;
  error: string | null;
}

// Helper function to form time ranges
const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

export default function useWeather(lat: number, lng: number): WeatherData {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    currentTemperature: null,
    currentFeelsLike: null,
    hourlyTemperature: null,
    hourlyFeelsLike: null,
    hourlyTime: null,
    dailyMaxTemperature: null,
    dailyMaxFeelsLike: null,
    dailyTime: null,
    timezone: "UTC",
    error: null,
  });

  useEffect(() => {
    async function fetchWeather() {
      try {
        // 构建API请求参数
        const params = {
          latitude: lat,
          longitude: lng,
          daily: ["temperature_2m_max", "apparent_temperature_max"],
          hourly: ["temperature_2m", "apparent_temperature"],
        };
        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);
        const response = responses[0];

        // 提取时区和偏移量
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const timezone = response.timezone();

        // 获取小时和每日数据
        const hourly = response.hourly();
        const daily = response.daily();

        // 解析小时数据
        const hourlyTime = range(
          Number(hourly.time()),
          Number(hourly.timeEnd()),
          hourly.interval()
        ).map((t) => 
          new Date((t + utcOffsetSeconds) * 1000).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
        const hourlyTemperature = hourly.variables(0)!.valuesArray()!;
        const hourlyFeelsLike = hourly.variables(1)!.valuesArray()!;

        // 解析每日数据
        const dailyTime = range(
          Number(daily.time()),
          Number(daily.timeEnd()),
          daily.interval()
        ).map((t) =>
          new Date((t + utcOffsetSeconds) * 1000).toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "short",
          })
        );
        const dailyMaxTemperature = daily.variables(0)!.valuesArray()!;
        const dailyMaxFeelsLike = daily.variables(1)!.valuesArray()!;

        // 计算当前温度和体感温度（取最近一小时数据）
        const currentTemperature = hourlyTemperature[0] ?? null;
        const currentFeelsLike = hourlyFeelsLike[0] ?? null;

        // 更新状态
        setWeatherData({
          currentTemperature,
          currentFeelsLike,
          hourlyTemperature,
          hourlyFeelsLike,
          hourlyTime,
          dailyMaxTemperature,
          dailyMaxFeelsLike,
          dailyTime,
          timezone,
          error: null,
        });

        console.log("Weather Data Fetched:", {
          currentTemperature,
          currentFeelsLike,
          hourlyTemperature,
          hourlyFeelsLike,
          hourlyTime,
          dailyMaxTemperature,
          dailyMaxFeelsLike,
          dailyTime,
          timezone,
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
