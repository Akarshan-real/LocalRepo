import FeaturedCourses from "@/components/layout/FeaturedCourses";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/layout/HeroSection";
import Instructors from "@/components/layout/Instructors";
import TestimonialCards from "@/components/layout/TestimonialCards";
import UpcomingWebinars from "@/components/layout/UpcomingWebinars";
import WhyChooseUs from "@/components/layout/WhyChooseUs";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/96 antialiased bg-grid-white/[0.02]">
      <HeroSection />
      <FeaturedCourses />
      <WhyChooseUs />
      <TestimonialCards />
      <UpcomingWebinars />
      <Instructors />
    </main>
  );
}
