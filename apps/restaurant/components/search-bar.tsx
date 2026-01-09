"use client"

import { Search, SlidersHorizontal } from "lucide-react"
import { useState } from "react"

export default function SearchBar() {
  const [query, setQuery] = useState("")

  return (
    <div className="flex gap-2 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="ابحث عن مطعم أو طبق... Search restaurants or dishes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        />
      </div>
      <button className="px-3 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition flex items-center gap-2">
        <SlidersHorizontal className="w-4 h-4" />
      </button>
    </div>
  )
}
