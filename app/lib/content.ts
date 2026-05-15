import type { Locale } from "./locales";
import { content as contentEn } from "./content-en";
import { content as contentPt } from "./content-pt";

export type Stage = {
  slug: string;
  number: number;
  title: string;
  summary: string;
  plain: string;
  analogy?: string;
  underTheHood: string;
  file: string;
  details: string[];
};

export type UIStrings = {
  kicker: string;
  title: string;
  intro: string;
  readTime: string;
  startReading: string;
  tldrTitle: string;
  diagramTitle: string;
  diagramNodes: [string, string, string, string, string];
  stagesTitle: string;
  bigIdeaTitle: string;
  bigIdeaBody: [string, string];
  shareCtaTitle: string;
  shareCtaBody: string;
  footerSource: string;
  viewSource: string;
  stepLabel: string;
  createdBy: string;
  underTheHood: string;
  readMore: string;
  previous: string;
  next: string;
  backToOverview: string;
  share: string;
  copied: string;
  localeName: string;
  switchToOther: string;
  detailsTitle: string;
  notFoundTitle: string;
  notFoundBody: string;
};

export type LocaleContent = {
  ui: UIStrings;
  stages: Stage[];
};

const REGISTRY: Record<Locale, LocaleContent> = {
  en: contentEn,
  pt: contentPt,
};

export function getContent(locale: Locale): LocaleContent {
  return REGISTRY[locale];
}

export function getStage(locale: Locale, slug: string): Stage | undefined {
  return REGISTRY[locale].stages.find((s) => s.slug === slug);
}

export function getAdjacentStages(locale: Locale, slug: string) {
  const list = REGISTRY[locale].stages;
  const index = list.findIndex((s) => s.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return {
    previous: index > 0 ? list[index - 1] : undefined,
    next: index < list.length - 1 ? list[index + 1] : undefined,
  };
}

export function getAllStageSlugs(): string[] {
  return contentEn.stages.map((s) => s.slug);
}
