import type { LocationAddress } from "../types";
import { MAPS_API_URL } from "../constants";

export async function getLocationAddress(latitude, longitude): Promise<LocationAddress[]> {
  const url = new URL(MAPS_API_URL);
  url.searchParams.append('latlng', `${latitude},${longitude}`);
  url.searchParams.append('key', import.meta.env.VITE_MAPS_API_KEY);
  url.searchParams.append('result_type', 'premise');

  try {
    const response = await fetch(url)
    if (response.ok) {
      const parsed = await response.json();
      console.table(parsed);
      return buildLocationAddress(parsed.results);
    } else {
      throw new Error(`something went wrong in the response: ${JSON.stringify(response)}`)
    }
  } catch (err) {
    // todo: handling
    console.error(err)
  }
}

export function buildLocationAddress(data: any[]) {
  if (!data.length) throw new Error("data has no results");

  return data.map((result) => ({
    addressComponents: result.address_components,
    formattedAddress: result.formatted_address,
  }));
}