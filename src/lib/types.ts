// all copied from DB schema
export interface LocationProperty {
  parid: string;
  cd: string;
  ofcard: string;
  owner: string;
  co_owner: string;
  owner_num: string;
  owner_dir: string;
  owner_st: string;
  owner_type: string;
  owner_apt: string;
  owner_city: string;
  owner_state: string;
  owner_zip: string;
  site_nbr: string;
  site_dir: string;
  site_name: string;
  site_mode: string;
  site_more: string;
  tax_dist: string;
  prop_class_land: string;
  prop_class_imps: string;
  prop_class: string;
  zone10: string;
  d_class_cn: string;
  land_sqft: number;
  area_abg: number;
  bsmt_area: number;
  fbsmt_sqft: number;
  grd_area: number;
  story: number | null,
  style_cn: string;
  bed_rms: number | null,
  full_b: number | null,
  hlf_b: number | null,
  ccyrblt: number | null, // todo: this is bigint in schema...why
  ccage_rm: number | null, // todo: this is bigint in schema...why
  units: number;
  asmt_appr_land: number;
  total_value: number;
  asdland: number;
  assess_value: number;
  asmt_taxable: number;
  asmt_exempt_amt: number;
  nbhd_1: number;
  nbhd_1_cn: string;
  legl_description: string;
  property_address: string;
}

export interface PropertyData {
  ownerName: string,
  ownerAddress: string,
  year: number,
  renovatedYear: number,
  propertyClass: string,
  landAreaSqft: number,
  stories: number,
  units: number,
  bedrooms: number,
  bathrooms: number,
  neighborhood: string,
  valuation: {
    assessedLandValue: number,
    actualLandValue: number,
    assessedTotalValue: number,
    actualTotalValue: number,
  },
}

export interface PropertyCache {
  [key: string]: LocationProperty
}