"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Check, Loader2, X } from "lucide-react";

export default function ReservationForm() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ fullName: "", phone: "" });

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!form.fullName.trim() || !form.phone.trim()) {
      setState("error");
      setMessage("Please enter your name and WhatsApp number.");
      return;
    }
    setState("loading");
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Reservation failed.");
      setState("success");
      setMessage("Reservation received. We’ll send you a WhatsApp message ASAP to arrange payment and confirm your reservation.");
      setForm({ fullName: "", phone: "" });
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  const handleName = (value: string) =>
    value
      .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ' -]/g, "")
      .replace(/\s{2,}/g, " ")
      .slice(0, 80);

  const handlePhone = (value: string) =>
    value
      .replace(/\D/g, "")
      .slice(0, 10);

  return (
    <>
      <section className="mt-10 border-t border-white/10 pt-12">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">RESERVATION · 02</p>
            <h2 className="mt-5 text-6xl font-black uppercase leading-[0.8] tracking-[-0.08em] sm:text-8xl">
              Save<br />your<br /><span className="text-white/25">spot.</span>
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/45">
              Leave your details. No online payment here. We’ll send you a WhatsApp message ASAP to arrange payment and confirm your reservation.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5 sm:p-7">
            {state === "success" ? (
              <div className="py-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-[0_0_50px_rgba(255,255,255,0.08)]">
                  <Check size={28} strokeWidth={2.5} />
                </div>
                <p className="mt-7 text-[9px] font-bold uppercase tracking-[0.32em] text-white/30">RESERVATION RECEIVED</p>
                <h3 className="mt-3 text-4xl font-black uppercase leading-none tracking-[-0.06em]">
                  You’re on
                  <br />
                  the list.
                </h3>
                <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-white/50">
                  We’ll send you a WhatsApp message ASAP to arrange payment and confirm your spot.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setState("idle");
                    setMessage("");
                  }}
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.15em] transition hover:bg-white hover:text-black"
                >
                  MAKE ANOTHER RESERVATION
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-white/35">FULL NAME</span>
                  <input
                    required
                    maxLength={80}
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: handleName(e.target.value) })}
                    placeholder="Your name"
                    autoComplete="name"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-white outline-none placeholder:text-white/20 focus:border-white/30"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-white/35">WHATSAPP NUMBER</span>
                  <input
                    required
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: handlePhone(e.target.value) })}
                    placeholder="06XXXXXXXX"
                    autoComplete="tel"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-white outline-none placeholder:text-white/20 focus:border-white/30"
                  />
                  <span className="mt-2 block text-[9px] uppercase tracking-[0.14em] text-white/20">10 digits · digits only</span>
                </label>

                <button
                  disabled={state === "loading"}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-bold !text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {state === "loading" ? (
                    <>
                      SAVING
                      <Loader2 size={17} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      RESERVE MY SPOT
                      <ArrowUpRight size={18} />
                    </>
                  )}
                </button>

                {message && <p role="alert" className="text-sm text-white/45">{message}</p>}
              </form>
            )}
          </div>
        </div>
      </section>

      {state === "success" && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center bg-black/65 p-4 backdrop-blur-sm sm:items-center" role="dialog" aria-modal="true" aria-label="Reservation confirmed">
          <div className="w-full max-w-md rounded-[30px] border border-white/10 bg-[#080808] p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.32em] text-white/30">LEYLAA · MOVIE NIGHT</p>
                <h3 className="mt-3 text-4xl font-black uppercase leading-none tracking-[-0.06em]">Reservation<br />received.</h3>
              </div>
              <button type="button" onClick={() => setState("idle")} className="rounded-full border border-white/10 p-2 text-white/40 transition hover:text-white" aria-label="Close confirmation">
                <X size={17} />
              </button>
            </div>
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-sm leading-relaxed text-white/60">{message}</p>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 text-[9px] uppercase tracking-[0.18em] text-white/30">
                KEEP YOUR PHONE CLOSE · WE’LL REACH YOU ON WHATSAPP
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
