import Link from "next/link"
import { Facebook, Instagram, Youtube, Twitter, MessageCircle, Sparkles } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-background py-20 relative overflow-hidden">
      {/* Warm Glow Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] -z-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Brand Info */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center luxury-border shadow-lg shadow-secondary/10">
                <span className="text-primary font-headline font-bold text-2xl">S</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-headline font-bold text-background tracking-tight">سراج</span>
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest font-english">Education</span>
              </div>
            </Link>
            <p className="text-background/70 leading-relaxed font-medium">
              نحن في سراج نؤمن أن التعليم هو النور الذي يبني المستقبل. منصتنا العربية تهدف لتقديم مهارات الغد بجودة تليق بتطلعاتك.
            </p>
            <div className="flex items-center gap-5">
              <Link href="#" className="hover:text-secondary transition-all transform hover:scale-110"><Facebook className="w-6 h-6" /></Link>
              <Link href="#" className="hover:text-secondary transition-all transform hover:scale-110"><Instagram className="w-6 h-6" /></Link>
              <Link href="#" className="hover:text-secondary transition-all transform hover:scale-110"><Youtube className="w-6 h-6" /></Link>
              <Link href="#" className="hover:text-secondary transition-all transform hover:scale-110"><Twitter className="w-6 h-6" /></Link>
              <Link href="https://wa.me/yourwhatsapp" className="text-secondary hover:text-accent transition-all transform hover:scale-110"><MessageCircle className="w-6 h-6" /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-headline font-bold mb-8 text-secondary flex items-center gap-2">
              المعرفة
              <Sparkles className="w-4 h-4" />
            </h4>
            <ul className="space-y-4">
              <li><Link href="/courses" className="text-background/70 hover:text-secondary transition-colors font-medium">الكورسات الاحترافية</Link></li>
              <li><Link href="/paths" className="text-background/70 hover:text-secondary transition-colors font-medium">المسارات التعليمية</Link></li>
              <li><Link href="/books" className="text-background/70 hover:text-secondary transition-colors font-medium">مكتبة سراج</Link></li>
              <li><Link href="/services" className="text-background/70 hover:text-secondary transition-colors font-medium">الاستشارات الفنية</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xl font-headline font-bold mb-8 text-secondary">الدعم والتمكين</h4>
            <ul className="space-y-4">
              <li><Link href="/verify" className="text-background/70 hover:text-secondary transition-colors font-medium">التحقق من الشهادات</Link></li>
              <li><Link href="/faq" className="text-background/70 hover:text-secondary transition-colors font-medium">الأسئلة الشائعة</Link></li>
              <li><Link href="/contact" className="text-background/70 hover:text-secondary transition-colors font-medium">تواصل مع الإدارة</Link></li>
              <li><Link href="/terms" className="text-background/70 hover:text-secondary transition-colors font-medium">اتفاقية الاستخدام</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-headline font-bold mb-8 text-secondary">تواصل معنا</h4>
            <div className="space-y-5 text-background/70 font-medium">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-accent shrink-0 mt-1" />
                <p>واتساب الإدارة: +967 7xx xxx xxx</p>
              </div>
              <p>البريد: care@sirajplatform.com</p>
              <p>المشرف العام: م / سلطان باهبري</p>
              <div className="pt-4">
                <div className="bg-background/5 p-4 rounded-xl border border-white/10">
                  <p className="text-xs text-accent font-bold mb-1">ساعات العمل</p>
                  <p className="text-sm">السبت - الخميس: 9ص - 10م</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/5 text-center">
          <p className="text-sm text-background/40 font-medium">
            © {currentYear} جميع الحقوق محفوظة لمنصة سراج التعليمية. صُممت بكل فخر لنشر الضوء والمعرفة.
          </p>
        </div>
      </div>
    </footer>
  )
}