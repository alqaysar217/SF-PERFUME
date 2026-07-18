import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { BottomNav } from '@/components/navigation/bottom-nav';
import { WhatsAppBubble } from '@/components/shared/whatsapp-bubble';

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
        <main>
          {children}
        </main>
        <BottomNav />
        <WhatsAppBubble />
        <Toaster />
      </body>
    </html>
  );
}
