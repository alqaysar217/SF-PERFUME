import { Quote } from "lucide-react"

export function Testimonials() {
  const reviews = [
    {
      name: "أحمد علي",
      role: "مطور واجهات",
      content: "منصة سراج غيرت مساري المهني بالكامل. المحتوى العملي والمتابعة المستمرة جعلتني أتقن البرمجة في وقت قياسي.",
      image: "https://picsum.photos/seed/user1/100/100"
    },
    {
      name: "سارة محمود",
      role: "مصممة جرافيك",
      content: "أفضل ما في سراج هو البساطة في الشرح والتركيز على ما يحتاجه سوق العمل فعلياً. الشهادة المعتمدة ساعدتني كثيراً.",
      image: "https://picsum.photos/seed/user2/100/100"
    },
    {
      name: "محمد حسن",
      role: "محلل بيانات",
      content: "الدعم الفني والرد على الاستفسارات في سراج مذهل. تشعر وكأن هناك مدرب خاص معك في كل خطوة.",
      image: "https://picsum.photos/seed/user3/100/100"
    }
  ]

  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-headline font-bold mb-4">ماذا يقول طلابنا؟</h2>
          <p className="text-muted-foreground">قصص نجاح حقيقية لشباب استطاعوا تغيير مستقبلهم من خلال تعلم مهارات جديدة مع سراج.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-background p-8 rounded-3xl border relative shadow-sm hover:shadow-md transition-shadow">
              <Quote className="absolute top-6 left-6 w-10 h-10 text-primary/10 rotate-180" />
              <p className="text-muted-foreground leading-relaxed mb-8 relative z-10 italic">
                "{review.content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                  <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold">{review.name}</h4>
                  <p className="text-xs text-muted-foreground">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
