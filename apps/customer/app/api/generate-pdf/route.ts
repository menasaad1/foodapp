import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang") || "ar"

  const content = {
    ar: {
      title: "el sawah",
      subtitle: "دليل التصميم الشامل",
      pages: [
        {
          number: "1",
          name: "تسجيل الدخول",
          desc: "واجهة آمنة وبسيطة لتسجيل الدخول",
          features: ["حقل البريد الإلكتروني", "كلمة المرور", "زر دخول احترافي", "خيارات مساعدة"],
          url: "/auth/login",
          color: "#8B2E3D",
        },
        {
          number: "2",
          name: "التسجيل",
          desc: "نموذج التسجيل متعدد الخطوات",
          features: ["إدخال المعلومات", "التحقق الفوري", "كلمة المرور الآمنة", "تأكيد البيانات"],
          url: "/auth/signup",
          color: "#A83D52",
        },
        {
          number: "3",
          name: "الصفحة الرئيسية",
          desc: "واجهة الاستقبال الرئيسية مع المطاعم والعروضات",
          features: ["عرض المطاعم", "العروضات الترويجية", "فئات المأكولات", "البحث السريع"],
          url: "/",
          color: "#8B2E3D",
        },
        {
          number: "4",
          name: "تفاصيل المطعم",
          desc: "صفحة المطعم كاملة مع القائمة والأسعار",
          features: ["صورة المطعم", "التقييمات والآراء", "قائمة الأطباق", "إضافة للسلة"],
          url: "/restaurant/demo",
          color: "#D4A574",
        },
        {
          number: "5",
          name: "السلة",
          desc: "عرض العناصر المختارة مع حساب التكاليف",
          features: ["قائمة الأطباق", "تعديل الكميات", "إجمالي السعر", "زر الدفع"],
          url: "/cart",
          color: "#8B2E3D",
        },
        {
          number: "6",
          name: "الدفع والشراء",
          desc: "عملية الدفع الآمنة والموثوقة",
          features: ["اختيار العنوان", "طريقة الدفع", "تأكيد الطلب", "رقم المرجع"],
          url: "/checkout",
          color: "#A83D52",
        },
        {
          number: "7",
          name: "تتبع الطلب",
          desc: "تتبع فوري مع خريطة تفاعلية وحالة الطلب الحية",
          features: ["الخريطة التفاعلية", "حالة الطلب الحي", "بيانات السائق", "وقت التوصيل المتوقع"],
          url: "/orders/demo",
          color: "#D4A574",
        },
        {
          number: "8",
          name: "البحث والتصفية",
          desc: "بحث متقدم مع خيارات تصفية مختلفة",
          features: ["البحث النصي", "التصفية حسب النوع", "الترتيب حسب التقييم", "نطاق الأسعار"],
          url: "/search",
          color: "#8B2E3D",
        },
        {
          number: "9",
          name: "المفضلة",
          desc: "حفظ ومشاهدة المطاعم والأطباق المفضلة",
          features: ["حفظ المطاعم", "حذف من المفضلة", "ترتيب سريع", "دعوة الأصدقاء"],
          url: "/favorites",
          color: "#A83D52",
        },
        {
          number: "10",
          name: "سجل الطلبات",
          desc: "عرض جميع الطلبات السابقة مع التفاصيل",
          features: ["قائمة الطلبات", "تفاصيل كاملة", "إعادة الطلب", "التقييم والتعليقات"],
          url: "/history",
          color: "#D4A574",
        },
        {
          number: "11",
          name: "الملف الشخصي",
          desc: "إدارة البيانات الشخصية والإعدادات",
          features: ["معلومات المستخدم", "عناوين التوصيل", "التفضيلات", "الإعدادات والخصوصية"],
          url: "/profile",
          color: "#8B2E3D",
        },
        {
          number: "12",
          name: "شريط التنقل السفلي",
          desc: "قائمة التنقل الرئيسية بين الصفحات",
          features: ["زر الرئيسية", "البحث", "السلة", "المفضلة", "الملف الشخصي"],
          url: "/",
          color: "#A83D52",
        },
      ],
    },
    en: {
      title: "el sawah",
      subtitle: "Comprehensive Design Guide",
      pages: [
        {
          number: "1",
          name: "Login Page",
          desc: "Secure and simple login interface",
          features: ["Email field", "Password field", "Professional button", "Help options"],
          url: "/auth/login",
          color: "#8B2E3D",
        },
        {
          number: "2",
          name: "Signup Page",
          desc: "Multi-step registration form",
          features: ["Information input", "Real-time validation", "Secure password", "Data confirmation"],
          url: "/auth/signup",
          color: "#A83D52",
        },
        {
          number: "3",
          name: "Home Page",
          desc: "Main landing with restaurants and offers",
          features: ["Restaurant showcase", "Promotional carousel", "Food categories", "Quick search"],
          url: "/",
          color: "#8B2E3D",
        },
        {
          number: "4",
          name: "Restaurant Details",
          desc: "Complete restaurant page with menu and pricing",
          features: ["Restaurant image", "Reviews & ratings", "Full menu", "Add to cart"],
          url: "/restaurant/demo",
          color: "#D4A574",
        },
        {
          number: "5",
          name: "Shopping Cart",
          desc: "View selected items and calculate total cost",
          features: ["Item list", "Quantity controls", "Total price", "Checkout button"],
          url: "/cart",
          color: "#8B2E3D",
        },
        {
          number: "6",
          name: "Checkout",
          desc: "Safe and reliable payment process",
          features: ["Address selection", "Payment method", "Order confirmation", "Reference number"],
          url: "/checkout",
          color: "#A83D52",
        },
        {
          number: "7",
          name: "Order Tracking",
          desc: "Real-time tracking with interactive map and live status",
          features: ["Interactive map", "Live order status", "Driver info", "Delivery estimate"],
          url: "/orders/demo",
          color: "#D4A574",
        },
        {
          number: "8",
          name: "Search & Filter",
          desc: "Advanced search with various filtering options",
          features: ["Text search", "Filter by cuisine", "Sort by rating", "Price range"],
          url: "/search",
          color: "#8B2E3D",
        },
        {
          number: "9",
          name: "Favorites",
          desc: "Save and view favorite restaurants and dishes",
          features: ["Save restaurants", "Remove from favorites", "Quick reorder", "Share with friends"],
          url: "/favorites",
          color: "#A83D52",
        },
        {
          number: "10",
          name: "Order History",
          desc: "View all previous orders with details",
          features: ["Order list", "Full details", "Reorder option", "Ratings & reviews"],
          url: "/history",
          color: "#D4A574",
        },
        {
          number: "11",
          name: "Profile",
          desc: "Manage personal data and settings",
          features: ["User info", "Delivery addresses", "Preferences", "Privacy settings"],
          url: "/profile",
          color: "#8B2E3D",
        },
        {
          number: "12",
          name: "Bottom Navigation",
          desc: "Main navigation menu between pages",
          features: ["Home button", "Search", "Cart", "Favorites", "Profile"],
          url: "/",
          color: "#A83D52",
        },
      ],
    },
  }

  const data = content[lang as keyof typeof content] || content.ar

  // Generate HTML that can be printed to PDF
  const html = `
<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title} - ${data.subtitle}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html {
            direction: ${lang === "ar" ? "rtl" : "ltr"};
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
        }
        
        @page {
            size: A4;
            margin: 20mm;
        }
        
        .cover {
            page-break-after: always;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #8B2E3D 0%, #D4A574 100%);
            color: white;
            text-align: center;
            padding: 40px;
        }
        
        .cover-logo {
            width: 200px;
            height: 200px;
            margin-bottom: 40px;
            border-radius: 20px;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        
        .cover-logo img {
            width: 180px;
            height: 180px;
            object-fit: contain;
        }
        
        .cover h1 {
            font-size: 48px;
            margin-bottom: 20px;
            font-weight: bold;
        }
        
        .cover h2 {
            font-size: 24px;
            opacity: 0.9;
            margin-bottom: 30px;
        }
        
        .cover p {
            font-size: 16px;
            opacity: 0.8;
            margin-top: 20px;
        }
        
        .toc {
            page-break-after: always;
            padding: 40px;
        }
        
        .toc h1 {
            color: #8B2E3D;
            margin-bottom: 40px;
            font-size: 32px;
            border-bottom: 3px solid #D4A574;
            padding-bottom: 15px;
        }
        
        .toc-list {
            list-style: none;
        }
        
        .toc-list li {
            margin: 15px 0;
            font-size: 16px;
            color: #333;
            border-left: 4px solid #D4A574;
            padding-left: 15px;
        }
        
        .page {
            page-break-before: always;
            padding: 40px;
            background: white;
            margin-bottom: 20px;
        }
        
        .page-header {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 30px;
            border-bottom: 3px solid #D4A574;
            padding-bottom: 20px;
        }
        
        .page-number {
            background: #8B2E3D;
            color: white;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            flex-shrink: 0;
        }
        
        .page-title {
            flex: 1;
        }
        
        .page-title h2 {
            color: #8B2E3D;
            font-size: 28px;
            margin-bottom: 8px;
        }
        
        .page-title p {
            color: #666;
            font-size: 14px;
        }
        
        .page-content {
            margin-top: 30px;
        }
        
        .screenshot-placeholder {
            background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
            width: 100%;
            height: 300px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            border: 2px dashed #D4A574;
            color: #8B2E3D;
            font-size: 18px;
            font-weight: bold;
        }
        
        .features {
            margin-top: 20px;
        }
        
        .features h3 {
            color: #8B2E3D;
            font-size: 16px;
            margin-bottom: 12px;
            margin-top: 15px;
        }
        
        .features ul {
            list-style: none;
            padding-left: 0;
        }
        
        .features li {
            padding: 8px 0;
            padding-left: 24px;
            position: relative;
            color: #333;
            font-size: 14px;
        }
        
        .features li:before {
            content: "▸";
            position: absolute;
            left: 0;
            color: #D4A574;
            font-weight: bold;
            font-size: 18px;
        }
        
        .brand-section {
            page-break-before: always;
            padding: 40px;
        }
        
        .brand-section h1 {
            color: #8B2E3D;
            margin-bottom: 30px;
            font-size: 32px;
            border-bottom: 3px solid #D4A574;
            padding-bottom: 15px;
        }
        
        .colors-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
            margin-top: 20px;
        }
        
        .color-box {
            border: 1px solid #ddd;
            border-radius: 12px;
            overflow: hidden;
        }
        
        .color-sample {
            height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 14px;
        }
        
        .color-info {
            padding: 15px;
            background: #f9f9f9;
        }
        
        .color-info h3 {
            color: #8B2E3D;
            margin-bottom: 8px;
            font-size: 16px;
        }
        
        .color-info p {
            color: #666;
            font-size: 12px;
            line-height: 1.4;
        }
        
        footer {
            text-align: center;
            color: #999;
            font-size: 12px;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
        }
        
        @media print {
            body {
                background: white;
            }
            .page {
                margin-bottom: 0;
            }
        }
    </style>
</head>
<body>
    <!-- Cover Page -->
    <div class="cover">
        <div class="cover-logo">
            <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwwUBAwMBwkMBwMEBwMDBwcEBwcGBwcHBwcGBwcICAgICAgICAgICAgICAgI/2wBDAQICAgICAwUDAwwUGBcYFBgUGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYI/2wAEwAH/xAAUAQEAAAAAAAAAAAAAAAAAAAAL/xAAUAQEAAAAAAAAAAAAAAAAAAAAL/xAAUAQEAAAAAAAAAAAAAAAAAAAAL/xAAUAQEAAAAAAAAAAAAAAAAAAAAL/9oADAMBAAIRAxEAPwCwAA//2Q==" alt="el sawah">
        </div>
        <h1>${data.title}</h1>
        <h2>${data.subtitle}</h2>
        <p>Premium Food Delivery App Design Guide | دليل التصميم الشامل</p>
    </div>
    
    <!-- Table of Contents -->
    <div class="toc">
        <h1>${lang === "ar" ? "جدول المحتويات" : "Table of Contents"}</h1>
        <ul class="toc-list">
            ${data.pages.map((page) => `<li>${page.number}. ${page.name}</li>`).join("")}
            <li>${data.pages.length + 1}. ${lang === "ar" ? "هوية الألوان والتصميم" : "Brand Identity & Colors"}</li>
        </ul>
    </div>
    
    <!-- Brand Section -->
    <div class="brand-section">
        <h1>${lang === "ar" ? "هوية العلامة التجارية" : "Brand Identity"}</h1>
        <div class="colors-grid">
            <div class="color-box">
                <div class="color-sample" style="background: #8B2E3D">
                    #8B2E3D
                </div>
                <div class="color-info">
                    <h3>${lang === "ar" ? "البرجندي" : "Burgundy"}</h3>
                    <p>${lang === "ar" ? "اللون الأساسي - يعكس الفخامة والثقة" : "Primary color - reflects luxury and trust"}</p>
                </div>
            </div>
            <div class="color-box">
                <div class="color-sample" style="background: #D4A574">
                    #D4A574
                </div>
                <div class="color-info">
                    <h3>${lang === "ar" ? "الذهبي" : "Gold"}</h3>
                    <p>${lang === "ar" ? "اللون الثانوي - يضيف فخامة وتفاصيل" : "Secondary color - adds elegance"}</p>
                </div>
            </div>
            <div class="color-box">
                <div class="color-sample" style="background: #FFFFFF; color: #8B2E3D; border: 1px solid #D4A574;">
                    #FFFFFF
                </div>
                <div class="color-info">
                    <h3>${lang === "ar" ? "أبيض" : "White"}</h3>
                    <p>${lang === "ar" ? "الخلفيات والنظافة" : "Backgrounds and cleanliness"}</p>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Page Details -->
    ${data.pages
      .map(
        (page) => `
    <div class="page">
        <div class="page-header">
            <div class="page-number">${page.number}</div>
            <div class="page-title">
                <h2>${page.name}</h2>
                <p>${page.desc}</p>
            </div>
        </div>
        
        <div class="page-content">
            <div class="screenshot-placeholder">
                📱 ${lang === "ar" ? "صورة الصفحة" : "Screenshot"}
            </div>
            
            <div class="features">
                <h3>${lang === "ar" ? "المميزات:" : "Features:"}</h3>
                <ul>
                    ${page.features.map((feature) => `<li>${feature}</li>`).join("")}
                </ul>
            </div>
        </div>
        
        <footer>
            ${lang === "ar" ? "جميع الحقوق محفوظة لـ el sawah © 2026" : "© 2026 el sawah - All Rights Reserved"}
        </footer>
    </div>
    `,
      )
      .join("")}
</body>
</html>
  `

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `attachment; filename="El-Sawah-Design-Guide-${lang}.html"`,
    },
  })
}
