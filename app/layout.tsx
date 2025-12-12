import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kid-Friendly Recipe Generator',
  description: 'Generate fun and easy recipes for kids',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
