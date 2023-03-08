export const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_URL_DEV;
export const NUM_MATCHES = 5;