
'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { useToast } from '@/hooks/use-toast';
import { ShieldAlert, WifiOff, AlertTriangle } from 'lucide-react';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    // معالجة أخطاء الصلاحيات (Security Rules)
    const handlePermissionError = (error: any) => {
      console.error('Security Rule Denied:', error);
      toast({
        variant: "destructive",
        title: "خطأ في الصلاحيات",
        description: "عذراً، لا تملك الصلاحية الكافية لإتمام هذه العملية. يرجى مراجعة الإدارة.",
      });
    };

    // معالجة أخطاء الاتصال
    const handleNetworkError = () => {
      toast({
        variant: "destructive",
        title: "مشكلة في الاتصال",
        description: "يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.",
      });
    };

    // معالجة الأخطاء العامة
    const handleGeneralError = (error: any) => {
      console.error('App Error:', error);
      toast({
        variant: "destructive",
        title: "حدث خطأ غير متوقع",
        description: "نعمل حالياً على إصلاح المشكلة، يرجى تحديث الصفحة.",
      });
    };

    errorEmitter.on('permission-error', handlePermissionError);
    errorEmitter.on('network-error', handleNetworkError);
    errorEmitter.on('general-error', handleGeneralError);

    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
      errorEmitter.off('network-error', handleNetworkError);
      errorEmitter.off('general-error', handleGeneralError);
    };
  }, [toast]);

  return null;
}
