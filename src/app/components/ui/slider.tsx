"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface SliderProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "type"
> {
  value: number[];
  onValueChange: (value: number[]) => void;
}

export function Slider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className,
  disabled,
  ...props
}: SliderProps) {
  const currentValue = value[0] ?? 0;
  const clampedMax = typeof max === "number" ? max : 100;
  const clampedMin = typeof min === "number" ? min : 0;
  const percent =
    clampedMax === clampedMin
      ? 0
      : ((currentValue - clampedMin) / (clampedMax - clampedMin)) * 100;

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={currentValue}
      disabled={disabled}
      onChange={(e) => {
        const next = Number(e.target.value);
        onValueChange([next]);
      }}
      className={cn("algo-slider", disabled && "opacity-60", className)}
      style={{
        background: `linear-gradient(90deg, rgb(var(--secondary)) 0%, rgb(var(--secondary)) ${percent}%, rgb(var(--foreground) / 0.14) ${percent}%, rgb(var(--foreground) / 0.14) 100%)`,
      }}
      {...props}
    />
  );
}
