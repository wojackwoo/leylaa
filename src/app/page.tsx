import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Reservation from "@/components/sections/Reservation";
import About from "@/components/sections/About";
import Experiences from "@/components/sections/Experiences";
import Oujda from "@/components/sections/Oujda";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />

      <main>
        <Hero />
        <Reservation />
        <About />
        <Experiences />
        <Oujda />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
