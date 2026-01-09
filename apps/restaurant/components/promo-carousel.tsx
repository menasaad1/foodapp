"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const promos = [
  {
    id: 1,
    title: "خصم 50%",
    subtitle: "في طلبك الأول",
    code: "WELCOME50",
    bg: "from-primary to-primary/80",
  },
  {
    id: 2,
    title: "توصيل مجاني",
    subtitle: "على الطلبات فوق 50 درهم",
    code: "FREEDEL50",
    bg: "from-accent to-accent/80",
  },
  {
    id: 3,
    title: "نقاط مضاعفة",
    subtitle: "في نهاية الأسبوع فقط",
    code: "DOUBLE2X",
    bg: "from-secondary to-secondary/80",
  },
]

export default function PromoCarousel() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((current + 1) % promos.length)
  const prev = () => setCurrent((current - 1 + promos.length) % promos.length)

  return (
    <div className="mb-8">
      <div className="relative">
        {/* Carousel */}
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {promos.map((promo) => (
              <div
                key={promo.id}
                className={`w-full flex-shrink-0 bg-gradient-to-br ${promo.bg} text-white p-6 rounded-xl min-h-[140px] flex flex-col justify-between`}
              >
                <div>
                  <p className="text-sm font-medium opacity-90">عرض خاص</p>
                  <h3 className="text-2xl font-bold mt-1">{promo.title}</h3>
                  <p className="text-sm opacity-90 mt-1">{promo.subtitle}</p>
                </div>
                <div className="bg-white/20 rounded px-2 py-1 inline-block w-fit">
                  <code className="text-xs font-mono font-semibold">{promo.code}</code>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1 transition z-10"
        >
          <ChevronLeft className="w-5 h-5 text-primary" />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1 transition z-10"
        >
          <ChevronRight className="w-5 h-5 text-primary" />
        </button>

        {/* Dots */}
        <div className="flex gap-2 justify-center mt-3">
          {promos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition ${idx === current ? "bg-primary w-6" : "bg-muted w-2"}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
