"use client"

import { useParams, useRouter } from "next/navigation"
import { PRODUCTS } from "@/lib/mock-data"
import Image from "next/image"
import { ArrowRight, Heart, Share2, MessageCircle, Star, ShieldCheck, Zap, Sparkles, Droplets } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

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
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-32">
      {/* Premium Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center">
        <button 
          onClick={() => router.back()} 
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg border border-gray-100"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
        <div className="flex gap-3">
          <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg border border-gray-100">
            <Share2 className="w-4 h-4" />
          </button>
          <button 
            onClick={toggleFavorite} 
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg border border-gray-100"
          >
            <Heart className={cn("w-4 h-4 transition-colors", isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400')} />
          </button>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative aspect-square w-full bg-white">
        <Image 
          src={product.image} 
          alt={product.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-8 right-8">
          <Badge className="bg-secondary text-white border-none px-6 py-2 rounded-full text-[10px] font-black shadow-2xl">
            {product.size}
          </Badge>
        </div>
      </div>

      {/* Structured Details with Sections */}
      <div className="relative z-10 -mt-10 px-6 space-y-6">
        
        {/* Basic Info Card */}
        <section className="bg-white rounded-[2rem] p-8 luxury-shadow border border-gray-50/50 space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-primary font-black uppercase tracking-[0.2em] text-[11px]">{product.brand}</span>
            <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full">
              <Star className="w-3 h-3 fill-orange-400 text-orange-400" />
              <span className="text-[10px] font-black text-orange-600">4.9</span>
            </div>
          </div>
          <h1 className="text-2xl font-black text-secondary leading-tight">{product.name}</h1>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-black text-secondary">{product.price.toLocaleString()} ر.ي</span>
            {product.oldPrice && (
              <span className="text-sm text-gray-300 line-through font-medium">{product.oldPrice.toLocaleString()} ر.ي</span>
            )}
          </div>
        </section>

        {/* Description Section */}
        <section className="bg-white rounded-[2rem] p-8 luxury-shadow border border-gray-50/50 space-y-4">
          <h3 className="text-[13px] font-black text-secondary flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            وصف العبير
          </h3>
          <p className="text-gray-400 text-[13px] leading-relaxed font-medium">{product.description}</p>
        </section>

        {/* Performance Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-[2rem] luxury-shadow border border-gray-50/50 flex flex-col gap-3">
             <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                <Zap className="w-5 h-5" />
             </div>
             <div>
                <p className="text-[9px] text-gray-400 font-bold uppercase mb-1">الثبات</p>
                <p className="text-[13px] font-black text-secondary">{product.longevity}</p>
             </div>
          </div>
          <div className="bg-white p-6 rounded-[2rem] luxury-shadow border border-gray-50/50 flex flex-col gap-3">
             <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                <Droplets className="w-5 h-5" />
             </div>
             <div>
                <p className="text-[9px] text-gray-400 font-bold uppercase mb-1">الفوحان</p>
                <p className="text-[13px] font-black text-secondary">{product.projection}</p>
             </div>
          </div>
        </div>

        {/* Ingredients Section */}
        <section className="bg-white rounded-[2rem] p-8 luxury-shadow border border-gray-50/50 space-y-4">
          <h3 className="text-[13px] font-black text-secondary">المكونات الأساسية</h3>
          <div className="flex flex-wrap gap-2">
            {product.ingredients.split('،').map((ing, i) => (
              <span key={i} className="bg-gray-50 text-secondary text-[11px] font-bold px-4 py-2 rounded-xl border border-gray-100">
                {ing.trim()}
              </span>
            ))}
          </div>
        </section>

        {/* Best Sellers / Similar */}
        <section className="space-y-4 pt-4">
          <h3 className="text-[13px] font-black text-secondary">منتجات قد تنال إعجابك</h3>
          <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide px-1">
            {PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).map(p => (
              <Link key={p.id} href={`/products/${p.id}`} className="min-w-[140px] group">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-gray-50 luxury-shadow mb-3">
                  <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h4 className="text-[11px] font-bold text-secondary line-clamp-1 mb-1">{p.name}</h4>
                <p className="text-[10px] text-primary font-black">{p.price.toLocaleString()} ر.ي</p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Sticky Bottom Order Button with Gradient shadow */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl z-50 border-t border-gray-100 flex justify-center">
        <Button 
          onClick={handleWhatsApp}
          className="w-full max-w-md h-16 bg-[#25D366] hover:bg-[#1ebd5d] text-white rounded-2xl text-lg font-black gap-3 shadow-[0_10px_30px_-5px_rgba(37,211,102,0.3)] active:scale-95 transition-all"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
          اطلب عبر واتساب الآن
        </Button>
      </div>
    </div>
  )
}
