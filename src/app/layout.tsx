
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'تطبيق جديد | مساحة عمل نظيفة',
  description: 'ابدأ بناء مشروعك القادم هنا.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">
        <main>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
