import { ImageResponse } from "next/og";
import { isLocale } from "../lib/locales";
import { getContent } from "../lib/content";

export const alt = "How the X For You algorithm works";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "en";
  const { ui } = getContent(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Mark />
          <span style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.5 }}>
            X Algorithm
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <p
            style={{
              fontSize: 22,
              color: "#a1a1aa",
              textTransform: "uppercase",
              letterSpacing: 3,
              margin: 0,
            }}
          >
            {ui.kicker}
          </p>
          <h1
            style={{
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: -2,
              margin: 0,
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            {ui.title}
          </h1>
        </div>
        <p style={{ fontSize: 24, color: "#a1a1aa", margin: 0 }}>
          {ui.readTime}
        </p>
      </div>
    ),
    { ...size },
  );
}

function Mark() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24">
      <circle cx="4" cy="12" r="2.5" fill="#fafafa" />
      <line x1="6.5" y1="12" x2="9.5" y2="12" stroke="#fafafa" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="2.5" fill="#fafafa" />
      <line x1="14.5" y1="12" x2="17.5" y2="12" stroke="#fafafa" strokeWidth="1.2" />
      <circle cx="20" cy="12" r="2.5" fill="#fafafa" />
    </svg>
  );
}
