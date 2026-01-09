"use client"

import { Star, Clock, DollarSign, MapPin, Heart } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { getRestaurants, addToFavorites, removeFromFavorites, getFavorites } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/client"

export default function FeaturedRestaurants() {
  const [restaurants, setRestaurants] = useState<any[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
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

        const data = await getRestaurants()
        setRestaurants(data || [])

        // Load user favorites if logged in
        if (user?.id) {
          const userFavorites = await getFavorites(user.id)
          setFavorites(userFavorites.map((r) => r.id))
        }
      } catch (error) {
        console.error("[v0] Failed to load restaurants:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const toggleFavorite = async (restaurantId: string) => {
    if (!userId) {
      alert("Please sign in to save favorites")
      return
    }

    try {
      if (favorites.includes(restaurantId)) {
        await removeFromFavorites(userId, restaurantId)
        setFavorites(favorites.filter((id) => id !== restaurantId))
      } else {
        await addToFavorites(userId, restaurantId)
        setFavorites([...favorites, restaurantId])
      }
    } catch (error) {
      console.error("[v0] Failed to toggle favorite:", error)
    }
  }

  if (loading) {
    return <div className="p-4 text-center text-muted-foreground">Loading restaurants...</div>
  }

  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold text-foreground mb-4">Trending Restaurants</h2>
      <div className="space-y-4">
        {restaurants.map((restaurant) => (
          <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
            <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition cursor-pointer group">
              {/* Image Container */}
              <div className="relative overflow-hidden h-40 bg-muted">
                <img
                  src={restaurant.image_url || "/placeholder.svg"}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-3 left-3 flex gap-1">
                  <span className="bg-black/60 text-white text-xs px-2 py-1 rounded font-medium">Verified</span>
                  {restaurant.rating >= 4.7 && (
                    <span className="bg-accent text-white text-xs px-2 py-1 rounded font-medium">Popular</span>
                  )}
                </div>
              </div>

              {/* Info Container */}
              <div className="p-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">{restaurant.name}</h3>
                    <p className="text-xs text-muted-foreground">{restaurant.cuisine_type}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      toggleFavorite(restaurant.id)
                    }}
                    className="ml-2"
                  >
                    {favorites.includes(restaurant.id) ? (
                      <Heart className="w-5 h-5 fill-destructive text-destructive" />
                    ) : (
                      <Heart className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-sm font-semibold text-foreground">{restaurant.rating}</span>
                  <span className="text-xs text-muted-foreground">({restaurant.reviews_count})</span>
                </div>

                {/* Meta Info */}
                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground border-t border-border pt-2">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                    {restaurant.delivery_time} min
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-accent" />
                    AED {restaurant.delivery_fee}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    {restaurant.address?.split(",")[0]}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
