import { API_URL } from "../constants";

export async function getAddressesMatchingLocation(latitude: number, longitude: number): Promise<string[]> {
  const url = new URL(`${API_URL}/location`);
  url.searchParams.append('lat', `${latitude}`);
  url.searchParams.append('lng', `${longitude}`);

  try {
    const response = await fetch(url, { headers: { 'ngrok-skip-browser-warning': 'true' } })
    if (response.ok) {
      const parsed = await response.json();
      return parsed;
    } else if (response.status === 404) {
      return [];
    } else {
      throw new Error(`something went wrong in the response: ${JSON.stringify(response)}`)
    }
  } catch (err) {
    // todo: handling
    console.error(err)
  }
}