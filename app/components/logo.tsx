type Props = {
  size?: number;
  showWordmark?: boolean;
  className?: string;
};

export function Logo({ size = 20, showWordmark = true, className }: Props) {
  return (
    <span
      className={
        "inline-flex items-center gap-2 text-zinc-900 dark:text-zinc-100 " +
        (className ?? "")
      }
    >
      <LogoMark size={size} />
      {showWordmark && (
        <span className="font-semibold tracking-tight">X Algorithm</span>
      )}
    </span>
  );
}

export function LogoMark({ size = 20 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="4" cy="12" r="2.5" fill="currentColor" />
      <line
        x1="6.5"
        y1="12"
        x2="9.5"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <line
        x1="14.5"
        y1="12"
        x2="17.5"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="20" cy="12" r="2.5" fill="currentColor" />
    </svg>
  );
}
