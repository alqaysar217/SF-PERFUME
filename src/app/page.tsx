import { Hero } from "@/components/home/hero";
import { FeatureSection } from "@/components/home/feature-section";
import { CourseHighlight } from "@/components/home/course-highlight";
import { StatsSection } from "@/components/home/stats-section";
import { Testimonials } from "@/components/home/testimonials";
import { FAQSection } from "@/components/home/faq-section";
import { WhatsAppBubble } from "@/components/shared/whatsapp-bubble";

export default function Home() {
  return (
    <div className="flex flex-col gap-24">
      <Hero />
      <FeatureSection />
      <CourseHighlight />
      <StatsSection />
      <Testimonials />
      <FAQSection />
      <WhatsAppBubble />
    </div>
  );
}
