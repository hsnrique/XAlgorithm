import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent } from "../lib/content";
import { isLocale, otherLocale, type Locale } from "../lib/locales";
import {
  CREATOR_GITHUB,
  CREATOR_NAME,
  X_ALGORITHM_REPO,
} from "../lib/site";
import { Diagram } from "../components/diagram";
import { StageCard } from "../components/stage-card";
import { ShareButton } from "../components/share-button";

type RouteParams = { lang: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { ui } = getContent(lang);
  const other = otherLocale(lang);
  return {
    title: ui.title,
    description: ui.intro,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        [lang]: `/${lang}`,
        [other]: `/${other}`,
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "article",
      title: ui.title,
      description: ui.intro,
      url: `/${lang}`,
      siteName: "X Algorithm",
      locale: lang === "pt" ? "pt_BR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: ui.title,
      description: ui.intro,
    },
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;
  const { ui, stages } = getContent(locale);

  return (
    <article className="mx-auto w-full max-w-2xl px-6 py-16 font-sans sm:py-24">
      <Hero ui={ui} />
      <Diagram title={ui.diagramTitle} nodes={ui.diagramNodes} />
      <TlDr title={ui.tldrTitle} items={stages.map((s) => s.summary)} />
      <Stages
        title={ui.stagesTitle}
        stages={stages}
        locale={locale}
        underTheHoodLabel={ui.underTheHood}
        readMoreLabel={ui.readMore}
      />
      <DeepDive title={ui.bigIdeaTitle} paragraphs={ui.bigIdeaBody} />
      <ShareCta ui={ui} />
      <SiteFooter ui={ui} />
    </article>
  );
}

function Hero({ ui }: { ui: ReturnType<typeof getContent>["ui"] }) {
  return (
    <header className="mb-16">
      <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
        {ui.kicker}
      </p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {ui.title}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        {ui.intro}
      </p>
      <p className="mt-3 text-sm text-zinc-500">{ui.readTime}</p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href="#stages"
          className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {ui.startReading} ↓
        </Link>
        <ShareButton
          shareLabel={ui.share}
          copiedLabel={ui.copied}
          title={ui.title}
        />
      </div>
    </header>
  );
}

function TlDr({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mb-16 rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500">
        {title}
      </h2>
      <ol className="list-decimal space-y-2 pl-6 text-zinc-700 dark:text-zinc-300">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ol>
    </section>
  );
}

function Stages(props: {
  title: string;
  stages: ReturnType<typeof getContent>["stages"];
  locale: Locale;
  underTheHoodLabel: string;
  readMoreLabel: string;
}) {
  return (
    <section id="stages" className="scroll-mt-24">
      <h2 className="mb-8 text-sm font-semibold uppercase tracking-widest text-zinc-500">
        {props.title}
      </h2>
      <div className="space-y-16">
        {props.stages.map((stage) => (
          <StageCard
            key={stage.slug}
            stage={stage}
            locale={props.locale}
            underTheHoodLabel={props.underTheHoodLabel}
            readMoreLabel={props.readMoreLabel}
          />
        ))}
      </div>
    </section>
  );
}

function DeepDive({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: readonly string[];
}) {
  return (
    <section className="mt-24 border-t border-zinc-200 pt-12 dark:border-zinc-800">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
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

function ShareCta({ ui }: { ui: ReturnType<typeof getContent>["ui"] }) {
  return (
    <section className="mt-20 rounded-lg border border-zinc-200 bg-zinc-50 p-6 text-center dark:border-zinc-800 dark:bg-zinc-900/50 sm:p-8">
      <h2 className="text-xl font-semibold tracking-tight">
        {ui.shareCtaTitle}
      </h2>
      <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
        {ui.shareCtaBody}
      </p>
      <div className="mt-6 flex justify-center">
        <ShareButton
          shareLabel={ui.share}
          copiedLabel={ui.copied}
          title={ui.title}
        />
      </div>
    </section>
  );
}

function SiteFooter({ ui }: { ui: ReturnType<typeof getContent>["ui"] }) {
  return (
    <footer className="mt-20 flex flex-col gap-4 border-t border-zinc-200 pt-8 text-sm text-zinc-500 dark:border-zinc-800">
      <p>{ui.footerSource}</p>
      <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <a
          href={X_ALGORITHM_REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-zinc-700 underline underline-offset-4 hover:no-underline dark:text-zinc-300"
        >
          {ui.viewSource} →
        </a>
        <span aria-hidden="true">·</span>
        <span>
          {ui.createdBy}{" "}
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
    </footer>
  );
}
