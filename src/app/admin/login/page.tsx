
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Lock, User as UserIcon, ShieldCheck, ArrowRight, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"
import Link from "next/link"
import { useAuth, useUser } from "@/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const router = useRouter()
  const auth = useAuth()
  const { user, loading: authLoading } = useUser(auth)

  useEffect(() => {
    if (!authLoading && user) {
      router.push('/admin')
    }
  }, [user, authLoading, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!auth) return

    setIsLoading(true)
    setErrorMsg(null)
    
    // تحويل اسم المستخدم لبريد إلكتروني مقبول في Firebase إذا لم يكن كذلك
    const email = username.includes('@') ? username : `${username}@sfperfume.com`
    
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast({ 
        title: "تم الدخول بنجاح", 
        description: "مرحباً بك في لوحة الإدارة المؤمنة" 
      })
      router.push('/admin')
    } catch (error: any) {
      // إزالة console.error لتجنب ظهور شاشات الخطأ في بيئة التطوير
      let message = "اسم المستخدم أو كلمة المرور غير صحيحة"
      
      if (error.code === 'auth/invalid-credential') {
        message = "بيانات الدخول غير صحيحة. يرجى التأكد من تفعيل Email/Password في Firebase Console وإضافة المستخدم."
      } else if (error.code === 'auth/user-not-found') {
        message = "المستخدم غير موجود في سجلات النظام."
      } else if (error.code === 'auth/wrong-password') {
        message = "كلمة المرور التي أدخلتها غير صحيحة."
      } else if (error.code === 'auth/too-many-requests') {
        message = "محاولات كثيرة خاطئة. تم حظر الدخول مؤقتاً لحمايتك."
      }

      setErrorMsg(message)
      toast({ 
        variant: "destructive", 
        title: "فشل تسجيل الدخول", 
        description: message 
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen bg-background items-center justify-center p-6 animate-fade-in">
      <Link href="/" className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-100 text-luxury-black active:scale-90 transition-transform">
        <ArrowRight className="w-5 h-5" />
      </Link>

      <div className="w-full max-w-sm space-y-12">
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
            <p className="text-[10px] text-primary font-bold uppercase tracking-[0.3em]">بوابة الوصول الخاصة بالمدير</p>
          </div>
        </div>

        {errorMsg && (
          <Alert variant="destructive" className="rounded-2xl border-destructive/20 bg-destructive/5">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="text-right font-black text-xs">خطأ في الدخول</AlertTitle>
            <AlertDescription className="text-right text-[10px] font-bold">
              {errorMsg}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2 text-right">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">اسم المستخدم</label>
              <div className="relative">
                <UserIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
                <Input 
                  type="text" 
                  placeholder="مثلاً: admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-14 pr-12 rounded-2xl border-gray-100 bg-white shadow-sm font-bold focus:border-primary transition-all text-right"
                  required
                />
              </div>
            </div>

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
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "تسجيل الدخول الآمن"}
          </Button>
        </form>

        <div className="flex flex-col items-center gap-3 pt-4">
          <div className="flex items-center gap-2 text-gray-300">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[9px] font-bold uppercase tracking-widest">SF Secure Access Active</span>
          </div>
          <div className="w-12 h-1 bg-gray-100 rounded-full" />
        </div>
      </div>
    </div>
  )
}
