"use client"

import { useState } from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export default function PrintableDesignGuide() {
  const [language, setLanguage] = useState<"ar" | "en">("ar")
  const [isGenerating, setIsGenerating] = useState(false)

  const pages = [
    { route: "/", label: "ar" in { ar: "الصفحة الرئيسية" } ? "الصفحة الرئيسية" : "Home" },
    { route: "/search", label: language === "ar" ? "البحث" : "Search" },
    { route: "/cart", label: language === "ar" ? "السلة" : "Cart" },
    { route: "/favorites", label: language === "ar" ? "المفضلة" : "Favorites" },
    { route: "/profile", label: language === "ar" ? "البروفايل" : "Profile" },
  ]

  const generatePDF = async () => {
    setIsGenerating(true)
    try {
      const element = document.getElementById("pdf-content")
      if (!element) return

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= 297

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= 297
      }

      pdf.save(`el-sawah-design-guide-${language}.pdf`)
    } catch (error) {
      console.error("PDF generation error:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className={language === "ar" ? "rtl" : "ltr"} dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Controls */}
      <div className="sticky top-0 z-50 bg-[#8B2E3D] text-white p-4 shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold">el sawah - {language === "ar" ? "دليل التصميم" : "Design Guide"}</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
            className="bg-white text-[#8B2E3D] px-4 py-2 rounded font-bold hover:bg-[#D4A574]"
          >
            {language === "ar" ? "English" : "العربية"}
          </button>
          <button
            onClick={generatePDF}
            disabled={isGenerating}
            className="bg-[#D4A574] text-[#8B2E3D] px-6 py-2 rounded font-bold hover:bg-yellow-300 disabled:opacity-50"
          >
            {isGenerating ? "جاري..." : language === "ar" ? "تحميل PDF" : "Download PDF"}
          </button>
        </div>
      </div>

      {/* PDF Content */}
      <div id="pdf-content" className="bg-white">
        {/* Cover Page */}
        <div className="h-screen bg-gradient-to-br from-[#8B2E3D] to-[#6B1F2D] flex flex-col items-center justify-center text-white p-8">
          <img src="/icon.jpg" alt="el sawah" className="w-32 h-32 rounded-lg mb-8 shadow-lg" />
          <h1 className="text-6xl font-bold text-center mb-4">el sawah</h1>
          <p className="text-3xl text-[#D4A574] mb-12">
            {language === "ar" ? "السوق - منصة التوصيل الفاخرة" : "The Market - Premium Delivery Platform"}
          </p>
          <p className="text-xl text-center max-w-2xl">
            {language === "ar"
              ? "دليل التصميم الشامل لتطبيق التوصيل الفاخر الموجه لسكان الإمارات"
              : "Comprehensive Design Guide for Premium Food Delivery App for UAE Residents"}
          </p>
        </div>

        {/* Color Palette Page */}
        <div className="h-screen bg-white p-16 flex flex-col">
          <h2 className="text-4xl font-bold text-[#8B2E3D] mb-12">
            {language === "ar" ? "نظام الألوان" : "Color Palette"}
          </h2>

          <div className="grid grid-cols-2 gap-8 flex-1">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <div className="h-40 bg-[#8B2E3D] flex items-center justify-center text-white">
                <span className="text-3xl font-bold">#8B2E3D</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#8B2E3D] mb-2">
                  {language === "ar" ? "البرجوندي الأساسي" : "Burgundy Primary"}
                </h3>
                <p className="text-gray-600">
                  {language === "ar"
                    ? "اللون الأساسي يعكس الفخامة والثقة والراقية"
                    : "Primary color reflecting luxury, trust and elegance"}
                </p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-xl">
              <div className="h-40 bg-[#D4A574] flex items-center justify-center text-white">
                <span className="text-3xl font-bold">#D4A574</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#8B2E3D] mb-2">
                  {language === "ar" ? "الذهبي الثانوي" : "Gold Secondary"}
                </h3>
                <p className="text-gray-600">
                  {language === "ar"
                    ? "لون ثانوي يضيف تفاصيل راقية وتمييز بصري"
                    : "Secondary accent color for details and visual hierarchy"}
                </p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-xl">
              <div className="h-40 bg-white border-4 border-gray-200 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-400">#FFFFFF</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#8B2E3D] mb-2">{language === "ar" ? "الأبيض" : "White"}</h3>
                <p className="text-gray-600">{language === "ar" ? "الخلفيات والنظافة" : "Backgrounds and clarity"}</p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-xl">
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-400">#F5F5F5</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#8B2E3D] mb-2">
                  {language === "ar" ? "الخلفية الثانوية" : "Secondary Background"}
                </h3>
                <p className="text-gray-600">
                  {language === "ar" ? "خلفيات العناصر الثانوية" : "Secondary element backgrounds"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pages Overview */}
        <div className="h-screen bg-white p-16 flex flex-col">
          <h2 className="text-4xl font-bold text-[#8B2E3D] mb-12">
            {language === "ar" ? "صفحات التطبيق" : "Application Pages"}
          </h2>

          <div className="grid grid-cols-2 gap-8 flex-1">
            {[
              {
                icon: "🏠",
                name: language === "ar" ? "الصفحة الرئيسية" : "Home Page",
                desc: language === "ar" ? "عرض المطاعم والعروضات" : "Display restaurants & offers",
              },
              {
                icon: "🔍",
                name: language === "ar" ? "البحث والتصفية" : "Search & Filter",
                desc: language === "ar" ? "بحث متقدم وتصفية قوية" : "Advanced search filters",
              },
              {
                icon: "🛒",
                name: language === "ar" ? "السلة" : "Shopping Cart",
                desc: language === "ar" ? "إدارة المنتجات المختارة" : "Manage selected items",
              },
              {
                icon: "❤️",
                name: language === "ar" ? "المفضلة" : "Favorites",
                desc: language === "ar" ? "المطاعم المحفوظة" : "Saved restaurants",
              },
              {
                icon: "👤",
                name: language === "ar" ? "البروفايل" : "Profile",
                desc: language === "ar" ? "إدارة البيانات الشخصية" : "Manage personal data",
              },
              {
                icon: "📍",
                name: language === "ar" ? "تتبع الطلب" : "Order Tracking",
                desc: language === "ar" ? "تتبع فوري مع الخريطة" : "Real-time tracking map",
              },
            ].map((page, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-[#8B2E3D] to-[#6B1F2D] rounded-lg p-6 text-white shadow-lg"
              >
                <div className="text-5xl mb-4">{page.icon}</div>
                <h3 className="text-xl font-bold mb-2">{page.name}</h3>
                <p className="text-sm text-[#D4A574]">{page.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Page */}
        <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-16 flex flex-col">
          <h2 className="text-4xl font-bold text-[#8B2E3D] mb-12">
            {language === "ar" ? "المميزات الرئيسية" : "Key Features"}
          </h2>

          <div className="grid grid-cols-2 gap-8 flex-1">
            {[
              {
                icon: "📱",
                title: language === "ar" ? "تصميم محمول أول" : "Mobile-First Design",
                desc:
                  language === "ar" ? "واجهة مستجيبة تعمل على جميع الأجهزة" : "Responsive interface for all devices",
              },
              {
                icon: "🌐",
                title: language === "ar" ? "ثنائية اللغة" : "Bilingual Support",
                desc: language === "ar" ? "دعم كامل للعربية والإنجليزية" : "Full Arabic & English support",
              },
              {
                icon: "⚡",
                title: language === "ar" ? "أداء عالي" : "High Performance",
                desc: language === "ar" ? "تحميل سريع وتجربة سلسة" : "Fast loading and smooth experience",
              },
              {
                icon: "🔐",
                title: language === "ar" ? "أمان عالي" : "High Security",
                desc: language === "ar" ? "تشفير وحماية البيانات" : "Data encryption and protection",
              },
              {
                icon: "🗺️",
                title: language === "ar" ? "التتبع الحي" : "Live Tracking",
                desc: language === "ar" ? "تتبع الطلب بالخريطة التفاعلية" : "Order tracking with interactive map",
              },
              {
                icon: "🎨",
                title: language === "ar" ? "تصميم احترافي" : "Professional Design",
                desc: language === "ar" ? "هوية بصرية فاخرة وراقية" : "Luxury visual identity and branding",
              },
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-[#D4A574]">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-[#8B2E3D] mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="h-screen bg-white p-16 flex flex-col">
          <h2 className="text-4xl font-bold text-[#8B2E3D] mb-12">
            {language === "ar" ? "البنية التكنولوجية" : "Technology Stack"}
          </h2>

          <div className="space-y-8 flex-1">
            {[
              { label: language === "ar" ? "الإطار الأمامي" : "Frontend Framework", value: "Next.js 16" },
              { label: language === "ar" ? "مكتبة المواد" : "UI Library", value: "React 19.2 + shadcn/ui" },
              { label: language === "ar" ? "نمط التصميم" : "Styling", value: "Tailwind CSS v4" },
              { label: language === "ar" ? "قاعدة البيانات" : "Database", value: "Supabase PostgreSQL" },
              { label: language === "ar" ? "المصادقة" : "Authentication", value: "Supabase Auth" },
              { label: language === "ar" ? "لغة البرمجة" : "Language", value: "TypeScript" },
            ].map((tech, i) => (
              <div key={i} className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{tech.label}</p>
                  <p className="text-2xl font-bold text-[#8B2E3D]">{tech.value}</p>
                </div>
                <div className="text-4xl">⚙️</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="h-screen bg-gradient-to-br from-[#8B2E3D] to-[#6B1F2D] text-white flex flex-col items-center justify-center p-16 text-center">
          <div className="text-7xl mb-8">🚀</div>
          <h2 className="text-5xl font-bold mb-8">el sawah</h2>
          <p className="text-2xl text-[#D4A574] mb-8 max-w-2xl">
            {language === "ar" ? "منصة توصيل الطعام الفاخرة في الإمارات" : "Premium Food Delivery Platform for UAE"}
          </p>
          <p className="text-lg opacity-75">
            {language === "ar" ? "© 2026 جميع الحقوق محفوظة" : "© 2026 All Rights Reserved"}
          </p>
        </div>
      </div>
    </div>
  )
}
