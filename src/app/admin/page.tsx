
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  Package, 
  Award, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit,
  LayoutDashboard,
  ChevronLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { PRODUCTS, BRANDS } from "@/lib/mock-data"

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("products")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const isAdmin = localStorage.getItem('isAdmin')
    if (!isAdmin) {
      router.push('/admin/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    router.push('/')
    toast({ title: "تم الخروج", description: "تم تسجيل خروجك بنجاح" })
  }

  if (!mounted) return null

  const tabs = [
    { id: "products", name: "المنتجات", icon: Package },
    { id: "brands", name: "الماركات", icon: Award },
    { id: "accounts", name: "الحسابات", icon: CreditCard },
    { id: "faqs", name: "الأسئلة", icon: HelpCircle },
  ]

  return (
    <div className="flex flex-col gap-8 p-4 animate-fade-in pb-32">
      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm space-y-1">
          <p className="text-[10px] font-black text-gray-400 uppercase">إجمالي المنتجات</p>
          <p className="text-2xl font-black text-luxury-black">{PRODUCTS.length}</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm space-y-1">
          <p className="text-[10px] font-black text-gray-400 uppercase">الماركات</p>
          <p className="text-2xl font-black text-luxury-black">{BRANDS.length}</p>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 px-6 py-3 rounded-2xl text-[10px] font-black transition-all flex items-center gap-2 border ${
                activeTab === tab.id 
                  ? "bg-luxury-black text-primary border-luxury-black shadow-lg" 
                  : "bg-white text-gray-400 border-gray-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.name}
            </button>
          )
        })}
      </div>

      {/* Content Area */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-black text-luxury-black uppercase tracking-widest">إدارة {tabs.find(t => t.id === activeTab)?.name}</h3>
          <Button size="sm" className="bg-primary text-white rounded-xl h-9 px-4 font-black text-[10px] gap-2">
            <Plus className="w-3.5 h-3.5" />
            إضافة جديد
          </Button>
        </div>

        {activeTab === "products" && (
          <div className="space-y-3">
            {PRODUCTS.map(product => (
              <div key={product.id} className="bg-white p-4 rounded-2xl border border-gray-50 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 overflow-hidden relative">
                    <img src={product.image} alt="" className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-luxury-black line-clamp-1">{product.name}</h4>
                    <p className="text-[10px] font-bold text-primary">{product.price.toLocaleString()} ر.ي</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary transition-colors">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
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
              <div key={brand.id} className="bg-white p-4 rounded-2xl border border-gray-50 flex flex-col items-center gap-3 relative">
                <img src={brand.logo} alt="" className="w-12 h-12 object-contain grayscale opacity-50" />
                <span className="text-[10px] font-black text-luxury-black">{brand.name}</span>
                <button className="absolute top-2 left-2 text-gray-200 hover:text-red-500">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        {/* Placeholders for other tabs */}
        {(activeTab === "accounts" || activeTab === "faqs") && (
          <div className="bg-gray-50 p-12 rounded-[2rem] border border-dashed border-gray-200 text-center space-y-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">قيد التطوير</p>
            <p className="text-xs text-gray-300 font-bold">سيتم ربطها بقاعدة البيانات قريباً</p>
          </div>
        )}
      </div>

      {/* Logout Button */}
      <Button 
        onClick={handleLogout}
        variant="outline"
        className="mt-12 w-full h-14 border-red-100 text-red-500 rounded-2xl font-black gap-3 hover:bg-red-50"
      >
        <LogOut className="w-5 h-5" />
        تسجيل الخروج من النظام
      </Button>
    </div>
  )
}
