import { Anchor } from "lucide-react";
import { RESTAURANT_CONFIG } from "@/lib/config/site";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  compact?: boolean;
  inverted?: boolean;
};

export function BrandMark({ compact = false, inverted = false }: BrandMarkProps) {
  return (
    <span className="flex min-w-0 items-center gap-3">
      <span
        className={cn(
          "grid h-11 w-11 shrink-0 place-items-center rounded-lg border",
          inverted
            ? "border-white/20 bg-white/10 text-white"
            : "border-harbor-900/10 bg-harbor-900 text-white"
        )}
      >
        <Anchor aria-hidden="true" size={20} strokeWidth={2.2} />
      </span>
      <span className="min-w-0">
        <span
          className={cn(
            "block truncate font-bold leading-tight tracking-wide",
            compact ? "text-sm" : "text-base",
            inverted ? "text-white" : "text-harbor-900"
          )}
        >
          {RESTAURANT_CONFIG.name}
        </span>
        <span
          className={cn(
            "hidden text-xs font-semibold uppercase tracking-[0.16em] sm:block",
            inverted ? "text-white/65" : "text-harbor-600"
          )}
        >
          Puerto de Garrucha
        </span>
      </span>
    </span>
  );
}
