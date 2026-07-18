
"use client"

import { ArrowRight, HelpCircle, ChevronDown } from "lucide-react"
import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQS = [
  {
    q: "أين موقعكم بالتحديد؟",
    a: "نحن نتواجد في اليمن - حضرموت - المكلا. يمكنك التواصل معنا عبر الواتساب للحصول على موقع المحل بالتحديد عبر الخريطة."
  },
  {
    q: "كيف يمكنني تأكيد طلبي بعد التحويل؟",
    a: "بمجرد إتمام عملية التحويل لأحد حساباتنا البنكية، يرجى تصوير السند وإرساله مع رقم هاتفك واسم المنتج عبر الواتساب، وسيقوم فريقنا بتأكيد الطلب فوراً."
  },
  {
    q: "هل العطور أصلية تماماً؟",
    a: "نعم، نحن نضمن أن كافة العطور والساعات لدينا أصلية 100%، ونحن نستوردها من مصادرها الموثوقة لضمان أعلى جودة لعملائنا."
  },
  {
    q: "كم يستغرق التوصيل داخل المكلا؟",
    a: "التوصيل داخل مدينة المكلا يتم في نفس اليوم عادةً، أو خلال 24 ساعة كحد أقصى."
  },
  {
    q: "هل توجد خدمة شحن للمحافظات الأخرى؟",
    a: "نعم، نوفر خدمة الشحن لكافة المحافظات اليمنية عبر شركات النقل المحلية الموثوقة."
  }
]

export default function FAQPage() {
  return (
    <div className="flex flex-col gap-8 p-4 animate-fade-in pb-32">
      <div className="flex items-center justify-between">
        <Link href="/more" className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-100">
          <ArrowRight className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-black text-luxury-black">الأسئلة الشائعة</h1>
        <div className="w-10" />
      </div>

      <div className="bg-luxury-black p-10 rounded-[3rem] text-center space-y-4">
        <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center text-white mx-auto shadow-xl">
          <HelpCircle className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-black text-white">تحتاج إجابات؟</h2>
        <p className="text-white/50 text-xs font-medium uppercase tracking-widest">We're here to help</p>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm p-4">
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-gray-50 last:border-none">
              <AccordionTrigger className="text-right font-black text-sm py-6 hover:no-underline text-luxury-black">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 text-xs leading-relaxed pb-6 pr-2">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      <div className="bg-primary/5 p-8 rounded-[2.5rem] text-center space-y-4 border border-primary/10">
        <p className="text-sm font-black text-luxury-black">لم تجد إجابتك؟</p>
        <Link 
          href="https://wa.me/967777161451" 
          className="inline-flex items-center gap-2 text-primary font-black text-xs"
        >
          تواصل معنا مباشرة عبر الواتساب
          <ArrowRight className="w-4 h-4 rotate-180" />
        </Link>
      </div>
    </div>
  )
}
