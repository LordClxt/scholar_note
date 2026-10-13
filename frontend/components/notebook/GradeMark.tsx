import { cn } from "@/lib/utils";
import { formatNote, mention } from "@/lib/mention";

const sizes = {
  sm: { note: "text-3xl", sur: "text-lg", box: "px-4 py-1", mention: "text-base" },
  md: { note: "text-5xl", sur: "text-2xl", box: "px-6 py-2", mention: "text-xl" },
  lg: { note: "text-7xl", sur: "text-3xl", box: "px-8 py-3", mention: "text-2xl" },
};

// Note corrigée au stylo rouge : chiffre manuscrit entouré d'un trait à main levée
export function GradeMark({
  note,
  size = "md",
  showMention = true,
  tone = "pen",
  className,
}: {
  note: number;
  size?: keyof typeof sizes;
  showMention?: boolean;
  tone?: "pen" | "light";
  className?: string;
}) {
  const s = sizes[size];
  const color = tone === "light" ? "text-white" : "text-pen";
  return (
    <div className={cn("inline-flex flex-col items-center font-hand", className)}>
      <div className={cn("relative -rotate-3", s.box)}>
        <svg
          aria-hidden="true"
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible text-pen"
        >
          <path
            d="M18 58 C10 24 62 8 112 10 C168 12 196 34 190 58 C184 84 128 94 82 90 C36 86 8 72 14 50 C18 36 40 22 70 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <p className={cn("relative font-bold leading-none whitespace-nowrap", color)}>
          <span className={s.note}>{formatNote(note)}</span>
          <span className={s.sur}>/20</span>
        </p>
      </div>
      {showMention && (
        <p className={cn("mt-1 -rotate-2 leading-none", color, s.mention)}>{mention(note)}</p>
      )}
    </div>
  );
}
