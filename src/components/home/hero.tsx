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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 text-right">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-full font-bold text-sm border border-primary/10 glow-primary">
              <Sparkles className="w-4 h-4 fill-primary" />
              أقوى منصة تعليمية تقنية في اليمن والعالم العربي
            </div>
            
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-8xl font-headline font-extrabold text-foreground leading-[1.1] tracking-tight">
                تعلم <span className="text-primary relative inline-block">بذكاء<div className="absolute bottom-2 left-0 w-full h-3 bg-primary/10 -z-10 rounded-full"></div></span>، <br />
                تطور <span className="text-secondary relative inline-block">بثقة<div className="absolute bottom-2 left-0 w-full h-3 bg-secondary/10 -z-10 rounded-full"></div></span>
              </h1>
              <p className="text-2xl text-muted-foreground font-medium max-w-xl leading-relaxed">
                سراج هي بوابتك نحو الاحتراف التقني. نقدم لك أفضل الكورسات والمسارات التعليمية لمواكبة سوق العمل العالمي بجودة استثنائية.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-5">
              <Button size="lg" className="rounded-2xl px-10 text-xl h-16 font-extrabold shadow-xl shadow-primary/25 hover:scale-105 transition-all" asChild>
                <Link href="/courses">
                  استعرض الكورسات
                  <ArrowLeft className="mr-3 w-6 h-6" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-2xl px-10 text-xl h-16 font-extrabold bg-background/50 hover:bg-muted/50 border-2">
                <PlayCircle className="ml-3 w-6 h-6" />
                كيف نبدأ؟
              </Button>
            </div>

            <div className="flex items-center gap-12 pt-6">
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold text-foreground">+10k</span>
                <span className="text-sm font-bold text-muted-foreground">طالب نشط</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold text-foreground">+150</span>
                <span className="text-sm font-bold text-muted-foreground">كورس معتمد</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold text-foreground">+50</span>
                <span className="text-sm font-bold text-muted-foreground">مدرب محترف</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/30 border-[12px] border-white/40 glass">
              <Image 
                src={heroImage?.imageUrl || ""} 
                alt="Siraj Learning Platform"
                width={1200}
                height={800}
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                data-ai-hint="technology education"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-8 right-8 text-white z-20">
                <div className="flex items-center gap-2 mb-2">
                   <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-muted overflow-hidden">
                          <img src={`https://picsum.photos/seed/${i+10}/100/100`} alt="user" />
                        </div>
                      ))}
                   </div>
                   <span className="text-xs font-bold">+500 طالب اليوم</span>
                </div>
                <h4 className="font-bold text-lg">انضم لمجتمع سراج الآن</h4>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-10 -right-10 glass p-5 rounded-[2rem] shadow-2xl z-20 flex items-center gap-4 animate-bounce duration-[3s]">
              <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20">
                <CheckCircle className="text-white w-7 h-7" />
              </div>
              <div>
                <p className="font-extrabold text-base leading-none mb-1">شهادات معتمدة</p>
                <p className="text-xs font-bold text-muted-foreground">موثقة برقم اعتماد</p>
              </div>
            </div>

            <div className="absolute -bottom-10 -left-10 glass p-5 rounded-[2rem] shadow-2xl z-20 flex items-center gap-4 animate-pulse">
              <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-secondary/20">
                <GraduationCap className="text-white w-7 h-7" />
              </div>
              <div>
                <p className="font-extrabold text-base leading-none mb-1">مسارات احترافية</p>
                <p className="text-xs font-bold text-muted-foreground">صممت لسوق العمل</p>
              </div>
            </div>
            
            {/* Background Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 rounded-full blur-[100px] -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
