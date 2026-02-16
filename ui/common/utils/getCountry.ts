import lookup from "coordinate_to_country";

export async function getCountry(): Promise<string | null> {
  if (navigator.geolocation) {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const country = await lookup(position.coords.latitude, position.coords.longitude);
      return country[0];
    } catch {
      return null;
    }
  }
  return null;
}
