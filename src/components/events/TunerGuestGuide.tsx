"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  BusFront,
  CalendarDays,
  Clock3,
  Languages,
  MapPin,
  Popcorn,
  Sparkles,
} from "lucide-react";

const MEETING_MAPS_URL = "https://maps.app.goo.gl/8ycssXBHmx8UREfx9";
const VENUE_MAPS_URL = "https://maps.app.goo.gl/igshG3etMA2WZp6C9";
const WHATSAPP_URL =
  "https://wa.me/212630705942?text=" +
  encodeURIComponent("Hi LEYLAA 👋 I have a question about Movie Night — Tuner (2025).");

type Language = "en" | "fr" | "ar";

const copy = {
  en: {
    welcome: "WELCOME",
    hero: "YOU'RE IN.",
    subtitle: "LEYLAA MOVIE NIGHT · TUNER (2025)",
    date: "02 OCTOBER 2026",
    poster: "EVENT POSTER",
    meeting: "MEETING POINT",
    meetingPlace: "L'ENTRÉE PRINCIPALE DE L'EST",
    meetingTime: "17:30",
    meetingLabel: "MEET HERE",
    start: "EVENT START",
    startTime: "18:00",
    venue: "CITY CLUB PARK",
    openMap: "OPEN MAP",
    route: "MEET → MOVE → MOVIE",
    included: "INCLUDED IN YOUR TICKET",
    ticket: "80 DH",
    transport: "TRANSPORT",
    snacks: "SNACKS",
    includedWord: "INCLUDED",
    night: "YOUR NIGHT",
    ask: "HAVE A QUESTION?",
    askText: "Message LEYLAA on WhatsApp.",
    whatsapp: "ASK ON WHATSAPP",
    back: "BACK TO LEYLAA",
  },
  fr: {
    welcome: "BIENVENUE",
    hero: "C'EST BON.",
    subtitle: "LEYLAA MOVIE NIGHT · TUNER (2025)",
    date: "02 OCTOBRE 2026",
    poster: "AFFICHE",
    meeting: "POINT DE RENDEZ-VOUS",
    meetingPlace: "L'ENTRÉE PRINCIPALE DE L'EST",
    meetingTime: "17:30",
    meetingLabel: "RENDEZ-VOUS",
    start: "DÉBUT",
    startTime: "18:00",
    venue: "CITY CLUB PARK",
    openMap: "OUVRIR LA CARTE",
    route: "RENDEZ-VOUS → TRANSPORT → FILM",
    included: "COMPRIS DANS VOTRE BILLET",
    ticket: "80 DH",
    transport: "TRANSPORT",
    snacks: "SNACKS",
    includedWord: "COMPRIS",
    night: "VOTRE SOIRÉE",
    ask: "UNE QUESTION ?",
    askText: "Écrivez à LEYLAA sur WhatsApp.",
    whatsapp: "QUESTION SUR WHATSAPP",
    back: "RETOUR À LEYLAA",
  },
  ar: {
    welcome: "أهلاً بك",
    hero: "أنت معنا.",
    subtitle: "LEYLAA MOVIE NIGHT · TUNER (2025)",
    date: "02 أكتوبر 2026",
    poster: "ملصق الفعالية",
    meeting: "نقطة اللقاء",
    meetingPlace: "L'ENTRÉE PRINCIPALE DE L'EST",
    meetingTime: "17:30",
    meetingLabel: "اللقاء",
    start: "بداية الفعالية",
    startTime: "18:00",
    venue: "CITY CLUB PARK",
    openMap: "افتح الخريطة",
    route: "اللقاء ← النقل ← الفيلم",
    included: "مشمول في التذكرة",
    ticket: "80 DH",
    transport: "النقل",
    snacks: "الوجبات",
    includedWord: "مشمول",
    night: "ليلتك",
    ask: "لديك سؤال؟",
    askText: "راسل LEYLAA على واتساب.",
    whatsapp: "اسأل على واتساب",
    back: "العودة إلى LEYLAA",
  },
} as const;

export default function TunerGuestGuide() {
  const root = useRef<HTMLElement>(null);
  const hero = useRef<HTMLDivElement>(null);
  const poster = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState<Language>("en");
  const [posterFailed, setPosterFailed] = useState(false);
  const t = copy[language];
  const rtl = language === "ar";

  useEffect(() => {
    const node = root.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(hero.current, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: "power4.out"
      });

      gsap.fromTo(poster.current, { y: 45, rotate: 1.2, opacity: 0 }, {
        y: 0, rotate: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.1
      });

      gsap.utils.toArray<HTMLElement>(".ticket-reveal").forEach((item) => {
        gsap.fromTo(item, { y: 28, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.72, ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 88%", once: true }
        });
      });

      gsap.to(".route-runner", {
        xPercent: 100, duration: 2, ease: "power1.inOut", repeat: -1, yoyo: true
      });

      gsap.to(".route-progress", {
        scaleX: 1, transformOrigin: "left center",
        duration: 1.8, ease: "power2.inOut", repeat: -1, repeatDelay: 0.35
      });

      gsap.to(".meeting-pulse", {
        scale: 1.25, opacity: 0, duration: 1.8, ease: "sine.out", repeat: -1
      });
    }, node);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={root}
      lang={language}
      dir={rtl ? "rtl" : "ltr"}
      className="min-h-screen overflow-x-clip bg-black text-white"
    >
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_6%,rgba(255,255,255,0.045),transparent_28%)]" />
        <div className="absolute inset-0 opacity-[0.018] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6 sm:py-7">
        <a href="/" aria-label="LEYLAA home">
          <img src="/media/logo.svg" alt="LEYLAA" className="h-6 w-auto sm:h-7" />
        </a>

        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-xl">
          <Languages size={13} className="mx-1 text-[#d7ff3f]" aria-hidden="true" />
          {(["en", "fr", "ar"] as Language[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setLanguage(item)}
              aria-pressed={language === item}
              className={language === item ? "min-h-8 min-w-8 rounded-full bg-white px-2 text-[8px] font-black uppercase tracking-[0.12em] text-black" : "min-h-8 min-w-8 rounded-full px-2 text-[8px] font-black uppercase tracking-[0.12em] text-white/35 transition hover:bg-white/[0.06] hover:text-white"}
            >
              {item}
            </button>
          ))}
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-20">
        <div ref={hero}>
          <div className="flex items-center gap-3 text-white/35">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[#d7ff3f]">
              <Sparkles size={13} />
            </span>
            <span className="text-[9px] font-black uppercase tracking-[0.28em]">{t.welcome}</span>
          </div>

          <h1 className="mt-7 max-w-[8ch] text-[clamp(72px,15vw,172px)] font-black uppercase leading-[0.74] tracking-[-0.105em]">
            {t.hero}
          </h1>

          <div className="mt-7 flex flex-col gap-2 text-[10px] font-bold uppercase tracking-[0.19em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d7ff3f]" />
              {t.subtitle}
            </span>
            <span>{t.date}</span>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-4xl px-4 pb-20 sm:px-6 sm:pb-28">
        <div ref={poster} className="mx-auto w-full max-w-[700px]">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#080808] shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:rounded-[34px]">
            {posterFailed ? (
              <div className="flex aspect-[4/5] items-center justify-center">
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/25">{t.poster}</p>
              </div>
            ) : (
              <img
                src="/events/tuner-announcement.jpg"
                alt="LEYLAA Movie Night — Tuner (2025)"
                width={1080}
                height={1350}
                onError={() => setPosterFailed(true)}
                className="block aspect-[4/5] w-full object-cover"
              />
            )}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="ticket-reveal grid gap-3 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[30px] border border-white/10 bg-[#0f0f0f] p-6 sm:p-8">
            <div className="flex items-center gap-3 text-white/35">
              <MapPin size={15} />
              <span className="text-[9px] font-black uppercase tracking-[0.24em]">{t.meeting}</span>
            </div>

            <h2 className="mt-8 max-w-[11ch] text-[clamp(32px,5vw,56px)] font-black uppercase leading-[0.84] tracking-[-0.065em]">
              {t.meetingPlace}
            </h2>

            <div className="mt-9 flex items-end justify-between gap-4">
              <div>
                <p className="text-[clamp(58px,9vw,88px)] font-black leading-[0.76] tracking-[-0.08em]">{t.meetingTime}</p>
                <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#d7ff3f]">{t.meetingLabel}</p>
              </div>
              <a href={MEETING_MAPS_URL} target="_blank" rel="noreferrer" className="inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-full bg-white px-4 text-[9px] font-black uppercase tracking-[0.15em] !text-black transition hover:scale-[1.02] active:scale-95">
                <MapPin size={13} />
                {t.openMap}
              </a>
            </div>
          </article>

          <article className="rounded-[30px] border border-white/10 bg-[#111111] p-5 sm:p-7">
            <div className="flex min-h-[300px] flex-col justify-between rounded-[24px] border border-white/10 bg-black px-5 py-8 sm:px-8">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[8px] font-black uppercase tracking-[0.22em] text-white/30">{t.route}</span>
                <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/20">17:30 → 18:00</span>
              </div>

              <div className="flex items-center gap-3 sm:gap-6">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                      <span className="meeting-pulse absolute inset-0 rounded-full border border-[#d7ff3f]/60" />
                      <span className="relative h-3 w-3 rounded-full bg-[#d7ff3f]" />
                    </span>
                    <span className="truncate text-[9px] font-black uppercase tracking-[0.14em]">EST ENTREE</span>
                  </div>
                  <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.16em] text-white/25">{t.meetingTime}</p>
                </div>

                <div className="relative flex-[1.2]">
                  <div className="h-[2px] w-full bg-white/10" />
                  <div className="route-progress absolute left-0 top-0 h-[2px] w-full scale-x-0 bg-[#d7ff3f]" />
                  <span className="route-runner absolute left-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.55)]" />
                </div>

                <div className="min-w-0 flex-1 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className="truncate text-[9px] font-black uppercase tracking-[0.14em]">CITY CLUB PARK</span>
                    <span className="h-3 w-3 shrink-0 rounded-full bg-white" />
                  </div>
                  <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.16em] text-white/25">{t.startTime}</p>
                </div>
              </div>

              <div className="flex justify-center">
                <span className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.18em] text-white/25">
                  <BusFront size={13} />
                  {t.transport}
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="ticket-reveal flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.28em] text-white/30">{t.start}</p>
              <p className="mt-4 text-[clamp(66px,10vw,112px)] font-black leading-[0.75] tracking-[-0.09em]">{t.startTime}</p>
              <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-white/45">{t.venue}</p>
            </div>
            <a href={VENUE_MAPS_URL} target="_blank" rel="noreferrer" className="inline-flex min-h-[52px] items-center gap-3 rounded-full border border-white/10 bg-black px-5 text-[9px] font-black uppercase tracking-[0.18em] transition hover:border-white/20 hover:bg-white hover:!text-black">
              {t.openMap}
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="ticket-reveal">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.28em] text-white/30">{t.included}</p>
              <h2 className="mt-4 text-[clamp(56px,9vw,94px)] font-black leading-[0.78] tracking-[-0.09em]">
                <span className="text-[#d7ff3f]">{t.ticket}</span>
              </h2>
            </div>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            <article className="group relative min-h-[230px] overflow-hidden rounded-[28px] border border-white/15 bg-[#171717] p-6 sm:p-7">
              <BusFront size={116} strokeWidth={1} className="pointer-events-none absolute -bottom-5 -right-2 text-white/[0.18] transition duration-500 group-hover:text-[#d7ff3f]/[0.22]" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black"><BusFront size={24} /></div>
                <p className="mt-8 text-[10px] font-black uppercase tracking-[0.22em] text-white/65">{t.transport}</p>
                <p className="mt-2 text-2xl font-black uppercase text-white">{t.includedWord}</p>
              </div>
            </article>

            <article className="group relative min-h-[230px] overflow-hidden rounded-[28px] border border-white/15 bg-[#171717] p-6 sm:p-7">
              <Popcorn size={116} strokeWidth={1} className="pointer-events-none absolute -bottom-5 -right-2 text-white/[0.18] transition duration-500 group-hover:text-[#d7ff3f]/[0.22]" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black"><Popcorn size={24} /></div>
                <p className="mt-8 text-[10px] font-black uppercase tracking-[0.22em] text-white/65">{t.snacks}</p>
                <p className="mt-2 text-2xl font-black uppercase text-white">{t.includedWord}</p>
              </div>
            </article>

            <article className="group relative min-h-[230px] overflow-hidden rounded-[28px] border border-white/15 bg-[#171717] p-6 sm:p-7">
              <CalendarDays size={116} strokeWidth={1} className="pointer-events-none absolute -bottom-5 -right-2 text-white/[0.18] transition duration-500 group-hover:text-[#d7ff3f]/[0.22]" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black"><CalendarDays size={24} /></div>
                <p className="mt-8 text-[10px] font-black uppercase tracking-[0.22em] text-white/65">{t.start}</p>
                <p className="mt-2 text-2xl font-black uppercase text-white">{t.startTime}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="ticket-reveal overflow-hidden rounded-[30px] border border-white/10 bg-[#101010]">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_0.75fr] lg:p-10">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.28em] text-white/30">{t.night}</p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black px-4 py-5">
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/30">{t.meeting}</p>
                  <p className="mt-2 text-xl font-black">17:30</p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/45">EST ENTREE</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black px-4 py-5">
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/30">{t.start}</p>
                  <p className="mt-2 text-xl font-black">18:00</p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/45">CITY CLUB PARK</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black px-4 py-5">
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/30">{t.ticket}</p>
                  <p className="mt-2 text-xl font-black uppercase">{t.transport}</p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#d7ff3f]">{t.includedWord}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black px-4 py-5">
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/30">{t.ticket}</p>
                  <p className="mt-2 text-xl font-black uppercase">{t.snacks}</p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#d7ff3f]">{t.includedWord}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-7 rounded-[24px] border border-white/10 bg-black p-6 sm:p-7">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black"><Clock3 size={20} /></div>
                <h2 className="mt-6 text-4xl font-black uppercase leading-[0.84] tracking-[-0.06em]">{t.ask}</h2>
                <p className="mt-4 text-sm text-white/40">{t.askText}</p>
              </div>

              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex min-h-[54px] items-center justify-between rounded-full bg-white px-5 text-[9px] font-black uppercase tracking-[0.18em] !text-black transition hover:scale-[1.01] active:scale-[0.99]">
                {t.whatsapp}
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 pb-8 text-[8px] font-bold uppercase tracking-[0.22em] text-white/20 sm:px-6">
        <a href="/" className="transition hover:text-white">{t.back}</a>
        <span>LEYLAA · OUJDA</span>
      </footer>
    </main>
  );
}
