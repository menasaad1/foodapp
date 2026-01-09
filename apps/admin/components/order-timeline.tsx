"use client"

import { Check } from "lucide-react"

interface OrderTimelineProps {
  currentStatus: "pending" | "confirmed" | "preparing" | "ready" | "on_way" | "delivered"
}

export default function OrderTimeline({ currentStatus }: OrderTimelineProps) {
  const steps = [
    { id: "pending", label: "Order Placed", time: "just now" },
    { id: "confirmed", label: "Order Confirmed", time: "est. 2 mins" },
    { id: "preparing", label: "Preparing", time: "est. 5 mins" },
    { id: "ready", label: "Ready for Pickup", time: "est. 15 mins" },
    { id: "on_way", label: "On the Way", time: "est. 20 mins" },
    { id: "delivered", label: "Delivered", time: "est. 35 mins" },
  ]

  const statusOrder = ["pending", "confirmed", "preparing", "ready", "on_way", "delivered"]
  const currentIndex = statusOrder.indexOf(currentStatus)

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h3 className="font-bold text-foreground mb-6">Order Timeline</h3>

      <div className="space-y-6">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentIndex
          const isCurrent = idx === currentIndex

          return (
            <div key={step.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition ${
                    isCompleted
                      ? "bg-primary text-primary-foreground"
                      : isCurrent
                        ? "bg-accent text-accent-foreground animate-pulse"
                        : "bg-muted text-muted-foreground border-2 border-border"
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : idx + 1}
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`w-0.5 h-12 my-2 transition ${isCompleted ? "bg-primary" : isCurrent ? "bg-accent" : "bg-border"}`}
                  />
                )}
              </div>

              <div className="flex flex-col justify-center pb-6">
                <p
                  className={`font-semibold ${isCurrent ? "text-accent" : isCompleted ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {step.label}
                </p>
                <p className="text-xs text-muted-foreground">{step.time}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
