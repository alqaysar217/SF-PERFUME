
"use client"

import { Package, Trash2, ChevronLeft, LayoutGrid, Award, CreditCard, Star, Percent } from "lucide-react"
import { useRouter } from "next/navigation"

interface DashboardViewProps {
  productsCount: number
  offersCount: number
  brandsCount: number
}

export function DashboardView({ productsCount, offersCount, brandsCount }: DashboardViewProps) {
  const router = useRouter()

  const adminActions = [
    { name: "إدارة المنتجات", icon: Package, href: "?tab=products" },
    { name: "إدارة البنرات (Slider)", icon: LayoutGrid, href: "?tab=banners" },
    { name: "إدارة الماركات", icon: Award, href: "?tab=brands" },
    { name: "الحسابات البنكية", icon: CreditCard, href: "?tab=accounts" },
    { name: "آراء العملاء", icon: Star, href: "?tab=reviews" },
    { name: "سلة المحذوفات", icon: Trash2, href: "?tab=trash" },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white p-6 rounded-[1.5rem] border border-gray-100 luxury-shadow space-y-4 relative overflow-hidden text-right">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <h2 className="text-lg font-black text-luxury-black">نظام التحكم السحابي</h2>
        <p className="text-gray-400 text-xs font-medium leading-relaxed">إدارة المتجر بالكامل مع حماية البيانات من الحذف المباشر.</p>
      </div>

      {/* Stats Cards - Updated to show 3 columns */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-[1.2rem] border border-gray-50 shadow-sm space-y-3 luxury-shadow flex flex-col items-center">
          <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
            <Package className="w-4 h-4" />
          </div>
          <div className="text-center">
            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">المنتجات</p>
            <p className="text-sm font-black text-luxury-black">{productsCount}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-[1.2rem] border border-gray-50 shadow-sm space-y-3 luxury-shadow flex flex-col items-center">
          <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
            <Percent className="w-4 h-4" />
          </div>
          <div className="text-center">
            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">العروض</p>
            <p className="text-sm font-black text-luxury-black">{offersCount}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-[1.2rem] border border-gray-50 shadow-sm space-y-3 luxury-shadow flex flex-col items-center">
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
            <Award className="w-4 h-4" />
          </div>
          <div className="text-center">
            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">الماركات</p>
            <p className="text-sm font-black text-luxury-black">{brandsCount}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest text-right px-2">روابط سريعة</h3>
        <div className="grid grid-cols-1 gap-4">
          {adminActions.map((item, i) => (
            <button 
              key={i}
              onClick={() => router.push(`/admin${item.href}`)}
              className="bg-white p-5 rounded-[1.2rem] border border-gray-50 flex items-center justify-between group luxury-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:bg-primary/5 transition-all shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-black text-luxury-black">{item.name}</h4>
              </div>
              <ChevronLeft className="w-5 h-5 text-gray-200" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
