import Image from "next/image"
import Link from "next/link"
import { Star, Clock, Users, ChevronLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface CourseCardProps {
  course: {
    id: string
    title: string
    image: string
    instructor: string
    level: string
    duration: string
    price: string
    isFree: boolean
    rating: number
    students: number
  }
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="group bg-background rounded-2xl overflow-hidden border hover:shadow-2xl hover:shadow-primary/10 transition-all">
      <Link href={`/courses/${course.id}`} className="block relative aspect-video overflow-hidden">
        <Image 
          src={course.image} 
          alt={course.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          {course.isFree ? (
            <Badge className="bg-accent text-white border-none px-3 py-1 text-sm">مجاني</Badge>
          ) : (
            <Badge variant="secondary" className="px-3 py-1 text-sm">{course.price}</Badge>
          )}
        </div>
      </Link>
      
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {course.students.toLocaleString()} طالب
          </span>
        </div>

        <h3 className="text-xl font-bold line-clamp-2 leading-tight min-h-[3.5rem] group-hover:text-primary transition-colors">
          <Link href={`/courses/${course.id}`}>{course.title}</Link>
        </h3>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-[10px] font-bold text-primary">SP</span>
          </div>
          <span className="text-sm font-medium">{course.instructor}</span>
        </div>

        <div className="pt-4 border-t flex items-center justify-between">
          <div className="flex items-center gap-1 text-yellow-500 font-bold">
            <Star className="w-4 h-4 fill-yellow-500" />
            {course.rating}
          </div>
          <Link 
            href={`/courses/${course.id}`}
            className="text-primary font-bold text-sm flex items-center gap-1 group/btn"
          >
            التفاصيل
            <ChevronLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
