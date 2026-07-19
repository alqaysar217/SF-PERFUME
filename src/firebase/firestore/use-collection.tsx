
'use client';

import { useState, useEffect } from 'react';
import { 
  onSnapshot, 
  Query, 
  DocumentData,
  QuerySnapshot
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';

export function useCollection<T = DocumentData>(query: Query<T> | null) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    // استخدام onSnapshot مع تفعيل الذاكرة المحلية يضمن ظهور البيانات فوراً من الكاش
    const unsubscribe = onSnapshot(
      query,
      { includeMetadataChanges: true }, // تتبع التغييرات بين الكاش والسيرفر
      (snapshot: QuerySnapshot<T>) => {
        const items = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        
        setData(items);
        setLoading(false);
        
        // إذا كانت البيانات قادمة من الكاش (Offline)، يمكننا تسجيل ذلك إذا أردنا
        const source = snapshot.metadata.fromCache ? "local cache" : "server";
      },
      (err) => {
        // بدلاً من السقوط، نقوم بإرسال الخطأ للمستمع المركزي
        errorEmitter.emit('general-error', err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [query]);

  return { data, loading, error };
}
