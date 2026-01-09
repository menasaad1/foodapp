"use client"
import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

const pages = [
  {
    id: "home",
    title: "صفحة الرئيسية | Home Page",
    nameAr: "الرئيسية",
    nameEn: "Home",
    description: "تعرض أبرز المطاعم والفئات وعروض خاصة مع شريط بحث متقدم",
    descriptionEn: "Displays featured restaurants, cuisine categories, and special offers with advanced search bar",
    features: [
      "شريط بحث سريع | Quick search bar",
      "عرض العروضات المميزة | Promo carousel",
      "فئات المطابخ | Cuisine categories",
      "المطاعم المميزة | Featured restaurants",
      "تصفية ذكية | Smart filtering",
    ],
    color: "from-amber-600 to-red-600",
  },
  {
    id: "restaurant",
    title: "صفحة المطعم | Restaurant Page",
    nameAr: "تفاصيل المطعم",
    nameEn: "Restaurant Details",
    description: "عرض قائمة الطعام الكاملة للمطعم مع صور وأسعار والتفاصيل",
    descriptionEn: "Complete menu with images, prices, descriptions and restaurant details",
    features: [
      "صور عالية الجودة | High quality images",
      "أقسام المنيو | Menu categories",
      "تقييمات المطعم | Restaurant ratings",
      "وقت التوصيل | Delivery time",
      "إضافة للسلة | Add to cart",
    ],
    color: "from-orange-500 to-amber-600",
  },
  {
    id: "menu",
    title: "صفحة الطلب | Order Menu",
    nameAr: "قائمة الطعام",
    nameEn: "Menu Items",
    description: "عرض تفاصيل الوجبات مع خيارات التخصيص والإضافات",
    descriptionEn: "Detailed meal information with customization options and add-ons",
    features: [
      "وصف تفصيلي | Detailed descriptions",
      "اختيار الكمية | Quantity selector",
      "إضافات خاصة | Special requests",
      "عرض السعر الفوري | Real-time pricing",
      "صور الوجبات | Meal images",
    ],
    color: "from-red-600 to-rose-600",
  },
  {
    id: "cart",
    title: "صفحة السلة | Shopping Cart",
    nameAr: "سلة التسوق",
    nameEn: "Cart",
    description: "إدارة العناصر المختارة وحساب الإجمالي مع الرسوم والضرائب",
    descriptionEn: "Manage selected items and calculate totals with fees and taxes",
    features: [
      "قائمة العناصر المختارة | Selected items list",
      "تعديل الكمية | Edit quantities",
      "حساب الإجمالي | Total calculation",
      "رسوم التوصيل | Delivery fees",
      "حذف العناصر | Remove items",
    ],
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "checkout",
    title: "صفحة الدفع | Checkout",
    nameAr: "إتمام الشراء",
    nameEn: "Checkout Process",
    description: "خطوات الدفع متعددة المراحل مع اختيار العنوان وطريقة الدفع",
    descriptionEn: "Multi-step checkout with address selection and payment method",
    features: [
      "خطوات واضحة | Clear steps indicator",
      "اختيار العنوان | Address selection",
      "طرق الدفع | Payment methods",
      "ملاحظات خاصة | Special instructions",
      "ملخص الطلب | Order summary",
    ],
    color: "from-red-600 to-rose-700",
  },
  {
    id: "tracking",
    title: "تتبع الطلب | Order Tracking",
    nameAr: "متابعة الطلب",
    nameEn: "Order Tracking",
    description: "متابعة الطلب في الوقت الفعلي مع خريطة التوصيل ومعلومات السائق",
    descriptionEn: "Real-time order tracking with delivery map and driver info",
    features: [
      "تحديث فوري | Real-time updates",
      "خريطة التوصيل | Delivery map",
      "معلومات السائق | Driver information",
      "خط الزمن | Timeline status",
      "وقت الوصول المتوقع | Estimated arrival",
    ],
    color: "from-blue-600 to-cyan-600",
  },
  {
    id: "profile",
    title: "ملف المستخدم | User Profile",
    nameAr: "الملف الشخصي",
    nameEn: "Profile",
    description: "إدارة بيانات المستخدم والعناوين والتفضيلات والإعدادات",
    descriptionEn: "Manage user data, addresses, preferences and settings",
    features: [
      "بيانات الحساب | Account information",
      "إدارة العناوين | Address management",
      "المحفوظات | Saved preferences",
      "الإعدادات | Settings",
      "تحرير الملف | Edit profile",
    ],
    color: "from-purple-600 to-pink-600",
  },
  {
    id: "favorites",
    title: "المفضلات | Favorites",
    nameAr: "المفضلة",
    nameEn: "Favorites",
    description: "حفظ المطاعم والوجبات المفضلة للوصول السريع",
    descriptionEn: "Save favorite restaurants and meals for quick access",
    features: [
      "مطاعم مفضلة | Saved restaurants",
      "طلبات متكررة | Frequent orders",
      "تقييمات شخصية | Personal ratings",
      "تنظيم القائمة | Organize list",
      "مشاركة | Share",
    ],
    color: "from-red-500 to-pink-600",
  },
  {
    id: "search",
    title: "البحث والتصفية | Search & Filter",
    nameAr: "البحث",
    nameEn: "Search",
    description: "بحث متقدم وتصفية حسب الفئة والسعر والتقييم والمسافة",
    descriptionEn: "Advanced search and filter by category, price, rating and distance",
    features: [
      "بحث فوري | Instant search",
      "تصفية متعددة | Multiple filters",
      "البحث بالمسافة | Distance search",
      "ترتيب النتائج | Sort results",
      "حفظ البحث | Save searches",
    ],
    color: "from-blue-500 to-purple-600",
  },
  {
    id: "history",
    title: "السجل | Order History",
    nameAr: "السجل",
    nameEn: "History",
    description: "عرض جميع الطلبات السابقة مع التفاصيل والتقييمات",
    descriptionEn: "View all previous orders with details and reviews",
    features: [
      "قائمة الطلبات | Orders list",
      "تفاصيل الطلب | Order details",
      "إعادة الطلب | Reorder option",
      "التقييمات | Reviews",
      "الفواتير | Invoices",
    ],
    color: "from-emerald-600 to-teal-600",
  },
  {
    id: "login",
    title: "تسجيل الدخول | Login",
    nameAr: "تسجيل الدخول",
    nameEn: "Authentication",
    description: "تسجيل دخول وإنشاء حساب جديد مع التحقق الآمن",
    descriptionEn: "Secure login and registration with verification",
    features: [
      "بريد إلكتروني آمن | Email verification",
      "كلمة مرور قوية | Strong password",
      "إنشاء حساب | Account creation",
      "تذكر كلمة المرور | Password recovery",
      "مصادقة آمنة | Secure auth",
    ],
    color: "from-indigo-600 to-blue-700",
  },
  {
    id: "navigation",
    title: "القائمة السفلية | Bottom Navigation",
    nameAr: "القائمة",
    nameEn: "Navigation",
    description: "تنقل سريع بين الصفحات الرئيسية مع إشعارات العناصر",
    descriptionEn: "Quick navigation between main pages with item badges",
    features: [
      "ملف المستخدم | User profile",
      "سلة التسوق | Shopping cart badge",
      "المفضلات | Favorites tab",
      "السجل | History tab",
      "البحث | Search access",
    ],
    color: "from-gray-700 to-gray-900",
  },
]

export default function VisualGuidePage() {
  const [language, setLanguage] = useState<"ar" | "en">("en")

  const downloadPDF = async () => {
    const element = document.getElementById("pdf-content")
    if (!element) return

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      })

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgData = canvas.toDataURL("image/png")
      const imgWidth = 210 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= 297 // A4 height in mm

      while (heightLeft > 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= 297
      }

      pdf.save("el-sawah-design-guide.pdf")
    } catch (error) {
      console.error("PDF generation failed:", error)
      alert("Failed to generate PDF")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold ${language === "ar" ? "text-right" : ""}`}>
              {language === "ar" ? "دليل تصميم السوق | el sawah Design Guide" : "el sawah Design Guide"}
            </h1>
            <p className={`text-gray-600 text-sm ${language === "ar" ? "text-right" : ""}`}>
              {language === "ar" ? "شرح شامل لجميع الصفحات والمميزات" : "Comprehensive guide to all pages and features"}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setLanguage("en")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                language === "en" ? "bg-amber-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("ar")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                language === "ar" ? "bg-amber-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              العربية
            </button>
            <Button onClick={downloadPDF} className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2">
              <Download className="w-4 h-4" />
              {language === "ar" ? "تحميل PDF" : "Download PDF"}
            </Button>
          </div>
        </div>
      </div>

      <div id="pdf-content" className="max-w-7xl mx-auto p-8">
        {/* Cover Page */}
        <div className="bg-gradient-to-br from-amber-600 to-red-600 rounded-2xl p-12 mb-12 text-white text-center">
          <div className="mb-6">
            <div className="w-24 h-24 bg-white rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-6">
              <span className="text-4xl font-bold text-amber-600">el</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4">el sawah</h1>
          <p className="text-xl opacity-90 mb-2">
            {language === "ar" ? "تطبيق توصيل الطعام الرقمي" : "Digital Food Delivery Application"}
          </p>
          <p className="text-lg opacity-80">{language === "ar" ? "دليل التصميم الشامل" : "Complete Design Guide"}</p>
          <p className="text-sm opacity-70 mt-8">
            {language === "ar" ? "إمارات العربية المتحدة | 2025" : "United Arab Emirates | 2025"}
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl p-8 mb-12 shadow-lg">
          <h2 className={`text-2xl font-bold text-gray-800 mb-6 ${language === "ar" ? "text-right" : ""}`}>
            {language === "ar" ? "جدول المحتويات" : "Table of Contents"}
          </h2>
          <div className={`grid grid-cols-2 gap-4 ${language === "ar" ? "text-right" : ""}`}>
            {pages.map((page, index) => (
              <div key={page.id} className="flex items-center gap-3 text-gray-700">
                <span className="font-semibold text-amber-600">{index + 1}</span>
                <span>{language === "ar" ? page.nameAr : page.nameEn}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pages */}
        {pages.map((page, index) => (
          <div key={page.id} className="bg-white rounded-2xl p-8 mb-8 shadow-lg page-break">
            {/* Page Header */}
            <div className={`border-b-4 border-gray-200 pb-6 mb-6 ${language === "ar" ? "text-right" : ""}`}>
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${page.color} rounded-lg flex items-center justify-center text-white font-bold`}
                >
                  {index + 1}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{language === "ar" ? page.nameAr : page.nameEn}</h2>
                  <p className="text-sm text-gray-500">{page.id.toUpperCase()}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className={`mb-6 ${language === "ar" ? "text-right" : ""}`}>
              <p className="text-gray-700 text-lg leading-relaxed">
                {language === "ar" ? page.description : page.descriptionEn}
              </p>
            </div>

            {/* Features */}
            <div className={`mb-6 ${language === "ar" ? "text-right" : ""}`}>
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {language === "ar" ? "المميزات الرئيسية:" : "Key Features:"}
              </h3>
              <ul className={`space-y-2 ${language === "ar" ? "text-right" : ""}`}>
                {page.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700">
                    <div className={`w-2 h-2 bg-gradient-to-br ${page.color} rounded-full`} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual Placeholder */}
            <div className={`bg-gradient-to-br ${page.color} rounded-xl p-12 text-white text-center`}>
              <p className="text-sm opacity-80">{language === "ar" ? "صورة الصفحة" : "Page Screenshot"}</p>
              <p className="text-2xl font-bold">{page.nameEn}</p>
            </div>
          </div>
        ))}

        {/* Design System */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg page-break">
          <h2 className={`text-2xl font-bold text-gray-800 mb-6 ${language === "ar" ? "text-right" : ""}`}>
            {language === "ar" ? "نظام التصميم" : "Design System"}
          </h2>

          {/* Colors */}
          <div className={`mb-8 ${language === "ar" ? "text-right" : ""}`}>
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {language === "ar" ? "الألوان الأساسية:" : "Primary Colors:"}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-lg mb-2 mx-auto shadow-md" />
                <p className="text-sm font-semibold text-gray-700">Primary</p>
                <p className="text-xs text-gray-500">#B45309</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-lg mb-2 mx-auto shadow-md" />
                <p className="text-sm font-semibold text-gray-700">Secondary</p>
                <p className="text-xs text-gray-500">#DC2626</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-lg mb-2 mx-auto shadow-md" />
                <p className="text-sm font-semibold text-gray-700">Accent</p>
                <p className="text-xs text-gray-500">#EAB308</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-800 rounded-lg mb-2 mx-auto shadow-md" />
                <p className="text-sm font-semibold text-gray-700">Dark</p>
                <p className="text-xs text-gray-500">#1F2937</p>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className={language === "ar" ? "text-right" : ""}>
            <h3 className="text-lg font-bold text-gray-800 mb-4">{language === "ar" ? "الخطوط:" : "Typography:"}</h3>
            <div className="space-y-4">
              <div>
                <p className="text-2xl font-bold text-gray-900">Heading 1</p>
                <p className="text-sm text-gray-600">Geist Bold, 32px</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">Body Text</p>
                <p className="text-sm text-gray-600">Geist Regular, 16px</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 text-sm mt-12 pt-8 border-t border-gray-200">
          <p>{language === "ar" ? "جميع الحقوق محفوظة © 2025 el sawah" : "All Rights Reserved © 2025 el sawah"}</p>
        </div>
      </div>

      <style jsx>{`
        @media print {
          .page-break {
            page-break-after: always;
          }
        }
      `}</style>
    </div>
  )
}
