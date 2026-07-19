
"use client"

import { useMemo } from "react"
import { ArrowRight, HelpCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useFirestore } from "@/firebase/provider"
import { collection, query } from "firebase/firestore"
import { useCollection } from "@/firebase/firestore/use-collection"

export default function FAQPage() {
  const db = useFirestore()
  
  const faqsQuery = useMemo(() => 
    db ? query(collection(db, "faqs")) : null
  , [db])

  const { data: faqs, loading } = useCollection<any>(faqsQuery)

  return (
    <div className="flex flex-col gap-8 p-4 animate-fade-in pb-32 text-right">
      <div className="flex items-center justify-between">
        <Link href="/more" className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-100">
          <ArrowRight className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-black text-luxury-black">الأسئلة الشائعة</h1>
        <div className="w-10" />
      </div>

      <div className="bg-luxury-black p-10 rounded-xl text-center space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
        <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-white mx-auto shadow-xl relative z-10">
          <HelpCircle className="w-8 h-8" />
        </div>
        <div className="space-y-1 relative z-10">
          <h2 className="text-xl font-black text-white">تحتاج إجابات؟</h2>
          <p className="text-white/50 text-xs font-medium uppercase tracking-widest">We're here to help</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-50 shadow-sm p-4 luxury-shadow min-h-[300px]">
        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          </div>
        ) : faqs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq: any) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-b border-gray-50 last:border-none">
                <AccordionTrigger className="text-right font-black text-sm py-6 hover:no-underline text-luxury-black gap-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 text-xs leading-relaxed pb-6 pr-2 font-medium">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="py-20 text-center text-gray-300 font-bold text-xs">
            لا توجد أسئلة شائعة حالياً
          </div>
        )}
      </div>
      
      <div className="bg-primary/5 p-8 rounded-xl text-center space-y-4 border border-primary/10">
        <p className="text-sm font-black text-luxury-black">لم تجد إجابتك؟</p>
        <Link 
          href="https://wa.me/967777161451" 
          className="inline-flex items-center gap-2 text-primary font-black text-xs group"
        >
          تواصل معنا مباشرة عبر الواتساب
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}
