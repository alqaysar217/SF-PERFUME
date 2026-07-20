
"use client"

import { Package, Trash2, ChevronLeft, LayoutGrid, Award, CreditCard, Star, Percent, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

interface DashboardViewProps {
  productsCount: number
  offersCount: number
  brandsCount: number
}

export function DashboardView({ productsCount, offersCount, brandsCount }: DashboardViewProps) {
  const router = useRouter()

  const data = [
    { name: 'المنتجات', value: productsCount, color: '#C9A227' },
    { name: 'العروض', value: offersCount, color: '#f97316' },
    { name: 'الماركات', value: brandsCount, color: '#3b82f6' },
  ];

  const adminActions = [
    { name: "إدارة المنتجات", icon: Package, href: "?tab=products" },
    { name: "إدارة البنرات (Slider)", icon: LayoutGrid, href: "?tab=banners" },
    { name: "إدارة الماركات", icon: Award, href: "?tab=brands" },
    { name: "الحسابات البنكية", icon: CreditCard, href: "?tab=accounts" },
    { name: "آراء العملاء", icon: Star, href: "?tab=reviews" },
    { name: "سلة المحذوفات", icon: Trash2, href: "?tab=trash" },
  ]

  return (
    <div className="space-y-8 animate-fade-in text-right">
      <div className="bg-white p-6 rounded-xl border border-gray-100 luxury-shadow space-y-4 relative overflow-hidden text-right">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <h2 className="text-lg font-black text-luxury-black">نظام التحكم السحابي</h2>
        <p className="text-gray-400 text-xs font-medium leading-relaxed">إدارة المتجر بالكامل مع حماية البيانات من الحذف المباشر.</p>
      </div>

      {/* Analytics Chart */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-black text-luxury-black uppercase tracking-widest">إحصائيات المخزون</h3>
        </div>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 'bold' }} 
              />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions List */}
      <div className="space-y-6">
        <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest text-right px-2">روابط سريعة</h3>
        <div className="grid grid-cols-1 gap-4">
          {adminActions.map((item, i) => (
            <button 
              key={i}
              onClick={() => router.push(`/admin${item.href}`)}
              className="bg-white p-5 rounded-xl border border-gray-50 flex flex-row items-center justify-between group luxury-shadow text-right active:scale-95 transition-all"
            >
              <div className="flex flex-row items-center gap-4 text-right flex-1">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:bg-primary/5 transition-all shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-black text-luxury-black text-right">{item.name}</h4>
              </div>
              <ChevronLeft className="w-5 h-5 text-gray-200" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
