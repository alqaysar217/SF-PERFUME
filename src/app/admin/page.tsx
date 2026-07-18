
"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { 
  Package, 
  Award, 
  CreditCard, 
  HelpCircle, 
  Plus, 
  Trash2, 
  Edit,
  TrendingUp,
  Star,
  Image as ImageIcon,
  ChevronLeft,
  ArrowUpRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { PRODUCTS, BRANDS } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function AdminDashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')
  
  const [activeTab, setActiveTab] = useState(tabParam || "dashboard")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const isAdmin = localStorage.getItem('isAdmin')
    if (!isAdmin) {
      router.push('/admin/login')
    }
    if (tabParam) {
      setActiveTab(tabParam)
    } else {
      setActiveTab("dashboard")
    }
  }, [router, tabParam])

  if (!mounted) return null

  const stats = [
    { name: "إجمالي المبيعات", value: "٤٥,٢٠٠ ر.ي", icon: TrendingUp, color: "text-green-500", bg: "bg-green-50" },
    { name: "المنتجات", value: PRODUCTS.length, icon: Package, color: "text-primary", bg: "bg-primary/5" },
    { name: "الماركات", value: BRANDS.length, icon: Award, color: "text-blue-500", bg: "bg-blue-50" },
    { name: "المراجعات", value: "١٢", icon: Star, color: "text-orange-500", bg: "bg-orange-50" },
  ]

  return (
    <div className="flex flex-col gap-8 p-4 animate-fade-in pb-32 bg-background">
      {activeTab === "dashboard" ? (
        <div className="space-y-8">
          {/* Welcome Card */}
          <div className="bg-luxury-black p-8 rounded-[3rem] text-white space-y-4 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <h2 className="text-xl font-black">مرحباً بك يا مدير،</h2>
            <p className="text-white/50 text-xs font-medium leading-relaxed">إليك ملخص سريع لأداء متجر SF PERFUME اليوم.</p>
            <div className="flex gap-4 pt-2">
              <Button size="sm" onClick={() => router.push('/admin?tab=products')} className="bg-primary text-white rounded-xl h-10 px-6 font-black text-[10px] gap-2">
                إضافة منتج
                <Plus className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm space-y-3 luxury-shadow">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", stat.bg)}>
                  <stat.icon className={cn("w-5 h-5", stat.color)} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.name}</p>
                  <p className="text-xl font-black text-luxury-black">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity or Quick Links */}
          <div className="space-y-6">
            <div className="flex justify-between items-center px-1">
              <h3 className="text-sm font-black text-luxury-black uppercase tracking-widest">اختصارات سريعة</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { name: "إدارة البنرات الإعلانية", icon: ImageIcon, desc: "تحديث صور الرئيسية والعروض", href: "?tab=banners" },
                { name: "إدارة الحسابات البنكية", icon: CreditCard, desc: "تحديث بيانات التحويل المحلي", href: "?tab=accounts" },
                { name: "إدارة الأسئلة الشائعة", icon: HelpCircle, desc: "تعديل إجابات العملاء", href: "?tab=faqs" },
              ].map((item, i) => (
                <button 
                  key={i}
                  onClick={() => router.push(`/admin${item.href}`)}
                  className="bg-white p-6 rounded-[2.5rem] border border-gray-50 flex items-center justify-between group luxury-shadow active:scale-[0.98] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-luxury-black group-hover:text-primary transition-colors">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <h4 className="text-sm font-black text-luxury-black">{item.name}</h4>
                      <p className="text-[10px] text-gray-400 font-bold">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronLeft className="w-5 h-5 text-gray-200 group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-xs font-black text-luxury-black uppercase tracking-widest">
              {activeTab === "products" && "إدارة المنتجات"}
              {activeTab === "brands" && "إدارة الماركات"}
              {activeTab === "accounts" && "إدارة الحسابات"}
              {activeTab === "faqs" && "إدارة الأسئلة"}
              {activeTab === "reviews" && "إدارة المراجعات"}
              {activeTab === "banners" && "إدارة البنرات"}
            </h3>
            <Button size="sm" className="bg-luxury-black text-primary rounded-xl h-9 px-4 font-black text-[10px] gap-2 shadow-lg active:scale-95">
              <Plus className="w-3.5 h-3.5" />
              إضافة جديد
            </Button>
          </div>

          {activeTab === "products" && (
            <div className="space-y-3">
              {PRODUCTS.map(product => (
                <div key={product.id} className="bg-white p-4 rounded-[1.5rem] border border-gray-50 flex items-center justify-between group luxury-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 overflow-hidden relative border border-gray-100">
                      <img src={product.image} alt="" className="object-cover w-full h-full" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-luxury-black line-clamp-1">{product.name}</h4>
                      <p className="text-[10px] font-bold text-primary">{product.price.toLocaleString()} ر.ي</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/5 transition-all">
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "brands" && (
            <div className="grid grid-cols-2 gap-4">
              {BRANDS.map(brand => (
                <div key={brand.id} className="bg-white p-6 rounded-[2rem] border border-gray-50 flex flex-col items-center gap-3 relative luxury-shadow">
                  <div className="w-16 h-16 relative">
                    <img src={brand.logo} alt="" className="w-full h-full object-contain grayscale group-hover:grayscale-0" />
                  </div>
                  <span className="text-[11px] font-black text-luxury-black">{brand.name}</span>
                  <button className="absolute top-4 left-4 text-gray-200 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {["accounts", "faqs", "reviews", "banners"].includes(activeTab) && (
            <div className="bg-gray-50 p-16 rounded-[3rem] border border-dashed border-gray-200 text-center space-y-3">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-gray-100">
                <Plus className="w-6 h-6 text-gray-200" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">قيد الربط</p>
                <p className="text-xs text-gray-300 font-bold">هذا القسم سيكون جاهزاً عند ربط قاعدة البيانات الحقيقية</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
