"use client"

import { useState } from "react"
import { CreditCard, Wallet, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaymentMethodSelectorProps {
  onSubmit: (method: string) => void
  initialMethod?: string
}

export default function PaymentMethodSelector({ onSubmit, initialMethod }: PaymentMethodSelectorProps) {
  const [selectedMethod, setSelectedMethod] = useState(initialMethod || "")

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      description: "Visa, Mastercard, AMEX",
      icon: CreditCard,
      banks: ["ADCB", "FAB", "DIB"],
    },
    {
      id: "wallet",
      name: "Digital Wallet",
      description: "Apple Pay, Google Pay",
      icon: Wallet,
      banks: ["Apple Pay", "Google Pay"],
    },
    {
      id: "cash",
      name: "Cash on Delivery",
      description: "Pay when your food arrives",
      icon: DollarSign,
      banks: [],
    },
  ]

  const handleSubmit = () => {
    if (selectedMethod) {
      onSubmit(selectedMethod)
    }
  }

  return (
    <div className="space-y-4 mb-20">
      <h2 className="text-lg font-bold text-foreground">Payment Method</h2>

      <div className="space-y-3">
        {paymentMethods.map((method) => {
          const Icon = method.icon
          return (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full p-4 rounded-lg border-2 transition text-left ${
                selectedMethod === method.id
                  ? "border-primary bg-primary bg-opacity-10"
                  : "border-border hover:border-primary"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    selectedMethod === method.id ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{method.name}</p>
                  <p className="text-xs text-muted-foreground">{method.description}</p>
                  {method.banks.length > 0 && (
                    <div className="flex gap-1 flex-wrap mt-2">
                      {method.banks.map((bank) => (
                        <span key={bank} className="text-xs bg-muted px-2 py-1 rounded text-foreground">
                          {bank}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <Button onClick={handleSubmit} disabled={!selectedMethod} className="w-full bg-primary text-primary-foreground">
        Confirm Payment Method
      </Button>
    </div>
  )
}
