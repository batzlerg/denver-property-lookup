import { writable } from "svelte/store";
import type { LocationProperty, PropertyCache } from './types';

export const currentAddress = writable<string>('');
export const matchingAddresses = writable<string[]>([]);
export const addressInfo = writable<LocationProperty>(null);

// todo: type
export const propertyCache = writable<any>({});