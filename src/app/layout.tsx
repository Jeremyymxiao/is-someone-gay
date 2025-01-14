import type { Metadata } from "next"
import { Quicksand } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from '@/components/ui/toaster'

const quicksand = Quicksand({ 
  subsets: ["latin"],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Is Someone Gay",
  description: "Find out if someone is gay",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${quicksand.className} min-h-full flex flex-col bg-gradient-to-br from-violet-200 via-purple-100 to-sky-200`}>
        <Header />
        {children}
        <Analytics />
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
