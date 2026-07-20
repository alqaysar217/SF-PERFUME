
"use client"

import { Info, Phone, Award, BookOpen, Share2, Instagram, Facebook, MessageCircle, ChevronLeft, CreditCard, HelpCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

export default function MorePage() {
  const menuItems = [
    { name: "من نحن", icon: Info, href: "/about" },
    { name: "تواصل معنا", icon: Phone, href: "/contact" },
    { name: "بيانات التحويل البنكي", icon: CreditCard, href: "/payment-info" },
    { name: "الأسئلة الشائعة", icon: HelpCircle, href: "/faq" },
    { name: "الماركات العالمية", icon: Award, href: "/brands" },
    { name: "دليل اختيار العطور", icon: BookOpen, href: "/guide" },
  ]

  const handleShare = async () => {
    const shareData = {
      title: 'SF PERFUME',
      text: 'اكتشف عالم العطور الفاخرة والساعات الأصلية في متجر SF PERFUME',
      url: 'https://sf-perfume.vercel.app/',
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(shareData.url)
        toast({
          title: "تم نسخ الرابط",
          description: "تم نسخ رابط المتجر بنجاح، يمكنك مشاركته الآن.",
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex flex-col gap-8 p-4 animate-fade-in pb-32">
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-4 py-8 bg-luxury-black rounded-[3rem] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -z-10 animate-pulse" />
        <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center shadow-2xl relative overflow-hidden">
          <Image 
            src="/logo.png" 
            alt="SF Logo" 
            fill 
            className="object-contain p-4"
          />
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
        <button 
          onClick={handleShare}
          className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-luxury-black">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-luxury-black">شارك المتجر</span>
          </div>
          <ChevronLeft className="w-5 h-5 text-gray-300" />
        </button>
      </div>

      {/* Social Media */}
      <div className="flex justify-center gap-4 pt-4">
        {[
          { icon: Instagram, link: "https://instagram.com/sf_perfume20" },
          { icon: Facebook, link: "https://facebook.com/sf_perfume" },
          { icon: MessageCircle, link: "https://wa.me/967777161451" },
        ].map((social, i) => {
          const Icon = social.icon
          return (
            <Link 
              key={i} 
              href={social.link} 
              target="_blank"
              className="w-12 h-12 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary transition-colors bg-white shadow-sm active:scale-90"
            >
              <Icon className="w-6 h-6" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
