import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getContent,
  getStage,
  getAdjacentStages,
  getAllStageSlugs,
  type Stage,
} from "../../../lib/content";
import {
  isLocale,
  LOCALES,
  otherLocale,
  type Locale,
} from "../../../lib/locales";
import {
  CREATOR_GITHUB,
  CREATOR_NAME,
  X_ALGORITHM_REPO,
} from "../../../lib/site";
import { ShareButton } from "../../../components/share-button";
import { FilePaths } from "../../../components/file-paths";

type RouteParams = { lang: string; slug: string };

export function generateStaticParams() {
  const slugs = getAllStageSlugs();
  return LOCALES.flatMap((lang) =>
    slugs.map((slug) => ({ lang, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const stage = getStage(lang, slug);
  if (!stage) return {};
  const other = otherLocale(lang);
  return {
    title: stage.title,
    description: stage.summary,
    alternates: {
      canonical: `/${lang}/stages/${slug}`,
      languages: {
        [lang]: `/${lang}/stages/${slug}`,
        [other]: `/${other}/stages/${slug}`,
        "x-default": `/en/stages/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title: stage.title,
      description: stage.summary,
      url: `/${lang}/stages/${slug}`,
      siteName: "X Algorithm",
      locale: lang === "pt" ? "pt_BR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: stage.title,
      description: stage.summary,
    },
  };
}

export default async function StagePage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;
  const stage = getStage(locale, slug);
  if (!stage) notFound();
  const { ui } = getContent(locale);
  const { previous, next } = getAdjacentStages(locale, slug);

  return (
    <article className="mx-auto w-full max-w-2xl px-6 py-16 font-sans sm:py-24">
      <BackLink href={`/${locale}`} label={ui.backToOverview} />
      <StageHeader stage={stage} />
      <StageBody stage={stage} underTheHoodLabel={ui.underTheHood} />
      <Details title={ui.detailsTitle} paragraphs={stage.details} />
      <ShareRow ui={ui} title={stage.title} />
      <PrevNext
        previous={previous}
        next={next}
        locale={locale}
        previousLabel={ui.previous}
        nextLabel={ui.next}
      />
      <Credits createdByLabel={ui.createdBy} viewSourceLabel={ui.viewSource} />
    </article>
  );
}

function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="mb-10 inline-block text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
    >
      ← {label}
    </Link>
  );
}

function StageHeader({ stage }: { stage: Stage }) {
  return (
    <header className="mb-10">
      <p className="mb-3 font-mono text-sm text-zinc-400">
        {String(stage.number).padStart(2, "0")}
      </p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {stage.title}
      </h1>
    </header>
  );
}

function StageBody({
  stage,
  underTheHoodLabel,
}: {
  stage: Stage;
  underTheHoodLabel: string;
}) {
  return (
    <section>
      <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
        {stage.plain}
      </p>
      {stage.analogy && (
        <p className="mt-6 border-l-2 border-zinc-300 pl-4 italic text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
          {stage.analogy}
        </p>
      )}
      <p className="mt-6 text-sm text-zinc-500">
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
          {underTheHoodLabel}{" "}
        </span>
        {stage.underTheHood}{" "}
        <span className="ml-1">
          <FilePaths paths={stage.file} />
        </span>
      </p>
    </section>
  );
}

function Details({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  if (paragraphs.length === 0) return null;
  return (
    <section className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500">
        {title}
      </h2>
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400"
        >
          {p}
        </p>
      ))}
    </section>
  );
}

function ShareRow({
  ui,
  title,
}: {
  ui: ReturnType<typeof getContent>["ui"];
  title: string;
}) {
  return (
    <div className="mt-12">
      <ShareButton
        shareLabel={ui.share}
        copiedLabel={ui.copied}
        title={title}
      />
    </div>
  );
}

function PrevNext({
  previous,
  next,
  locale,
  previousLabel,
  nextLabel,
}: {
  previous?: Stage;
  next?: Stage;
  locale: Locale;
  previousLabel: string;
  nextLabel: string;
}) {
  return (
    <nav className="mt-16 grid grid-cols-1 gap-4 border-t border-zinc-200 pt-8 sm:grid-cols-2 dark:border-zinc-800">
      <NavLink
        stage={previous}
        locale={locale}
        label={previousLabel}
        direction="prev"
      />
      <NavLink stage={next} locale={locale} label={nextLabel} direction="next" />
    </nav>
  );
}

function NavLink({
  stage,
  locale,
  label,
  direction,
}: {
  stage?: Stage;
  locale: Locale;
  label: string;
  direction: "prev" | "next";
}) {
  if (!stage) return <span aria-hidden="true" />;
  const isNext = direction === "next";
  return (
    <Link
      href={`/${locale}/stages/${stage.slug}`}
      className={`group rounded-lg border border-zinc-200 p-4 transition hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600 ${
        isNext ? "sm:text-right" : ""
      }`}
    >
      <p className="text-xs uppercase tracking-widest text-zinc-500">{label}</p>
      <p className="mt-1 font-medium text-zinc-900 dark:text-zinc-100">
        {isNext ? `${stage.title} →` : `← ${stage.title}`}
      </p>
    </Link>
  );
}

function Credits({
  createdByLabel,
  viewSourceLabel,
}: {
  createdByLabel: string;
  viewSourceLabel: string;
}) {
  return (
    <p className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500">
      <a
        href={X_ALGORITHM_REPO}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-zinc-700 underline underline-offset-4 hover:no-underline dark:text-zinc-300"
      >
        {viewSourceLabel} →
      </a>
      <span aria-hidden="true">·</span>
      <span>
        {createdByLabel}{" "}
        <a
          href={CREATOR_GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-zinc-700 underline underline-offset-4 hover:no-underline dark:text-zinc-300"
        >
          {CREATOR_NAME}
        </a>
      </span>
    </p>
  );
}
