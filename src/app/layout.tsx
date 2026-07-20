
import './globals.css';
import { Suspense } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseProvider } from '@/firebase/provider';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { ClientLayout } from '@/components/layout/client-layout';
import { Header } from '@/components/navigation/header';

export const metadata = {
  title: 'SF PERFUME | Luxury Fragrance Experience',
  description: 'أرقى أنواع العطور العالمية والساعات الفاخرة في اليمن - حضرموت. تسوق الآن أفخم الماركات العالمية.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="application-name" content="SF PERFUME" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SF PERFUME" />
        <meta name="theme-color" content="#C9A227" />
        
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="SF PERFUME | Luxury Fragrance Experience" />
        <meta property="og:description" content="أرقى أنواع العطور العالمية والساعات الفاخرة في اليمن - حضرموت." />
        <meta property="og:image" content="/logo.png" />

        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased pb-24 min-h-screen bg-background text-foreground">
        <FirebaseProvider>
          <FirebaseErrorListener />
          <Suspense fallback={<div className="h-16 bg-white/95" />}>
            <Header />
          </Suspense>
          <ClientLayout>
            {children}
          </ClientLayout>
          <Toaster />
        </FirebaseProvider>
      </body>
    </html>
  );
}
