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
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-50 px-4 pt-3 pb-8 z-50 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.03)] md:max-w-md md:mx-auto">
      <div className="flex justify-around items-end">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "group flex flex-col items-center gap-1.5 transition-all duration-300 relative",
                isActive ? "text-primary" : "text-gray-300"
              )}
            >
              <div className={cn(
                "p-2.5 rounded-2xl transition-all duration-300 flex items-center justify-center",
                isActive ? "bg-primary/10 shadow-inner scale-110" : "group-hover:bg-gray-50"
              )}>
                <Icon 
                  className={cn("w-6 h-6 transition-all", isActive && "fill-primary/20")} 
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
              </div>
              <span className={cn(
                "text-[9px] font-black uppercase tracking-widest transition-opacity",
                isActive ? "opacity-100" : "opacity-60"
              )}>
                {item.name}
              </span>
              
              {isActive && (
                <div className="absolute -top-3 w-1 h-1 bg-primary rounded-full animate-pulse"></div>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}