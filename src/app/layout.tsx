import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "ERP1 - Enterprise Resource Planning",
  description: "Professional ERP dashboard application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
