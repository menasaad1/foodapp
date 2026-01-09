"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Home, Briefcase } from "lucide-react"

interface Address {
  id: number
  label: string
  address: string
  type: "home" | "work" | "other"
  isDefault: boolean
}

export default function AddressManagement() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      label: "Home",
      address: "Dubai Marina, Tower 2, Apt 1205, Dubai, UAE",
      type: "home",
      isDefault: true,
    },
    {
      id: 2,
      label: "Work",
      address: "Downtown Dubai, Business Bay Tower, Dubai, UAE",
      type: "work",
      isDefault: false,
    },
  ])

  const [showForm, setShowForm] = useState(false)

  const getIcon = (type: "home" | "work" | "other") => {
    if (type === "home") return <Home className="w-5 h-5" />
    if (type === "work") return <Briefcase className="w-5 h-5" />
    return <span className="text-lg">📍</span>
  }

  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        {addresses.map((addr) => (
          <div key={addr.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-b-0">
            <div className="text-accent mt-1">{getIcon(addr.type)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-foreground">{addr.label}</p>
                {addr.isDefault && (
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">Default</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{addr.address}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button className="p-1.5 hover:bg-muted rounded transition">
                <Edit className="w-4 h-4 text-accent" />
              </button>
              <button className="p-1.5 hover:bg-destructive hover:bg-opacity-10 rounded transition text-destructive">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2">
        <Plus className="w-5 h-5" />
        Add New Address
      </button>
    </div>
  )
}
