import type { LocationProperty } from "./types";

export function toTitleCase(separator: RegExp, value: string) {
  return value.toLowerCase().split(separator).map(
    word => (word.charAt(0).toUpperCase() + word.slice(1))
  ).join('');
}

// todo: tests?
export function cleanOwnerName(name: string) {
  return name.replaceAll(',,', ',').replace(',', ', ');
}

// this title-cases only what's necessary to avoid mistaken title-casing
export function buildOwnerAddress(data: LocationProperty) {
  const residence = toTitleCase(
    /([\ -])/,
    [
      data.owner_num,
      data.owner_dir,
      data.owner_st,
      data.owner_type,
      data.owner_apt
    ].join(' ').trim()
  );

  const rest = [
    toTitleCase(/(\ )/, data.owner_city),
    data.owner_state,
  ].join(' ').trim();

  return `${residence}, ${rest}`;
}
