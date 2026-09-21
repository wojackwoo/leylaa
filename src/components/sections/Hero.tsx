"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".hero-kicker", {
        opacity: 0,
        y: 16,
        duration: 0.6,
      })
        .from(
          ".hero-line",
          {
            y: 90,
            opacity: 0,
            stagger: 0.1,
            duration: 0.9,
            ease: "power4.out",
          },
          "-=0.25"
        )
        .from(
          ".hero-meta",
          {
            opacity: 0,
            y: 24,
            duration: 0.7,
          },
          "-=0.45"
        )
        .from(
          ".hero-button",
          {
            opacity: 0,
            y: 16,
            duration: 0.6,
          },
          "-=0.35"
        );

      gsap.to(titleRef.current, {
        y: -70,
        opacity: 0.22,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(glowRef.current, {
        y: 120,
        x: 70,
        scale: 1.35,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-end overflow-hidden px-5 pb-12 pt-32 sm:pb-16"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute -left-36 top-20 h-[420px] w-[420px] rounded-full bg-white/[0.055] blur-[130px]"
      />

      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_55%)]" />
      </div>

      <div className="relative z-10 w-full">
        <div className="hero-kicker mb-7 flex items-center justify-between gap-4 text-[9px] font-semibold uppercase tracking-[0.32em] text-white/40">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            LEYLAA PRESENTS
          </span>
          <span>01 / 01</span>
        </div>

        <h1
          ref={titleRef}
          className="max-w-[820px] text-[17vw] font-black uppercase leading-[0.78] tracking-[-0.1em] sm:text-[14vw]"
        >
          <span className="hero-line block">MOVIE</span>
          <span className="hero-line block text-white/30">NIGHT</span>
          <span className="hero-line block text-[18vw] sm:text-[15vw]">TUNER</span>
        </h1>

        <div className="hero-meta mt-10 grid max-w-[560px] grid-cols-2 gap-px overflow-hidden rounded-[26px] border border-white/10 bg-white/10">
          <div className="bg-black/80 p-4 backdrop-blur-sm">
            <p className="text-[9px] uppercase tracking-[0.22em] text-white/30">DATE</p>
            <p className="mt-2 text-sm font-semibold">02 OCTOBER 2026</p>
          </div>
          <div className="bg-black/80 p-4 backdrop-blur-sm">
            <p className="text-[9px] uppercase tracking-[0.22em] text-white/30">TIME</p>
            <p className="mt-2 text-sm font-semibold">17:30</p>
          </div>
          <div className="bg-black/80 p-4 backdrop-blur-sm">
            <p className="text-[9px] uppercase tracking-[0.22em] text-white/30">PLACE</p>
            <p className="mt-2 text-sm font-semibold">CITY CLUB PARK</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/35">OUJDA</p>
          </div>
          <div className="bg-black/80 p-4 backdrop-blur-sm">
            <p className="text-[9px] uppercase tracking-[0.22em] text-white/30">FIRST 100</p>
            <p className="mt-2 text-2xl font-black tracking-[-0.05em]">80 DH</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/35">210 SEATS</p>
          </div>
        </div>

        <p className="mt-6 max-w-[430px] text-sm leading-relaxed text-white/48 sm:text-base">
          One screen. One night. New faces.
          <br />
          Reserve your spot and we&apos;ll handle the rest on WhatsApp.
        </p>

        <a
          href="#reserve"
          className="hero-button mt-7 inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-bold !text-black transition-all duration-300 hover:scale-[1.02] active:scale-95"
        >
          RESERVE YOUR SPOT
          <ArrowUpRight size={18} />
        </a>

        <div className="mt-14 flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-white/25">
          <ArrowDown size={14} className="animate-bounce" />
          Scroll
        </div>
      </div>
    </section>
  );
}
