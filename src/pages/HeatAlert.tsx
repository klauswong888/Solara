import { useState, useRef, useEffect } from "react";
import UserLocationMap from "../components/UserLocationMap";
import { fetchTimeZone } from "../components/api/geolocation";

export default function HeatAlert() {
  const [address, setAddress] = useState<string>("Fetching your location...");
  const [timezone, setTimezone] = useState<string>("UTC");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

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
    <div className="p-4">
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
          <button className="bg-orange-500 text-white font-bold px-4 py-2 rounded-md transition duration-200 hover:bg-orange-600">
            Go
          </button>
          <button className="bg-orange-500 text-white font-bold px-4 py-2 rounded-md transition duration-200 hover:bg-orange-600">
            Add Another Site
          </button>
        </div>
      </div>

      {/* Google map container */}
      <UserLocationMap onLocationUpdate={handleLocationUpdate} lat={latitude} lng={longitude} />

      <div>
        <h2 className="text-2xl font-bold text-orange-500 whitespace-nowrap mt-5">Heat Severity</h2>
      </div>
    </div>
  );
}
