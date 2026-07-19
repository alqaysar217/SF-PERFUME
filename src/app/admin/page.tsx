
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
  Image as ImageIcon,
  Tag,
  Layers,
  Banknote,
  History,
  Zap,
  Maximize2,
  List,
  AlignLeft,
  AlertTriangle,
  ChevronRight,
  ShieldAlert,
  RotateCcw,
  User as UserIcon,
  Hash,
  Building2
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
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog"
import { errorEmitter } from '@/firebase/error-emitter'
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors'
import { cn } from "@/lib/utils"

export default function AdminDashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')
  const db = useFirestore()
  
  const [activeTab, setActiveTab] = useState(tabParam || "dashboard")
  const [mounted, setMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [deletingItem, setDeletingItem] = useState<any>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Firestore Queries
  const productsQuery = useMemo(() => db ? query(collection(db, "products"), orderBy("createdAt", "desc")) : null, [db])
  const brandsQuery = useMemo(() => db ? query(collection(db, "brands"), orderBy("name", "asc")) : null, [db])
  const accountsQuery = useMemo(() => db ? query(collection(db, "accounts")) : null, [db])
  const faqsQuery = useMemo(() => db ? query(collection(db, "faqs")) : null, [db])
  const trashQuery = useMemo(() => db ? query(collection(db, "trash"), orderBy("deletedAt", "desc")) : null, [db])

  const { data: products } = useCollection(productsQuery)
  const { data: brands } = useCollection(brandsQuery)
  const { data: accounts } = useCollection(accountsQuery)
  const { data: faqs } = useCollection(faqsQuery)
  const { data: trashItems } = useCollection(trashQuery)

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
      if (file.size > 800 * 1024) {
        toast({ variant: "destructive", title: "حجم الصورة كبير", description: "يرجى اختيار صورة أقل من 800 كيلوبايت لضمان الحفظ بنجاح" })
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
    
    // Handle image for multiple tabs
    if (['products', 'brands', 'accounts'].includes(activeTab)) {
      data.image = imagePreview || editingItem?.image || editingItem?.logo || ""
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
      toast({ title: "جاري التحديث...", description: "تم إرسال التغييرات للسحاب" })
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
      toast({ title: "جاري الإضافة...", description: "تمت إضافة العنصر بنجاح" })
    }

    setIsModalOpen(false)
    setEditingItem(null)
    setImagePreview(null)
    setIsSaving(false)
  }

  const handleSoftDelete = () => {
    if (!db || !deletingItem) return
    
    if (activeTab === 'brands') {
      const hasProducts = products.some((p: any) => p.brand === deletingItem.name)
      if (hasProducts) {
        toast({ 
          variant: "destructive", 
          title: "لا يمكن الحذف", 
          description: "هذه الماركة مرتبطة بمنتجات موجودة، يرجى حذف المنتجات أولاً." 
        })
        setIsDeleteDialogOpen(false)
        return
      }
    }

    const trashRef = collection(db, "trash")
    addDoc(trashRef, {
      originalData: deletingItem,
      originalCollection: activeTab,
      deletedAt: serverTimestamp()
    }).then(() => {
      const docRef = doc(db, activeTab, deletingItem.id)
      deleteDoc(docRef).catch(async (err) => {
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
      });
      toast({ title: "نُقل للمحذوفات", description: "يمكنك استعادة العنصر من قسم المحذوفات" })
    })
    
    setIsDeleteDialogOpen(false)
    setDeletingItem(null)
  }

  const handleRestore = (item: any) => {
    if (!db) return
    const collectionRef = collection(db, item.originalCollection)
    addDoc(collectionRef, item.originalData).then(() => {
      deleteDoc(doc(db, "trash", item.id))
      toast({ title: "تمت الاستعادة", description: "عاد العنصر لمكانه الأصلي" })
    })
  }

  const handlePermanentDelete = (itemId: string) => {
    if (!db) return
    deleteDoc(doc(db, "trash", itemId))
    toast({ title: "حذف نهائي", description: "تمت إزالة العنصر من السجلات تماماً" })
  }

  if (!mounted) return null

  return (
    <div className="flex flex-col gap-8 p-4 animate-fade-in pb-32 bg-background">
      {activeTab === "dashboard" ? (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-[1.5rem] border border-gray-100 luxury-shadow space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <h2 className="text-lg font-black text-luxury-black text-right">نظام التحكم السحابي</h2>
            <p className="text-gray-400 text-xs font-medium text-right leading-relaxed">إدارة المتجر بالكامل مع حماية البيانات من الحذف المباشر.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-[1.2rem] border border-gray-50 shadow-sm space-y-3 luxury-shadow">
              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                <Package className="w-5 h-5" />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">المنتجات</p>
                <p className="text-lg font-black text-luxury-black">{products.length}</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-[1.2rem] border border-gray-50 shadow-sm space-y-3 luxury-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">المحذوفات</p>
                <p className="text-lg font-black text-luxury-black">{trashItems.length}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest text-right px-2">روابط سريعة</h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                { name: "إدارة المنتجات", icon: Package, href: "?tab=products" },
                { name: "إدارة الماركات", icon: Award, href: "?tab=brands" },
                { name: "الحسابات البنكية", icon: CreditCard, href: "?tab=accounts" },
                { name: "سلة المحذوفات", icon: Trash2, href: "?tab=trash" },
              ].map((item, i) => (
                <button 
                  key={i}
                  onClick={() => router.push(`/admin${item.href}`)}
                  className="bg-white p-5 rounded-[1.2rem] border border-gray-50 flex items-center justify-between group luxury-shadow"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-200" />
                  <div className="flex items-center gap-4">
                    <h4 className="text-sm font-black text-luxury-black">{item.name}</h4>
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-primary transition-all">
                      <item.icon className="w-6 h-6" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : activeTab === "trash" ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center px-1">
             <button className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-luxury-black" onClick={() => router.push('/admin')}>
                <ChevronRight className="w-5 h-5" />
             </button>
             <h2 className="text-sm font-black text-luxury-black">سلة المحذوفات ({trashItems.length})</h2>
          </div>

          <div className="space-y-3">
            {trashItems.map((item: any) => (
              <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-50 flex items-center justify-between luxury-shadow">
                <div className="text-right">
                  <h4 className="text-xs font-black text-luxury-black">{item.originalData.name || item.originalData.bank}</h4>
                  <p className="text-[9px] text-gray-400">حُذف من: {item.originalCollection}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleRestore(item)} className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button onClick={() => handlePermanentDelete(item.id)} className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center px-1">
             <button className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-luxury-black" onClick={() => router.push('/admin')}>
                <ChevronRight className="w-5 h-5" />
             </button>
            <Button onClick={() => { setEditingItem(null); setImagePreview(null); setIsModalOpen(true); }} className="bg-primary text-white rounded-xl h-10 px-6 font-black text-[10px] gap-2 shadow-lg shadow-primary/20">
              <Plus className="w-3.5 h-3.5" />
              إضافة {activeTab === 'products' ? 'منتج' : activeTab === 'accounts' ? 'حساب بنكي' : activeTab === 'brands' ? 'ماركة' : 'جديد'}
            </Button>
          </div>

          <div className="space-y-3">
            {(activeTab === "products" ? products : activeTab === "brands" ? brands : activeTab === "accounts" ? accounts : faqs).map((item: any) => (
              <div key={item.id} className="bg-white p-4 rounded-[1.2rem] border border-gray-100 flex items-center justify-start gap-4 luxury-shadow">
                {(item.image || item.logo) && (
                  <div className="w-12 h-12 rounded-xl bg-gray-50 overflow-hidden relative border border-gray-100 shrink-0">
                    <img src={item.image || item.logo} alt="" className="object-cover w-full h-full" />
                  </div>
                )}
                <div className="flex-1 text-right">
                  <h4 className="text-xs font-black text-luxury-black line-clamp-1">{item.name || item.bank || item.question}</h4>
                  <p className="text-[10px] font-bold text-primary">{item.price ? `${item.price.toLocaleString()} ر.ي` : item.account || 'تفاصيل'}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => { setEditingItem(item); setImagePreview(item.image || item.logo || null); setIsModalOpen(true); }} className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => { setDeletingItem(item); setIsDeleteDialogOpen(true); }} className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 hover:text-primary transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Item Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="rounded-t-[1.5rem] p-0 sm:rounded-[1.5rem] max-h-[90vh] overflow-hidden border-none flex flex-col bg-white">
          <div className="p-6 pb-2">
            <DialogTitle className="text-right font-black text-xl text-luxury-black">
              {editingItem ? "تحديث البيانات" : `إضافة ${activeTab === 'products' ? 'منتج' : activeTab === 'accounts' ? 'حساب بنكي' : activeTab === 'brands' ? 'ماركة جديدة' : 'جديد'}`}
            </DialogTitle>
          </div>
          
          <form onSubmit={handleSave} className="flex-1 overflow-y-auto px-6 pb-32 space-y-8 pt-4 scrollbar-hide text-right">
            {activeTab === "products" && (
              <>
                <div className="space-y-6">
                  <div className="flex items-center justify-start gap-2 text-primary">
                    <Tag className="w-4 h-4" />
                    <span className="text-[11px] font-black uppercase tracking-widest">المعلومات الأساسية</span>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2 text-right">
                      <label className="text-[10px] font-bold text-gray-400 px-1">اسم المنتج</label>
                      <Input name="name" defaultValue={editingItem?.name} placeholder="مثال: سوفاج إليكسير" required className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 text-right">
                        <label className="text-[10px] font-bold text-gray-400 px-1">الماركة</label>
                        <div className="relative">
                          <select name="brand" defaultValue={editingItem?.brand} required className="w-full h-12 rounded-xl bg-gray-50 border-none font-bold px-4 text-right appearance-none">
                            <option value="" disabled>اختر الماركة</option>
                            {brands.map((b: any) => (
                              <option key={b.id} value={b.name}>{b.name}</option>
                            ))}
                            {brands.length === 0 && <option value="" disabled>لا توجد ماركات، أضف ماركة أولاً</option>}
                          </select>
                          <Award className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-2 text-right">
                        <label className="text-[10px] font-bold text-gray-400 px-1">التصنيف</label>
                        <div className="relative">
                          <select name="category" defaultValue={editingItem?.category || 'men'} className="w-full h-12 rounded-xl bg-gray-50 border-none font-bold px-4 text-right appearance-none">
                            <option value="men">عطور رجالية</option>
                            <option value="women">عطور نسائية</option>
                            <option value="watches">ساعات فاخرة</option>
                          </select>
                          <Layers className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-start gap-2 text-primary">
                    <Banknote className="w-4 h-4" />
                    <span className="text-[11px] font-black uppercase tracking-widest">الأسعار والمواصفات</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 text-right">
                      <label className="text-[10px] font-bold text-gray-400 px-1">السعر الحالي</label>
                      <div className="relative">
                        <Input name="price" type="number" defaultValue={editingItem?.price} placeholder="0.00" required className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right pr-4" />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-300">ر.ي</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-right">
                      <label className="text-[10px] font-bold text-gray-400 px-1">السعر القديم</label>
                      <div className="relative">
                        <Input name="oldPrice" type="number" defaultValue={editingItem?.oldPrice} placeholder="0.00" className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right pr-4" />
                        <History className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      </div>
                    </div>
                    <div className="space-y-2 text-right">
                      <label className="text-[10px] font-bold text-gray-400 px-1">الثبات</label>
                      <div className="relative">
                        <Input name="longevity" defaultValue={editingItem?.longevity} placeholder="مثال: 12 ساعة" className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right pr-4" />
                        <Zap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      </div>
                    </div>
                    <div className="space-y-2 text-right">
                      <label className="text-[10px] font-bold text-gray-400 px-1">الحجم</label>
                      <div className="relative">
                        <Input name="size" defaultValue={editingItem?.size} placeholder="مثال: 100 مل" className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right pr-4" />
                        <Maximize2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-start gap-2 text-primary">
                    <AlignLeft className="w-4 h-4" />
                    <span className="text-[11px] font-black uppercase tracking-widest">المكونات والوصف</span>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2 text-right">
                      <label className="text-[10px] font-bold text-gray-400 px-1 flex items-center justify-end gap-1">
                        المكونات (افصل بينها بفاصلة) <List className="w-3 h-3" />
                      </label>
                      <Textarea name="ingredients" defaultValue={editingItem?.ingredients} placeholder="قرفة، لافندر، خشب صندل..." className="rounded-xl bg-gray-50 border-none font-bold text-right min-h-[80px]" />
                    </div>
                    <div className="space-y-2 text-right">
                      <label className="text-[10px] font-bold text-gray-400 px-1">وصف العطر</label>
                      <Textarea name="description" defaultValue={editingItem?.description} placeholder="اكتب وصفاً جذاباً للعملاء..." className="rounded-xl bg-gray-50 border-none font-bold text-right min-h-[100px]" />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-start gap-2 text-primary">
                    <ImageIcon className="w-4 h-4" />
                    <span className="text-[11px] font-black uppercase tracking-widest">صورة المنتج</span>
                  </div>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="relative aspect-[16/9] rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    {imagePreview ? (
                      <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-300 mb-2" />
                        <span className="text-[10px] font-black text-gray-400">انقر لرفع صورة العطر</span>
                      </>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                  </div>
                </div>
              </>
            )}

            {activeTab === "accounts" && (
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-start gap-2 text-primary">
                    <Building2 className="w-4 h-4" />
                    <span className="text-[11px] font-black uppercase tracking-widest">بيانات الحساب</span>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2 text-right">
                      <label className="text-[10px] font-bold text-gray-400 px-1">اسم البنك / المحفظة</label>
                      <div className="relative">
                        <Input name="bank" defaultValue={editingItem?.bank} placeholder="مثال: بنك الكريمي" required className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right pr-4" />
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      </div>
                    </div>
                    <div className="space-y-2 text-right">
                      <label className="text-[10px] font-bold text-gray-400 px-1">اسم صاحب الحساب</label>
                      <div className="relative">
                        <Input name="name" defaultValue={editingItem?.name} placeholder="الاسم الكامل كما يظهر في السند" required className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right pr-4" />
                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      </div>
                    </div>
                    <div className="space-y-2 text-right">
                      <label className="text-[10px] font-bold text-gray-400 px-1">رقم الحساب / الجوال</label>
                      <div className="relative">
                        <Input name="account" defaultValue={editingItem?.account} placeholder="أدخل الرقم بدقة" required className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right pr-4" />
                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-start gap-2 text-primary">
                    <ImageIcon className="w-4 h-4" />
                    <span className="text-[11px] font-black uppercase tracking-widest">لوجو البنك</span>
                  </div>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="relative aspect-square w-32 mx-auto rounded-3xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    {imagePreview ? (
                      <img src={imagePreview} className="w-full h-full object-contain p-2" alt="Preview" />
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-gray-300 mb-2" />
                        <span className="text-[8px] font-black text-gray-400 text-center px-2">ارفع شعار البنك</span>
                      </>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "brands" && (
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-start gap-2 text-primary">
                    <Award className="w-4 h-4" />
                    <span className="text-[11px] font-black uppercase tracking-widest">بيانات الماركة</span>
                  </div>
                  <div className="space-y-2 text-right">
                    <label className="text-[10px] font-bold text-gray-400 px-1">اسم الماركة</label>
                    <div className="relative">
                      <Input name="name" defaultValue={editingItem?.name} placeholder="مثال: ديور" required className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right pr-4" />
                      <Award className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-start gap-2 text-primary">
                    <ImageIcon className="w-4 h-4" />
                    <span className="text-[11px] font-black uppercase tracking-widest">شعار الماركة</span>
                  </div>
                  <div 
                    onClick={() => fileInputRef.current?.click()} 
                    className="relative aspect-square w-32 mx-auto rounded-3xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    {imagePreview ? (
                      <img src={imagePreview} className="w-full h-full object-contain p-2" alt="Preview" />
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-gray-300 mb-2" />
                        <span className="text-[8px] font-black text-gray-400 text-center px-2">ارفع الشعار</span>
                      </>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                  </div>
                </div>
              </div>
            )}

            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-md border-t z-50">
              <Button type="submit" disabled={isSaving} className="w-full h-14 bg-luxury-black text-primary rounded-2xl font-black text-md shadow-xl gap-3">
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {editingItem ? "حفظ التغييرات" : "إضافة للمتجر"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="fixed left-[50%] top-[50%] z-50 grid w-[90%] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border-none p-10 text-right bg-white shadow-2xl overflow-hidden rounded-[1.5rem]">
          <div className="absolute top-0 right-0 w-full h-2 bg-luxury-black/5" />
          
          <AlertDialogHeader className="space-y-6">
            <div className="w-20 h-20 bg-luxury-black rounded-2xl flex items-center justify-center text-primary mx-auto shadow-xl relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl animate-pulse blur-xl group-hover:blur-2xl transition-all" />
              <ShieldAlert className="w-10 h-10 relative z-10" strokeWidth={1.5} />
            </div>
            
            <div className="space-y-2 text-center">
              <AlertDialogTitle className="text-2xl font-black text-luxury-black">تأكيد الإجراء</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-400 text-sm font-medium leading-relaxed max-w-[260px] mx-auto">
                أنت على وشك نقل <span className="text-luxury-black font-black">"{deletingItem?.name || deletingItem?.bank}"</span> لسلة المحذوفات.
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-10 flex flex-col sm:flex-row gap-3">
            <AlertDialogAction 
              onClick={handleSoftDelete} 
              className="flex-1 h-14 rounded-2xl bg-luxury-black text-primary hover:bg-black/90 font-black text-md border-none shadow-xl active:scale-95 transition-all order-1 sm:order-2"
            >
              نقل للمحذوفات
            </AlertDialogAction>
            <AlertDialogCancel className="flex-1 h-14 rounded-2xl border-gray-100 bg-gray-50 hover:bg-gray-100 text-gray-400 font-black text-md active:scale-95 transition-all order-2 sm:order-1">
              تراجع
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
