
"use client"

import { Info, Phone, Award, Star, Share2, Instagram, Facebook, MessageCircle, ArrowLeft, ChevronLeft, MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function MorePage() {
  const menuItems = [
    { name: "من نحن", icon: Info, href: "/about" },
    { name: "تواصل معنا", icon: Phone, href: "/contact" },
    { name: "الماركات العالمية", icon: Award, href: "/brands" },
    { name: "قيم التطبيق", icon: Star, href: "#" },
    { name: "شارك المتجر", icon: Share2, href: "#" },
  ]

  return (
    <div className="flex flex-col gap-8 p-4 animate-in fade-in duration-500">
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-4 py-8 bg-luxury-black rounded-[3rem] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -z-10 animate-pulse" />
        <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center text-luxury-black font-black text-3xl shadow-2xl relative">
          SF
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-white text-xs">✨</div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-black tracking-tighter">SF PERFUME</h2>
          <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Luxury Experience</p>
        </div>
      </div>

      {/* Settings List */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-50 overflow-hidden">
        {menuItems.map((item, i) => {
          const Icon = item.icon
          return (
            <Link 
              key={i} 
              href={item.href}
              className={`flex items-center justify-between p-6 hover:bg-gray-50 transition-colors ${i !== menuItems.length - 1 ? 'border-b border-gray-50' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-luxury-black group-hover:text-primary transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-luxury-black">{item.name}</span>
              </div>
              <ChevronLeft className="w-5 h-5 text-gray-300" />
            </Link>
          )
        })}
      </div>

      {/* Contact Support Card */}
      <div className="bg-primary p-8 rounded-[2.5rem] text-white flex flex-col gap-6 shadow-xl shadow-primary/20 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
         <div className="space-y-2">
            <h3 className="text-lg font-black">هل تحتاج لمساعدة؟</h3>
            <p className="text-white/70 text-xs">فريق الدعم الفني متواجد لخدمتك طوال اليوم.</p>
         </div>
         <Button className="bg-white text-primary hover:bg-white/90 rounded-2xl h-14 font-black gap-2">
            <MessageCircle className="w-5 h-5" />
            تحدث معنا الآن
         </Button>
      </div>

      {/* Social Media */}
      <div className="flex justify-center gap-4 pt-4">
        {[
          { icon: Instagram, link: "https://instagram.com/sf_perfume20" },
          { icon: Facebook, link: "https://facebook.com/sf_perfume" },
          { icon: Phone, link: "tel:777161451" },
        ].map((social, i) => {
          const Icon = social.icon
          return (
            <Link key={i} href={social.link} className="w-12 h-12 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary transition-colors bg-white shadow-sm">
              <Icon className="w-6 h-6" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
