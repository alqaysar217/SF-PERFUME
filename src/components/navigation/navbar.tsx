"use client"

import Link from "next/link"
import { Search, Menu, X, Globe, User, Sparkles } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "الكورسات", href: "/courses" },
    { name: "المسارات", href: "/paths" },
    { name: "الكتب", href: "/books" },
    { name: "الخدمات", href: "/services" },
    { name: "تحقق من الشهادة", href: "/verify" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full glass border-b">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 relative overflow-hidden luxury-border">
            <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Sparkles className="w-6 h-6 text-accent absolute top-1 right-1 opacity-50" />
            <span className="text-white font-headline font-bold text-2xl relative z-10">S</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-headline font-bold text-primary leading-tight tracking-tight">سراج</span>
            <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] -mt-1 font-english">Siraj</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-bold text-muted-foreground hover:text-primary px-4 py-2 rounded-lg transition-all duration-300 relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
          ))}
        </nav>

        {/* Search & Actions */}
        <div className="hidden xl:flex flex-1 max-w-xs relative">
          <Input 
            placeholder="ابحث عن نور المعرفة..." 
            className="pl-10 rounded-2xl bg-muted/30 border-transparent focus:bg-background focus:border-secondary/20 h-11 transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="md:hidden rounded-xl text-primary">
            <Search className="w-5 h-5" />
          </Button>
          
          <div className="hidden sm:flex items-center gap-3">
            <Button variant="ghost" className="rounded-xl font-bold text-primary hover:bg-primary/5" asChild>
              <Link href="/login">دخول</Link>
            </Button>
            <Button asChild className="rounded-xl px-7 font-bold shadow-lg shadow-secondary/10 hover:shadow-secondary/20 bg-secondary text-primary-foreground hover:bg-secondary/90 transition-all border border-accent/20">
              <Link href="/register">انضم الآن</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden rounded-xl bg-muted/50 text-primary">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-8 border-none bg-background">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center luxury-border">
                  <span className="text-white font-headline font-bold text-xl">S</span>
                </div>
                <span className="text-xl font-headline font-bold text-primary">سراج</span>
              </div>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-bold p-3 rounded-xl hover:bg-secondary/5 hover:text-secondary transition-all text-primary/80"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="mt-8 pt-8 border-t space-y-3">
                  <Button asChild className="w-full rounded-xl h-12 text-lg font-bold bg-secondary text-primary">
                    <Link href="/register">ابدأ رحلتك</Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full rounded-xl h-12 text-lg font-bold border-primary/20 text-primary">
                    <Link href="/login">تسجيل الدخول</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}