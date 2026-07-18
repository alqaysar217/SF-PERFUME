
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, ShieldCheck, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simple demo password check. In production, use Firebase Auth.
    setTimeout(() => {
      if (password === "sf2024") {
        localStorage.setItem('isAdmin', 'true')
        router.push('/admin')
        toast({ title: "تم الدخول", description: "مرحباً بك في لوحة الإدارة" })
      } else {
        toast({ 
          variant: "destructive", 
          title: "خطأ", 
          description: "كلمة المرور غير صحيحة" 
        })
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-12 p-8 animate-fade-in items-center justify-center min-h-[80vh]">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-primary rounded-[2rem] flex items-center justify-center text-white mx-auto shadow-2xl">
          <Lock className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-luxury-black uppercase tracking-widest">SF Admin</h1>
          <p className="text-xs text-gray-400 font-bold">بوابة الوصول الخاصة بالمدير</p>
        </div>
      </div>

      <form onSubmit={handleLogin} className="w-full space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">كلمة المرور</label>
          <div className="relative">
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <Input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-14 pr-12 rounded-2xl border-gray-100 bg-white shadow-sm font-bold text-center"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full h-14 bg-luxury-black text-primary rounded-2xl font-black text-md shadow-xl active:scale-95 transition-all"
        >
          {isLoading ? "جاري التحقق..." : "تسجيل الدخول"}
        </Button>
      </form>

      <div className="flex items-center gap-2 text-gray-300">
        <ShieldCheck className="w-4 h-4" />
        <span className="text-[10px] font-bold">نظام محمي وآمن</span>
      </div>
    </div>
  )
}
