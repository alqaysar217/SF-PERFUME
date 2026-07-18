
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, ShieldCheck } from "lucide-react"
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
    <div className="flex flex-col gap-12 p-8 animate-fade-in items-center justify-center min-h-[80vh] bg-background">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-primary mx-auto shadow-sm border border-primary/20">
          <Lock className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-luxury-black uppercase tracking-widest">SF Admin</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">بوابة الوصول الخاصة بالمدير</p>
        </div>
      </div>

      <form onSubmit={handleLogin} className="w-full space-y-6 max-w-sm">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">كلمة المرور</label>
          <div className="relative">
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
            <Input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-14 pr-12 rounded-2xl border-gray-100 bg-white shadow-sm font-bold text-center focus:border-primary transition-all"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full h-14 bg-luxury-black text-primary hover:bg-luxury-black/90 rounded-2xl font-black text-md shadow-xl active:scale-95 transition-all"
        >
          {isLoading ? "جاري التحقق..." : "تسجيل الدخول"}
        </Button>
      </form>

      <div className="flex items-center gap-2 text-gray-300">
        <ShieldCheck className="w-4 h-4" />
        <span className="text-[10px] font-bold uppercase tracking-tighter">Secure Administration Portal</span>
      </div>
    </div>
  )
}
