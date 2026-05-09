import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import ResponsiveHeader from "@/components/responsive-header"

export const metadata: Metadata = {
  title: "April Suarnaba | Software Engineer",
  description:
    "Portfolio of April Suarnaba, a software developer focused on AI-powered dashboards, automation workflows, API integrations, and full-stack web applications.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/april.jpg" as="image" />

        {/* Add meta tags for better performance */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body className="theme-transition">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ResponsiveHeader />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
