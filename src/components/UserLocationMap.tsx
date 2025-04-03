import { useEffect, useRef, useState } from "react";
import { fetchAddressFromCoords } from "./api/geolocation";

interface UserLocationMapProps {
    onLocationUpdate: (address: string, lat: number, lng: number) => void;
    lat?: number;
    lng?: number;
}

export default function UserLocationMap({ onLocationUpdate, lat, lng }: UserLocationMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<google.maps.Map>();
    const markerInstance = useRef<google.maps.Marker>();

    useEffect(() => {
        async function initMap(latitude: number, longitude: number) {
            if (!mapInstance.current) {
                // Initialize map
                mapInstance.current = new window.google.maps.Map(mapRef.current!, {
                    center: { lat: latitude, lng: longitude },
                    zoom: 13,
                });

                // Initialize marker
                markerInstance.current = new window.google.maps.Marker({
                    map: mapInstance.current,
                    position: { lat: latitude, lng: longitude },
                    title: "Your Location",
                });

                // Fetch address and update
                const address = await fetchAddressFromCoords(latitude, longitude);
                onLocationUpdate(address, latitude, longitude);
            }
        }

        // Get user location on initial load
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                initMap(latitude, longitude);
            },
            (error) => {
                console.error("Error getting location:", error);
                // Fallback to Melbourne
                initMap(-37.8136, 144.9631);
            }
        );
    }, [onLocationUpdate]);

    // Update map and marker when lat/lng props change
    useEffect(() => {
        if (mapInstance.current && markerInstance.current && lat && lng) {
            mapInstance.current.setCenter({ lat, lng });
            markerInstance.current.setPosition({ lat, lng });
        }
    }, [lat, lng]);

    return <div ref={mapRef} className="mt-4 w-full h-[300px] border rounded-md" />;
}
