export function toTitleCase(value: string, isAddress: boolean) {
  const titleCasedValue = value.toLowerCase().split(' ').map(
    word => (word.charAt(0).toUpperCase() + word.slice(1))
  ).join(' ');
  // a little hacky but not really worth doing more efficiently at this scale
  return isAddress ? reCapitalizeState(titleCasedValue) : titleCasedValue;
}

export function reCapitalizeState(value: string) {
  const formatted = value.replace("Denver Co", "Denver CO");
  return formatted;
}