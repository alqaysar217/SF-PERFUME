import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/navigation/footer';
import { Toaster } from '@/components/ui/toaster';
import { AIAssistant } from '@/components/ai/ai-assistant';

export const metadata: Metadata = {
  title: 'منصة سراج | Siraj Platform',
  description: 'تعلم بذكاء، تطور بثقة - المنصة التعليمية الرائدة للشباب العربي',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary/20">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow tech-grid">
            {children}
          </main>
          <Footer />
        </div>
        <AIAssistant />
        <Toaster />
      </body>
    </html>
  );
}
