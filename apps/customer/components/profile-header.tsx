"use client"

import { Edit } from "lucide-react"

export default function ProfileHeader() {
  return (
    <div className="bg-card border-b border-border">
      <div className="px-4 py-6 flex items-start gap-4">
        {/* Avatar */}
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold flex-shrink-0">
          F
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-foreground">Fatima Al-Mansouri</h2>
          <p className="text-sm text-muted-foreground">fatima.almansouri@example.com</p>
          <p className="text-sm text-muted-foreground">+971 50 123 4567</p>
        </div>

        {/* Edit Button */}
        <button className="p-2 hover:bg-muted rounded-lg transition flex-shrink-0">
          <Edit className="w-5 h-5 text-accent" />
        </button>
      </div>
    </div>
  )
}
