"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-[100] px-4 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "rounded-full border border-white/10 bg-black/75 px-4 py-2.5 backdrop-blur-xl"
            : "px-1"
        }`}
      >
        <a
          href="#"
          className="text-xl font-black tracking-[-0.09em] text-white"
        >
          LEYLAA
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white"
          aria-label="Open menu"
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {open && (
        <div className="absolute left-4 right-4 top-[68px] overflow-hidden rounded-[28px] border border-white/10 bg-black/95 p-6 shadow-2xl backdrop-blur-xl">
          <nav className="flex flex-col">
            <a
              href="#about"
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-5 text-2xl font-semibold"
            >
              What is LEYLAA?
            </a>

            <a
              href="#experiences"
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-5 text-2xl font-semibold"
            >
              What we do
            </a>

            <a
              href="#community"
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-5 text-2xl font-semibold"
            >
              Community
            </a>

            <a
              href="https://discord.gg/c5E5JAAkr"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-6 rounded-full bg-white px-6 py-4 text-center font-bold !text-black"
            >
              JOIN THE CLUB
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}