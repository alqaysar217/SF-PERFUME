import { CourseCard } from "@/components/shared/course-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CourseHighlight() {
  const featuredCourses = [
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
      image: "https://picsum.photos/seed/aiprog/600/400",
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
    }
  ]

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4 max-w-xl text-right">
            <h2 className="text-4xl font-headline font-bold">أحدث الكورسات التعليمية</h2>
            <p className="text-muted-foreground">استكشف مجموعتنا المختارة من الدورات التدريبية المصممة بعناية لتمكينك من الأدوات والمهارات اللازمة.</p>
          </div>
          <Button variant="outline" className="rounded-full px-8" asChild>
            <Link href="/courses">شاهد كل الكورسات</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  )
}
