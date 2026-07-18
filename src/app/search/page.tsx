
"use client"

import { useState } from "react"
import { Search, ArrowRight, SlidersHorizontal, Star, Award, Maximize2 } from "lucide-react"
import { PRODUCTS } from "@/lib/mock-data"
import { ProductCard } from "@/components/shared/product-card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SearchPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = PRODUCTS.filter(product => 
    product.name.includes(searchQuery) || 
    product.brand.includes(searchQuery) ||
    product.category.includes(searchQuery)
  )

  return (
    <div className="flex flex-col min-h-screen bg-background pb-32 animate-fade-in">
      {/* Search Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 p-4 space-y-4">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-luxury-black">
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <Input 
              autoFocus
              placeholder="ابحث عن الماركة أو العطر..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pr-10 rounded-xl border-none bg-gray-100 focus:bg-white transition-all text-sm font-medium"
            />
          </div>
        </div>
      </header>

      <main className="p-6 space-y-6">
        {searchQuery ? (
          <>
            <div className="flex justify-between items-center px-1">
              <h2 className="text-sm font-black text-luxury-black">نتائج البحث ({filteredProducts.length})</h2>
            </div>

            <div className="flex flex-col gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                  <Search className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-black text-luxury-black">لا توجد نتائج</p>
                  <p className="text-xs text-gray-400">جرب البحث بكلمات أخرى مثل "ديور" أو "رجالي"</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-8">
            <section className="space-y-4">
              <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">عمليات بحث شائعة</h3>
              <div className="flex flex-wrap gap-2">
                {["ديور", "شانيل", "عطور رجالية", "ساعات", "عروض"].map((term) => (
                  <button 
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-luxury-black hover:border-primary transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">اقتراحات لك</h3>
              <div className="flex flex-col gap-6">
                {PRODUCTS.slice(0, 3).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  )
}
