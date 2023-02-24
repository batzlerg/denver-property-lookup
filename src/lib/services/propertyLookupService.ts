import { API_URL, NUM_MATCHES } from "../constants";
import type { LocationProperty, PropertyData } from "../types";
import { buildOwnerAddress, cleanOwnerName, toTitleCase } from "../utils";

export async function getPropertyData(address: string): Promise<PropertyData> {
  const url = new URL(`${API_URL}/real_property_residential`);
  url.searchParams.append('property_address', `eq.${address}`);

  try {
    const response = await fetch(url, { headers: { 'ngrok-skip-browser-warning': 'true' } })
    if (response.ok) {
      const parsed = await response.json();

      if (parsed.length) {
        return parsePropertyData(parsed[0]);
      } else {
        throw new Error('no matching data for input address');
      }
    } else {
      throw new Error(`something went wrong in the response: ${JSON.stringify(response)}`)
    }
  } catch (err) {
    // todo: handling
    console.error(err);
    throw err;
  }
}

export function parsePropertyData(data: LocationProperty): PropertyData {
  // this method handles full addresses separately so that states
  // don't get title-cased (e.g. CO -> Co or WA -> Wa)
  const propertyDataBase: Pick<
    PropertyData,
    Exclude<keyof PropertyData, "ownerAddress">
  > = {
    address: data.property_address,
    ownerName: cleanOwnerName(data.owner),
    year: data.ccyrblt,
    renovatedYear: data.ccage_rm,
    propertyClass: data.prop_class,
    propertyUse: data.d_class_cn,
    finishedAreaSqft: data.area_abg,
    landAreaSqft: data.land_sqft,
    stories: data.story,
    units: data.units,
    bedrooms: data.bed_rms,
    bathrooms: data.full_b + data.hlf_b,
    neighborhood: data.nbhd_1_cn,
    assessedLandValue: data.asdland,
    actualLandValue: data.asmt_appr_land,
    assessedTotalValue: data.assess_value,
    actualTotalValue: data.total_value
  };

  for (const [key, value] of Object.entries(propertyDataBase)) {
    if (typeof value === 'string') {
      propertyDataBase[key] = toTitleCase(/([\ -()\/])/, value);
    }
  }

  return Object.assign({}, propertyDataBase, {
    ownerAddress: buildOwnerAddress(data)
  });
}

export async function getAddressesMatchingInput(input: string): Promise<string[]> {
  const url = new URL(`${API_URL}/real_property_residential`);
  url.searchParams.append('property_address', `like.${input}*`); // * used as alias for % to avoid URL encoding issues
  url.searchParams.append('select', `property_address`);
  url.searchParams.append('limit', String(NUM_MATCHES));

  try {
    const response = await fetch(url, { headers: { 'ngrok-skip-browser-warning': 'true' } })
    if (response.ok) {
      const parsed = await response.json();
      return parsed.map(addressObj => addressObj.property_address);
    } else {
      throw new Error(`something went wrong in the response: ${JSON.stringify(response)}`)
    }
  } catch (err) {
    // todo: handling
    console.error(err)
  }
}

export async function getAddressesFuzzyMatchingInput(input: string): Promise<string[]> {
  const url = new URL(`${API_URL}/rpc/fuzzy_search`);
  url.searchParams.append('term', `${input}`);

  try {
    const response = await fetch(url, { headers: { 'ngrok-skip-browser-warning': 'true' } })
    if (response.ok) {
      const parsed = await response.json();
      const mapped: string[] = parsed.map(addressObj => addressObj.property_address);
      const perfectMatch = mapped.find(address => address === input);
      return perfectMatch ? [perfectMatch] : [...new Set(mapped)].slice(0, NUM_MATCHES);
    } else {
      throw new Error(`something went wrong in the response: ${JSON.stringify(response)}`)
    }
  } catch (err) {
    // todo: handling
    console.error(err)
  }
}