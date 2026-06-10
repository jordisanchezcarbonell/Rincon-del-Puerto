import { NextResponse } from "next/server";
import { getPilotRestaurant } from "@/lib/restaurants";
import { getAvailabilityForDate } from "@/lib/reservations/availability";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  const restaurant = await getPilotRestaurant();
  const slots = await getAvailabilityForDate(restaurant.id, date);

  return NextResponse.json({ slots });
}
