
"use client"

import { Input } from "@/components/ui/input"
import { HelpCircle, MessageSquare } from "lucide-react"

interface FAQFormProps {
  editingItem: any
}

export function FAQForm({ editingItem }: FAQFormProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-end gap-2 text-primary">
        <span className="text-[11px] font-black uppercase tracking-widest">الأسئلة المتكررة</span>
        <HelpCircle className="w-4 h-4" />
      </div>

      <div className="space-y-5">
        <div className="space-y-2 text-right">
          <label className="text-[10px] font-bold text-gray-400 px-1">نص السؤال</label>
          <div className="relative">
            <Input name="question" defaultValue={editingItem?.question} placeholder="مثال: هل العطور أصلية؟" required className="h-14 rounded-2xl bg-gray-50 border-none font-bold text-right pr-4" />
            <HelpCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
          </div>
        </div>

        <div className="space-y-2 text-right">
          <label className="text-[10px] font-bold text-gray-400 px-1">الإجابة التفصيلية</label>
          <div className="relative">
            <textarea 
              name="answer" 
              defaultValue={editingItem?.answer} 
              placeholder="اكتب الإجابة هنا..." 
              required 
              className="w-full min-h-[120px] p-5 rounded-2xl bg-gray-50 border-none font-medium text-right text-sm outline-none focus:ring-1 focus:ring-primary/20 transition-all pr-4" 
            />
            <MessageSquare className="absolute left-4 bottom-4 w-5 h-5 text-gray-300" />
          </div>
        </div>
      </div>
    </div>
  )
}
