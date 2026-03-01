import HeroSection from "@/components/HeroSection";
import VisionSection from "@/components/VisionSection";
import ProjectShowcase from "@/components/ProjectShowcase";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProjectShowcase />
      <VisionSection />
      <Footer />
    </main>
  );
}
