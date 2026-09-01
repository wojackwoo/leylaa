"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type Option = { id: number; poll_id: number; label: string; emoji: string | null; image_url: string | null; next_poll_id: number | null; sort_order: number };
type Poll = { id: number; title: string; description: string | null };
type Step = "start" | "movie" | "time" | "contact" | "done";

const posters: Record<string, string> = {
  Inception: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
  Interstellar: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  "The Dark Knight": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
};

function getSessionId() {
  const key = "leylaa-poll-session";
  const saved = localStorage.getItem(key);
  if (saved) return saved;
  const id = crypto.randomUUID();
  localStorage.setItem(key, id);
  return id;
}

export default function PollsPage() {
  const [step, setStep] = useState<Step>("start");
  const [options, setOptions] = useState<Option[]>([]);
  const [polls, setPolls] = useState<Record<number, Poll>>({});
  const [movie, setMovie] = useState<Option | null>(null);
  const [time, setTime] = useState<Option | null>(null);
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      supabase.from("polls").select("id,title,description"),
      supabase.from("poll_options").select("id,poll_id,label,emoji,image_url,next_poll_id,sort_order").order("sort_order"),
    ]).then(([p, o]) => {
      if (p.error || o.error) setError("We couldn't load the poll. Please try again.");
      const map: Record<number, Poll> = {};
      (p.data ?? []).forEach((x) => { map[x.id] = x as Poll; });
      setPolls(map);
      setOptions((o.data ?? []) as Option[]);
      setLoading(false);
    });
  }, []);

  const movies = useMemo(() => options.filter((o) => o.poll_id === 2), [options]);
  const times = useMemo(() => options.filter((o) => o.poll_id === 3), [options]);

  async function saveVote(option: Option) {
    const { error } = await supabase.from("votes").insert({ poll_id: option.poll_id, option_id: option.id, session_id: getSessionId() });
    if (error) throw error;
  }

  async function chooseCinema() {
    const option = options.find((o) => o.poll_id === 1 && o.label.toLowerCase() === "cinema");
    if (!option) return setError("Cinema is not available right now.");
    try { await saveVote(option); setStep("movie"); } catch { setError("We couldn't save your choice. Please try again."); }
  }

  async function chooseMovie(option: Option) {
    try { await saveVote(option); setMovie(option); setStep("time"); } catch { setError("We couldn't save your movie choice. Please try again."); }
  }

  async function chooseTime(option: Option) {
    try { await saveVote(option); setTime(option); setStep("contact"); } catch { setError("We couldn't save your time choice. Please try again."); }
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (whatsapp.trim().length < 6) return setError("Please enter a valid WhatsApp number.");
    setLoading(true);
    const { error } = await supabase.from("contacts").upsert({ session_id: getSessionId(), whatsapp: whatsapp.trim() }, { onConflict: "session_id" });
    setLoading(false);
    if (error) return setError("We couldn't save your number. Please try again.");
    setStep("done");
  }

  const poll = step === "movie" ? polls[2] : step === "time" ? polls[3] : null;
  const currentOptions = step === "movie" ? movies : times;

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#171717]">
      <section className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-16">
        <div className="w-full max-w-3xl">
          {step === "start" && <div className="text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-black/50">Leylaa</p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">What should we do next?</h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-black/60 sm:text-lg">Help us choose the next Leylaa experience. Your choice can shape what happens next.</p>
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              <button onClick={chooseCinema} disabled={loading} className="group rounded-3xl border border-black/10 bg-white p-8 text-left transition duration-300 hover:-translate-y-1 hover:shadow-xl disabled:opacity-60"><div className="mb-8 text-6xl">🎬</div><h2 className="text-3xl font-semibold">Cinema</h2><p className="mt-3 leading-6 text-black/55">Pick a movie, choose when you'd like to go, and we'll keep you updated.</p><div className="mt-8 text-sm font-medium">Choose Cinema →</div></button>
              <button disabled className="cursor-not-allowed rounded-3xl border border-black/10 bg-white p-8 text-left opacity-60"><div className="mb-8 text-6xl">🎉</div><h2 className="text-3xl font-semibold">Party</h2><p className="mt-3 leading-6 text-black/55">Party is coming next. We're preparing your experience.</p><div className="mt-8 text-sm font-medium">Coming next →</div></button>
            </div>
          </div>}

          {(step === "movie" || step === "time") && <div>
            <div className="mb-12 text-center"><div className="mb-6 text-6xl">🎬</div><p className="text-sm uppercase tracking-[0.3em] text-black/50">Cinema</p><h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{poll?.title ?? (step === "movie" ? "What movie would you love to watch?" : "When would you like to go?")}</h1>{poll?.description && <p className="mx-auto mt-5 max-w-xl text-black/60">{poll.description}</p>}</div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {currentOptions.map((option) => {
                const image = option.image_url ?? (step === "movie" ? posters[option.label] : null);
                return <button key={option.id} disabled={loading} onClick={() => step === "movie" ? chooseMovie(option) : chooseTime(option)} className="group overflow-hidden rounded-3xl border border-black/10 bg-white text-left transition duration-300 hover:-translate-y-1 hover:shadow-xl disabled:opacity-60">
                  {image ? <div className="aspect-[2/3] overflow-hidden"><img src={image} alt={option.label} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div> : <div className="flex aspect-[2/3] items-center justify-center bg-[#eee9e1] text-6xl">{option.emoji ?? "🎬"}</div>}
                  <div className="p-5"><h2 className="text-xl font-semibold">{option.label}</h2><p className="mt-2 text-sm text-black/45">Choose this →</p></div>
                </button>;
              })}
            </div>
            <div className="mt-10 text-center"><button onClick={() => setStep(step === "movie" ? "start" : "movie")} className="rounded-full border border-black/15 px-6 py-3 text-sm font-medium transition hover:bg-black hover:text-white">← Go back</button></div>
          </div>}

          {step === "contact" && <div className="text-center">
            <div className="mb-6 text-6xl">📲</div><p className="text-sm uppercase tracking-[0.3em] text-black/50">Almost there</p><h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Want to hear from us first?</h1>
            <p className="mx-auto mt-5 max-w-xl text-black/60">Leave your WhatsApp number and we'll send you the details and booking time before the tickets are gone.</p>
            <div className="mx-auto mt-8 max-w-md rounded-3xl border border-black/10 bg-white p-6 text-left"><p className="text-sm text-black/50">Your movie</p><p className="mt-1 font-medium">{movie?.label}</p><p className="mt-4 text-sm text-black/50">Preferred time</p><p className="mt-1 font-medium">{time?.label}</p></div>
            <form onSubmit={submit} className="mx-auto mt-6 max-w-md"><input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="WhatsApp number" autoComplete="tel" className="w-full rounded-full border border-black/10 bg-white px-6 py-4 outline-none placeholder:text-black/35 focus:border-black/30"/><button disabled={loading} className="mt-3 w-full rounded-full bg-black px-6 py-4 text-sm font-medium text-white disabled:opacity-60">{loading ? "Saving..." : "Keep me updated →"}</button></form>
            <button onClick={() => setStep("time")} className="mt-6 text-sm text-black/50 underline-offset-4 hover:underline">← Go back</button>
          </div>}

          {step === "done" && <div className="text-center"><div className="mb-6 text-6xl">✨</div><p className="text-sm uppercase tracking-[0.3em] text-black/50">You're in</p><h1 className="mt-4 text-4xl font-semibold sm:text-5xl">We'll see you at the movies.</h1><p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-black/60">We'll contact you on WhatsApp with the details and booking time before the tickets are gone.</p><button onClick={() => { setStep("start"); setMovie(null); setTime(null); setWhatsapp(""); }} className="mt-10 rounded-full border border-black/15 px-6 py-3 text-sm font-medium transition hover:bg-black hover:text-white">Back to Leylaa Polls</button></div>}
          {error && <p className="mx-auto mt-8 max-w-xl rounded-2xl bg-red-50 px-5 py-4 text-center text-sm text-red-700">{error}</p>}
        </div>
      </section>
    </main>
  );
}
