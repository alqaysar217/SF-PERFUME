
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, ShoppingBag, MapPin } from "lucide-react"
import Image from "next/image"

export function Header() {
  const [cartCount, setCartCount] = useState(0)

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const count = cart.reduce((acc: number, item: any) => acc + item.quantity, 0)
    setCartCount(count)
  }

  useEffect(() => {
    updateCartCount()
    window.addEventListener('cart-updated', updateCartCount)
    return () => window.removeEventListener('cart-updated', updateCartCount)
  }, [])

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 h-16 px-4 flex items-center justify-between border-b border-gray-100 md:max-w-md md:mx-auto w-full">
      <Link href="/" className="flex items-center gap-2 group active:scale-95 transition-transform">
        <div className="w-10 h-10 bg-luxury-black rounded-xl flex items-center justify-center border border-white/10 shadow-sm overflow-hidden relative">
           <Image 
            src="https://picsum.photos/seed/brand/200/200" 
            alt="SF Logo" 
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-sm font-black tracking-tighter leading-none text-luxury-black">SF PERFUME</h1>
          <div className="flex items-center gap-1 text-[7px] text-gray-400 font-bold uppercase mt-1">
            <MapPin className="w-2 h-2 text-primary" />
            المكلا، حضرموت
          </div>
        </div>
      </Link>
      
      <div className="flex items-center gap-2">
        <Link href="/products" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-luxury-black active:scale-90 transition-transform">
          <Search className="w-5 h-5" strokeWidth={1.5} />
        </Link>
        <Link href="/cart" className="w-10 h-10 rounded-xl bg-luxury-black text-primary flex items-center justify-center relative active:scale-90 transition-transform shadow-lg shadow-black/10">
          <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
