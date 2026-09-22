"use client";

import { ImageOff } from "lucide-react";
import { useState } from "react";

export default function EventPoster() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="flex aspect-[4/5] w-full items-center justify-center rounded-[28px] border border-white/10 bg-white/[0.025] p-8 text-center"
        role="img"
        aria-label="LEYLAA Movie Night event poster placeholder"
      >
        <div>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/30">
            <ImageOff size={22} />
          </div>
          <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">
            EVENT POSTER
          </p>
          <p className="mt-2 text-sm text-white/45">
            1080 × 1350 px
          </p>
          <p className="mt-2 max-w-xs text-[10px] leading-relaxed text-white/25">
            Add your final poster as /public/events/tuner-announcement.jpg
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src="/events/tuner-announcement.jpg"
      alt="LEYLAA Movie Night — Tuner (2025)"
      width={1080}
      height={1350}
      onError={() => setFailed(true)}
      className="block h-auto w-full rounded-[28px]"
    />
  );
}
