
"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, ShieldCheck, Star, ArrowLeft, Percent, Instagram, Facebook, Phone, SlidersHorizontal, Sparkles, User, UserRound, Watch, LayoutGrid, Quote } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PRODUCTS, BRANDS } from "@/lib/mock-data"
import { ProductCard } from "@/components/shared/product-card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const BANNER_IMAGES = [
  { url: "https://picsum.photos/seed/sf1/1200/600", title: "عطور تجسد أناقتك", sub: "مجموعة حصرية" },
  { url: "https://picsum.photos/seed/sf2/1200/600", title: "ساعات فاخرة", sub: "تميز في كل لحظة" },
  { url: "https://picsum.photos/seed/sf3/1200/600", title: "عروض الموسم", sub: "خصومات تصل إلى ٤٠٪" }
]

const CATEGORIES_WITH_ICONS = [
  { name: "الكل", icon: LayoutGrid },
  { name: "عطور رجالية", icon: User },
  { name: "عطور نسائية", icon: UserRound },
  { name: "ساعات", icon: Watch },
]

const REVIEWS = [
  { name: "محمد العمري", review: "جودة العطور استثنائية والثبات يدوم طويلاً. فعلاً متجر يستحق الثقة.", rating: 5 },
  { name: "سارة الحضرمي", review: "أحببت سرعة التعامل ورقي المنتجات. العطور أصلية ١٠٠٪.", rating: 5 },
  { name: "أحمد باوزير", review: "أفضل مكان لشراء الهدايا الفاخرة في المكلا. الساعات رائعة جداً.", rating: 5 }
]

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true)
  const [activeTab, setActiveTab] = useState("الكل")
  const [currentBanner, setCurrentBanner] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % BANNER_IMAGES.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const filteredProducts = activeTab === "الكل" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => {
        if (activeTab === "عطور رجالية") return p.category === 'men'
        if (activeTab === "عطور نسائية") return p.category === 'women'
        if (activeTab === "ساعات") return p.category === 'watches'
        return true
      })

  if (showSplash) {
    return (
      <div className="fixed inset-0 z-[100] bg-luxury-black flex flex-col items-center justify-center gap-6">
        <div className="relative w-24 h-24 flex items-center justify-center animate-fade-in">
           <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-ping"></div>
           <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl relative z-10">
             <span className="text-luxury-black font-black text-2xl tracking-tighter">SF</span>
           </div>
        </div>
        <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-white text-2xl font-black tracking-[0.2em]">SF PERFUME</h1>
          <p className="text-primary text-[10px] font-bold uppercase tracking-[0.4em]">Excellence in Fragrance</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col animate-fade-in pb-32 bg-background">
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 h-16 px-6 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-luxury-black rounded-xl flex items-center justify-center border border-white/10 shadow-sm overflow-hidden">
             <Image 
              src="https://picsum.photos/seed/brand/200/200" 
              alt="SF Logo" 
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-base font-black tracking-tighter leading-none text-luxury-black">SF PERFUME</h1>
            <div className="flex items-center gap-1 text-[8px] text-gray-400 font-bold uppercase mt-1">
              <MapPin className="w-2 h-2 text-primary" />
              المكلا، حضرموت
            </div>
          </div>
        </div>
        
        <Link href="/search" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-luxury-black">
          <Search className="w-5 h-5" strokeWidth={1.5} />
        </Link>
      </header>

      <main className="flex flex-col gap-10 pt-6">
        
        <section className="px-6">
          <div className="relative h-48 rounded-2xl overflow-hidden bg-luxury-black shadow-lg">
            {BANNER_IMAGES.map((img, idx) => (
              <div 
                key={idx}
                className={cn(
                  "absolute inset-0 transition-opacity duration-1000",
                  currentBanner === idx ? "opacity-100" : "opacity-0"
                )}
              >
                <Image 
                  src={img.url} 
                  alt={img.title}
                  fill
                  className="object-cover opacity-50"
                />
                <div className="absolute inset-0 p-8 flex flex-col justify-center gap-2">
                  <div className="flex items-center gap-2 bg-primary/20 backdrop-blur-sm w-fit px-3 py-1 rounded-full border border-primary/30">
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span className="text-[8px] font-black text-white uppercase tracking-widest">{img.sub}</span>
                  </div>
                  <h2 className="text-xl font-black text-white leading-tight">{img.title}</h2>
                </div>
              </div>
            ))}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
              {BANNER_IMAGES.map((_, i) => (
                <div key={i} className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all",
                  currentBanner === i ? "bg-primary w-4" : "bg-white/30"
                )} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 -mt-4 relative z-10">
          <Link href="/search" className="block">
            <div className="bg-white h-14 rounded-xl shadow-xl shadow-black/5 flex items-center px-6 gap-4 border border-gray-50 luxury-shadow">
              <Search className="w-5 h-5 text-primary" />
              <span className="text-gray-400 text-xs font-medium">ابحث عن عطرك المفضل...</span>
            </div>
          </Link>
        </section>

        <section className="px-6 space-y-4">
          <div className="flex items-center">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1 py-1">
              {CATEGORIES_WITH_ICONS.map((cat, i) => {
                const Icon = cat.icon
                return (
                  <button
                    key={i}
                    onClick={() => setActiveTab(cat.name)}
                    className={cn(
                      "shrink-0 px-4 py-2.5 rounded-xl text-[10px] font-black transition-all flex items-center gap-2",
                      activeTab === cat.name 
                        ? "bg-luxury-black text-primary shadow-lg shadow-black/10 scale-105" 
                        : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {cat.name}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-luxury-black">المجموعة المختارة</h3>
            <Link href="/products" className="text-primary text-[11px] font-bold flex items-center gap-1">
              مشاهدة الكل <ArrowLeft className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            {filteredProducts.slice(0, 6).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="px-6 space-y-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-black text-luxury-black">الماركات العالمية</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Global Luxury Brands</p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide items-center">
            {BRANDS.map(brand => (
              <Link key={brand.id} href={`/brands/${brand.id}`} className="shrink-0 group">
                <div className="w-20 h-20 rounded-2xl bg-white border border-gray-100 flex items-center justify-center p-4 shadow-sm group-hover:border-primary transition-all group-active:scale-95">
                  <Image 
                    src={brand.logo} 
                    alt={brand.name} 
                    width={50} 
                    height={50} 
                    className="grayscale group-hover:grayscale-0 transition-all object-contain" 
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="px-6">
          <div className="bg-luxury-black rounded-[2.5rem] p-10 space-y-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div className="text-center space-y-2 relative z-10">
              <h3 className="text-lg font-black tracking-tight text-primary">لماذا SF PERFUME؟</h3>
              <p className="text-[10px] text-white/50 font-bold uppercase tracking-[0.2em]">Excellence In Every Detail</p>
            </div>
            <div className="grid grid-cols-2 gap-y-10 gap-x-6 relative z-10">
              {[
                { title: "أصلي ١٠٠٪", desc: "ضمان جودة المصنع", icon: ShieldCheck },
                { title: "خدمة راقية", desc: "نلبي تطلعاتك", icon: Star },
                { title: "أسعار منافسة", desc: "قيمة حقيقية", icon: Percent },
                { title: "توصيل سريع", desc: "لباب منزلك بالمكلا", icon: MapPin },
              ].map((feature, i) => {
                const Icon = feature.icon
                return (
                  <div key={i} className="flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary border border-white/10 shadow-lg shadow-black/20">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[11px] font-black">{feature.title}</h4>
                      <p className="text-[9px] text-white/40 font-bold leading-none">{feature.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-6 space-y-8">
          <div className="text-center">
            <h3 className="text-base font-black text-luxury-black">آراء العملاء</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">What Our Clients Say</p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-2">
            {REVIEWS.map((rev, i) => (
              <div key={i} className="min-w-[280px] bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm space-y-4">
                <Quote className="w-8 h-8 text-primary/10" />
                <p className="text-[12px] text-gray-500 font-medium leading-relaxed italic">"{rev.review}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <span className="text-[11px] font-black text-luxury-black">{rev.name}</span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: rev.rating }).map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="pt-20 pb-16 px-6 border-t border-gray-100 mt-10 text-center space-y-8 bg-gray-50/50">
          <div className="space-y-3">
            <h2 className="text-xl font-black text-luxury-black tracking-tighter">SF PERFUME</h2>
            <div className="flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-primary/30"></span>
              <span className="text-[9px] text-primary font-bold tracking-[0.4em] uppercase">Luxury Experience</span>
              <span className="h-px w-8 bg-primary/30"></span>
            </div>
          </div>
          <div className="flex justify-center gap-6">
            {[Instagram, Facebook, Phone].map((Icon, i) => (
              <Link key={i} href="#" className="w-12 h-12 rounded-2xl border border-gray-200 flex items-center justify-center text-gray-400 bg-white hover:text-primary transition-colors luxury-shadow">
                <Icon className="w-6 h-6" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              جميع الحقوق محفوظة © ٢٠٢٤
            </p>
            <p className="text-[8px] text-gray-300 font-medium">MADE WITH EXCELLENCE IN HADRAMOUT</p>
          </div>
        </footer>
      </main>
    </div>
  )
}
