
'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { useToast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handlePermissionError = (error: any) => {
      console.error('Security Rule Denied:', error);
      toast({
        variant: "destructive",
        title: "خطأ في الصلاحيات",
        description: "تم رفض العملية من قبل قواعد أمان Firebase. يرجى التأكد من إعدادات الوصول.",
      });
    };

    errorEmitter.on('permission-error', handlePermissionError);
    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, [toast]);

  return null;
}
