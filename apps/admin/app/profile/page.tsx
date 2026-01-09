"use client"

import { useState, useEffect } from "react"
import { LogOut, Bell, Lock, HelpCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import ProfileHeader from "@/components/profile-header"
import AddressManagement from "@/components/address-management"
import PreferencesSettings from "@/components/preferences-settings"
import { getOrders } from "@/lib/supabase/queries"
import { signOut } from "@/lib/supabase/auth"
import { createClient } from "@/lib/supabase/client"

type TabType = "overview" | "addresses" | "preferences" | "settings"

export default function ProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [user, setUser] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()

        if (!authUser) {
          router.push("/auth/login")
          return
        }

        setUser(authUser)

        // Load user orders
        if (authUser.id) {
          const userOrders = await getOrders(authUser.id)
          setOrders(userOrders || [])
        }
      } catch (error) {
        console.error("[v0] Failed to load user data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [router])

  const handleLogout = async () => {
    try {
      await signOut()
      router.push("/auth/login")
    } catch (error) {
      console.error("[v0] Logout failed:", error)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading profile...</div>
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background border-b border-border px-4 py-3">
        <h1 className="text-lg font-bold text-foreground">My Profile</h1>
      </div>

      {/* Profile Header */}
      <ProfileHeader user={user} />

      {/* Tab Navigation */}
      <div className="sticky top-14 z-20 bg-background border-b border-border px-4 -mx-4">
        <div className="flex gap-4 overflow-x-auto">
          {[
            { id: "overview", label: "Overview", icon: "👤" },
            { id: "addresses", label: "Addresses", icon: "📍" },
            { id: "preferences", label: "Preferences", icon: "⚙️" },
            { id: "settings", label: "Settings", icon: "🔧" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-4 py-3 border-b-2 font-medium whitespace-nowrap transition ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="px-4 py-4">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h2 className="font-bold text-foreground mb-4">Quick Stats</h2>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{orders.length}</p>
                  <p className="text-xs text-muted-foreground">Total Orders</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">4.7</p>
                  <p className="text-xs text-muted-foreground">Avg Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-secondary">{orders.length * 50}</p>
                  <p className="text-xs text-muted-foreground">Points</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-bold text-foreground mb-3">Membership</h3>
              <div className="bg-gradient-to-r from-accent to-secondary rounded-lg p-4 text-white">
                <p className="text-sm opacity-90">Your Tier</p>
                <p className="text-2xl font-bold">Silver Member</p>
                <p className="text-xs opacity-75 mt-2">238 points to Gold status</p>
              </div>
            </div>

            {/* Recent Orders */}
            {orders.length > 0 && (
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-bold text-foreground mb-3">Recent Activity</h3>
                <div className="space-y-3">
                  {orders.slice(0, 3).map((order, idx) => (
                    <div key={order.id} className={idx > 0 ? "border-t border-border pt-3" : ""}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-sm text-foreground">
                            Order from {order.restaurants?.name || "Restaurant"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()} • AED {order.total?.toFixed(2)}
                          </p>
                        </div>
                        <span className="text-xs text-accent font-semibold">+{(order.total * 0.3).toFixed(0)} pts</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === "addresses" && <AddressManagement />}

        {/* Preferences Tab */}
        {activeTab === "preferences" && <PreferencesSettings />}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-3">
            <div className="bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:bg-secondary transition cursor-pointer">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-semibold text-foreground">Notifications</p>
                  <p className="text-xs text-muted-foreground">Manage push & email</p>
                </div>
              </div>
              <span className="text-muted-foreground">→</span>
            </div>

            <div className="bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:bg-secondary transition cursor-pointer">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-semibold text-foreground">Change Password</p>
                  <p className="text-xs text-muted-foreground">Update your security</p>
                </div>
              </div>
              <span className="text-muted-foreground">→</span>
            </div>

            <div className="bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:bg-secondary transition cursor-pointer">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-semibold text-foreground">Help & Support</p>
                  <p className="text-xs text-muted-foreground">FAQs and contact us</p>
                </div>
              </div>
              <span className="text-muted-foreground">→</span>
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-destructive text-destructive-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition mt-6 flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
