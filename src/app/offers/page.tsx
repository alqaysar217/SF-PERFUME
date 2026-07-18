"use client"

import { PRODUCTS } from "@/lib/mock-data"
import { ProductCard } from "@/components/shared/product-card"
import { ArrowRight, Percent } from "lucide-react"
import Link from "next/link"

export default function OffersPage() {
  const offers = PRODUCTS.filter(p => p.isOffer)

  return (
    <div className="flex flex-col gap-8 p-4 animate-in fade-in duration-500 pb-32">
      <div className="flex items-center justify-between">
        <Link href="/" className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-100">
          <ArrowRight className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-black text-luxury-black">العروض الحصرية</h1>
        <div className="w-10" />
      </div>

      <div className="bg-primary/10 p-8 rounded-[2.5rem] flex flex-col items-center gap-4 text-center border border-primary/20">
        <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
          <Percent className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-black text-luxury-black">وفر أكثر مع عروضنا</h2>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Exclusive Luxury Deals</p>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {offers.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {offers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-300">
          <Percent className="w-16 h-16 opacity-10" />
          <p className="text-sm font-bold">لا توجد عروض حصرية حالياً</p>
        </div>
      )}
    </div>
  )
}
