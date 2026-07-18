
"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Search, ShoppingBag, MapPin, ArrowRight } from "lucide-react"
import Image from "next/image"

const PAGE_TITLES: { [key: string]: string } = {
  "/products": "المتجر الكامل",
  "/offers": "العروض الحصرية",
  "/favorites": "المفضلة",
  "/more": "المزيد",
  "/cart": "سلة التسوق",
  "/about": "من نحن",
  "/contact": "تواصل معنا",
  "/payment-info": "بيانات التحويل",
  "/faq": "الأسئلة الشائعة",
  "/guide": "دليل العطور",
  "/brands": "الماركات العالمية",
  "/admin": "لوحة الإدارة",
  "/admin/login": "تسجيل دخول الإدارة"
}

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [cartCount, setCartCount] = useState(0)
  const isHome = pathname === "/"
  
  // Easter Egg logic for Admin Login
  const clickCount = useRef(0)
  const lastClickTime = useRef(0)

  const handleLogoClick = () => {
    const now = Date.now()
    if (now - lastClickTime.current > 1000) {
      clickCount.current = 1
    } else {
      clickCount.current += 1
    }
    
    lastClickTime.current = now
    
    if (clickCount.current === 5) {
      router.push('/admin/login')
      clickCount.current = 0
    }
  }

  const getTitle = () => {
    if (pathname.startsWith("/products/")) return "تفاصيل المنتج"
    return PAGE_TITLES[pathname] || ""
  }

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const count = cart.reduce((acc: number, item: any) => acc + item.quantity, 0)
    setCartCount(count)
  }

  useEffect(() => {
    updateCartCount()
    window.addEventListener('cart-updated', updateCartCount)
    return () => window.removeEventListener('cart-updated', updateCartCount)
  }, [])

  if (pathname.startsWith('/admin')) {
    return (
      <header className="bg-luxury-black text-white sticky top-0 z-50 h-16 px-4 flex items-center justify-between border-b border-white/10 md:max-w-md md:mx-auto w-full">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
            <ArrowRight className="w-5 h-5" />
          </button>
          <h1 className="text-sm font-black">{getTitle()}</h1>
        </div>
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-black text-xs text-luxury-black">ADMIN</div>
      </header>
    )
  }

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 h-16 px-4 flex items-center justify-between border-b border-gray-100 md:max-w-md md:mx-auto w-full">
      <div className="flex items-center gap-3">
        {isHome ? (
          <div onClick={handleLogoClick} className="flex items-center gap-2 group active:scale-95 transition-transform cursor-pointer">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 shadow-sm overflow-hidden relative">
               <Image 
                src="https://picsum.photos/seed/brand/200/200" 
                alt="SF Logo" 
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-black tracking-tighter leading-none text-luxury-black">SF PERFUME</h1>
              <div className="flex items-center gap-1 text-[7px] text-gray-400 font-bold uppercase mt-1">
                <MapPin className="w-2 h-2 text-primary" />
                المكلا، حضرموت
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.back()}
              className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-luxury-black active:scale-90 transition-transform"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <h1 className="text-sm font-black text-luxury-black">{getTitle()}</h1>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Link href="/products" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-luxury-black active:scale-90 transition-transform">
          <Search className="w-5 h-5" strokeWidth={1.5} />
        </Link>
        <Link href="/cart" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center relative active:scale-90 transition-transform text-luxury-black border border-gray-100">
          <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
