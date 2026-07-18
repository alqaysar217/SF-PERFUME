
"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, ShieldCheck, Star, ArrowLeft, Percent, Instagram, Facebook, Phone } from "lucide-react"
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
      <div className="fixed inset-0 z-[100] luxury-gradient flex flex-col items-center justify-center gap-6 animate-in fade-in duration-500">
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl animate-pulse relative">
          <div className="absolute inset-0 border-4 border-primary rounded-full animate-spin [animation-duration:3s]"></div>
          <span className="text-luxury-black font-black text-2xl tracking-tighter">SF</span>
        </div>
        <div className="text-center space-y-1">
          <h1 className="text-white text-3xl font-black tracking-[0.2em]">SF PERFUME</h1>
          <p className="text-primary text-xs font-bold uppercase tracking-widest">Luxury Fragrance</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-24">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 px-4 py-4 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-luxury-black rounded-xl flex items-center justify-center overflow-hidden relative border border-primary/20">
            <Image 
              src="https://picsum.photos/seed/brand/200/200" 
              alt="SF Logo" 
              fill 
              className="object-cover"
              data-ai-hint="luxury brand"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tighter text-luxury-black">SF PERFUME</h1>
            <div className="flex items-center gap-1 text-[8px] text-gray-400 font-bold uppercase">
              <MapPin className="w-2 h-2 text-primary" />
              حضرموت - المكلا
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/search">
            <Search className="w-6 h-6 text-luxury-black" />
          </Link>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="px-4">
        <div className="relative h-48 rounded-[2rem] overflow-hidden luxury-gradient group">
          <Image 
            src="https://picsum.photos/seed/sf1/1200/600" 
            alt="Hero Banner"
            fill
            className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 p-8 flex flex-col justify-center gap-2">
            <Badge className="w-fit bg-primary text-white border-none mb-2">جديدنا</Badge>
            <h2 className="text-2xl font-black text-white leading-tight">مجموعة الشتاء <br />الفاخرة 2024</h2>
            <p className="text-white/70 text-xs">اكتشف أرقى العطور العالمية المختارة لك بعناية.</p>
          </div>
        </div>
      </section>

      {/* Quick Search */}
      <section className="px-4 -mt-10 relative z-10">
        <Link href="/search" className="block">
          <div className="bg-white h-14 rounded-2xl shadow-xl flex items-center px-6 gap-4 border border-gray-50 luxury-border">
            <Search className="w-5 h-5 text-primary" />
            <span className="text-gray-400 text-sm">عن ماذا تبحث اليوم؟</span>
          </div>
        </Link>
      </section>

      {/* Categories */}
      <section className="px-4">
        <h3 className="text-lg font-black text-luxury-black mb-4">الأقسام</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { name: "عطور رجالية", icon: "♂️", color: "bg-blue-50", link: "/products?cat=men" },
            { name: "عطور نسائية", icon: "♀️", color: "bg-pink-50", link: "/products?cat=women" },
            { name: "ساعات فاخرة", icon: "⌚", color: "bg-orange-50", link: "/products?cat=watches" },
          ].map((cat, i) => (
            <Link key={i} href={cat.link} className={`${cat.color} p-4 rounded-3xl flex flex-col items-center gap-2 border border-white transition-transform active:scale-95`}>
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-[10px] font-black text-luxury-black text-center">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Products */}
      <section className="px-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-black text-luxury-black">أحدث المنتجات</h3>
          <Link href="/products" className="text-primary text-xs font-bold flex items-center gap-1">
            مشاهدة الكل <ArrowLeft className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {PRODUCTS.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Global Brands */}
      <section className="px-4">
        <h3 className="text-lg font-black text-luxury-black mb-4">الماركات العالمية</h3>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide items-center">
          {BRANDS.map(brand => (
            <Link key={brand.id} href={`/brands/${brand.id}`} className="shrink-0 group">
              <div className="w-16 h-16 rounded-full bg-white border border-gray-100 flex items-center justify-center p-2 shadow-sm group-hover:border-primary transition-colors">
                <Image src={brand.logo} alt={brand.name} width={40} height={40} className="grayscale group-hover:grayscale-0 transition-all rounded-full" />
              </div>
              <p className="text-[10px] text-center mt-2 font-bold text-gray-500">{brand.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Us? */}
      <section className="px-4">
        <div className="bg-primary/5 rounded-[2.5rem] p-8 space-y-6 border border-primary/10">
          <h3 className="text-lg font-black text-luxury-black text-center">لماذا SF PERFUME؟</h3>
          <div className="grid grid-cols-2 gap-6">
            {[
              { title: "أصلي 100%", desc: "ضمان جودة المصنع", icon: ShieldCheck },
              { title: "خدمة راقية", desc: "نلبي تطلعاتك دائماً", icon: Star },
              { title: "أسعار منافسة", desc: "قيمة حقيقية لمالك", icon: Percent },
              { title: "توصيل سريع", desc: "لباب منزلك بالمكلا", icon: MapPin },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xs font-black text-luxury-black">{feature.title}</h3>
                  <p className="text-[9px] text-gray-400">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 pt-12 pb-8 px-4 mt-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex flex-col">
            <h2 className="text-2xl font-black text-luxury-black tracking-tighter">SF PERFUME</h2>
            <span className="text-[10px] text-primary font-bold tracking-[0.3em]">LUXURY FRAGRANCE</span>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
            متجركم الأول في حضرموت للأناقة والتميز. نوفر لكم تشكيلة مختارة من أرقى العطور العالمية والساعات الفاخرة.
          </p>
          <div className="flex gap-4">
            {[
              { icon: Instagram, link: "https://instagram.com/sf_perfume20" },
              { icon: Facebook, link: "https://facebook.com/sf_perfume" },
              { icon: Phone, link: "tel:777161451" },
            ].map((social, i) => {
              const Icon = social.icon
              return (
                <Link key={i} href={social.link} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary transition-colors">
                  <Icon className="w-5 h-5" />
                </Link>
              )
            })}
          </div>
          <p className="text-[10px] text-gray-300 font-bold border-t border-gray-50 pt-4 w-full">
            جميع الحقوق محفوظة لـ SF PERFUME © 2024
          </p>
        </div>
      </footer>
    </div>
  )
}
