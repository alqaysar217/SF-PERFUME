
"use client"

import { ArrowRight, Phone, MessageCircle, MapPin, Instagram, Facebook, Share2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  const contactInfo = [
    { title: "رقم التواصل", value: "777161451", icon: Phone, action: "tel:777161451" },
    { title: "واتساب", value: "777161451", icon: MessageCircle, action: "https://wa.me/967777161451" },
    { title: "الموقع", value: "اليمن - حضرموت - المكلا", icon: MapPin, action: "#" },
  ]

  return (
    <div className="flex flex-col gap-8 p-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <Link href="/more" className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
          <ArrowRight className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-black text-luxury-black">تواصل معنا</h1>
        <div className="w-10" />
      </div>

      <div className="space-y-4">
        {contactInfo.map((info, i) => {
          const Icon = info.icon
          return (
            <Link key={i} href={info.action} className="bg-white p-6 rounded-[2rem] flex items-center gap-4 border border-gray-50 shadow-sm active:scale-95 transition-transform">
              <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                <Icon className="w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase">{info.title}</span>
                <span className="text-sm font-black text-luxury-black">{info.value}</span>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="bg-luxury-black p-10 rounded-[3rem] text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="grid grid-cols-4 gap-4 rotate-12 -translate-y-20">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="w-full aspect-square border border-white rounded-full" />
            ))}
          </div>
        </div>
        
        <div className="space-y-2 relative z-10">
          <h3 className="text-xl font-black text-white">تابعنا على السوشيال ميديا</h3>
          <p className="text-white/50 text-xs">كن أول من يعرف عن عروضنا الحصرية</p>
        </div>

        <div className="grid grid-cols-3 gap-4 relative z-10">
          {[
            { name: "انستجرام", icon: Instagram, link: "https://instagram.com/sf_perfume20", color: "bg-pink-500" },
            { name: "فيسبوك", icon: Facebook, link: "https://facebook.com/sf_perfume", color: "bg-blue-600" },
            { name: "ثريدز", icon: Share2, link: "https://threads.net/@sf_perfume20", color: "bg-gray-800" },
          ].map((soc, i) => {
            const Icon = soc.icon
            return (
              <Link key={i} href={soc.link} className="flex flex-col items-center gap-3">
                <div className={`w-14 h-14 ${soc.color} text-white rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <span className="text-[10px] font-bold text-white/70">{soc.name}</span>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="text-center pt-8">
        <p className="text-xs text-gray-300 font-bold uppercase tracking-widest">SF PERFUME & LUXURY</p>
      </div>
    </div>
  )
}
