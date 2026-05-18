import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 as Source_Sans_Pro } from "next/font/google"
import Script from "next/script"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import "./globals.css"
import { env } from "@/lib/env"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "700"],
})

const sourceSans = Source_Sans_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: `${env.siteName} — Custom CMS, Web & Browser Extensions`,
    template: `%s — ${env.siteName}`,
  },
  description:
    "Senior freelance developer building custom CMS platforms, full-stack web apps and Chrome extensions. 100% job success on Upwork.",
  openGraph: {
    type: "website",
    siteName: env.siteName,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${sourceSans.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster />
          <SonnerToaster />
        </ThemeProvider>
        <Script
          src="https://webask.vercel.app/widget.js"
          data-site-key="sk_p6QX2INdJTb9eWpI"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
