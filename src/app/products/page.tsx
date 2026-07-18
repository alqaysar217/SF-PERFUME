
"use client"

import { useState, useMemo } from "react"
import { Search, SlidersHorizontal, X, User, UserRound, Watch, LayoutGrid, Loader2 } from "lucide-react"
import { ProductCard } from "@/components/shared/product-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useFirestore } from "@/firebase/provider"
import { collection, query, orderBy } from "firebase/firestore"
import { useCollection } from "@/firebase/firestore/use-collection"

export default function ProductsPage() {
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState("الكل")
  const db = useFirestore()

  const productsQuery = useMemo(() => db ? query(collection(db, "products"), orderBy("createdAt", "desc")) : null, [db])
  const { data: products, loading } = useCollection(productsQuery)

  const filtered = products.filter((p: any) => {
    const matchesSearch = p.name?.includes(search) || p.brand?.includes(search)
    const matchesFilter = activeFilter === "الكل" || 
      (activeFilter === "رجالي" && p.category === 'men') ||
      (activeFilter === "نسائي" && p.category === 'women') ||
      (activeFilter === "ساعات" && p.category === 'watches')
    return matchesSearch && matchesFilter
  })

  const filterOptions = [
    { name: "الكل", icon: LayoutGrid },
    { name: "رجالي", icon: User },
    { name: "نسائي", icon: UserRound },
    { name: "ساعات", icon: Watch },
  ]

  return (
    <div className="flex flex-col gap-8 p-4 animate-fade-in pb-32">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
          <Input 
            placeholder="ابحث عن الماركة أو العطر..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 pr-10 rounded-xl border-none bg-white shadow-sm font-medium text-xs"
          />
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <button className="w-12 h-12 bg-luxury-black text-primary rounded-xl shadow-lg flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-[2.5rem] p-8 h-fit min-h-[40vh] border-none">
            <SheetHeader className="mb-8">
              <SheetTitle className="text-right font-black text-xl text-luxury-black">تصفية المنتجات</SheetTitle>
            </SheetHeader>
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">التصنيف</p>
                <div className="grid grid-cols-2 gap-3">
                  {filterOptions.map((opt) => {
                    const Icon = opt.icon
                    return (
                      <button
                        key={opt.name}
                        onClick={() => setActiveFilter(opt.name)}
                        className={cn(
                          "h-12 rounded-xl text-[11px] font-black transition-all border flex items-center justify-center gap-2",
                          activeFilter === opt.name 
                          ? 'bg-luxury-black text-primary border-luxury-black shadow-lg' 
                          : 'bg-white text-gray-400 border-gray-100'
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        {opt.name}
                      </button>
                    )
                  })}
                </div>
              </div>
              <Button className="w-full h-14 rounded-xl bg-primary text-white font-black text-md shadow-xl shadow-primary/20">
                تطبيق التغييرات
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex items-center justify-between px-1">
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
          {loading ? "جاري التحميل..." : `عرض: ${activeFilter} (${filtered.length} منتج)`}
        </p>
        {activeFilter !== "الكل" && (
          <button 
            onClick={() => setActiveFilter("الكل")}
            className="text-[10px] font-bold text-primary flex items-center gap-1"
          >
            إعادة تعيين <X className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-8">
        {loading ? (
          <div className="py-20 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" /></div>
        ) : filtered.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {!loading && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-300">
          <Search className="w-16 h-16 opacity-10" />
          <p className="text-sm font-bold">لم نجد أي منتجات تطابق بحثك</p>
        </div>
      )}
    </div>
  )
}
