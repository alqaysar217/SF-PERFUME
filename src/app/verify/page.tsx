"use client"

import { useState } from "react"
import { Search, ShieldCheck, AlertCircle, CheckCircle2, Award, Calendar, User, QrCode, Sparkles } from "lucide-react"
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
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px] -z-10"></div>
      
      <div className="max-w-3xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-primary rounded-[2.5rem] flex items-center justify-center mx-auto text-accent mb-8 luxury-border shadow-2xl shadow-primary/20 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
             <ShieldCheck className="w-12 h-12 relative z-10" />
          </div>
          <h1 className="text-5xl font-headline font-extrabold tracking-tight text-primary">التحقق من الاعتمادات</h1>
          <p className="text-xl text-muted-foreground font-medium max-w-xl mx-auto">تأكد من صحة الشهادات الصادرة عن منصة سراج من خلال الرقم المرجعي الموحد في قاعدة بياناتنا الرسمية.</p>
        </div>

        <Card className="rounded-[3rem] shadow-2xl border-none overflow-hidden glass p-2 luxury-border">
          <CardContent className="p-12">
            <form onSubmit={handleVerify} className="space-y-8">
              <div className="space-y-4">
                <label className="text-sm font-bold text-primary mr-2 uppercase tracking-[0.2em] opacity-70">رقم الاعتماد الفريد (UID)</label>
                <div className="relative">
                  <Input 
                    placeholder="SIRAJ-CERT-XXXX-XXXXXX"
                    value={certId}
                    onChange={(e) => setCertId(e.target.value)}
                    className="h-16 rounded-[1.5rem] text-xl font-bold pr-14 bg-muted/20 border-2 border-transparent focus:border-secondary/20 focus:bg-white transition-all text-primary"
                  />
                  <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6" />
                </div>
              </div>
              <Button size="lg" className="w-full h-16 text-xl font-extrabold rounded-[1.5rem] shadow-xl shadow-secondary/10 bg-secondary text-primary hover:bg-secondary/90 transition-all border border-accent/20" disabled={isLoading}>
                {isLoading ? "جاري البحث في السجلات..." : "تحقق من الموثوقية"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {result === 'valid' && (
          <div className="animate-in fade-in slide-in-from-top-10 duration-700">
            <Card className="rounded-[3.5rem] border-2 border-accent/30 bg-white overflow-hidden shadow-3xl relative luxury-border">
              <div className="absolute top-0 left-0 w-full h-3 bg-secondary"></div>
              <CardContent className="p-14 text-center space-y-12">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-primary text-secondary rounded-full flex items-center justify-center shadow-lg border-2 border-accent/20">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-headline font-extrabold text-primary">اعتماد رسمي موثق</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-10 text-right bg-muted/20 p-10 rounded-[2.5rem] border border-accent/10 relative">
                  <Sparkles className="absolute top-4 left-4 w-6 h-6 text-accent/40" />
                  <div className="space-y-8">
                    <div className="flex items-start gap-5">
                       <User className="w-6 h-6 text-secondary shrink-0 mt-1" />
                       <div>
                         <p className="text-[10px] font-bold text-muted-foreground mb-1 uppercase tracking-widest">صاحب الاعتماد</p>
                         <p className="text-2xl font-headline font-bold text-primary">أحمد محمد علي باشا</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-5">
                       <Award className="w-6 h-6 text-secondary shrink-0 mt-1" />
                       <div>
                         <p className="text-[10px] font-bold text-muted-foreground mb-1 uppercase tracking-widest">الدورة التدريبية</p>
                         <p className="text-xl font-bold text-primary">دبلوم تطوير الويب المتكامل</p>
                       </div>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div className="flex items-start gap-5">
                       <Calendar className="w-6 h-6 text-secondary shrink-0 mt-1" />
                       <div>
                         <p className="text-[10px] font-bold text-muted-foreground mb-1 uppercase tracking-widest">تاريخ التخرج</p>
                         <p className="text-xl font-bold text-primary uppercase font-english">15 May 2024</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-5">
                       <QrCode className="w-6 h-6 text-secondary shrink-0 mt-1" />
                       <div>
                         <p className="text-[10px] font-bold text-muted-foreground mb-1 uppercase tracking-widest">كود الاعتماد</p>
                         <p className="text-xl font-bold font-english text-primary">{certId.toUpperCase()}</p>
                       </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-lg leading-relaxed text-muted-foreground font-medium italic border-r-4 border-secondary pr-8 max-w-2xl mx-auto">
                  "تشهد إدارة منصة سراج التعليمية أن المذكور أعلاه قد استوفى كافة المعايير الأكاديمية والعملية المقررة لهذا المسار بنجاح تام."
                </p>
                
                <div className="pt-8 flex flex-wrap justify-center gap-4">
                   <Button variant="outline" className="rounded-2xl h-14 px-10 font-bold border-primary/20 text-primary hover:bg-primary/5">تحميل الوثيقة (PDF)</Button>
                   <Button variant="outline" className="rounded-2xl h-14 px-10 font-bold border-primary/20 text-primary hover:bg-primary/5">مشاركة الإنجاز</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {result === 'invalid' && (
          <div className="animate-in fade-in slide-in-from-top-10 duration-500 text-center">
            <div className="bg-destructive/5 border-2 border-destructive/20 p-14 rounded-[3rem] space-y-6 luxury-border">
              <AlertCircle className="w-20 h-20 text-destructive mx-auto" />
              <h3 className="text-3xl font-headline font-extrabold text-destructive">الرقم المرجعي غير مسجل</h3>
              <p className="text-xl text-muted-foreground font-medium max-w-lg mx-auto leading-relaxed">
                عذراً، هذا الرقم غير موجود في سجلاتنا الموثقة. يرجى التأكد من مطابقة الرموز الموجودة على وثيقتك. في حال استمرار المشكلة، يرجى التواصل مع الدعم الفني.
              </p>
              <Button variant="outline" className="rounded-2xl border-destructive/20 text-destructive hover:bg-destructive/5 font-bold h-12 px-8" onClick={() => setResult(null)}>إعادة المحاولة</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}