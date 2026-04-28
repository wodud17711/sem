"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import { calcDrinkDriving, type Sex } from "@/lib/calculators/drink-driving";

const PRESETS = [
  { label: "소주 1잔", volumeMl: 50, abvPercent: 17 },
  { label: "소주 1병", volumeMl: 360, abvPercent: 17 },
  { label: "맥주 1캔(500ml)", volumeMl: 500, abvPercent: 4.5 },
  { label: "맥주 500cc", volumeMl: 500, abvPercent: 4.5 },
  { label: "와인 1잔(150ml)", volumeMl: 150, abvPercent: 12 },
  { label: "위스키 샷", volumeMl: 30, abvPercent: 40 },
];

const formatHours = (h: number) => {
  if (h === 0) return "지금 운전 가능 추정";
  const totalMin = Math.ceil(h * 60);
  const hh = Math.floor(totalMin / 60);
  const mm = totalMin % 60;
  return hh > 0 ? `${hh}시간 ${mm}분 후` : `${mm}분 후`;
};

export function Calculator() {
  const [volume, setVolume] = useState(360);
  const [abv, setAbv] = useState(17);
  const [weight, setWeight] = useState(70);
  const [sex, setSex] = useState<Sex>("male");
  const [hoursElapsed, setHoursElapsed] = useState(0);

  const result = useMemo(() => {
    if (volume <= 0 || abv <= 0 || weight <= 0) return null;
    try {
      return calcDrinkDriving({
        volumeMl: volume,
        abvPercent: abv,
        bodyWeightKg: weight,
        sex,
        hoursSinceDrinking: hoursElapsed,
      });
    } catch {
      return null;
    }
  }, [volume, abv, weight, sex, hoursElapsed]);

  const dangerLevel = result
    ? result.currentBac >= 0.08
      ? "취소"
      : result.currentBac >= 0.03
        ? "정지"
        : "기준 미만"
    : null;

  return (
    <section
      aria-label="음주 후 운전 가능 시간 계산기"
      className="rounded-xl border border-border bg-background p-6 sm:p-8"
    >
      <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-foreground/80">
        <strong className="font-semibold text-foreground">중요 안내:</strong>{" "}
        본 계산은 평균치 추정으로 개인 차가 매우 큽니다. 절대 음주 후 운전 결정에
        근거로 사용하지 마세요. 안전을 위해 음주 후에는 충분히 시간을 두거나
        대중교통·대리운전을 이용하세요.
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-foreground">
            음주량 (mL)
          </label>
          <Input
            type="number"
            min={0}
            max={5000}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value) || 0)}
            className="mt-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">
            도수 (%)
          </label>
          <Input
            type="number"
            min={0}
            max={100}
            step={0.1}
            value={abv}
            onChange={(e) => setAbv(parseFloat(e.target.value) || 0)}
            className="mt-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">
            체중 (kg)
          </label>
          <Input
            type="number"
            min={20}
            max={300}
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
            className="mt-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">
            성별
          </label>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => setSex("male")}
              className={`h-12 flex-1 rounded-lg border text-sm font-medium transition-colors ${
                sex === "male"
                  ? "border-foreground bg-accent text-accent-foreground"
                  : "border-border bg-background text-foreground hover:bg-muted"
              }`}
            >
              남성
            </button>
            <button
              type="button"
              onClick={() => setSex("female")}
              className={`h-12 flex-1 rounded-lg border text-sm font-medium transition-colors ${
                sex === "female"
                  ? "border-foreground bg-accent text-accent-foreground"
                  : "border-border bg-background text-foreground hover:bg-muted"
              }`}
            >
              여성
            </button>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-foreground">
            음주 종료 후 경과 시간 (시간)
          </label>
          <Input
            type="number"
            min={0}
            max={48}
            step={0.5}
            value={hoursElapsed}
            onChange={(e) => setHoursElapsed(parseFloat(e.target.value) || 0)}
            className="mt-2"
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-foreground">빠른 입력</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                setVolume(p.volumeMl);
                setAbv(p.abvPercent);
              }}
              className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {result && (
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">현재 추정 BAC</p>
          <p className="mt-1 text-4xl font-bold tracking-tight">
            {(result.currentBac * 100).toFixed(3)}
            <span className="ml-1 text-2xl font-semibold">%</span>
          </p>
          <p
            className={`mt-2 inline-block rounded-full border px-3 py-1 text-sm font-medium ${
              dangerLevel === "취소"
                ? "border-foreground bg-foreground text-background"
                : dangerLevel === "정지"
                  ? "border-foreground"
                  : "border-border text-muted-foreground"
            }`}
          >
            {dangerLevel === "취소"
              ? "면허 취소 기준 (0.08%) 초과"
              : dangerLevel === "정지"
                ? "면허 정지 기준 (0.03%) 초과"
                : "면허 정지 기준 미만"}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border p-4">
              <p className="text-xs text-muted-foreground">
                정지 기준(0.03%) 미만까지
              </p>
              <p className="mt-1 text-lg font-bold">
                {formatHours(result.hoursToSuspensionThreshold)}
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-xs text-muted-foreground">
                취소 기준(0.08%) 미만까지
              </p>
              <p className="mt-1 text-lg font-bold">
                {formatHours(result.hoursToRevocationThreshold)}
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            음주 직후 추정 BAC: {(result.initialBac * 100).toFixed(3)}% · 알코올
            그램 약 {result.alcoholGrams}g · 시간당 분해율 0.015% (평균치)
          </p>
        </div>
      )}
    </section>
  );
}
