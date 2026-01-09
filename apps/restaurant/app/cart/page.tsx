"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Trash2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getCart, updateCartItem, removeFromCart } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/client"

interface CartItem {
  id: string
  quantity: number
  menu_items: {
    name: string
    price: number
    image_url: string
  }
  restaurants: {
    name: string
    delivery_fee: number
  }
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const loadCart = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUserId(user?.id || null)

        if (user?.id) {
          const cartItems = await getCart(user.id)
          setItems(cartItems || [])
        }
      } catch (error) {
        console.error("[v0] Failed to load cart:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCart()
  }, [])

  const handleUpdateQuantity = async (cartItemId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(cartItemId)
        setItems((prev) => prev.filter((item) => item.id !== cartItemId))
      } else {
        await updateCartItem(cartItemId, quantity)
        setItems((prev) => prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item)))
      }
    } catch (error) {
      console.error("[v0] Failed to update cart:", error)
    }
  }

  const handleRemoveItem = async (cartItemId: string) => {
    try {
      await removeFromCart(cartItemId)
      setItems((prev) => prev.filter((item) => item.id !== cartItemId))
    } catch (error) {
      console.error("[v0] Failed to remove item:", error)
    }
  }

  const subtotal = items.reduce((sum, item) => sum + item.menu_items.price * item.quantity, 0)
  const deliveryFee = subtotal > 100 ? 0 : items[0]?.restaurants?.delivery_fee || 0
  const tax = Math.round(subtotal * 0.05 * 100) / 100
  const total = subtotal + deliveryFee + tax

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading cart...</div>
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
        <Link href="/">
          <button className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
        </Link>
        <h1 className="text-lg font-bold text-foreground">Your Cart</h1>
      </div>

      <main className="px-4 py-4">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg font-semibold text-foreground mb-2">Your cart is empty</p>
            <p className="text-muted-foreground mb-6">Add items to get started</p>
            <Link href="/">
              <Button className="bg-primary text-primary-foreground">Continue Ordering</Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="bg-card border border-border rounded-lg overflow-hidden mb-6">
              <div className="space-y-1">
                {items.map((item) => (
                  <div key={item.id} className="p-4 border-b border-border last:border-b-0 flex gap-4">
                    <div className="w-20 h-20 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                      <img
                        src={item.menu_items.image_url || "/placeholder.svg"}
                        alt={item.menu_items.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground">{item.menu_items.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{item.restaurants.name}</p>
                      <p className="font-bold text-primary">AED {item.menu_items.price}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-secondary rounded transition"
                        >
                          <span className="text-foreground font-bold">−</span>
                        </button>
                        <span className="w-6 text-center font-semibold text-foreground text-sm">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-secondary rounded transition"
                        >
                          <span className="text-foreground font-bold">+</span>
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1.5 hover:bg-destructive hover:bg-opacity-10 rounded transition text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-card border border-border rounded-lg p-4 mb-6">
              <h3 className="font-bold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground font-semibold">AED {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="text-foreground font-semibold">
                    {deliveryFee === 0 ? "FREE" : `AED ${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxes (5%)</span>
                  <span className="text-foreground font-semibold">AED {tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-border">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-bold text-lg text-primary">AED {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <Link href="/checkout">
              <Button className="w-full bg-primary text-primary-foreground py-6 text-lg font-bold rounded-lg hover:opacity-90">
                Proceed to Checkout
              </Button>
            </Link>
          </>
        )}
      </main>
    </div>
  )
}
