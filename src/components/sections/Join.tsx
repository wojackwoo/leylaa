import { ArrowUpRight } from "lucide-react";

export default function Join() {
  return (
    <section
      id="community"
      className="relative overflow-hidden px-5 py-40"
    >
      <div className="absolute -bottom-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-white/[0.035] blur-[120px]" />

      <div className="relative z-10">
        <p className="mb-8 text-[10px] uppercase tracking-[0.3em] text-white/25">
          04 — Don't just watch
        </p>

        <h2 className="text-[17vw] font-black uppercase leading-[0.8] tracking-[-0.1em]">
          JOIN
          <br />
          <span className="text-white/25">US.</span>
        </h2>

        <p className="mt-10 max-w-[330px] text-lg leading-relaxed text-white/45">
          We're still small.
          <br />
          That's exactly why you should be here now.
        </p>

        <a
          href="https://discord.gg/c5E5JAAkr"
          target="_blank"
          rel="noreferrer"
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-bold !text-black transition-all duration-300 active:scale-95"
        >
          JOIN LEYLAA CLUB
          <ArrowUpRight size={18} />
        </a>

        <div className="mt-8 flex items-center gap-3 text-xs text-white/25">
          <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
          11 people are already here.
        </div>
      </div>
    </section>
  );
}