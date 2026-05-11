import { Laptop, ShieldCheck, GraduationCap, Zap, BookOpen, Headset } from "lucide-react"

export function FeatureSection() {
  const features = [
    {
      icon: <Laptop className="w-8 h-8" />,
      title: "تعليم عملي",
      description: "نركز على التطبيق العملي والمشاريع الحقيقية لتجهيزك لسوق العمل."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "شهادات معتمدة",
      description: "تحصل على شهادة إتمام موثقة برقم اعتماد وQR Code عند نهاية كل دورة."
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "مسارات احترافية",
      description: "مسارات تعليمية مرتبة تأخذك من الصفر وحتى الاحتراف في مجالك."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "دعم مستمر",
      description: "فريق سراج معك دائماً للإجابة على تساؤلاتك ومساعدتك في رحلتك."
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "محتوى متجدد",
      description: "نقوم بتحديث محتوى دوراتنا باستمرار لمواكبة آخر التطورات التقنية."
    },
    {
      icon: <Headset className="w-8 h-8" />,
      title: "استشارات مهنية",
      description: "نساعدك في اختيار تخصصك وبناء سيرتك الذاتية والتحضير للمقابلات."
    }
  ]

  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl font-headline font-bold">لماذا تختار منصة سراج؟</h2>
          <p className="text-muted-foreground">نحن لسنا مجرد منصة فيديوهات، نحن شريكك في رحلة النجاح المهني وتطوير مهاراتك المستقبلية.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-background p-8 rounded-2xl border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 group"
            >
              <div className="w-16 h-16 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
