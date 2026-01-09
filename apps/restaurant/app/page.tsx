"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Check, X, Clock } from "lucide-react"

// Mock data for initial view (will be replaced by real Supabase data)
const initialOrders = [
  { id: "101", customer: "John Doe", total: 125.50, status: "pending", items: ["2x Burger", "1x Fries"], time: "Just now" },
  { id: "102", customer: "Sarah Smith", total: 45.00, status: "preparing", items: ["1x Salad", "1x Soda"], time: "5 mins ago" },
]

export default function RestaurantDashboard() {
  const [orders, setOrders] = useState(initialOrders)
  const [activeTab, setActiveTab] = useState("active")

  // Real-time listener for new orders
  useEffect(() => {
    const supabase = createClient()
    const channel = supabase
      .channel('public:orders')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
        console.log('New Order Received:', payload)
        // In a real app, you'd fetch the full order details here
        // setOrders(prev => [payload.new, ...prev])
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const updateStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
  }

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
            <Badge variant="destructive">{orders.filter(o => o.status === 'pending').length}</Badge>
          </h2>
          <div className="space-y-4">
            {orders.filter(o => o.status === 'pending').map(order => (
              <Card key={order.id} className="p-4 border-l-4 border-l-orange-500">
                <div className="flex justify-between mb-2">
                  <span className="font-bold">Order #{order.id}</span>
                  <span className="text-xs text-muted-foreground">{order.time}</span>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-semibold">{order.customer}</p>
                  <ul className="text-sm text-slate-600 list-disc ml-4 mt-1">
                    {order.items.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => updateStatus(order.id, 'preparing')}>
                    <Check className="w-4 h-4 mr-2" /> Accept
                  </Button>
                  <Button variant="outline" className="flex-1 text-red-600 hover:bg-red-50">
                    <X className="w-4 h-4 mr-2" /> Reject
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Preparing Column */}
        <section className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex justify-between items-center">
            Preparing
            <Badge variant="secondary">{orders.filter(o => o.status === 'preparing').length}</Badge>
          </h2>
          <div className="space-y-4">
            {orders.filter(o => o.status === 'preparing').map(order => (
              <Card key={order.id} className="p-4 border-l-4 border-l-blue-500">
                <div className="flex justify-between mb-2">
                  <span className="font-bold">Order #{order.id}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> 12:45 min
                  </span>
                </div>
                <div className="mb-4">
                  <ul className="text-sm text-slate-600 list-disc ml-4 mt-1">
                    {order.items.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
                <Button className="w-full" variant="outline" onClick={() => updateStatus(order.id, 'ready')}>
                  Mark Ready
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Ready / Past Orders */}
        <section className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold mb-4">Ready for Pickup</h2>
          <div className="space-y-4">
            {orders.filter(o => o.status === 'ready').map(order => (
              <Card key={order.id} className="p-4 border-l-4 border-l-green-500 opacity-80">
                <div className="flex justify-between">
                  <span className="font-bold">Order #{order.id}</span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Driver Assigned</Badge>
                </div>
                <p className="text-sm text-slate-500 mt-2">Waiting for delivery agent...</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
