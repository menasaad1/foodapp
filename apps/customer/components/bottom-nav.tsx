"use client"

import { Home, Search, ShoppingCart, Heart, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { getCart } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/client"

export default function BottomNav() {
  const pathname = usePathname()
  const [cartCount, setCartCount] = useState(0)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const loadCartCount = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUserId(user?.id || null)

        if (user?.id) {
          const cartItems = await getCart(user.id)
          setCartCount(cartItems?.length || 0)
        }
      } catch (error) {
        console.error("[v0] Failed to load cart count:", error)
      }
    }

    loadCartCount()
  }, [])

  const navItems = [
    { id: "home", label: "الرئيسية", icon: Home, href: "/" },
    { id: "search", label: "البحث", icon: Search, href: "/search" },
    { id: "cart", label: "السلة", icon: ShoppingCart, href: "/cart", badge: cartCount },
    { id: "favorites", label: "المفضلة", icon: Heart, href: "/favorites" },
    { id: "profile", label: "الملف", icon: User, href: "/profile" },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex justify-around items-center h-20 max-w-full">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)

          return (
            <Link
              key={item.id}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 flex-1 h-full hover:bg-muted transition"
            >
              <div className="relative">
                <Icon className={`w-6 h-6 ${active ? "text-primary" : "text-muted-foreground"}`} />
                {item.badge !== 0 && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs font-medium ${active ? "text-primary" : "text-muted-foreground"}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
