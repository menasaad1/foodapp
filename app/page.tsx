import { Suspense } from "react"
import Header from "@/components/header"
import SearchBar from "@/components/search-bar"
import PromoCarousel from "@/components/promo-carousel"
import CuisineCategories from "@/components/cuisine-categories"
import FeaturedRestaurants from "@/components/featured-restaurants"
import BottomNav from "@/components/bottom-nav"

export default function Home() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />
      <main className="px-4 py-4">
        <SearchBar />
        <PromoCarousel />
        <CuisineCategories />
        <Suspense fallback={<div className="p-4">Loading restaurants...</div>}>
          <FeaturedRestaurants />
        </Suspense>
      </main>
      <BottomNav />
    </div>
  )
}
