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
  MapPin,
  Popcorn,
  Sparkles,
} from "lucide-react";

const MAPS_URL = "https://maps.app.goo.gl/Z864USZF6ujwkBECA";

const details = [
  { label: "DATE", value: "02 OCT 2026", icon: CalendarDays },
  { label: "START", value: "17:30", icon: Clock3 },
  { label: "VENUE", value: "CITY CLUB PARK", icon: MapPin },
];

const included = [
  {
    title: "TRANSPORT",
    text: "Transport is included as part of the LEYLAA experience.",
    icon: BusFront,
    index: "01",
  },
  {
    title: "SNACKS",
    text: "Snacks are included. Just show up ready for the night.",
    icon: Popcorn,
    index: "02",
  },
  {
    title: "THE MOVIE",
    text: "Tuner (2025) on the big screen at City Club Park.",
    icon: Film,
    index: "03",
  },
];

export default function TunerGuestGuide() {
  const root = useRef<HTMLElement>(null);
  const heroTitle = useRef<HTMLHeadingElement>(null);
  const posterWrap = useRef<HTMLDivElement>(null);
  const posterImage = useRef<HTMLImageElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const [posterFailed, setPosterFailed] = useState(false);

  useEffect(() => {
    const node = root.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroTitle.current,
        { yPercent: 18, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power4.out",
          delay: 0.1,
        }
      );

      gsap.fromTo(
        ".guest-hero-kicker",
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      gsap.fromTo(
        ".guest-hero-meta > *",
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.35,
        }
      );

      gsap.fromTo(
        posterWrap.current,
        { y: 50, rotate: 1.8, opacity: 0 },
        {
          y: 0,
          rotate: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          delay: 0.2,
        }
      );

      if (posterImage.current) {
        gsap.to(posterImage.current, {
          yPercent: -7,
          ease: "none",
          scrollTrigger: {
            trigger: posterWrap.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      gsap.to(".guest-orbit", {
        rotate: 360,
        duration: 36,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".guest-grid-drift", {
        yPercent: -10,
        xPercent: 4,
        ease: "none",
        scrollTrigger: {
          trigger: node,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.utils.toArray<HTMLElement>(".guest-reveal").forEach((item) => {
        gsap.fromTo(
          item,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 86%",
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".guest-parallax-card").forEach((item, index) => {
        gsap.to(item, {
          yPercent: index % 2 === 0 ? -9 : 8,
          ease: "none",
          scrollTrigger: {
            trigger: item.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, node);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const poster = posterWrap.current;
    const image = posterImage.current;
    const ambient = glow.current;
    if (!poster || !image || !ambient) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const xTo = gsap.quickTo(image, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(image, "y", { duration: 0.45, ease: "power3.out" });
    const gxTo = gsap.quickTo(ambient, "x", { duration: 0.7, ease: "power3.out" });
    const gyTo = gsap.quickTo(ambient, "y", { duration: 0.7, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      const rect = poster.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      xTo(x * 12);
      yTo(y * 12);
      gxTo(x * -20);
      gyTo(y * -20);

      gsap.to(poster, {
        rotateX: y * -2.6,
        rotateY: x * 3,
        transformPerspective: 900,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
      gxTo(0);
      gyTo(0);

      gsap.to(poster, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    };

    poster.addEventListener("pointermove", onMove);
    poster.addEventListener("pointerleave", onLeave);

    return () => {
      poster.removeEventListener("pointermove", onMove);
      poster.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <main ref={root} className="min-h-screen overflow-x-clip bg-[#050505] text-white">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-60">
        <div className="guest-grid-drift absolute -inset-[12%] bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:70px_70px]" />
        <div
          ref={glow}
          className="absolute left-[62%] top-[16%] h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-white/[0.035] blur-[90px] sm:h-[420px] sm:w-[420px]"
        />
      </div>

      <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-4 pb-5 pt-5 sm:px-6 sm:pt-7">
        <a href="/" aria-label="LEYLAA home" className="group">
          <img src="/media/logo.svg" alt="LEYLAA" className="h-6 w-auto sm:h-7" />
        </a>

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 backdrop-blur-xl">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-white/50">
            MOVIE NIGHT · 02.10.26
          </span>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid min-h-[calc(100svh-72px)] w-full max-w-6xl items-center gap-10 px-4 pb-16 pt-4 sm:px-6 sm:pb-24 lg:grid-cols-[0.86fr_1.14fr] lg:gap-14 lg:pt-3">
        <div className="order-2 lg:order-1">
          <div className="guest-hero-kicker mb-7 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
              <Sparkles size={13} className="text-white/65" />
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/38">
              YOUR NIGHT GUIDE
            </span>
          </div>

          <h1
            ref={heroTitle}
            className="max-w-[9ch] text-[clamp(60px,13vw,150px)] font-black uppercase leading-[0.78] tracking-[-0.095em] sm:max-w-[7ch]"
          >
            MOVIE
            <br />
            <span className="text-white/22">NIGHT.</span>
          </h1>

          <p className="mt-7 max-w-md text-sm leading-relaxed text-white/52 sm:text-base">
            Tuner (2025) · one screen, one night, one LEYLAA experience.
          </p>

          <div className="guest-hero-meta mt-8 flex flex-wrap gap-2">
            {details.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="min-w-[118px] rounded-[18px] border border-white/10 bg-white/[0.025] px-4 py-3 backdrop-blur-xl sm:min-w-[132px]"
              >
                <div className="flex items-center gap-2 text-white/30">
                  <Icon size={13} />
                  <span className="text-[8px] font-bold uppercase tracking-[0.22em]">{label}</span>
                </div>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.05em] text-white/78">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <a
            href="#included"
            className="mt-7 inline-flex min-h-[52px] items-center gap-3 rounded-full bg-white px-5 text-[10px] font-black uppercase tracking-[0.17em] !text-black transition hover:scale-[1.02] active:scale-[0.98]"
          >
            EXPLORE THE NIGHT
            <ArrowDown size={15} />
          </a>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div
            ref={posterWrap}
            className="relative w-full max-w-[480px] [transform-style:preserve-3d]"
          >
            <div className="guest-orbit pointer-events-none absolute -inset-5 rounded-[42px] border border-dashed border-white/[0.07]" />
            <div className="pointer-events-none absolute -inset-2 rounded-[34px] bg-white/[0.02] blur-xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0a0a0a] shadow-2xl shadow-black">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/30 via-transparent to-white/[0.06]" />

              {posterFailed ? (
                <div className="flex aspect-[4/5] items-end p-6 sm:p-8">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/30">
                      LEYLAA MOVIE NIGHT
                    </p>
                    <p className="mt-3 text-4xl font-black uppercase leading-[0.86] tracking-[-0.06em] sm:text-5xl">
                      TUNER
                      <br />
                      (2025)
                    </p>
                    <p className="mt-4 text-[10px] uppercase tracking-[0.18em] text-white/30">
                      02 OCTOBER · 17:30 · OUJDA
                    </p>
                  </div>
                </div>
              ) : (
                <img
                  ref={posterImage}
                  src="/events/tuner-announcement.jpg"
                  alt="LEYLAA Movie Night — Tuner (2025)"
                  width={1080}
                  height={1350}
                  onError={() => setPosterFailed(true)}
                  className="block aspect-[4/5] h-auto w-full scale-[1.08] object-cover"
                />
              )}

              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between gap-4 sm:bottom-5 sm:left-5 sm:right-5">
                <div className="rounded-full border border-white/10 bg-black/55 px-3 py-2 backdrop-blur-xl">
                  <p className="text-[8px] font-bold uppercase tracking-[0.23em] text-white/55">
                    CITY CLUB PARK · OUJDA
                  </p>
                </div>
                <div className="hidden rounded-full border border-white/10 bg-black/55 px-3 py-2 backdrop-blur-xl sm:block">
                  <p className="text-[8px] font-bold uppercase tracking-[0.23em] text-white/45">
                    LEYLAA
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-3 -right-2 z-30 flex items-center gap-2 rounded-full border border-white/10 bg-[#0b0b0b]/90 px-3 py-2 shadow-xl backdrop-blur-xl sm:-bottom-4 sm:-right-3">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/55">
                EVENT DETAILS
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="included" className="relative z-10 mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="guest-reveal grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/30">
              THE EXPERIENCE · 01
            </p>
            <h2 className="mt-5 text-[clamp(54px,9vw,104px)] font-black uppercase leading-[0.8] tracking-[-0.085em]">
              WHAT&apos;S
              <br />
              <span className="text-white/22">INCLUDED.</span>
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-relaxed text-white/45 lg:justify-self-end lg:text-right">
            You&apos;re not coming just for a movie. Transport and snacks are already part of the LEYLAA experience.
          </p>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          {included.map(({ title, text, icon: Icon, index }, i) => (
            <article
              key={title}
              className="guest-reveal guest-parallax-card group relative min-h-[290px] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025] p-5 transition-colors duration-500 hover:bg-white/[0.05] sm:min-h-[340px] sm:p-7"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/[0.04] transition duration-700 group-hover:scale-125" />
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/45">
                  <Icon size={17} />
                </span>
                <span className="font-mono text-[9px] tracking-[0.18em] text-white/22">{index}</span>
              </div>

              <div className="absolute bottom-6 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
                <h3 className="text-2xl font-black uppercase tracking-[-0.045em]">{title}</h3>
                <p className="mt-3 max-w-xs text-[11px] leading-relaxed text-white/35">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 overflow-hidden border-y border-white/10 bg-white/[0.015]">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="guest-reveal">
            <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/30">
              MEETING POINT · 02
            </p>
            <h2 className="mt-5 text-[clamp(64px,11vw,126px)] font-black uppercase leading-[0.77] tracking-[-0.095em]">
              PORTE
              <br />
              <span className="text-white/22">DE L&apos;EST.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/48">
              Meet the group at Porte de l&apos;Est, Oujda. Transport is included from the meeting point as part of the night.
            </p>
          </div>

          <div className="guest-reveal">
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-black p-5 sm:p-7">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.09),transparent_48%)]" />
              <div className="relative min-h-[310px] overflow-hidden rounded-[24px] border border-white/10 bg-[#070707] sm:min-h-[380px]">
                <div className="guest-parallax-card absolute -inset-10 opacity-70">
                  <div className="absolute left-[9%] top-[15%] h-px w-[76%] rotate-[18deg] bg-white/[0.09]" />
                  <div className="absolute left-[-5%] top-[62%] h-px w-[110%] rotate-[-10deg] bg-white/[0.08]" />
                  <div className="absolute left-[34%] top-[-20%] h-[150%] w-px rotate-[21deg] bg-white/[0.08]" />
                  <div className="absolute right-[14%] top-[-20%] h-[160%] w-px rotate-[64deg] bg-white/[0.07]" />
                  <div className="absolute left-[18%] top-[28%] h-36 w-36 rounded-full border border-white/[0.06]" />
                  <div className="absolute right-[2%] bottom-[8%] h-56 w-56 rounded-full border border-white/[0.05]" />
                </div>

                <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-black/90 shadow-2xl shadow-black">
                    <span className="absolute h-32 w-32 rounded-full border border-white/10" />
                    <span className="absolute h-20 w-20 rounded-full border border-white/[0.06] animate-pulse" />
                    <span className="h-3.5 w-3.5 rounded-full bg-white shadow-[0_0_24px_rgba(255,255,255,0.65)]" />
                  </div>
                </div>

                <div className="absolute left-4 top-4 z-30 rounded-full border border-white/10 bg-black/70 px-3 py-2 backdrop-blur-xl sm:left-5 sm:top-5">
                  <p className="text-[8px] font-bold uppercase tracking-[0.24em] text-white/45">
                    OUJDA · DEPARTURE POINT
                  </p>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-30 sm:bottom-5 sm:left-5 sm:right-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">MEET HERE</p>
                      <p className="mt-1 text-xl font-black uppercase tracking-[-0.04em]">PORTE DE L&apos;EST</p>
                    </div>
                    <MapPin size={19} className="mb-1 text-white/45" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="guest-reveal grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/30">
              VENUE · 03
            </p>
            <h2 className="mt-5 text-6xl font-black uppercase leading-[0.8] tracking-[-0.08em] sm:text-8xl">
              CITY
              <br />
              CLUB
              <br />
              <span className="text-white/22">PARK.</span>
            </h2>
          </div>

          <div className="guest-reveal rounded-[30px] border border-white/10 bg-white/[0.025] p-5 sm:p-7">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/25">02 OCTOBER 2026</p>
                <p className="mt-2 text-4xl font-black tracking-[-0.06em]">17:30</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/30">START</p>
              </div>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[50px] items-center justify-center gap-3 rounded-full border border-white/10 bg-black px-5 text-[9px] font-black uppercase tracking-[0.18em] transition hover:bg-white hover:!text-black active:scale-[0.98]"
              >
                OPEN EXACT LOCATION
                <ArrowUpRight size={14} />
              </a>
            </div>

            <div className="mt-8 grid gap-2 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/45 p-4">
                <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-white/25">CITY</p>
                <p className="mt-2 text-sm font-bold uppercase">OUJDA</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/45 p-4">
                <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-white/25">VENUE</p>
                <p className="mt-2 text-sm font-bold uppercase">CITY CLUB PARK</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/45 p-4">
                <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-white/25">FORMAT</p>
                <p className="mt-2 text-sm font-bold uppercase">BIG SCREEN</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 sm:pb-14">
        <div className="guest-reveal overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.03]">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:p-10">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/30">
                LAST THING
              </p>
              <h2 className="mt-5 max-w-xl text-5xl font-black uppercase leading-[0.82] tracking-[-0.07em] sm:text-7xl">
                SHOW UP.
                <br />
                <span className="text-white/22">WE&apos;LL DO THE REST.</span>
              </h2>
            </div>

            <div className="flex flex-col justify-between gap-7">
              <div className="space-y-3">
                {["Transport included", "Snacks included", "Tuner (2025) · City Club Park", "Meet at Porte de l'Est"].map(
                  (line) => (
                    <div key={line} className="flex items-center gap-3 text-sm text-white/55">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black">
                        <Check size={12} />
                      </span>
                      {line}
                    </div>
                  )
                )}
              </div>

              <a
                href="/"
                className="inline-flex min-h-[52px] w-full items-center justify-between rounded-full bg-white px-5 text-[9px] font-black uppercase tracking-[0.18em] !text-black transition hover:scale-[1.01] active:scale-[0.99]"
              >
                BACK TO LEYLAA
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 pb-8 pt-4 text-[8px] uppercase tracking-[0.22em] text-white/20 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <span>LEYLAA · OUJDA · MOROCCO</span>
        <span>EVENT DETAILS</span>
      </footer>
    </main>
  );
}
