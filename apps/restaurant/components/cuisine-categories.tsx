"use client"

import { useState } from "react"

const cuisines = [
  { id: 1, name: "Arabic", emoji: "🍛", color: "bg-orange-100 text-orange-700" },
  { id: 2, name: "Indian", emoji: "🌶️", color: "bg-red-100 text-red-700" },
  { id: 3, name: "Italian", emoji: "🍝", color: "bg-amber-100 text-amber-700" },
  { id: 4, name: "Asian", emoji: "🥢", color: "bg-emerald-100 text-emerald-700" },
  { id: 5, name: "Seafood", emoji: "🦐", color: "bg-sky-100 text-sky-700" },
  { id: 6, name: "Bakery", emoji: "🥐", color: "bg-yellow-100 text-yellow-700" },
  { id: 7, name: "Dessert", emoji: "🍰", color: "bg-pink-100 text-pink-700" },
  { id: 8, name: "Beverages", emoji: "☕", color: "bg-amber-100 text-amber-700" },
]

export default function CuisineCategories() {
  const [selected, setSelected] = useState(1)

  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-foreground mb-4">Browse by Cuisine</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {cuisines.map((cuisine) => (
          <button
            key={cuisine.id}
            onClick={() => setSelected(cuisine.id)}
            className={`flex flex-col items-center gap-2 p-3 rounded-lg transition flex-shrink-0 ${
              selected === cuisine.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            <span className="text-2xl">{cuisine.emoji}</span>
            <span className="text-xs font-medium whitespace-nowrap">{cuisine.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
