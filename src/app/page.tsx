import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experiences from "@/components/sections/Experiences";
import Oujda from "@/components/sections/Oujda";
import Join from "@/components/sections/Join";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Experiences />
        <Oujda />
        <Join />
      </main>

      <Footer />
    </SmoothScroll>
  );
}