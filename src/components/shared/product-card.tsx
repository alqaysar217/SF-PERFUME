
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
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col transition-all active:scale-[0.98]"
    >
      {/* Visual Area */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-50">
        <Image 
          src={product.image} 
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="100vw"
        />
        
        <div className="absolute top-3 right-3 z-10">
          {product.isOffer && (
            <Badge className="gold-gradient text-white border-none px-2 py-0.5 text-[9px] font-black rounded-full shadow-md">
              عرض خاص
            </Badge>
          )}
        </div>
        
        <button 
          onClick={toggleFavorite}
          className="absolute top-3 left-3 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md z-20"
        >
          <Heart 
            className={cn(
              "w-4 h-4 transition-colors", 
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-300'
            )} 
          />
        </button>
      </div>

      {/* Content Area - Compact & Organized */}
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-start gap-2">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-primary">
              <Award className="w-3 h-3" strokeWidth={2.5} />
              <span className="text-[9px] font-black uppercase tracking-widest">{product.brand}</span>
            </div>
            <h3 className="text-base font-black text-luxury-black line-clamp-1">
              {product.name}
            </h3>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm font-black text-luxury-black">{product.price.toLocaleString()} ر.ي</span>
            {product.oldPrice && (
              <span className="text-[10px] text-gray-300 line-through font-bold">{product.oldPrice.toLocaleString()} ر.ي</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1 text-gray-400">
                <Maximize2 className="w-3 h-3" />
                <span className="text-[10px] font-bold">{product.size}</span>
             </div>
             <div className="h-3 w-px bg-gray-100" />
             <div className="flex items-center gap-1 text-primary">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-[10px] font-bold">4.9</span>
             </div>
          </div>
          
          <button className="flex items-center gap-2 bg-luxury-black text-primary px-4 py-2 rounded-xl shadow-lg transition-transform active:scale-90">
             <span className="text-[10px] font-black">اطلب الآن</span>
             <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </Link>
  )
}
