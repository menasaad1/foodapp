import { useState, useEffect } from 'react';
import { authClient, restaurantClient, orderClient } from '@/lib/api-client';

interface DashboardStats {
    totalUsers: number;
    activeRestaurants: number;
    totalRevenue: number;
    usersChange: number;
    restaurantsChange: number;
    revenueChange: number;
    loading: boolean;
    error: string | null;
}

export const useAdminStats = () => {
    const [stats, setStats] = useState<DashboardStats>({
        totalUsers: 0,
        activeRestaurants: 0,
        totalRevenue: 0,
        usersChange: 0,
        restaurantsChange: 0,
        revenueChange: 0,
        loading: true,
        error: null,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch users count (Mocking endpoint if user-service doesn't have /stats yet)
                const usersRes = await authClient.get('/users/stats').catch(() => ({ data: { count: 0 } }));

                // Fetch restaurants count
                const restaurantsRes = await restaurantClient.get('/restaurants/stats').catch(() => ({ data: { count: 0 } }));

                // Fetch revenue (Mocking order-service /stats)
                const revenueRes = await orderClient.get('/orders/stats/revenue').catch(() => ({ data: { total: 0 } }));

                setStats({
                    totalUsers: usersRes.data.count || 0,
                    activeRestaurants: restaurantsRes.data.count || 0,
                    totalRevenue: revenueRes.data.total || 0,
                    usersChange: 5, // Mock change for now
                    restaurantsChange: 2, // Mock change for now
                    revenueChange: 10, // Mock change for now
                    loading: false,
                    error: null,
                });
            } catch (err) {
                console.error('Failed to fetch admin stats:', err);
                setStats(prev => ({ ...prev, loading: false, error: "Failed to load stats" }));
            }
        };

        fetchStats();
    }, []);

    return stats;
};
