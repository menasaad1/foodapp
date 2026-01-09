import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lang = searchParams.get("lang") || "ar"

  const content = {
    ar: {
      title: "el sawah",
      subtitle: "دليل التصميم الشامل",
      description: "تطبيق توصيل الطعام الفاخر الموجه لسكان دولة الإمارات العربية المتحدة",
      aboutTitle: "عن التطبيق",
      brandTitle: "هوية العلامة التجارية",
      featuresTitle: "المميزات الرئيسية",
      pagesTitle: "صفحات التطبيق",
      colors: [
        { name: "البرجندي", code: "#8B2E3D", desc: "اللون الأساسي - يعكس الفخامة والثقة" },
        { name: "الذهبي", code: "#D4A574", desc: "اللون الثانوي - يضيف فخامة وتفاصيل راقية" },
        { name: "أبيض", code: "#FFFFFF", desc: "الخلفيات الرئيسية والنظافة البصرية" },
      ],
      pages: [
        {
          num: "1",
          name: "تسجيل الدخول",
          desc: "واجهة آمنة وبسيطة لتسجيل الدخول",
          features: ["حقل البريد الإلكتروني", "حقل كلمة المرور", "زر دخول احترافي", "روابط مساعدة"],
        },
        {
          num: "2",
          name: "التسجيل",
          desc: "نموذج تسجيل متعدد الخطوات",
          features: ["إدخال المعلومات الأساسية", "التحقق الفوري من البيانات", "كلمة مرور آمنة", "تأكيد البيانات"],
        },
        {
          num: "3",
          name: "الصفحة الرئيسية",
          desc: "واجهة الاستقبال الرئيسية",
          features: ["عرض المطاعم المميزة", "عروضات وخصومات ترويجية", "فئات المأكولات", "شريط البحث السريع"],
        },
        {
          num: "4",
          name: "تفاصيل المطعم",
          desc: "صفحة المطعم كاملة مع القائمة والأسعار",
          features: ["صورة المطعم بحجم كبير", "التقييمات والآراء", "قائمة الأطباق كاملة", "إضافة للسلة مباشرة"],
        },
        {
          num: "5",
          name: "السلة",
          desc: "عرض العناصر المختارة مع حساب التكاليف",
          features: ["قائمة الأطباق المختارة", "تعديل الكميات", "حساب المجموع والرسوم", "زر الدفع الآمن"],
        },
        {
          num: "6",
          name: "الدفع والشراء",
          desc: "عملية الدفع الآمنة والموثوقة",
          features: ["اختيار عنوان التوصيل", "اختيار طريقة الدفع", "تأكيد الطلب النهائي", "رقم مرجع الطلب"],
        },
        {
          num: "7",
          name: "تتبع الطلب",
          desc: "تتبع فوري مع خريطة تفاعلية وحالة الطلب الحية",
          features: [
            "خريطة تفاعلية لموقع التوصيل",
            "حالة الطلب الحية والفورية",
            "بيانات السائق والدراجة",
            "وقت التوصيل المتوقع",
          ],
        },
        {
          num: "8",
          name: "البحث والتصفية",
          desc: "بحث متقدم مع خيارات تصفية مختلفة",
          features: [
            "البحث النصي المتقدم",
            "التصفية حسب نوع المأكولات",
            "الترتيب حسب التقييم والسعر",
            "نطاق الأسعار والوقت",
          ],
        },
        {
          num: "9",
          name: "المفضلة",
          desc: "حفظ ومشاهدة المطاعم والأطباق المفضلة",
          features: ["حفظ المطاعم المفضلة", "حذف من قائمة المفضلة", "ترتيب سريع من المفضلة", "دعوة الأصدقاء"],
        },
        {
          num: "10",
          name: "سجل الطلبات",
          desc: "عرض جميع الطلبات السابقة مع التفاصيل الكاملة",
          features: ["قائمة الطلبات زمنية", "تفاصيل شاملة لكل طلب", "إعادة نفس الطلب بسهولة", "التقييم والتعليقات"],
        },
        {
          num: "11",
          name: "الملف الشخصي",
          desc: "إدارة البيانات الشخصية والإعدادات",
          features: ["معلومات المستخدم الشخصية", "إدارة عناوين التوصيل", "التفضيلات والإشعارات", "الإعدادات والخصوصية"],
        },
        {
          num: "12",
          name: "شريط التنقل السفلي",
          desc: "قائمة التنقل الرئيسية بين صفحات التطبيق",
          features: ["زر الصفحة الرئيسية", "زر البحث والتصفية", "زر السلة مع العداد", "زر المفضلة", "زر الملف الشخصي"],
        },
      ],
      features: [
        { icon: "📱", text: "تصميم محمول أولاً - Responsive Design" },
        { icon: "🌐", text: "دعم كامل للعربية والإنجليزية" },
        { icon: "⚙️", text: "قاعدة بيانات حقيقية - Supabase" },
        { icon: "🔐", text: "مصادقة آمنة - Secure Authentication" },
        { icon: "🗺️", text: "تتبع الطلبات الحي - Real-time Tracking" },
        { icon: "💳", text: "الدفع الآمن - Secure Payments" },
        { icon: "⚡", text: "أداء عالي - High Performance" },
        { icon: "🎨", text: "تصميم احترافي فاخر" },
      ],
    },
    en: {
      title: "el sawah",
      subtitle: "Comprehensive Design Guide",
      description: "Premium food delivery app designed for UAE residents",
      aboutTitle: "About the App",
      brandTitle: "Brand Identity",
      featuresTitle: "Key Features",
      pagesTitle: "Application Pages",
      colors: [
        { name: "Burgundy", code: "#8B2E3D", desc: "Primary color - reflects luxury and trust" },
        { name: "Gold", code: "#D4A574", desc: "Secondary color - adds elegance and refinement" },
        { name: "White", code: "#FFFFFF", desc: "Backgrounds and visual cleanliness" },
      ],
      pages: [
        {
          num: "1",
          name: "Login Page",
          desc: "Secure and simple login interface",
          features: ["Email input field", "Password field", "Professional login button", "Help links"],
        },
        {
          num: "2",
          name: "Signup Page",
          desc: "Multi-step registration form",
          features: ["Basic information entry", "Real-time validation", "Secure password setup", "Data confirmation"],
        },
        {
          num: "3",
          name: "Home Page",
          desc: "Main landing interface with restaurants and offers",
          features: ["Featured restaurants display", "Promotional carousel", "Food categories", "Quick search bar"],
        },
        {
          num: "4",
          name: "Restaurant Details",
          desc: "Complete restaurant page with full menu and pricing",
          features: ["Large restaurant image", "Ratings and reviews", "Complete menu display", "Direct add to cart"],
        },
        {
          num: "5",
          name: "Shopping Cart",
          desc: "View selected items and calculate total cost",
          features: ["Selected items list", "Quantity adjustment", "Total calculation", "Secure checkout button"],
        },
        {
          num: "6",
          name: "Checkout",
          desc: "Safe and reliable payment process",
          features: ["Delivery address selection", "Payment method choice", "Order confirmation", "Reference number"],
        },
        {
          num: "7",
          name: "Order Tracking",
          desc: "Real-time tracking with interactive map and live status",
          features: ["Interactive delivery map", "Live order status", "Driver information", "Delivery estimate"],
        },
        {
          num: "8",
          name: "Search & Filter",
          desc: "Advanced search with various filtering options",
          features: [
            "Text search functionality",
            "Filter by cuisine type",
            "Sort by rating and price",
            "Price range filter",
          ],
        },
        {
          num: "9",
          name: "Favorites",
          desc: "Save and view favorite restaurants and dishes",
          features: ["Save favorite restaurants", "Remove from favorites", "Quick reorder", "Share with friends"],
        },
        {
          num: "10",
          name: "Order History",
          desc: "View all previous orders with complete details",
          features: ["Order timeline view", "Complete order details", "Reorder option", "Ratings and reviews"],
        },
        {
          num: "11",
          name: "Profile",
          desc: "Manage personal data and application settings",
          features: ["User information", "Delivery addresses", "Preferences", "Privacy settings"],
        },
        {
          num: "12",
          name: "Bottom Navigation",
          desc: "Main navigation menu between app pages",
          features: ["Home button", "Search button", "Cart with counter", "Favorites button", "Profile button"],
        },
      ],
      features: [
        { icon: "📱", text: "Mobile-first Responsive Design" },
        { icon: "🌐", text: "Full Arabic & English Support" },
        { icon: "⚙️", text: "Real-time Database - Supabase" },
        { icon: "🔐", text: "Secure Authentication" },
        { icon: "🗺️", text: "Real-time Order Tracking" },
        { icon: "💳", text: "Secure Payments" },
        { icon: "⚡", text: "High Performance" },
        { icon: "🎨", text: "Professional Luxury Design" },
      ],
    },
  }

  const data = content[lang as keyof typeof content] || content.ar

  // Generate comprehensive PDF content as HTML
  const htmlContent = `
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
            background: white;
        }
        
        @page {
            size: A4;
            margin: 20mm;
        }
        
        .page-break {
            page-break-after: always;
        }
        
        .cover {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #8B2E3D 0%, #6B1F2D 50%, #D4A574 100%);
            color: white;
            text-align: center;
            padding: 40px;
        }
        
        .cover-logo {
            width: 220px;
            height: 220px;
            margin-bottom: 50px;
            border-radius: 25px;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 30px 80px rgba(0,0,0,0.4);
        }
        
        .cover-logo img {
            width: 200px;
            height: 200px;
            object-fit: contain;
            border-radius: 20px;
        }
        
        .cover h1 {
            font-size: 56px;
            margin-bottom: 20px;
            font-weight: bold;
            letter-spacing: 2px;
        }
        
        .cover h2 {
            font-size: 28px;
            opacity: 0.95;
            margin-bottom: 40px;
            font-weight: 300;
        }
        
        .cover p {
            font-size: 18px;
            opacity: 0.9;
            margin-top: 20px;
            max-width: 600px;
            line-height: 1.8;
        }
        
        .cover .year {
            margin-top: 50px;
            font-size: 16px;
            opacity: 0.8;
        }
        
        .section {
            margin-bottom: 40px;
        }
        
        .section-title {
            color: #8B2E3D;
            font-size: 32px;
            margin-bottom: 30px;
            border-bottom: 4px solid #D4A574;
            padding-bottom: 15px;
            font-weight: bold;
        }
        
        .about-text {
            background: #f9f9f9;
            padding: 30px;
            border-left: 6px solid #D4A574;
            border-radius: 8px;
            font-size: 16px;
            line-height: 1.8;
            color: #555;
        }
        
        .colors-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 25px;
            margin-bottom: 40px;
        }
        
        .color-card {
            border: 1px solid #ddd;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        
        .color-sample {
            height: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 16px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .color-info {
            padding: 20px;
            background: white;
        }
        
        .color-info h3 {
            color: #8B2E3D;
            margin-bottom: 10px;
            font-size: 18px;
            font-weight: bold;
        }
        
        .color-info p {
            color: #666;
            font-size: 13px;
            line-height: 1.6;
        }
        
        .pages-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 40px;
        }
        
        .page-card {
            background: white;
            border: 2px solid #D4A574;
            border-radius: 12px;
            overflow: hidden;
            page-break-inside: avoid;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        
        .page-header {
            background: linear-gradient(135deg, #8B2E3D, #A83D52);
            color: white;
            padding: 25px;
        }
        
        .page-number {
            display: inline-block;
            background: #D4A574;
            color: #8B2E3D;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 15px;
        }
        
        .page-name {
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 8px;
        }
        
        .page-desc {
            font-size: 13px;
            opacity: 0.9;
        }
        
        .page-content {
            padding: 25px;
        }
        
        .page-features {
            list-style: none;
        }
        
        .page-features li {
            padding: 10px 0;
            padding-left: 25px;
            position: relative;
            color: #555;
            font-size: 13px;
            line-height: 1.6;
        }
        
        .page-features li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #D4A574;
            font-weight: bold;
            font-size: 16px;
        }
        
        .features-section {
            margin-bottom: 40px;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }
        
        .feature-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 20px;
            background: #f9f9f9;
            border-radius: 8px;
            border-left: 4px solid #D4A574;
        }
        
        .feature-icon {
            font-size: 32px;
            flex-shrink: 0;
        }
        
        .feature-text {
            color: #555;
            font-size: 14px;
            line-height: 1.6;
        }
        
        .toc {
            background: #f9f9f9;
            padding: 40px;
            border-radius: 8px;
            margin-bottom: 40px;
        }
        
        .toc-title {
            color: #8B2E3D;
            font-size: 24px;
            margin-bottom: 25px;
            font-weight: bold;
        }
        
        .toc-list {
            list-style: none;
            columns: 2;
            column-gap: 40px;
        }
        
        .toc-list li {
            margin-bottom: 12px;
            padding-left: 0;
            color: #555;
            font-size: 14px;
            line-height: 1.6;
        }
        
        .toc-list li:before {
            content: "▸ ";
            color: #D4A574;
            font-weight: bold;
            margin-right: 8px;
        }
        
        footer {
            text-align: center;
            color: #999;
            font-size: 12px;
            margin-top: 50px;
            padding-top: 25px;
            border-top: 2px solid #D4A574;
        }
        
        @media print {
            body {
                background: white;
            }
        }
    </style>
</head>
<body>
    <!-- Cover Page -->
    <div class="cover">
        <div class="cover-logo">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='95' fill='%238B2E3D'/%3E%3Ctext x='50%25' y='50%25' font-size='80' font-weight='bold' fill='%23D4A574' text-anchor='middle' dominant-baseline='middle' font-family='Arial'%3Ees%3C/text%3E%3C/svg%3E" alt="el sawah">
        </div>
        <h1>${data.title}</h1>
        <h2>${data.subtitle}</h2>
        <p>${data.description}</p>
        <div class="year">© 2026 - ${lang === "ar" ? "جميع الحقوق محفوظة" : "All Rights Reserved"}</div>
    </div>
    
    <div class="page-break"></div>
    
    <!-- Table of Contents -->
    <div class="toc">
        <div class="toc-title">${lang === "ar" ? "جدول المحتويات" : "Table of Contents"}</div>
        <ul class="toc-list">
            <li>${lang === "ar" ? "معلومات عن التطبيق" : "About the Application"}</li>
            <li>${lang === "ar" ? "هوية العلامة التجارية والألوان" : "Brand Identity & Colors"}</li>
            ${data.pages.map((page, i) => `<li>${page.num}. ${page.name}</li>`).join("")}
            <li>${data.pages.length + 1}. ${lang === "ar" ? "المميزات الرئيسية" : "Key Features"}</li>
        </ul>
    </div>
    
    <div class="page-break"></div>
    
    <!-- About Section -->
    <div class="section">
        <h2 class="section-title">${data.aboutTitle}</h2>
        <div class="about-text">
            ${data.description}
            <br><br>
            ${
              lang === "ar"
                ? "يجمع التطبيق بين الوظائف المتقدمة مع الجماليات الثقافية المحلية، موفراً تجربة استخدام سلسة وآمنة للعملاء في دولة الإمارات العربية المتحدة."
                : "The app combines advanced functionality with local cultural aesthetics, providing a seamless and secure experience for customers in the United Arab Emirates."
            }
        </div>
    </div>
    
    <div class="page-break"></div>
    
    <!-- Brand Section -->
    <div class="section">
        <h2 class="section-title">${data.brandTitle}</h2>
        <div class="colors-grid">
            ${data.colors
              .map(
                (color) => `
                <div class="color-card">
                    <div class="color-sample" style="background-color: ${color.code}">
                        ${color.code}
                    </div>
                    <div class="color-info">
                        <h3>${color.name}</h3>
                        <p>${color.desc}</p>
                    </div>
                </div>
            `,
              )
              .join("")}
        </div>
    </div>
    
    <div class="page-break"></div>
    
    <!-- Pages Section -->
    <div class="section">
        <h2 class="section-title">${data.pagesTitle}</h2>
        <div class="pages-grid">
            ${data.pages
              .map(
                (page) => `
                <div class="page-card">
                    <div class="page-header">
                        <div class="page-number">${page.num}</div>
                        <div class="page-name">${page.name}</div>
                        <div class="page-desc">${page.desc}</div>
                    </div>
                    <div class="page-content">
                        <ul class="page-features">
                            ${page.features.map((feature) => `<li>${feature}</li>`).join("")}
                        </ul>
                    </div>
                </div>
            `,
              )
              .join("")}
        </div>
    </div>
    
    <div class="page-break"></div>
    
    <!-- Features Section -->
    <div class="features-section">
        <h2 class="section-title">${data.featuresTitle}</h2>
        <div class="features-grid">
            ${data.features
              .map(
                (feature) => `
                <div class="feature-item">
                    <div class="feature-icon">${feature.icon}</div>
                    <div class="feature-text">${feature.text}</div>
                </div>
            `,
              )
              .join("")}
        </div>
    </div>
    
    <footer>
        <p>${data.title} - ${data.subtitle}</p>
        <p>${lang === "ar" ? "© 2026 - جميع الحقوق محفوظة" : "© 2026 - All Rights Reserved"}</p>
    </footer>
</body>
</html>
  `

  return new NextResponse(htmlContent, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `inline; filename="El-Sawah-Design-Guide-${lang}.html"`,
    },
  })
}
