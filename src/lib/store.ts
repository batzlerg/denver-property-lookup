import { writable } from "svelte/store";
import type { LocationAddress, LocationProperty, PropertyCache } from './types';

export const locationAddress = writable<LocationAddress[]>([]);
export const addressInfo = writable<LocationProperty>(null);

export const propertyCache = writable<any>({});