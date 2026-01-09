import axios from 'axios';

// Environment variables for each microservice
const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://localhost:3001';
const RESTAURANT_API_URL = process.env.NEXT_PUBLIC_RESTAURANT_API_URL || 'http://localhost:3002';
const ORDER_API_URL = process.env.NEXT_PUBLIC_ORDER_API_URL || 'http://localhost:3003';

// Helper to create an axios instance with auth interceptor
const createClient = (baseURL: string) => {
    const client = axios.create({
        baseURL,
        headers: { 'Content-Type': 'application/json' },
    });

    client.interceptors.request.use((config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return client;
};

export const authClient = createClient(AUTH_API_URL);
export const restaurantClient = createClient(RESTAURANT_API_URL);
export const orderClient = createClient(ORDER_API_URL);
