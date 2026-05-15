import { ImageResponse } from "next/og";
import { isLocale } from "../../../lib/locales";
import { getContent, getStage } from "../../../lib/content";

export const alt = "A step in the X For You algorithm";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function StageOpenGraphImage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = isLocale(lang) ? lang : "en";
  const { ui } = getContent(locale);
  const stage = getStage(locale, slug);

  if (!stage) {
    return new ImageResponse(<Fallback title={ui.title} />, { ...size });
  }

  return new ImageResponse(
    (
      <div style={frameStyle}>
        <header style={headerRow}>
          <Mark />
          <span style={{ fontSize: 26, fontWeight: 600, letterSpacing: -0.4 }}>
            X Algorithm
          </span>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <p style={kickerStyle}>
            {ui.stepLabel} {String(stage.number).padStart(2, "0")} / 08
          </p>
          <h1 style={titleStyle}>{stage.title}</h1>
          <p style={summaryStyle}>{stage.summary}</p>
        </div>

        <footer style={footerRow}>
          <span>{ui.title}</span>
          <span>{ui.readTime}</span>
        </footer>
      </div>
    ),
    { ...size },
  );
}

function Fallback({ title }: { title: string }) {
  return (
    <div style={frameStyle}>
      <Mark />
      <h1 style={titleStyle}>{title}</h1>
    </div>
  );
}

function Mark() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24">
      <circle cx="4" cy="12" r="2.5" fill="#fafafa" />
      <line x1="6.5" y1="12" x2="9.5" y2="12" stroke="#fafafa" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="2.5" fill="#fafafa" />
      <line x1="14.5" y1="12" x2="17.5" y2="12" stroke="#fafafa" strokeWidth="1.4" />
      <circle cx="20" cy="12" r="2.5" fill="#fafafa" />
    </svg>
  );
}

const frameStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-between" as const,
  padding: "72px",
  background: "#0a0a0a",
  color: "#fafafa",
  fontFamily: "system-ui, -apple-system, sans-serif",
};

const headerRow = {
  display: "flex",
  alignItems: "center",
  gap: 16,
};

const kickerStyle = {
  fontSize: 22,
  color: "#a1a1aa",
  textTransform: "uppercase" as const,
  letterSpacing: 3,
  margin: 0,
};

const titleStyle = {
  fontSize: 84,
  fontWeight: 600,
  letterSpacing: -2.5,
  lineHeight: 1.05,
  margin: 0,
  maxWidth: 1000,
};

const summaryStyle = {
  fontSize: 28,
  color: "#d4d4d8",
  margin: 0,
  maxWidth: 980,
  lineHeight: 1.35,
};

const footerRow = {
  display: "flex",
  justifyContent: "space-between" as const,
  fontSize: 22,
  color: "#a1a1aa",
};
