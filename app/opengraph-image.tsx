import { ImageResponse } from "next/og"
import { env } from "@/lib/env"

export const runtime = "edge"
export const alt = "Abid Ali — Custom CMS, Web & Browser Extensions"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1e1b4b 50%, #082f49 100%)",
          color: "white",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -120,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
            opacity: 0.5,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -120,
            right: -120,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
            opacity: 0.4,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, fontWeight: 700 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "white",
              color: "#0a0a0a",
              fontFamily: "Georgia, serif",
              fontSize: 32,
            }}
          >
            A
          </div>
          {env.siteName}
        </div>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 24 }}>
          <h1
            style={{
              fontSize: 96,
              lineHeight: 1.05,
              margin: 0,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              fontFamily: "Georgia, serif",
              maxWidth: 1000,
            }}
          >
            Custom software, shipped with proof.
          </h1>
          <p style={{ fontSize: 28, color: "#cbd5e1", margin: 0, maxWidth: 900 }}>
            Custom CMS · Full-stack web · Chrome extensions · 100% job success on Upwork
          </p>
        </div>
      </div>
    ),
    { ...size },
  )
}
