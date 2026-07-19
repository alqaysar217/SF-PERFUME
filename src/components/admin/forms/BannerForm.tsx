
"use client"

import { Input } from "@/components/ui/input"
import { LayoutGrid, Type, Sparkles } from "lucide-react"

interface BannerFormProps {
  editingItem: any
}

export function BannerForm({ editingItem }: BannerFormProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-start gap-2 text-primary">
        <LayoutGrid className="w-4 h-4" />
        <span className="text-[11px] font-black uppercase tracking-widest">محتوى البنر الإعلاني</span>
      </div>

      <div className="space-y-5">
        <div className="space-y-2 text-right">
          <label className="text-[10px] font-bold text-gray-400 px-1">العنوان الرئيسي</label>
          <div className="relative">
            <Input name="title" defaultValue={editingItem?.title} placeholder="مثال: عطور تجسد أناقتك" required className="h-14 rounded-2xl bg-gray-50 border-none font-bold text-right pr-4" />
            <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
          </div>
        </div>

        <div className="space-y-2 text-right">
          <label className="text-[10px] font-bold text-gray-400 px-1">العنوان الفرعي (اختياري)</label>
          <div className="relative">
            <Input name="subtitle" defaultValue={editingItem?.subtitle} placeholder="مثال: خصم 40% لفترة محدودة" className="h-14 rounded-2xl bg-gray-50 border-none font-bold text-right pr-4" />
            <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
          </div>
        </div>
      </div>
    </div>
  )
}
