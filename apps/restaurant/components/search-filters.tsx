"use client"

interface Filters {
  cuisines: string[]
  rating: number
  deliveryTime: number
  priceRange: "all" | "budget" | "moderate" | "premium"
}

interface SearchFiltersProps {
  filters: Filters
  setFilters: (filters: Filters) => void
}

export default function SearchFilters({ filters, setFilters }: SearchFiltersProps) {
  const cuisineOptions = ["Arabic", "Indian", "Italian", "Japanese", "Asian", "Fast Food"]

  const toggleCuisine = (cuisine: string) => {
    setFilters({
      ...filters,
      cuisines: filters.cuisines.includes(cuisine)
        ? filters.cuisines.filter((c) => c !== cuisine)
        : [...filters.cuisines, cuisine],
    })
  }

  return (
    <div className="bg-card border-b border-border">
      <div className="px-4 py-4 space-y-4">
        {/* Cuisines */}
        <div>
          <h3 className="font-bold text-foreground mb-3">Cuisines</h3>
          <div className="flex flex-wrap gap-2">
            {cuisineOptions.map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => toggleCuisine(cuisine)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  filters.cuisines.includes(cuisine)
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-secondary"
                }`}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div>
          <h3 className="font-bold text-foreground mb-3">Minimum Rating</h3>
          <div className="flex gap-2">
            {[0, 4, 4.5, 4.7].map((rating) => (
              <button
                key={rating}
                onClick={() => setFilters({ ...filters, rating })}
                className={`px-3 py-2 rounded-lg font-medium transition text-sm ${
                  filters.rating === rating
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-secondary"
                }`}
              >
                {rating === 0 ? "All" : `${rating}+`}
              </button>
            ))}
          </div>
        </div>

        {/* Delivery Time */}
        <div>
          <h3 className="font-bold text-foreground mb-3">Delivery Time</h3>
          <input
            type="range"
            min="15"
            max="60"
            value={filters.deliveryTime}
            onChange={(e) => setFilters({ ...filters, deliveryTime: Number.parseInt(e.target.value) })}
            className="w-full accent-primary"
          />
          <p className="text-sm text-muted-foreground mt-2">Up to {filters.deliveryTime} minutes</p>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-bold text-foreground mb-3">Price Range</h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: "all", label: "All" },
              { id: "budget", label: "Budget" },
              { id: "moderate", label: "Moderate" },
              { id: "premium", label: "Premium" },
            ].map((range) => (
              <button
                key={range.id}
                onClick={() => setFilters({ ...filters, priceRange: range.id as any })}
                className={`py-2 rounded-lg font-medium transition text-sm ${
                  filters.priceRange === range.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-secondary"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
