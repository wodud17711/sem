"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import {
  hexToRgb,
  hslToRgb,
  rgbToHex,
  rgbToHsl,
} from "@/lib/calculators/color";

export function Calculator() {
  const [hex, setHex] = useState("#3366cc");
  const [r, setR] = useState(51);
  const [g, setG] = useState(102);
  const [b, setB] = useState(204);
  const [h, setH] = useState(220);
  const [s, setS] = useState(60);
  const [l, setL] = useState(50);
  const [editing, setEditing] = useState<"hex" | "rgb" | "hsl">("hex");

  useEffect(() => {
    if (editing !== "hex") return;
    const rgb = hexToRgb(hex);
    if (!rgb) return;
    setR(rgb.r);
    setG(rgb.g);
    setB(rgb.b);
    const hsl = rgbToHsl(rgb);
    setH(hsl.h);
    setS(hsl.s);
    setL(hsl.l);
  }, [hex, editing]);

  useEffect(() => {
    if (editing !== "rgb") return;
    const rgb = { r, g, b };
    setHex(rgbToHex(rgb));
    const hsl = rgbToHsl(rgb);
    setH(hsl.h);
    setS(hsl.s);
    setL(hsl.l);
  }, [r, g, b, editing]);

  useEffect(() => {
    if (editing !== "hsl") return;
    const rgb = hslToRgb({ h, s, l });
    setR(rgb.r);
    setG(rgb.g);
    setB(rgb.b);
    setHex(rgbToHex(rgb));
  }, [h, s, l, editing]);

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
              onFocus={() => setEditing("hex")}
              onChange={(e) => {
                let val = e.target.value;
                if (!val.startsWith("#")) val = `#${val}`;
                setHex(val);
              }}
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
                onFocus={() => setEditing("rgb")}
                onChange={(e) =>
                  setR(Math.min(255, Math.max(0, parseInt(e.target.value, 10) || 0)))
                }
                aria-label="빨강 (R)"
              />
              <Input
                type="number"
                min={0}
                max={255}
                value={g}
                onFocus={() => setEditing("rgb")}
                onChange={(e) =>
                  setG(Math.min(255, Math.max(0, parseInt(e.target.value, 10) || 0)))
                }
                aria-label="초록 (G)"
              />
              <Input
                type="number"
                min={0}
                max={255}
                value={b}
                onFocus={() => setEditing("rgb")}
                onChange={(e) =>
                  setB(Math.min(255, Math.max(0, parseInt(e.target.value, 10) || 0)))
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
                onFocus={() => setEditing("hsl")}
                onChange={(e) =>
                  setH(Math.min(360, Math.max(0, parseInt(e.target.value, 10) || 0)))
                }
                aria-label="색상 (H)"
              />
              <Input
                type="number"
                min={0}
                max={100}
                value={s}
                onFocus={() => setEditing("hsl")}
                onChange={(e) =>
                  setS(Math.min(100, Math.max(0, parseInt(e.target.value, 10) || 0)))
                }
                aria-label="채도 (S)"
              />
              <Input
                type="number"
                min={0}
                max={100}
                value={l}
                onFocus={() => setEditing("hsl")}
                onChange={(e) =>
                  setL(Math.min(100, Math.max(0, parseInt(e.target.value, 10) || 0)))
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
