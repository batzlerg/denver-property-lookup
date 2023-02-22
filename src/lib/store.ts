import { writable } from "svelte/store";

interface Coordinates {
  lat: number;
  long: number;
}

export const coordinates = writable<Coordinates | null>(null);