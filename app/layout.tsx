import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "El Sawah Delivery - Luxury Logistics",
  description:
    "تطبيق السواح لتوصيل الطعام الفاخر - تجربة لوجستية راقية في الإمارات - Luxury Food Delivery & Logistics",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
    apple: "/icon.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#8B2E3D",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head></head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
