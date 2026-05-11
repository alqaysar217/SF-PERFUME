import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, PlayCircle, Star, Users, CheckCircle } from "lucide-react"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-bg")

  return (
    <section className="relative pt-12 pb-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-right">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-medium text-sm">
              <Star className="w-4 h-4 fill-primary" />
              أقوى منصة تعليمية تقنية في اليمن والعالم العربي
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-headline font-bold text-foreground leading-[1.1]">
              تعلم <span className="text-primary">بذكاء</span>، <br />
              تطور <span className="text-secondary">بثقة</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg">
              سراج هي بوابتك نحو الاحتراف التقني. نقدم لك أفضل الكورسات والمسارات التعليمية لمواكبة سوق العمل العالمي بأسعار تنافسية.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="rounded-full px-8 text-lg h-14" asChild>
                <Link href="/courses">
                  استعرض الكورسات
                  <ArrowLeft className="mr-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 text-lg h-14 bg-background/50">
                <PlayCircle className="ml-2 w-5 h-5" />
                شاهد كيف نعمل
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex flex-col">
                <span className="text-2xl font-bold">+10k</span>
                <span className="text-sm text-muted-foreground">طالب نشط</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">+150</span>
                <span className="text-sm text-muted-foreground">كورس معتمد</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">+50</span>
                <span className="text-sm text-muted-foreground">مدرب محترف</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 border-8 border-white/50">
              <Image 
                src={heroImage?.imageUrl || ""} 
                alt="Siraj Learning Platform"
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
                data-ai-hint="technology education"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 glass p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 animate-bounce">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <CheckCircle className="text-white w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-sm">شهادات معتمدة</p>
                <p className="text-xs text-muted-foreground">رسمية وموثقة</p>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 glass p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3">
              <div className="flex -space-x-3 overflow-hidden">
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-slate-200"></div>
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-slate-300"></div>
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-slate-400"></div>
              </div>
              <p className="text-xs font-medium">انضم لـ 500 طالب اليوم</p>
            </div>
            
            {/* Background Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
