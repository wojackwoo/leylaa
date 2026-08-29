"use client";

import Reveal from "@/components/sections/Reveal";

const features = [
  {
    number: "01",
    title: "NEW PEOPLE",
    description: "Meet people who are here for the same energy.",
    symbol: "✦",
  },
  {
    number: "02",
    title: "NEW NIGHTS",
    description: "Different nights. Different places. Never the same vibe.",
    symbol: "◐",
  },
  {
    number: "03",
    title: "NEW STORIES",
    description: "The kind of nights you remember long after they end.",
    symbol: "∞",
  },
  {
    number: "04",
    title: "NO BORING PLANS",
    description: "If the plan feels boring, it is not our plan.",
    symbol: "↗",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-black px-5 py-32 text-white"
    >
      <div className="mx-auto max-w-[500px]">
        <Reveal>
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.35em] text-white/40">
              WHO WE ARE
            </p>

            <h2 className="text-[14vw] font-black uppercase leading-[0.82] tracking-[-0.09em]">
              WE MAKE
              <br />
              <span className="text-white/35">NIGHTS</span>
              <br />
              MATTER.
            </h2>

            <p className="mt-8 max-w-[390px] text-base leading-relaxed text-white/60">
              We bring people together through nights worth leaving the house
              for. New faces, unexpected moments and plans that turn into
              stories.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-16 grid grid-cols-2 gap-3">
            {features.map((item, index) => (
              <div
                key={item.title}
                className="group relative min-h-[190px] overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.035] p-4 transition-all duration-500 active:scale-[0.96]"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/[0.04] blur-2xl transition-all duration-700 group-active:scale-[2]" />

                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-medium tracking-[0.25em] text-white/30">
                      {item.number}
                    </span>

                    <span className="text-xl text-white/30 transition-all duration-500 group-active:rotate-12 group-active:scale-125 group-active:text-white">
                      {item.symbol}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-[17px] font-black uppercase leading-none tracking-[-0.04em]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-[11px] leading-relaxed text-white/45">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-700 group-active:w-full" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}



