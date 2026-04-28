import { ImageResponse } from "next/og";

export const alt = "셈 - 계산기와 실용 도구 모음";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "80px 96px",
        background: "#ffffff",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
        }}
      >
        <svg
          width={56}
          height={56}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="2" y="2" width="28" height="28" rx="5.5" fill="#09090b" />
          <rect
            x="7"
            y="7"
            width="18"
            height="7"
            rx="1.5"
            fill="none"
            stroke="#fafafa"
            strokeWidth="2"
          />
          <circle cx="11" cy="22" r="1.75" fill="#fafafa" />
          <circle cx="16" cy="22" r="1.75" fill="#fafafa" />
          <circle cx="21" cy="22" r="1.75" fill="#fafafa" />
        </svg>
        <span
          style={{
            fontSize: 56,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: "#09090b",
          }}
        >
          셈
        </span>
      </div>
      <div
        style={{
          marginTop: 48,
          fontSize: 76,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1.1,
          color: "#09090b",
          maxWidth: 900,
          display: "flex",
        }}
      >
        한국어 실용 계산기, 한 곳에.
      </div>
      <div
        style={{
          marginTop: 28,
          fontSize: 30,
          fontWeight: 500,
          color: "#71717a",
          maxWidth: 900,
          display: "flex",
        }}
      >
        연봉·퇴직금·4대보험·부동산 세금까지 20개 도구
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 80,
          right: 96,
          fontSize: 24,
          fontWeight: 600,
          color: "#a1a1aa",
        }}
      >
        sem.kr
      </div>
    </div>,
    { ...size },
  );
}
