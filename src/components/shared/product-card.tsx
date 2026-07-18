"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag } from "lucide-react"
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
      className="group relative bg-white rounded-2xl overflow-hidden luxury-shadow border border-gray-50 flex flex-col transition-all duration-500 hover:-translate-y-1"
    >
      {/* Product Image - Aspect Ratio 3:4 for luxury feel */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50/50">
        <Image 
          src={product.image} 
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        
        {product.isOffer && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="gold-gradient text-white border-none px-2 py-0.5 text-[9px] font-black rounded-lg shadow-sm">
              عرض خاص
            </Badge>
          </div>
        )}
        
        <button 
          onClick={toggleFavorite}
          className="absolute top-3 left-3 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm z-20 transition-all hover:scale-110 active:scale-90"
        >
          <Heart 
            className={cn(
              "w-4 h-4 transition-colors", 
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-300'
            )} 
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1 gap-2.5">
        <div className="flex justify-between items-start">
          <span className="text-[9px] text-primary font-black uppercase tracking-[0.15em]">{product.brand}</span>
          <span className="text-[9px] text-gray-400 font-bold">{product.size}</span>
        </div>
        
        <h3 className="text-[13px] font-bold text-secondary line-clamp-1 group-hover:text-primary transition-colors leading-snug">
          {product.name}
        </h3>
        
        <div className="mt-auto flex items-center justify-between pt-1">
          <div className="flex flex-col">
            <span className="text-sm font-black text-secondary">{product.price.toLocaleString()} ر.ي</span>
            {product.oldPrice && (
              <span className="text-[10px] text-gray-300 line-through font-medium">{product.oldPrice.toLocaleString()} ر.ي</span>
            )}
          </div>
          
          <div className="w-8 h-8 bg-secondary text-white rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-primary shadow-sm group-hover:shadow-primary/20">
            <ShoppingBag className="w-4 h-4" strokeWidth={2} />
          </div>
        </div>
      </div>
    </Link>
  )
}