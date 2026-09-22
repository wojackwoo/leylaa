"use client";

import { CalendarPlus, ChevronDown, Smartphone } from "lucide-react";
import { useState } from "react";

const googleCalendarUrl =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=LEYLAA%20Movie%20Night%20%E2%80%94%20Tuner%20(2025)" +
  "&dates=20261002T163000Z/20261002T181900Z" +
  "&location=City%20Club%20Park%2C%20Oujda%2C%20Morocco" +
  "&details=LEYLAA%20Movie%20Night%20%7C%20Tuner%20(2025)%0A02%20October%202026%20%E2%80%A2%2017%3A30%0ACity%20Club%20Park%20%E2%80%A2%20Oujda";

export default function CalendarActions() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="group flex min-h-[62px] w-full items-center justify-between rounded-full border border-white/10 bg-white/[0.035] px-5 text-left transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] active:scale-[0.99]"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black">
            <CalendarPlus size={16} />
          </span>
          <span>
            <span className="block text-sm font-semibold">SAVE EVENT</span>
            <span className="mt-0.5 block text-[9px] uppercase tracking-[0.2em] text-white/30">
              iPhone · Android · Google
            </span>
          </span>
        </span>
        <ChevronDown size={17} className={open ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>

      {open && (
        <div className="absolute bottom-[calc(100%+10px)] left-0 right-0 z-30 rounded-[24px] border border-white/10 bg-black/95 p-2 shadow-2xl backdrop-blur-xl">
          <a
            href="/events/tuner/calendar.ics"
            className="flex min-h-[54px] items-center gap-3 rounded-2xl px-4 transition hover:bg-white/[0.06]"
          >
            <Smartphone size={17} className="text-white/45" />
            <span>
              <span className="block text-sm font-semibold">iPhone / Apple Calendar</span>
              <span className="text-[9px] uppercase tracking-[0.18em] text-white/25">Open calendar file</span>
            </span>
          </a>

          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-[54px] items-center gap-3 rounded-2xl px-4 transition hover:bg-white/[0.06]"
          >
            <CalendarPlus size={17} className="text-white/45" />
            <span>
              <span className="block text-sm font-semibold">Android / Google Calendar</span>
              <span className="text-[9px] uppercase tracking-[0.18em] text-white/25">Add with one tap</span>
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
