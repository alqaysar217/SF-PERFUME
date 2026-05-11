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
    <div className="group bg-card rounded-[2rem] overflow-hidden border border-border/50 card-hover shadow-sm">
      <Link href={`/courses/${course.id}`} className="block relative aspect-video overflow-hidden">
        <Image 
          src={course.image} 
          alt={course.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute top-5 right-5 z-10">
          {course.isFree ? (
            <Badge className="bg-accent text-white border-none px-4 py-1.5 text-sm font-bold rounded-xl shadow-lg shadow-accent/20">مجاني</Badge>
          ) : (
            <Badge variant="secondary" className="px-4 py-1.5 text-sm font-bold rounded-xl shadow-lg bg-white/90 backdrop-blur-sm text-foreground border-none">{course.price}</Badge>
          )}
        </div>
      </Link>
      
      <div className="p-7 space-y-5">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground font-extrabold uppercase tracking-wider">
          <span className="flex items-center gap-1.5 bg-muted/50 px-3 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5 text-primary" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1.5 bg-muted/50 px-3 py-1 rounded-full">
            <Users className="w-3.5 h-3.5 text-secondary" />
            {course.students.toLocaleString()} طالب
          </span>
        </div>

        <h3 className="text-xl font-extrabold line-clamp-2 leading-snug min-h-[3.5rem] group-hover:text-primary transition-colors duration-300">
          <Link href={`/courses/${course.id}`}>{course.title}</Link>
        </h3>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/5">
            <span className="text-[11px] font-extrabold text-primary uppercase">SP</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground font-bold leading-none mb-1">المدرب</span>
            <span className="text-sm font-extrabold leading-none">{course.instructor}</span>
          </div>
        </div>

        <div className="pt-5 border-t border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-yellow-500 font-extrabold">
            <Star className="w-5 h-5 fill-yellow-500" />
            <span className="text-lg leading-none">{course.rating}</span>
          </div>
          <Link 
            href={`/courses/${course.id}`}
            className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center transition-all hover:bg-primary hover:text-white group/btn"
          >
            <ChevronLeft className="w-6 h-6 transition-transform group-hover/btn:-translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
