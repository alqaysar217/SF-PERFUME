"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, ShieldCheck, Star, ArrowLeft, Percent, Instagram, Facebook, Phone, LayoutGrid } from "lucide-react"
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
      <div className="fixed inset-0 z-[100] bg-[#111111] flex flex-col items-center justify-center gap-6">
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
      {/* Header - Global Standard 64px height */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 h-16 px-6 flex items-center justify-between border-b border-gray-50/50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center overflow-hidden border border-primary/10 shadow-sm">
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
        
        <Link href="/search" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-secondary transition-colors hover:bg-gray-100">
          <Search className="w-5 h-5" strokeWidth={1.5} />
        </Link>
      </header>

      {/* Main Content with Consistent Spacing (8-point grid) */}
      <main className="flex flex-col gap-8 pt-6">
        
        {/* Banner Section - 24px Top Padding */}
        <section className="px-6">
          <div className="relative h-44 rounded-[1.5rem] overflow-hidden dark-gradient group shadow-lg">
            <Image 
              src="https://picsum.photos/seed/sf1/1200/600" 
              alt="Luxury Banner"
              fill
              className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000"
              data-ai-hint="luxury perfume"
            />
            <div className="absolute inset-0 p-8 flex flex-col justify-center gap-2">
              <Badge className="w-fit gold-gradient text-white border-none mb-1 text-[10px] font-black px-3 py-1">جديدنا</Badge>
              <h2 className="text-xl font-black text-white leading-tight">مجموعة الشتاء <br />الفاخرة 2024</h2>
              <p className="text-white/60 text-[10px] font-medium max-w-[200px]">اكتشف أرقى العطور العالمية المختارة لك بعناية.</p>
            </div>
          </div>
        </section>

        {/* Floating Search - 32px Vertical Gap */}
        <section className="px-6 relative z-10">
          <Link href="/search" className="block">
            <div className="bg-white h-14 rounded-2xl shadow-xl shadow-black/5 flex items-center px-6 gap-4 border border-gray-50 luxury-border transition-transform active:scale-95">
              <Search className="w-5 h-5 text-primary" strokeWidth={2} />
              <span className="text-gray-400 text-sm font-medium">عن ماذا تبحث اليوم؟</span>
            </div>
          </Link>
        </section>

        {/* Categories - 32px Vertical Gap */}
        <section className="px-6 space-y-4">
          <h3 className="text-sm font-black text-secondary tracking-wide flex items-center gap-2">
            <LayoutGrid className="w-4 h-4 text-primary" />
            تصفح الأقسام
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: "عطور رجالية", icon: "♂️", color: "bg-blue-50/30", link: "/products?cat=men" },
              { name: "عطور نسائية", icon: "♀️", color: "bg-pink-50/30", link: "/products?cat=women" },
              { name: "ساعات فاخرة", icon: "⌚", color: "bg-orange-50/30", link: "/products?cat=watches" },
            ].map((cat, i) => (
              <Link key={i} href={cat.link} className={`${cat.color} p-4 rounded-2xl flex flex-col items-center gap-3 border border-gray-100/50 transition-all hover:shadow-md active:scale-95`}>
                <span className="text-xl">{cat.icon}</span>
                <span className="text-[10px] font-bold text-secondary text-center leading-none">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Products Grid - 32px Vertical Gap */}
        <section className="px-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-secondary">أحدث المنتجات</h3>
            <Link href="/products" className="text-primary text-[11px] font-bold flex items-center gap-1 hover:underline">
              مشاهدة الكل <ArrowLeft className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {PRODUCTS.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Global Brands - 32px Vertical Gap */}
        <section className="px-6 space-y-4">
          <h3 className="text-sm font-black text-secondary">الماركات العالمية</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide items-center">
            {BRANDS.map(brand => (
              <Link key={brand.id} href={`/brands/${brand.id}`} className="shrink-0 flex flex-col items-center gap-3 group">
                <div className="w-16 h-16 rounded-full bg-white border border-gray-100 flex items-center justify-center p-2 shadow-sm group-hover:border-primary transition-all duration-300">
                  <Image src={brand.logo} alt={brand.name} width={40} height={40} className="grayscale group-hover:grayscale-0 transition-all rounded-full" />
                </div>
                <p className="text-[9px] font-bold text-gray-400 group-hover:text-primary transition-colors">{brand.name}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Features - 40px Vertical Gap */}
        <section className="px-6">
          <div className="bg-gray-50/50 rounded-[2rem] p-8 space-y-8 border border-gray-100">
            <h3 className="text-sm font-black text-secondary text-center uppercase tracking-widest">لماذا SF PERFUME؟</h3>
            <div className="grid grid-cols-2 gap-y-8 gap-x-4">
              {[
                { title: "أصلي 100%", desc: "ضمان جودة المصنع", icon: ShieldCheck },
                { title: "خدمة راقية", desc: "نلبي تطلعاتك دائماً", icon: Star },
                { title: "أسعار منافسة", desc: "قيمة حقيقية لمالك", icon: Percent },
                { title: "توصيل سريع", desc: "لباب منزلك بالمكلا", icon: MapPin },
              ].map((feature, i) => {
                const Icon = feature.icon
                return (
                  <div key={i} className="flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-primary border border-gray-50">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[11px] font-black text-secondary leading-none">{feature.title}</h4>
                      <p className="text-[9px] text-gray-400 font-medium">{feature.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Footer - Social & Credits */}
        <footer className="bg-white pt-12 pb-16 px-6 border-t border-gray-50 mt-4">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-xl font-black text-secondary tracking-tighter">SF PERFUME</h2>
              <span className="text-[9px] text-primary font-bold tracking-[0.4em]">LUXURY EXPERIENCE</span>
            </div>
            <p className="text-gray-400 text-[11px] font-medium leading-relaxed max-w-[280px]">
              متجركم الأول في حضرموت للأناقة والتميز. نوفر لكم تشكيلة مختارة من أرقى العطور العالمية والساعات الفاخرة.
            </p>
            <div className="flex gap-6">
              {[
                { icon: Instagram, link: "https://instagram.com/sf_perfume20" },
                { icon: Facebook, link: "https://facebook.com/sf_perfume" },
                { icon: Phone, link: "tel:777161451" },
              ].map((social, i) => {
                const Icon = social.icon
                return (
                  <Link key={i} href={social.link} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 transition-all hover:text-primary hover:border-primary/20 bg-white">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </Link>
                )
              })}
            </div>
            <div className="w-full border-t border-gray-50 pt-6">
               <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">
                All Rights Reserved © 2024 SF PERFUME
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}