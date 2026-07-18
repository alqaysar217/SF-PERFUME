
"use client"

import { useState } from "react"
import { Search, SlidersHorizontal, ArrowRight, X } from "lucide-react"
import { PRODUCTS } from "@/lib/mock-data"
import { ProductCard } from "@/components/shared/product-card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function ProductsPage() {
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState("الكل")

  const filtered = PRODUCTS.filter(p => {
    const matchesSearch = p.name.includes(search) || p.brand.includes(search)
    const matchesFilter = activeFilter === "الكل" || 
      (activeFilter === "رجالي" && p.category === 'men') ||
      (activeFilter === "نسائي" && p.category === 'women') ||
      (activeFilter === "ساعات" && p.category === 'watches')
    return matchesSearch && matchesFilter
  })

  return (
    <div className="flex flex-col gap-8 p-4 animate-fade-in pb-32">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <Link href="/" className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-100">
          <ArrowRight className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-black text-luxury-black">المتجر الكامل</h1>
        <div className="w-10" />
      </div>

      {/* Search & Filter Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
          <Input 
            placeholder="ابحث عن عطرك..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 pr-10 rounded-xl border-none bg-white shadow-sm font-medium text-xs"
          />
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <button className="w-12 h-12 bg-luxury-black text-primary rounded-xl shadow-lg flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-[2.5rem] p-8 h-[50vh]">
            <SheetHeader className="mb-8">
              <SheetTitle className="text-right font-black text-xl">تصفية المنتجات</SheetTitle>
            </SheetHeader>
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">التصنيف</p>
                <div className="grid grid-cols-2 gap-3">
                  {["الكل", "رجالي", "نسائي", "ساعات"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveFilter(cat)}
                      className={`h-12 rounded-xl text-xs font-black transition-all border ${
                        activeFilter === cat 
                        ? 'bg-luxury-black text-primary border-luxury-black shadow-lg' 
                        : 'bg-white text-gray-400 border-gray-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <Button className="w-full h-14 rounded-xl bg-primary text-white font-black text-md shadow-xl shadow-primary/20">
                تطبيق الفلتر
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filter Info */}
      <div className="flex items-center justify-between px-1">
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
          عرض: {activeFilter} ({filtered.length} منتج)
        </p>
        {activeFilter !== "الكل" && (
          <button 
            onClick={() => setActiveFilter("الكل")}
            className="text-[10px] font-bold text-primary flex items-center gap-1"
          >
            إعادة تعيين <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Product List - Single Column */}
      <div className="flex flex-col gap-8">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-300">
          <Search className="w-16 h-16 opacity-10" />
          <p className="text-sm font-bold">لم نجد أي منتجات تطابق بحثك</p>
        </div>
      )}
    </div>
  )
