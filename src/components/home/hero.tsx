
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, PlayCircle, Star, Sparkles, CheckCircle, GraduationCap } from "lucide-react"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === "banner-1")

  return (
    <section className="relative pt-16 pb-24 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 text-right">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full font-bold text-sm border border-primary/10">
              <Sparkles className="w-4 h-4 fill-primary animate-pulse" />
              أفخم تجربة عطرية في حضرموت
            </div>
            
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl font-black text-luxury-black leading-[1.15] tracking-tight">
                عبير يجسد <br />
                شخصيتك <span className="text-primary relative inline-block">الفريدة</span>
              </h1>
              <p className="text-xl text-gray-500 font-medium max-w-xl leading-relaxed">
                اكتشف مجموعتنا المختارة من أرقى العطور العالمية والساعات الأصلية التي تضفي عليك لمسة من الرقي والتميز.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-5">
              <Button size="lg" className="rounded-2xl px-12 text-xl h-16 font-extrabold shadow-2xl shadow-primary/20 bg-luxury-black text-primary hover:bg-black/90 transition-all" asChild>
                <Link href="/products">
                  تسوق الآن
                  <ArrowLeft className="mr-3 w-6 h-6 rotate-180" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white/60">
              <Image 
                src={heroImage?.imageUrl || "https://picsum.photos/seed/banner1/1200/600"} 
                alt="SF Perfume Banner"
                width={1200}
                height={800}
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-[4000ms]"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
