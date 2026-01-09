"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Repeat2, MapPin } from "lucide-react"
import Link from "next/link"
import { getOrders } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/client"

interface Order {
  id: string
  restaurants?: { name: string }
  status: string
  total: number
  created_at: string
  image_url?: string
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUserId(user?.id || null)

        if (user?.id) {
          const userOrders = await getOrders(user.id)
          setOrders(userOrders || [])
        }
      } catch (error) {
        console.error("[v0] Failed to load orders:", error)
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return `${Math.floor(diffDays / 30)} months ago`
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading order history...</div>
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
        <h1 className="text-lg font-bold text-foreground">Order History</h1>
      </div>

      <main className="px-4 py-4">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Repeat2 className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg font-semibold text-foreground mb-2">No orders yet</p>
            <p className="text-muted-foreground mb-6">Your past orders will appear here</p>
            <Link href="/">
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
                Start Ordering
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <Link key={order.id} href={`/orders/${order.id}`}>
                <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer">
                  <div className="flex gap-4 p-4">
                    {/* Image */}
                    <div className="w-20 h-20 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                      <img
                        src={order.image_url || "/placeholder.svg"}
                        alt={order.restaurants?.name || "Order"}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground">{order.restaurants?.name || "Restaurant"}</h3>
                      <p className="text-xs text-muted-foreground mb-1">Order #{order.id.slice(0, 8)}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                        Status: {order.status || "processing"}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs">
                          <MapPin className="w-3 h-3 text-accent" />
                          <span className="text-muted-foreground">{formatDate(order.created_at)}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">AED {order.total?.toFixed(2) || "0.00"}</p>
                        </div>
                      </div>
                    </div>

                    {/* Reorder Button */}
                    <div className="flex flex-col justify-center">
                      <button
                        className="p-2 hover:bg-muted rounded-lg transition"
                        onClick={(e) => {
                          e.preventDefault()
                        }}
                      >
                        <Repeat2 className="w-5 h-5 text-accent hover:text-primary" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
