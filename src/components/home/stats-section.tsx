export function StatsSection() {
  const stats = [
    { label: "طالب وطالبة", value: "+10,000" },
    { label: "دورة تدريبية", value: "+150" },
    { label: "شهادة صادرة", value: "+5,000" },
    { label: "مدرب معتمد", value: "+50" }
  ]

  return (
    <section className="bg-foreground text-background py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-[100px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <p className="text-4xl md:text-6xl font-headline font-bold text-primary">{stat.value}</p>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
