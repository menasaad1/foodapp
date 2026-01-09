import { authClient } from './api-client';

export const authApi = {
    login: async (email, password) => {
        const response = await authClient.post('/auth/login', { email, password });
        return response.data;
    },
    register: async (email, password) => {
        const response = await authClient.post('/auth/register', { email, password });
        return response.data;
    },
    getProfile: async () => {
        const response = await authClient.get('/auth/profile');
        return response.data;
    },
};
