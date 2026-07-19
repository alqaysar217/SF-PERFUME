
"use client"

import { useMemo } from "react"
import { useFirestore } from "@/firebase/provider"
import { collection, query, where } from "firebase/firestore"
import { useCollection } from "@/firebase/firestore/use-collection"
import { ProductCard } from "@/components/shared/product-card"
import { Percent, Loader2, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function OffersPage() {
  const db = useFirestore()

  // جلب العروض بدون ترتيب لتجنب الحاجة لفهرس مركب حالياً
  const offersQuery = useMemo(() => 
    db ? query(
      collection(db, "products"), 
      where("isOffer", "==", true)
    ) : null
  , [db])

  const { data: offersRaw, loading } = useCollection<any>(offersQuery)

  // ترتيب العروض برمجياً من الأحدث إلى الأقدم
  const offers = useMemo(() => {
    if (!offersRaw) return [];
    return [...offersRaw].sort((a, b) => {
      const timeA = a.createdAt?.toMillis?.() || (a.createdAt?.seconds ? a.createdAt.seconds * 1000 : 0);
      const timeB = b.createdAt?.toMillis?.() || (b.createdAt?.seconds ? b.createdAt.seconds * 1000 : 0);
      return timeB - timeA;
    });
  }, [offersRaw]);

  return (
    <div className="flex flex-col gap-8 p-4 animate-fade-in pb-32">
      {/* رأس صفحة العروض */}
      <div className="bg-primary/10 p-8 rounded-xl flex flex-col items-center gap-4 text-center border border-primary/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
        <div className="w-16 h-16 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 relative z-10">
          <Percent className="w-8 h-8" />
        </div>
        <div className="space-y-1 relative z-10">
          <h2 className="text-xl font-black text-luxury-black">وفر أكثر مع عروضنا الحصرية</h2>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest text-center">Exclusive Luxury Deals</p>
        </div>
      </div>

      {/* عرض المنتجات */}
      <div className="flex flex-col gap-8">
        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            <p className="text-xs font-bold text-gray-400 mt-4">جاري جلب العروض الحصرية...</p>
          </div>
        ) : offers.length > 0 ? (
          offers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
            <Percent className="w-16 h-16 opacity-10" />
            <div className="space-y-2">
              <p className="text-sm font-black text-luxury-black">لا توجد عروض نشطة حالياً</p>
              <p className="text-xs text-gray-400">تابعنا باستمرار لتصلك أحدث الخصومات</p>
            </div>
            <Link href="/products" className="text-primary text-xs font-black flex items-center gap-2">
              تصفح كافة المنتجات
              <ArrowRight className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
