import Link from "next/link"
import { Facebook, Instagram, Youtube, Twitter, MessageCircle } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-headline font-bold text-2xl">S</span>
              </div>
              <span className="text-2xl font-headline font-bold text-background">سراج</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              منصة سراج التعليمية تهدف إلى توفير تعليم عصري احترافي بجودة عالية وسعر مناسب للشباب العربي الطموح.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Youtube className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></Link>
              <Link href="https://wa.me/yourwhatsapp" className="hover:text-primary transition-colors text-accent"><MessageCircle className="w-5 h-5" /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">المنصة</h4>
            <ul className="space-y-4">
              <li><Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors">الكورسات التعليمية</Link></li>
              <li><Link href="/paths" className="text-muted-foreground hover:text-primary transition-colors">المسارات التعليمية</Link></li>
              <li><Link href="/books" className="text-muted-foreground hover:text-primary transition-colors">مكتبة سراج</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">الخدمات والاستشارات</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-6">الدعم والمساعدة</h4>
            <ul className="space-y-4">
              <li><Link href="/verify" className="text-muted-foreground hover:text-primary transition-colors">التحقق من الشهادات</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">الأسئلة الشائعة</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">تواصل معنا</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">الشروط والأحكام</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">ابقى على تواصل</h4>
            <div className="space-y-4 text-muted-foreground">
              <p>واتساب: +967 7xx xxx xxx</p>
              <p>البريد الإلكتروني: info@sirajplatform.com</p>
              <p>الإدارة: م / سلطان باهبري</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-muted/20 text-center text-sm text-muted-foreground">
          <p>© {currentYear} جميع الحقوق محفوظة لمنصة سراج التعليمية. صنع بكل حب لدعم الشباب العربي.</p>
        </div>
      </div>
    </footer>
  )
}
