
"use client";

import { useState } from "react";

type Choice = "cinema" | "party" | null;

export default function PollsPage() {
  const [choice, setChoice] = useState<Choice>(null);

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#171717]">
      <section className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-16">
        <div className="w-full max-w-3xl">

          {!choice ? (
            <>
              <div className="mb-12 text-center">
                <p className="mb-4 text-sm uppercase tracking-[0.3em] text-black/50">
                  Leylaa
                </p>

                <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
                  What should we do next?
                </h1>

                <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-black/60 sm:text-lg">
                  Help us choose the next Leylaa experience.
                  Your choice can shape what happens next.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <button
                  onClick={() => setChoice("cinema")}
                  className="group rounded-3xl border border-black/10 bg-white p-8 text-left transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-8 text-6xl">🎬</div>

                  <h2 className="text-3xl font-semibold">
                    Cinema
                  </h2>

                  <p className="mt-3 leading-6 text-black/55">
                    Pick a movie, choose when you'd like to go,
                    and we'll keep you updated.
                  </p>

                  <div className="mt-8 text-sm font-medium">
                    Choose Cinema →
                  </div>
                </button>

                <button
                  onClick={() => setChoice("party")}
                  className="group rounded-3xl border border-black/10 bg-white p-8 text-left transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-8 text-6xl">🎉</div>

                  <h2 className="text-3xl font-semibold">
                    Party
                  </h2>

                  <p className="mt-3 leading-6 text-black/55">
                    Tell us what kind of night you're looking for
                    and help us plan the next party.
                  </p>

                  <div className="mt-8 text-sm font-medium">
                    Choose Party →
                  </div>
                </button>
              </div>
            </>
          ) : choice === "cinema" ? (
            <div className="text-center">
              <div className="mb-6 text-6xl">🎬</div>

              <p className="text-sm uppercase tracking-[0.3em] text-black/50">
                Cinema
              </p>

              <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
                What movie would you love to watch?
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-black/60">
                We'll soon give you a selection of movies to choose from.
              </p>

              <button
                onClick={() => setChoice(null)}
                className="mt-10 rounded-full border border-black/15 px-6 py-3 text-sm font-medium transition hover:bg-black hover:text-white"
              >
                ← Go back
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-6 text-6xl">🎉</div>

              <p className="text-sm uppercase tracking-[0.3em] text-black/50">
                Party
              </p>

              <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
                What kind of night are you looking for?
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-black/60">
                Tell us what kind of experience you'd like at the next
                Leylaa party.
              </p>

              <button
                onClick={() => setChoice(null)}
                className="mt-10 rounded-full border border-black/15 px-6 py-3 text-sm font-medium transition hover:bg-black hover:text-white"
              >
                ← Go back
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
