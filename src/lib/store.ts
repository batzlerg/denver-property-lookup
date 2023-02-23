import { writable } from "svelte/store";
import type { LocationProperty, PropertyCache } from './types';

export const currentAddress = writable<string>('');
export const matchingAddresses = writable<string[]>([]);
export const addressInfo = writable<LocationProperty>(null);

export const propertyCache = writable<PropertyCache>({});