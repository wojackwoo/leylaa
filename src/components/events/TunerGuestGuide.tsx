"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowUpRight,
  BusFront,
  CalendarDays,
  Check,
  Clock3,
  Film,
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
    heroTitle: "YOU'RE IN.",
    heroSub: "LEYLAA MOVIE NIGHT · TUNER (2025)",
    date: "02 OCTOBER 2026",
    poster: "EVENT POSTER",
    meeting: "MEETING POINT",
    meetingPlace: "L'ENTRÉE PRINCIPALE DE L'EST",
    meetTime: "17:30",
    meetLabel: "MEET HERE",
    event: "EVENT START",
    eventTime: "18:00",
    venue: "CITY CLUB PARK",
    openMap: "OPEN MAP",
    route: "MEET → MOVE → MOVIE",
    included: "INCLUDED IN YOUR TICKET",
    ticket: "TICKET",
    transport: "TRANSPORT",
    snacks: "SNACKS",
    includedValue: "INCLUDED",
    brief: "YOUR NIGHT",
    ask: "HAVE A QUESTION?",
    askSub: "Message LEYLAA on WhatsApp.",
    whatsapp: "ASK ON WHATSAPP",
    back: "BACK TO LEYLAA",
  },
  fr: {
    welcome: "BIENVENUE",
    heroTitle: "C'EST BON.",
    heroSub: "LEYLAA MOVIE NIGHT · TUNER (2025)",
    date: "02 OCTOBRE 2026",
    poster: "AFFICHE",
    meeting: "POINT DE RENDEZ-VOUS",
    meetingPlace: "L'ENTRÉE PRINCIPALE DE L'EST",
    meetTime: "17:30",
    meetLabel: "RENDEZ-VOUS",
    event: "DÉBUT DE L'ÉVÉNEMENT",
    eventTime: "18:00",
    venue: "CITY CLUB PARK",
    openMap: "OUVRIR LA CARTE",
    route: "RENDEZ-VOUS → TRANSPORT → FILM",
    included: "COMPRIS DANS VOTRE BILLET",
    ticket: "BILLET",
    transport: "TRANSPORT",
    snacks: "SNACKS",
    includedValue: "COMPRIS",
    brief: "VOTRE SOIRÉE",
    ask: "UNE QUESTION ?",
    askSub: "Écrivez à LEYLAA sur WhatsApp.",
    whatsapp: "QUESTION SUR WHATSAPP",
    back: "RETOUR À LEYLAA",
  },
  ar: {
    welcome: "أهلاً بك",
    heroTitle: "أنت معنا.",
    heroSub: "LEYLAA MOVIE NIGHT · TUNER (2025)",
    date: "02 أكتوبر 2026",
    poster: "ملصق الفعالية",
    meeting: "نقطة اللقاء",
    meetingPlace: "L'ENTRÉE PRINCIPALE DE L'EST",
    meetTime: "17:30",
    meetLabel: "اللقاء",
    event: "بداية الفعالية",
    eventTime: "18:00",
    venue: "CITY CLUB PARK",
    openMap: "افتح الخريطة",
    route: "اللقاء ← النقل ← الفيلم",
    included: "مشمول في التذكرة",
    ticket: "التذكرة",
    transport: "النقل",
    snacks: "الوجبات",
    includedValue: "مشمول",
    brief: "ليلتك",
    ask: "لديك سؤال؟",
    askSub: "راسل LEYLAA على واتساب.",
    whatsapp: "اسأل على واتساب",
    back: "العودة إلى LEYLAA",
  },
} as const;

export default function TunerGuestGuide() {
  const root = useRef<HTMLElement>(null);
  const hero = useRef<HTMLDivElement>(null);
  const poster = useRef<HTMLDivElement>(null);
  const mapCard = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState<Language>("en");
  const [posterFailed, setPosterFailed] = useState(false);

  const t = copy[language];
  const rtl = language === "ar";

  useEffect(() => {
    const node = root.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        hero.current,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
      );

      gsap.fromTo(
        poster.current,
        { y: 50, rotate: 1.5, opacity: 0 },
        {
          y: 0,
          rotate: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power4.out",
          delay: 0.15,
        }
      );

      gsap.utils.toArray<HTMLElement>(".brief-reveal").forEach((item) => {
        gsap.fromTo(
          item,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
          }
        );
      });

      gsap.to(".route-line", {
        backgroundPositionX: "120px",
        duration: 1.4,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".route-dot", {
        xPercent: 100,
        duration: 2.4,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".map-pulse", {
        scale: 1.18,
        opacity: 0.12,
        duration: 1.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".ambient-orbit", {
        rotate: 360,
        duration: 30,
        ease: "none",
        repeat: -1,
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,255,255,0.055),transparent_30%)]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 sm:py-7">
        <a href="/" aria-label="LEYLAA home">
          <img src="/media/logo.svg" alt="LEYLAA" className="h-6 w-auto sm:h-7" />
        </a>

        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-xl">
          <Languages size={13} className="mx-1 text-white/35" aria-hidden="true" />
          {(["en", "fr", "ar"] as Language[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setLanguage(item)}
              aria-pressed={language === item}
              className={`min-h-8 min-w-8 rounded-full px-2 text-[8px] font-black uppercase tracking-[0.12em] transition ${language === item ? "bg-white text-black" : "text-white/35 hover:text-white"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6 sm:pb-20 sm:pt-16">
        <div ref={hero} className="max-w-4xl">
          <div className="mb-6 flex items-center gap-3 text-white/35">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[#d7ff3f]">
              <Sparkles size={13} />
            </span>
            <span className="text-[9px] font-black uppercase tracking-[0.28em]">{t.welcome}</span>
          </div>

          <h1 className="text-[clamp(68px,15vw,170px)] font-black uppercase leading-[0.76] tracking-[-0.1em]">
            {t.heroTitle}
          </h1>

          <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45"><span className="h-1.5 w-1.5 rounded-full bg-[#d7ff3f]" aria-hidden="true" />{t.heroSub}</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25">{t.date}</p>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-4xl px-4 pb-20 sm:px-6 sm:pb-28">
        <div ref={poster} className="relative mx-auto max-w-[700px]">
          <div className="ambient-orbit pointer-events-none absolute -inset-4 rounded-[34px] border border-dashed border-white/[0.07]" />
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#080808] shadow-2xl shadow-black sm:rounded-[34px]">
            {posterFailed ? (
              <div className="flex aspect-[4/5] items-center justify-center">
                <div className="text-center">
                  <Film className="mx-auto text-white/20" size={42} strokeWidth={1.1} />
                  <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.28em] text-white/25">{t.poster}</p>
                </div>
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
        <div className="brief-reveal grid gap-3 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.025] p-6 sm:p-8">
            <div className="flex items-center gap-3 text-white/30">
              <CalendarDays size={15} />
              <span className="text-[9px] font-black uppercase tracking-[0.25em]">{t.meeting}</span>
            </div>
            <p className="mt-7 text-[clamp(28px,5vw,52px)] font-black uppercase leading-[0.85] tracking-[-0.06em]">
              {t.meetingPlace}
            </p>
            <div className="mt-7 flex items-end justify-between gap-4">
              <div>
                <p className="text-5xl font-black tracking-[-0.07em] sm:text-6xl">{t.meetTime}</p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">{t.meetLabel}</p>
              </div>
              <a
                href={MEETING_MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[50px] items-center gap-2 rounded-full bg-white px-4 text-[9px] font-black uppercase tracking-[0.16em] !text-black transition hover:scale-[1.02] active:scale-95"
              >
                <MapPin size={14} />
                {t.openMap}
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#070707] p-5 sm:p-8">
            <div className="relative h-full min-h-[290px] overflow-hidden rounded-[22px] border border-white/10 bg-black">
              <div className="absolute inset-0 opacity-50">
                <div className="absolute left-[8%] top-[25%] h-px w-[78%] rotate-[11deg] bg-white/[0.10]" />
                <div className="absolute left-[3%] top-[72%] h-px w-[95%] rotate-[-8deg] bg-white/[0.07]" />
                <div className="absolute left-[38%] top-[-10%] h-[120%] w-px rotate-[24deg] bg-white/[0.07]" />
                <div className="absolute right-[18%] top-[-10%] h-[125%] w-px rotate-[63deg] bg-white/[0.065]" />
              </div>

              <div className="map-pulse absolute left-[17%] top-[32%] h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d7ff3f]/50" />
              <div className="absolute left-[17%] top-[32%] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d7ff3f] shadow-[0_0_22px_rgba(215,255,63,0.55)]" />

              <div className="absolute right-[17%] top-[68%] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_22px_rgba(255,255,255,0.7)]" />

              <div
                ref={mapCard}
                className="route-line absolute left-[17%] top-[32%] h-[2px] w-[65%] -rotate-[22deg] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.65)_0_10px,transparent_10px_18px)] bg-[length:36px_2px]"
              />

              <div className="route-dot absolute left-[22%] top-[36%] h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_16px_rgba(255,255,255,0.6)]" />

              <div className="absolute left-4 top-4 right-4 flex items-center justify-between gap-3">
                <span className="rounded-full border border-white/10 bg-black/75 px-3 py-2 text-[8px] font-black uppercase tracking-[0.22em] text-white/45 backdrop-blur-xl">
                  {t.route}
                </span>
                <MapPin size={15} className="text-white/35" />
              </div>

              <div className="absolute bottom-5 left-5">
                <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-white/25">{t.meeting}</p>
                <p className="mt-1 text-[11px] font-black uppercase">EST ENTREE</p>
              </div>

              <div className="absolute bottom-5 right-5 text-right">
                <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-white/25">{t.event}</p>
                <p className="mt-1 text-[11px] font-black uppercase">CITY CLUB PARK</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="brief-reveal">
            <p className="text-[9px] font-black uppercase tracking-[0.28em] text-white/30">{t.event}</p>
            <div className="mt-5 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[clamp(58px,10vw,110px)] font-black leading-[0.78] tracking-[-0.09em]">
                  {t.eventTime}
                </p>
                <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-white/45">{t.venue}</p>
              </div>

              <a
                href={VENUE_MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[52px] items-center gap-3 rounded-full border border-white/10 bg-black px-5 text-[9px] font-black uppercase tracking-[0.18em] transition hover:bg-white hover:!text-black"
              >
                {t.openMap}
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="brief-reveal flex items-end justify-between gap-6">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.28em] text-white/30">{t.included}</p>
            <h2 className="mt-5 text-[clamp(48px,8vw,92px)] font-black uppercase leading-[0.8] tracking-[-0.08em]">
              80 <span className="text-white/25">DH</span>
            </h2>
          </div>
          <span className="hidden text-[9px] font-bold uppercase tracking-[0.2em] text-white/25 sm:block">
            TICKET · ONE NIGHT
          </span>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {[
            { title: t.ticket, value: "80 DH", icon: CalendarDays },
            { title: t.transport, value: t.includedValue, icon: BusFront },
            { title: t.snacks, value: t.includedValue, icon: Popcorn },
          ].map(({ title, value, icon: Icon }) => (
            <article
              key={title}
              className="brief-reveal group relative min-h-[220px] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025] p-6 sm:min-h-[250px] sm:p-7"
            >
              <Icon
                size={118}
                strokeWidth={1}
                className="pointer-events-none absolute -bottom-5 -right-2 text-white/[0.09] transition duration-700 group-hover:scale-105 group-hover:text-white/[0.13]"
                aria-hidden="true"
              />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black">
                  <Icon size={21} />
                </div>
                <p className="mt-7 text-[9px] font-black uppercase tracking-[0.24em] text-white/30">{title}</p>
                <p className="mt-2 text-2xl font-black uppercase tracking-[-0.04em]">{value}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="brief-reveal overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03]">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_0.8fr] lg:p-10">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.28em] text-white/30">{t.brief}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  [t.meetTime, t.meetingPlace],
                  [t.eventTime, t.venue],
                  ["80 DH", t.transport],
                  ["80 DH", t.snacks],
                ].map(([time, label]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-black p-4">
                    <p className="text-lg font-black tracking-[-0.04em]">{time}</p>
                    <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white/30">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between gap-8 rounded-[24px] border border-white/10 bg-black p-6 sm:p-7">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
                  <Clock3 size={20} />
                </div>
                <h2 className="mt-6 text-4xl font-black uppercase leading-[0.84] tracking-[-0.06em]">
                  {t.ask}
                </h2>
                <p className="mt-4 text-sm text-white/40">{t.askSub}</p>
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[54px] items-center justify-between rounded-full bg-white px-5 text-[9px] font-black uppercase tracking-[0.18em] !text-black transition hover:scale-[1.01] active:scale-[0.99]"
              >
                {t.whatsapp}
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 pb-8 text-[8px] font-bold uppercase tracking-[0.22em] text-white/20 sm:px-6">
        <a href="/" className="transition hover:text-white">
          {t.back}
        </a>
        <span>LEYLAA · OUJDA</span>
      </footer>
    </main>
  );
}
