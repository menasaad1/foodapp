import { restaurantClient } from './api-client';

export interface Restaurant {
    id: string;
    name: string;
    description?: string;
    address?: string;
    phone?: string;
    isActive: boolean;
}

export const restaurantApi = {
    getAll: async (): Promise<Restaurant[]> => {
        const response = await restaurantClient.get('/restaurants');
        return response.data;
    },
    getOne: async (id: string) => {
        const response = await restaurantClient.get(`/restaurants/${id}`);
        return response.data;
    },
    getMenu: async (restaurantId: string) => {
        const response = await restaurantClient.get(`/restaurants/${restaurantId}/menus`);
        return response.data;
    },
};
