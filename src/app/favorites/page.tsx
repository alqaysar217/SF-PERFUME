
"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { Product } from "@/lib/mock-data"
import { ProductCard } from "@/components/shared/product-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Product[]>([])
  const [mounted, setMounted] = useState(false)

  const loadFavorites = () => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]')
    setFavorites(favs)
  }

  useEffect(() => {
    setMounted(true)
    loadFavorites()
    window.addEventListener('favorites-updated', loadFavorites)
    return () => window.removeEventListener('favorites-updated', loadFavorites)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col gap-8 p-4 animate-fade-in min-h-screen pb-32">
      {favorites.length > 0 ? (
        <div className="flex flex-col gap-8">
          {favorites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center py-20">
          <div className="w-24 h-24 bg-primary/5 rounded-[2rem] flex items-center justify-center text-primary border border-primary/10">
            <Heart className="w-12 h-12" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-black text-luxury-black">قائمتك فارغة</h2>
            <p className="text-xs text-gray-400 font-medium">لم تقم بإضافة أي عطور لمجموعتك المفضلة بعد.</p>
          </div>
          <Button asChild className="rounded-2xl h-14 px-10 font-black shadow-xl shadow-primary/20 bg-primary text-white">
            <Link href="/products">اكتشف العطور الآن</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
