
"use client"

import { useState, useEffect } from "react"
import { Heart, ShoppingBag, ArrowRight } from "lucide-react"
import { Product } from "@/lib/mock-data"
import { ProductCard } from "@/components/shared/product-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Product[]>([])

  const loadFavorites = () => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]')
    setFavorites(favs)
  }

  useEffect(() => {
    loadFavorites()
    window.addEventListener('favorites-updated', loadFavorites)
    return () => window.removeEventListener('favorites-updated', loadFavorites)
  }, [])

  return (
    <div className="flex flex-col gap-6 p-4 animate-in fade-in duration-500 min-h-screen">
      <div className="flex items-center justify-between">
        <Link href="/" className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
          <ArrowRight className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-black text-luxury-black">المفضلة</h1>
        <div className="w-10" />
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {favorites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center py-20">
          <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center text-primary">
            <Heart className="w-12 h-12" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-black text-luxury-black">قائمتك فارغة</h2>
            <p className="text-sm text-gray-400">لم تقم بإضافة أي منتجات للمفضلة بعد.</p>
          </div>
          <Button asChild className="rounded-2xl h-14 px-10 font-black">
            <Link href="/products">تصفح المنتجات الآن</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
