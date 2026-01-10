"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Clock, User } from "lucide-react"
import { restaurantApi, Restaurant } from "@/lib/restaurants"
import { Skeleton } from "@/components/ui/skeleton"

export default function FeaturedRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await restaurantApi.getAll()
        setRestaurants(data)
      } catch (error) {
        console.error("Failed to fetch restaurants:", error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurants()
  }, [])

  if (loading) {
    return (
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Featured Restaurants</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card rounded-xl overflow-hidden shadow-sm border border-border/50">
              <Skeleton className="h-48 w-full" />
              <div className="p-3">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-destructive/5 text-destructive rounded-xl border border-destructive/20">
        <p className="font-semibold">Unable to load restaurants</p>
        <p className="text-sm opacity-80 mt-1">Please try again later</p>
      </div>
    )
  }

  if (restaurants.length === 0) {
    return (
      <div className="p-8 text-center bg-muted/30 rounded-xl">
        <p className="font-semibold">No restaurants found</p>
        <p className="text-sm text-muted-foreground mt-1">Check back soon for new additions!</p>
      </div>
    )
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
          <Link href={`/restaurant-details?id=${restaurant.id}`} key={restaurant.id} className="block">
            <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border/50 transition-all hover:shadow-md">
              <div className="relative h-48 w-full">
                <Image
                  src={restaurant.image || "/placeholder.svg?height=200&width=400"}
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
