
"use client"

import { useParams } from "next/navigation"
import { PRODUCTS } from "@/lib/mock-data"
import Image from "next/image"
import { Heart, Star, ShieldCheck, Zap, Sparkles, Droplets, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ProductCard } from "@/components/shared/product-card"
import { toast } from "@/hooks/use-toast"

export default function ProductDetails() {
  const { id } = useParams()
  const product = PRODUCTS.find(p => p.id === id)
  const [isFavorite, setIsFavorite] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!product) return
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setIsFavorite(favorites.some((f: any) => f.id === product.id))
  }, [product])

  if (!mounted) return null
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
    <div className="flex flex-col min-h-screen bg-background pb-32 animate-fade-in">
      <div className="relative w-full aspect-[4/3] bg-white overflow-hidden">
        <Image src={product.image} alt={product.name} fill className="object-cover" priority />
        <button 
          onClick={toggleFavorite}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg active:scale-90 transition-transform z-10"
        >
          <Heart className={cn("w-5 h-5 transition-colors", isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-300')} />
        </button>
        <div className="absolute bottom-4 right-4">
          <Badge className="bg-luxury-black text-primary border-none px-4 py-1.5 rounded-lg text-[10px] font-black shadow-xl uppercase tracking-widest">
            {product.size}
          </Badge>
        </div>
      </div>

      <div className="relative z-10 -mt-6 px-4 space-y-4">
        <section className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-50 space-y-3">
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
            <span className="text-2xl font-black text-luxury-black">{product.price.toLocaleString()} ر.ي</span>
            {product.oldPrice && (
              <span className="text-xs text-gray-300 line-through font-bold">{product.oldPrice.toLocaleString()} ر.ي</span>
            )}
          </div>
        </section>

        <section className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-50 space-y-3">
          <h3 className="text-[11px] font-black text-luxury-black flex items-center gap-2 uppercase tracking-[0.2em]">
            <ShieldCheck className="w-5 h-5 text-primary" />
            وصف العبير
          </h3>
          <p className="text-gray-500 text-[13px] leading-relaxed font-medium">{product.description}</p>
        </section>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-50 flex items-center gap-4">
             <div className="w-11 h-11 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shrink-0">
                <Zap className="w-5 h-5" />
             </div>
             <div>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">الثبات</p>
                <p className="text-[13px] font-black text-luxury-black">{product.longevity}</p>
             </div>
          </div>
          <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-50 flex items-center gap-4">
             <div className="w-11 h-11 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shrink-0">
                <Droplets className="w-5 h-5" />
             </div>
             <div>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">الفوحان</p>
                <p className="text-[13px] font-black text-luxury-black">{product.projection}</p>
             </div>
          </div>
        </div>

        <section className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-50 space-y-4">
          <h3 className="text-[11px] font-black text-luxury-black uppercase tracking-[0.2em]">المكونات الأساسية</h3>
          <div className="flex flex-wrap gap-2">
            {product.ingredients.split('،').map((ing, i) => (
              <span key={i} className="bg-gray-50 text-luxury-black text-[11px] font-bold px-4 py-2 rounded-xl border border-gray-100">
                {ing.trim()}
              </span>
            ))}
          </div>
        </section>

        <section className="space-y-6 pt-6">
          <h3 className="text-md font-black text-luxury-black px-1">منتجات قد تنال إعجابك</h3>
          <div className="flex flex-col gap-8">
            {PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl z-40 border-t border-gray-100 flex justify-center md:max-w-md md:mx-auto w-full">
        <Button 
          onClick={addToCart}
          className="w-full h-14 bg-luxury-black hover:bg-black text-primary rounded-xl text-md font-black gap-3 shadow-xl active:scale-95 transition-all"
        >
          <Plus className="w-5 h-5" />
          إضافة المنتج للسلة
        </Button>
      </div>
    </div>
  )
}
