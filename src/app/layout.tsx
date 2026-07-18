
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { BottomNav } from '@/components/navigation/bottom-nav';
import { WhatsAppBubble } from '@/components/shared/whatsapp-bubble';
import { Header } from '@/components/navigation/header';

export const metadata: Metadata = {
  title: 'SF PERFUME | عالم العطور الفاخرة',
  description: 'متجر SF PERFUME للعطور الأصلية والساعات الفاخرة - حضرموت، المكلا',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased pb-24 min-h-screen bg-background text-foreground">
        <Header />
        <main className="md:max-w-md md:mx-auto w-full min-h-[calc(100vh-64px)]">
          {children}
        </main>
        <BottomNav />
        <WhatsAppBubble />
        <Toaster />
      </body>
    </html>
  );
}
