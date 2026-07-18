
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
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 px-2 py-3 z-50 flex justify-around items-center rounded-t-[2rem] shadow-[0_-8px_30px_rgba(0,0,0,0.05)] md:max-w-md md:mx-auto">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        return (
          <Link 
            key={item.href} 
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-300 px-3",
              isActive ? "text-primary scale-110" : "text-gray-400 hover:text-gray-600"
            )}
          >
            <div className={cn(
              "p-1.5 rounded-xl transition-colors",
              isActive && "bg-primary/10"
            )}>
              <Icon className={cn("w-6 h-6", isActive && "fill-primary/20")} />
            </div>
            <span className="text-[9px] font-bold">{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}
