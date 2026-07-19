
"use client"

import { useRef } from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Tag, 
  Banknote, 
  Image as ImageIcon, 
  Upload, 
  Save, 
  Loader2, 
  Type, 
  HelpCircle, 
  MessageSquare, 
  Star as StarIcon,
  User as UserIcon,
  Building2,
  Hash,
  Quote
} from "lucide-react"

interface AdminItemModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  activeTab: string
  editingItem: any
  imagePreview: string | null
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSave: (e: React.FormEvent<HTMLFormElement>) => void
  isSaving: boolean
  brands: any[]
}

export function AdminItemModal({
  isOpen,
  onOpenChange,
  activeTab,
  editingItem,
  imagePreview,
  onImageChange,
  onSave,
  isSaving,
  brands
}: AdminItemModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="fixed left-[50%] top-[50%] z-50 w-[95%] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border-none shadow-2xl rounded-[2rem] p-0 overflow-hidden flex flex-col bg-white max-h-[90vh]">
        <div className="p-6 border-b border-gray-50 bg-white sticky top-0 z-10">
          <DialogTitle className="text-right font-black text-xl text-luxury-black">
            {editingItem ? "تحديث البيانات" : `إضافة ${
              activeTab === 'products' ? 'منتج' : 
              activeTab === 'accounts' ? 'حساب' : 
              activeTab === 'brands' ? 'ماركة' : 
              activeTab === 'faqs' ? 'سؤال' : 
              activeTab === 'banners' ? 'بنر' : 
              activeTab === 'reviews' ? 'رأي' : 'جديد'
            }`}
          </DialogTitle>
        </div>
        
        <form onSubmit={onSave} className="flex-1 overflow-y-auto px-6 pb-32 space-y-8 pt-6 scrollbar-hide text-right">
          {/* Products Form */}
          {activeTab === "products" && (
            <>
              <div className="space-y-6">
                <div className="flex items-center justify-end gap-2 text-primary">
                  <span className="text-[11px] font-black uppercase tracking-widest">المعلومات الأساسية</span>
                  <Tag className="w-4 h-4" />
                </div>
                <div className="space-y-4">
                  <div className="space-y-2 text-right">
                    <label className="text-[10px] font-bold text-gray-400 px-1">اسم المنتج</label>
                    <Input name="name" defaultValue={editingItem?.name} placeholder="مثال: سوفاج إليكسير" required className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 text-right">
                      <label className="text-[10px] font-bold text-gray-400 px-1">الماركة</label>
                      <select name="brand" defaultValue={editingItem?.brand} required className="w-full h-12 rounded-xl bg-gray-50 border-none font-bold px-4 text-right appearance-none">
                        <option value="" disabled>اختر الماركة</option>
                        {brands.map((b: any) => (
                          <option key={b.id} value={b.name}>{b.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2 text-right">
                      <label className="text-[10px] font-bold text-gray-400 px-1">التصنيف</label>
                      <select name="category" defaultValue={editingItem?.category || 'men'} className="w-full h-12 rounded-xl bg-gray-50 border-none font-bold px-4 text-right appearance-none">
                        <option value="men">عطور رجالية</option>
                        <option value="women">عطور نسائية</option>
                        <option value="watches">ساعات فاخرة</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-3 bg-gray-50 p-4 rounded-xl">
                    <span className="text-xs font-bold text-luxury-black">عرض خاص وحصري</span>
                    <Checkbox name="isOffer" defaultChecked={editingItem?.isOffer} />
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-end gap-2 text-primary">
                  <span className="text-[11px] font-black uppercase tracking-widest">الأسعار والمواصفات</span>
                  <Banknote className="w-4 h-4" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 text-right">
                    <label className="text-[10px] font-bold text-gray-400 px-1">السعر الحالي</label>
                    <Input name="price" type="number" defaultValue={editingItem?.price} placeholder="0.00" required className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right" />
                  </div>
                  <div className="space-y-2 text-right">
                    <label className="text-[10px] font-bold text-gray-400 px-1">السعر القديم</label>
                    <Input name="oldPrice" type="number" defaultValue={editingItem?.oldPrice} placeholder="0.00" className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right" />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Brands Form */}
          {activeTab === "brands" && (
            <div className="space-y-6">
              <div className="flex items-center justify-end gap-2 text-primary">
                <span className="text-[11px] font-black uppercase tracking-widest">معلومات الماركة</span>
                <ImageIcon className="w-4 h-4" />
              </div>
              <div className="space-y-4">
                <div className="space-y-2 text-right">
                  <label className="text-[10px] font-bold text-gray-400 px-1">اسم الماركة</label>
                  <Input name="name" defaultValue={editingItem?.name} placeholder="مثال: ديور" required className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right" />
                </div>
              </div>
            </div>
          )}

          {/* Bank Accounts Form */}
          {activeTab === "accounts" && (
            <div className="space-y-6">
              <div className="flex items-center justify-end gap-2 text-primary">
                <span className="text-[11px] font-black uppercase tracking-widest">بيانات التحويل</span>
                <CreditCard className="w-4 h-4" />
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
                    <Input name="name" defaultValue={editingItem?.name} placeholder="الاسم الكامل" required className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right pr-4" />
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  </div>
                </div>
                <div className="space-y-2 text-right">
                  <label className="text-[10px] font-bold text-gray-400 px-1">رقم الحساب / الآيبان</label>
                  <div className="relative">
                    <Input name="account" defaultValue={editingItem?.account} placeholder="123456789" required className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right pr-4" />
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQs Form */}
          {activeTab === "faqs" && (
            <div className="space-y-6">
              <div className="flex items-center justify-end gap-2 text-primary">
                <span className="text-[11px] font-black uppercase tracking-widest">الأسئلة والأجوبة</span>
                <HelpCircle className="w-4 h-4" />
              </div>
              <div className="space-y-4">
                <div className="space-y-2 text-right">
                  <label className="text-[10px] font-bold text-gray-400 px-1">السؤال</label>
                  <Input name="question" defaultValue={editingItem?.question} placeholder="أين موقعكم؟" required className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right" />
                </div>
                <div className="space-y-2 text-right">
                  <label className="text-[10px] font-bold text-gray-400 px-1">الإجابة</label>
                  <Textarea name="answer" defaultValue={editingItem?.answer} placeholder="نحن في المكلا..." required className="rounded-xl bg-gray-50 border-none font-bold text-right" />
                </div>
              </div>
            </div>
          )}

          {/* Banners Form */}
          {activeTab === "banners" && (
            <div className="space-y-6">
              <div className="flex items-center justify-end gap-2 text-primary">
                <span className="text-[11px] font-black uppercase tracking-widest">محتوى البنر</span>
                <Type className="w-4 h-4" />
              </div>
              <div className="space-y-4">
                <div className="space-y-2 text-right">
                  <label className="text-[10px] font-bold text-gray-400 px-1">العنوان الرئيسي</label>
                  <Input name="title" defaultValue={editingItem?.title} placeholder="عطور تجسد أناقتك" required className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right" />
                </div>
                <div className="space-y-2 text-right">
                  <label className="text-[10px] font-bold text-gray-400 px-1">العنوان الفرعي</label>
                  <Input name="subtitle" defaultValue={editingItem?.subtitle} placeholder="خصم 40% لفترة محدودة" className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right" />
                </div>
              </div>
            </div>
          )}

          {/* Reviews Form */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex items-center justify-end gap-2 text-primary">
                <span className="text-[11px] font-black uppercase tracking-widest">رأي العميل</span>
                <Quote className="w-4 h-4" />
              </div>
              <div className="space-y-4">
                <div className="space-y-2 text-right">
                  <label className="text-[10px] font-bold text-gray-400 px-1">اسم العميل</label>
                  <Input name="name" defaultValue={editingItem?.name} placeholder="سالم بن طالب" required className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right" />
                </div>
                <div className="space-y-2 text-right">
                  <label className="text-[10px] font-bold text-gray-400 px-1">التقييم (1-5)</label>
                  <div className="relative">
                    <Input name="rating" type="number" min="1" max="5" defaultValue={editingItem?.rating || 5} required className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right" />
                    <StarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                </div>
                <div className="space-y-2 text-right">
                  <label className="text-[10px] font-bold text-gray-400 px-1">نص الرأي</label>
                  <Textarea name="content" defaultValue={editingItem?.content} placeholder="تجربة رائعة مع SF..." required className="rounded-xl bg-gray-50 border-none font-bold text-right min-h-[100px]" />
                </div>
              </div>
            </div>
          )}

          {/* Shared Image Upload Section */}
          {activeTab !== "faqs" && (
            <div className="space-y-6">
              <div className="flex items-center justify-end gap-2 text-primary">
                <span className="text-[11px] font-black uppercase tracking-widest">الصورة المرفقة</span>
                <ImageIcon className="w-4 h-4" />
              </div>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative aspect-[16/9] rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:border-primary/50 transition-colors"
              >
                {imagePreview ? (
                  <img src={imagePreview} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center space-y-2">
                    <Upload className="w-8 h-8 text-gray-300 mx-auto" />
                    <p className="text-[10px] font-bold text-gray-400">اضغط لرفع صورة</p>
                  </div>
                )}
                <input type="file" ref={fileInputRef} onChange={onImageChange} accept="image/*" className="hidden" />
              </div>
            </div>
          )}

          {/* Floating Save Button inside ScrollArea */}
          <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-md border-t z-50">
            <Button type="submit" disabled={isSaving} className="w-full h-14 bg-luxury-black text-primary rounded-2xl font-black text-md shadow-xl gap-3 active:scale-95 transition-all">
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {editingItem ? "حفظ التغييرات" : "إضافة للمتجر"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

import { CreditCard } from "lucide-react"
