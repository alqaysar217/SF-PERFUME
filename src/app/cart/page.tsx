
"use client"

import { useState, useEffect } from "react"
import { ShoppingBag, Trash2, Plus, Minus, MessageCircle, ArrowRight, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(savedCart)
  }, [])

  const updateCart = (newCart: any[]) => {
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
    window.dispatchEvent(new Event('cart-updated'))
  }

  const updateQuantity = (id: string, delta: number) => {
    const newCart = cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta)
        return { ...item, quantity: newQty }
      }
      return item
    })
    updateCart(newCart)
  }

  const removeItem = (id: string) => {
    const newCart = cart.filter(item => item.id !== id)
    updateCart(newCart)
    toast({ title: "تم الحذف", description: "تمت إزالة المنتج من السلة" })
  }

  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  const handleCheckout = () => {
    if (cart.length === 0) return
    
    let message = "مرحباً SF PERFUME، أود طلب المنتجات التالية:\n\n"
    cart.forEach((item, index) => {
      message += `${index + 1}- ${item.name} (${item.brand})\n`
      message += `   الكمية: ${item.quantity} | السعر: ${item.price.toLocaleString()} ر.ي\n`
    })
    message += `\nإجمالي الطلب: ${totalPrice.toLocaleString()} ر.ي`
    
    window.open(`https://wa.me/967777161451?text=${encodeURIComponent(message)}`, '_blank')
  }

  if (!mounted) return null

  return (
    <div className="flex flex-col gap-6 p-4 animate-fade-in pb-48">
      {cart.length > 0 ? (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-[1.5rem] border border-gray-50 shadow-sm flex gap-4 items-center">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                
                <div className="flex-1 space-y-1">
                  <p className="text-[10px] font-black text-primary uppercase">{item.brand}</p>
                  <h3 className="text-sm font-black text-luxury-black line-clamp-1">{item.name}</h3>
                  <p className="text-xs font-black text-primary">{(item.price * item.quantity).toLocaleString()} ر.ي</p>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3 bg-gray-50 px-2 py-1 rounded-lg">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-primary transition-colors">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-primary transition-colors">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="fixed bottom-24 left-0 right-0 p-4 bg-white/95 backdrop-blur-xl z-40 border-t border-gray-100 md:max-w-md md:mx-auto w-full shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-center mb-4 px-2">
              <span className="text-xs font-bold text-gray-400">إجمالي السلة</span>
              <span className="text-lg font-black text-luxury-black">{totalPrice.toLocaleString()} ر.ي</span>
            </div>
            <Button 
              onClick={handleCheckout}
              className="w-full h-14 bg-[#25D366] hover:bg-[#1ebd5d] text-white rounded-2xl text-md font-black gap-3 shadow-lg active:scale-95 transition-all"
            >
              <MessageCircle className="w-6 h-6 fill-current" />
              تأكيد الطلب عبر واتساب
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
          <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center text-gray-200">
            <ShoppingCart className="w-12 h-12" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-black text-luxury-black">سلتك فارغة</h2>
            <p className="text-xs text-gray-400">ابدأ بإضافة عطرك المفضل الآن</p>
          </div>
          <Button asChild className="rounded-xl h-12 px-8 font-black bg-primary text-white">
            <Link href="/products">تصفح المنتجات</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
