"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, MapPin, Phone, Navigation } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import OrderTimeline from "@/components/order-timeline"
import DeliveryMap from "@/components/delivery-map"
import { getOrderById, subscribeToOrderUpdates } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/client"

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUserId(user?.id || null)

        const orderData = await getOrderById(params.id)
        setOrder(orderData)
      } catch (error) {
        console.error("[v0] Failed to load order:", error)
      } finally {
        setLoading(false)
      }
    }

    loadOrder()
  }, [params.id])

  useEffect(() => {
    if (!params.id) return

    const unsubscribe = subscribeToOrderUpdates(params.id, (updatedOrder) => {
      setOrder((prevOrder: any) => ({ ...prevOrder, ...updatedOrder }))
    })

    return () => unsubscribe()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading order details...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-lg font-semibold mb-4">Order not found</p>
        <Link href="/">
          <button className="text-primary hover:underline">Back to Home</button>
        </Link>
      </div>
    )
  }

  const statusMessages = {
    pending: "Restaurant received your order",
    confirmed: "Order confirmed",
    preparing: "Your food is being prepared",
    ready: "Your food is ready for delivery",
    on_way: "Your delivery is on the way",
    delivered: "Your order has been delivered",
  }

  const statusColor = {
    pending: "bg-blue-500",
    confirmed: "bg-blue-600",
    preparing: "bg-amber-500",
    ready: "bg-purple-500",
    on_way: "bg-orange-500",
    delivered: "bg-green-500",
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
        <Link href="/">
          <button className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
        </Link>
        <h1 className="text-lg font-bold text-foreground">Order #{params.id.slice(0, 8)}</h1>
      </div>

      <main className="px-4 py-4">
        {/* Status Card */}
        <div className="bg-primary text-primary-foreground rounded-lg p-6 mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2">
            Order {order.status === "delivered" ? "Delivered" : "In Progress"}
          </h2>
          <p className="opacity-90 mb-4">
            {statusMessages[order.status as keyof typeof statusMessages] || "Processing"}
          </p>
          <div className="text-3xl font-bold">{Math.round(Math.random() * 45) + 10} mins</div>
        </div>

        {/* Delivery Map */}
        <DeliveryMap status={order.status} orderData={order} />

        {/* Order Timeline */}
        <OrderTimeline currentStatus={order.status} />

        {/* Driver Info - Show when order is out for delivery */}
        {order.status !== "pending" && order.status !== "confirmed" && order.status !== "preparing" && (
          <div className="bg-card border border-border rounded-lg p-4 mb-6">
            <h3 className="font-bold text-foreground mb-4">Driver Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold text-lg">
                  A
                </div>
                <div>
                  <p className="font-semibold text-foreground">Ahmed Hassan</p>
                  <p className="text-xs text-muted-foreground">Rating: 4.8 ⭐</p>
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Contact Driver</p>
                    <a href="tel:+971501234567" className="text-sm font-semibold text-primary hover:underline">
                      +971 50 123 4567
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Navigation className="w-4 h-4 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Vehicle</p>
                    <p className="text-sm font-semibold text-foreground">Silver Toyota Camry - ABC 123</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order Details */}
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <h3 className="font-bold text-foreground mb-4">Order Details</h3>

          {/* Items */}
          <div className="space-y-2 mb-4 pb-4 border-b border-border">
            {order.order_items?.map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between text-sm">
                <span className="text-foreground">
                  {item.quantity}x {item.menu_items?.name || "Item"}
                </span>
                <span className="font-semibold text-foreground">AED {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">AED {order.subtotal?.toFixed(2) || "0.00"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Fee</span>
              <span className="text-foreground">AED {order.delivery_fee?.toFixed(2) || "0.00"}</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between mb-4 pt-2 border-t border-border">
            <span className="font-bold text-foreground">Total</span>
            <span className="font-bold text-lg text-primary">AED {order.total?.toFixed(2) || "0.00"}</span>
          </div>

          {/* Delivery Address */}
          <div className="bg-muted rounded-lg p-3 flex gap-3">
            <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Deliver to</p>
              <p className="text-sm font-semibold text-foreground">{order.delivery_address}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {order.status === "delivered" && (
          <div className="space-y-2">
            <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition">
              Rate Order
            </button>
            <Link href="/">
              <button className="w-full bg-muted text-foreground py-3 rounded-lg font-semibold hover:bg-secondary transition">
                Order Again
              </button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
