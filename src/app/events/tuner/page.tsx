import EventPoster from "@/components/sections/EventPoster";
import ReservationForm from "@/components/sections/ReservationForm";
import CalendarActions from "@/components/sections/CalendarActions";
import { CalendarDays, Clock3, MapPin, Navigation, Sparkles } from "lucide-react";

const MAPS_URL = "https://maps.app.goo.gl/Z864USZF6ujwkBECA";

export default function TunerEventPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
        <div className="mx-auto max-w-5xl">
          <a
            href="/"
            className="mb-8 inline-flex text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40 transition hover:text-white"
          >
            ← LEYLAA
          </a>

          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025] shadow-2xl shadow-black">
            <EventPoster />
          </div>

          <div className="mt-8 grid gap-px overflow-hidden rounded-[28px] border border-white/10 bg-white/10 sm:grid-cols-3">
            <div className="bg-black p-5">
              <div className="flex items-center gap-2 text-white/35">
                <CalendarDays size={14} />
                <p className="text-[9px] uppercase tracking-[0.25em]">DATE</p>
              </div>
              <p className="mt-3 font-semibold">02 OCTOBER 2026</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/30">FRIDAY</p>
            </div>

            <div className="bg-black p-5">
              <div className="flex items-center gap-2 text-white/35">
                <Clock3 size={14} />
                <p className="text-[9px] uppercase tracking-[0.25em]">TIME</p>
              </div>
              <p className="mt-3 font-semibold">17:30</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/30">DOORS / START</p>
            </div>

            <div className="bg-black p-5">
              <div className="flex items-center gap-2 text-white/35">
                <MapPin size={14} />
                <p className="text-[9px] uppercase tracking-[0.25em]">PLACE</p>
              </div>
              <p className="mt-3 font-semibold">CITY CLUB PARK</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/30">OUJDA</p>
            </div>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <CalendarActions />
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-[62px] items-center justify-between rounded-full border border-white/10 bg-white/[0.035] px-5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] active:scale-[0.99]"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black">
                  <Navigation size={16} />
                </span>
                <span>
                  <span className="block text-sm font-semibold">OPEN EXACT LOCATION</span>
                  <span className="mt-0.5 block text-[9px] uppercase tracking-[0.2em] text-white/30">Google Maps</span>
                </span>
              </span>
              <span className="text-lg text-white/30 transition group-hover:translate-x-0.5 group-hover:text-white">↗</span>
            </a>
          </div>

          <section className="mt-12">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">LOCATION · 01</p>
                <h2 className="mt-4 text-5xl font-black uppercase leading-[0.82] tracking-[-0.08em] sm:text-7xl">
                  FIND
                  <br />
                  <span className="text-white/25">US.</span>
                </h2>
              </div>
              <Sparkles size={17} className="mb-1 text-white/20" />
            </div>

            <div className="relative h-[300px] overflow-hidden rounded-[30px] border border-white/10 bg-[#090909] sm:h-[360px]">
              <div className="absolute inset-0 opacity-60">
                <div className="absolute left-[7%] top-[18%] h-px w-[46%] rotate-[12deg] bg-white/10" />
                <div className="absolute left-[2%] top-[55%] h-px w-[93%] rotate-[-8deg] bg-white/10" />
                <div className="absolute left-[26%] top-[-5%] h-[115%] w-px rotate-[18deg] bg-white/10" />
                <div className="absolute left-[68%] top-[-10%] h-[125%] w-px rotate-[66deg] bg-white/10" />
                <div className="absolute left-[48%] top-[6%] h-[78%] w-px rotate-[-35deg] bg-white/[0.07]" />
                <div className="absolute left-[12%] top-[28%] h-32 w-32 rounded-full border border-white/[0.06]" />
                <div className="absolute right-[8%] bottom-[16%] h-44 w-44 rounded-full border border-white/[0.05]" />
              </div>

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_35%)]" />

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-black/90 shadow-2xl shadow-black">
                  <span className="absolute h-24 w-24 rounded-full border border-white/10 animate-ping" />
                  <span className="h-4 w-4 rounded-full bg-white shadow-[0_0_28px_rgba(255,255,255,0.7)]" />
                </div>
              </div>

              <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/70 px-3 py-2 backdrop-blur-xl">
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/45">OUJDA · MOROCCO</p>
              </div>

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/35">VENUE</p>
                  <p className="mt-1 text-lg font-black uppercase tracking-[-0.03em]">CITY CLUB PARK</p>
                </div>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white px-4 py-3 text-[10px] font-bold uppercase tracking-[0.12em] !text-black transition hover:scale-[1.02] active:scale-95"
                >
                  DIRECTIONS ↗
                </a>
              </div>
            </div>

            <p className="mt-3 text-[10px] leading-relaxed text-white/25">
              Tap directions to open the exact venue pin in Google Maps.
            </p>
          </section>

          <ReservationForm />
        </div>
      </section>
    </main>
  );
}
