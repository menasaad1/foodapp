"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Store, TrendingUp, Settings } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Command Center</h1>
          <p className="text-slate-500">Platform Overview</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" /> Settings
          </Button>
        </div>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 flex items-center gap-4">
          <div className="p-4 bg-blue-100 rounded-full text-blue-600">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Users</p>
            <h3 className="text-2xl font-bold">12,345</h3>
            <span className="text-xs text-green-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" /> +12% this month
            </span>
          </div>
        </Card>
        <Card className="p-6 flex items-center gap-4">
          <div className="p-4 bg-orange-100 rounded-full text-orange-600">
            <Store className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Active Restaurants</p>
            <h3 className="text-2xl font-bold">85</h3>
            <span className="text-xs text-green-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" /> +5 new this week
            </span>
          </div>
        </Card>
        <Card className="p-6 flex items-center gap-4">
          <div className="p-4 bg-green-100 rounded-full text-green-600">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <h3 className="text-2xl font-bold">AED 1.2M</h3>
            <span className="text-xs text-green-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" /> +8% vs last month
            </span>
          </div>
        </Card>
      </div>

      {/* Management Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">User Management</h3>
          <ul className="space-y-4">
            <li className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span>Pending Approvals (Drivers)</span>
              <Button size="sm" variant="secondary">Review (3)</Button>
            </li>
            <li className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span>User Reports</span>
              <Button size="sm" variant="secondary">View</Button>
            </li>
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Restaurant Management</h3>
          <ul className="space-y-4">
            <li className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span>Onboarding Requests</span>
              <Button size="sm" variant="secondary">Review (1)</Button>
            </li>
            <li className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span>Menu Updates</span>
              <Button size="sm" variant="secondary">Approve</Button>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
