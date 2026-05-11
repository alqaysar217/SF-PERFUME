import { CourseCard } from "@/components/shared/course-card"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CoursesPage() {
  const categories = ["الكل", "البرمجة", "الذكاء الاصطناعي", "التصميم", "المحاسبة", "الإدارة", "اللغات"]
  
  const courses = [
    {
      id: "1",
      title: "دبلوم تطوير الويب المتكامل (Full Stack)",
      image: "https://picsum.photos/seed/webdev/600/400",
      instructor: "م / وليد بن قبوس",
      level: "مبتدئ إلى محترف",
      duration: "120 ساعة",
      price: "50$",
      isFree: false,
      rating: 4.9,
      students: 1250
    },
    {
      id: "2",
      title: "أساسيات الذكاء الاصطناعي وعلوم البيانات",
      image: "https://picsum.photos/seed/ai/600/400",
      instructor: "م / وليد بن قبوس",
      level: "متوسط",
      duration: "45 ساعة",
      price: "0$",
      isFree: true,
      rating: 4.8,
      students: 3400
    },
    {
      id: "3",
      title: "تصميم واجهات المستخدم UI/UX الاحترافي",
      image: "https://picsum.photos/seed/design/600/400",
      instructor: "فريق سراج التقني",
      level: "مبتدئ",
      duration: "30 ساعة",
      price: "25$",
      isFree: false,
      rating: 4.7,
      students: 890
    },
    {
      id: "4",
      title: "المحاسبة المالية لغير المحاسبين",
      image: "https://picsum.photos/seed/acc/600/400",
      instructor: "أ / سلطان باهبري",
      level: "مبتدئ",
      duration: "20 ساعة",
      price: "15$",
      isFree: false,
      rating: 4.6,
      students: 560
    },
    {
      id: "5",
      title: "إدارة المشاريع الاحترافية PMP",
      image: "https://picsum.photos/seed/pmp/600/400",
      instructor: "أ / سلطان باهبري",
      level: "متقدم",
      duration: "40 ساعة",
      price: "35$",
      isFree: false,
      rating: 4.9,
      students: 720
    },
    {
      id: "6",
      title: "تطوير تطبيقات الأندرويد باستخدام Flutter",
      image: "https://picsum.photos/seed/android/600/400",
      instructor: "م / وليد بن قبوس",
      level: "متوسط",
      duration: "65 ساعة",
      price: "45$",
      isFree: false,
      rating: 4.8,
      students: 1100
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-primary/5 p-8 rounded-3xl border border-primary/10">
        <div className="space-y-2 text-center md:text-right">
          <h1 className="text-3xl font-headline font-bold">استكشف الكورسات</h1>
          <p className="text-muted-foreground">ابدأ رحلتك التعليمية الآن مع أفضل الدورات التدريبية.</p>
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:w-80">
            <Input placeholder="عن ماذا تبحث؟" className="pr-10 rounded-full h-12 bg-background" />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-full shrink-0">
            <Filter className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((cat, i) => (
          <Button 
            key={i} 
            variant={i === 0 ? "default" : "outline"} 
            className="rounded-full px-6 shrink-0"
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
