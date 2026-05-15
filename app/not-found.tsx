import Link from "next/link";
import { Geist } from "next/font/google";
import "./globals.css";
import { Logo } from "./components/logo";
import { DEFAULT_LOCALE } from "./lib/locales";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-start justify-center gap-6 px-6 py-24">
          <Logo />
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Page not found
          </h1>
          <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            That URL doesn’t match anything on this site. Head back to the
            overview to start from the top.
          </p>
          <Link
            href={`/${DEFAULT_LOCALE}`}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Go to overview →
          </Link>
        </main>
      </body>
    </html>
  );
}
