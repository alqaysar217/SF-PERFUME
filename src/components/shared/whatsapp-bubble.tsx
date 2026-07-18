"use client"

import { MessageCircle } from "lucide-react"
import Link from "next/link"

export function WhatsAppBubble() {
  return (
    <Link 
      href="https://wa.me/967777161451" 
      target="_blank"
      className="fixed bottom-28 left-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all animate-bounce duration-[3s]"
      title="تواصل معنا عبر واتساب"
    >
      <MessageCircle className="w-7 h-7 fill-current" />
    </Link>
  )
}
