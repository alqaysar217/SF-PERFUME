
"use client"

import { useMemo } from "react"
import { ArrowRight, Copy, CreditCard, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "@/hooks/use-toast"
import { useFirestore } from "@/firebase/provider"
import { collection, query } from "firebase/firestore"
import { useCollection } from "@/firebase/firestore/use-collection"

export default function PaymentInfoPage() {
  const db = useFirestore()
  
  const accountsQuery = useMemo(() => 
    db ? query(collection(db, "accounts")) : null
  , [db])

  const { data: accounts, loading } = useCollection<any>(accountsQuery)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "تم النسخ",
      description: "تم نسخ رقم الحساب بنجاح.",
    })
  }

  return (
    <div className="flex flex-col gap-8 p-4 animate-fade-in pb-32">
      <div className="flex items-center justify-between">
        <Link href="/more" className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-100">
          <ArrowRight className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-black text-luxury-black text-right">بيانات التحويل</h1>
        <div className="w-10" />
      </div>

      <div className="bg-primary/10 p-8 rounded-xl space-y-4 text-center border border-primary/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
        <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-white mx-auto shadow-xl relative z-10">
          <CreditCard className="w-8 h-8" />
        </div>
        <div className="space-y-1 relative z-10">
          <h2 className="text-xl font-black text-luxury-black">طريقة الدفع</h2>
          <p className="text-gray-500 text-xs leading-relaxed font-medium">يرجى التحويل لأحد الحسابات أدناه وإرسال صورة السند عبر الواتساب لتأكيد طلبك.</p>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            <p className="text-xs font-bold text-gray-400 mt-4">جاري جلب بيانات الحسابات...</p>
          </div>
        ) : accounts.length > 0 ? (
          accounts.map((acc: any) => (
            <div key={acc.id} className="bg-white p-5 rounded-xl border border-gray-50 shadow-sm space-y-4 relative overflow-hidden group luxury-shadow">
              <div className="absolute top-0 right-0 w-1 h-full bg-primary/20" />
              <div className="flex items-center gap-4 text-right">
                <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center relative overflow-hidden border border-gray-100 shrink-0">
                  <Image 
                    src={acc.image || `https://picsum.photos/seed/${acc.bank}/100/100`} 
                    alt={acc.bank} 
                    fill 
                    className="object-cover opacity-60"
                  />
                  <span className="relative z-10 text-[9px] font-black text-luxury-black text-center px-1 bg-white/40 backdrop-blur-sm rounded-md line-clamp-2">{acc.bank}</span>
                </div>
                <div className="flex-1 space-y-0.5">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{acc.bank}</p>
                  <p className="text-sm font-black text-luxury-black">{acc.name}</p>
                </div>
              </div>

              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
                <code className="text-lg font-black text-primary tracking-widest">{acc.account}</code>
                <button 
                  onClick={() => handleCopy(acc.account)}
                  className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-400 active:text-primary active:scale-90 transition-all border border-gray-100 shadow-sm"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-gray-300 font-bold text-xs uppercase tracking-widest">
            لا توجد حسابات بنكية مضافة حالياً
          </div>
        )}
      </div>
    </div>
  )
}
