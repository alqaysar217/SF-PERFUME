
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center space-y-6">
      <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center">
        <div className="w-10 h-10 bg-primary rounded-2xl animate-pulse"></div>
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">مساحة عمل جديدة</h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          تم تنظيف مساحة العمل بنجاح. أخبرني الآن بفكرة تطبيقك الجديد وسأبدأ فوراً في بنائه لك من الصفر.
        </p>
      </div>
    </div>
  );
}
