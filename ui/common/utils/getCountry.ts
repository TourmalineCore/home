import whichCountry from "which-country";

export async function getCountry(): Promise<string | null> {
  if (navigator.geolocation) {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const country = whichCountry([position.coords.longitude, position.coords.latitude]);

      return country;
    } catch {
      return null;
    }
  }
  return null;
}
