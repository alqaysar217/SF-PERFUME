
"use client"

import { Package, Trash2, ChevronLeft, LayoutGrid } from "lucide-react"
import { useRouter } from "next/navigation"

interface DashboardViewProps {
  productsCount: number
  trashCount: number
}

export function DashboardView({ productsCount, trashCount }: DashboardViewProps) {
  const router = useRouter()

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white p-6 rounded-[1.5rem] border border-gray-100 luxury-shadow space-y-4 relative overflow-hidden text-right">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <h2 className="text-lg font-black text-luxury-black">نظام التحكم السحابي</h2>
        <p className="text-gray-400 text-xs font-medium leading-relaxed">إدارة المتجر بالكامل مع حماية البيانات من الحذف المباشر.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-[1.2rem] border border-gray-50 shadow-sm space-y-3 luxury-shadow">
          <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
            <Package className="w-5 h-5" />
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">المنتجات</p>
            <p className="text-lg font-black text-luxury-black">{productsCount}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-[1.2rem] border border-gray-50 shadow-sm space-y-3 luxury-shadow">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
            <Trash2 className="w-5 h-5" />
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">المحذوفات</p>
            <p className="text-lg font-black text-luxury-black">{trashCount}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest text-right px-2">روابط سريعة</h3>
        <div className="grid grid-cols-1 gap-4">
          {[
            { name: "إدارة المنتجات", icon: Package, href: "?tab=products" },
            { name: "إدارة البنرات (Slider)", icon: LayoutGrid, href: "?tab=banners" },
            { name: "إدارة الماركات", icon: Award, iconName: "Award", href: "?tab=brands" },
            { name: "الحسابات البنكية", icon: CreditCard, iconName: "CreditCard", href: "?tab=accounts" },
            { name: "آراء العملاء", icon: Star, iconName: "Star", href: "?tab=reviews" },
            { name: "سلة المحذوفات", icon: Trash2, iconName: "Trash2", href: "?tab=trash" },
          ].map((item: any, i) => {
            const Icon = item.icon || Package
            return (
              <button 
                key={i}
                onClick={() => router.push(`/admin${item.href}`)}
                className="bg-white p-5 rounded-[1.2rem] border border-gray-50 flex items-center justify-between group luxury-shadow"
              >
                <ChevronLeft className="w-5 h-5 text-gray-200" />
                <div className="flex items-center gap-4">
                  <h4 className="text-sm font-black text-luxury-black">{item.name}</h4>
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-primary transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

import { Award, CreditCard, Star } from "lucide-react"
