import { useEffect, useRef, useState } from "react";

export default function HeatAlert() {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const inputRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Load Google Maps script
    if (!window.google || !window.google.maps) {
      console.error("Google Maps haven't loaded yet. Please try again later.");
      return;
    }

    // Check if mapRef is defined
    if (!mapRef.current) return;

    // Initialize autocomplete
    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ["geocode"],
    });

    // Initialize map
    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: -37.8136, lng: 144.9631 }, // Default location (Melbourne)
      zoom: 13,
    });

    // Make marker
    const markerInstance = new window.google.maps.Marker({
      map: mapInstance,
      position: mapInstance.getCenter(),
    });

    setMap(mapInstance);
    setMarker(markerInstance);

    // Listener for place changed
    const onPlaceChanged = () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;

      const location = place.geometry.location;
      mapInstance.setCenter(location);
      markerInstance.setPosition(location);
    };

    autocomplete.addListener("place_changed", onPlaceChanged);

    // Remove the listener when the component unmounts
    return () => {
      window.google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center gap-x-4 justify-between w-full">
        {/* Title */}
        <h2 className="text-2xl font-bold text-orange-500 whitespace-nowrap">Choose your location</h2>

        {/* Location input */}
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter a location"
          className="flex-1 min-w-40 max-w-2xl px-4 py-2 border-2 border-gray-500 rounded-md"
        />

        {/* Buttons */}
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
      <div ref={mapRef} className="mt-4 w-full h-100 border rounded-md" />
    </div>
  );
}
