
"use client"

import { useState } from "react"
import { Search, SlidersHorizontal, ArrowRight } from "lucide-react"
import { PRODUCTS } from "@/lib/mock-data"
import { ProductCard } from "@/components/shared/product-card"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function ProductsPage() {
  const [search, setSearch] = useState("")

  const filtered = PRODUCTS.filter(p => 
    p.name.includes(search) || p.brand.includes(search)
  )

  return (
    <div className="flex flex-col gap-6 p-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <Link href="/" className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
          <ArrowRight className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-black text-luxury-black">جميع المنتجات</h1>
        <div className="w-10" />
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="ابحث في المتجر..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 pr-10 rounded-2xl border-none shadow-sm"
          />
        </div>
        <button className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary">
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-400">
          <Search className="w-12 h-12 opacity-20" />
          <p className="text-sm font-bold">لا توجد نتائج مطابقة لبحثك</p>
        </div>
      )}
    </div>
  )
}
