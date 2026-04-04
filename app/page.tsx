import GradHero from "@/components/home/GradHero";
import NameMarquee from "@/components/home/NameMarquee";
import PhotoBento from "@/components/home/PhotoBento";
import GradPackages from "@/components/home/GradPackages";
import HowItWorks from "@/components/home/HowItWorks";
import GradCTA from "@/components/home/GradCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      {/* 1. Hero — split-screen, bold editorial, speaks directly to grads */}
      <GradHero />

      {/* 2. Name marquee — infinite scroll of real grad names + "Your Name" */}
      <NameMarquee />

      {/* 3. Bento photo grid — shows range and quality of work */}
      <PhotoBento />

      {/* 4. Packages — clear, transparent pricing (grads are price-conscious) */}
      <GradPackages />

      {/* 5. How it works + stats — reassurance and social proof */}
      <HowItWorks />

      {/* 6. Full-bleed parallax CTA — urgency + emotional close */}
      <GradCTA />

      {/* 7. Footer */}
      <Footer />
    </main>
  );
}
