
"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { Product } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"

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
    <Link href={`/products/${product.id}`} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-50 flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        <Image 
          src={product.image} 
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.isOffer && (
          <Badge className="absolute top-3 right-3 bg-red-500 text-white rounded-lg border-none px-2 py-0.5 text-[10px] font-bold">
            عرض خاص
          </Badge>
        )}
        <button 
          onClick={toggleFavorite}
          className="absolute top-3 left-3 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm z-10 transition-colors"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex justify-between items-start">
          <span className="text-[10px] text-primary font-bold uppercase tracking-wider">{product.brand}</span>
          <span className="text-[10px] text-gray-400">{product.size}</span>
        </div>
        <h3 className="text-sm font-bold text-luxury-black line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
        
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-sm font-black text-luxury-black">{product.price} ر.ي</span>
            {product.oldPrice && (
              <span className="text-[10px] text-gray-400 line-through">{product.oldPrice} ر.ي</span>
            )}
          </div>
          <div className="w-8 h-8 bg-luxury-black text-white rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
            <ShoppingCart className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}
