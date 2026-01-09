"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, MapPin, CreditCard, Loader } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import DeliveryAddressForm from "@/components/delivery-address-form"
import PaymentMethodSelector from "@/components/payment-method-selector"
import { getCart, createOrder, clearCart } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/client"

export default function CheckoutPage() {
  const router = useRouter()
  const [step, setStep] = useState<"address" | "payment" | "confirmation">("address")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [notes, setNotes] = useState("")
  const [cartItems, setCartItems] = useState<any[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const [restaurantId, setRestaurantId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const loadCart = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUserId(user?.id || null)

        if (user?.id) {
          const items = await getCart(user.id)
          setCartItems(items || [])
          if (items && items.length > 0) {
            setRestaurantId(items[0].restaurant_id)
          }
        }
      } catch (error) {
        console.error("[v0] Failed to load cart:", error)
      }
    }

    loadCart()
  }, [])

  const subtotal = cartItems.reduce((sum, item) => sum + item.menu_items.price * item.quantity, 0)
  const deliveryFee = subtotal > 100 ? 0 : cartItems[0]?.restaurants?.delivery_fee || 0
  const tax = Math.round(subtotal * 0.05 * 100) / 100
  const total = subtotal + deliveryFee + tax

  const handleAddressSubmit = (address: string) => {
    setDeliveryAddress(address)
    setStep("payment")
  }

  const handlePaymentSubmit = (method: string) => {
    setPaymentMethod(method)
    setStep("confirmation")
  }

  const handlePlaceOrder = async () => {
    if (!deliveryAddress || !paymentMethod || !userId || !restaurantId) return

    setSubmitting(true)
    try {
      const order = await createOrder(userId, restaurantId, {
        status: "pending",
        subtotal,
        delivery_fee: deliveryFee,
        total,
        delivery_address: deliveryAddress,
        payment_method: paymentMethod,
        notes,
        estimated_delivery_time: new Date(Date.now() + 30 * 60000).toISOString(),
      })

      await clearCart(userId)
      router.push(`/orders/${order.id}`)
    } catch (error) {
      console.error("[v0] Failed to place order:", error)
      alert("Failed to place order. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
        <Link href="/cart">
          <button className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
        </Link>
        <h1 className="text-lg font-bold text-foreground">Checkout</h1>
      </div>

      <main className="px-4 py-4">
        {/* Step Indicator */}
        <div className="flex gap-2 mb-6">
          {["address", "payment", "confirmation"].map((s, index) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full transition ${
                ["address", "payment", "confirmation"].indexOf(step) >= index ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Delivery Address Section */}
        {step === "address" && <DeliveryAddressForm onSubmit={handleAddressSubmit} initialAddress={deliveryAddress} />}

        {/* Payment Method Section */}
        {(step === "payment" || step === "confirmation") && (
          <>
            <div className="bg-card border border-border rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Delivery Address</p>
                  <p className="font-semibold text-foreground text-sm">{deliveryAddress}</p>
                </div>
              </div>
            </div>

            {step === "payment" && (
              <PaymentMethodSelector onSubmit={handlePaymentSubmit} initialMethod={paymentMethod} />
            )}

            {step === "confirmation" && (
              <>
                <div className="bg-card border border-border rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-accent-foreground">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Payment Method</p>
                      <p className="font-semibold text-foreground text-sm">{paymentMethod}</p>
                    </div>
                  </div>
                </div>

                {/* Special Instructions */}
                <div className="bg-card border border-border rounded-lg p-4 mb-4">
                  <label className="text-sm font-semibold text-foreground block mb-2">Special Instructions</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add delivery notes or special requests..."
                    className="w-full bg-muted border border-border rounded-lg p-3 text-foreground text-sm resize-none min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </>
            )}
          </>
        )}

        {/* Order Summary - Fixed Position */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
          <div className="max-w-full mx-auto px-4">
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">AED {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span className="font-semibold text-foreground">AED {deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-semibold text-foreground">AED {tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border font-bold">
                <span className="text-foreground">Total</span>
                <span className="text-lg text-primary">AED {total.toFixed(2)}</span>
              </div>
            </div>

            {step === "address" && (
              <Button disabled className="w-full bg-muted text-muted-foreground cursor-not-allowed">
                Complete Address to Continue
              </Button>
            )}

            {step === "payment" && (
              <Button disabled className="w-full bg-muted text-muted-foreground cursor-not-allowed">
                Select Payment Method
              </Button>
            )}

            {step === "confirmation" && (
              <Button
                onClick={handlePlaceOrder}
                disabled={submitting}
                className="w-full bg-primary text-primary-foreground font-bold hover:opacity-90 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  "Place Order"
                )}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
