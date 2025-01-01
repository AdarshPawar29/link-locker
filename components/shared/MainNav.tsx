"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const routes = [
  {
    href: "/dashboard",
    label: "Dashboard",
    pattern: /^\/dashboard$/,
  },
  {
    href: "/dashboard/shared",
    label: "Shared",
    pattern: /^\/dashboard\/shared/,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    pattern: /^\/dashboard\/settings/,
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-4">
      {routes.map((route) => (
        <Link key={route.href} href={route.href}>
          <Button
            variant={route.pattern.test(pathname) ? "default" : "ghost"}
            className="h-8"
          >
            {route.label}
          </Button>
        </Link>
      ))}
    </nav>
  );
}