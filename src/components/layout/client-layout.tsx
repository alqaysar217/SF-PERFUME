
'use client';

import { usePathname } from 'next/navigation';
import { BottomNav } from '@/components/navigation/bottom-nav';
import { WhatsAppBubble } from '@/components/shared/whatsapp-bubble';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <>
      <main className="md:max-w-md md:mx-auto w-full min-h-[calc(100vh-64px)]">
        {children}
      </main>
      {!isAdmin && <BottomNav />}
      {!isAdmin && <WhatsAppBubble />}
    </>
  );
}
