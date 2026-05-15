"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, otherLocale, type Locale } from "../lib/locales";

type Props = {
  current: Locale;
  label: string;
};

export function LocaleSwitcher({ current, label }: Props) {
  const pathname = usePathname() ?? `/${current}`;
  const target = otherLocale(current);
  const targetHref = swapLocalePrefix(pathname, target);

  return (
    <Link
      href={targetHref}
      hrefLang={target}
      aria-label={`Switch to ${label}`}
      className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
    >
      {label}
    </Link>
  );
}

function swapLocalePrefix(pathname: string, target: Locale) {
  const knownPrefixes = LOCALES.map((l) => `/${l}`);
  const matched = knownPrefixes.find(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  if (!matched) return `/${target}`;
  const rest = pathname.slice(matched.length);
  return rest ? `/${target}${rest}` : `/${target}`;
}
