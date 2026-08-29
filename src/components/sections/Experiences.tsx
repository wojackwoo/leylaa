"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    number: "01",
    title: "EVENTS",
    text: "Not another copy-paste party.",
    detail: "NIGHTS WORTH LEAVING HOME FOR.",
  },
  {
    number: "02",
    title: "PEOPLE",
    text: "Meet someone outside your usual circle.",
    detail: "STRANGERS TODAY. STORIES TOMORROW.",
  },
  {
    number: "03",
    title: "CHALLENGES",
    text: "Do something you wouldn't normally do.",
    detail: "GET OUT OF YOUR COMFORT ZONE.",
  },
  {
    number: "04",
    title: "MEMORIES",
    text: "The kind of night you talk about later.",
    detail: "SOME NIGHTS DON'T NEED A REPLAY.",
  },
];

export default function Experiences() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".experience-item");

      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experiences"
      className="relative overflow-hidden px-5 py-32"
    >
      <div className="mb-16">
        <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-white/50">
          02 — What happens here
        </p>

        <h2 className="max-w-[360px] text-[14vw] font-black uppercase leading-[0.82] tracking-[-0.09em] text-white">
          More than
          <br />
          <span className="text-white/30">a party.</span>
        </h2>
      </div>

      <div className="relative">
        {experiences.map((item, index) => (
          <article
            key={item.number}
            className="experience-item group relative border-t border-white/15 py-8 opacity-0"
          >
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-medium tracking-[0.2em] text-white/40">
                {item.number}
              </span>

              <span className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                LEYLAA / 0{index + 1}
              </span>
            </div>

            <div className="mt-12">
              <h3 className="text-[15vw] font-black leading-[0.78] tracking-[-0.09em] text-white transition-transform duration-700 group-active:translate-x-2">
                {item.title}
              </h3>

              <div className="mt-8 flex items-start gap-5">
                <div className="mt-2 h-px w-10 shrink-0 bg-white/30" />

                <div>
                  <p className="text-base leading-relaxed text-white/65">
                    {item.text}
                  </p>

                  <p className="mt-3 text-[9px] font-semibold tracking-[0.25em] text-white/30">
                    {item.detail}
                  </p>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute bottom-7 right-0 h-16 w-16 rounded-full border border-white/10 opacity-0 transition-all duration-700 group-active:scale-125 group-active:opacity-100" />
          </article>
        ))}

        <div className="border-t border-white/15" />
      </div>
    </section>
  );
}
