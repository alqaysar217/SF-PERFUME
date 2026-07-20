
"use client"

import { Input } from "@/components/ui/input"
import { Star, Quote, User, Hash } from "lucide-react"

interface ReviewFormProps {
  editingItem: any
}

export function ReviewForm({ editingItem }: ReviewFormProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-start gap-2 text-primary">
        <Quote className="w-4 h-4" />
        <span className="text-[11px] font-black uppercase tracking-widest">شهادات العملاء</span>
      </div>

      <div className="space-y-5">
        <div className="space-y-2 text-right">
          <label className="text-[10px] font-bold text-gray-400 px-1">اسم العميل</label>
          <div className="relative">
            <Input name="name" defaultValue={editingItem?.name} placeholder="الاسم الكامل للعميل" required className="h-14 rounded-2xl bg-gray-50 border-none font-bold text-right pr-4" />
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 text-right">
            <label className="text-[10px] font-bold text-gray-400 px-1">التقييم</label>
            <div className="relative">
              <select name="rating" defaultValue={editingItem?.rating || 5} className="w-full h-14 rounded-2xl bg-gray-50 border-none font-bold px-4 text-right appearance-none">
                <option value="5">5 نجوم</option>
                <option value="4">4 نجوم</option>
                <option value="3">3 نجوم</option>
                <option value="2">2 نجمة</option>
                <option value="1">1 نجمة</option>
              </select>
              <Star className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-400 fill-current" />
            </div>
          </div>
          <div className="space-y-2 text-right">
            <label className="text-[10px] font-bold text-gray-400 px-1">رقم الترتيب</label>
            <div className="relative">
              <Input name="displayOrder" type="number" defaultValue={editingItem?.displayOrder || 1} placeholder="1" className="h-14 rounded-2xl bg-gray-50 border-none font-bold text-right pr-4" />
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            </div>
          </div>
        </div>

        <div className="space-y-2 text-right">
          <label className="text-[10px] font-bold text-gray-400 px-1">نص المراجعة</label>
          <textarea 
            name="content" 
            defaultValue={editingItem?.content} 
            placeholder="ماذا قال العميل عن تجربته؟" 
            required 
            className="w-full min-h-[100px] p-5 rounded-2xl bg-gray-50 border-none font-medium text-right text-sm outline-none focus:ring-1 focus:ring-primary/20 transition-all pr-4" 
          />
        </div>
      </div>
    </div>
  )
}
