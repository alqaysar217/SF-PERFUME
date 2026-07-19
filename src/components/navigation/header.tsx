
'use client';

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search, ShoppingBag, MapPin, ArrowRight, Menu, LogOut, Package, Award, CreditCard, HelpCircle, Star, Image as ImageIcon, LayoutDashboard, Trash2, X } from "lucide-react"
import Image from "next/image"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

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
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab')
  
  const [cartCount, setCartCount] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  const isHome = pathname === "/"
  const isAdmin = pathname?.startsWith('/admin')
  const isAdminLogin = pathname === '/admin/login'
  
  const clickCount = useRef(0)
  const lastClickTime = useRef(0)

  useEffect(() => {
    setMounted(true)
  }, [])

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
    { name: "الداشبورد", id: "dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "المنتجات", id: "products", href: "/admin?tab=products", icon: Package },
    { name: "الماركات", id: "brands", href: "/admin?tab=brands", icon: Award },
    { name: "الحسابات البنكية", id: "accounts", href: "/admin?tab=accounts", icon: CreditCard },
    { name: "سلة المحذوفات", id: "trash", href: "/admin?tab=trash", icon: Trash2 },
    { name: "الأسئلة الشائعة", id: "faqs", href: "/admin?tab=faqs", icon: HelpCircle },
    { name: "آراء العملاء", id: "reviews", href: "/admin?tab=reviews", icon: Star },
    { name: "البنرات والعروض", id: "banners", href: "/admin?tab=banners", icon: ImageIcon },
  ]

  if (!mounted) return <header className="h-16 bg-white/95" />

  if (isAdmin && !isAdminLogin) {
    return (
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 h-16 px-4 flex items-center justify-between border-b border-gray-100 md:max-w-md md:mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 shadow-sm overflow-hidden relative shrink-0">
             <Image 
              src="https://picsum.photos/seed/brand/200/200" 
              alt="SF Logo" 
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col text-right">
            <h1 className="text-[11px] font-black tracking-tighter leading-none text-luxury-black">SF PERFUME</h1>
            <div className="flex items-center gap-1 text-[7px] text-gray-400 font-bold uppercase mt-1">
              <MapPin className="w-2 h-2 text-primary" />
              المكلا، حضرموت
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-luxury-black active:scale-90 transition-transform">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" dir="rtl" className="rounded-l-2xl p-0 overflow-hidden border-none bg-white w-72 flex flex-col shadow-2xl">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white text-right shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-luxury-black rounded-lg flex items-center justify-center text-primary font-black text-lg shadow-lg shrink-0">
                    SF
                  </div>
                  <div className="text-right">
                    <SheetTitle className="font-black text-sm text-luxury-black m-0 p-0">SF PERFUME</SheetTitle>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter leading-none mt-1">مركز التحكم للإدارة</p>
                  </div>
                </div>
                <SheetClose className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary transition-colors">
                  <X className="w-5 h-5" />
                </SheetClose>
              </div>
              
              <ScrollArea className="flex-1">
                <div className="px-3 py-6 space-y-1">
                  {adminMenuItems.map((item) => {
                    const isActive = item.id === "dashboard" 
                      ? (!currentTab || currentTab === 'dashboard')
                      : currentTab === item.id;
                    return (
                      <Link 
                        key={item.id}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          "flex flex-row items-center gap-4 p-3 rounded-lg transition-all group w-full text-right",
                          isActive 
                            ? "bg-primary/10 text-primary shadow-sm" 
                            : "hover:bg-gray-50 text-gray-500 hover:text-luxury-black"
                        )}
                      >
                        <div className={cn(
                          "w-9 h-9 rounded-lg flex items-center justify-center transition-all shrink-0",
                          isActive 
                            ? "bg-primary text-white shadow-md shadow-primary/20" 
                            : "bg-gray-50 text-gray-400 group-hover:bg-white group-hover:text-primary group-hover:shadow-sm"
                        )}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <span className={cn(
                          "text-xs font-black transition-colors",
                          isActive ? "text-primary" : "group-hover:text-luxury-black"
                        )}>
                          {item.name}
                        </span>
                      </Link>
                    );
                  })}
                  
                  <div className="h-px bg-gray-100 my-4 mx-4" />
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full flex flex-row items-center gap-4 p-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors group text-right"
                  >
                    <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                      <LogOut className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-black">تسجيل الخروج</span>
                  </button>
                </div>
              </ScrollArea>
              
              <div className="p-6 border-t border-gray-50 bg-gray-50/50">
                <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest text-center">Cloud Management v1.0</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 h-16 px-4 flex items-center justify-between border-b border-gray-100 md:max-w-md md:mx-auto w-full">
      <div className="flex items-center gap-3">
        {isHome ? (
          <div onClick={handleLogoClick} className="flex items-center gap-3 group active:scale-95 transition-transform cursor-pointer">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 shadow-sm overflow-hidden relative shrink-0">
               <Image 
                src="https://picsum.photos/seed/brand/200/200" 
                alt="SF Logo" 
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col text-right">
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
