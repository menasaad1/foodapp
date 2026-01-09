"use client"

import { MapPin, Bell } from "lucide-react"
import { useState } from "react"

import Image from "next/image"

export default function Header() {
  const [location, setLocation] = useState("Dubai Marina")

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="px-4 py-4">
        {/* Logo and Title */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-border">
              <Image src="/logo.jpg" alt="El Sawah Logo" fill className="object-cover" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-primary">El Sawah</h1>
              <p className="text-xs text-muted-foreground tracking-widest text-[#D4AF37]">LUXURY LOGISTICS</p>
            </div>
          </div>
          <button className="relative p-2 hover:bg-muted rounded-lg transition">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </button>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-accent" />
          <span className="text-muted-foreground">Delivering to</span>
          <button className="font-semibold text-foreground hover:text-primary">{location}</button>
        </div>
      </div>
    </header>
  )
}
