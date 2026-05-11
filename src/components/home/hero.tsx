import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, PlayCircle, Star, Sparkles, CheckCircle, GraduationCap } from "lucide-react"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-bg")

  return (
    <section className="relative pt-16 pb-24 overflow-hidden hero-gradient">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 text-right">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-6 py-3 rounded-full font-bold text-sm border border-secondary/10 glow-warm">
              <Sparkles className="w-4 h-4 fill-secondary animate-pulse" />
              أرقى منصة تعليمية عربية برؤية عالمية
            </div>
            
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl font-headline font-extrabold text-primary leading-[1.15] tracking-tight">
                أنر طريقك <br />
                بالمعرفة <span className="text-secondary relative inline-block">الأصيلة<div className="absolute bottom-2 left-0 w-full h-4 bg-accent/20 -z-10 rounded-full"></div></span>
              </h1>
              <p className="text-xl text-muted-foreground font-medium max-w-xl leading-relaxed">
                سراج ليست مجرد منصة، بل هي رفيقك في رحلة التطور المهني. نقدم محتوىً فاخراً صُمم بعناية ليمنحك المهارة التي تستحقها.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-5">
              <Button size="lg" className="rounded-2xl px-12 text-xl h-16 font-extrabold shadow-2xl shadow-secondary/20 hover:scale-105 transition-all bg-secondary text-primary hover:bg-secondary/90 border border-accent/20" asChild>
                <Link href="/courses">
                  استكشف المسارات
                  <ArrowLeft className="mr-3 w-6 h-6" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-2xl px-10 text-xl h-16 font-extrabold bg-transparent hover:bg-primary/5 border-primary/20 text-primary">
                <PlayCircle className="ml-3 w-6 h-6 text-secondary" />
                شاهد الفلسفة
              </Button>
            </div>

            <div className="flex items-center gap-16 pt-8 border-r-4 border-accent/30 pr-8">
              <div className="flex flex-col">
                <span className="text-4xl font-extrabold text-primary">+15k</span>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">متعلم طموح</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-extrabold text-primary">+200</span>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">مسار احترافي</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-extrabold text-primary">4.9</span>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">تقييم الجودة</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/10 border-[16px] border-white/60 glass glow-warm">
              <Image 
                src={heroImage?.imageUrl || ""} 
                alt="Siraj Arabic Education Platform"
                width={1200}
                height={800}
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-1000"
                data-ai-hint="luxury education"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-10 right-10 text-white z-20">
                <div className="bg-primary/80 backdrop-blur-md p-4 rounded-2xl border border-accent/20">
                  <h4 className="font-bold text-lg mb-1">انضم لصفوة المتعلمين</h4>
                  <p className="text-xs opacity-80">نحن نبني مستقبلاً عربياً مشرقاً</p>
                </div>
              </div>
            </div>

            {/* Floating Elements with Luxury Style */}
            <div className="absolute -top-12 -right-8 glass p-6 rounded-[2.5rem] shadow-2xl z-20 flex items-center gap-4 animate-bounce duration-[4s]">
              <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20 luxury-border">
                <CheckCircle className="text-primary w-8 h-8" />
              </div>
              <div>
                <p className="font-extrabold text-lg text-primary leading-none mb-1">شهادات فاخرة</p>
                <p className="text-xs font-bold text-muted-foreground uppercase">موثقة عالمياً</p>
              </div>
            </div>

            <div className="absolute -bottom-12 -left-8 glass p-6 rounded-[2.5rem] shadow-2xl z-20 flex items-center gap-4 animate-pulse">
              <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-secondary/20 luxury-border">
                <GraduationCap className="text-primary w-8 h-8" />
              </div>
              <div>
                <p className="font-extrabold text-lg text-primary leading-none mb-1">نور المعرفة</p>
                <p className="text-xs font-bold text-muted-foreground uppercase">بأيدي خبراء العرب</p>
              </div>
            </div>
            
            {/* Soft Warm Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-secondary/5 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}