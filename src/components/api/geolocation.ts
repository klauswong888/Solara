// Get coordinates from address
export const fetchCoordinates = async (address: string, apiKey: string) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.status === "OK" && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    }
    return null;
  };
  
  // Get address from coordinates
  export const fetchAddressFromCoords = async (lat: number, lng: number, apiKey: string) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.status === "OK" && data.results.length > 0) {
      return data.results[0].formatted_address;
    }
    return null;
  };
  
  // Get timezone from coordinates
  export const fetchTimeZone = async (lat: number, lng: number, apiKey: string) => {
    const timestamp = Math.floor(Date.now() / 1000);
    const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.timeZoneId || "UTC";
  };
  