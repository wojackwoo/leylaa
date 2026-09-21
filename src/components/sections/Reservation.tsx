"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function Reservation() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ fullName: "", phone: "" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.fullName.trim() || !form.phone.trim()) {
      setState("error");
      setMessage("Please enter your name and WhatsApp number.");
      return;
    }

    setState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          phone: form.phone.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setState("success");
      setMessage(
        "You're on the list. We'll contact you on WhatsApp shortly to confirm payment and your spot."
      );
      setForm({ fullName: "", phone: "" });
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "We couldn't save your reservation. Please try again."
      );
    }
  }

  return (
    <section
      id="reserve"
      className="relative overflow-hidden border-t border-white/10 bg-white text-black"
    >
      <div className="mx-auto max-w-[920px] px-5 py-24 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.35em] text-black/40">
              02 — RESERVATION
            </p>

            <h2 className="text-[18vw] font-black uppercase leading-[0.78] tracking-[-0.1em] sm:text-[11vw]">
              SAVE
              <br />
              YOUR
              <br />
              <span className="text-black/25">SPOT.</span>
            </h2>

            <p className="mt-8 max-w-[340px] text-base leading-relaxed text-black/60">
              Put your name down. No online payment here.
              <br />
              We&apos;ll reach you on WhatsApp and take care of the rest.
            </p>
          </div>

          <div className="rounded-[30px] border border-black/10 bg-black/[0.035] p-5 sm:p-7">
            {state === "success" ? (
              <div className="flex min-h-[310px] flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                    <Check size={22} />
                  </div>

                  <p className="mt-8 text-3xl font-black uppercase leading-none tracking-[-0.05em]">
                    You&apos;re in
                    <br />
                    the list.
                  </p>

                  <p className="mt-5 max-w-[360px] text-sm leading-relaxed text-black/60">
                    {message}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setState("idle");
                    setMessage("");
                  }}
                  className="mt-10 inline-flex items-center gap-3 rounded-full border border-black/15 px-5 py-3 text-sm font-semibold transition-all duration-300 hover:bg-black hover:text-white"
                >
                  MAKE ANOTHER RESERVATION
                  <ArrowUpRight size={17} />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-black/45"
                  >
                    FULL NAME
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    maxLength={80}
                    value={form.fullName}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        fullName: event.target.value,
                      }))
                    }
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-4 text-base outline-none transition-all placeholder:text-black/25 focus:border-black/40"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-black/45"
                  >
                    WHATSAPP NUMBER
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={20}
                    value={form.phone}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        phone: event.target.value,
                      }))
                    }
                    placeholder="06 XX XX XX XX"
                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-4 text-base outline-none transition-all placeholder:text-black/25 focus:border-black/40"
                  />
                </div>

                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-black px-6 py-4 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {state === "submitting" ? (
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

                {message && (
                  <p className="text-sm leading-relaxed text-black/60" role="alert">
                    {message}
                  </p>
                )}

                <p className="text-[9px] uppercase tracking-[0.2em] text-black/35">
                  By reserving, you&apos;re asking LEYLAA to contact you on WhatsApp about this event.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
