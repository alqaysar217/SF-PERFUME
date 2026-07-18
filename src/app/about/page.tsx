
"use client"

import { ArrowRight, Info, ShieldCheck, Star, Award } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-8 p-4 animate-fade-in pb-24">
      <div className="flex items-center justify-between">
        <Link href="/more" className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
          <ArrowRight className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-black text-luxury-black">من نحن</h1>
        <div className="w-10" />
      </div>

      <div className="bg-luxury-black p-10 rounded-[3rem] text-center text-white space-y-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/10 -z-10 animate-pulse" />
        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-luxury-black font-black text-2xl mx-auto shadow-2xl">SF</div>
        <h2 className="text-2xl font-black">SF PERFUME</h2>
        <p className="text-primary text-xs font-bold tracking-widest uppercase">Luxury Fragrance Experience</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-primary">
            <Info className="w-6 h-6" />
            <h3 className="text-lg font-black">قصتنا</h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            بدأت رحلتنا في مدينة المكلا بمحافظة حضرموت، بشغف حقيقي لتقديم أرقى أنواع العطور العالمية والساعات الفاخرة لعملائنا. نحن نؤمن أن العطر ليس مجرد رائحة، بل هو هوية وتعبير عن الشخصية.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {[
            { title: "رسالتنا", icon: ShieldCheck, desc: "توفير المنتجات الأصلية والمضمونة 100% لضمان ثقة ورضا عملائنا الدائم." },
            { title: "رؤيتنا", icon: Star, desc: "أن نكون الوجهة الأولى في اليمن لكل من يبحث عن الأناقة والتميز في عالم العطور." },
            { title: "قيمنا", icon: Award, desc: "الأمانة، الجودة، والرقي في التعامل مع كل عميل يزور متجرنا." }
          ].map((item, i) => (
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
    </div>
  )
}
