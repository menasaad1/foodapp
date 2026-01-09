# Dajem - UAE Food Delivery App

A fully functional food delivery mobile app built with Next.js 16, Supabase, and Tailwind CSS. Designed specifically for UAE residents with culturally relevant aesthetics and local payment integration.

## Features Implemented

### Core Pages
- **Home** - Featured restaurants, cuisines, and promotional carousel
- **Restaurant Details** - Full menu browsing with item images and descriptions
- **Cart** - Cart management with add/remove/quantity controls
- **Checkout** - Multi-step checkout (address, payment, confirmation)
- **Order Tracking** - Real-time order status with animated delivery map and driver info
- **Search** - Advanced search with filters for cuisines, ratings, delivery time
- **Favorites** - Save and manage favorite restaurants
- **Order History** - View past orders with reorder functionality
- **User Profile** - Account overview, addresses, preferences, and settings
- **Authentication** - Secure login/signup with Supabase Auth

### Backend Integration
- **Supabase Database** with 8 interconnected tables:
  - Users (authentication & profile data)
  - Restaurants (store information, ratings, delivery details)
  - Menu Items (food items with prices and images)
  - Cart Items (user shopping carts)
  - Orders (order history and tracking)
  - Order Items (items in each order)
  - Favorites (saved restaurants)
  - Delivery Addresses (saved delivery locations)

### Real-time Features
- **Real-time Order Tracking** - Supabase subscriptions for live order status updates
- **Live Delivery Map** - Animated driver position based on order status
- **Cart Badge** - Real-time cart item count in bottom navigation
- **Order Timeline** - Visual progression of order through all stages

### Database Schema
All tables include:
- Proper foreign key relationships
- Indexes for query optimization
- Timestamps for audit trails
- Support for future RLS (Row Level Security)

### Payment Methods Supported
- Credit/Debit Cards
- Digital Wallets
- Cash on Delivery

### UAE-Specific Features
- AED currency display
- Local restaurant partnerships
- Arabic cuisine preferences
- UAE delivery zones
- Local phone number formatting

## Technology Stack

- **Frontend**: Next.js 16 with App Router
- **UI Components**: Shadcn/ui
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Subscriptions
- **Maps**: Interactive delivery map with SVG
- **Icons**: Lucide React

## Database Structure

### Restaurants Table
- id, name, description, cuisine_type
- rating, reviews_count
- delivery_time, delivery_fee, min_order
- image_url, is_open
- latitude, longitude, address, phone

### Menu Items Table
- id, restaurant_id, name, description
- price, image_url, category
- is_available, preparation_time

### Orders Table
- id, user_id, restaurant_id, status
- subtotal, delivery_fee, discount, total
- delivery_address, payment_method
- estimated_delivery_time, actual_delivery_time
- driver_id, notes

## Seeded Data

8 Restaurants with 36 Menu Items:
1. Al Mallah Restaurant (Lebanese)
2. Biryani House (Indian)
3. Pizza Express (Italian)
4. Shawarma King (Arabic)
5. Spice Fusion (Asian)
6. Emirates Grill House (Emirati)
7. Thai Orchid (Thai)
8. Sushi Paradise (Japanese)

## Color Scheme

- **Primary**: #8B2E3D (Burgundy)
- **Accent**: #D4A574 (Gold)
- **Background**: Light cream/white
- **Neutrals**: Grayscale variants

## Navigation Flow

```
Home
├── Search (with filters)
├── Restaurant Details → Cart → Checkout → Order Tracking
├── Favorites
├── Order History
├── Profile
└── Bottom Navigation (5 main tabs)
```

## API Endpoints & Queries

All data operations go through Supabase queries in `/lib/supabase/queries.ts`:
- getRestaurants()
- getMenuItems()
- addToCart()
- createOrder()
- getOrders()
- subscribeToOrderUpdates()
- getFavorites()
- searchRestaurants()

## Real-time Order Tracking

Orders update in real-time through Supabase's PostgreSQL Change Data Capture (CDC):
- Status changes trigger immediate UI updates
- Delivery map animates driver position
- Order timeline progresses automatically
- Customer receives live delivery notifications

## Authentication Flow

1. User signs up/logs in via `/auth/signup` or `/auth/login`
2. Supabase Auth manages user sessions
3. Protected pages redirect unauthorized users to login
4. Cart and favorites are tied to authenticated user ID
5. User data persists across sessions

## Mobile-First Design

- Responsive layout optimized for mobile devices
- Touch-friendly buttons and spacing
- Bottom navigation for easy thumb access
- Fixed headers and footers
- Optimized images for mobile bandwidth
- Smooth transitions and animations

## Future Enhancements

- Google Maps integration for real delivery tracking
- Advanced driver management system
- Loyalty points and rewards program
- Restaurant admin dashboard
- Promo code system
- User reviews and ratings
- Push notifications
- Multiple language support
