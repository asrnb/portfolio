import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0d0d0d",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(74, 222, 128, 0.18), transparent 50%)",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "#4ade80",
          }}
        >
          April Suarnaba
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 64,
            fontWeight: 700,
            color: "#f5f5f5",
            lineHeight: 1.15,
          }}
        >
          AI Engineer
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            color: "#a3a3a3",
            maxWidth: 880,
            lineHeight: 1.4,
          }}
        >
          AI-powered dashboards, automation workflows, API integrations, and full-stack web applications.
        </div>
      </div>
    ),
    { ...size },
  )
}
