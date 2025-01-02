import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { ErrorBoundary } from "@/components/providers/ErrorBoundary"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LinkLocker - Store and Organize Your Links',
  description: 'A modern digital locker for storing and organizing your important links',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <div className="min-h-screen bg-background flex flex-col">
              <Navigation />
              <main className="flex-1">{children}</main>
            </div>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}