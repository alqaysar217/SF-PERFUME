
"use client"

import { ArrowRight, Copy, CheckCircle2, CreditCard } from "lucide-react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"

const ACCOUNTS = [
  { id: 1, bank: "بنك الكريمي", name: "صالح فرج بن طالب", account: "123456789", type: "bank" },
  { id: 2, bank: "بنك بن دول", name: "صالح فرج بن طالب", account: "987654321", type: "bank" },
  { id: 3, bank: "بنك البسيري", name: "صالح فرج بن طالب", account: "456123789", type: "bank" },
  { id: 4, bank: "بنك حضرموت", name: "صالح فرج بن طالب", account: "321654987", type: "bank" },
  { id: 5, bank: "بنك القطيبي", name: "صالح فرج بن طالب", account: "159357852", type: "bank" },
  { id: 6, bank: "شركة العمقي", name: "صالح فرج بن طالب", account: "753159456", type: "exchange" },
  { id: 7, bank: "بي كاش (P-Cash)", name: "صالح فرج بن طالب", account: "777161451", type: "wallet" },
  { id: 8, bank: "بن دول باي", name: "صالح فرج بن طالب", account: "777161451", type: "wallet" },
  { id: 9, bank: "قروشي", name: "صالح فرج بن طالب", account: "777161451", type: "wallet" },
  { id: 10, bank: "بنك أمجاد", name: "صالح فرج بن طالب", account: "852456123", type: "bank" },
]

export default function PaymentInfoPage() {
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
        <h1 className="text-lg font-black text-luxury-black">بيانات التحويل</h1>
        <div className="w-10" />
      </div>

      <div className="bg-primary/10 p-8 rounded-[2.5rem] space-y-4 text-center border border-primary/20">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mx-auto shadow-xl">
          <CreditCard className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-black text-luxury-black">طريقة الدفع</h2>
          <p className="text-gray-500 text-xs leading-relaxed">يرجى التحويل لأحد الحسابات أدناه وإرسال صورة السند عبر الواتساب لتأكيد طلبك.</p>
        </div>
      </div>

      <div className="space-y-4">
        {ACCOUNTS.map((acc) => (
          <div key={acc.id} className="bg-white p-5 rounded-[2rem] border border-gray-50 shadow-sm space-y-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-1 h-full bg-primary/20" />
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center relative overflow-hidden border border-gray-100">
                 <Image 
                    src={`https://picsum.photos/seed/${acc.bank}/100/100`} 
                    alt={acc.bank} 
                    fill 
                    className="object-cover opacity-50"
                  />
                 <span className="relative z-10 text-[10px] font-black text-luxury-black text-center px-1">{acc.bank}</span>
              </div>
              <div className="flex-1 space-y-0.5">
                <p className="text-[10px] text-gray-400 font-bold uppercase">{acc.bank}</p>
                <p className="text-sm font-black text-luxury-black">{acc.name}</p>
              </div>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
              <code className="text-lg font-black text-primary tracking-widest">{acc.account}</code>
              <button 
                onClick={() => handleCopy(acc.account)}
                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-400 active:text-primary active:scale-90 transition-all border border-gray-100"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
