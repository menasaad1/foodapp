"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Heart, Clock, Star } from "lucide-react"
import Link from "next/link"
import { getFavorites, removeFromFavorites } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/client"

interface Restaurant {
  id: string
  name: string
  cuisine_type: string
  rating: number
  delivery_time: number
  delivery_fee: number
  address: string
  image_url: string
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUserId(user?.id || null)

        if (user?.id) {
          const userFavorites = await getFavorites(user.id)
          setFavorites(userFavorites || [])
        }
      } catch (error) {
        console.error("[v0] Failed to load favorites:", error)
      } finally {
        setLoading(false)
      }
    }

    loadFavorites()
  }, [])

  const handleRemoveFavorite = async (restaurantId: string) => {
    if (!userId) return

    try {
      await removeFromFavorites(userId, restaurantId)
      setFavorites((prev) => prev.filter((fav) => fav.id !== restaurantId))
    } catch (error) {
      console.error("[v0] Failed to remove favorite:", error)
    }
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
        <h1 className="text-lg font-bold text-foreground">Favorite Restaurants</h1>
      </div>

      <main className="px-4 py-4">
        {loading ? (
          <div className="text-center py-12">Loading favorites...</div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg font-semibold text-foreground mb-2">No favorites yet</p>
            <p className="text-muted-foreground mb-6">Save your favorite restaurants for quick access</p>
            <Link href="/search">
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
                Browse Restaurants
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((restaurant) => (
              <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
                <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition cursor-pointer group">
                  <div className="relative overflow-hidden h-40 bg-muted">
                    <img
                      src={restaurant.image_url || "/placeholder.svg"}
                      alt={restaurant.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded font-medium">
                      Saved
                    </span>
                  </div>

                  <div className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground">{restaurant.name}</h3>
                        <p className="text-xs text-muted-foreground">{restaurant.cuisine_type}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          handleRemoveFavorite(restaurant.id)
                        }}
                        className="text-xl ml-2 hover:scale-110 transition"
                      >
                        ❤️
                      </button>
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="text-sm font-semibold text-foreground">{restaurant.rating}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground border-t border-border pt-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {restaurant.delivery_time} min
                      </div>
                      <div>AED {restaurant.delivery_fee}</div>
                      <div>📍 {restaurant.address?.split(",")[0]}</div>
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
