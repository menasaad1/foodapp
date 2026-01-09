"use client"

import { useState } from "react"
import { Home, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DeliveryAddressFormProps {
  onSubmit: (address: string) => void
  initialAddress?: string
}

export default function DeliveryAddressForm({ onSubmit, initialAddress }: DeliveryAddressFormProps) {
  const [address, setAddress] = useState(initialAddress || "")
  const [selectedType, setSelectedType] = useState<"home" | "work" | "other">("home")

  const savedAddresses = [
    { id: 1, label: "Home", address: "Dubai Marina, Tower 2, Apt 1205", type: "home" },
    { id: 2, label: "Work", address: "Downtown Dubai, Business Bay Tower", type: "work" },
  ]

  const handleSavedAddress = (addr: string) => {
    setAddress(addr)
    onSubmit(addr)
  }

  const handleCustomAddress = () => {
    if (address.trim()) {
      onSubmit(address)
    }
  }

  return (
    <div className="space-y-4 mb-20">
      <h2 className="text-lg font-bold text-foreground">Delivery Address</h2>

      {/* Address Type Selection */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { id: "home", label: "Home", icon: Home },
          { id: "work", label: "Work", icon: Briefcase },
        ].map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id as "home" | "work" | "other")}
            className={`p-3 rounded-lg border-2 transition flex items-center justify-center gap-2 ${
              selectedType === type.id
                ? "border-primary bg-primary bg-opacity-10"
                : "border-border hover:border-primary"
            }`}
          >
            <type.icon className="w-5 h-5" />
            <span className="font-medium">{type.label}</span>
          </button>
        ))}
      </div>

      {/* Saved Addresses */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground block">Saved Addresses</label>
        {savedAddresses.map((saved) => (
          <button
            key={saved.id}
            onClick={() => handleSavedAddress(saved.address)}
            className="w-full p-3 rounded-lg border border-border hover:border-primary hover:bg-primary hover:bg-opacity-5 transition text-left"
          >
            <p className="font-semibold text-foreground text-sm">{saved.label}</p>
            <p className="text-xs text-muted-foreground">{saved.address}</p>
          </button>
        ))}
      </div>

      {/* Custom Address Input */}
      <div>
        <label className="text-sm font-semibold text-foreground block mb-2">Enter Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your delivery address..."
          className="w-full bg-muted border border-border rounded-lg p-3 text-foreground text-sm resize-none min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button onClick={handleCustomAddress} className="w-full bg-primary text-primary-foreground">
          Confirm Address
        </Button>
      </div>
    </div>
  )
}
