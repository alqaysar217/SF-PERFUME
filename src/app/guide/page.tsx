"use client"

import { ArrowRight, BookOpen, Sparkles, Droplets, Zap } from "lucide-react"
import Link from "next/link"

export default function GuidePage() {
  const guides = [
    {
      title: "كيف تختار عطرك؟",
      desc: "اختر العطر بناءً على المناسبة والوقت؛ العطور الحمضية للنهار، والخشبية والشرقية للمساء.",
      icon: Sparkles
    },
    {
      title: "أماكن وضع العطر",
      desc: "يفضل وضع العطر على نقاط النبض مثل المعصمين، خلف الأذنين، وعند الرقبة لضمان فوحان أفضل.",
      icon: Droplets
    },
    {
      title: "الحفاظ على الثبات",
      desc: "احفظ زجاجة العطر في مكان بارد ومظلم، وتجنب هز الزجاجة أو تعريضها لأشعة الشمس المباشرة.",
      icon: Zap
    }
  ]

  return (
    <div className="flex flex-col gap-8 p-4 animate-fade-in pb-32">
      <div className="flex items-center justify-between">
        <Link href="/more" className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-100">
          <ArrowRight className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-black text-luxury-black">دليل العطور</h1>
        <div className="w-10" />
      </div>

      <div className="bg-primary/10 p-10 rounded-[3rem] text-center space-y-4">
        <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center text-white mx-auto shadow-xl">
          <BookOpen className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-black text-luxury-black">ثقافة العبير الفاخر</h2>
        <p className="text-gray-500 text-xs font-medium">تعلم كيف تستمتع بتجربة عطرية تدوم طويلاً</p>
      </div>

      <div className="space-y-4">
        {guides.map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shrink-0">
              <item.icon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-luxury-black text-sm">{item.title}</h4>
              <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
