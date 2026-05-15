import Link from "next/link";
import type { Stage } from "../lib/content";
import type { Locale } from "../lib/locales";
import { FilePaths } from "./file-paths";

type Props = {
  stage: Stage;
  locale: Locale;
  underTheHoodLabel: string;
  readMoreLabel: string;
};

export function StageCard({
  stage,
  locale,
  underTheHoodLabel,
  readMoreLabel,
}: Props) {
  const href = `/${locale}/stages/${stage.slug}`;
  return (
    <section aria-labelledby={`stage-${stage.slug}`}>
      <StageHeading number={stage.number} title={stage.title} slug={stage.slug} />
      <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
        {stage.plain}
      </p>
      {stage.analogy && (
        <p className="mt-4 border-l-2 border-zinc-300 pl-4 italic text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
          {stage.analogy}
        </p>
      )}
      <p className="mt-4 text-sm text-zinc-500">
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
          {underTheHoodLabel}{" "}
        </span>
        {stage.underTheHood}{" "}
        <span className="ml-1">
          <FilePaths paths={stage.file} />
        </span>
      </p>
      <p className="mt-4">
        <Link
          href={href}
          className="text-sm font-medium text-zinc-900 underline underline-offset-4 hover:no-underline dark:text-zinc-100"
        >
          {readMoreLabel} →
        </Link>
      </p>
    </section>
  );
}

function StageHeading({
  number,
  title,
  slug,
}: {
  number: number;
  title: string;
  slug: string;
}) {
  return (
    <div className="mb-3 flex items-baseline gap-3">
      <span className="font-mono text-sm text-zinc-400">
        {String(number).padStart(2, "0")}
      </span>
      <h2
        id={`stage-${slug}`}
        className="text-2xl font-semibold tracking-tight"
      >
        {title}
      </h2>
    </div>
  );
}
