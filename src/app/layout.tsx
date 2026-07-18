
'use client';

import { usePathname } from 'next/navigation';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { BottomNav } from '@/components/navigation/bottom-nav';
import { WhatsAppBubble } from '@/components/shared/whatsapp-bubble';
import { Header } from '@/components/navigation/header';
import { FirebaseProvider } from '@/firebase/provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <html lang="ar" dir="rtl">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased pb-24 min-h-screen bg-background text-foreground">
        <FirebaseProvider>
          <Header />
          <main className="md:max-w-md md:mx-auto w-full min-h-[calc(100vh-64px)]">
            {children}
          </main>
          {!isAdmin && <BottomNav />}
          {!isAdmin && <WhatsAppBubble />}
          <Toaster />
        </FirebaseProvider>
      </body>
    </html>
  );
}
