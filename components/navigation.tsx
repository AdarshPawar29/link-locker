"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Lock,
  Plus,
  Home,
  FolderHeart,
  Share2,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase/client";

export function Navigation() {
  const pathname = usePathname();
  const { user } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const routes = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "My Lockers", icon: FolderHeart },
    { href: "/dashboard/shared", label: "Shared", icon: Share2 },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Lock className="h-6 w-6" />
          <span className="font-bold text-lg">LinkLocker</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {routes.map((route) => {
            const Icon = route.icon;
            return (
              <Link key={route.href} href={route.href}>
                <Button
                  variant={pathname === route.href ? "default" : "ghost"}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{route.label}</span>
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Button onClick={() => {}} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                New Locker
              </Button>
              <Button
                onClick={handleSignOut}
                variant="ghost"
                className="text-destructive"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Link href="/auth">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}