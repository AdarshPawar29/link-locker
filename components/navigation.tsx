"use client"

import Link from "next/link"
import { Lock, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Lock className="h-6 w-6" />
          <span className="font-bold">LinkLocker</span>
        </Link>

        <nav className="flex items-center space-x-6">
          <Link href="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Link href="/dashboard">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Locker
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}