import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ClientProviders } from "@/components/client-providers" // 👈 New import

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Social Media Maestro",
  description: "Master your social media strategy",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientProviders> {/* 👈 Wrap children in client-side providers */}
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
