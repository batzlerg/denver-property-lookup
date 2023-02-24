export const MAPS_API_URL = "https://maps.googleapis.com/maps/api/geocode/json";
export const API_URL = import.meta.env.MODE === 'production' ? '' : import.meta.env.VITE_API_URL;
export const NUM_MATCHES = 5;