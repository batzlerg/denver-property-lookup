import { MAPS_API_URL } from "../constants";

export async function getAddressesMatchingLocation(latitude, longitude): Promise<string[]> {
  const url = new URL(MAPS_API_URL);
  url.searchParams.append('latlng', `${latitude},${longitude}`);
  url.searchParams.append('key', import.meta.env.VITE_MAPS_API_KEY);
  url.searchParams.append('result_type', 'premise');

  try {
    const response = await fetch(url)
    if (response.ok) {
      const parsed = await response.json();
      return buildAddressStrings(parsed.results);
    } else {
      throw new Error(`something went wrong in the response: ${JSON.stringify(response)}`)
    }
  } catch (err) {
    // todo: handling
    console.error(err)
  }
}

export function buildAddressStrings(data: any[]) {
  if (!data.length) throw new Error("data has no results");

  return data.map((result) => {
    return (
      result.address_components[0].short_name +
      " " +
      result.address_components[1].short_name
    ).toUpperCase();
  });
}