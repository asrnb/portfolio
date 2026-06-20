import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import ResponsiveHeader from "@/components/responsive-header"

const title = "April Suarnaba | AI Engineer"
const description =
  "Portfolio of April Suarnaba, a software developer focused on AI-powered dashboards, automation workflows, API integrations, and full-stack web applications."

export const metadata: Metadata = {
  metadataBase: new URL("https://aprilsuarnaba.com"),
  title,
  description,
  openGraph: {
    title,
    description,
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
      <body className="theme-transition" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ResponsiveHeader />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
