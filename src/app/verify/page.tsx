"use client"

import { useState } from "react"
import { Search, ShieldCheck, AlertCircle, CheckCircle2, Award, Calendar, User, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function VerifyPage() {
  const [certId, setCertId] = useState("")
  const [result, setResult] = useState<null | 'valid' | 'invalid'>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!certId.trim()) return
    
    setIsLoading(true)
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
    <div className="container mx-auto px-4 py-24 min-h-screen relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-3xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mx-auto text-primary mb-8 border border-primary/20 shadow-2xl shadow-primary/10 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
             <ShieldCheck className="w-12 h-12 relative z-10" />
          </div>
          <h1 className="text-5xl font-headline font-extrabold tracking-tight">التحقق من الشهادات</h1>
          <p className="text-xl text-muted-foreground font-medium max-w-xl mx-auto">أدخل رقم الاعتماد الفريد الموجود في شهادتك للتأكد من موثوقيتها وصحتها عبر قاعدة بياناتنا الرسمية.</p>
        </div>

        <Card className="rounded-[2.5rem] shadow-2xl border-none overflow-hidden glass p-2">
          <CardContent className="p-10">
            <form onSubmit={handleVerify} className="space-y-8">
              <div className="space-y-3">
                <label className="text-sm font-extrabold text-foreground mr-2 uppercase tracking-wider">رقم الاعتماد (Certificate ID)</label>
                <div className="relative">
                  <Input 
                    placeholder="SIRAJ-CERT-XXXX-XXXXXX"
                    value={certId}
                    onChange={(e) => setCertId(e.target.value)}
                    className="h-16 rounded-[1.5rem] text-xl font-bold pr-14 pl-14 bg-muted/30 border-2 border-transparent focus:border-primary/20 focus:bg-background transition-all"
                  />
                  <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6" />
                </div>
              </div>
              <Button size="lg" className="w-full h-16 text-xl font-extrabold rounded-[1.5rem] shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all" disabled={isLoading}>
                {isLoading ? "جاري فحص قاعدة البيانات..." : "تحقق من الصلاحية"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {result === 'valid' && (
          <div className="animate-in fade-in slide-in-from-top-10 duration-500">
            <Card className="rounded-[3rem] border-2 border-accent/20 bg-accent/5 overflow-hidden shadow-2xl shadow-accent/10 relative">
              <div className="absolute top-0 left-0 w-full h-2 bg-accent"></div>
              <CardContent className="p-12 text-center space-y-10">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-accent text-white rounded-full flex items-center justify-center shadow-lg shadow-accent/30">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-accent">شهادة رسمية موثقة</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 text-right bg-white/50 p-8 rounded-[2rem] border border-accent/10">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                       <User className="w-6 h-6 text-accent shrink-0 mt-1" />
                       <div>
                         <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">اسم الحاصل على الشهادة</p>
                         <p className="text-xl font-extrabold">أحمد محمد علي باشا</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       <Award className="w-6 h-6 text-accent shrink-0 mt-1" />
                       <div>
                         <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">الدورة التدريبية</p>
                         <p className="text-xl font-extrabold">دبلوم تطوير الويب المتكامل</p>
                       </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                       <Calendar className="w-6 h-6 text-accent shrink-0 mt-1" />
                       <div>
                         <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">تاريخ الإصدار</p>
                         <p className="text-xl font-extrabold uppercase font-english">15 May 2024</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       <QrCode className="w-6 h-6 text-accent shrink-0 mt-1" />
                       <div>
                         <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">رقم الاعتماد</p>
                         <p className="text-xl font-extrabold font-english">{certId.toUpperCase()}</p>
                       </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-lg leading-relaxed text-muted-foreground font-medium italic border-r-4 border-accent pr-6">
                  "تؤكد منصة سراج التعليمية أن الطالب المذكور أعلاه قد أتم كافة متطلبات الدورة بنجاح واستحق هذه الشهادة تقديراً لجهوده وتميزه."
                </p>
                
                <div className="pt-6 flex justify-center gap-4">
                   <Button variant="outline" className="rounded-xl px-8 font-bold">تحميل نسخة PDF</Button>
                   <Button variant="outline" className="rounded-xl px-8 font-bold">مشاركة على LinkedIn</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {result === 'invalid' && (
          <div className="animate-in fade-in slide-in-from-top-10 duration-500 text-center">
            <div className="bg-destructive/10 border-2 border-destructive/20 p-12 rounded-[2.5rem] space-y-6">
              <AlertCircle className="w-20 h-20 text-destructive mx-auto" />
              <h3 className="text-3xl font-extrabold text-destructive tracking-tight">رقم الاعتماد غير صحيح</h3>
              <p className="text-xl text-muted-foreground font-medium max-w-lg mx-auto">
                عذراً، لم نتمكن من العثور على أي شهادة مرتبطة بهذا الرقم في قاعدة بياناتنا. يرجى التأكد من كتابة الرقم بدقة كما هو موضح في الشهادة الورقية أو الرقمية.
              </p>
              <Button variant="outline" className="rounded-xl border-destructive/20 text-destructive hover:bg-destructive/5" onClick={() => setResult(null)}>إعادة المحاولة</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
