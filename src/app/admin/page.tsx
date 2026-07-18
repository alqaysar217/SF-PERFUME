
"use client"

import { useState, useEffect, useMemo } from "react"
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
  X,
  Save,
  Loader2,
  Zap,
  Droplets,
  FlaskConical,
  AlignRight,
  Maximize2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useFirestore } from "@/firebase/provider"
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore"
import { useCollection } from "@/firebase/firestore/use-collection"
import { toast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function AdminDashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')
  const db = useFirestore()
  
  const [activeTab, setActiveTab] = useState(tabParam || "dashboard")
  const [mounted, setMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)

  // Firestore Queries
  const productsQuery = useMemo(() => db ? query(collection(db, "products"), orderBy("createdAt", "desc")) : null, [db])
  const brandsQuery = useMemo(() => db ? query(collection(db, "brands"), orderBy("name", "asc")) : null, [db])
  const accountsQuery = useMemo(() => db ? query(collection(db, "accounts")) : null, [db])
  const faqsQuery = useMemo(() => db ? query(collection(db, "faqs")) : null, [db])

  const { data: products } = useCollection(productsQuery)
  const { data: brands } = useCollection(brandsQuery)
  const { data: accounts } = useCollection(accountsQuery)
  const { data: faqs } = useCollection(faqsQuery)

  useEffect(() => {
    setMounted(true)
    const isAdmin = localStorage.getItem('isAdmin')
    if (!isAdmin) {
      router.push('/admin/login')
    }
    if (tabParam) {
      setActiveTab(tabParam)
    }
  }, [router, tabParam])

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!db) return

    const formData = new FormData(e.currentTarget)
    const data: any = Object.fromEntries(formData.entries())
    
    // Convert numeric fields and boolean
    data.price = Number(data.price)
    if (data.oldPrice) data.oldPrice = Number(data.oldPrice)
    data.isOffer = data.isOffer === 'on' || data.isOffer === 'true'

    // Immediate UI feedback
    setIsModalOpen(false)
    
    if (editingItem?.id) {
      updateDoc(doc(db, activeTab, editingItem.id), {
        ...data,
        updatedAt: serverTimestamp()
      }).catch(err => {
        console.error(err)
        toast({ variant: "destructive", title: "خطأ في التحديث", description: "لم نتمكن من حفظ التعديلات" })
      })
      toast({ title: "تم التحديث", description: "تجري مزامنة التعديلات الآن" })
    } else {
      addDoc(collection(db, activeTab), {
        ...data,
        createdAt: serverTimestamp()
      }).catch(err => {
        console.error(err)
        toast({ variant: "destructive", title: "خطأ في الإضافة", description: "فشل إضافة العنصر الجديد" })
      })
      toast({ title: "تمت الإضافة", description: "سيظهر المنتج في القائمة فوراً" })
    }
    setEditingItem(null)
  }

  const handleDelete = (id: string, collectionName: string) => {
    if (!db || !confirm("هل أنت متأكد من الحذف؟")) return
    deleteDoc(doc(db, collectionName, id)).catch(err => {
      toast({ variant: "destructive", title: "خطأ", description: "فشل الحذف من السيرفر" })
    })
    toast({ title: "تم الحذف", description: "تمت إزالة العنصر بنجاح" })
  }

  if (!mounted) return null

  const stats = [
    { name: "إجمالي المبيعات", value: "٤٥,٢٠٠ ر.ي", icon: TrendingUp, color: "text-green-500", bg: "bg-green-50" },
    { name: "المنتجات", value: products.length, icon: Package, color: "text-primary", bg: "bg-primary/5" },
    { name: "الماركات", value: brands.length, icon: Award, color: "text-blue-500", bg: "bg-blue-50" },
    { name: "المراجعات", value: "١٢", icon: Star, color: "text-orange-500", bg: "bg-orange-50" },
  ]

  return (
    <div className="flex flex-col gap-8 p-4 animate-fade-in pb-32 bg-background">
      {activeTab === "dashboard" ? (
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 luxury-shadow space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <h2 className="text-xl font-black text-luxury-black">مرحباً بك يا مدير،</h2>
            <p className="text-gray-400 text-xs font-medium leading-relaxed">إليك ملخص سريع لأداء متجر SF PERFUME اليوم.</p>
            <div className="flex gap-4 pt-2">
              <Button size="sm" onClick={() => router.push('/admin?tab=products')} className="bg-primary text-white rounded-xl h-10 px-6 font-black text-[10px] gap-2 shadow-lg shadow-primary/20">
                إضافة منتج
                <Plus className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

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

          <div className="space-y-6">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mr-1">اختصارات سريعة</h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                { name: "إدارة المنتجات", icon: Package, desc: "إضافة وتعديل العطور والساعات", href: "?tab=products" },
                { name: "إدارة الحسابات البنكية", icon: CreditCard, desc: "تحديث بيانات التحويل المحلي", href: "?tab=accounts" },
                { name: "إدارة الأسئلة الشائعة", icon: HelpCircle, desc: "تعديل إجابات العملاء", href: "?tab=faqs" },
              ].map((item, i) => (
                <button 
                  key={i}
                  onClick={() => router.push(`/admin${item.href}`)}
                  className="bg-white p-5 rounded-[2.2rem] border border-gray-50 flex items-center justify-between group luxury-shadow active:scale-[0.98] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <h4 className="text-sm font-black text-luxury-black">{item.name}</h4>
                      <p className="text-[10px] text-gray-400 font-bold">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronLeft className="w-5 h-5 text-gray-200" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center px-1">
             <button className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-luxury-black" onClick={() => router.push('/admin')}>
                <ChevronLeft className="w-5 h-5 rotate-180" />
             </button>
            <Button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} className="bg-primary text-white rounded-xl h-10 px-6 font-black text-[10px] gap-2 shadow-lg shadow-primary/20">
              <Plus className="w-3.5 h-3.5" />
              إضافة جديد
            </Button>
          </div>

          {activeTab === "products" && (
            <div className="space-y-3">
              {products.map(product => (
                <div key={product.id} className="bg-white p-4 rounded-[1.8rem] border border-gray-50 flex items-center justify-between group luxury-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 overflow-hidden relative border border-gray-100">
                      <img src={product.image || "https://picsum.photos/seed/placeholder/200/200"} alt="" className="object-cover w-full h-full" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-luxury-black line-clamp-1">{product.name}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-primary">{product.price?.toLocaleString()} ر.ي</span>
                        <span className="text-[8px] px-2 py-0.5 bg-gray-50 rounded-md text-gray-400 font-black">{product.brand}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingItem(product); setIsModalOpen(true); }} className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary transition-all">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(product.id, 'products')} className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 hover:text-red-500 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Dynamic Modal for Add/Edit */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="rounded-t-[2.5rem] p-0 sm:rounded-[2.5rem] max-h-[95vh] overflow-hidden border-none flex flex-col">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-right font-black text-xl text-luxury-black flex items-center justify-between">
              <span className="text-primary text-[10px] font-black uppercase tracking-widest">{activeTab === 'products' ? 'إدارة المنتجات' : 'إضافة جديد'}</span>
              {editingItem ? "تعديل البيانات" : "إضافة منتج جديد"}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSave} className="flex-1 overflow-y-auto px-6 pb-24 space-y-8 scrollbar-hide pt-4">
            {activeTab === "products" && (
              <div className="space-y-8">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h4 className="text-[11px] font-black text-primary uppercase tracking-[0.2em] border-r-4 border-primary pr-3">المعلومات الأساسية</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">اسم المنتج</label>
                      <Input name="name" defaultValue={editingItem?.name} required className="h-12 rounded-xl bg-gray-50 border-none font-bold" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">الماركة</label>
                        <Input name="brand" defaultValue={editingItem?.brand} required className="h-12 rounded-xl bg-gray-50 border-none font-bold" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">الفئة</label>
                        <select name="category" defaultValue={editingItem?.category || 'men'} className="w-full h-12 rounded-xl bg-gray-50 border-none font-bold px-4 appearance-none">
                          <option value="men">رجالي</option>
                          <option value="women">نسائي</option>
                          <option value="watches">ساعات</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing & Size */}
                <div className="space-y-4">
                  <h4 className="text-[11px] font-black text-primary uppercase tracking-[0.2em] border-r-4 border-primary pr-3">السعر والقياس</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">السعر الحالي</label>
                      <Input name="price" type="number" defaultValue={editingItem?.price} required className="h-12 rounded-xl bg-gray-50 border-none font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">السعر القديم (اختياري)</label>
                      <Input name="oldPrice" type="number" defaultValue={editingItem?.oldPrice} className="h-12 rounded-xl bg-gray-50 border-none font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">الحجم/القياس</label>
                      <div className="relative">
                        <Maximize2 className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
                        <Input name="size" defaultValue={editingItem?.size} placeholder="مثال: 100 مل" className="h-12 pr-10 rounded-xl bg-gray-50 border-none font-bold" />
                      </div>
                    </div>
                    <div className="space-y-2 flex flex-col justify-end pb-1">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" name="isOffer" defaultChecked={editingItem?.isOffer} className="w-5 h-5 rounded-lg border-gray-200 text-primary focus:ring-primary" />
                        <span className="text-[10px] font-black text-luxury-black group-hover:text-primary transition-colors">عرض خاص؟</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Media */}
                <div className="space-y-4">
                  <h4 className="text-[11px] font-black text-primary uppercase tracking-[0.2em] border-r-4 border-primary pr-3">الوسائط</h4>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">رابط صورة المنتج</label>
                    <div className="relative">
                      <ImageIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      <Input name="image" defaultValue={editingItem?.image} placeholder="https://..." className="h-12 pr-12 rounded-xl bg-gray-50 border-none font-bold" />
                    </div>
                  </div>
                </div>

                {/* Technical Specs */}
                <div className="space-y-4">
                  <h4 className="text-[11px] font-black text-primary uppercase tracking-[0.2em] border-r-4 border-primary pr-3">المواصفات الفنية</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">الثبات</label>
                      <div className="relative">
                        <Zap className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
                        <Input name="longevity" defaultValue={editingItem?.longevity} placeholder="مثال: 12 ساعة" className="h-12 pr-10 rounded-xl bg-gray-50 border-none font-bold" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">الفوحان</label>
                      <div className="relative">
                        <Droplets className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
                        <Input name="projection" defaultValue={editingItem?.projection} placeholder="مثال: قوي جداً" className="h-12 pr-10 rounded-xl bg-gray-50 border-none font-bold" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">المكونات</label>
                    <div className="relative">
                      <FlaskConical className="absolute right-4 top-4 w-4 h-4 text-gray-300" />
                      <Textarea name="ingredients" defaultValue={editingItem?.ingredients} placeholder="قرفة، جوزة الطيب، لافندر..." className="pr-12 rounded-xl bg-gray-50 border-none font-bold min-h-[100px]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">وصف العبير</label>
                    <div className="relative">
                      <AlignRight className="absolute right-4 top-4 w-4 h-4 text-gray-300" />
                      <Textarea name="description" defaultValue={editingItem?.description} placeholder="اكتب وصفاً جذاباً للعطر..." className="pr-12 rounded-xl bg-gray-50 border-none font-bold min-h-[120px]" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Floating Action Button */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-gray-100">
              <Button type="submit" className="w-full h-14 bg-luxury-black text-primary rounded-2xl font-black text-md shadow-xl active:scale-95 transition-all gap-3">
                <Save className="w-5 h-5" />
                {editingItem ? "حفظ التغييرات" : "إضافة للمتجر"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

