"use client";

import { useEffect } from "react";
import type { AnalyticsEventName } from "@/types/domain";

type AnalyticsTrackerProps = {
  eventsOnMount?: AnalyticsEventName[];
};

export function AnalyticsTracker({
  eventsOnMount = ["web_visit"]
}: AnalyticsTrackerProps) {
  useEffect(() => {
    eventsOnMount.forEach((eventName) => {
      sendAnalyticsEvent(eventName, {
        path: window.location.pathname
      });
    });

    function handleClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const element = target.closest<HTMLElement>("[data-analytics-event]");
      const eventName = element?.dataset.analyticsEvent as
        | AnalyticsEventName
        | undefined;

      if (!element || !eventName) {
        return;
      }

      sendAnalyticsEvent(eventName, {
        path: window.location.pathname,
        href: element.getAttribute("href")
      });
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [eventsOnMount]);

  return null;
}

function sendAnalyticsEvent(
  eventName: AnalyticsEventName,
  metadata: Record<string, unknown>
) {
  const body = JSON.stringify({
    eventName,
    metadata
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      "/api/analytics",
      new Blob([body], { type: "application/json" })
    );
    return;
  }

  fetch("/api/analytics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body,
    keepalive: true
  }).catch(() => undefined);
}
