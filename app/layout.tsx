import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import ResponsiveHeader from "@/components/responsive-header"
import ParticlesBackground from "@/components/particles-background"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const siteUrl = "https://asrnb.vercel.app"
const title = "April Suarnaba | AI Engineer"
const description =
  "Portfolio of April Suarnaba, a software developer focused on AI-powered dashboards, automation workflows, API integrations, and full-stack web applications."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "April Suarnaba",
    images: ["/april.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/april.jpg"],
  },
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "April Suarnaba",
  alternateName: "April G. Suarnaba",
  url: siteUrl,
  image: `${siteUrl}/april.jpg`,
  jobTitle: "AI Engineer",
  description,
  sameAs: ["https://github.com/asrnb", "https://ph.linkedin.com/in/aprilsuarnaba"],
  worksFor: {
    "@type": "Organization",
    name: "Callbox Inc.",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "West Visayas State University",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/april.jpg" as="image" />

        {/* Add meta tags for better performance */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="theme-transition font-sans" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <ParticlesBackground />
          <ResponsiveHeader />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
