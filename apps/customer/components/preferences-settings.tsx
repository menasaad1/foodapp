"use client"

import { useState } from "react"

export default function PreferencesSettings() {
  const [preferences, setPreferences] = useState({
    dietaryRestrictions: ["vegetarian"],
    spiceLevel: "medium",
    cuisinePreferences: ["arabic", "indian", "italian"],
    notifications: {
      orders: true,
      promotions: true,
      newRestaurants: false,
    },
  })

  const cuisines = [
    { id: "arabic", label: "Arabic" },
    { id: "indian", label: "Indian" },
    { id: "italian", label: "Italian" },
    { id: "asian", label: "Asian" },
    { id: "fast-food", label: "Fast Food" },
  ]

  const dietaryOptions = [
    { id: "vegetarian", label: "Vegetarian" },
    { id: "vegan", label: "Vegan" },
    { id: "halal", label: "Halal" },
    { id: "gluten-free", label: "Gluten Free" },
  ]

  const toggleDietary = (option: string) => {
    setPreferences((prev) => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(option)
        ? prev.dietaryRestrictions.filter((d) => d !== option)
        : [...prev.dietaryRestrictions, option],
    }))
  }

  const toggleCuisine = (cuisine: string) => {
    setPreferences((prev) => ({
      ...prev,
      cuisinePreferences: prev.cuisinePreferences.includes(cuisine)
        ? prev.cuisinePreferences.filter((c) => c !== cuisine)
        : [...prev.cuisinePreferences, cuisine],
    }))
  }

  return (
    <div className="space-y-4">
      {/* Spice Level */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-bold text-foreground mb-3">Preferred Spice Level</h3>
        <div className="grid grid-cols-3 gap-2">
          {["mild", "medium", "spicy"].map((level) => (
            <button
              key={level}
              onClick={() => setPreferences((prev) => ({ ...prev, spiceLevel: level }))}
              className={`py-2 rounded-lg font-medium transition capitalize ${
                preferences.spiceLevel === level
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-secondary"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Dietary Restrictions */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-bold text-foreground mb-3">Dietary Restrictions</h3>
        <div className="space-y-2">
          {dietaryOptions.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-3 cursor-pointer hover:bg-muted p-2 rounded transition"
            >
              <input
                type="checkbox"
                checked={preferences.dietaryRestrictions.includes(option.id)}
                onChange={() => toggleDietary(option.id)}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-foreground font-medium">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Cuisine Preferences */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-bold text-foreground mb-3">Favorite Cuisines</h3>
        <div className="flex flex-wrap gap-2">
          {cuisines.map((cuisine) => (
            <button
              key={cuisine.id}
              onClick={() => toggleCuisine(cuisine.id)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                preferences.cuisinePreferences.includes(cuisine.id)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-secondary"
              }`}
            >
              {cuisine.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-bold text-foreground mb-3">Notification Preferences</h3>
        <div className="space-y-3">
          {[
            { id: "orders", label: "Order Updates", desc: "Delivery and status updates" },
            { id: "promotions", label: "Promotions", desc: "Special offers and discounts" },
            { id: "newRestaurants", label: "New Restaurants", desc: "New places to eat" },
          ].map((notif) => (
            <label
              key={notif.id}
              className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition cursor-pointer"
            >
              <div>
                <p className="font-medium text-foreground">{notif.label}</p>
                <p className="text-xs text-muted-foreground">{notif.desc}</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.notifications[notif.id as keyof typeof preferences.notifications]}
                onChange={() =>
                  setPreferences((prev) => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      [notif.id]: !prev.notifications[notif.id as keyof typeof prev.notifications],
                    },
                  }))
                }
                className="w-4 h-4 accent-primary"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
