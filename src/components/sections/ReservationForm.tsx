"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";

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
      setMessage("Reservation received. We’ll contact you on WhatsApp for payment and confirmation.");
      setForm({ fullName: "", phone: "" });
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <section className="mt-10 border-t border-white/10 pt-12">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">RESERVATION · 02</p>
          <h2 className="mt-5 text-6xl font-black uppercase leading-[0.8] tracking-[-0.08em] sm:text-8xl">Save<br />your<br /><span className="text-white/25">spot.</span></h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/45">No online payment. Leave your details and our team will reach you on WhatsApp to arrange payment and confirm your reservation.</p>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5 sm:p-7">
          {state === "success" ? (
            <div className="py-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black"><Check size={21} /></div>
              <h3 className="mt-7 text-4xl font-black uppercase leading-none tracking-[-0.06em]">You’re on<br />the list.</h3>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">{message}</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <label className="block"><span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-white/35">FULL NAME</span><input required maxLength={80} value={form.fullName} onChange={(e)=>setForm({...form,fullName:e.target.value})} placeholder="Your name" className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-white outline-none placeholder:text-white/20 focus:border-white/30" /></label>
              <label className="block"><span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-white/35">WHATSAPP NUMBER</span><input required type="tel" inputMode="tel" maxLength={20} value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} placeholder="06 XX XX XX XX" className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-white outline-none placeholder:text-white/20 focus:border-white/30" /></label>
              <button disabled={state==="loading"} className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-bold !text-black transition hover:scale-[1.01] disabled:opacity-50">{state==="loading" ? <>SAVING <Loader2 size={17} className="animate-spin" /></> : <>RESERVE MY SPOT <ArrowUpRight size={18} /></>}</button>
              {message && <p role="alert" className="text-sm text-white/45">{message}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
