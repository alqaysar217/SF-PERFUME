
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, User, ShieldCheck, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"
import Link from "next/link"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // محاكاة عملية التحقق - في الواقع يجب استخدام Firebase Auth
    setTimeout(() => {
      if (username === "admin" && password === "sf2024") {
        localStorage.setItem('isAdmin', 'true')
        router.push('/admin')
        toast({ 
          title: "تم الدخول بنجاح", 
          description: "مرحباً بك في لوحة الإدارة" 
        })
      } else {
        toast({ 
          variant: "destructive", 
          title: "فشل تسجيل الدخول", 
          description: "اسم المستخدم أو كلمة المرور غير صحيحة" 
        })
      }
      setIsLoading(false)
    }, 1200)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background items-center justify-center p-6 animate-fade-in">
      {/* Back to Home */}
      <Link href="/" className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-100 text-luxury-black active:scale-90 transition-transform">
        <ArrowRight className="w-5 h-5" />
      </Link>

      <div className="w-full max-w-sm space-y-12">
        {/* Logo & Header */}
        <div className="text-center space-y-6">
          <div className="relative w-28 h-28 mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-gray-50 overflow-hidden flex items-center justify-center group transition-transform hover:scale-105">
            <Image 
              src="/logo.png" 
              alt="SF PERFUME" 
              fill 
              className="object-cover scale-110"
              priority
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-luxury-black tracking-widest uppercase">SF PERFUME</h1>
            <p className="text-[10px] text-primary font-bold uppercase tracking-[0.3em]">Administrative Portal</p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            {/* Username Field */}
            <div className="space-y-2 text-right">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">اسم المستخدم</label>
              <div className="relative">
                <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
                <Input 
                  type="text" 
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-14 pr-12 rounded-2xl border-gray-100 bg-white shadow-sm font-bold focus:border-primary transition-all text-right"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2 text-right">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
                <Input 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 pr-12 rounded-2xl border-gray-100 bg-white shadow-sm font-bold focus:border-primary transition-all text-right"
                  required
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-14 bg-luxury-black text-primary hover:bg-black/90 rounded-2xl font-black text-md shadow-xl active:scale-95 transition-all gap-3"
          >
            {isLoading ? "جاري التحقق..." : "تسجيل الدخول"}
          </Button>
        </form>

        {/* Security Badge */}
        <div className="flex flex-col items-center gap-3 pt-4">
          <div className="flex items-center gap-2 text-gray-300">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Secure Cloud Access</span>
          </div>
          <div className="w-12 h-1 bg-gray-100 rounded-full" />
        </div>
      </div>
    </div>
  )
}
