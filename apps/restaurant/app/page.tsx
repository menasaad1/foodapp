"use client"

import { useEffect, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Check, X, Clock } from "lucide-react"
import { orderClient } from "@/lib/api-client"

interface OrderItem {
  name: string
  quantity: number
}

interface Order {
  id: string
  customerName: string
  total: number
  status: 'PENDING' | 'PREPARING' | 'READY_FOR_PICKUP' | 'COMPLETED'
  items: OrderItem[]
  createdAt: string
}

export default function RestaurantDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = useCallback(async () => {
    try {
      // In a real scenario, you'd get the restaurant ID from the logged-in user context
      const restaurantId = "1"
      const { data } = await orderClient.get(`/orders/restaurant/${restaurantId}`)
      // Transform API response to match UI model if needed
      // For now assuming direct mapping or mostly compatible
      setOrders(data)
    } catch (error) {
      console.error("Failed to fetch orders", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOrders()

    const supabase = createClient()
    const channel = supabase
      .channel('public:orders')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
        console.log('New Order Received:', payload)
        // Optimistically add or re-fetch
        fetchOrders()
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, (payload) => {
        fetchOrders()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchOrders])

  const updateStatus = async (orderId: string, newStatus: string) => {
    // Optimistic update
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus as any } : o))

    try {
      await orderClient.patch(`/orders/${orderId}/status`, { status: newStatus })
    } catch (error) {
      console.error("Failed to update status", error)
      fetchOrders() // Revert on failure
    }
  }

  if (loading) return <div className="p-8 text-center">Loading Kitchen System...</div>

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Kitchen Display System</h1>
          <p className="text-slate-500">Al Safadi Restaurant - Dubai Branch</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="gap-2">
            <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
            System Online
          </Button>
          <Button size="icon" variant="ghost">
            <Bell className="w-6 h-6" />
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Incoming Orders Column */}
        <section className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex justify-between items-center">
            Incoming
            <Badge variant="destructive">{orders.filter(o => o.status === 'PENDING').length}</Badge>
          </h2>
          <div className="space-y-4">
            {orders.filter(o => o.status === 'PENDING').map(order => (
              <Card key={order.id} className="p-4 border-l-4 border-l-orange-500">
                <div className="flex justify-between mb-2">
                  <span className="font-bold">Order #{order.id.slice(0, 8)}</span>
                  <span className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleTimeString()}</span>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-semibold">{order.customerName || "Unknown Customer"}</p>
                  <ul className="text-sm text-slate-600 list-disc ml-4 mt-1">
                    {order.items?.map((item, i) => <li key={i}>{item.quantity}x {item.name}</li>)}
                  </ul>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => updateStatus(order.id, 'PREPARING')}>
                    <Check className="w-4 h-4 mr-2" /> Accept
                  </Button>
                  <Button variant="outline" className="flex-1 text-red-600 hover:bg-red-50">
                    <X className="w-4 h-4 mr-2" /> Reject
                  </Button>
                </div>
              </Card>
            ))}
            {orders.filter(o => o.status === 'PENDING').length === 0 && <p className="text-slate-400 text-center py-8">No pending orders</p>}
          </div>
        </section>

        {/* Preparing Column */}
        <section className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex justify-between items-center">
            Preparing
            <Badge variant="secondary">{orders.filter(o => o.status === 'PREPARING').length}</Badge>
          </h2>
          <div className="space-y-4">
            {orders.filter(o => o.status === 'PREPARING').map(order => (
              <Card key={order.id} className="p-4 border-l-4 border-l-blue-500">
                <div className="flex justify-between mb-2">
                  <span className="font-bold">Order #{order.id.slice(0, 8)}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Preparing...
                  </span>
                </div>
                <div className="mb-4">
                  <ul className="text-sm text-slate-600 list-disc ml-4 mt-1">
                    {order.items?.map((item, i) => <li key={i}>{item.quantity}x {item.name}</li>)}
                  </ul>
                </div>
                <Button className="w-full" variant="outline" onClick={() => updateStatus(order.id, 'READY_FOR_PICKUP')}>
                  Mark Ready
                </Button>
              </Card>
            ))}
            {orders.filter(o => o.status === 'PREPARING').length === 0 && <p className="text-slate-400 text-center py-8">Kitchen clear</p>}
          </div>
        </section>

        {/* Ready / Past Orders */}
        <section className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold mb-4">Ready for Pickup</h2>
          <div className="space-y-4">
            {orders.filter(o => o.status === 'READY_FOR_PICKUP').map(order => (
              <Card key={order.id} className="p-4 border-l-4 border-l-green-500 opacity-80">
                <div className="flex justify-between">
                  <span className="font-bold">Order #{order.id.slice(0, 8)}</span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Driver Assigned</Badge>
                </div>
                <p className="text-sm text-slate-500 mt-2">Waiting for delivery agent...</p>
              </Card>
            ))}
            {orders.filter(o => o.status === 'READY_FOR_PICKUP').length === 0 && <p className="text-slate-400 text-center py-8">No orders ready</p>}
          </div>
        </section>
      </div>
    </div>
  )
}
