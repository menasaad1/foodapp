"use client"

import { useState, useEffect } from "react"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getMenuItems, addToCart } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/client"

interface RestaurantMenuProps {
  restaurantId: string
}

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
}

interface CartItem extends MenuItem {
  quantity: number
}

export default function RestaurantMenu({ restaurantId }: RestaurantMenuProps) {
  const [items, setItems] = useState<MenuItem[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUserId(user?.id || null)

        const menuItems = await getMenuItems(restaurantId)
        setItems(menuItems || [])
      } catch (error) {
        console.error("[v0] Failed to load menu:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [restaurantId])

  const categories = ["All", ...new Set(items.map((item) => item.category))]

  const filteredItems = selectedCategory === "All" ? items : items.filter((item) => item.category === selectedCategory)

  const handleAddToCart = async (item: MenuItem) => {
    if (!userId) {
      alert("Please sign in to add items to cart")
      return
    }

    try {
      await addToCart(userId, restaurantId, item.id, 1)
      setCart((prev) => {
        const existing = prev.find((cartItem) => cartItem.id === item.id)
        if (existing) {
          return prev.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
          )
        }
        return [...prev, { ...item, quantity: 1 }]
      })
    } catch (error) {
      console.error("[v0] Failed to add to cart:", error)
    }
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  if (loading) {
    return <div className="text-center py-8">Loading menu...</div>
  }

  return (
    <div>
      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition ${
              selectedCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground hover:bg-secondary"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="space-y-4 mb-24">
        {filteredItems.map((item) => {
          const cartItem = cart.find((c) => c.id === item.id)
          const quantity = cartItem?.quantity || 0

          return (
            <div key={item.id} className="bg-card border border-border rounded-lg overflow-hidden p-4 flex gap-4">
              <div className="w-24 h-24 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                <img
                  src={item.image_url || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground mb-1">{item.name}</h3>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{item.description}</p>
                <p className="font-bold text-primary text-lg">AED {item.price}</p>
              </div>

              {quantity === 0 ? (
                <button
                  onClick={() => handleAddToCart(item)}
                  className="ml-2 bg-primary text-primary-foreground rounded-lg px-3 py-2 h-fit hover:opacity-90 transition flex-shrink-0"
                >
                  <Plus className="w-5 h-5" />
                </button>
              ) : (
                <div className="flex items-center gap-2 ml-2 bg-muted rounded-lg p-1 flex-shrink-0">
                  <button
                    onClick={() => updateQuantity(item.id, quantity - 1)}
                    className="p-1 hover:bg-secondary rounded transition"
                  >
                    <Minus className="w-4 h-4 text-foreground" />
                  </button>
                  <span className="w-6 text-center font-semibold text-foreground">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, quantity + 1)}
                    className="p-1 hover:bg-secondary rounded transition"
                  >
                    <Plus className="w-4 h-4 text-foreground" />
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-24 left-4 right-4 bg-primary text-primary-foreground rounded-lg p-4 flex justify-between items-center shadow-lg">
          <div>
            <p className="text-sm opacity-90">
              {totalItems} item{totalItems !== 1 ? "s" : ""}
            </p>
            <p className="text-lg font-bold">AED {totalPrice.toFixed(2)}</p>
          </div>
          <Link href="/cart">
            <Button className="bg-primary-foreground text-primary hover:opacity-90">View Cart</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
