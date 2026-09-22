import { ArrowUpRight, MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/212630705942?text=" +
  encodeURIComponent(
    "Hi LEYLAA 👋 I want to reserve my ticket for Movie Night — Tuner (2025) on 02 October 2026."
  );

export default function ReservationForm() {
  return (
    <section className="mt-12 border-t border-white/10 pt-12">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">
            RESERVATION · 02
          </p>

          <h2 className="mt-5 text-6xl font-black uppercase leading-[0.8] tracking-[-0.08em] sm:text-8xl">
            SAVE
            <br />
            YOUR
            <br />
            <span className="text-white/25">SPOT.</span>
          </h2>

          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/45">
            Tap the button. Send us a WhatsApp. We&apos;ll handle the rest.
          </p>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5 sm:p-7">
          <div className="rounded-[22px] border border-white/10 bg-black/40 p-5 sm:p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
              <MessageCircle size={21} />
            </div>

            <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">
              TICKET RESERVATION
            </p>

            <h3 className="mt-3 text-3xl font-black uppercase leading-none tracking-[-0.05em]">
              Talk to
              <br />
              LEYLAA.
            </h3>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
              
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-bold !text-black transition hover:scale-[1.01] active:scale-95"
            >
              RESERVE MY TICKET
              <ArrowUpRight size={18} />
            </a>

            <p className="mt-4 text-center text-[9px] uppercase tracking-[0.18em] text-white/20">
              +212 6 30 70 59 42
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
