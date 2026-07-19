
"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
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
import { errorEmitter } from '@/firebase/error-emitter'
import { FirestorePermissionError } from '@/firebase/errors'
import { DashboardView } from "@/components/admin/DashboardView"
import { AdminItemModal } from "@/components/admin/AdminItemModal"
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
import { ShieldAlert, ChevronRight, Plus, Percent, Loader2, Edit, Trash2, HelpCircle, Package, Award, CreditCard, Star, Image as ImageIcon, RotateCcw, FileText, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
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
  const [isOfferFilter, setIsOfferFilter] = useState(false)

  // Firestore Queries - Updated products query to use displayOrder
  const productsQuery = useMemo(() => db ? query(collection(db, "products"), orderBy("displayOrder", "asc"), orderBy("createdAt", "desc")) : null, [db])
  const brandsQuery = useMemo(() => db ? query(collection(db, "brands"), orderBy("name", "asc")) : null, [db])
  const accountsQuery = useMemo(() => db ? query(collection(db, "accounts")) : null, [db])
  const faqsQuery = useMemo(() => db ? query(collection(db, "faqs")) : null, [db])
  const reviewsQuery = useMemo(() => db ? query(collection(db, "reviews"), orderBy("createdAt", "desc")) : null, [db])
  const bannersQuery = useMemo(() => db ? query(collection(db, "banners"), orderBy("createdAt", "desc")) : null, [db])
  const trashQuery = useMemo(() => db ? query(collection(db, "trash"), orderBy("deletedAt", "desc")) : null, [db])

  const { data: products, loading: productsLoading } = useCollection(productsQuery)
  const { data: brands } = useCollection(brandsQuery)
  const { data: accounts, loading: accountsLoading } = useCollection(accountsQuery)
  const { data: faqs, loading: faqsLoading } = useCollection(faqsQuery)
  const { data: reviews, loading: reviewsLoading } = useCollection(reviewsQuery)
  const { data: banners, loading: bannersLoading } = useCollection(bannersQuery)
  const { data: trashItems, loading: trashLoading } = useCollection(trashQuery)

  useEffect(() => {
    setMounted(true)
    const isAdmin = localStorage.getItem('isAdmin')
    if (!isAdmin) {
      router.push('/admin/login')
    }
  }, [router])

  useEffect(() => {
    setActiveTab(tabParam || "dashboard")
  }, [tabParam])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 800 * 1024) {
        toast({ variant: "destructive", title: "حجم الصورة كبير", description: "يرجى اختيار صورة أقل من 800 كيلوبايت" })
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!db) return

    setIsSaving(true)
    const formData = new FormData(e.currentTarget)
    const data: any = Object.fromEntries(formData.entries())
    
    data.image = imagePreview || editingItem?.image || editingItem?.logo || ""
    if (activeTab === 'brands') data.logo = data.image
    if (activeTab === 'products') {
      data.price = Number(data.price)
      data.displayOrder = Number(data.displayOrder) || 1
      if (data.oldPrice) data.oldPrice = Number(data.oldPrice)
      data.isOffer = data.isOffer === 'on' || data.isOffer === 'true'
    }
    if (activeTab === 'reviews') data.rating = Number(data.rating)

    try {
      if (editingItem?.id) {
        const docRef = doc(db, activeTab, editingItem.id)
        await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() })
      } else {
        await addDoc(collection(db, activeTab), { ...data, createdAt: serverTimestamp() })
      }
      toast({ title: "تم الحفظ", description: "تم تحديث البيانات بنجاح" })
      setIsModalOpen(false)
      setEditingItem(null)
      setImagePreview(null)
    } catch (err) {
      errorEmitter.emit('permission-error', new FirestorePermissionError({ path: activeTab, operation: editingItem?.id ? 'update' : 'create', requestResourceData: data }))
    } finally {
      setIsSaving(false)
    }
  }

  const handleSoftDelete = async () => {
    if (!db || !deletingItem) return
    
    try {
      await addDoc(collection(db, "trash"), {
        originalData: deletingItem,
        originalCollection: activeTab,
        deletedAt: serverTimestamp()
      })
      await deleteDoc(doc(db, activeTab, deletingItem.id))
      toast({ title: "نُقل للمحذوفات" })
    } catch (err) {
      errorEmitter.emit('permission-error', new FirestorePermissionError({ path: activeTab, operation: 'delete' }))
    } finally {
      setIsDeleteDialogOpen(false)
      setDeletingItem(null)
    }
  }

  const handleRestore = async (item: any) => {
    if (!db) return
    try {
      await addDoc(collection(db, item.originalCollection), item.originalData)
      await deleteDoc(doc(db, "trash", item.id))
      toast({ title: "تمت الاستعادة" })
    } catch (err) {
      toast({ variant: "destructive", title: "خطأ في الاستعادة" })
    }
  }

  const handlePermanentDelete = async (itemId: string) => {
    if (!db) return
    try {
      await deleteDoc(doc(db, "trash", itemId))
      toast({ title: "حذف نهائي" })
    } catch (err) {
      toast({ variant: "destructive", title: "فشل الحذف" })
    }
  }

  const filteredItems = useMemo(() => {
    const map: any = { 
      products, brands, accounts, faqs, reviews, banners 
    }
    let items = map[activeTab] || []
    if (activeTab === "products" && isOfferFilter) return items.filter((p: any) => p.isOffer)
    return items
  }, [activeTab, products, brands, accounts, faqs, reviews, banners, isOfferFilter])

  // Calculate additional stats
  const offersCount = useMemo(() => products.filter((p: any) => p.isOffer).length, [products])

  if (!mounted) return null

  return (
    <div className="flex flex-col gap-8 p-4 animate-fade-in pb-32 bg-background text-right">
      {activeTab === "dashboard" ? (
        <DashboardView 
          productsCount={products.length} 
          offersCount={offersCount} 
          brandsCount={brands.length} 
        />
      ) : activeTab === "trash" ? (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center px-1">
             <button className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-luxury-black" onClick={() => router.push('/admin')}>
                <ChevronRight className="w-5 h-5" />
             </button>
             <h2 className="text-sm font-black text-luxury-black">سلة المحذوفات ({trashItems.length})</h2>
          </div>
          <div className="space-y-3">
            {trashLoading ? (
               <div className="py-10 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" /></div>
            ) : trashItems.map((item: any) => (
              <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-50 flex items-center justify-between luxury-shadow">
                <div className="flex items-center gap-4 text-right flex-1">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-300 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="text-right overflow-hidden">
                    <h4 className="text-xs font-black text-luxury-black line-clamp-1">{item.originalData.name || item.originalData.bank || item.originalData.question || item.originalData.title}</h4>
                    <p className="text-[9px] text-gray-400">حُذف من: {item.originalCollection}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleRestore(item)} className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center text-green-600 active:scale-90 transition-transform">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button onClick={() => handlePermanentDelete(item.id)} className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center text-red-600 active:scale-90 transition-transform">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center px-1">
             <button className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-luxury-black" onClick={() => router.push('/admin')}>
                <ChevronRight className="w-5 h-5" />
             </button>
            <div className="flex gap-2">
              {activeTab === 'products' && (
                <button 
                  onClick={() => setIsOfferFilter(!isOfferFilter)}
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                    isOfferFilter ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white text-gray-400 border border-gray-100"
                  )}
                >
                  <Percent className="w-5 h-5" />
                </button>
              )}
              <Button onClick={() => { setEditingItem(null); setImagePreview(null); setIsModalOpen(true); }} className="bg-primary text-white rounded-xl h-10 px-6 font-black text-[10px] gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-all">
                <Plus className="w-3.5 h-3.5" />
                إضافة {activeTab === 'products' ? 'منتج' : activeTab === 'accounts' ? 'حساب' : activeTab === 'brands' ? 'ماركة' : activeTab === 'faqs' ? 'سؤال' : activeTab === 'banners' ? 'بنر' : 'جديد'}
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {[productsLoading, accountsLoading, faqsLoading, reviewsLoading, bannersLoading].some(l => l && activeTab !== 'dashboard') ? (
              <div className="py-20 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" /></div>
            ) : filteredItems.map((item: any) => (
              <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between gap-4 luxury-shadow animate-fade-in text-right">
                <div className="flex items-center gap-4 text-right flex-1">
                  {(item.image || item.logo) ? (
                    <div className="w-12 h-12 rounded-lg bg-gray-50 overflow-hidden relative border border-gray-100 shrink-0">
                      <img src={item.image || item.logo || "https://picsum.photos/seed/placeholder/200/200"} alt="" className="object-cover w-full h-full" />
                      {item.isOffer && (
                         <div className="absolute top-0 right-0 p-0.5 bg-primary rounded-bl-lg shadow-sm">
                            <Percent className="w-2.5 h-2.5 text-white" />
                         </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-gray-300 shrink-0">
                      {activeTab === 'faqs' ? <HelpCircle className="w-6 h-6" /> : <Package className="w-6 h-6" />}
                    </div>
                  )}
                  <div className="text-right overflow-hidden">
                    <div className="flex items-center gap-1.5">
                       {item.displayOrder && <span className="bg-primary/10 text-primary text-[8px] px-1.5 py-0.5 rounded-full font-black">#{item.displayOrder}</span>}
                       <h4 className="text-xs font-black text-luxury-black line-clamp-1">{item.name || item.bank || item.question || item.title}</h4>
                    </div>
                    <p className="text-[10px] font-bold text-primary">
                      {item.price ? `${item.price.toLocaleString()} ر.ي` : 
                       item.account ? item.account : 
                       item.subtitle ? item.subtitle : 'تفاصيل'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => { setEditingItem(item); setImagePreview(item.image || item.logo || null); setIsModalOpen(true); }} className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 active:scale-90 transition-transform">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => { setDeletingItem(item); setIsDeleteDialogOpen(true); }} className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center text-gray-300 hover:text-primary active:scale-90 transition-transform">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <AdminItemModal 
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        activeTab={activeTab}
        editingItem={editingItem}
        imagePreview={imagePreview}
        onImageChange={handleFileChange}
        onSave={handleSave}
        isSaving={isSaving}
        brands={brands}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="fixed left-[50%] top-[50%] z-[100] grid w-[90%] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border-none p-10 text-right bg-white shadow-2xl overflow-hidden rounded-2xl">
          <AlertDialogHeader className="space-y-6">
            <div className="w-20 h-20 bg-luxury-black rounded-xl flex items-center justify-center text-primary mx-auto shadow-xl">
              <ShieldAlert className="w-10 h-10" />
            </div>
            <div className="space-y-2 text-center">
              <AlertDialogTitle className="text-2xl font-black text-luxury-black">تأكيد النقل</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-400 text-sm font-medium leading-relaxed text-center">
                سيتم نقل <span className="text-luxury-black font-black">"{deletingItem?.name || deletingItem?.bank || deletingItem?.title}"</span> لسلة المحذوفات.
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-10 flex flex-col sm:flex-row gap-3">
            <AlertDialogAction onClick={handleSoftDelete} className="flex-1 h-14 rounded-xl bg-luxury-black text-primary hover:bg-black/90 font-black text-md">
              نقل للمحذوفات
            </AlertDialogAction>
            <AlertDialogCancel className="flex-1 h-14 rounded-xl border-gray-100 bg-gray-50 text-gray-400 font-black text-md">
              تراجع
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
