export function StatsSection() {
  const stats = [
    { label: "عقل يطمح للقمة", value: "+15,000" },
    { label: "ساعة تعليمية فاخرة", value: "+2,500" },
    { label: "اعتماد صادر بموثوقية", value: "+7,000" },
    { label: "خبير يشارك النور", value: "+80" }
  ]

  return (
    <section className="bg-primary text-background py-24 relative overflow-hidden">
      {/* Soft Light effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-3 transform hover:scale-105 transition-transform">
              <p className="text-5xl md:text-7xl font-headline font-extrabold text-secondary tracking-tighter">{stat.value}</p>
              <div className="h-1 w-12 bg-accent/30 mx-auto rounded-full"></div>
              <p className="text-background/60 font-bold text-sm uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}