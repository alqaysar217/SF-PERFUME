
"use client"

import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Tag, Banknote, Sparkles } from "lucide-react"

interface ProductFormProps {
  editingItem: any
  brands: any[]
}

export function ProductForm({ editingItem, brands }: ProductFormProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-6">
        <div className="flex items-center justify-end gap-2 text-primary">
          <span className="text-[11px] font-black uppercase tracking-widest">المعلومات الأساسية</span>
          <Tag className="w-4 h-4" />
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2 text-right">
            <label className="text-[10px] font-bold text-gray-400 px-1">اسم المنتج</label>
            <div className="relative">
              <Input name="name" defaultValue={editingItem?.name} placeholder="مثال: سوفاج إليكسير" required className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right pr-4" />
              <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            </div>
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

          <div className="flex items-center justify-end gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100/50">
            <span className="text-xs font-bold text-luxury-black">تفعيل كعرض خاص وحصري</span>
            <Checkbox name="isOffer" defaultChecked={editingItem?.isOffer} />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-end gap-2 text-primary">
          <span className="text-[11px] font-black uppercase tracking-widest">الأسعار والتفاصيل</span>
          <Banknote className="w-4 h-4" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 text-right">
            <label className="text-[10px] font-bold text-gray-400 px-1">السعر الحالي (ر.ي)</label>
            <Input name="price" type="number" defaultValue={editingItem?.price} placeholder="0.00" required className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right" />
          </div>
          <div className="space-y-2 text-right">
            <label className="text-[10px] font-bold text-gray-400 px-1">السعر القديم</label>
            <Input name="oldPrice" type="number" defaultValue={editingItem?.oldPrice} placeholder="0.00" className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right" />
          </div>
        </div>
        <div className="space-y-2 text-right">
          <label className="text-[10px] font-bold text-gray-400 px-1">وصف العطر / المنتج</label>
          <textarea name="description" defaultValue={editingItem?.description} placeholder="اكتب وصفاً جذاباً للمنتج..." className="w-full min-h-[100px] p-4 rounded-xl bg-gray-50 border-none font-medium text-right text-sm outline-none focus:ring-1 focus:ring-primary/20 transition-all" />
        </div>
      </div>
    </div>
  )
}
