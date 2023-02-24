import { writable } from "svelte/store";

export enum InputSources {
  MANUAL = "manual",
  GPS = "gps"
}
export const loadingInitiator = writable<InputSources>(null);