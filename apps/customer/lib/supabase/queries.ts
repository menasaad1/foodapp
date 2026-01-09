import { createClient } from "./client"

// Restaurant queries
export async function getRestaurants() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("is_open", true)
    .order("rating", { ascending: false })

  if (error) throw error
  return data
}

export async function getRestaurantById(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase.from("restaurants").select("*").eq("id", id).single()

  if (error) throw error
  return data
}

export async function searchRestaurants(query: string, cuisineType?: string, maxDeliveryFee?: number, rating?: number) {
  const supabase = createClient()
  let q = supabase.from("restaurants").select("*").eq("is_open", true).ilike("name", `%${query}%`)

  if (cuisineType) {
    q = q.eq("cuisine_type", cuisineType)
  }
  if (maxDeliveryFee !== undefined) {
    q = q.lte("delivery_fee", maxDeliveryFee)
  }
  if (rating) {
    q = q.gte("rating", rating)
  }

  const { data, error } = await q.order("rating", { ascending: false })
  if (error) throw error
  return data
}

// Menu queries
export async function getMenuItems(restaurantId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("restaurant_id", restaurantId)
    .eq("is_available", true)

  if (error) throw error
  return data
}

export async function getMenuItemById(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase.from("menu_items").select("*").eq("id", id).single()

  if (error) throw error
  return data
}

// Cart queries
export async function addToCart(
  userId: string,
  restaurantId: string,
  menuItemId: string,
  quantity: number,
  instructions?: string,
) {
  const supabase = createClient()

  // Check if item already in cart
  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("user_id", userId)
    .eq("menu_item_id", menuItemId)
    .single()

  if (existingItem) {
    return supabase
      .from("cart_items")
      .update({ quantity: existingItem.quantity + quantity })
      .eq("id", existingItem.id)
  }

  const { data, error } = await supabase
    .from("cart_items")
    .insert([
      {
        user_id: userId,
        restaurant_id: restaurantId,
        menu_item_id: menuItemId,
        quantity,
        special_instructions: instructions,
      },
    ])
    .select()

  if (error) throw error
  return data
}

export async function getCart(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("cart_items")
    .select("*, menu_items(name, price, image_url), restaurants(name, delivery_fee)")
    .eq("user_id", userId)

  if (error) throw error
  return data
}

export async function updateCartItem(cartItemId: string, quantity: number) {
  const supabase = createClient()
  const { data, error } = await supabase.from("cart_items").update({ quantity }).eq("id", cartItemId).select()

  if (error) throw error
  return data
}

export async function removeFromCart(cartItemId: string) {
  const supabase = createClient()
  const { error } = await supabase.from("cart_items").delete().eq("id", cartItemId)

  if (error) throw error
}

export async function clearCart(userId: string) {
  const supabase = createClient()
  const { error } = await supabase.from("cart_items").delete().eq("user_id", userId)

  if (error) throw error
}

// Order queries
export async function createOrder(userId: string, restaurantId: string, orderData: any) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        user_id: userId,
        restaurant_id: restaurantId,
        ...orderData,
      },
    ])
    .select()

  if (error) throw error
  return data[0]
}

export async function getOrders(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("orders")
    .select("*, restaurants(name, image_url)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function getOrderById(orderId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*, menu_items(name, price, image_url))")
    .eq("id", orderId)
    .single()

  if (error) throw error
  return data
}

// Subscribe to order updates in real-time
export function subscribeToOrderUpdates(orderId: string, callback: (order: any) => void) {
  const supabase = createClient()

  const subscription = supabase
    .channel(`order-${orderId}`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "orders",
        filter: `id=eq.${orderId}`,
      },
      (payload) => {
        callback(payload.new)
      },
    )
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
}

// Favorites queries
export async function addToFavorites(userId: string, restaurantId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("favorites")
    .insert([{ user_id: userId, restaurant_id: restaurantId }])
    .select()

  if (error) throw error
  return data
}

export async function removeFromFavorites(userId: string, restaurantId: string) {
  const supabase = createClient()
  const { error } = await supabase.from("favorites").delete().eq("user_id", userId).eq("restaurant_id", restaurantId)

  if (error) throw error
}

export async function getFavorites(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase.from("favorites").select("restaurants(*)").eq("user_id", userId)

  if (error) throw error
  return data?.map((f) => f.restaurants) || []
}
