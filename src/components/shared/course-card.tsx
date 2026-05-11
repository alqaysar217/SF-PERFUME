import Image from "next/image"
import Link from "next/link"
import { Star, Clock, Users, ChevronLeft, Bookmark } from "lucide-react"
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
    <div className="group bg-card rounded-[2.5rem] overflow-hidden border border-accent/10 card-hover shadow-sm hover:shadow-secondary/5 relative">
      <Link href={`/courses/${course.id}`} className="block relative aspect-[16/10] overflow-hidden">
        <Image 
          src={course.image} 
          alt={course.title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        <div className="absolute top-6 right-6 z-10 flex gap-2">
          {course.isFree ? (
            <Badge className="bg-secondary text-primary border-none px-5 py-2 text-xs font-bold rounded-xl shadow-lg shadow-secondary/20">مجاني</Badge>
          ) : (
            <Badge variant="secondary" className="px-5 py-2 text-xs font-bold rounded-xl shadow-lg bg-white/95 backdrop-blur-sm text-primary border-none">{course.price}</Badge>
          )}
        </div>
        
        <button className="absolute top-6 left-6 z-10 w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-secondary hover:text-primary transition-all luxury-border">
          <Bookmark className="w-5 h-5" />
        </button>
      </Link>
      
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground font-bold uppercase tracking-widest">
          <span className="flex items-center gap-2 bg-muted/30 px-4 py-1.5 rounded-full border border-primary/5">
            <Clock className="w-3.5 h-3.5 text-secondary" />
            {course.duration}
          </span>
          <span className="flex items-center gap-2 bg-muted/30 px-4 py-1.5 rounded-full border border-primary/5">
            <Users className="w-3.5 h-3.5 text-accent" />
            {course.students.toLocaleString()} طالب
          </span>
        </div>

        <h3 className="text-xl font-headline font-bold line-clamp-2 leading-snug min-h-[3.5rem] text-primary group-hover:text-secondary transition-colors duration-300">
          <Link href={`/courses/${course.id}`}>{course.title}</Link>
        </h3>

        <div className="flex items-center justify-between pt-6 border-t border-accent/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center luxury-border">
              <span className="text-[12px] font-bold text-primary">SJ</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground font-bold leading-none mb-1">تقديم</span>
              <span className="text-sm font-bold text-primary leading-none">{course.instructor}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 text-secondary font-bold">
            <Star className="w-5 h-5 fill-secondary" />
            <span className="text-lg leading-none">{course.rating}</span>
          </div>
        </div>

        <Link 
          href={`/courses/${course.id}`}
          className="w-full h-14 rounded-2xl bg-primary text-white flex items-center justify-center gap-3 font-bold transition-all hover:bg-secondary hover:text-primary group/btn shadow-xl shadow-primary/5"
        >
          <span>ابدأ التعلم الآن</span>
          <ChevronLeft className="w-5 h-5 transition-transform group-hover/btn:-translate-x-1" />
        </Link>
      </div>
    </div>
  )
}