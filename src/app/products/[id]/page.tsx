
"use client"

import { useParams, useRouter } from "next/navigation"
import { PRODUCTS } from "@/lib/mock-data"
import Image from "next/image"
import { ArrowRight, Heart, Share2, MessageCircle, Star, ShieldCheck, Zap, Sparkles, Droplets, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ProductCard } from "@/components/shared/product-card"

export default function ProductDetails() {
  const { id } = useParams()
  const router = useRouter()
  const product = PRODUCTS.find(p => p.id === id)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (!product) return
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setIsFavorite(favorites.some((f: any) => f.id === product.id))
  }, [product])

  if (!product) return <div className="p-20 text-center font-bold">المنتج غير موجود</div>

  const handleWhatsApp = () => {
    const text = `مرحباً SF PERFUME، أريد طلب المنتج: ${product.name} - الماركة: ${product.brand} - السعر: ${product.price} ر.ي`
    window.open(`https://wa.me/967777161451?text=${encodeURIComponent(text)}`, '_blank')
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
      {/* Top Bar Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 py-4 flex justify-between items-center pointer-events-none">
        <button 
          onClick={() => router.back()} 
          className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg border border-gray-100 pointer-events-auto active:scale-90 transition-transform"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
        <div className="flex gap-2 pointer-events-auto">
          <button className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg border border-gray-100 active:scale-90 transition-transform">
            <Share2 className="w-4 h-4" />
          </button>
          <button 
            onClick={toggleFavorite} 
            className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg border border-gray-100 active:scale-90 transition-transform"
          >
            <Heart className={cn("w-4 h-4 transition-colors", isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-300')} />
          </button>
        </div>
      </div>

      {/* Hero Section - Optimized height for mobile */}
      <div className="relative w-full aspect-[4/3] bg-white overflow-hidden">
        <Image 
          src={product.image} 
          alt={product.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-4 right-4">
          <Badge className="bg-luxury-black text-primary border-none px-4 py-1.5 rounded-lg text-[10px] font-black shadow-xl">
            {product.size}
          </Badge>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 -mt-6 px-4 space-y-4">
        
        {/* Main Info Card */}
        <section className="bg-white rounded-2xl p-5 luxury-shadow border border-gray-50 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] font-black uppercase tracking-widest">{product.brand}</span>
            </div>
            <div className="flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-md">
              <Star className="w-3 h-3 fill-primary text-primary" />
              <span className="text-[10px] font-black text-primary">4.9</span>
            </div>
          </div>
          
          <h1 className="text-xl font-black text-luxury-black leading-tight">{product.name}</h1>
          
          <div className="flex items-baseline gap-3">
            <span className="text-xl font-black text-luxury-black">{product.price.toLocaleString()} ر.ي</span>
            {product.oldPrice && (
              <span className="text-xs text-gray-300 line-through font-bold">{product.oldPrice.toLocaleString()} ر.ي</span>
            )}
          </div>
        </section>

        {/* Description Section */}
        <section className="bg-white rounded-2xl p-5 luxury-shadow border border-gray-50 space-y-2">
          <h3 className="text-[11px] font-black text-luxury-black flex items-center gap-2 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-primary" />
            وصف العبير
          </h3>
          <p className="text-gray-500 text-[12px] leading-relaxed font-medium">{product.description}</p>
        </section>

        {/* Performance Grid - Compact inline layout */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-2xl luxury-shadow border border-gray-50 flex items-center gap-3">
             <div className="w-9 h-9 bg-primary/5 rounded-lg flex items-center justify-center text-primary shrink-0">
                <Zap className="w-4 h-4" />
             </div>
             <div>
                <p className="text-[8px] text-gray-400 font-bold uppercase">الثبات</p>
                <p className="text-[12px] font-black text-luxury-black">{product.longevity}</p>
             </div>
          </div>
          <div className="bg-white p-4 rounded-2xl luxury-shadow border border-gray-50 flex items-center gap-3">
             <div className="w-9 h-9 bg-primary/5 rounded-lg flex items-center justify-center text-primary shrink-0">
                <Droplets className="w-4 h-4" />
             </div>
             <div>
                <p className="text-[8px] text-gray-400 font-bold uppercase">الفوحان</p>
                <p className="text-[12px] font-black text-luxury-black">{product.projection}</p>
             </div>
          </div>
        </div>

        {/* Ingredients Section */}
        <section className="bg-white rounded-2xl p-5 luxury-shadow border border-gray-50 space-y-3">
          <h3 className="text-[11px] font-black text-luxury-black uppercase tracking-wider">المكونات الأساسية</h3>
          <div className="flex flex-wrap gap-1.5">
            {product.ingredients.split('،').map((ing, i) => (
              <span key={i} className="bg-gray-50 text-luxury-black text-[10px] font-bold px-3 py-1.5 rounded-lg border border-gray-100">
                {ing.trim()}
              </span>
            ))}
          </div>
        </section>

        {/* Similar Products - Using consistent ProductCard */}
        <section className="space-y-4 pt-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-[13px] font-black text-luxury-black">منتجات قد تنال إعجابك</h3>
          </div>
          <div className="flex flex-col gap-6">
            {PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>

      {/* Sticky Bottom Order Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl z-50 border-t border-gray-100 flex justify-center">
        <Button 
          onClick={handleWhatsApp}
          className="w-full max-w-md h-14 bg-[#25D366] hover:bg-[#1ebd5d] text-white rounded-xl text-md font-black gap-3 shadow-lg active:scale-95 transition-all"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          اطلب عبر واتساب الآن
        </Button>
      </div>
    </div>
  )
}
