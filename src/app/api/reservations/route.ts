import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function normalizePhone(value: string) {
  let phone = value.replace(/[^\d+]/g, "");

  if (phone.startsWith("00")) {
    phone = "+" + phone.slice(2);
  }

  if (phone.startsWith("212")) {
    phone = "+" + phone;
  }

  if (/^0[5-7]\d{8}$/.test(phone)) {
    phone = "+212" + phone.slice(1);
  }

  return phone;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const fullName =
      typeof body.fullName === "string" ? body.fullName.trim() : "";
    const rawPhone = typeof body.phone === "string" ? body.phone.trim() : "";
    const phone = normalizePhone(rawPhone);

    if (fullName.length < 2 || fullName.length > 80) {
      return NextResponse.json(
        { message: "Please enter your full name." },
        { status: 400 }
      );
    }

    if (!/^\+212[5-7]\d{8}$/.test(phone)) {
      return NextResponse.json(
        { message: "Please enter a valid Moroccan WhatsApp number." },
        { status: 400 }
      );
    }

    const { error } = await supabase.rpc("reserve_event_spot", {
      p_event_slug: "tuner",
      p_full_name: fullName,
      p_phone: phone,
    });

    if (error) {
      const message = error.message || "";

      if (message.includes("ALREADY_RESERVED")) {
        return NextResponse.json(
          { message: "This WhatsApp number already has a reservation." },
          { status: 409 }
        );
      }

      if (message.includes("EVENT_FULL")) {
        return NextResponse.json(
          { message: "Reservations are full for this event." },
          { status: 409 }
        );
      }

      if (message.includes("EVENT_NOT_FOUND")) {
        return NextResponse.json(
          { message: "This event is not open for reservations yet." },
          { status: 404 }
        );
      }

      console.error("Reservation RPC error:", error);
      return NextResponse.json(
        { message: "We couldn't save your reservation. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Reservation request error:", error);
    return NextResponse.json(
      { message: "Invalid request. Please try again." },
      { status: 400 }
    );
  }
}
