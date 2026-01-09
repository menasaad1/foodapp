"use client"

import { MapPin, Phone, Clock, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { getRestaurantById } from "@/lib/supabase/queries"

interface RestaurantInfoProps {
  restaurantId: string
}

export default function RestaurantInfo({ restaurantId }: RestaurantInfoProps) {
  const [restaurant, setRestaurant] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadRestaurant = async () => {
      try {
        const data = await getRestaurantById(restaurantId)
        setRestaurant(data)
      } catch (error) {
        console.error("[v0] Failed to load restaurant info:", error)
      } finally {
        setLoading(false)
      }
    }

    loadRestaurant()
  }, [restaurantId])

  if (loading || !restaurant) {
    return <div className="bg-card border-b border-border p-4 animate-pulse h-64" />
  }

  return (
    <div className="bg-card border-b border-border">
      <div className="px-4 py-4">
        <h3 className="font-bold text-foreground mb-4">Restaurant Information</h3>

        <div className="space-y-4">
          <div className="flex gap-3">
            <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">Address</p>
              <p className="text-sm text-muted-foreground">{restaurant.address}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">Contact</p>
              <p className="text-sm text-muted-foreground">{restaurant.phone}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">Hours</p>
              <p className="text-sm text-muted-foreground">
                {restaurant.is_open ? "Open now" : "Closed"} • 10:00 AM - 11:00 PM
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">Minimum Order</p>
              <p className="text-sm text-muted-foreground">AED {restaurant.min_order} for delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
