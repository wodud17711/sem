"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const pad = (n: number, w = 2) => String(n).padStart(w, "0");

function formatKoreanLocal(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function formatKoreanReadable(d: Date): string {
  return `${d.getFullYear()}년 ${pad(d.getMonth() + 1)}월 ${pad(d.getDate())}일 ${pad(d.getHours())}시 ${pad(d.getMinutes())}분 ${pad(d.getSeconds())}초`;
}

function parseLocal(input: string): Date | null {
  const m = input.match(/^(\d{4})-(\d{2})-(\d{2})(?: (\d{2}):(\d{2})(?::(\d{2}))?)?$/);
  if (!m) return null;
  const [, y, mo, d, h, mi, s] = m;
  const date = new Date(
    Number(y),
    Number(mo) - 1,
    Number(d),
    h ? Number(h) : 0,
    mi ? Number(mi) : 0,
    s ? Number(s) : 0,
  );
  return Number.isNaN(date.getTime()) ? null : date;
}

export function Calculator() {
  const [date, setDate] = useState<Date>(() => new Date());
  const [unixSecText, setUnixSecText] = useState("");
  const [unixMsText, setUnixMsText] = useState("");
  const [isoText, setIsoText] = useState("");
  const [localText, setLocalText] = useState("");
  const [editingField, setEditingField] = useState<string | null>(null);

  useEffect(() => {
    if (editingField === "unixSec") return;
    setUnixSecText(String(Math.floor(date.getTime() / 1000)));
  }, [date, editingField]);
  useEffect(() => {
    if (editingField === "unixMs") return;
    setUnixMsText(String(date.getTime()));
  }, [date, editingField]);
  useEffect(() => {
    if (editingField === "iso") return;
    setIsoText(date.toISOString());
  }, [date, editingField]);
  useEffect(() => {
    if (editingField === "local") return;
    setLocalText(formatKoreanLocal(date));
  }, [date, editingField]);

  const readable = useMemo(() => formatKoreanReadable(date), [date]);
  const utcReadable = useMemo(
    () =>
      `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(
        date.getUTCDate(),
      )} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())} UTC`,
    [date],
  );

  return (
    <section
      aria-label="타임스탬프 변환기"
      className="rounded-xl border border-border bg-background p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => setDate(new Date())}
        >
          현재 시각
        </Button>
        <span className="text-sm text-muted-foreground">{readable}</span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="unix-sec"
            className="block text-sm font-medium text-foreground"
          >
            Unix 타임스탬프 (초)
          </label>
          <Input
            id="unix-sec"
            type="text"
            inputMode="numeric"
            value={unixSecText}
            onFocus={() => setEditingField("unixSec")}
            onBlur={() => setEditingField(null)}
            onChange={(e) => {
              setUnixSecText(e.target.value);
              const n = parseInt(e.target.value, 10);
              if (Number.isFinite(n)) setDate(new Date(n * 1000));
            }}
            className="mt-2 font-mono"
          />
        </div>
        <div>
          <label
            htmlFor="unix-ms"
            className="block text-sm font-medium text-foreground"
          >
            Unix 타임스탬프 (밀리초)
          </label>
          <Input
            id="unix-ms"
            type="text"
            inputMode="numeric"
            value={unixMsText}
            onFocus={() => setEditingField("unixMs")}
            onBlur={() => setEditingField(null)}
            onChange={(e) => {
              setUnixMsText(e.target.value);
              const n = parseInt(e.target.value, 10);
              if (Number.isFinite(n)) setDate(new Date(n));
            }}
            className="mt-2 font-mono"
          />
        </div>
        <div>
          <label
            htmlFor="iso"
            className="block text-sm font-medium text-foreground"
          >
            ISO 8601 (UTC)
          </label>
          <Input
            id="iso"
            type="text"
            value={isoText}
            onFocus={() => setEditingField("iso")}
            onBlur={() => setEditingField(null)}
            onChange={(e) => {
              setIsoText(e.target.value);
              const d = new Date(e.target.value);
              if (!Number.isNaN(d.getTime())) setDate(d);
            }}
            className="mt-2 font-mono"
          />
        </div>
        <div>
          <label
            htmlFor="local"
            className="block text-sm font-medium text-foreground"
          >
            한국 시간 (KST)
          </label>
          <Input
            id="local"
            type="text"
            value={localText}
            onFocus={() => setEditingField("local")}
            onBlur={() => setEditingField(null)}
            onChange={(e) => {
              setLocalText(e.target.value);
              const d = parseLocal(e.target.value);
              if (d) setDate(d);
            }}
            placeholder="YYYY-MM-DD HH:mm:ss"
            className="mt-2 font-mono"
          />
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-border bg-muted/30 p-4 text-sm">
        <p className="font-medium text-foreground">기타 형식</p>
        <ul className="mt-2 space-y-1 text-muted-foreground">
          <li>· UTC: {utcReadable}</li>
          <li>· 한국어: {readable}</li>
          <li>· 요일: {date.toLocaleDateString("ko-KR", { weekday: "long" })}</li>
        </ul>
      </div>
    </section>
  );
}
