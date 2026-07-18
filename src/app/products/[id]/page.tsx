
"use client"

import { useParams, useRouter } from "next/navigation"
import { PRODUCTS } from "@/lib/mock-data"
import Image from "next/image"
import { ArrowRight, Heart, Share2, MessageCircle, Star, ShieldCheck, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState, useEffect } from "react"

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

  if (!product) return <div className="p-10 text-center">المنتج غير موجود</div>

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
    <div className="flex flex-col min-h-screen animate-fade-in bg-white pb-24">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 py-4 flex justify-between items-center">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md">
          <ArrowRight className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md">
            <Share2 className="w-5 h-5" />
          </button>
          <button onClick={toggleFavorite} className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md">
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative aspect-square w-full bg-gray-50">
        <Image 
          src={product.image} 
          alt={product.name}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-6 right-6">
          <Badge className="bg-luxury-black text-white border-none px-5 py-1.5 rounded-full text-xs font-bold shadow-xl">
            {product.size}
          </Badge>
        </div>
      </div>

      {/* Details Body */}
      <div className="flex-1 bg-white -mt-8 rounded-t-[3rem] p-8 space-y-8 relative z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <span className="text-primary font-black uppercase tracking-widest text-sm">{product.brand}</span>
            <div className="flex items-center gap-1 text-orange-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-xs font-bold">4.9</span>
            </div>
          </div>
          <h1 className="text-2xl font-black text-luxury-black">{product.name}</h1>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-black text-luxury-black">{product.price} ر.ي</span>
            {product.oldPrice && (
              <span className="text-sm text-gray-300 line-through">{product.oldPrice} ر.ي</span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-black text-luxury-black border-r-4 border-primary pr-4">وصف المنتج</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{product.description}</p>
        </div>

        {/* Perfume Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-5 rounded-3xl flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">الثبات</p>
              <p className="text-xs font-bold">{product.longevity}</p>
            </div>
          </div>
          <div className="bg-gray-50 p-5 rounded-3xl flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">الفوحان</p>
              <p className="text-xs font-bold">{product.projection}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-black text-luxury-black border-r-4 border-primary pr-4">المكونات</h3>
          <div className="flex flex-wrap gap-2">
            {product.ingredients.split('،').map((ing, i) => (
              <span key={i} className="bg-primary/5 text-primary text-xs font-bold px-4 py-2.5 rounded-xl border border-primary/10">
                {ing.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-around py-8 border-y border-gray-50">
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-green-500" />
            <span className="text-[10px] font-bold">أصلي 100%</span>
          </div>
          <div className="h-10 w-px bg-gray-100" />
          <div className="flex flex-col items-center gap-2">
            <Star className="w-7 h-7 text-primary" />
            <span className="text-[10px] font-bold">الأفضل مبيعاً</span>
          </div>
        </div>

        {/* Similar Products */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-luxury-black">منتجات مشابهة</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).map(p => (
              <div key={p.id} className="min-w-[160px]">
                <Link href={`/products/${p.id}`} className="block space-y-2">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                    <Image src={p.image} alt={p.name} fill className="object-cover" />
                  </div>
                  <h4 className="text-xs font-bold line-clamp-1">{p.name}</h4>
                  <p className="text-[10px] text-primary font-bold">{p.price} ر.ي</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Order Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md z-40 border-t border-gray-100 md:max-w-md md:mx-auto">
        <Button 
          onClick={handleWhatsApp}
          className="w-full h-16 bg-[#25D366] hover:bg-[#1ebd5d] text-white rounded-2xl text-lg font-black gap-3 shadow-xl shadow-green-500/20 active:scale-95 transition-transform"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
          اطلب عبر واتساب الآن
        </Button>
      </div>
    </div>
  )
}
