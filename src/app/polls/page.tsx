"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type Option = { id: number; poll_id: number; label: string; emoji: string | null; image_url: string | null; next_poll_id: number | null; sort_order: number };
type Poll = { id: number; title: string; description: string | null };
type Step = "start" | "cinema-movie" | "cinema-time" | "party-vibe" | "party-music" | "party-time" | "contact" | "done";

type PathChoice = "cinema" | "party";

const moviePosters: Record<string, string> = {
  Inception: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
  Interstellar: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  "The Dark Knight": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
};

const musicArt: Record<string, string> = {
  Afrobeats: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
  "Hip-Hop / R&B": "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=900&q=80",
  "House / Electronic": "https://images.unsplash.com/photo-1571266028243-d220c9c3b2e0?auto=format&fit=crop&w=900&q=80",
  "Mixed vibes": "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=80",
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
  const [choice, setChoice] = useState<PathChoice | null>(null);
  const [movie, setMovie] = useState<Option | null>(null);
  const [cinemaTime, setCinemaTime] = useState<Option | null>(null);
  const [partyVibe, setPartyVibe] = useState<Option | null>(null);
  const [music, setMusic] = useState<Option | null>(null);
  const [partyTime, setPartyTime] = useState<Option | null>(null);
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const [p, o] = await Promise.all([
        supabase.from("polls").select("id,title,description").eq("is_active", true).order("id"),
        supabase.from("poll_options").select("id,poll_id,label,emoji,image_url,next_poll_id,sort_order").order("sort_order"),
      ]);
      if (p.error || o.error) setError("We couldn't load the poll. Please try again.");
      const map: Record<number, Poll> = {};
      (p.data ?? []).forEach((x) => { map[x.id] = x as Poll; });
      setPolls(map);
      setOptions((o.data ?? []) as Option[]);
      setLoading(false);
    }
    load();
  }, []);

  const byPoll = (pollId: number) => options.filter((o) => o.poll_id === pollId);
  const movies = useMemo(() => byPoll(2), [options]);
  const cinemaTimes = useMemo(() => byPoll(3), [options]);
  const partyVibes = useMemo(() => byPoll(4), [options]);
  const partyMusic = useMemo(() => byPoll(5), [options]);
  const partyTimes = useMemo(() => byPoll(6), [options]);

  async function saveVote(option: Option) {
    const { error: voteError } = await supabase.from("votes").insert({
      poll_id: option.poll_id,
      option_id: option.id,
      session_id: getSessionId(),
    });
    if (voteError) throw voteError;
  }

  async function chooseStart(option: Option) {
    setError("");
    try {
      await saveVote(option);
      const next = option.next_poll_id;
      setChoice(option.label.toLowerCase() === "cinema" ? "cinema" : "party");
      setStep(next === 2 ? "cinema-movie" : "party-vibe");
    } catch {
      setError("We couldn't save your choice. Please try again.");
    }
  }

  async function chooseCinemaMovie(option: Option) {
    setError("");
    try { await saveVote(option); setMovie(option); setStep("cinema-time"); }
    catch { setError("We couldn't save your movie choice. Please try again."); }
  }

  async function chooseCinemaTime(option: Option) {
    setError("");
    try { await saveVote(option); setCinemaTime(option); setStep("contact"); }
    catch { setError("We couldn't save your time choice. Please try again."); }
  }

  async function choosePartyVibe(option: Option) {
    setError("");
    try { await saveVote(option); setPartyVibe(option); setStep("party-music"); }
    catch { setError("We couldn't save your choice. Please try again."); }
  }

  async function choosePartyMusic(option: Option) {
    setError("");
    try { await saveVote(option); setMusic(option); setStep("party-time"); }
    catch { setError("We couldn't save your music choice. Please try again."); }
  }

  async function choosePartyTime(option: Option) {
    setError("");
    try { await saveVote(option); setPartyTime(option); setStep("contact"); }
    catch { setError("We couldn't save your time choice. Please try again."); }
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (whatsapp.trim().length < 6) return setError("Please enter a valid WhatsApp number.");
    setLoading(true);
    const { error: contactError } = await supabase.from("contacts").insert({ session_id: getSessionId(), whatsapp: whatsapp.trim() });
    setLoading(false);
    if (contactError) return setError("We couldn't save your number. Please try again.");
    setStep("done");
  }

  const activePollId = step === "cinema-movie" ? 2 : step === "cinema-time" ? 3 : step === "party-vibe" ? 4 : step === "party-music" ? 5 : step === "party-time" ? 6 : null;
  const activePoll = activePollId ? polls[activePollId] : null;
  const currentOptions = step === "cinema-movie" ? movies : step === "cinema-time" ? cinemaTimes : step === "party-vibe" ? partyVibes : step === "party-music" ? partyMusic : partyTimes;
  const isCinema = choice === "cinema";
  const summaryChoice = isCinema ? movie : music;
  const summaryTime = isCinema ? cinemaTime : partyTime;

  function goBack() {
    setError("");
    if (step === "cinema-movie" || step === "party-vibe") return setStep("start");
    if (step === "cinema-time") return setStep("cinema-movie");
    if (step === "party-music") return setStep("party-vibe");
    if (step === "party-time") return setStep("party-music");
    if (step === "contact") return setStep(isCinema ? "cinema-time" : "party-time");
  }

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#171717]">
      <section className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-16">
        <div className="w-full max-w-3xl">
          {step === "start" && (
            <div className="text-center">
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-black/50">Leylaa</p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">What should we do next?</h1>
              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-black/60 sm:text-lg">Help us choose the next Leylaa experience. Your choice can shape what happens next.</p>
              <div className="mt-12 grid gap-5 sm:grid-cols-2">
                <button onClick={() => chooseStart(options.find((o) => o.poll_id === 1 && o.label.toLowerCase() === "cinema")!)} disabled={loading} className="group rounded-3xl border border-black/10 bg-white p-8 text-left transition duration-300 hover:-translate-y-1 hover:shadow-xl disabled:opacity-60">
                  <div className="mb-8 text-6xl">ðŸŽ¬</div><h2 className="text-3xl font-semibold">Cinema</h2><p className="mt-3 leading-6 text-black/55">Pick a movie, choose when you'd like to go, and we'll keep you updated.</p><div className="mt-8 text-sm font-medium">Choose Cinema â†’</div>
                </button>
                <button onClick={() => chooseStart(options.find((o) => o.poll_id === 1 && o.label.toLowerCase() === "party")!)} disabled={loading} className="group rounded-3xl border border-black/10 bg-white p-8 text-left transition duration-300 hover:-translate-y-1 hover:shadow-xl disabled:opacity-60">
                  <div className="mb-8 text-6xl">ðŸŽ‰</div><h2 className="text-3xl font-semibold">Party</h2><p className="mt-3 leading-6 text-black/55">Tell us your vibe, choose the music, and help us shape the next night.</p><div className="mt-8 text-sm font-medium">Choose Party â†’</div>
                </button>
              </div>
            </div>
          )}

          {activePollId && (
            <div>
              <div className="mb-12 text-center">
                <div className="mb-6 text-6xl">{isCinema ? "ðŸŽ¬" : "ðŸŽ‰"}</div>
                <p className="text-sm uppercase tracking-[0.3em] text-black/50">{isCinema ? "Cinema" : "Party"}</p>
                <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{activePoll?.title}</h1>
                {activePoll?.description && <p className="mx-auto mt-5 max-w-xl text-black/60">{activePoll.description}</p>}
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {currentOptions.map((option) => {
                  const image = option.image_url ?? (step === "cinema-movie" ? moviePosters[option.label] : step === "party-music" ? musicArt[option.label] : null);
                  return (
                    <button key={option.id} disabled={loading} onClick={() => step === "cinema-movie" ? chooseCinemaMovie(option) : step === "cinema-time" ? chooseCinemaTime(option) : step === "party-vibe" ? choosePartyVibe(option) : step === "party-music" ? choosePartyMusic(option) : choosePartyTime(option)} className="group overflow-hidden rounded-3xl border border-black/10 bg-white text-left transition duration-300 hover:-translate-y-1 hover:shadow-xl disabled:opacity-60">
                      {image ? <div className={`overflow-hidden ${step === "cinema-movie" ? "aspect-[2/3]" : "aspect-[4/3]"}`}><img src={image} alt={option.label} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div> : <div className="flex aspect-[4/3] items-center justify-center bg-[#eee9e1] text-6xl">{option.emoji ?? (isCinema ? "ðŸŽ¬" : "ðŸŽ‰")}</div>}
                      <div className="p-5"><h2 className="text-xl font-semibold">{option.label}</h2><p className="mt-2 text-sm text-black/45">Choose this â†’</p></div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-10 text-center"><button onClick={goBack} className="rounded-full border border-black/15 px-6 py-3 text-sm font-medium transition hover:bg-black hover:text-white">â† Go back</button></div>
            </div>
          )}

          {step === "contact" && (
            <div className="text-center">
              <div className="mb-6 text-6xl">ðŸ“²</div><p className="text-sm uppercase tracking-[0.3em] text-black/50">Almost there</p><h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Want to hear from us first?</h1>
              <p className="mx-auto mt-5 max-w-xl text-black/60">Leave your WhatsApp number and we'll send you the details and booking time before the tickets are gone.</p>
              <div className="mx-auto mt-8 max-w-md rounded-3xl border border-black/10 bg-white p-6 text-left">
                <p className="text-sm text-black/50">Your choice</p><p className="mt-1 font-medium">{isCinema ? movie?.label : partyVibe?.label}</p>
                <p className="mt-4 text-sm text-black/50">{isCinema ? "Preferred movie time" : "Music vibe"}</p><p className="mt-1 font-medium">{isCinema ? cinemaTime?.label : music?.label}</p>
                <p className="mt-4 text-sm text-black/50">When</p><p className="mt-1 font-medium">{summaryTime?.label}</p>
              </div>
              <form onSubmit={submit} className="mx-auto mt-6 max-w-md"><input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="WhatsApp number" autoComplete="tel" className="w-full rounded-full border border-black/10 bg-white px-6 py-4 outline-none placeholder:text-black/35 focus:border-black/30"/><button disabled={loading} className="mt-3 w-full rounded-full bg-black px-6 py-4 text-sm font-medium text-white disabled:opacity-60">{loading ? "Saving..." : "Keep me updated â†’"}</button></form>
              <button onClick={goBack} className="mt-6 text-sm text-black/50 underline-offset-4 hover:underline">â† Go back</button>
            </div>
          )}

          {step === "done" && (
            <div className="text-center"><div className="mb-6 text-6xl">âœ¨</div><p className="text-sm uppercase tracking-[0.3em] text-black/50">You're in</p><h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{isCinema ? "We'll see you at the movies." : "See you on the dance floor."}</h1><p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-black/60">We'll contact you on WhatsApp with the details and booking time before the tickets are gone.</p><button onClick={() => { setStep("start"); setChoice(null); setMovie(null); setCinemaTime(null); setPartyVibe(null); setMusic(null); setPartyTime(null); setWhatsapp(""); }} className="mt-10 rounded-full border border-black/15 px-6 py-3 text-sm font-medium transition hover:bg-black hover:text-white">Back to Leylaa Polls</button></div>
          )}

          {error && <p className="mx-auto mt-8 max-w-xl rounded-2xl bg-red-50 px-5 py-4 text-center text-sm text-red-700">{error}</p>}
        </div>
      </section>
    </main>
  );
}


