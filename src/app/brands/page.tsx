"use client"

import { BRANDS } from "@/lib/mock-data"
import { ArrowRight, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BrandsPage() {
  return (
    <div className="flex flex-col gap-8 p-4 animate-fade-in pb-32">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <Link href="/more" className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-100">
          <ArrowRight className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-black text-luxury-black">الماركات العالمية</h1>
        <div className="w-10" />
      </div>

      <div className="bg-luxury-black p-8 rounded-[2.5rem] flex flex-col items-center gap-4 text-center border border-white/5 shadow-2xl">
        <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
          <Award className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-black text-white">شركاء الفخامة</h2>
          <p className="text-primary text-[10px] font-bold uppercase tracking-widest">Global Luxury Partners</p>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-2 gap-4">
        {BRANDS.map(brand => (
          <Link 
            key={brand.id} 
            href={`/products?brand=${brand.name}`}
            className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm flex flex-col items-center gap-4 active:scale-95 transition-all group"
          >
            <div className="relative w-20 h-20">
              <Image 
                src={brand.logo} 
                alt={brand.name} 
                fill
                className="object-contain grayscale group-hover:grayscale-0 transition-all"
              />
            </div>
            <span className="text-sm font-black text-luxury-black">{brand.name}</span>
          </Link>
        ))}
      </div>

      {BRANDS.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-300 text-center">
          <Award className="w-16 h-16 opacity-10" />
          <p className="text-sm font-bold">لا توجد ماركات مسجلة حالياً</p>
        </div>
      )}
    </div>
  )
}
