import Link from "next/link";
import { DEFAULT_LOCALE } from "../lib/locales";
import { getContent } from "../lib/content";

export default function LocaleNotFound() {
  const { ui } = getContent(DEFAULT_LOCALE);
  return (
    <article className="mx-auto flex w-full max-w-2xl flex-col items-start gap-6 px-6 py-24 font-sans">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {ui.notFoundTitle}
      </h1>
      <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        {ui.notFoundBody}
      </p>
      <Link
        href={`/${DEFAULT_LOCALE}`}
        className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
      >
        {ui.backToOverview} →
      </Link>
    </article>
  );
}
