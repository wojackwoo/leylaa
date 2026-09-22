import ReservationForm from "@/components/sections/ReservationForm";

export default function TunerEventPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
        <div className="mx-auto max-w-5xl">
          <a href="/" className="mb-8 inline-flex text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40 transition hover:text-white">
            ← LEYLAA
          </a>

          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025]">
            <img
              src="/events/tuner-announcement.jpg"
              alt="LEYLAA Movie Night — Tuner (2025)"
              className="block h-auto w-full"
              width={1080}
              height={1350}
            />
          </div>

          <div className="mt-8 grid gap-px overflow-hidden rounded-[28px] border border-white/10 bg-white/10 sm:grid-cols-3">
            <div className="bg-black p-5"><p className="text-[9px] uppercase tracking-[0.25em] text-white/30">DATE</p><p className="mt-2 font-semibold">02 OCTOBER 2026</p></div>
            <div className="bg-black p-5"><p className="text-[9px] uppercase tracking-[0.25em] text-white/30">TIME</p><p className="mt-2 font-semibold">17:30</p></div>
            <div className="bg-black p-5"><p className="text-[9px] uppercase tracking-[0.25em] text-white/30">PLACE</p><p className="mt-2 font-semibold">CITY CLUB PARK · OUJDA</p></div>
          </div>

          <ReservationForm />
        </div>
      </section>
    </main>
  );
}
