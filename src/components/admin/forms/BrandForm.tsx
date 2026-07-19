
"use client"

import { Input } from "@/components/ui/input"
import { Award, Type } from "lucide-react"

interface BrandFormProps {
  editingItem: any
}

export function BrandForm({ editingItem }: BrandFormProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-end gap-2 text-primary">
        <span className="text-[11px] font-black uppercase tracking-widest">الماركات العالمية</span>
        <Award className="w-4 h-4" />
      </div>

      <div className="space-y-5">
        <div className="space-y-2 text-right">
          <label className="text-[10px] font-bold text-gray-400 px-1">اسم الماركة</label>
          <div className="relative">
            <Input name="name" defaultValue={editingItem?.name} placeholder="مثال: ديور" required className="h-14 rounded-2xl bg-gray-50 border-none font-bold text-right pr-4" />
            <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
          </div>
        </div>
      </div>
    </div>
  )
}
