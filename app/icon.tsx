import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          borderRadius: 6,
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24">
          <circle cx="4" cy="12" r="2.5" fill="#fafafa" />
          <line
            x1="6.5"
            y1="12"
            x2="9.5"
            y2="12"
            stroke="#fafafa"
            strokeWidth="1.4"
          />
          <circle cx="12" cy="12" r="2.5" fill="#fafafa" />
          <line
            x1="14.5"
            y1="12"
            x2="17.5"
            y2="12"
            stroke="#fafafa"
            strokeWidth="1.4"
          />
          <circle cx="20" cy="12" r="2.5" fill="#fafafa" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
