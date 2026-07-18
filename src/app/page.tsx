"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, ShieldCheck, Star, ArrowLeft, Percent, Instagram, Facebook, Phone, LayoutGrid, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PRODUCTS, BRANDS } from "@/lib/mock-data"
import { ProductCard } from "@/components/shared/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return (
      <div className="fixed inset-0 z-[100] bg-secondary flex flex-col items-center justify-center gap-6">
        <div className="relative w-24 h-24 flex items-center justify-center animate-fade-in">
           <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-ping"></div>
           <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl relative z-10">
             <span className="text-secondary font-black text-2xl tracking-tighter">SF</span>
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
    <div className="flex flex-col animate-fade-in pb-32">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 h-16 px-6 flex items-center justify-between border-b border-gray-50/50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center border border-primary/10 shadow-sm overflow-hidden">
             <Image 
              src="https://picsum.photos/seed/brand/200/200" 
              alt="SF Logo" 
              width={40}
              height={40}
              className="object-cover"
              data-ai-hint="luxury logo"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-lg font-black tracking-tighter leading-none text-secondary">SF PERFUME</h1>
            <div className="flex items-center gap-1 text-[8px] text-gray-400 font-bold uppercase mt-1">
              <MapPin className="w-2 h-2 text-primary" />
              حضرموت - المكلا
            </div>
          </div>
        </div>
        
        <Link href="/search" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-secondary">
          <Search className="w-5 h-5" strokeWidth={1.5} />
        </Link>
      </header>

      <main className="flex flex-col gap-8 pt-6">
        
        {/* Banner */}
        <section className="px-6">
          <div className="relative h-48 rounded-[2.5rem] overflow-hidden dark-gradient shadow-xl">
            <Image 
              src="https://picsum.photos/seed/sf1/1200/600" 
              alt="Luxury Banner"
              fill
              className="object-cover opacity-60"
              data-ai-hint="luxury perfume"
            />
            <div className="absolute inset-0 p-8 flex flex-col justify-center gap-2">
              <div className="flex items-center gap-2 bg-primary/20 backdrop-blur-md w-fit px-3 py-1 rounded-full border border-primary/30">
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-[9px] font-black text-white uppercase tracking-widest">مجموعة حصرية</span>
              </div>
              <h2 className="text-2xl font-black text-white leading-tight">عطور تجسد <br />أناقتك الخاصة</h2>
              <p className="text-white/70 text-[10px] font-medium max-w-[220px]">اكتشف أرقى العطور العالمية المختارة لك بعناية فائقة.</p>
            </div>
          </div>
        </section>

        {/* Floating Search */}
        <section className="px-6 relative z-10 -mt-4">
          <Link href="/search" className="block">
            <div className="bg-white h-14 rounded-2xl shadow-xl shadow-black/5 flex items-center px-6 gap-4 border border-gray-50 transition-transform active:scale-95">
              <Search className="w-5 h-5 text-primary" />
              <span className="text-gray-400 text-sm font-medium">ابحث عن عطرك المفضل...</span>
            </div>
          </Link>
        </section>

        {/* Improved Categories */}
        <section className="px-6 space-y-4">
          <h3 className="text-sm font-black text-secondary tracking-wide flex items-center gap-2">
            <LayoutGrid className="w-4 h-4 text-primary" />
            الأقسام الرئيسية
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "عطور رجالية", icon: "♂️", color: "bg-blue-50/50", link: "/products?cat=men" },
              { name: "عطور نسائية", icon: "♀️", color: "bg-pink-50/50", link: "/products?cat=women" },
              { name: "ساعات فاخرة", icon: "⌚", color: "bg-orange-50/50", link: "/products?cat=watches" },
              { name: "المزيد", icon: "✨", color: "bg-gray-50/50", link: "/products" },
            ].map((cat, i) => (
              <Link key={i} href={cat.link} className={`${cat.color} p-5 rounded-[2rem] flex flex-col items-center gap-3 border border-gray-100 transition-all active:scale-95`}>
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-[11px] font-black text-secondary text-center">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Single Column Product List */}
        <section className="px-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-secondary">وصلنا حديثاً</h3>
            <Link href="/products" className="text-primary text-[11px] font-bold flex items-center gap-1">
              مشاهدة الكل <ArrowLeft className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {PRODUCTS.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Brands Horizontal */}
        <section className="px-6 space-y-4">
          <h3 className="text-sm font-black text-secondary tracking-wide">ماركات عالمية</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide items-center">
            {BRANDS.map(brand => (
              <Link key={brand.id} href={`/brands/${brand.id}`} className="shrink-0 flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-white border border-gray-100 flex items-center justify-center p-2 shadow-sm transition-all active:scale-90">
                  <Image src={brand.logo} alt={brand.name} width={40} height={40} className="grayscale rounded-full" />
                </div>
                <p className="text-[9px] font-bold text-gray-400">{brand.name}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Luxury Features */}
        <section className="px-6">
          <div className="bg-gray-50 rounded-[2.5rem] p-10 space-y-10 border border-gray-100">
            <div className="text-center space-y-2">
              <h3 className="text-sm font-black text-secondary tracking-widest uppercase">لماذا SF PERFUME؟</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase">التميز في كل تفصيلة</p>
            </div>
            <div className="grid grid-cols-2 gap-y-10 gap-x-6">
              {[
                { title: "أصلي 100%", desc: "ضمان جودة المصنع", icon: ShieldCheck },
                { title: "خدمة راقية", desc: "نلبي تطلعاتك دائماً", icon: Star },
                { title: "أسعار منافسة", desc: "قيمة حقيقية لمالك", icon: Percent },
                { title: "توصيل سريع", desc: "لباب منزلك بالمكلا", icon: MapPin },
              ].map((feature, i) => {
                const Icon = feature.icon
                return (
                  <div key={i} className="flex flex-col items-center text-center gap-3">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-primary border border-gray-50">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[11px] font-black text-secondary">{feature.title}</h4>
                      <p className="text-[9px] text-gray-400 font-bold">{feature.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Simple Footer */}
        <footer className="pt-12 pb-16 px-6 border-t border-gray-50 mt-4">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-xl font-black text-secondary tracking-tighter">SF PERFUME</h2>
              <span className="text-[9px] text-primary font-bold tracking-[0.4em]">LUXURY EXPERIENCE</span>
            </div>
            <div className="flex gap-6">
              {[
                { icon: Instagram, link: "https://instagram.com/sf_perfume20" },
                { icon: Facebook, link: "https://facebook.com/sf_perfume" },
                { icon: Phone, link: "tel:777161451" },
              ].map((social, i) => {
                const Icon = social.icon
                return (
                  <Link key={i} href={social.link} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 transition-all bg-white">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </Link>
                )
              })}
            </div>
            <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">
              All Rights Reserved © 2024 SF PERFUME
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
