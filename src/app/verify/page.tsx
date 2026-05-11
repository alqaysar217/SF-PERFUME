"use client"

import { useState } from "react"
import { Search, ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function VerifyPage() {
  const [certId, setCertId] = useState("")
  const [result, setResult] = useState<null | 'valid' | 'invalid'>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!certId.trim()) return
    
    setIsLoading(true)
    // Simulating API call
    setTimeout(() => {
      if (certId.toUpperCase() === "SIRAJ-CERT-2026-000145") {
        setResult('valid')
      } else {
        setResult('invalid')
      }
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <div className="max-w-2xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary mb-6">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-headline font-bold">التحقق من الشهادات</h1>
          <p className="text-muted-foreground">أدخل رقم الاعتماد الفريد الموجود في شهادتك للتحقق من صحتها وتاريخ إصدارها.</p>
        </div>

        <Card className="rounded-3xl shadow-xl overflow-hidden border-2 border-primary/10">
          <CardContent className="p-8">
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold mr-2">رقم الاعتماد</label>
                <div className="relative">
                  <Input 
                    placeholder="مثال: SIRAJ-CERT-2026-000145"
                    value={certId}
                    onChange={(e) => setCertId(e.target.value)}
                    className="h-14 rounded-xl text-lg pl-12 bg-muted/30"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                </div>
              </div>
              <Button size="lg" className="w-full h-14 text-lg rounded-xl" disabled={isLoading}>
                {isLoading ? "جاري التحقق..." : "تحقق الآن"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {result === 'valid' && (
          <Card className="rounded-3xl border-2 border-accent/20 bg-accent/5 animate-in fade-in slide-in-from-top-4">
            <CardContent className="p-8 text-center space-y-6">
              <CheckCircle2 className="w-16 h-16 text-accent mx-auto" />
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-accent">شهادة صالحة وموثقة</h3>
                <p className="text-lg leading-relaxed">
                  تتشرف منصة سراج بتقديم شهادة إتمام دورة <span className="font-bold">تطوير الويب الشامل</span> إلى الطالب <span className="font-bold">أحمد محمد علي</span> بعد إتمامه متطلبات الدورة بنجاح بتاريخ 2024-05-15.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-accent/10">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">رقم الاعتماد</p>
                  <p className="font-bold">{certId.toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">تاريخ الإصدار</p>
                  <p className="font-bold">15 مايو 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {result === 'invalid' && (
          <Card className="rounded-3xl border-2 border-destructive/20 bg-destructive/5 animate-in fade-in slide-in-from-top-4">
            <CardContent className="p-8 text-center space-y-4">
              <AlertCircle className="w-16 h-16 text-destructive mx-auto" />
              <h3 className="text-2xl font-bold text-destructive">الشهادة غير موجودة</h3>
              <p className="text-muted-foreground leading-relaxed">
                عذراً، لم نتمكن من العثور على أي شهادة مرتبطة برقم الاعتماد هذا. يرجى التأكد من كتابة الرقم بشكل صحيح.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
