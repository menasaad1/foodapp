import { NextResponse } from "next/server"

export async function GET() {
  try {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>el sawah - Design Guide</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6; }
            
            .page { page-break-after: always; padding: 40px; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; }
            
            .cover {
              background: linear-gradient(135deg, #D4234E 0%, #8B1538 100%);
              color: white;
              text-align: center;
            }
            
            .cover h1 { font-size: 72px; margin-bottom: 30px; font-weight: 700; }
            .cover p { font-size: 24px; margin-bottom: 20px; }
            .cover .subtitle { font-size: 16px; opacity: 0.9; }
            
            .toc { background: white; }
            .toc h1 { color: #D4234E; margin-bottom: 30px; font-size: 36px; }
            .toc-item { margin-bottom: 15px; padding: 10px; border-left: 4px solid #D4234E; }
            .toc-item strong { color: #D4234E; }
            
            .page-section {
              background: white;
            }
            
            .section-header {
              background: #D4234E;
              color: white;
              padding: 20px 40px;
              margin: -40px -40px 30px -40px;
              font-size: 28px;
              font-weight: 700;
            }
            
            .page-preview {
              border: 2px solid #E0E0E0;
              border-radius: 8px;
              overflow: hidden;
              margin: 20px 0;
            }
            
            .phone-frame {
              width: 100%;
              max-width: 300px;
              margin: 20px auto;
              border: 15px solid #333;
              border-radius: 40px;
              overflow: hidden;
              background: white;
              box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            }
            
            .phone-frame::before {
              content: '';
              display: block;
              width: 100%;
              height: 30px;
              background: #333;
              border-bottom: 1px solid #222;
            }
            
            .screenshot {
              width: 100%;
              height: 600px;
              background: #f5f5f5;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              color: #999;
              text-align: center;
              padding: 20px;
            }
            
            .page-info {
              background: #f9f9f9;
              padding: 15px;
              border-radius: 5px;
              margin-top: 20px;
              font-size: 12px;
            }
            
            .page-info strong { color: #D4234E; }
            
            .features-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              margin: 20px 0;
            }
            
            .feature-item {
              background: #f5f5f5;
              padding: 15px;
              border-left: 4px solid #D4234E;
              border-radius: 4px;
            }
            
            .feature-item strong { color: #D4234E; display: block; margin-bottom: 5px; }
            
            .color-palette {
              display: flex;
              gap: 15px;
              margin: 20px 0;
              flex-wrap: wrap;
            }
            
            .color-box {
              width: 100px;
              height: 100px;
              border-radius: 8px;
              display: flex;
              align-items: flex-end;
              justify-content: center;
              color: white;
              font-size: 12px;
              font-weight: bold;
              padding: 5px;
            }
            
            @media print {
              body { margin: 0; padding: 0; }
              .page { page-break-after: always; margin: 0; padding: 40px; }
              .page-break { page-break-after: always; }
            }
          </style>
        </head>
        <body>
          <!-- COVER PAGE -->
          <div class="page cover">
            <h1>el sawah</h1>
            <p>Food Delivery Application</p>
            <p>تطبيق توصيل الطعام</p>
            <p class="subtitle" style="margin-top: 60px; font-size: 18px;">Design Guide & Complete Overview</p>
            <p class="subtitle" style="margin-top: 40px;">Generated: ${new Date().toLocaleDateString()}</p>
          </div>
          
          <!-- TABLE OF CONTENTS -->
          <div class="page toc">
            <h1>Table of Contents</h1>
            <div class="toc-item"><strong>1.</strong> Design System</div>
            <div class="toc-item"><strong>2.</strong> Home Page</div>
            <div class="toc-item"><strong>3.</strong> Search & Filters</div>
            <div class="toc-item"><strong>4.</strong> Restaurant Details</div>
            <div class="toc-item"><strong>5.</strong> Shopping Cart</div>
            <div class="toc-item"><strong>6.</strong> Checkout Process</div>
            <div class="toc-item"><strong>7.</strong> Order Tracking</div>
            <div class="toc-item"><strong>8.</strong> Favorites</div>
            <div class="toc-item"><strong>9.</strong> Order History</div>
            <div class="toc-item"><strong>10.</strong> User Profile</div>
          </div>
          
          <!-- DESIGN SYSTEM PAGE -->
          <div class="page page-section">
            <div class="section-header">Design System</div>
            <h2 style="color: #D4234E; margin-bottom: 15px;">Brand Colors</h2>
            <div class="color-palette">
              <div class="color-box" style="background: #D4234E;">Primary<br>#D4234E</div>
              <div class="color-box" style="background: #C41A3F;">Dark<br>#C41A3F</div>
              <div class="color-box" style="background: #F4A460;">Accent<br>#F4A460</div>
              <div class="color-box" style="background: #2C2C2C;">Dark Gray<br>#2C2C2C</div>
            </div>
            
            <h2 style="color: #D4234E; margin-top: 30px; margin-bottom: 15px;">Typography</h2>
            <div class="feature-item">
              <strong>Headings</strong>
              Geist Sans - Bold, 24-32px
            </div>
            <div class="feature-item">
              <strong>Body Text</strong>
              Geist Sans - Regular, 14-16px
            </div>
            
            <h2 style="color: #D4234E; margin-top: 30px; margin-bottom: 15px;">Key Features</h2>
            <div class="features-grid">
              <div class="feature-item">🏠 Real-time Updates</div>
              <div class="feature-item">📱 Mobile First Design</div>
              <div class="feature-item">🌙 Dark Mode Support</div>
              <div class="feature-item">🔐 Secure Authentication</div>
            </div>
          </div>
          
          <!-- HOME PAGE -->
          <div class="page page-section">
            <div class="section-header">Home Page</div>
            <div class="phone-frame">
              <div class="screenshot">
                Home Page Screenshot
              </div>
            </div>
            <div class="page-info">
              <strong>URL:</strong> /<br>
              <strong>Features:</strong> Restaurant listings, search bar, promotions carousel, cuisine categories, featured restaurants
            </div>
          </div>
          
          <!-- SEARCH PAGE -->
          <div class="page page-section">
            <div class="section-header">Search & Filters</div>
            <div class="phone-frame">
              <div class="screenshot">
                Search Page Screenshot
              </div>
            </div>
            <div class="page-info">
              <strong>URL:</strong> /search<br>
              <strong>Features:</strong> Advanced search, filter by cuisine, rating, delivery time, sorting options
            </div>
          </div>
          
          <!-- RESTAURANT PAGE -->
          <div class="page page-section">
            <div class="section-header">Restaurant Details</div>
            <div class="phone-frame">
              <div class="screenshot">
                Restaurant Page Screenshot
              </div>
            </div>
            <div class="page-info">
              <strong>URL:</strong> /restaurant/[id]<br>
              <strong>Features:</strong> Menu items, restaurant info, ratings, add to cart, special offers
            </div>
          </div>
          
          <!-- CART PAGE -->
          <div class="page page-section">
            <div class="section-header">Shopping Cart</div>
            <div class="phone-frame">
              <div class="screenshot">
                Cart Page Screenshot
              </div>
            </div>
            <div class="page-info">
              <strong>URL:</strong> /cart<br>
              <strong>Features:</strong> Item management, quantity adjustment, special instructions, price breakdown
            </div>
          </div>
          
          <!-- CHECKOUT PAGE -->
          <div class="page page-section">
            <div class="section-header">Checkout Process</div>
            <div class="phone-frame">
              <div class="screenshot">
                Checkout Page Screenshot
              </div>
            </div>
            <div class="page-info">
              <strong>URL:</strong> /checkout<br>
              <strong>Features:</strong> Delivery address selection, payment method, order summary, confirmation
            </div>
          </div>
          
          <!-- ORDER TRACKING -->
          <div class="page page-section">
            <div class="section-header">Order Tracking</div>
            <div class="phone-frame">
              <div class="screenshot">
                Order Tracking Screenshot
              </div>
            </div>
            <div class="page-info">
              <strong>URL:</strong> /orders/[id]<br>
              <strong>Features:</strong> Real-time status updates, delivery map, driver info, estimated time
            </div>
          </div>
          
          <!-- FAVORITES PAGE -->
          <div class="page page-section">
            <div class="section-header">Favorites</div>
            <div class="phone-frame">
              <div class="screenshot">
                Favorites Page Screenshot
              </div>
            </div>
            <div class="page-info">
              <strong>URL:</strong> /favorites<br>
              <strong>Features:</strong> Saved restaurants, quick access, remove favorites
            </div>
          </div>
          
          <!-- ORDER HISTORY -->
          <div class="page page-section">
            <div class="section-header">Order History</div>
            <div class="phone-frame">
              <div class="screenshot">
                History Page Screenshot
              </div>
            </div>
            <div class="page-info">
              <strong>URL:</strong> /history<br>
              <strong>Features:</strong> Past orders, reorder functionality, order details
            </div>
          </div>
          
          <!-- USER PROFILE -->
          <div class="page page-section">
            <div class="section-header">User Profile</div>
            <div class="phone-frame">
              <div class="screenshot">
                Profile Page Screenshot
              </div>
            </div>
            <div class="page-info">
              <strong>URL:</strong> /profile<br>
              <strong>Features:</strong> User settings, delivery addresses, preferences, account management
            </div>
          </div>
          
          <!-- TECHNOLOGY STACK -->
          <div class="page page-section">
            <div class="section-header">Technology Stack</div>
            <h2 style="color: #D4234E; margin-bottom: 15px;">Frontend</h2>
            <div class="features-grid" style="grid-template-columns: 1fr;">
              <div class="feature-item">Next.js 16 - React Framework</div>
              <div class="feature-item">TypeScript - Type Safety</div>
              <div class="feature-item">Tailwind CSS - Styling</div>
              <div class="feature-item">Shadcn/UI - Component Library</div>
            </div>
            
            <h2 style="color: #D4234E; margin-top: 30px; margin-bottom: 15px;">Backend & Database</h2>
            <div class="features-grid" style="grid-template-columns: 1fr;">
              <div class="feature-item">Supabase - Database & Auth</div>
              <div class="feature-item">PostgreSQL - Data Storage</div>
              <div class="feature-item">Real-time Subscriptions - Live Updates</div>
            </div>
          </div>
        </body>
      </html>
    `

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": 'inline; filename="el-sawah-design-guide.html"',
      },
    })
  } catch (error) {
    console.error("Error generating PDF:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}
