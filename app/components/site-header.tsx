import Link from "next/link";
import type { Locale } from "../lib/locales";
import type { UIStrings } from "../lib/content";
import { LocaleSwitcher } from "./locale-switcher";
import { Logo } from "./logo";

type Props = {
  locale: Locale;
  ui: UIStrings;
};

export function SiteHeader({ locale, ui }: Props) {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/60">
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href={`/${locale}`}
          aria-label="X Algorithm"
          className="text-sm"
        >
          <Logo size={18} />
        </Link>
        <LocaleSwitcher current={locale} label={ui.switchToOther} />
      </div>
    </header>
  );
}
