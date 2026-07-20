
"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, Award, Star, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

export function ProductCard({ product }: { product: any }) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setIsFavorite(favorites.some((f: any) => f.id === product.id))
  }, [product.id])

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
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

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault()
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
      title: "تمت الإضافة",
      description: `تمت إضافة ${product.name} إلى السلة`,
    })
  }

  const imageSrc = product.image && product.image.trim() !== "" 
    ? product.image 
    : "https://picsum.photos/seed/product/600/400"

  return (
    <Link 
      href={`/products/${product.id}`} 
      className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm flex flex-col transition-all active:scale-[0.98] luxury-shadow"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-50">
        <Image 
          src={imageSrc} 
          alt={product.name || "Product Image"}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 400px"
          priority={false}
        />
        <div className="absolute top-3 right-3 z-10">
          {product.isOffer && (
            <Badge className="gold-gradient text-white border-none px-3 py-1 text-[9px] font-black rounded-full shadow-md">
              عرض خاص
            </Badge>
          )}
        </div>
        <button 
          onClick={toggleFavorite}
          className="absolute top-3 left-3 w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md z-20 active:scale-90"
        >
          <Heart 
            className={cn(
              "w-4 h-4 transition-colors", 
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-300'
            )} 
          />
        </button>
      </div>

      <div className="p-5 space-y-4 text-right">
        <div className="flex justify-between items-start gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-primary">
              <Award className="w-3.5 h-3.5" strokeWidth={2.5} />
              <span className="text-[10px] font-black uppercase tracking-widest">{product.brand}</span>
            </div>
            <h3 className="text-base font-black text-luxury-black line-clamp-1">
              {product.name}
            </h3>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-base font-black text-luxury-black">{product.price?.toLocaleString()} ر.س</span>
            {product.oldPrice && (
              <span className="text-[10px] text-gray-300 line-through font-bold">{product.oldPrice.toLocaleString()} ر.س</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1.5 text-gray-400">
                <span className="text-[10px] font-bold">{product.size}</span>
             </div>
             <div className="h-4 w-px bg-gray-100" />
             <div className="flex items-center gap-1.5 text-primary">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-[10px] font-bold">4.9</span>
             </div>
          </div>
          
          <button 
            onClick={addToCart}
            className="flex items-center gap-2 bg-luxury-black text-primary px-5 py-2.5 rounded-lg shadow-lg transition-all active:scale-90 hover:shadow-primary/10"
          >
             <span className="text-[10px] font-black uppercase tracking-wider">أضف للسلة</span>
             <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  )
}
