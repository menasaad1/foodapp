import { orderClient } from './api-client';

export interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: string;
    items: OrderItem[];
    totalAmount: number;
    status: string;
    createdAt: string;
}

export const orderApi = {
    create: async (restaurantId: string, items: { menuItemId: string; quantity: number }[]) => {
        const response = await orderClient.post('/orders', { restaurantId, items });
        return response.data;
    },
    getAll: async () => {
        const response = await orderClient.get('/orders');
        return response.data;
    },
    getOne: async (id: string) => {
        const response = await orderClient.get(`/orders/${id}`);
        return response.data;
    },
};
