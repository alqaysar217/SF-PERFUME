
"use client"

import { useState, useEffect, useMemo } from "react"
import { MapPin, ShieldCheck, Star, ArrowLeft, Sparkles, User, UserRound, Watch, LayoutGrid } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ProductCard } from "@/components/shared/product-card"
import { cn } from "@/lib/utils"
import { useFirestore } from "@/firebase/provider"
import { collection, query, orderBy, limit } from "firebase/firestore"
import { useCollection } from "@/firebase/firestore/use-collection"

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

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true)
  const [activeTab, setActiveTab] = useState("الكل")
  const [currentBanner, setCurrentBanner] = useState(0)
  const db = useFirestore()

  // Firestore Data
  const productsQuery = useMemo(() => db ? query(collection(db, "products"), orderBy("createdAt", "desc"), limit(10)) : null, [db])
  const brandsQuery = useMemo(() => db ? query(collection(db, "brands"), orderBy("name", "asc")) : null, [db])
  
  const { data: products, loading: productsLoading } = useCollection(productsQuery)
  const { data: brands } = useCollection(brandsQuery)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % BANNER_IMAGES.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const hasShownSplash = sessionStorage.getItem('hasShownSplash')
    if (hasShownSplash) {
      setShowSplash(false)
    } else {
      const timer = setTimeout(() => {
        setShowSplash(false)
        sessionStorage.setItem('hasShownSplash', 'true')
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [])

  const filteredProducts = activeTab === "الكل" 
    ? products 
    : products.filter((p: any) => {
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
      <main className="flex flex-col gap-8 pt-6">
        <section className="px-4">
          <div className="relative h-48 rounded-[2rem] overflow-hidden bg-luxury-black shadow-lg">
            {BANNER_IMAGES.map((img, idx) => (
              <div key={idx} className={cn("absolute inset-0 transition-opacity duration-1000", currentBanner === idx ? "opacity-100" : "opacity-0")}>
                <Image src={img.url} alt={img.title} fill className="object-cover opacity-50" />
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
                <div key={i} className={cn("w-1.5 h-1.5 rounded-full transition-all", currentBanner === i ? "bg-primary w-4" : "bg-white/30")} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
            {CATEGORIES_WITH_ICONS.map((cat, i) => {
              const Icon = cat.icon
              return (
                <button
                  key={i}
                  onClick={() => setActiveTab(cat.name)}
                  className={cn(
                    "shrink-0 px-5 py-3 rounded-2xl text-[10px] font-black transition-all flex items-center gap-2 border",
                    activeTab === cat.name 
                      ? "bg-luxury-black text-primary border-luxury-black shadow-lg shadow-black/10 scale-105" 
                      : "bg-white text-gray-400 border-gray-100 hover:bg-gray-50"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </button>
              )
            })}
          </div>
        </section>

        <section className="px-4 space-y-6">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-sm font-black text-luxury-black uppercase tracking-widest">المجموعة المختارة</h3>
            <Link href="/products" className="text-primary text-[11px] font-black flex items-center gap-1">
              مشاهدة الكل <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="flex flex-col gap-8">
            {productsLoading ? (
              <div className="py-20 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" /></div>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="text-center py-10 text-gray-400 font-bold text-xs uppercase tracking-widest">لا توجد منتجات حالياً</div>
            )}
          </div>
        </section>

        <section className="px-4 space-y-6">
          <div className="flex flex-col gap-1 px-1">
            <h3 className="text-sm font-black text-luxury-black uppercase tracking-widest">الماركات العالمية</h3>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide items-center">
            {brands.map((brand: any) => (
              <Link key={brand.id} href={`/products?brand=${brand.name}`} className="shrink-0 group">
                <div className="w-20 h-20 rounded-2xl bg-white border border-gray-100 flex items-center justify-center p-4 shadow-sm group-hover:border-primary transition-all group-active:scale-95">
                  <Image src={brand.logo || "https://picsum.photos/seed/brand/100/100"} alt={brand.name} width={50} height={50} className="grayscale group-hover:grayscale-0 transition-all object-contain" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="px-4">
          <div className="bg-luxury-black rounded-[2.5rem] p-10 space-y-10 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div className="text-center space-y-2 relative z-10">
              <h3 className="text-lg font-black tracking-tight text-primary uppercase tracking-[0.2em]">لماذا SF PERFUME؟</h3>
            </div>
            <div className="grid grid-cols-2 gap-y-10 gap-x-6 relative z-10">
              {[
                { title: "أصلي ١٠٠٪", desc: "ضمان جودة المصنع", icon: ShieldCheck },
                { title: "خدمة راقية", desc: "نلبي تطلعاتك", icon: Star },
                { title: "أسعار منافسة", desc: "قيمة حقيقية", icon: MapPin },
                { title: "توصيل سريع", desc: "لباب منزلك", icon: Sparkles },
              ].map((feature, i) => {
                const Icon = feature.icon
                return (
                  <div key={i} className="flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary border border-white/10">
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

        <footer className="pt-20 pb-16 px-4 border-t border-gray-100 mt-10 text-center space-y-8 bg-gray-50/50">
          <div className="space-y-3">
            <h2 className="text-xl font-black text-luxury-black tracking-tighter">SF PERFUME</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">جميع الحقوق محفوظة © ٢٠٢٤</p>
          </div>
        </footer>
      </main>
    </div>
  )
}

const Loader2 = ({ className }: { className?: string }) => <Loader2Icon className={cn("animate-spin", className)} />
import { Loader2 as Loader2Icon } from "lucide-react"
