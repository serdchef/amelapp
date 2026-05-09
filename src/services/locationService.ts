import * as Location from 'expo-location';

export interface GeoResult {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}

export async function requestAndGetLocation(): Promise<GeoResult | null> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return null;

    const loc = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    const addresses = await Location.reverseGeocodeAsync({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });

    const addr = addresses[0];
    let cityName = addr?.city ?? addr?.subregion ?? addr?.district ?? addr?.name;

    // Yedek: Eğer tarayıcıda veya başka sebeple isim gelmezse, Nominatim API ile dene
    if (!cityName || cityName === 'Bilinmiyor') {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&zoom=10&addressdetails=1`,
          { headers: { 'User-Agent': 'FaziletliAmellerApp' } }
        );
        const data = await response.json();
        cityName = data.address?.city ?? data.address?.town ?? data.address?.village ?? data.address?.province ?? 'Konum Belirlendi';
      } catch {
        cityName = 'Konum Belirlendi';
      }
    }

    return {
      latitude:  loc.coords.latitude,
      longitude: loc.coords.longitude,
      city:    cityName,
      country: addr?.isoCountryCode ?? 'TR',
    };
  } catch (e) {
    console.error('Location error:', e);
    return null;
  }
}
