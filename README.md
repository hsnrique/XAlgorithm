# X Algorithm

A plain-language walkthrough of the open-source [X For You feed algorithm](https://github.com/xai-org/x-algorithm), in English and Portuguese.

Live: [xalgorithm.xyz](https://xalgorithm.xyz)

## What this is

The X For You algorithm has 8 stages. This site explains each one — in 5 minutes, without jargon — and links every cited file to the real source on GitHub.

- **8 stages**, each as its own page with a plain explanation, a real-world analogy, and a "deeper" section
- **Two locales**, English (default) and Portuguese, with full path-preserving switching
- **Per-stage Open Graph images** generated programmatically, so each shared link previews with its own stage number and title
- **Every cited file path** is a clickable link to the upstream `xai-org/x-algorithm` repo

## Stack

- Next.js 16 (App Router, Turbopack, React Compiler)
- React 19
- Tailwind CSS v4
- TypeScript
- `next/og` for dynamic image generation (favicon + OG images)

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/en`.

## Build & deploy

```bash
pnpm build
pnpm start
```

The build produces 21 prerendered static routes (2 locales × 1 landing + 16 stage pages + scaffolding) plus dynamic Open Graph image endpoints.

### Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://xalgorithm.xyz` | Used as `metadataBase` for absolute URLs in OG/Twitter/`hreflang` tags |

## Project structure

```
app/
├ icon.tsx                          ← favicon, generated from the logo
├ not-found.tsx                     ← global 404
├ globals.css
├ [lang]/
│  ├ layout.tsx                     ← root layout per locale (owns <html lang>)
│  ├ page.tsx                       ← landing
│  ├ not-found.tsx                  ← locale-aware 404
│  ├ opengraph-image.tsx            ← per-locale landing OG image
│  └ stages/[slug]/
│     ├ page.tsx                    ← per-stage detail
│     └ opengraph-image.tsx         ← per-stage OG image (unique per stage)
├ components/
│  ├ logo.tsx
│  ├ diagram.tsx
│  ├ site-header.tsx
│  ├ locale-switcher.tsx
│  ├ share-button.tsx
│  ├ stage-card.tsx
│  └ file-paths.tsx                 ← turns cited paths into GitHub links
└ lib/
   ├ locales.ts
   ├ site.ts                        ← SITE_URL, creator info, upstream repo
   ├ content.ts                     ← types + getters
   ├ content-en.ts                  ← English content (default locale)
   └ content-pt.ts                  ← Portuguese content
```

## Adding or editing content

All displayed strings live in [`app/lib/content-en.ts`](app/lib/content-en.ts) and [`app/lib/content-pt.ts`](app/lib/content-pt.ts). Both files share the same shape — edit either to update a paragraph, and remember to keep the other locale in sync.

Each stage has these fields:

| Field | Purpose |
|---|---|
| `slug` | URL segment (kebab-case) |
| `number` | 1–8 |
| `title` | Stage heading |
| `summary` | One-liner used in the TL;DR list and the OG image |
| `plain` | Main paragraph |
| `analogy` | Optional analogy block |
| `underTheHood` | What's actually happening, technically |
| `file` | Cited path(s) from the upstream repo, separated by ` · ` — auto-linked to GitHub |
| `details` | Extra paragraphs shown only on the stage detail page |

## Credits

Built by [Henrique Martins](https://github.com/hsnrique). Source material from [xai-org/x-algorithm](https://github.com/xai-org/x-algorithm).
# Xalgorithm
