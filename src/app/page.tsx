
"use client"

import { useState, useEffect, useMemo } from "react"
import { MapPin, ShieldCheck, Star, ArrowLeft, Sparkles, User, UserRound, Watch, LayoutGrid, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ProductCard } from "@/components/shared/product-card"
import { cn } from "@/lib/utils"
import { useFirestore } from "@/firebase/provider"
import { collection, query, orderBy, limit } from "firebase/firestore"
import { useCollection } from "@/firebase/firestore/use-collection"

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
  const bannersQuery = useMemo(() => db ? query(collection(db, "banners"), orderBy("createdAt", "desc")) : null, [db])
  
  const { data: products, loading: productsLoading } = useCollection(productsQuery)
  const { data: brands } = useCollection(brandsQuery)
  const { data: banners } = useCollection(bannersQuery)

  useEffect(() => {
    if (banners.length === 0) return
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [banners.length])

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

  const filteredProducts = useMemo(() => {
    if (activeTab === "الكل") return products 
    return products.filter((p: any) => {
      if (activeTab === "عطور رجالية") return p.category === 'men'
      if (activeTab === "عطور نسائية") return p.category === 'women'
      if (activeTab === "ساعات") return p.category === 'watches'
      return true
    })
  }, [products, activeTab])

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
            {banners.length > 0 ? (
              banners.map((img: any, idx: number) => (
                <div key={idx} className={cn("absolute inset-0 transition-opacity duration-1000", currentBanner === idx ? "opacity-100" : "opacity-0")}>
                  <Image src={img.image || "https://picsum.photos/seed/sf/1200/600"} alt={img.title} fill className="object-cover opacity-50" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-center gap-2">
                    <div className="flex items-center gap-2 bg-primary/20 backdrop-blur-sm w-fit px-3 py-1 rounded-full border border-primary/30">
                      <Sparkles className="w-3 h-3 text-primary" />
                      <span className="text-[8px] font-black text-white uppercase tracking-widest">{img.subtitle}</span>
                    </div>
                    <h2 className="text-xl font-black text-white leading-tight">{img.title}</h2>
                  </div>
                </div>
              ))
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white/20 font-black text-xs uppercase tracking-widest">SF PERFUME Slider</p>
              </div>
            )}
            {banners.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                {banners.map((_: any, i: number) => (
                  <div key={i} className={cn("w-1.5 h-1.5 rounded-full transition-all", currentBanner === i ? "bg-primary w-4" : "bg-white/30")} />
                ))}
              </div>
            )}
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

        {/* ... Rest of the sections ... */}
      </main>
    </div>
  )
}
