import type { Metadata } from "next";
import TunerGuestGuide from "@/components/events/TunerGuestGuide";

export const metadata: Metadata = {
  title: "LEYLAA — Movie Night Guide",
  description: "Your LEYLAA Movie Night details for Tuner (2025).",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function TunerGuestPage() {
  return <TunerGuestGuide />;
}
