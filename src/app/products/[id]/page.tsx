
"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import { Heart, Star, ShieldCheck, Zap, Sparkles, Droplets, Plus, MessageCircle, Loader2, ArrowRight, Watch, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect, useMemo } from "react"
import { cn } from "@/lib/utils"
import { ProductCard } from "@/components/shared/product-card"
import { toast } from "@/hooks/use-toast"
import { useFirestore } from "@/firebase/provider"
import { doc, collection, query, where, limit } from "firebase/firestore"
import { useDoc } from "@/firebase/firestore/use-doc"
import { useCollection } from "@/firebase/firestore/use-collection"
import Link from "next/link"

export default function ProductDetails() {
  const { id } = useParams()
  const db = useFirestore()
  const [isFavorite, setIsFavorite] = useState(false)
  
  const productRef = useMemo(() => db && typeof id === 'string' ? doc(db, "products", id) : null, [db, id])
  const { data: product, loading } = useDoc<any>(productRef)

  const productsQuery = useMemo(() => db ? query(collection(db, "products"), limit(50)) : null, [db])
  const { data: allProducts } = useCollection<any>(productsQuery)

  const isWatch = product?.category === 'watches'

  const similarProducts = useMemo(() => {
    if (!allProducts || !product) return [];
    
    const filtered = allProducts.filter(p => p.id !== product.id);
    const sameCategory = filtered.filter(p => p.category === product.category);
    const others = filtered.filter(p => p.category !== product.category);
    
    return [...sameCategory, ...others].slice(0, 4);
  }, [allProducts, product]);

  useEffect(() => {
    if (!product) return
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setIsFavorite(favorites.some((f: any) => f.id === product.id))
  }, [product])

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
      <span className="text-xs font-black text-gray-400">جاري استحضار التفاصيل...</span>
    </div>
  )

  if (!product) return <div className="p-20 text-center font-bold">المنتج غير موجود</div>

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existing = cart.find((item: any) => item.id === product.id)
    
    let updated
    if (existing) {
      updated = cart.map((item: any) => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    } else {
      updated = [...cart, { ...product, quantity: 1 }]
    }
    
    localStorage.setItem('cart', JSON.stringify(updated))
    window.dispatchEvent(new Event('cart-updated'))
    toast({
      title: "تمت الإضافة للسلة",
      description: `يمكنك إكمال الطلب من أيقونة السلة بالأعلى`,
    })
  }

  const directOrder = () => {
    const message = `مرحباً SF PERFUME، أود الاستفسار عن/طلب المنتج التالي:\n\nالمنتج: ${product.name}\nالماركة: ${product.brand}\nالسعر: ${product.price?.toLocaleString()} ر.س\n\nيرجى تزويدي بمزيد من المعلومات.`
    window.open(`https://wa.me/967777161451?text=${encodeURIComponent(message)}`, '_blank')
  }

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    let updated
    if (isFavorite) {
      updated = favorites.filter((f: any) => f.id !== product.id)
    } else {
      updated = [...favorites, product]
    }
    localStorage.setItem('favorites', JSON.stringify(updated))
    setIsFavorite(!isFavorite)
    window.dispatchEvent(new Event('favorites-updated'))
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-48 animate-fade-in">
      <div className="relative w-full aspect-[4/3] bg-white overflow-hidden">
        <Image src={product.image || "https://picsum.photos/seed/placeholder/600/400"} alt={product.name} fill className="object-cover" priority />
        <button 
          onClick={toggleFavorite}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg active:scale-90 transition-transform z-10"
        >
          <Heart className={cn("w-5 h-5 transition-colors", isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-300')} />
        </button>
        {product.size && (
          <div className="absolute bottom-4 right-4">
            <Badge className="bg-luxury-black text-primary border-none px-4 py-1.5 rounded-lg text-[10px] font-black shadow-xl uppercase tracking-widest">
              {product.size}
            </Badge>
          </div>
        )}
      </div>

      <div className="relative z-10 -mt-6 px-4 space-y-4">
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 space-y-3 luxury-shadow">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="w-4 h-4" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">{product.brand}</span>
            </div>
            <div className="flex items-center gap-1 bg-primary/10 px-2.5 py-1 rounded-lg">
              <Star className="w-3.5 h-3.5 fill-primary text-primary" />
              <span className="text-[11px] font-black text-primary">4.9</span>
            </div>
          </div>
          
          <h1 className="text-2xl font-black text-luxury-black leading-tight tracking-tight">{product.name}</h1>
          
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-black text-luxury-black">{product.price?.toLocaleString()} ر.س</span>
            {product.oldPrice && (
              <span className="text-xs text-gray-300 line-through font-bold">{product.oldPrice.toLocaleString()} ر.س</span>
            )}
          </div>
        </section>

        {product.description && (
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 space-y-3 luxury-shadow">
            <h3 className="text-[11px] font-black text-luxury-black flex items-center gap-2 uppercase tracking-[0.2em]">
              {isWatch ? <Info className="w-5 h-5 text-primary" /> : <ShieldCheck className="w-5 h-5 text-primary" />}
              {isWatch ? 'تفاصيل الساعة' : 'وصف العبير'}
            </h3>
            <p className="text-gray-500 text-[13px] leading-relaxed font-medium">{product.description}</p>
          </section>
        )}

        {!isWatch && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-4 luxury-shadow">
               <div className="w-11 h-11 bg-primary/5 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <Zap className="w-5 h-5" />
               </div>
               <div>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">الثبات</p>
                  <p className="text-[13px] font-black text-luxury-black">{product.longevity || 'عالي'}</p>
               </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-4 luxury-shadow">
               <div className="w-11 h-11 bg-primary/5 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <Droplets className="w-5 h-5" />
               </div>
               <div>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">الفوحان</p>
                  <p className="text-[13px] font-black text-luxury-black">{product.projection || 'ممتاز'}</p>
               </div>
            </div>
          </div>
        )}

        {product.ingredients && (
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 space-y-4 luxury-shadow">
            <h3 className="text-[11px] font-black text-luxury-black uppercase tracking-[0.2em] flex items-center gap-2">
              {isWatch ? <Watch className="w-4 h-4 text-primary" /> : <Sparkles className="w-4 h-4 text-primary" />}
              {isWatch ? 'المواصفات الفنية' : 'المكونات الأساسية'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.split('،').map((ing: string, i: number) => (
                <span key={i} className="bg-gray-50 text-luxury-black text-[11px] font-bold px-4 py-2 rounded-xl border border-gray-100">
                  {ing.trim()}
                </span>
              ))}
            </div>
          </section>
        )}

        <section className="space-y-6 pt-6">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-md font-black text-luxury-black uppercase tracking-widest">منتجات قد تعجبك</h3>
            <ArrowRight className="w-4 h-4 text-primary rotate-180" />
          </div>
          <div className="flex flex-col gap-8">
            {similarProducts.length > 0 ? (
              similarProducts.map((p: any) => (
                <ProductCard key={p.id} product={p} />
              ))
            ) : (
              <p className="text-center text-gray-400 text-xs py-10 font-bold">جاري البحث عن منتجات مميزة...</p>
            )}
          </div>
          
          <Button asChild variant="outline" className="w-full h-14 rounded-xl border-gray-100 font-black text-xs gap-2 active:scale-95 transition-all">
            <Link href="/products">
              مشاهدة المزيد من المنتجات
              <ArrowRight className="w-4 h-4 rotate-180" />
            </Link>
          </Button>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-xl z-40 border-t border-gray-100 md:max-w-md md:mx-auto w-full shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div className="flex gap-3">
          <Button 
            onClick={directOrder}
            className="flex-1 h-14 bg-[#25D366] hover:bg-[#1ebd5d] text-white rounded-xl text-sm font-black gap-2 shadow-lg active:scale-95 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            اطلب عبر واتساب
          </Button>
          <Button 
            onClick={addToCart}
            variant="outline"
            className="w-14 h-14 border-luxury-black text-luxury-black rounded-xl p-0 active:scale-95 transition-all flex items-center justify-center hover:bg-gray-50"
            title="إضافة للسلة"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
