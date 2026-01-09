-- Insert sample restaurants
INSERT INTO restaurants (name, description, cuisine_type, rating, reviews_count, delivery_time, delivery_fee, min_order, image_url, latitude, longitude, address, phone, is_open)
VALUES
  ('Al Mallah Lebanese Grill', 'Authentic Lebanese cuisine with fresh ingredients', 'Lebanese', 4.8, 1250, 25, 5.00, 30.00, '/lebanese-restaurant-interior.jpg', 25.2084, 55.2703, 'Downtown Dubai', '+971-4-2222222', true),
  ('Biryani Palace', 'Premium Indian biryani and curries', 'Indian', 4.7, 890, 30, 6.00, 35.00, '/indian-restaurant-interior.jpg', 25.1962, 55.2732, 'Deira, Dubai', '+971-4-2233333', true),
  ('Pizzeria Roma', 'Italian wood-fired pizzas and pasta', 'Italian', 4.6, 650, 20, 4.50, 25.00, '/italian-pizzeria-interior.jpg', 25.2048, 55.2685, 'Marina, Dubai', '+971-4-2244444', true),
  ('Sakura Sushi', 'Fresh Japanese sushi and Asian fusion', 'Japanese', 4.5, 420, 25, 5.50, 40.00, '/public/placeholder.svg?height=300&width=400&query=Japanese restaurant sushi bar', 25.1970, 55.2740, 'JBR, Dubai', '+971-4-2255555', true),
  ('Al Reef Bakery', 'Fresh Arabic bread and traditional Middle Eastern breakfast', 'Arabic', 4.9, 2100, 15, 3.00, 20.00, '/public/placeholder.svg?height=300&width=400&query=Arabic bakery with bread', 25.1995, 55.2710, 'Satwa, Dubai', '+971-4-2266666', true);

-- Insert sample menu items for Al Mallah
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, category, preparation_time)
SELECT id, 'Hummus', 'Creamy chickpea dip with tahini and olive oil', 12.00, '/hummus-lebanese.jpg', 'Appetizers', 5
FROM restaurants WHERE name = 'Al Mallah Lebanese Grill'
UNION ALL
SELECT id, 'Shawarma Wrap', 'Grilled meat wrap with tahini sauce and vegetables', 18.00, '/shawarma-wrap.jpg', 'Main Dishes', 15
FROM restaurants WHERE name = 'Al Mallah Lebanese Grill'
UNION ALL
SELECT id, 'Tabbouleh Salad', 'Fresh parsley salad with bulgur and lemon dressing', 14.00, '/tabbouleh-salad.jpg', 'Salads', 10
FROM restaurants WHERE name = 'Al Mallah Lebanese Grill'
UNION ALL
SELECT id, 'Fattoush Salad', 'Mixed vegetables with sumac and fried pita chips', 16.00, '/fattoush-salad.jpg', 'Salads', 10
FROM restaurants WHERE name = 'Al Mallah Lebanese Grill';

-- Insert menu items for Biryani Palace
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, category, preparation_time)
SELECT id, 'Chicken Biryani', 'Fragrant basmati rice with tender chicken', 22.00, '/biryani-rice.jpg', 'Main Dishes', 25
FROM restaurants WHERE name = 'Biryani Palace'
UNION ALL
SELECT id, 'Lamb Biryani', 'Premium biryani with succulent lamb pieces', 26.00, '/biryani-rice.jpg', 'Main Dishes', 25
FROM restaurants WHERE name = 'Biryani Palace'
UNION ALL
SELECT id, 'Butter Chicken Curry', 'Creamy tomato-based chicken curry', 20.00, '/public/placeholder.svg?height=300&width=400&query=Indian butter chicken curry', 'Main Dishes', 20
FROM restaurants WHERE name = 'Biryani Palace';

-- Insert menu items for Pizzeria Roma
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, category, preparation_time)
SELECT id, 'Margherita Pizza', 'Classic pizza with tomato, mozzarella, and basil', 19.00, '/italian-pizza-margherita.jpg', 'Pizzas', 15
FROM restaurants WHERE name = 'Pizzeria Roma'
UNION ALL
SELECT id, 'Pepperoni Pizza', 'Crispy pizza topped with pepperoni and cheese', 21.00, '/public/placeholder.svg?height=300&width=400&query=Pepperoni pizza', 'Pizzas', 15
FROM restaurants WHERE name = 'Pizzeria Roma'
UNION ALL
SELECT id, 'Carbonara Pasta', 'Creamy pasta with bacon and parmesan', 18.00, '/public/placeholder.svg?height=300&width=400&query=Carbonara pasta', 'Pasta', 12
FROM restaurants WHERE name = 'Pizzeria Roma';

-- Insert menu items for Sakura Sushi
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, category, preparation_time)
SELECT id, 'California Roll', 'Crab, avocado, and cucumber sushi roll', 16.00, '/japanese-sushi-platter.jpg', 'Sushi', 10
FROM restaurants WHERE name = 'Sakura Sushi'
UNION ALL
SELECT id, 'Dragon Roll', 'Eel and avocado with mango on top', 20.00, '/japanese-sushi-platter.jpg', 'Sushi', 10
FROM restaurants WHERE name = 'Sakura Sushi'
UNION ALL
SELECT id, 'Edamame', 'Steamed soybeans with sea salt', 8.00, '/public/placeholder.svg?height=300&width=400&query=Steamed edamame', 'Appetizers', 5
FROM restaurants WHERE name = 'Sakura Sushi';

-- Insert menu items for Al Reef Bakery
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, category, preparation_time)
SELECT id, 'Pita Bread', 'Fresh warm pita bread', 2.00, '/public/placeholder.svg?height=300&width=400&query=Arabic pita bread', 'Bread', 5
FROM restaurants WHERE name = 'Al Reef Bakery'
UNION ALL
SELECT id, 'Zaatar Bread', 'Pita with zaatar spice blend', 3.50, '/public/placeholder.svg?height=300&width=400&query=Zaatar bread', 'Bread', 8
FROM restaurants WHERE name = 'Al Reef Bakery'
UNION ALL
SELECT id, 'Knafeh', 'Sweet dessert with cheese and pistachios', 10.00, '/knafeh-dessert.jpg', 'Desserts', 5
FROM restaurants WHERE name = 'Al Reef Bakery';
