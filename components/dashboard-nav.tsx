"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Lock className="h-6 w-6" />
            <span className="font-bold">LinkLocker</span>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link href="/dashboard">
              <Button
                variant={pathname === "/dashboard" ? "default" : "ghost"}
                className="h-8"
              >
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/shared">
              <Button
                variant={pathname === "/dashboard/shared" ? "default" : "ghost"}
                className="h-8"
              >
                Shared
              </Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button
                variant={pathname === "/dashboard/settings" ? "default" : "ghost"}
                className="h-8"
              >
                Settings
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}