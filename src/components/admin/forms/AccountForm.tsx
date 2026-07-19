
"use client"

import { Input } from "@/components/ui/input"
import { Building2, User, Hash, CreditCard } from "lucide-react"

interface AccountFormProps {
  editingItem: any
}

export function AccountForm({ editingItem }: AccountFormProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-start gap-2 text-primary">
        <CreditCard className="w-4 h-4" />
        <span className="text-[11px] font-black uppercase tracking-widest">بيانات الحساب البنكي</span>
      </div>
      
      <div className="space-y-5">
        <div className="space-y-2 text-right">
          <label className="text-[10px] font-bold text-gray-400 px-1">اسم البنك / شركة الصرافة</label>
          <div className="relative">
            <Input name="bank" defaultValue={editingItem?.bank} placeholder="مثال: بنك الكريمي" required className="h-14 rounded-2xl bg-gray-50 border-none font-bold text-right pr-4" />
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
          </div>
        </div>

        <div className="space-y-2 text-right">
          <label className="text-[10px] font-bold text-gray-400 px-1">اسم صاحب الحساب</label>
          <div className="relative">
            <Input name="name" defaultValue={editingItem?.name} placeholder="الاسم الرباعي كما في السجل" required className="h-14 rounded-2xl bg-gray-50 border-none font-bold text-right pr-4" />
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
          </div>
        </div>

        <div className="space-y-2 text-right">
          <label className="text-[10px] font-bold text-gray-400 px-1">رقم الحساب / الآيبان</label>
          <div className="relative">
            <Input name="account" defaultValue={editingItem?.account} placeholder="0000000000" required className="h-14 rounded-2xl bg-gray-50 border-none font-bold text-right pr-4" />
            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
          </div>
        </div>
      </div>
    </div>
  )
}
