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
            RESERVE
            <br />
            YOUR
            <br />
            <span className="text-white/25">TICKET.</span>
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/45">
            One tap. One WhatsApp message. We&apos;ll handle the rest.
          </p>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5 sm:p-7">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="group flex min-h-[220px] w-full flex-col justify-between rounded-[24px] border border-white/10 bg-black/45 p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:scale-[1.01] active:scale-[0.99] sm:p-8"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black">
                <MessageCircle size={23} />
              </span>
              <ArrowUpRight
                size={24}
                className="text-white/25 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
              />
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/30">
                WHATSAPP · +212 6 30 70 59 42
              </p>
              <h3 className="mt-3 text-3xl font-black uppercase leading-none tracking-[-0.05em] sm:text-4xl">
                RESERVE MY TICKET
              </h3>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
