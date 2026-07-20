
'use client';

import { usePathname } from 'next/navigation';
import './globals.css';
import { Suspense } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { BottomNav } from '@/components/navigation/bottom-nav';
import { WhatsAppBubble } from '@/components/shared/whatsapp-bubble';
import { Header } from '@/components/navigation/header';
import { FirebaseProvider } from '@/firebase/provider';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

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
        {/* PWA & Base Meta */}
        <meta name="application-name" content="SF PERFUME" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SF PERFUME" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#C9A227" />
        
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />

        {/* Open Graph / Social Sharing (WhatsApp, Facebook) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SF PERFUME | Luxury Fragrance Experience" />
        <meta property="og:description" content="أرقى أنواع العطور العالمية والساعات الفاخرة في اليمن - حضرموت. تسوق الآن أفخم الماركات العالمية." />
        <meta property="og:site_name" content="SF PERFUME" />
        <meta property="og:url" content="https://sf-perfume.vercel.app/" />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />

        {/* Twitter Sharing */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SF PERFUME | Luxury Fragrance Experience" />
        <meta name="twitter:description" content="أرقى أنواع العطور العالمية والساعات الفاخرة في اليمن - حضرموت." />
        <meta name="twitter:image" content="/web-app-manifest-512x512.png" />

        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased pb-24 min-h-screen bg-background text-foreground">
        <FirebaseProvider>
          <FirebaseErrorListener />
          <Suspense fallback={<div className="h-16 bg-white/95" />}>
            <Header />
          </Suspense>
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
