"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Oujda() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".oujda-content",
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-5 py-40"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]" />

      <div className="oujda-content relative z-10 opacity-0">
        <p className="mb-7 text-[10px] uppercase tracking-[0.35em] text-white/50">
          03 — Where it starts
        </p>

        <h2 className="text-[20vw] font-black uppercase leading-[0.75] tracking-[-0.11em] text-white">
          Oujda
        </h2>

        <div className="mt-12 border-l border-white/20 pl-5">
          <p className="text-xl font-medium leading-tight text-white">
            Every movement starts somewhere.
          </p>

          <p className="mt-5 text-base leading-relaxed text-white/50">
            This one starts here.
          </p>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-5">
          <span className="text-[9px] uppercase tracking-[0.25em] text-white/35">
            Oujda
          </span>

          <span className="text-[9px] uppercase tracking-[0.25em] text-white/35">
            Morocco
          </span>

          <span className="text-[9px] uppercase tracking-[0.25em] text-white/35">
            Beyond
          </span>
        </div>
      </div>
    </section>
  );
}
