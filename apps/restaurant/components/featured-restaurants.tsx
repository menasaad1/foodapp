"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Clock, User } from "lucide-react"
import { restaurantApi, Restaurant } from "@/lib/restaurants"

export default function FeaturedRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await restaurantApi.getAll()
        setRestaurants(data)
      } catch (error) {
        console.error("Failed to fetch restaurants:", error)
        // Fallback to dummy data if API fails (for demo purposes)
        setRestaurants([
          { id: "1", name: "Al Safadi", isActive: true, description: "Lebanese, Grill, Arabic", address: "Sheikh Zayed Road", phone: "" },
          { id: "2", name: "Operation Falafel", isActive: true, description: "Arabic, Street Food", address: "Downtown Dubai", phone: "" },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurants()
  }, [])

  if (loading) {
    return <div className="p-4 text-center">Loading restaurants...</div>
  }

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Featured Restaurants</h2>
        <Link href="/restaurants" className="text-primary text-sm font-semibold">
          See All
        </Link>
      </div>

      <div className="space-y-4">
        {restaurants.map((restaurant) => (
          <Link href={`/restaurant/${restaurant.id}`} key={restaurant.id} className="block">
            <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border/50">
              <div className="relative h-48 w-full">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt={restaurant.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold shadow-sm">
                  <Clock className="w-3 h-3 text-primary" />
                  <span>30-45 min</span>
                </div>
              </div>
              <div className="p-3">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg">{restaurant.name}</h3>
                  <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                    <span className="text-xs font-bold text-primary">4.8</span>
                    <span className="text-[10px] text-muted-foreground">(500+)</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-3">
                  {restaurant.description || "International, Fast Food"} • {restaurant.address || "Dubai"}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border/50 pt-3">
                  <div className="flex items-center gap-1">
                    <Image src="/delivery-bike.svg" width={14} height={14} alt="Delivery" className="opacity-70" />
                    <span>Free delivery</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>Min. order AED 30</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
