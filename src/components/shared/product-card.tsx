"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Tag, Maximize2, Award } from "lucide-react"
import { Product } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function ProductCard({ product }: { product: Product }) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setIsFavorite(favorites.some((f: Product) => f.id === product.id))
  }, [product.id])

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    let updated
    if (isFavorite) {
      updated = favorites.filter((f: Product) => f.id !== product.id)
    } else {
      updated = [...favorites, product]
    }
    localStorage.setItem('favorites', JSON.stringify(updated))
    setIsFavorite(!isFavorite)
    window.dispatchEvent(new Event('favorites-updated'))
  }

  return (
    <Link 
      href={`/products/${product.id}`} 
      className="group relative bg-white rounded-[2rem] overflow-hidden border border-gray-100 luxury-shadow flex flex-col transition-all duration-500 hover:shadow-xl"
    >
      {/* Product Image Area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-50/30">
        <Image 
          src={product.image} 
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="100vw"
        />
        
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          {product.isOffer && (
            <Badge className="gold-gradient text-white border-none px-3 py-1 text-[10px] font-black rounded-full shadow-lg">
              عرض خاص
            </Badge>
          )}
        </div>
        
        <button 
          onClick={toggleFavorite}
          className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg z-20 transition-all active:scale-90"
        >
          <Heart 
            className={cn(
              "w-5 h-5 transition-colors", 
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-300'
            )} 
          />
        </button>
      </div>

      {/* Structured Content Area */}
      <div className="p-6 flex flex-col gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <Award className="w-3 h-3" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{product.brand}</span>
          </div>
          <h3 className="text-lg font-black text-secondary leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4 py-2 border-y border-gray-50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
              <Tag className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-400 font-bold uppercase">السعر</span>
              <span className="text-sm font-black text-secondary">{product.price.toLocaleString()} ر.ي</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-400 font-bold uppercase">الحجم</span>
              <span className="text-sm font-black text-secondary">{product.size}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between gap-4 mt-2">
          {product.oldPrice && (
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-300 font-bold uppercase">بدلاً من</span>
              <span className="text-xs text-gray-300 line-through font-bold">{product.oldPrice.toLocaleString()} ر.ي</span>
            </div>
          )}
          <div className="flex-1" />
          <div className="flex items-center gap-3 bg-secondary text-white px-6 py-3 rounded-2xl group-hover:bg-primary transition-colors shadow-lg">
             <span className="text-xs font-black">طلب المنتج</span>
             <ShoppingBag className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}
