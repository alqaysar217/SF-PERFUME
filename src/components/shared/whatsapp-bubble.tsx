import { MessageCircle } from "lucide-react"
import Link from "next/link"

export function WhatsAppBubble() {
  return (
    <Link 
      href="https://wa.me/yourwhatsappnumber" 
      target="_blank"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform animate-pulse"
      title="تواصل معنا عبر واتساب"
    >
      <MessageCircle className="w-8 h-8" />
    </Link>
  )
}
