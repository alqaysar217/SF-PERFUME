
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingBag, Percent, Heart, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { name: "الرئيسية", href: "/", icon: Home },
    { name: "المنتجات", href: "/products", icon: ShoppingBag },
    { name: "العروض", href: "/offers", icon: Percent },
    { name: "المفضلة", href: "/favorites", icon: Heart },
    { name: "المزيد", href: "/more", icon: MoreHorizontal },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-3 z-50 flex justify-around items-center rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.05)] md:max-w-md md:mx-auto">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        return (
          <Link 
            key={item.href} 
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-300 px-4",
              isActive ? "text-primary scale-110" : "text-gray-400"
            )}
          >
            <Icon className={cn("w-6 h-6", isActive && "fill-primary/20")} />
            <span className="text-[10px] font-bold">{item.name}</span>
            {isActive && <div className="w-1 h-1 bg-primary rounded-full" />}
          </Link>
        )
      })}
    </nav>
  )
}
