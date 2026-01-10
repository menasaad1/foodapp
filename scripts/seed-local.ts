
const fetch = require('node-fetch'); // Assuming node-fetch is available or using built-in fetch in Node 18+

// Configuration
const SERVICES = {
    auth: 'http://localhost:3001',
    restaurant: 'http://localhost:3002',
    order: 'http://localhost:3003',
    user: 'http://localhost:3004',
    delivery: 'http://localhost:3005'
};

async function seed() {
    console.log('🌱 Starting Database Seed...');

    try {
        // 1. Create Customer
        console.log('Creating Customer...');
        const customerRes = await fetch(`${SERVICES.auth}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'customer@test.com',
                password: 'Password123!',
                fullName: 'Test Customer',
                role: 'CUSTOMER'
            })
        });
        const customer = await customerRes.json();
        console.log('✅ Customer Created:', customer.email || 'Already exists');

        // 2. Create Restaurant Owner
        console.log('Creating Restaurant Owner...');
        const ownerRes = await fetch(`${SERVICES.auth}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'owner@safadi.com',
                password: 'Password123!',
                fullName: 'Mr. Safadi',
                role: 'RESTAURANT_ADMIN'
            })
        });
        const owner = await ownerRes.json();
        console.log('✅ Owner Created:', owner.email || 'Already exists');

        // Login as Owner to get Token
        const loginRes = await fetch(`${SERVICES.auth}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'owner@safadi.com', password: 'Password123!' })
        });
        const { access_token } = await loginRes.json();

        if (!access_token) throw new Error('Failed to login as owner');

        // 3. Create Restaurant
        console.log('Creating Restaurant...');
        const restaurantRes = await fetch(`${SERVICES.restaurant}/restaurants`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify({
                name: 'Al Safadi - Dubai',
                description: 'Authentic Lebanese Cuisine and Grills',
                address: 'Sheikh Zayed Road, Dubai',
                isActive: true
            })
        });
        const restaurant = await restaurantRes.json();
        const restaurantId = restaurant.id || restaurant.data?.id; // Adjust based on API response structure
        console.log('✅ Restaurant Created:', restaurant.name || 'Already exists', `ID: ${restaurantId}`);

        if (restaurantId) {
            // 4. Add Menu Items
            console.log('Adding Menu Items...');
            const menuItems = [
                { name: 'Mixed Grill', description: 'Lamb chops, kebab, shish tawook', price: 85, category: 'Grills' },
                { name: 'Hummus', description: 'Traditional chickpea dip', price: 25, category: 'Starters' },
                { name: 'Fattoush', description: 'Fresh garden salad with toasted bread', price: 28, category: 'Salads' }
            ];

            for (const item of menuItems) {
                await fetch(`${SERVICES.restaurant}/restaurants/${restaurantId}/menu`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access_token}`
                    },
                    body: JSON.stringify(item)
                });
            }
            console.log('✅ Menu Items Added');

            // 5. Create a test Order
            console.log('Creating Test Order...');
            // Login as Customer
            const customerLoginRes = await fetch(`${SERVICES.auth}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: 'customer@test.com', password: 'Password123!' })
            });
            const { access_token: customerToken } = await customerLoginRes.json();

            await fetch(`${SERVICES.order}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${customerToken}`
                },
                body: JSON.stringify({
                    restaurantId: restaurantId,
                    items: [
                        { menuItemId: '1', quantity: 2, price: 85 } // Note: IDs might need to be dynamic, but this is a rough seed
                    ],
                    total: 170
                })
            });
            console.log('✅ Test Order Created');
        }

    } catch (error) {
        console.error('❌ Seeding Failed:', error.message);
    }
}

seed();
