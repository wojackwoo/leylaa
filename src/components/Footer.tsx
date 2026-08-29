"use client";

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M15.7 3c.3 1.9 1.4 3.2 3.3 3.5v3.1c-1.7-.1-3.2-.7-4.4-1.7v7.2c0 4-2.7 6.4-6 6.4-3.2 0-5.5-2.2-5.5-5.1 0-3.1 2.5-5.3 5.8-5.3.4 0 .8 0 1.2.1v3.2c-.4-.1-.8-.2-1.2-.2-1.4 0-2.5.9-2.5 2.2 0 1.2.9 2 2.2 2 1.5 0 2.8-1 2.8-3.3V3h4.3Z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M19.5 5.2A16.2 16.2 0 0 0 15.6 4l-.5 1a14.2 14.2 0 0 0-6.2 0l-.5-1a16.2 16.2 0 0 0-3.9 1.2C2.1 8.3 1.4 12 1.7 15.7a15.7 15.7 0 0 0 4.8 2.5l1.2-1.6c-.7-.3-1.3-.7-1.9-1.1l.5-.4c3.7 1.7 7.7 1.7 11.3 0l.5.4c-.6.4-1.2.8-1.9 1.1l1.2 1.6a15.7 15.7 0 0 0 4.8-2.5c.4-4.3-.7-8-2.7-10.5ZM8.8 14.2c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2Zm6.4 0c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2Z" />
    </svg>
  );
}

const socials = [
  {
    name: "Instagram",
    handle: "@this_leylaa",
    href: "https://www.instagram.com/this_leylaa?igsi=Ym9oMWI3NXY0c2J1&utm_source=qr",
    icon: <InstagramIcon />,
  },
  {
    name: "TikTok",
    handle: "@thisleylaa",
    href: "https://www.tiktok.com/@thisleylaa?_r=1&_t=ZS-99I2a4shSrp",
    icon: <TikTokIcon />,
  },
  {
    name: "Discord",
    handle: "Join the community",
    href: "https://discord.gg/c5E5JAAkr",
    icon: <DiscordIcon />,
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black px-5 pb-8 pt-16">
      {/* subtle glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 rounded-full bg-white/[0.035] blur-[100px]" />

      <div className="relative mx-auto max-w-[420px]">
        {/* Brand */}
        <div className="mb-12">
          <div className="text-[20vw] font-black leading-[0.75] tracking-[-0.11em]">
            LEYLAA
          </div>

          <div className="mt-5 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/40">
              Community · Events · Experiences
            </p>
          </div>
        </div>

        {/* Social title */}
        <div className="mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30">
            Stay connected
          </p>

          <p className="mt-2 text-sm leading-relaxed text-white/50">
            Follow the movement. See what&apos;s happening. Don&apos;t miss the
            next one.
          </p>
        </div>

        {/* Social cards */}
        <div className="flex flex-col gap-3">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="group relative flex min-h-[72px] items-center justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] px-5 transition-all duration-500 active:scale-[0.97]"
            >
              {/* hover background */}
              <span className="absolute inset-0 translate-y-full bg-white transition-transform duration-500 group-hover:translate-y-0" />

              <div className="relative z-10 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-all duration-500 group-hover:border-black/10 group-hover:bg-black group-hover:text-white">
                  {social.icon}
                </span>

                <div>
                  <p className="text-sm font-semibold text-white transition-colors duration-500 group-hover:text-black">
                    {social.name}
                  </p>

                  <p className="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-white/30 transition-colors duration-500 group-hover:text-black/50">
                    {social.handle}
                  </p>
                </div>
              </div>

              <span className="relative z-10 text-lg text-white/30 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-black">
                ↗
              </span>
            </a>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-[0.2em] text-white/20">
              © 2026 LEYLAA
            </span>

            <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/20">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/60" />
              You&apos;re early.
            </span>
          </div>

          <p className="mt-6 text-center text-[9px] uppercase tracking-[0.25em] text-white/10">
            Made for nights worth remembering.
          </p>
        </div>
      </div>
    </footer>
  );
}
