import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { AnalyticsEventName } from "@/types/domain";

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  className?: string;
  ariaLabel?: string;
  analyticsEvent?: AnalyticsEventName;
};

const variants = {
  primary:
    "bg-harbor-900 text-white shadow-soft hover:bg-harbor-600 focus-visible:outline-harbor-600",
  secondary:
    "border border-harbor-900/15 bg-white/90 text-harbor-900 hover:bg-white focus-visible:outline-harbor-600",
  ghost:
    "text-harbor-900 hover:bg-white/60 focus-visible:outline-harbor-600"
};

export function LinkButton({
  href,
  children,
  variant = "primary",
  external = false,
  className,
  ariaLabel,
  analyticsEvent
}: LinkButtonProps) {
  const classes = cn(
    "inline-flex min-h-12 items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    variants[variant],
    className
  );

  if (external) {
    return (
      <a
        aria-label={ariaLabel}
        className={classes}
        data-analytics-event={analyticsEvent}
        href={href}
        rel="noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      aria-label={ariaLabel}
      className={classes}
      data-analytics-event={analyticsEvent}
      href={href}
    >
      {children}
    </Link>
  );
}
