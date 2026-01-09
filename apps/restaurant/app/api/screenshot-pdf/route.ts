import { jsPDF } from "jspdf"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get("lang") || "ar"

    // إنشاء PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    // نص الغلاف
    pdf.setFont("Arial", "bold")
    pdf.setFontSize(32)
    pdf.setTextColor(139, 0, 0) // Burgundy

    const title = lang === "ar" ? "السوق" : "el sawah"
    pdf.text(title, 105, 80, { align: "center" })

    pdf.setFontSize(16)
    pdf.setTextColor(180, 140, 0) // Gold
    const subtitle = lang === "ar" ? "تطبيق توصيل الطعام الفاخر" : "Premium Food Delivery App"
    pdf.text(subtitle, 105, 100, { align: "center" })

    // إضافة معلومات
    pdf.setFontSize(12)
    pdf.setTextColor(0, 0, 0)
    pdf.text(lang === "ar" ? "دليل التصميم الشامل" : "Complete Design Guide", 105, 130, { align: "center" })

    pdf.addPage()

    // جدول المحتويات
    const pages = [
      { ar: "الصفحة الرئيسية", en: "Home Page", route: "/" },
      { ar: "تفاصيل المطعم", en: "Restaurant Details", route: "/restaurant/sample" },
      { ar: "سلة المشتريات", en: "Shopping Cart", route: "/cart" },
      { ar: "الدفع والتأكيد", en: "Checkout", route: "/checkout" },
      { ar: "تتبع الطلب", en: "Order Tracking", route: "/orders/sample" },
      { ar: "البحث والتصفية", en: "Search & Filter", route: "/search" },
      { ar: "المفضلة", en: "Favorites", route: "/favorites" },
      { ar: "سجل الطلبات", en: "Order History", route: "/history" },
      { ar: "البروفايل", en: "Profile", route: "/profile" },
      { ar: "تسجيل الدخول", en: "Login", route: "/auth/login" },
      { ar: "إنشاء حساب", en: "Sign Up", route: "/auth/signup" },
    ]

    pdf.setFontSize(14)
    pdf.setTextColor(139, 0, 0)
    pdf.text(lang === "ar" ? "جدول المحتويات" : "Table of Contents", 15, 20)

    pdf.setFontSize(11)
    pdf.setTextColor(0, 0, 0)

    let yPosition = 35
    pages.forEach((page, index) => {
      const pageTitle = lang === "ar" ? page.ar : page.en
      pdf.text(`${index + 1}. ${pageTitle}`, 20, yPosition)
      yPosition += 8
    })

    // نظام الألوان
    pdf.addPage()
    pdf.setFontSize(14)
    pdf.setTextColor(139, 0, 0)
    pdf.text(lang === "ar" ? "نظام الألوان" : "Color System", 15, 20)

    const colors = [
      { name: lang === "ar" ? "الأحمر البرجوندي" : "Burgundy Red", hex: "#8B0000", rgb: [139, 0, 0] },
      { name: lang === "ar" ? "الذهبي" : "Gold", hex: "#B48C00", rgb: [180, 140, 0] },
      { name: lang === "ar" ? "الأبيض" : "White", hex: "#FFFFFF", rgb: [255, 255, 255] },
      { name: lang === "ar" ? "الرمادي الفاتح" : "Light Gray", hex: "#F5F5F5", rgb: [245, 245, 245] },
      { name: lang === "ar" ? "الرمادي الداكن" : "Dark Gray", hex: "#333333", rgb: [51, 51, 51] },
    ]

    let colorY = 35
    colors.forEach((color) => {
      // رسم مربع اللون
      pdf.setFillColor(color.rgb[0], color.rgb[1], color.rgb[2])
      pdf.rect(20, colorY - 5, 10, 10, "F")

      // كتابة الاسم والـ Hex
      pdf.setFontSize(10)
      pdf.setTextColor(0, 0, 0)
      pdf.text(`${color.name} (${color.hex})`, 35, colorY)

      colorY += 15
    })

    // الخطوط
    pdf.addPage()
    pdf.setFontSize(14)
    pdf.setTextColor(139, 0, 0)
    pdf.text(lang === "ar" ? "معايير الخطوط" : "Typography Standards", 15, 20)

    const typoInfo = [
      { label: lang === "ar" ? "العناوين الرئيسية" : "Main Headings", size: 32, weight: "Bold" },
      { label: lang === "ar" ? "العناوين الفرعية" : "Subheadings", size: 24, weight: "Semi-bold" },
      { label: lang === "ar" ? "نص الجسم" : "Body Text", size: 14, weight: "Regular" },
      { label: lang === "ar" ? "النصوص الصغيرة" : "Small Text", size: 12, weight: "Regular" },
    ]

    let typoY = 35
    typoInfo.forEach((typo) => {
      pdf.setFontSize(10)
      pdf.setTextColor(139, 0, 0)
      pdf.text(typo.label, 20, typoY)

      pdf.setFontSize(9)
      pdf.setTextColor(100, 100, 100)
      pdf.text(`Size: ${typo.size}px | Weight: ${typo.weight}`, 20, typoY + 5)

      typoY += 15
    })

    // معلومات الصفحات
    pages.forEach((page, index) => {
      pdf.addPage()

      pdf.setFontSize(16)
      pdf.setTextColor(139, 0, 0)
      const pageTitle = lang === "ar" ? page.ar : page.en
      pdf.text(pageTitle, 15, 20)

      pdf.setFontSize(11)
      pdf.setTextColor(0, 0, 0)

      // مساحة للصورة
      pdf.rect(15, 35, 180, 120)
      pdf.setFontSize(10)
      pdf.setTextColor(150, 150, 150)
      pdf.text(lang === "ar" ? "[صورة الصفحة]" : "[Page Screenshot]", 105, 100, { align: "center" })

      // الوصف
      pdf.setFontSize(10)
      pdf.setTextColor(0, 0, 0)

      const descriptions: { [key: string]: { ar: string; en: string } } = {
        "/": {
          ar: "الصفحة الرئيسية تعرض المطاعم المميزة، أقسام الطعام، والعروضات الترويجية",
          en: "Home page displays featured restaurants, food categories, and promotional offers",
        },
        "/restaurant/sample": {
          ar: "صفحة تفاصيل المطعم مع عرض القائمة الكاملة وتقييمات المطعم",
          en: "Restaurant details page with full menu and restaurant ratings",
        },
        "/cart": {
          ar: "سلة المشتريات لمراجعة الطلبات والتعديل عليها قبل الدفع",
          en: "Shopping cart to review and modify orders before checkout",
        },
        "/checkout": {
          ar: "صفحة الدفع متعددة الخطوات مع اختيار العنوان وطريقة الدفع",
          en: "Multi-step checkout with address and payment method selection",
        },
        "/orders/sample": {
          ar: "تتبع الطلب في الوقت الفعلي مع خريطة توصيل وحالة التسليم",
          en: "Real-time order tracking with delivery map and status",
        },
        "/search": {
          ar: "صفحة البحث المتقدم مع تصفية حسب النوع والتقييم وسعر التوصيل",
          en: "Advanced search with filtering by cuisine, rating, and delivery price",
        },
        "/favorites": {
          ar: "قائمة المطاعم المفضلة المحفوظة من قبل المستخدم",
          en: "List of user's favorite saved restaurants",
        },
        "/history": {
          ar: "سجل الطلبات السابقة مع التفاصيل والتقييمات",
          en: "Previous orders history with details and ratings",
        },
        "/profile": {
          ar: "صفحة الملف الشخصي للمستخدم مع إدارة العناوين والإعدادات",
          en: "User profile page with address management and settings",
        },
        "/auth/login": {
          ar: "صفحة تسجيل الدخول للمستخدمين الحاليين",
          en: "Login page for existing users",
        },
        "/auth/signup": {
          ar: "صفحة إنشاء حساب جديد مع التحقق من البيانات",
          en: "Sign up page for new users with data validation",
        },
      }

      const description = descriptions[page.route] || { ar: "", en: "" }
      const descText = lang === "ar" ? description.ar : description.en

      const lines = pdf.splitTextToSize(descText, 170)
      pdf.text(lines, 20, 165)
    })

    // الملخص النهائي
    pdf.addPage()
    pdf.setFontSize(16)
    pdf.setTextColor(139, 0, 0)
    pdf.text(lang === "ar" ? "ملخص الميزات" : "Features Summary", 15, 20)

    const features = [
      lang === "ar" ? "✓ واجهة رئيسية بسيطة وسهلة الاستخدام" : "✓ Simple and user-friendly home interface",
      lang === "ar"
        ? "✓ معرض صور عالي الجودة للمطاعم والأطعمة"
        : "✓ High-quality photo gallery for restaurants and food",
      lang === "ar"
        ? "✓ نظام سلة مشتريات ديناميكي مع حسابات فورية"
        : "✓ Dynamic shopping cart with real-time calculations",
      lang === "ar" ? "✓ عملية دفع آمنة وسهلة متعددة الخطوات" : "✓ Secure multi-step checkout process",
      lang === "ar"
        ? "✓ تتبع الطلب في الوقت الفعلي مع خريطة تفاعلية"
        : "✓ Real-time order tracking with interactive map",
      lang === "ar" ? "✓ نظام بحث متقدم وتصفية قوي" : "✓ Advanced search and powerful filtering",
      lang === "ar" ? "✓ إدارة المفضلة والملف الشخصي" : "✓ Favorites and profile management",
      lang === "ar" ? "✓ سجل الطلبات الكامل والتقييمات" : "✓ Complete order history and ratings",
      lang === "ar" ? "✓ دعم اللغة العربية والإنجليزية" : "✓ Full Arabic and English language support",
      lang === "ar" ? "✓ تصميم مستجيب يعمل على جميع الأجهزة" : "✓ Responsive design for all devices",
    ]

    let featureY = 35
    features.forEach((feature) => {
      pdf.setFontSize(10)
      pdf.setTextColor(0, 0, 0)
      const lines = pdf.splitTextToSize(feature, 160)
      pdf.text(lines, 20, featureY)
      featureY += lines.length * 5 + 5
    })

    // معلومات الاتصال
    pdf.addPage()
    pdf.setFontSize(14)
    pdf.setTextColor(139, 0, 0)
    pdf.text(lang === "ar" ? "معلومات الاتصال" : "Contact Information", 15, 20)

    pdf.setFontSize(11)
    pdf.setTextColor(0, 0, 0)

    const contactInfo = [
      { label: lang === "ar" ? "الاسم" : "Name", value: "el sawah - Premium Food Delivery" },
      { label: lang === "ar" ? "الإصدار" : "Version", value: "1.0.0" },
      {
        label: lang === "ar" ? "التاريخ" : "Date",
        value: new Date().toLocaleDateString(lang === "ar" ? "ar-AE" : "en-US"),
      },
      { label: lang === "ar" ? "التكنولوجيا" : "Technology", value: "Next.js 16, React 19.2, Tailwind CSS" },
      { label: lang === "ar" ? "قاعدة البيانات" : "Database", value: "Supabase PostgreSQL" },
    ]

    let contactY = 35
    contactInfo.forEach((info) => {
      pdf.setFontSize(10)
      pdf.setTextColor(139, 0, 0)
      pdf.text(`${info.label}:`, 20, contactY)

      pdf.setTextColor(0, 0, 0)
      pdf.text(info.value, 60, contactY)

      contactY += 12
    })

    // حفظ PDF
    const pdfBytes = pdf.output("arraybuffer")

    return new Response(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="el-sawah-design-guide-${lang}.pdf"`,
      },
    })
  } catch (error) {
    console.error("PDF generation error:", error)
    return new Response("Error generating PDF", { status: 500 })
  }
}
