
"use client"

import { useRef } from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { 
  Image as ImageIcon, 
  Upload, 
  Save, 
  Loader2,
  X 
} from "lucide-react"
import { ProductForm } from "./forms/ProductForm"
import { BrandForm } from "./forms/BrandForm"
import { AccountForm } from "./forms/AccountForm"
import { FAQForm } from "./forms/FAQForm"
import { ReviewForm } from "./forms/ReviewForm"
import { BannerForm } from "./forms/BannerForm"

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

  const renderForm = () => {
    switch (activeTab) {
      case 'products': return <ProductForm editingItem={editingItem} brands={brands} />
      case 'brands': return <BrandForm editingItem={editingItem} />
      case 'accounts': return <AccountForm editingItem={editingItem} />
      case 'faqs': return <FAQForm editingItem={editingItem} />
      case 'reviews': return <ReviewForm editingItem={editingItem} />
      case 'banners': return <BannerForm editingItem={editingItem} />
      default: return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="fixed left-[50%] top-[50%] z-50 w-[95%] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border-none shadow-2xl rounded-xl p-0 overflow-hidden flex flex-col bg-white max-h-[90vh]">
        <div className="p-6 border-b border-gray-50 bg-white sticky top-0 z-10 flex items-center justify-between">
          <DialogTitle className="text-right font-black text-xl text-luxury-black">
            {editingItem ? "تحديث البيانات" : `إضافة جديد`}
          </DialogTitle>
          <DialogClose className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:text-primary transition-colors">
            <X className="w-5 h-5" />
          </DialogClose>
        </div>
        
        <form onSubmit={onSave} className="flex-1 overflow-y-auto px-6 pb-32 space-y-8 pt-6 scrollbar-hide text-right">
          {renderForm()}

          {activeTab !== "faqs" && (
            <div className="space-y-6">
              <div className="flex flex-row items-center justify-start gap-2 text-primary">
                <ImageIcon className="w-4 h-4" />
                <span className="text-[11px] font-black uppercase tracking-widest">الصورة المرفقة</span>
              </div>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative aspect-[16/9] rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:border-primary/50 transition-colors group"
              >
                {imagePreview ? (
                  <img src={imagePreview} className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" alt="Preview" />
                ) : (
                  <div className="text-center space-y-2">
                    <Upload className="w-8 h-8 text-gray-300 mx-auto group-hover:text-primary transition-colors" />
                    <p className="text-[10px] font-bold text-gray-400">اضغط لرفع صورة</p>
                  </div>
                )}
                <input type="file" ref={fileInputRef} onChange={onImageChange} accept="image/*" className="hidden" />
              </div>
            </div>
          )}

          <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-md border-t z-50">
            <Button type="submit" disabled={isSaving} className="w-full h-14 bg-luxury-black text-primary rounded-xl font-black text-md shadow-xl gap-3 active:scale-95 transition-all">
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {editingItem ? "حفظ التغييرات" : "إضافة للمتجر"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
