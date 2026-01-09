"use client"

import { Star, MapPin, Clock, DollarSign } from "lucide-react"
import { useEffect, useState } from "react"
import { getRestaurantById } from "@/lib/supabase/queries"

interface RestaurantHeaderProps {
  restaurantId: string
}

export default function RestaurantHeader({ restaurantId }: RestaurantHeaderProps) {
  const [restaurant, setRestaurant] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadRestaurant = async () => {
      try {
        const data = await getRestaurantById(restaurantId)
        setRestaurant(data)
      } catch (error) {
        console.error("[v0] Failed to load restaurant:", error)
      } finally {
        setLoading(false)
      }
    }

    loadRestaurant()
  }, [restaurantId])

  if (loading || !restaurant) {
    return <div className="h-64 bg-muted animate-pulse" />
  }

  return (
    <div className="relative">
      <div className="h-64 bg-muted overflow-hidden">
        <img
          src={restaurant.image_url || "/placeholder.svg"}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-card border-b border-border">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground mb-2">{restaurant.name}</h1>
          <p className="text-muted-foreground mb-4">{restaurant.cuisine_type}</p>

          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 fill-accent text-accent" />
            <span className="font-semibold text-foreground">{restaurant.rating}</span>
            <span className="text-muted-foreground">({restaurant.reviews_count} reviews)</span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Clock className="w-4 h-4" />
                <span>{restaurant.delivery_time} min</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <DollarSign className="w-4 h-4" />
                <span>AED {restaurant.delivery_fee}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4" />
                <span>{restaurant.address?.split(",")[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
