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
  const [tab, setTab] = useState<"today" | "3days" | "7days">("today");

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

  // Transform weather data for display
  const transformedData = Array.isArray(weatherData.hourlyTime)
    ? weatherData.hourlyTime.map((time, index) => ({
      date: new Date(time).toLocaleString("en-GB", { weekday: "long", day: "numeric", month: "short" }),  // e.g., "Mon, 1 Jan"
      time: new Date(time).toLocaleString("en-GB", { hour: "2-digit" }),
      temperature: weatherData.hourlyTemperature[index],
      feelsLike: weatherData.hourlyTemperature[index],
    }))
    : [];

  // Data filtering based on selected tab
  const filteredData = (() => {
    if (tab === "today") {
      return transformedData.slice(0, 24);  // 24 Hours
    } else if (tab === "3days") {
      return transformedData.slice(0, 72);  // 72 Hours
    } else if (tab === "7days") {
      return transformedData.slice(0, 168); // 168 Hours
    }
    return [];
  })();


  // console.log("Weather data:", weatherData);

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
    <div>
      <div className="flex items-center gap-x-4 justify-between w-full">
        <h2 className="text-2xl font-bold text-orange-500 whitespace-nowrap">Choose your location</h2>

        <input
          ref={inputRef}
          value={address || ""}
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter a location"
          className="flex-1 min-w-40 max-w-2xl px-4 py-2 border-2 border-gray-500 rounded-md"
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
      <div className="flex justify-between items-center mt-5">
        <h2 className="text-2xl font-bold text-orange-500">Heat Severity</h2>

        <div className="flex items-center gap-2">
          {["today", "3days", "7days"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as any)}
              className={`px-4 py-2 rounded-md ${tab === t ? "bg-orange-500 text-white" : "bg-gray-200"}`}
            >
              {t === "today" ? "Today" : t === "3days" ? "3 Days" : "7 Days"}
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

      <div className="mt-4">
        {filteredData.length > 0 ? (
          <WeatherDisplay type={tab} data={filteredData} />
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
}