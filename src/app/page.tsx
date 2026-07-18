
"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, ShieldCheck, Star, ArrowLeft, Percent, Instagram, Facebook, Phone, SlidersHorizontal, Sparkles } from "lucide-react"
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

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true)
  const [activeTab, setActiveTab] = useState("الكل")
  const [currentBanner, setCurrentBanner] = useState(0)

  // Banner Auto-play
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

  const categories = ["الكل", "عطور رجالية", "عطور نسائية", "ساعات"]

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
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 h-16 px-6 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-luxury-black rounded-xl flex items-center justify-center border border-white/10 shadow-sm overflow-hidden">
             <Image 
              src="https://picsum.photos/seed/brand/200/200" 
              alt="SF Logo" 
              width={40}
              height={40}
              className="object-cover"
              data-ai-hint="luxury logo"
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
        
        {/* Banner Section - Optimized */}
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
                  data-ai-hint="luxury background"
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
            {/* Dots */}
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

        {/* Floating Search */}
        <section className="px-6 -mt-10 relative z-10">
          <Link href="/search" className="block">
            <div className="bg-white h-14 rounded-xl shadow-xl shadow-black/5 flex items-center px-6 gap-4 border border-gray-50">
              <Search className="w-5 h-5 text-primary" />
              <span className="text-gray-400 text-xs font-medium">ابحث عن عطرك المفضل...</span>
            </div>
          </Link>
        </section>

        {/* Tab-style Categories */}
        <section className="px-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1 ml-4">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(cat)}
                  className={cn(
                    "shrink-0 px-5 py-2.5 rounded-xl text-xs font-black transition-all",
                    activeTab === cat 
                      ? "bg-luxury-black text-primary" 
                      : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-luxury-black shadow-sm">
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Product List */}
        <section className="px-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-luxury-black">المجموعة المختارة</h3>
            <Link href="/products" className="text-primary text-[11px] font-bold flex items-center gap-1">
              مشاهدة الكل <ArrowLeft className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex flex-col gap-8">
            {filteredProducts.slice(0, 6).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Brands Section */}
        <section className="px-6 space-y-4">
          <h3 className="text-sm font-black text-luxury-black">ماركات عالمية</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide items-center">
            {BRANDS.map(brand => (
              <Link key={brand.id} href={`/brands/${brand.id}`} className="shrink-0 flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-white border border-gray-100 flex items-center justify-center p-2 shadow-sm">
                  <Image src={brand.logo} alt={brand.name} width={36} height={36} className="grayscale" />
                </div>
                <p className="text-[8px] font-bold text-gray-400">{brand.name}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Features Card */}
        <section className="px-6">
          <div className="bg-luxury-black rounded-2xl p-8 space-y-8 text-white">
            <div className="text-center space-y-1">
              <h3 className="text-sm font-black tracking-widest text-primary uppercase">لماذا SF PERFUME؟</h3>
              <p className="text-[9px] text-white/50 font-bold uppercase">التميز في كل تفصيلة</p>
            </div>
            <div className="grid grid-cols-2 gap-y-8 gap-x-4">
              {[
                { title: "أصلي ١٠٠٪", desc: "ضمان جودة المصنع", icon: ShieldCheck },
                { title: "خدمة راقية", desc: "نلبي تطلعاتك", icon: Star },
                { title: "أسعار منافسة", desc: "قيمة حقيقية", icon: Percent },
                { title: "توصيل سريع", desc: "لباب منزلك بالمكلا", icon: MapPin },
              ].map((feature, i) => {
                const Icon = feature.icon
                return (
                  <div key={i} className="flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-primary border border-white/10">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-[10px] font-black">{feature.title}</h4>
                      <p className="text-[8px] text-white/40 font-bold">{feature.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-12 pb-16 px-6 border-t border-gray-100 mt-4 text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-black text-luxury-black tracking-tighter">SF PERFUME</h2>
            <span className="text-[8px] text-primary font-bold tracking-[0.3em]">LUXURY EXPERIENCE</span>
          </div>
          <div className="flex justify-center gap-6">
            {[Instagram, Facebook, Phone].map((Icon, i) => (
              <Link key={i} href="#" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 bg-white">
                <Icon className="w-5 h-5" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
          <p className="text-[9px] text-gray-300 font-bold uppercase tracking-widest">
            جميع الحقوق محفوظة © ٢٠٢٤
          </p>
        </footer>
      </main>
    </div>
  )
}
