import { NextResponse } from "next/server";
import { isAnalyticsEventName, recordAnalyticsEvent } from "@/lib/analytics";
import { getPilotRestaurant } from "@/lib/restaurants";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    eventName?: string;
    metadata?: Record<string, unknown>;
  } | null;

  if (!body?.eventName || !isAnalyticsEventName(body.eventName)) {
    return NextResponse.json({ error: "Invalid event" }, { status: 400 });
  }

  const restaurant = await getPilotRestaurant();
  await recordAnalyticsEvent({
    restaurantId: restaurant.id,
    eventName: body.eventName,
    metadata: body.metadata ?? {}
  });

  return NextResponse.json({ ok: true });
}
