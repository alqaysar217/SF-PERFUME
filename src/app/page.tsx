
"use client"

import { useState, useEffect, useMemo } from "react"
import { LayoutGrid, User, UserRound, Watch, Sparkles, ArrowLeft, Loader2, Star, Quote, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ProductCard } from "@/components/shared/product-card"
import { cn } from "@/lib/utils"
import { useFirestore } from "@/firebase/provider"
import { collection, query, orderBy, limit } from "firebase/firestore"
import { useCollection } from "@/firebase/firestore/use-collection"

const CATEGORIES_WITH_ICONS = [
  { name: "الكل", icon: LayoutGrid, id: 'all' },
  { name: "عطور رجالية", icon: User, id: 'men' },
  { name: "عطور نسائية", icon: UserRound, id: 'women' },
  { name: "ساعات", icon: Watch, id: 'watches' },
]

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true)
  const [activeTab, setActiveTab] = useState("الكل")
  const [currentBanner, setCurrentBanner] = useState(0)
  const db = useFirestore()

  // استعلامات Firestore الحقيقية
  const productsQuery = useMemo(() => db ? query(collection(db, "products"), orderBy("createdAt", "desc"), limit(5)) : null, [db])
  const brandsQuery = useMemo(() => db ? query(collection(db, "brands"), orderBy("name", "asc")) : null, [db])
  const bannersQuery = useMemo(() => db ? query(collection(db, "banners"), orderBy("createdAt", "desc")) : null, [db])
  const reviewsQuery = useMemo(() => db ? query(collection(db, "reviews"), orderBy("createdAt", "desc"), limit(3)) : null, [db])
  
  const { data: products, loading: productsLoading } = useCollection<any>(productsQuery)
  const { data: brands, loading: brandsLoading } = useCollection<any>(brandsQuery)
  const { data: banners } = useCollection<any>(bannersQuery)
  const { data: reviews, loading: reviewsLoading } = useCollection<any>(reviewsQuery)

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
        {/* البنر المتحرك */}
        <section className="px-4">
          <div className="relative h-48 rounded-xl overflow-hidden bg-luxury-black shadow-lg border border-gray-100/10">
            {banners.length > 0 ? (
              banners.map((banner: any, idx: number) => (
                <div key={idx} className={cn("absolute inset-0 transition-opacity duration-1000", currentBanner === idx ? "opacity-100" : "opacity-0")}>
                  <Image 
                    src={banner.image || "https://picsum.photos/seed/sf/1200/600"} 
                    alt={banner.title} 
                    fill 
                    className="object-cover opacity-60" 
                  />
                  <div className="absolute inset-0 p-8 flex flex-col justify-center gap-2">
                    <div className="flex items-center gap-2 bg-primary/20 backdrop-blur-sm w-fit px-3 py-1 rounded-full border border-primary/30">
                      <Sparkles className="w-3 h-3 text-primary" />
                      <span className="text-[8px] font-black text-white uppercase tracking-widest">{banner.subtitle || 'حصري'}</span>
                    </div>
                    <h2 className="text-xl font-black text-white leading-tight">{banner.title}</h2>
                  </div>
                </div>
              ))
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white/20 font-black text-xs uppercase tracking-widest text-center">SF PERFUME Collection</p>
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

        {/* أقسام المتجر */}
        <section className="px-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
            {CATEGORIES_WITH_ICONS.map((cat, i) => {
              const Icon = cat.icon
              return (
                <button
                  key={i}
                  onClick={() => setActiveTab(cat.name)}
                  className={cn(
                    "shrink-0 px-5 py-3 rounded-xl text-[10px] font-black transition-all flex items-center gap-2 border",
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

        {/* قائمة المنتجات (أحدث 5) */}
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
              <>
                {filteredProducts.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
                <Link 
                  href="/products" 
                  className="w-full h-14 bg-white border border-gray-100 rounded-xl flex items-center justify-center gap-3 text-luxury-black font-black text-xs shadow-sm hover:bg-gray-50 active:scale-95 transition-all mt-4"
                >
                  تصفح كافة المنتجات
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </>
            ) : (
              <div className="text-center py-10 text-gray-400 font-bold text-xs uppercase tracking-widest">لا توجد منتجات حالياً</div>
            )}
          </div>
        </section>

        {/* الماركات العالمية (في الأسفل) */}
        <section className="px-4 space-y-4 pt-4 pb-12">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-[10px] font-black text-luxury-black uppercase tracking-widest">الماركات العالمية</h3>
            <Link href="/brands" className="text-primary text-[10px] font-black flex items-center gap-1">
              المزيد <ArrowLeft className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2">
            {brandsLoading ? (
              <div className="flex gap-4 w-full justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
            ) : brands.length > 0 ? (
              brands.map((brand: any) => (
                <Link key={brand.id} href={`/products?brand=${brand.name}`} className="shrink-0 flex flex-col items-center gap-2 group">
                  <div className="w-16 h-16 bg-white rounded-xl border border-gray-100 flex items-center justify-center p-2 shadow-sm transition-transform active:scale-95">
                    <div className="relative w-full h-full">
                      <Image 
                        src={brand.logo || brand.image || "https://picsum.photos/seed/brand/200/200"} 
                        alt={brand.name} 
                        fill 
                        className="object-contain grayscale group-hover:grayscale-0 transition-all" 
                      />
                    </div>
                  </div>
                  <span className="text-[9px] font-black text-gray-400 group-hover:text-luxury-black transition-colors">{brand.name}</span>
                </Link>
              ))
            ) : (
              <div className="text-center py-4 w-full text-gray-300 font-bold text-[10px]">لا توجد ماركات مسجلة</div>
            )}
          </div>
        </section>

        {/* آراء العملاء */}
        <section className="px-4 pb-12 space-y-6">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-sm font-black text-luxury-black uppercase tracking-widest">آراء العملاء</h3>
            <div className="flex items-center gap-1 text-primary">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-[11px] font-black">4.9 / 5</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {reviewsLoading ? (
              <div className="py-10 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" /></div>
            ) : reviews.length > 0 ? (
              reviews.map((review: any) => (
                <div key={review.id} className="bg-white p-6 rounded-xl border border-gray-50 shadow-sm space-y-4 relative overflow-hidden">
                  <Quote className="absolute top-4 left-4 w-8 h-8 text-primary/5 -scale-x-100" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-primary border border-gray-100 overflow-hidden relative">
                      {review.image ? (
                         <Image src={review.image} alt={review.name} fill className="object-cover" />
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                    </div>
                    <div className="text-right">
                      <h4 className="text-xs font-black text-luxury-black">{review.name}</h4>
                      <div className="flex gap-0.5 mt-0.5 justify-end">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={cn("w-2.5 h-2.5", i < (review.rating || 5) ? "fill-primary text-primary" : "text-gray-200")} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium leading-relaxed italic pr-2 text-right">
                    "{review.content}"
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-300 font-bold text-[10px] uppercase tracking-widest">نعتز دائماً برأيكم</div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
