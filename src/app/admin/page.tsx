
"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { 
  Package, 
  Award, 
  CreditCard, 
  HelpCircle, 
  Plus, 
  Trash2, 
  Edit,
  ChevronLeft,
  Save,
  Loader2,
  Upload,
  LayoutDashboard,
  LogOut,
  Star,
  Image as ImageIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { errorEmitter } from '@/firebase/error-emitter'
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors'

export default function AdminDashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')
  const db = useFirestore()
  
  const [activeTab, setActiveTab] = useState(tabParam || "dashboard")
  const [mounted, setMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 1024 * 1024) {
        toast({ variant: "destructive", title: "حجم الصورة كبير", description: "يرجى اختيار صورة أقل من 1 ميجابايت" })
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!db) return

    setIsSaving(true)
    const formData = new FormData(e.currentTarget)
    const data: any = Object.fromEntries(formData.entries())
    
    if (activeTab === 'products' || activeTab === 'brands') {
      data.image = imagePreview || editingItem?.image || ""
      if (activeTab === 'brands') data.logo = data.image
    }

    if (activeTab === 'products') {
      data.price = Number(data.price)
      if (data.oldPrice) data.oldPrice = Number(data.oldPrice)
      data.isOffer = data.isOffer === 'on' || data.isOffer === 'true'
    }

    const collectionRef = collection(db, activeTab)
    
    if (editingItem?.id) {
      const docRef = doc(db, activeTab, editingItem.id)
      updateDoc(docRef, { ...data, updatedAt: serverTimestamp() })
        .catch(async (err) => {
          const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'update',
            requestResourceData: data,
          });
          errorEmitter.emit('permission-error', permissionError);
        });
      toast({ title: "جاري التحديث...", description: "تم إرسال البيانات للسحاب" })
    } else {
      addDoc(collectionRef, { ...data, createdAt: serverTimestamp() })
        .catch(async (err) => {
          const permissionError = new FirestorePermissionError({
            path: collectionRef.path,
            operation: 'create',
            requestResourceData: data,
          });
          errorEmitter.emit('permission-error', permissionError);
        });
      toast({ title: "جاري الإضافة...", description: "يتم الآن رفع البيانات" })
    }

    setIsModalOpen(false)
    setEditingItem(null)
    setImagePreview(null)
    setIsSaving(false)
  }

  const handleDelete = (id: string, collectionName: string) => {
    if (!db || !confirm("هل أنت متأكد من الحذف النهائي؟")) return
    const docRef = doc(db, collectionName, id)
    deleteDoc(docRef)
      .catch(async (err) => {
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
      });
    toast({ title: "تم طلب الحذف", description: "سيتم إزالة العنصر فوراً" })
  }

  if (!mounted) return null

  return (
    <div className="flex flex-col gap-8 p-4 animate-fade-in pb-32 bg-background">
      {activeTab === "dashboard" ? (
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 luxury-shadow space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <h2 className="text-xl font-black text-luxury-black text-right">نظام التحكم السحابي</h2>
            <p className="text-gray-400 text-xs font-medium text-right">مرحباً بك. كل البيانات التي تقوم بإضافتها هنا تُخزن بشكل دائم ومشفر في Firebase.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm space-y-3 luxury-shadow">
              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                <Package className="w-5 h-5" />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">المنتجات</p>
                <p className="text-xl font-black text-luxury-black">{products.length}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm space-y-3 luxury-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">الماركات</p>
                <p className="text-xl font-black text-luxury-black">{brands.length}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest text-right px-2">الإدارة السريعة</h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                { name: "إدارة المخزون (عطور وساعات)", icon: Package, href: "?tab=products" },
                { name: "إدارة الماركات والشركاء", icon: Award, href: "?tab=brands" },
                { name: "بيانات التحويل البنكي", icon: CreditCard, href: "?tab=accounts" },
              ].map((item, i) => (
                <button 
                  key={i}
                  onClick={() => router.push(`/admin${item.href}`)}
                  className="bg-white p-5 rounded-[2.2rem] border border-gray-50 flex items-center justify-between group luxury-shadow"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-200" />
                  <div className="flex items-center gap-4">
                    <h4 className="text-sm font-black text-luxury-black">{item.name}</h4>
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-primary">
                      <item.icon className="w-6 h-6" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center px-1">
             <button className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-luxury-black" onClick={() => router.push('/admin')}>
                <ChevronLeft className="w-5 h-5" />
             </button>
            <Button onClick={() => { setEditingItem(null); setImagePreview(null); setIsModalOpen(true); }} className="bg-primary text-white rounded-xl h-10 px-6 font-black text-[10px] gap-2 shadow-lg shadow-primary/20">
              <Plus className="w-3.5 h-3.5" />
              إضافة {activeTab === 'products' ? 'منتج' : 'جديد'}
            </Button>
          </div>

          <div className="space-y-3">
            {(activeTab === "products" ? products : activeTab === "brands" ? brands : activeTab === "accounts" ? accounts : faqs).map((item: any) => (
              <div key={item.id} className="bg-white p-4 rounded-[1.8rem] border border-gray-50 flex items-center justify-between luxury-shadow">
                <div className="flex gap-2">
                  <button onClick={() => { setEditingItem(item); setImagePreview(item.image || item.logo || null); setIsModalOpen(true); }} className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(item.id, activeTab)} className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div className="flex flex-col items-end">
                    <h4 className="text-xs font-black text-luxury-black line-clamp-1">{item.name || item.bank || item.question}</h4>
                    <p className="text-[10px] font-bold text-primary">{item.price ? `${item.price.toLocaleString()} ر.ي` : item.account || 'تفاصيل'}</p>
                  </div>
                  {(item.image || item.logo) && (
                    <div className="w-12 h-12 rounded-xl bg-gray-50 overflow-hidden relative border border-gray-100">
                      <img src={item.image || item.logo} alt="" className="object-cover w-full h-full" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dynamic Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="rounded-t-[2.5rem] p-0 sm:rounded-[2.5rem] max-h-[90vh] overflow-hidden border-none flex flex-col">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-right font-black text-xl text-luxury-black">
              {editingItem ? "تعديل البيانات السحابية" : "إضافة بيانات جديدة"}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSave} className="flex-1 overflow-y-auto px-6 pb-24 space-y-8 pt-4 scrollbar-hide text-right">
            {(activeTab === "products" || activeTab === "brands") && (
              <div className="space-y-4">
                <h4 className="text-[11px] font-black text-primary uppercase tracking-widest border-r-4 border-primary pr-3">الصورة</h4>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="relative aspect-video rounded-3xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  {imagePreview ? (
                    <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-300 mb-2" />
                      <span className="text-[10px] font-black text-gray-400">اضغط لرفع صورة وحفظها في قاعدة البيانات</span>
                    </>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    className="hidden" 
                  />
                </div>
              </div>
            )}

            {activeTab === "products" && (
              <>
                <div className="space-y-4">
                  <h4 className="text-[11px] font-black text-primary uppercase tracking-widest border-r-4 border-primary pr-3 text-right">المعلومات الأساسية</h4>
                  <div className="space-y-4">
                    <Input name="name" defaultValue={editingItem?.name} placeholder="اسم العطر" required className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right" />
                    <div className="grid grid-cols-2 gap-4">
                      <select name="category" defaultValue={editingItem?.category || 'men'} className="h-12 rounded-xl bg-gray-50 border-none font-bold px-4 text-right">
                        <option value="men">رجالي</option>
                        <option value="women">نسائي</option>
                        <option value="watches">ساعات</option>
                      </select>
                      <Input name="brand" defaultValue={editingItem?.brand} placeholder="الماركة" required className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[11px] font-black text-primary uppercase tracking-widest border-r-4 border-primary pr-3 text-right">الأسعار والمواصفات</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Input name="oldPrice" type="number" defaultValue={editingItem?.oldPrice} placeholder="السعر القديم" className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right" />
                    <Input name="price" type="number" defaultValue={editingItem?.price} placeholder="السعر الحالي" required className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right" />
                    <Input name="longevity" defaultValue={editingItem?.longevity} placeholder="الثبات" className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right" />
                    <Input name="size" defaultValue={editingItem?.size} placeholder="الحجم (مثلاً: 100 مل)" className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right" />
                    <div className="flex items-center justify-end gap-2 pr-2 col-span-2">
                      <span className="text-xs font-black">عرض خاص</span>
                      <input type="checkbox" name="isOffer" defaultChecked={editingItem?.isOffer} className="w-5 h-5 accent-primary" />
                    </div>
                  </div>
                  <Input name="projection" defaultValue={editingItem?.projection} placeholder="الفوحان" className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right" />
                  <Textarea name="ingredients" defaultValue={editingItem?.ingredients} placeholder="المكونات (قرفة، لافندر...)" className="rounded-xl bg-gray-50 border-none font-bold text-right" />
                  <Textarea name="description" defaultValue={editingItem?.description} placeholder="وصف العطر" className="rounded-xl bg-gray-50 border-none font-bold text-right" />
                </div>
              </>
            )}

            {activeTab === "brands" && (
               <div className="space-y-4">
                 <Input name="name" defaultValue={editingItem?.name} placeholder="اسم الماركة" required className="h-12 rounded-xl bg-gray-50 text-right" />
               </div>
            )}

            {activeTab === "accounts" && (
              <div className="space-y-4">
                 <Input name="bank" defaultValue={editingItem?.bank} placeholder="اسم البنك" required className="h-12 rounded-xl bg-gray-50 text-right" />
                 <Input name="name" defaultValue={editingItem?.name} placeholder="اسم صاحب الحساب" required className="h-12 rounded-xl bg-gray-50 text-right" />
                 <Input name="account" defaultValue={editingItem?.account} placeholder="رقم الحساب" required className="h-12 rounded-xl bg-gray-50 text-right" />
              </div>
            )}

            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-md border-t z-50">
              <Button type="submit" disabled={isSaving} className="w-full h-14 bg-luxury-black text-primary rounded-2xl font-black text-md shadow-xl gap-3">
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {editingItem ? "تزامن التعديلات" : "إضافة للسحاب"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
