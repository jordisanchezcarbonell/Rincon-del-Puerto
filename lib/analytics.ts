import "server-only";
import { ANALYTICS_EVENTS, type AnalyticsEventName } from "@/types/domain";
import type { Json } from "@/types/database";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

const analyticsEventSet = new Set<string>(ANALYTICS_EVENTS);

export function isAnalyticsEventName(value: string): value is AnalyticsEventName {
  return analyticsEventSet.has(value);
}

export async function recordAnalyticsEvent({
  restaurantId,
  eventName,
  metadata = {}
}: {
  restaurantId?: string | null;
  eventName: AnalyticsEventName;
  metadata?: Record<string, unknown>;
}) {
  try {
    const supabase = createSupabaseServiceClient();
    await supabase.from("analytics_events").insert({
      restaurant_id: restaurantId ?? null,
      event_name: eventName,
      metadata: metadata as Json
    });
  } catch {
    // Analytics must never block reservations or admin actions in the MVP.
  }
}
