import { API_URL } from "../constants";
import type { LocationProperty, PropertyData } from "../types";

export async function getPropertyData(address: string): Promise<PropertyData> {
  const url = new URL(`${API_URL}/real_property_residential`);
  url.searchParams.append('property_address', `eq.${address}`);

  try {
    const response = await fetch(url)
    if (response.ok) {
      const parsed = await response.json();
      return parsePropertyData(parsed[0]);
    } else {
      throw new Error(`something went wrong in the response: ${JSON.stringify(response)}`)
    }
  } catch (err) {
    // todo: handling
    console.error(err)
  }
}

export function parsePropertyData(data: LocationProperty): PropertyData {
  const propertyData = {
    ownerName: cleanOwnerName(data.owner),
    ownerAddress: [data.owner_num, data.owner_dir, data.owner_st, data.owner_type, data.owner_apt, data.owner_city, data.owner_state, data.owner_zip].join(' '),
    year: data.ccyrblt,
    renovatedYear: data.ccage_rm,
    propertyClass: data.prop_class,
    landAreaSqft: data.land_sqft,
    stories: data.story,
    units: data.units,
    bedrooms: data.bed_rms,
    bathrooms: data.full_b + data.hlf_b,
    neighborhood: data.nbhd_1_cn,
    valuation: {
      assessedLandValue: data.asdland,
      actualLandValue: data.asmt_appr_land,
      assessedTotalValue: data.assess_value,
      actualTotalValue: data.total_value
    },
  };
  return propertyData;
}

// todo: tests?
function cleanOwnerName(name: string) {
  return name.replaceAll(',,', ',').replace(',', ', ');
}

export async function getAddressesMatchingInput(input: string): Promise<string[]> {
  const url = new URL(`${API_URL}/real_property_residential`);
  url.searchParams.append('property_address', `like.${input}*`); // * used as alias for % to avoid URL encoding issues
  url.searchParams.append('select', `property_address`);
  url.searchParams.append('limit', `5`);

  try {
    const response = await fetch(url)
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