"use client"

import { useEffect, useState, Suspense } from "react"
import { ArrowLeft, Search, SlidersHorizontal } from "lucide-react"
import Link from "next/link"
import SearchFilters from "@/components/search-filters"
import { searchRestaurants } from "@/lib/supabase/queries"

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

function SearchContent({
  searchQuery,
  filters,
}: {
  searchQuery: string
  filters: { cuisines: string[]; rating: number; deliveryTime: number }
}) {
  const [results, setResults] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setResults([])
        return
      }

      setLoading(true)
      try {
        const data = await searchRestaurants(
          searchQuery,
          filters.cuisines[0] || undefined,
          undefined,
          filters.rating || undefined,
        )
        setResults(data || [])
      } catch (error) {
        console.error("[v0] Search failed:", error)
      } finally {
        setLoading(false)
      }
    }

    performSearch()
  }, [searchQuery, filters])

  return (
    <main className="px-4 py-4 pb-20">
      {/* Results Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-foreground">
          {loading ? "Searching..." : `${results.length} Result${results.length !== 1 ? "s" : ""}`}
        </h2>
      </div>

      {/* Results List */}
      {!loading && results.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg font-semibold text-foreground mb-2">No restaurants found</p>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((restaurant) => (
            <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
              <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition cursor-pointer group">
                <div className="relative overflow-hidden h-40 bg-muted">
                  <img
                    src={restaurant.image_url || "/placeholder.svg"}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                <div className="p-3">
                  <h3 className="font-bold text-foreground">{restaurant.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{restaurant.cuisine_type}</p>

                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-sm font-semibold text-foreground">★ {restaurant.rating}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground border-t border-border pt-2">
                    <div>⏱ {restaurant.delivery_time} min</div>
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
  )
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    cuisines: [] as string[],
    rating: 0,
    deliveryTime: 60,
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
        <Link href="/">
          <button className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
        </Link>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search restaurants, food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`p-2 rounded-lg transition ${showFilters ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && <SearchFilters filters={filters} setFilters={setFilters} />}

      <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
        <SearchContent searchQuery={searchQuery} filters={filters} />
      </Suspense>
    </div>
  )
}
