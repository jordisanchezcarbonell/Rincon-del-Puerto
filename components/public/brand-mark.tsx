import Image from "next/image";
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
          "relative shrink-0 overflow-hidden rounded-full border",
          compact ? "h-12 w-12" : "h-14 w-14",
          inverted ? "border-white/30 bg-white/10" : "border-terracotta-700/40 bg-paper"
        )}
      >
        <Image
          alt=""
          fill
          priority
          sizes="56px"
          src="/brand/logo.png"
          className="object-cover"
        />
      </span>
      <span className="min-w-0 leading-none">
        <span
          className={cn(
            "block truncate font-serif uppercase tracking-[0.06em]",
            compact ? "text-lg font-bold" : "text-xl font-bold",
            inverted ? "text-white" : "text-harbor-900"
          )}
        >
          Rincón del
        </span>
        <span
          className={cn(
            "block truncate font-serif uppercase tracking-[0.06em]",
            compact ? "text-lg font-bold" : "text-xl font-bold",
            inverted ? "text-white" : "text-harbor-900"
          )}
        >
          Puerto
        </span>
      </span>
    </span>
  );
}
