"use client"

import { MapPin } from "lucide-react"

interface DeliveryMapProps {
  status: "pending" | "confirmed" | "preparing" | "ready" | "on_way" | "delivered"
  orderData?: any
}

export default function DeliveryMap({ status, orderData }: DeliveryMapProps) {
  // Simulated driver position based on status
  const driverProgress = {
    pending: 0,
    confirmed: 0,
    preparing: 0,
    ready: 0,
    on_way: Math.random() * 0.8 + 0.1, // 10-90% of the way
    delivered: 1,
  }

  const progress = driverProgress[status as keyof typeof driverProgress]

  return (
    <div className="bg-gradient-to-b from-secondary to-secondary/80 rounded-lg overflow-hidden mb-6 h-64 flex items-center justify-center relative shadow-md">
      {/* Map Placeholder with Animated Marker */}
      <div className="w-full h-full bg-gradient-to-br from-muted to-muted/60 relative flex items-center justify-center">
        {/* Restaurant Marker */}
        <div className="absolute top-1/4 left-1/4 flex flex-col items-center">
          <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-lg border-2 border-primary-foreground/30">
            🍽️
          </div>
          <p className="text-xs text-foreground mt-2 font-semibold bg-background/80 px-2 py-0.5 rounded">
            {orderData?.restaurants?.name || "Restaurant"}
          </p>
        </div>

        {/* Delivery Location Marker */}
        <div className="absolute bottom-1/4 right-1/4 flex flex-col items-center">
          <div className="w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-lg border-2 border-accent-foreground/30">
            📍
          </div>
          <p className="text-xs text-foreground mt-2 font-semibold bg-background/80 px-2 py-0.5 rounded">You</p>
        </div>

        {/* Route Line - Only show when on_way or delivered */}
        {(status === "on_way" || status === "delivered" || status === "ready") && (
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.5" />
                <stop offset={`${progress * 100}%`} stopColor="rgb(59, 130, 246)" stopOpacity="1" />
                <stop offset={`${progress * 100}%`} stopColor="rgb(156, 163, 175)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgb(156, 163, 175)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <line
              x1="25%"
              y1="25%"
              x2="75%"
              y2="75%"
              stroke="url(#routeGradient)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        )}

        {/* Driver Marker - Animated when on_way */}
        {status === "on_way" && (
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              left: `${25 + progress * 50}%`,
              top: `${25 + progress * 50}%`,
            }}
          >
            <div className="animate-pulse">
              <MapPin className="w-8 h-8 text-destructive drop-shadow-lg" fill="currentColor" />
            </div>
            <div className="absolute w-16 h-16 rounded-full border-2 border-destructive/30 animate-pulse -left-6 -top-6"></div>
          </div>
        )}

        {/* Center Text with Status */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground opacity-80">
              {status === "pending" && "Confirming your order"}
              {status === "confirmed" && "Preparing your order"}
              {status === "preparing" && "In the kitchen"}
              {status === "ready" && "Ready for pickup"}
              {status === "on_way" && `Driver en route - ${Math.round(progress * 100)}%`}
              {status === "delivered" && "Order delivered"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
