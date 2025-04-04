import { useState, useRef, useEffect } from "react";
import UserLocationMap from "../components/UserLocationMap";
import { fetchTimeZone } from "../components/api/geolocation";
import TemperatureBox from "../components/layout/TemperatureBox";
import useWeather from "../components/api/useWeather";
import WeatherDisplay from "../components/WeatherDisplay";
import { Download } from "lucide-react";

export default function HeatAlert() {
  const [address, setAddress] = useState<string>("Fetching your location...");
  const [timezone, setTimezone] = useState<string>("UTC");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const weatherData = useWeather(latitude, longitude);
  const [tab, setTab] = useState<"next24hours" | "3days" | "7days">("next24hours");

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Fetch weather data based on latitude and longitude
  const handleGoClick = () => {
    if (latitude && longitude) {
      setLatitude(latitude);
      setLongitude(longitude);
      console.log(`Fetching weather for: ${latitude}, ${longitude}`);
    } else {
      console.error("Latitude or longitude is not set");
    }
  };

  // Transform weather data for today's display (hourly data)
  const transformedData = Array.isArray(weatherData.hourlyTime)
    ? weatherData.hourlyTime.slice(0, 24) // 
      .map((time, index) => ({
        time: time,
        temperature: Number(weatherData.hourlyTemperature[index].toFixed(2)),
        feelsLike: Number(weatherData.hourlyFeelsLike[index].toFixed(2)),
      }))
    : [];

  // Transform weather data for daily display (3days/7days)
  const dailyTransformedData = Array.isArray(weatherData.dailyTime)
    ? weatherData.dailyTime.map((time, index) => ({
      date: time,
      maxTemperature: Number(weatherData.dailyMaxTemperature[index].toFixed(2)),
      maxFeelsLike: Number(weatherData.dailyMaxFeelsLike[index].toFixed(2)),
    }))
      .slice(0, tab === "3days" ? 3 : 7)
    : [];

  console.log("Weather data:", weatherData);

  // Handle location update
  const handleLocationUpdate = async (newAddress: string, lat: number, lng: number) => {
    setAddress(newAddress);
    setLatitude(lat);
    setLongitude(lng);
    const tz = await fetchTimeZone(lat, lng, apiKey);
    setTimezone(tz);
    console.log(`Location: ${newAddress}, Timezone: ${tz}`);
  };

  // Initialize autocomplete for the address input
  useEffect(() => {
    if (!window.google || !window.google.maps || !inputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ["geocode"],
      componentRestrictions: { country: "au" },
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place && place.formatted_address) {
        const location = place.geometry?.location;
        if (location) {
          handleLocationUpdate(place.formatted_address, location.lat(), location.lng());
        }
      }
    });

    return () => {
      window.google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, []);

  return (
    <div className="w-full flex flex-col gap-6 px-4">
      <div className="flex flex-wrap gap-4 items-center justify-between w-full">
        <h2 className="text-2xl font-bold text-orange-500 whitespace-nowrap">Choose your location</h2>

        <input
          ref={inputRef}
          value={address || ""}
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter a location"
          className="flex-1 min-w-[150px] max-w-2xl px-4 py-2 border-2 border-gray-500 rounded-md"
        />

        <div className="flex gap-x-2">
          <button onClick={handleGoClick}
            className="bg-orange-500 text-white font-bold px-4 py-2 rounded-md transition duration-200 hover:bg-orange-600">
            Go
          </button>
          <button className="bg-orange-500 text-white font-bold px-4 py-2 rounded-md transition duration-200 hover:bg-orange-600">
            Add Another Site
          </button>
        </div>
      </div>

      {/* Google map container */}
      <UserLocationMap onLocationUpdate={handleLocationUpdate} lat={latitude} lng={longitude} />

      {/* Weather data display */}
      <div className="flex flex-wrap justify-between items-center gap-4 mt-4 w-full">
        <h2 className="text-2xl font-bold text-orange-500 whitespace-nowrap">Heat Severity</h2>

        <div className="flex flex-wrap items-center gap-2">
          {["next24hours", "3days", "7days"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as any)}
              className={`px-4 py-2 rounded-md ${tab === t ? "bg-orange-500 text-white" : "bg-gray-200"}`}
            >
              {t === "next24hours" ? "Next 24 Hours" : t === "3days" ? "3 Days" : "7 Days"}
            </button>
          ))}
          <button
            onClick={() => console.log("Exporting data...")}
            className="bg-green-500 text-white font-bold px-4 py-2 rounded-md transition duration-200 hover:bg-green-600 ml-2 flex items-center gap-2 w-auto"
          >
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      <div className="w-full">
        {tab === "next24hours" && transformedData.length > 0 ? (
          <WeatherDisplay type="next24hours" data={transformedData} />
        ) : (tab === "3days" || tab === "7days") && dailyTransformedData.length > 0 ? (
          <WeatherDisplay type={tab} data={dailyTransformedData} />
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
}
