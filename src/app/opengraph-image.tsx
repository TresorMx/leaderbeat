import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "LEADERBEAT.IO — Sistema Comercial para Marcas Inmobiliarias | Cancún, México";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, #0A0A0F 0%, #1a1a2e 55%, #0f0f23 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background:
              "linear-gradient(90deg, #6C63FF 0%, #9B95FF 60%, transparent 100%)",
          }}
        />

        {/* Decorative orb top-right */}
        <div
          style={{
            position: "absolute",
            right: "-120px",
            top: "-120px",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at center, rgba(108,99,255,0.18) 0%, transparent 65%)",
          }}
        />

        {/* Decorative orb bottom-left */}
        <div
          style={{
            position: "absolute",
            left: "-80px",
            bottom: "-80px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at center, rgba(155,149,255,0.08) 0%, transparent 65%)",
          }}
        />

        {/* Brand eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "44px",
          }}
        >
          <div
            style={{ width: "28px", height: "2px", background: "#6C63FF" }}
          />
          <span
            style={{
              color: "#6C63FF",
              fontSize: 12,
              letterSpacing: "0.32em",
              fontFamily: "sans-serif",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            LEADERBEAT.IO
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            color: "#ffffff",
            fontSize: 50,
            fontWeight: 700,
            lineHeight: 1.08,
            maxWidth: 720,
            fontFamily: "sans-serif",
            marginBottom: "28px",
            letterSpacing: "-0.02em",
          }}
        >
          El sistema operativo comercial de las marcas inmobiliarias modernas.
        </div>

        {/* Location + category */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              background: "rgba(108,99,255,0.15)",
              border: "1px solid rgba(108,99,255,0.3)",
              borderRadius: "100px",
              padding: "6px 16px",
              color: "#9B95FF",
              fontSize: 14,
              fontFamily: "sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            Sistema Comercial Inmobiliario
          </div>
          <span
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: 14,
              fontFamily: "sans-serif",
            }}
          >
            Cancún · México · US Hispanic
          </span>
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: 44,
            right: 80,
            color: "rgba(255,255,255,0.18)",
            fontSize: 13,
            fontFamily: "sans-serif",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          leaderbeat.io
        </div>
      </div>
    ),
    size
  );
}
