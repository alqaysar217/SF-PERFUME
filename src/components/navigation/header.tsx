
"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Search, ShoppingBag, MapPin, ArrowRight, Menu, LogOut, Package, Award, CreditCard, HelpCircle, Star, Image as ImageIcon, LayoutDashboard } from "lucide-react"
import Image from "next/image"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { toast } from "@/hooks/use-toast"

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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const isHome = pathname === "/"
  const isAdmin = pathname?.startsWith('/admin')
  const isAdminLogin = pathname === '/admin/login'
  
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
    if (pathname?.startsWith("/products/")) return "تفاصيل المنتج"
    return PAGE_TITLES[pathname || ""] || ""
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

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    router.push('/')
    toast({ title: "تم الخروج", description: "تم تسجيل خروجك بنجاح" })
    setIsMenuOpen(false)
  }

  const adminMenuItems = [
    { name: "الداشبورد", href: "/admin", icon: LayoutDashboard },
    { name: "المنتجات", href: "/admin?tab=products", icon: Package },
    { name: "الماركات", href: "/admin?tab=brands", icon: Award },
    { name: "الحسابات البنكية", href: "/admin?tab=accounts", icon: CreditCard },
    { name: "الأسئلة الشائعة", href: "/admin?tab=faqs", icon: HelpCircle },
    { name: "آراء العملاء", href: "/admin?tab=reviews", icon: Star },
    { name: "البنرات والعروض", href: "/admin?tab=banners", icon: ImageIcon },
  ]

  if (isAdmin && !isAdminLogin) {
    return (
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 h-16 px-4 flex items-center justify-between border-b border-gray-100 md:max-w-md md:mx-auto w-full" suppressHydrationWarning>
        {/* Right Side: Logo & Info */}
        <div className="flex items-center gap-2 flex-1">
          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 shadow-sm overflow-hidden relative shrink-0">
             <Image 
              src="https://picsum.photos/seed/brand/200/200" 
              alt="SF Logo" 
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-[11px] font-black tracking-tighter leading-none text-luxury-black">SF PERFUME</h1>
            <div className="flex items-center gap-1 text-[7px] text-gray-400 font-bold uppercase mt-1">
              <MapPin className="w-2 h-2 text-primary" />
              المكلا، حضرموت
            </div>
          </div>
        </div>

        {/* Center Title */}
        <div className="flex-[2] flex flex-col items-center">
          <p className="text-[9px] text-primary font-bold uppercase tracking-[0.2em]">{getTitle()}</p>
        </div>

        {/* Left Side: Sidebar Trigger */}
        <div className="flex-1 flex justify-end">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-luxury-black active:scale-90 transition-transform">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="rounded-l-[2.5rem] p-0 overflow-hidden border-none bg-background w-72">
              <SheetHeader className="sr-only">
                <SheetTitle>قائمة التحكم بالإدارة</SheetTitle>
              </SheetHeader>
              <div className="bg-luxury-black p-8 text-white space-y-4">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-luxury-black font-black text-xl shadow-xl">SF</div>
                <div>
                  <h2 className="font-black text-lg">لوحة الإدارة</h2>
                  <p className="text-primary text-[10px] font-bold uppercase tracking-widest">Admin Control Center</p>
                </div>
              </div>
              
              <div className="p-4 space-y-1 mt-4">
                {adminMenuItems.map((item) => (
                  <Link 
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-luxury-black">{item.name}</span>
                  </Link>
                ))}
                
                <div className="h-px bg-gray-100 my-4 mx-4" />
                
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                    <LogOut className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold">تسجيل الخروج</span>
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 h-16 px-4 flex items-center justify-between border-b border-gray-100 md:max-w-md md:mx-auto w-full" suppressHydrationWarning>
      <div className="flex items-center gap-3">
        {isHome ? (
          <div onClick={handleLogoClick} className="flex items-center gap-2 group active:scale-95 transition-transform cursor-pointer">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 shadow-sm overflow-hidden relative shrink-0">
               <Image 
                src="https://picsum.photos/seed/brand/200/200" 
                alt="SF Logo" 
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-[11px] font-black tracking-tighter leading-none text-luxury-black">SF PERFUME</h1>
              <div className="flex items-center gap-1 text-[7px] text-gray-400 font-bold uppercase mt-1">
                <MapPin className="w-2 h-2 text-primary" />
                المكلا، حضرموت
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            {!isAdminLogin && (
              <button 
                onClick={() => router.back()}
                className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-luxury-black active:scale-90 transition-transform"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
            <h1 className="text-sm font-black text-luxury-black">{getTitle()}</h1>
          </div>
        )}
      </div>
      
      {!isAdminLogin && (
        <div className="flex items-center gap-2">
          <Link href="/products" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-luxury-black active:scale-90 transition-transform">
            <Search className="w-5 h-5" strokeWidth={1.5} />
          </Link>
          <Link href="/cart" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center relative active:scale-90 transition-transform text-luxury-black">
            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      )}
    </header>
  )
}
