"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Heart, Share2 } from "lucide-react"
import Link from "next/link"
import RestaurantMenu from "@/components/restaurant-menu"
import RestaurantHeader from "@/components/restaurant-header"
import RestaurantInfo from "@/components/restaurant-info"
import { createClient } from "@/lib/supabase/client"
import { addToFavorites, removeFromFavorites, getFavorites } from "@/lib/supabase/queries"

export default function RestaurantPage({ searchParams }: { searchParams: { id: string } }) {
  const params = { id: searchParams.id }
  const [isFavorite, setIsFavorite] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!params.id) return
    const checkFavorite = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUserId(user?.id || null)

        if (user?.id) {
          const favorites = await getFavorites(user.id)
          setIsFavorite(favorites.some((r) => r.id === params.id))
        }
      } catch (error) {
        console.error("[v0] Failed to check favorite:", error)
      } finally {
        setLoading(false)
      }
    }

    checkFavorite()
  }, [params.id])

  const toggleFavorite = async () => {
    if (!userId) {
      alert("Please sign in to save favorites")
      return
    }

    try {
      if (isFavorite) {
        await removeFromFavorites(userId, params.id)
      } else {
        await addToFavorites(userId, params.id)
      }
      setIsFavorite(!isFavorite)
    } catch (error) {
      console.error("[v0] Failed to toggle favorite:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-30 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <button className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
        </Link>
        <h1 className="text-lg font-bold text-foreground flex-1 text-center">Restaurant Details</h1>
        <div className="flex gap-2">
          <button onClick={toggleFavorite} className="p-2 hover:bg-muted rounded-lg transition" disabled={loading}>
            <Heart className={`w-6 h-6 ${isFavorite ? "fill-destructive text-destructive" : "text-foreground"}`} />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition">
            <Share2 className="w-6 h-6 text-foreground" />
          </button>
        </div>
      </div>

      {/* Restaurant Header with Image */}
      <RestaurantHeader restaurantId={params.id} />

      {/* Restaurant Info */}
      <RestaurantInfo restaurantId={params.id} />

      {/* Menu */}
      <main className="px-4 py-4">
        <RestaurantMenu restaurantId={params.id} />
      </main>
    </div>
  )
}
