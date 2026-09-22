"use client";

import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    eyebrow: "NEW EXPERIENCE · 01",
    title: ["Movie", "Night."],
    accent: "TUNER",
    detail: "02.10.2026 · 17:30 · CITY CLUB PARK",
  },
  {
    eyebrow: "LEYLAA PRESENTS · 02",
    title: ["Something", "different."],
    accent: "OUJDA",
    detail: "A night made for meeting, watching & experiencing.",
  },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".hero-small", { opacity: 0, y: 20, duration: 0.7 })
        .from(
          ".hero-line",
          { y: 100, opacity: 0, stagger: 0.12, duration: 1, ease: "power4.out" },
          "-=0.3"
        )
        .from(".hero-description", { opacity: 0, y: 30, duration: 0.8 }, "-=0.5")
        .from(".hero-button", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4");

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

  useEffect(() => {
    const timer = paused
      ? undefined
      : window.setInterval(() => {
          setSlide((current) => (current + 1) % slides.length);
        }, 5500);

    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [paused]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-transition",
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.07, ease: "power3.out" }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [slide]);

  const current = slides[slide];

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative flex min-h-screen items-start overflow-hidden px-5 pb-10 pt-28 sm:pt-32"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute -left-32 top-20 h-[360px] w-[360px] rounded-full bg-white/[0.06] blur-[120px]"
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
        <div className="h-full w-full bg-black/20" />
      </div>

      <div className="relative z-10 w-full">
        <div className="hero-small mb-6 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.28em] text-white/40">
          <span className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            Oujda · Morocco · 2026
          </span>
          <div className="flex items-center gap-2">
            <span>
              {String(slide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              aria-label={paused ? "Resume announcement slideshow" : "Pause announcement slideshow"}
              onClick={() => setPaused((value) => !value)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/45 transition hover:border-white/25 hover:text-white"
            >
              {paused ? <Play size={13} /> : <Pause size={13} />}
            </button>
          </div>
        </div>

        <div className="min-h-[440px] sm:min-h-[500px]">
          <p className="hero-transition mb-5 text-[9px] font-semibold uppercase tracking-[0.32em] text-white/35">
            {current.eyebrow}
          </p>

          <h1
            ref={titleRef}
            className="text-[clamp(58px,17vw,180px)] font-black uppercase leading-[0.76] tracking-[-0.1em]"
          >
            <span className="hero-transition hero-line block">{current.title[0]}</span>
            <span className="hero-transition hero-line block text-white/25">{current.title[1]}</span>
            <span className="hero-transition hero-line block">{current.accent}</span>
          </h1>

          <div className="mt-8">
            <p className="hero-transition hero-description max-w-[430px] text-base leading-relaxed text-white/55">
              {current.detail}
            </p>

            <a
              href="/events/tuner"
              className="hero-button hero-transition mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-bold !text-black transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              RESERVE MY TICKET
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between gap-5">
          <div className="flex gap-1">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Show announcement ${index + 1}`}
                onClick={() => {
                  setSlide(index);
                  setPaused(false);
                }}
                className="flex h-11 w-11 items-center justify-center rounded-full"
              >
                <span
                  className={`block h-1 rounded-full transition-all ${
                    index === slide ? "w-10 bg-white" : "w-5 bg-white/20"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/25">
            <ArrowDown size={14} className="animate-bounce" />
            Keep scrolling
          </div>
        </div>
      </div>
    </section>
  );
}
