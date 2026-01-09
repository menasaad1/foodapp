import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lang = searchParams.get("lang") || "en"

  const isArabic = lang === "ar"

  const html = `
    <!DOCTYPE html>
    <html lang="${isArabic ? "ar" : "en"}" dir="${isArabic ? "rtl" : "ltr"}">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${isArabic ? "دليل تصميم السوق" : "El Sawah Design Guide"}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        @page {
          size: A4;
          margin: 20mm;
          @bottom-center {
            content: "Page " counter(page) " of " counter(pages);
            font-size: 10px;
          }
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background: #f5f5f5;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          padding: 40px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        .cover-page {
          text-align: center;
          padding: 60px 20px;
          background: linear-gradient(135deg, #8B2E3D 0%, #D4A574 100%);
          color: white;
          page-break-after: always;
        }

        .logo-section {
          margin: 40px 0;
        }

        .logo-section img {
          width: 150px;
          height: 150px;
          margin: 20px auto;
          display: block;
        }

        h1 {
          font-size: 48px;
          margin: 20px 0;
          font-weight: 700;
        }

        .subtitle {
          font-size: 18px;
          opacity: 0.9;
          margin: 20px 0;
        }

        .version {
          margin-top: 60px;
          font-size: 14px;
          opacity: 0.8;
        }

        .page-break {
          page-break-after: always;
          padding: 40px 0;
        }

        .section {
          margin: 30px 0;
          padding: 20px;
          border-left: 4px solid #8B2E3D;
          background: #f9f9f9;
        }

        .section h2 {
          font-size: 32px;
          color: #8B2E3D;
          margin-bottom: 15px;
        }

        .section h3 {
          font-size: 22px;
          color: #333;
          margin: 20px 0 10px 0;
        }

        .section p {
          font-size: 14px;
          color: #555;
          margin: 10px 0;
        }

        .colors-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin: 20px 0;
        }

        .color-box {
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          color: white;
          font-weight: 600;
        }

        .color-primary {
          background: #8B2E3D;
        }

        .color-secondary {
          background: #D4A574;
        }

        .color-accent {
          background: #F0A530;
        }

        .color-neutral {
          background: #F5F5F5;
          color: #333;
          border: 1px solid #ddd;
        }

        .features-list {
          list-style: none;
          margin: 15px 0;
        }

        .features-list li {
          padding: 10px 0;
          padding-left: 30px;
          position: relative;
        }

        .features-list li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #8B2E3D;
          font-weight: bold;
          font-size: 18px;
        }

        .page-example {
          background: #f9f9f9;
          border: 2px dashed #D4A574;
          padding: 20px;
          margin: 20px 0;
          border-radius: 8px;
        }

        .page-example h4 {
          color: #8B2E3D;
          margin-bottom: 10px;
        }

        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin: 20px 0;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }

        table th,
        table td {
          padding: 12px;
          text-align: ${isArabic ? "right" : "left"};
          border-bottom: 1px solid #ddd;
        }

        table th {
          background: #8B2E3D;
          color: white;
          font-weight: 600;
        }

        table tr:hover {
          background: #f9f9f9;
        }

        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #ddd;
          color: #999;
          font-size: 12px;
        }

        @media print {
          body {
            background: white;
          }
          .container {
            box-shadow: none;
            max-width: 100%;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Cover Page -->
        <div class="cover-page">
          <div class="logo-section">
            <img src="/icon.jpg" alt="El Sawah Logo" />
          </div>
          <h1>${isArabic ? "دليل التصميم" : "Design Guide"}</h1>
          <p class="subtitle">${isArabic ? "تطبيق توصيل الطعام الراقي" : "Premium Food Delivery App"}</p>
          <p class="subtitle">El Sawah</p>
          <div class="version">
            <p>${isArabic ? "الإصدار: 1.0" : "Version: 1.0"}</p>
            <p>${isArabic ? "التاريخ: 2025" : "Date: 2025"}</p>
          </div>
        </div>

        <!-- Table of Contents -->
        <div class="page-break">
          <h2>${isArabic ? "محتويات الدليل" : "Table of Contents"}</h2>
          <ul class="features-list">
            <li>${isArabic ? "نظام الألوان" : "Color System"}</li>
            <li>${isArabic ? "الخطوط والطباعة" : "Typography"}</li>
            <li>${isArabic ? "الصفحات والميزات" : "Pages & Features"}</li>
            <li>${isArabic ? "معايير التصميم" : "Design Standards"}</li>
          </ul>
        </div>

        <!-- Color System -->
        <div class="page-break">
          <div class="section">
            <h2>${isArabic ? "نظام الألوان" : "Color System"}</h2>
            <p>${isArabic ? "يستخدم التطبيق ألوان فاخرة تعكس الهوية الإماراتية" : "The app uses premium colors reflecting UAE identity"}</p>
            
            <div class="colors-grid">
              <div class="color-box color-primary">
                <p>${isArabic ? "الأساسي" : "Primary"}</p>
                <p>#8B2E3D</p>
                <p>${isArabic ? "بورغندي" : "Burgundy"}</p>
              </div>
              <div class="color-box color-secondary">
                <p>${isArabic ? "ثانوي" : "Secondary"}</p>
                <p>#D4A574</p>
                <p>${isArabic ? "ذهبي" : "Gold"}</p>
              </div>
              <div class="color-box color-accent">
                <p>${isArabic ? "لون مميز" : "Accent"}</p>
                <p>#F0A530</p>
                <p>${isArabic ? "برتقالي" : "Orange"}</p>
              </div>
              <div class="color-box color-neutral">
                <p>${isArabic ? "محايد" : "Neutral"}</p>
                <p>#F5F5F5</p>
                <p>${isArabic ? "رمادي فاتح" : "Light Gray"}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Pages Overview -->
        <div class="page-break">
          <div class="section">
            <h2>${isArabic ? "الصفحات والميزات" : "Pages & Features"}</h2>
            
            <div class="page-example">
              <h4>1. ${isArabic ? "الصفحة الرئيسية - Home" : "Home Page"}</h4>
              <p>${isArabic ? "تعرض المطاعم المميزة والفئات والعروض الترويجية" : "Displays featured restaurants, categories, and promotions"}</p>
              <ul class="features-list">
                <li>${isArabic ? "شريط البحث العلوي" : "Top search bar"}</li>
                <li>${isArabic ? "كاروسيل العروض" : "Promo carousel"}</li>
                <li>${isArabic ? "فئات الطعام" : "Food categories"}</li>
                <li>${isArabic ? "المطاعم المميزة" : "Featured restaurants"}</li>
              </ul>
            </div>

            <div class="page-example">
              <h4>2. ${isArabic ? "صفحة تفاصيل المطعم - Restaurant" : "Restaurant Page"}</h4>
              <p>${isArabic ? "عرض القائمة والمنتجات مع إمكانية الإضافة للسلة" : "Display menu items with add to cart functionality"}</p>
              <ul class="features-list">
                <li>${isArabic ? "صورة المطعم والمعلومات" : "Restaurant image & info"}</li>
                <li>${isArabic ? "قائمة المنتجات" : "Menu items"}</li>
                <li>${isArabic ? "تصنيفات الطعام" : "Food categories"}</li>
                <li>${isArabic ? "تقييمات المطعم" : "Restaurant ratings"}</li>
              </ul>
            </div>

            <div class="page-example">
              <h4>3. ${isArabic ? "سلة المشتريات - Cart" : "Cart Page"}</h4>
              <p>${isArabic ? "عرض المنتجات المختارة مع خيارات التعديل والشراء" : "Show selected items with edit and checkout options"}</p>
              <ul class="features-list">
                <li>${isArabic ? "قائمة المنتجات" : "Items list"}</li>
                <li>${isArabic ? "حساب الإجمالي والرسوم" : "Total & fees calculation"}</li>
                <li>${isArabic ? "زر الدفع" : "Checkout button"}</li>
              </ul>
            </div>

            <div class="page-example">
              <h4>4. ${isArabic ? "صفحة الدفع - Checkout" : "Checkout Page"}</h4>
              <p>${isArabic ? "عملية الدفع متعددة المراحل" : "Multi-step checkout process"}</p>
              <ul class="features-list">
                <li>${isArabic ? "اختيار العنوان" : "Address selection"}</li>
                <li>${isArabic ? "اختيار طريقة الدفع" : "Payment method"}</li>
                <li>${isArabic ? "مراجعة الطلب" : "Order review"}</li>
                <li>${isArabic ? "تأكيد الشراء" : "Confirm purchase"}</li>
              </ul>
            </div>

            <div class="page-example">
              <h4>5. ${isArabic ? "تتبع الطلب - Order Tracking" : "Order Tracking"}</h4>
              <p>${isArabic ? "تتبع الطلب بالوقت الفعلي مع الخريطة" : "Real-time order tracking with interactive map"}</p>
              <ul class="features-list">
                <li>${isArabic ? "حالة الطلب" : "Order status"}</li>
                <li>${isArabic ? "خريطة التوصيل" : "Delivery map"}</li>
                <li>${isArabic ? "معلومات السائق" : "Driver info"}</li>
                <li>${isArabic ? "الوقت المتبقي" : "ETA"}</li>
              </ul>
            </div>

            <div class="page-example">
              <h4>6. ${isArabic ? "البحث والتصفية - Search" : "Search & Filter"}</h4>
              <p>${isArabic ? "البحث المتقدم والتصفية حسب المعايير" : "Advanced search and filtering options"}</p>
              <ul class="features-list">
                <li>${isArabic ? "البحث بالاسم" : "Search by name"}</li>
                <li>${isArabic ? "التصفية حسب النوع" : "Filter by type"}</li>
                <li>${isArabic ? "التصفية حسب التقييم" : "Filter by rating"}</li>
                <li>${isArabic ? "التصفية حسب وقت التوصيل" : "Filter by delivery time"}</li>
              </ul>
            </div>

            <div class="page-example">
              <h4>7. ${isArabic ? "المفضلة - Favorites" : "Favorites"}</h4>
              <p>${isArabic ? "حفظ المطاعم المفضلة للوصول السريع" : "Save favorite restaurants for quick access"}</p>
              <ul class="features-list">
                <li>${isArabic ? "إضافة للمفضلة" : "Add to favorites"}</li>
                <li>${isArabic ? "إزالة من المفضلة" : "Remove from favorites"}</li>
                <li>${isArabic ? "عرض سريع" : "Quick view"}</li>
              </ul>
            </div>

            <div class="page-example">
              <h4>8. ${isArabic ? "سجل الطلبات - History" : "Order History"}</h4>
              <p>${isArabic ? "عرض جميع الطلبات السابقة" : "View all previous orders"}</p>
              <ul class="features-list">
                <li>${isArabic ? "قائمة الطلبات" : "Orders list"}</li>
                <li>${isArabic ? "التاريخ والوقت" : "Date & time"}</li>
                <li>${isArabic ? "إعادة الطلب" : "Reorder option"}</li>
                <li>${isArabic ? "التقييم" : "Rating"}</li>
              </ul>
            </div>

            <div class="page-example">
              <h4>9. ${isArabic ? "الملف الشخصي - Profile" : "Profile"}</h4>
              <p>${isArabic ? "إدارة بيانات المستخدم والعناوين" : "Manage user data and delivery addresses"}</p>
              <ul class="features-list">
                <li>${isArabic ? "بيانات المستخدم" : "User info"}</li>
                <li>${isArabic ? "العناوين المحفوظة" : "Saved addresses"}</li>
                <li>${isArabic ? "طرق الدفع" : "Payment methods"}</li>
                <li>${isArabic ? "الإعدادات" : "Settings"}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Design Standards -->
        <div class="page-break">
          <div class="section">
            <h2>${isArabic ? "معايير التصميم" : "Design Standards"}</h2>
            
            <h3>${isArabic ? "الخطوط والأحجام" : "Typography Sizes"}</h3>
            <table>
              <thead>
                <tr>
                  <th>${isArabic ? "الاستخدام" : "Usage"}</th>
                  <th>${isArabic ? "الحجم" : "Size"}</th>
                  <th>${isArabic ? "الوزن" : "Weight"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${isArabic ? "العناوين الرئيسية" : "Main Heading"}</td>
                  <td>32-48px</td>
                  <td>700 Bold</td>
                </tr>
                <tr>
                  <td>${isArabic ? "العناوين الثانوية" : "Sub Heading"}</td>
                  <td>24-32px</td>
                  <td>600 Semi-bold</td>
                </tr>
                <tr>
                  <td>${isArabic ? "النص الأساسي" : "Body Text"}</td>
                  <td>14-16px</td>
                  <td>400 Regular</td>
                </tr>
                <tr>
                  <td>${isArabic ? "النص الصغير" : "Small Text"}</td>
                  <td>12-14px</td>
                  <td>400 Regular</td>
                </tr>
              </tbody>
            </table>

            <h3>${isArabic ? "المسافات البادئة" : "Spacing"}</h3>
            <table>
              <thead>
                <tr>
                  <th>${isArabic ? "النوع" : "Type"}</th>
                  <th>${isArabic ? "المسافة" : "Size"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${isArabic ? "الفجوات الصغيرة" : "Small Gap"}</td>
                  <td>8px - 12px</td>
                </tr>
                <tr>
                  <td>${isArabic ? "الفجوات المتوسطة" : "Medium Gap"}</td>
                  <td>16px - 24px</td>
                </tr>
                <tr>
                  <td>${isArabic ? "الفجوات الكبيرة" : "Large Gap"}</td>
                  <td>32px - 48px</td>
                </tr>
              </tbody>
            </table>

            <h3>${isArabic ? "الزوايا المستديرة" : "Border Radius"}</h3>
            <p>${isArabic ? "الأزرار والبطاقات: 8px-12px | الصور: 4px-8px | العناصر الكبيرة: 16px" : "Buttons & Cards: 8px-12px | Images: 4px-8px | Large Elements: 16px"}</p>
          </div>
        </div>

        <!-- Features Summary -->
        <div class="page-break">
          <div class="section">
            <h2>${isArabic ? "ملخص الميزات" : "Features Summary"}</h2>
            <ul class="features-list">
              <li>${isArabic ? "واجهة محمولة أولاً (Mobile First Design)" : "Mobile-first responsive design"}</li>
              <li>${isArabic ? "دعم كامل اللغة العربية والإنجليزية" : "Full Arabic & English support"}</li>
              <li>${isArabic ? "قاعدة بيانات حقيقية (Supabase)" : "Real-time database (Supabase)"}</li>
              <li>${isArabic ? "المصادقة الآمنة" : "Secure authentication"}</li>
              <li>${isArabic ? "تتبع الطلبات بالوقت الفعلي" : "Real-time order tracking"}</li>
              <li>${isArabic ? "الدفع الآمن" : "Secure payment"}</li>
              <li>${isArabic ? "واجهة عربية احترافية" : "Professional Arabic UI"}</li>
              <li>${isArabic ? "أيقونة وشعار احترافي" : "Professional branding"}</li>
            </ul>
          </div>
        </div>

        <div class="footer">
          <p>${isArabic ? "© 2025 تطبيق السوق - جميع الحقوق محفوظة" : "© 2025 El Sawah - All Rights Reserved"}</p>
          <p>${isArabic ? "تم إنشاؤه بواسطة v0" : "Created with v0"}</p>
        </div>
      </div>
    </body>
    </html>
  `

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `inline; filename="El-Sawah-Design-Guide-${lang}.html"`,
    },
  })
}
