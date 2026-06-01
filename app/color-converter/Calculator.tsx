"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import {
  hexToRgb,
  hslToRgb,
  rgbToHex,
  rgbToHsl,
} from "@/lib/calculators/color";

const clamp = (value: string, max: number) =>
  Math.min(max, Math.max(0, parseInt(value, 10) || 0));

export function Calculator() {
  const [hex, setHex] = useState("#3366cc");
  const [r, setR] = useState(51);
  const [g, setG] = useState(102);
  const [b, setB] = useState(204);
  const [h, setH] = useState(220);
  const [s, setS] = useState(60);
  const [l, setL] = useState(50);

  // 한 표현이 바뀌면 나머지 표현을 즉시 맞춘다 (effect 없이 핸들러에서 직접 동기화).
  function syncFromRgb(rgb: { r: number; g: number; b: number }) {
    setR(rgb.r);
    setG(rgb.g);
    setB(rgb.b);
    setHex(rgbToHex(rgb));
    const hsl = rgbToHsl(rgb);
    setH(hsl.h);
    setS(hsl.s);
    setL(hsl.l);
  }

  function handleHexChange(value: string) {
    const next = value.startsWith("#") ? value : `#${value}`;
    setHex(next);
    const rgb = hexToRgb(next);
    if (rgb) syncFromRgb(rgb);
  }

  function handleHslChange(next: { h: number; s: number; l: number }) {
    setH(next.h);
    setS(next.s);
    setL(next.l);
    syncFromRgb(hslToRgb(next));
  }

  return (
    <section
      aria-label="색상 코드 변환기"
      className="rounded-xl border border-border bg-background p-6 sm:p-8"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <div>
          <p className="text-sm font-medium text-foreground">미리보기</p>
          <div
            className="mt-2 h-48 w-full rounded-xl border border-border"
            style={{ backgroundColor: hex }}
            aria-label={`현재 색상 ${hex}`}
          />
          <p className="mt-3 text-center font-mono text-lg font-semibold tracking-wider">
            {hex.toUpperCase()}
          </p>
        </div>

        <div className="grid gap-5">
          <div>
            <label className="block text-sm font-medium text-foreground">
              HEX
            </label>
            <Input
              type="text"
              value={hex}
              onChange={(e) => handleHexChange(e.target.value)}
              className="mt-2 font-mono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">
              RGB
            </label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <Input
                type="number"
                min={0}
                max={255}
                value={r}
                onChange={(e) =>
                  syncFromRgb({ r: clamp(e.target.value, 255), g, b })
                }
                aria-label="빨강 (R)"
              />
              <Input
                type="number"
                min={0}
                max={255}
                value={g}
                onChange={(e) =>
                  syncFromRgb({ r, g: clamp(e.target.value, 255), b })
                }
                aria-label="초록 (G)"
              />
              <Input
                type="number"
                min={0}
                max={255}
                value={b}
                onChange={(e) =>
                  syncFromRgb({ r, g, b: clamp(e.target.value, 255) })
                }
                aria-label="파랑 (B)"
              />
            </div>
            <p className="mt-1 font-mono text-sm text-muted-foreground">
              rgb({r}, {g}, {b})
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">
              HSL
            </label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <Input
                type="number"
                min={0}
                max={360}
                value={h}
                onChange={(e) =>
                  handleHslChange({ h: clamp(e.target.value, 360), s, l })
                }
                aria-label="색상 (H)"
              />
              <Input
                type="number"
                min={0}
                max={100}
                value={s}
                onChange={(e) =>
                  handleHslChange({ h, s: clamp(e.target.value, 100), l })
                }
                aria-label="채도 (S)"
              />
              <Input
                type="number"
                min={0}
                max={100}
                value={l}
                onChange={(e) =>
                  handleHslChange({ h, s, l: clamp(e.target.value, 100) })
                }
                aria-label="밝기 (L)"
              />
            </div>
            <p className="mt-1 font-mono text-sm text-muted-foreground">
              hsl({h}, {s}%, {l}%)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
