
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Tag, Banknote, Sparkles, Maximize2, Droplets, Zap, ShieldCheck, Hash, Watch } from "lucide-react"

interface ProductFormProps {
  editingItem: any
  brands: any[]
}

export function ProductForm({ editingItem, brands }: ProductFormProps) {
  // حالة لمراقبة الفئة المختارة لجعل الواجهة ذكية
  const [category, setCategory] = useState(editingItem?.category || 'men')

  const isWatch = category === 'watches'

  return (
    <div className="space-y-8 animate-fade-in">
      {/* المعلومات الأساسية */}
      <div className="space-y-6">
        <div className="flex items-center justify-start gap-2 text-primary">
          <Tag className="w-4 h-4" />
          <span className="text-[11px] font-black uppercase tracking-widest">المعلومات الأساسية</span>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2 text-right">
            <label className="text-[10px] font-bold text-gray-400 px-1">اسم المنتج</label>
            <div className="relative">
              <Input name="name" defaultValue={editingItem?.name} placeholder={isWatch ? "مثال: رولكس دايتونا ذهب" : "مثال: سوفاج إليكسير"} required className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right pr-4" />
              <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            </div>
          </div>

          <div className="space-y-2 text-right">
            <label className="text-[10px] font-bold text-gray-400 px-1">رقم الترتيب (يحدد أولوية الظهور - 1 يظهر أولاً)</label>
            <div className="relative">
              <Input name="displayOrder" type="number" defaultValue={editingItem?.displayOrder || 1} placeholder="1" className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right pr-4" />
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
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
              <select 
                name="category" 
                defaultValue={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-12 rounded-xl bg-gray-50 border-none font-bold px-4 text-right appearance-none"
              >
                <option value="men">عطور رجالية</option>
                <option value="women">عطور نسائية</option>
                <option value="unisex">عطور للجنسين (للإثنين)</option>
                <option value="watches">ساعات فاخرة</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 text-right">
            <label className="text-[10px] font-bold text-gray-400 px-1">
              {isWatch ? "القياس (مثال: 40 ملم)" : "الحجم (مثال: 100 مل)"}
            </label>
            <div className="relative">
              <Input name="size" defaultValue={editingItem?.size} placeholder={isWatch ? "40 ملم" : "100 مل"} className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right pr-4" />
              <Maximize2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100/50">
            <span className="text-xs font-bold text-luxury-black">تفعيل كعرض خاص وحصري</span>
            <Checkbox name="isOffer" defaultChecked={editingItem?.isOffer} />
          </div>
        </div>
      </div>

      {/* الأسعار والتفاصيل */}
      <div className="space-y-6">
        <div className="flex items-center justify-start gap-2 text-primary">
          <Banknote className="w-4 h-4" />
          <span className="text-[11px] font-black uppercase tracking-widest">الأسعار والتفاصيل</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 text-right">
            <label className="text-[10px] font-bold text-gray-400 px-1">السعر الحالي (ر.س)</label>
            <Input name="price" type="number" defaultValue={editingItem?.price} placeholder="0.00" required className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right" />
          </div>
          <div className="space-y-2 text-right">
            <label className="text-[10px] font-bold text-gray-400 px-1">السعر القديم</label>
            <Input name="oldPrice" type="number" defaultValue={editingItem?.oldPrice} placeholder="0.00" className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right" />
          </div>
        </div>

        {/* حقول متغيرة بناءً على نوع المنتج */}
        {!isWatch ? (
          <>
            <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-300">
              <div className="space-y-2 text-right">
                <label className="text-[10px] font-bold text-gray-400 px-1">الفوحان</label>
                <div className="relative">
                  <Input name="projection" defaultValue={editingItem?.projection} placeholder="مثال: قوي جداً" className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right pr-4" />
                  <Droplets className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                </div>
              </div>
              <div className="space-y-2 text-right">
                <label className="text-[10px] font-bold text-gray-400 px-1">الثبات</label>
                <div className="relative">
                  <Input name="longevity" defaultValue={editingItem?.longevity} placeholder="مثال: 12+ ساعة" className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right pr-4" />
                  <Zap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                </div>
              </div>
            </div>

            <div className="space-y-2 text-right animate-in fade-in duration-300">
              <label className="text-[10px] font-bold text-gray-400 px-1">المكونات العطرية (افصل بينها بفاصلة ،)</label>
              <div className="relative">
                <Input name="ingredients" defaultValue={editingItem?.ingredients} placeholder="مثال: خشب، صندل، لافندر" className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right pr-4" />
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-2 text-right animate-in slide-in-from-top-2 duration-300">
            <label className="text-[10px] font-bold text-gray-400 px-1">مواد التصنيع والمميزات (مثل: زجاج ياقوتي، ماكينة يابانية)</label>
            <div className="relative">
              <Input name="ingredients" defaultValue={editingItem?.ingredients} placeholder="مثال: فولاذ مقاوم للصدأ، جلد طبيعي" className="h-12 rounded-xl bg-gray-50 border-none font-bold text-right pr-4" />
              <Watch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            </div>
          </div>
        )}

        <div className="space-y-2 text-right">
          <label className="text-[10px] font-bold text-gray-400 px-1">
            {isWatch ? "وصف الساعة" : "وصف العطر / المنتج"}
          </label>
          <textarea name="description" defaultValue={editingItem?.description} placeholder={isWatch ? "اكتب تفاصيل عن مميزات الساعة..." : "اكتب وصفاً جذاباً للمنتج..."} className="w-full min-h-[120px] p-4 rounded-xl bg-gray-50 border-none font-medium text-right text-sm outline-none focus:ring-1 focus:ring-primary/20 transition-all" />
        </div>
      </div>
    </div>
  )
}
