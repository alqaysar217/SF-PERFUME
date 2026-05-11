import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "كيف يمكنني الاشتراك في الكورسات المدفوعة؟",
      answer: "يتم الاشتراك عن طريق الإيداع البنكي أو التحويل لحساباتنا الرسمية، ثم إرسال صورة السند عبر الواتساب مع بريدك الإلكتروني ليقوم فريقنا بتفعيل حسابك فوراً."
    },
    {
      question: "هل الشهادات الصادرة من سراج معتمدة؟",
      answer: "نعم، كل شهادة تحمل رقم اعتماد فريد وQR Code يمكن التحقق من صحته عبر صفحة التحقق في المنصة، وهي معتمدة من قبل المدربين المعتمدين وإدارة المنصة."
    },
    {
      question: "هل أحتاج لخبرة سابقة للبدء؟",
      answer: "لدينا دورات تبدأ من الصفر تماماً للمبتدئين، كما لدينا مسارات متقدمة لمن لديهم خبرة ويرغبون في التخصص والاحتراف."
    },
    {
      question: "كيف يمكنني التواصل مع المدرب؟",
      answer: "توجد مساحة خاصة للتعليقات أسفل كل درس، كما توجد مجموعات نقاش خاصة للمشتركين للتواصل المباشر مع المدربين وفريق الدعم."
    }
  ]

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl font-headline font-bold">الأسئلة الشائعة</h2>
          <p className="text-muted-foreground">كل ما تريد معرفته عن منصة سراج التعليمية ورحلتك التعليمية معنا.</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-2xl px-6 bg-background">
              <AccordionTrigger className="text-right hover:no-underline font-bold text-lg py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-right pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
