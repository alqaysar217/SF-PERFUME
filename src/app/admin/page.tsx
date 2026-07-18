
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
  Loader2
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
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    } else {
      setActiveTab("dashboard")
    }
  }, [router, tabParam])

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!db) return
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data: any = Object.fromEntries(formData.entries())
    
    // Convert numeric fields
    if (data.price) data.price = Number(data.price)
    if (data.oldPrice) data.oldPrice = Number(data.oldPrice)
    if (data.isOffer) data.isOffer = data.isOffer === 'on'

    try {
      if (editingItem?.id) {
        await updateDoc(doc(db, activeTab, editingItem.id), {
          ...data,
          updatedAt: serverTimestamp()
        })
        toast({ title: "تم التحديث", description: "تمت مزامنة التعديلات بنجاح" })
      } else {
        await addDoc(collection(db, activeTab), {
          ...data,
          createdAt: serverTimestamp()
        })
        toast({ title: "تمت الإضافة", description: "المنتج الآن متاح للعملاء" })
      }
      setIsModalOpen(false)
      setEditingItem(null)
    } catch (error) {
      console.error(error)
      toast({ variant: "destructive", title: "خطأ", description: "فشل في حفظ البيانات" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string, collectionName: string) => {
    if (!db || !confirm("هل أنت متأكد من الحذف؟")) return
    try {
      await deleteDoc(doc(db, collectionName, id))
      toast({ title: "تم الحذف", description: "تمت إزالة العنصر نهائياً" })
    } catch (error) {
      toast({ variant: "destructive", title: "خطأ", description: "فشل الحذف" })
    }
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
                { name: "إدارة البنرات الإعلانية", icon: ImageIcon, desc: "تحديث صور الرئيسية والعروض", href: "?tab=banners" },
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
             <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-luxury-black" onClick={() => router.push('/admin')}>
                <ChevronLeft className="w-5 h-5 rotate-180" />
             </div>
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
                      <p className="text-[10px] font-bold text-primary">{product.price?.toLocaleString()} ر.ي</p>
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

          {activeTab === "brands" && (
            <div className="grid grid-cols-2 gap-4">
              {brands.map(brand => (
                <div key={brand.id} className="bg-white p-6 rounded-[2.2rem] border border-gray-50 flex flex-col items-center gap-3 relative luxury-shadow">
                  <div className="w-16 h-16 relative">
                    <img src={brand.logo || "https://picsum.photos/seed/brand/200/200"} alt="" className="w-full h-full object-contain grayscale" />
                  </div>
                  <span className="text-[11px] font-black text-luxury-black">{brand.name}</span>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => { setEditingItem(brand); setIsModalOpen(true); }} className="text-gray-300 hover:text-primary transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(brand.id, 'brands')} className="text-gray-300 hover:text-red-500 transition-colors">
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
        <DialogContent className="rounded-t-[2.5rem] p-8 sm:rounded-[2.5rem] max-h-[90vh] overflow-y-auto border-none">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-right font-black text-xl text-luxury-black">
              {editingItem ? "تعديل" : "إضافة جديد"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-6">
            {activeTab === "products" && (
              <>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">اسم المنتج</label>
                  <Input name="name" defaultValue={editingItem?.name} required className="h-12 rounded-xl bg-gray-50 border-none font-bold" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">السعر</label>
                    <Input name="price" type="number" defaultValue={editingItem?.price} required className="h-12 rounded-xl bg-gray-50 border-none font-bold" />
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
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">رابط الصورة</label>
                  <Input name="image" defaultValue={editingItem?.image} placeholder="https://..." className="h-12 rounded-xl bg-gray-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">المكونات</label>
                  <Textarea name="ingredients" defaultValue={editingItem?.ingredients} className="rounded-xl bg-gray-50 border-none font-bold min-h-[80px]" />
                </div>
              </>
            )}

            {activeTab === "brands" && (
              <>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">اسم الماركة</label>
                  <Input name="name" defaultValue={editingItem?.name} required className="h-12 rounded-xl bg-gray-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">رابط اللوجو</label>
                  <Input name="logo" defaultValue={editingItem?.logo} placeholder="https://..." className="h-12 rounded-xl bg-gray-50 border-none font-bold" />
                </div>
              </>
            )}

            <Button type="submit" disabled={isSubmitting} className="w-full h-14 bg-luxury-black text-primary rounded-2xl font-black text-md shadow-xl active:scale-95 transition-all gap-2">
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              حفظ البيانات
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
