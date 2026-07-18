
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
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 px-4 pb-6 pt-3 z-50 rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.04)] md:max-w-md md:mx-auto">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "group flex flex-col items-center gap-1 transition-all duration-300 relative",
                isActive ? "text-primary" : "text-gray-300"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all duration-300 flex items-center justify-center",
                isActive ? "bg-primary/10 scale-110" : "group-hover:bg-gray-50"
              )}>
                <Icon 
                  className={cn("w-5 h-5 transition-all", isActive && "fill-primary/20")} 
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
              </div>
              <span className={cn(
                "text-[8px] font-black uppercase tracking-widest transition-opacity",
                isActive ? "opacity-100" : "opacity-60"
              )}>
                {item.name}
              </span>
              
              {isActive && (
                <div className="absolute -top-1 w-1 h-1 bg-primary rounded-full animate-pulse"></div>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
