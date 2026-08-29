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

      tl.from(".hero-small", {
        opacity: 0,
        y: 20,
        duration: 0.7,
      })
        .from(
          ".hero-line",
          {
            y: 100,
            opacity: 0,
            stagger: 0.12,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.3"
        )
        .from(
          ".hero-description",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ".hero-button",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.4"
        );

      gsap.to(titleRef.current, {
        y: -80,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(glowRef.current, {
        y: 150,
        x: 80,
        scale: 1.4,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-start overflow-hidden px-5 pb-10 pt-28 sm:pt-32"
    >
      {/* Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -left-32 top-20 h-[360px] w-[360px] rounded-full bg-white/[0.06] blur-[120px]"
      />

      {/* Grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
        <div className="h-full w-full bg-black/20" />
      </div>

      <div className="relative z-10 w-full">
        <div className="hero-small mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/40">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          Oujda · Morocco · 2026
        </div>

        <h1
          ref={titleRef}
          className="text-[18vw] font-black uppercase leading-[0.78] tracking-[-0.1em]"
        >
          <span className="hero-line block">You don't</span>
          <span className="hero-line block">need a</span>
          <span className="hero-line block text-white/25">group.</span>
        </h1>

        <div className="mt-10">
          <p className="hero-description max-w-[340px] text-[17px] leading-relaxed text-white/55">
            We're building a community fin t9dro tla9aw bnas jdad, go out, w tjrbo wt3icho des experience jdad w different
          </p>

          <a
            href="https://discord.gg/c5E5JAAkr"
            target="_blank"
            rel="noreferrer"
            className="hero-button mt-7 inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-bold !text-black transition-all duration-300 active:scale-95"
          >
            JOIN LEYLAA
            <ArrowUpRight size={18} />
          </a>
        </div>

        <div className="mt-16 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/25">
          <ArrowDown size={14} className="animate-bounce" />
          Keep scrolling
        </div>
      </div>
    </section>
  );
}

