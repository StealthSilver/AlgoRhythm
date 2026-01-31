"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play, RotateCcw, SkipBack, SkipForward } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import { Slider } from "@/app/components/ui/slider";
import { cn } from "@/lib/utils";

interface SortingVisualizerProps {
  algorithmId: string;
}

type BarState = "default" | "comparing" | "swapping" | "sorted";

interface ArrayBar {
  value: number;
  state: BarState;
}

function cloneBars(bars: ArrayBar[]): ArrayBar[] {
  return bars.map((bar) => ({ ...bar }));
}

function resetStates(bars: ArrayBar[]): void {
  for (const bar of bars) {
    if (bar.state !== "sorted") bar.state = "default";
  }
}

function markStates(
  bars: ArrayBar[],
  indexes: number[],
  state: BarState,
): void {
  for (const idx of indexes) {
    if (idx >= 0 && idx < bars.length) bars[idx].state = state;
  }
}

export function SortingVisualizer({ algorithmId }: SortingVisualizerProps) {
  const [array, setArray] = useState<ArrayBar[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState([55]);
  const [arraySize, setArraySize] = useState([20]);
  const [currentStep, setCurrentStep] = useState(0);

  const stepsRef = useRef<ArrayBar[][]>([]);
  const timeoutRef = useRef<number | null>(null);

  const generateArray = useCallback(() => {
    const size = arraySize[0] ?? 20;
    const newArray: ArrayBar[] = Array.from({ length: size }, () => ({
      value: Math.floor(Math.random() * 100) + 5,
      state: "default" as const,
    }));

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsPlaying(false);

    stepsRef.current = [];
    setCurrentStep(0);
    setArray(newArray);
  }, [arraySize]);

  useEffect(() => {
    generateArray();
  }, [generateArray]);

  const generateSortingSteps = useCallback(() => {
    const working = array.map((bar) => ({
      ...bar,
      state: "default" as BarState,
    }));
    const steps: ArrayBar[][] = [cloneBars(working)];

    const push = () => steps.push(cloneBars(working));

    const finalizeAllSorted = () => {
      for (const bar of working) bar.state = "sorted";
      push();
    };

    const swap = (i: number, j: number) => {
      [working[i], working[j]] = [working[j], working[i]];
    };

    if (algorithmId === "bubble-sort") {
      for (let i = 0; i < working.length - 1; i++) {
        for (let j = 0; j < working.length - i - 1; j++) {
          resetStates(working);
          markStates(working, [j, j + 1], "comparing");
          push();

          if (working[j].value > working[j + 1].value) {
            resetStates(working);
            markStates(working, [j, j + 1], "swapping");
            push();

            swap(j, j + 1);
            push();
          }

          resetStates(working);
        }
        working[working.length - 1 - i].state = "sorted";
        push();
      }
      if (working.length > 0) {
        working[0].state = "sorted";
        push();
      }
      return steps;
    }

    if (algorithmId === "insertion-sort") {
      for (let i = 1; i < working.length; i++) {
        const key = { ...working[i] };

        resetStates(working);
        markStates(working, [i], "comparing");
        push();

        let j = i - 1;
        while (j >= 0 && working[j].value > key.value) {
          resetStates(working);
          markStates(working, [j, j + 1], "swapping");
          push();

          working[j + 1] = { ...working[j] };
          push();

          j--;
        }
        working[j + 1] = { ...key, state: "default" };
        resetStates(working);
        push();
      }
      finalizeAllSorted();
      return steps;
    }

    if (algorithmId === "selection-sort") {
      for (let i = 0; i < working.length - 1; i++) {
        let minIdx = i;

        resetStates(working);
        markStates(working, [i], "comparing");
        push();

        for (let j = i + 1; j < working.length; j++) {
          resetStates(working);
          markStates(working, [minIdx, j], "comparing");
          push();

          if (working[j].value < working[minIdx].value) {
            minIdx = j;
            resetStates(working);
            markStates(working, [minIdx], "comparing");
            push();
          }
        }

        if (minIdx !== i) {
          resetStates(working);
          markStates(working, [i, minIdx], "swapping");
          push();

          swap(i, minIdx);
          push();
        }

        resetStates(working);
        working[i].state = "sorted";
        push();
      }

      if (working.length > 0) {
        resetStates(working);
        working[working.length - 1].state = "sorted";
        push();
      }
      return steps;
    }

    if (algorithmId === "quick-sort") {
      const quickSort = (low: number, high: number) => {
        if (low > high) return;
        if (low === high) {
          working[low].state = "sorted";
          push();
          return;
        }

        const pivotValue = working[high].value;
        resetStates(working);
        markStates(working, [high], "comparing");
        push();

        let i = low - 1;
        for (let j = low; j < high; j++) {
          resetStates(working);
          markStates(working, [j, high], "comparing");
          push();

          if (working[j].value < pivotValue) {
            i++;
            resetStates(working);
            markStates(working, [i, j], "swapping");
            push();

            swap(i, j);
            push();
          }
        }

        resetStates(working);
        markStates(working, [i + 1, high], "swapping");
        push();

        swap(i + 1, high);
        working[i + 1].state = "sorted";
        push();

        quickSort(low, i);
        quickSort(i + 2, high);
      };

      quickSort(0, working.length - 1);
      finalizeAllSorted();
      return steps;
    }

    if (algorithmId === "merge-sort") {
      const merge = (left: number, mid: number, right: number) => {
        const leftSlice = working.slice(left, mid + 1).map((b) => ({ ...b }));
        const rightSlice = working
          .slice(mid + 1, right + 1)
          .map((b) => ({ ...b }));

        let i = 0;
        let j = 0;
        let k = left;

        while (i < leftSlice.length && j < rightSlice.length) {
          resetStates(working);
          markStates(working, [k], "swapping");
          push();

          const pickLeft = leftSlice[i].value <= rightSlice[j].value;
          if (pickLeft) {
            working[k] = { value: leftSlice[i].value, state: "swapping" };
            i++;
          } else {
            working[k] = { value: rightSlice[j].value, state: "swapping" };
            j++;
          }
          push();
          k++;
        }

        while (i < leftSlice.length) {
          resetStates(working);
          markStates(working, [k], "swapping");
          push();

          working[k] = { value: leftSlice[i].value, state: "swapping" };
          push();
          i++;
          k++;
        }

        while (j < rightSlice.length) {
          resetStates(working);
          markStates(working, [k], "swapping");
          push();

          working[k] = { value: rightSlice[j].value, state: "swapping" };
          push();
          j++;
          k++;
        }
      };

      const mergeSort = (left: number, right: number) => {
        if (left >= right) return;
        const mid = Math.floor((left + right) / 2);
        mergeSort(left, mid);
        mergeSort(mid + 1, right);

        resetStates(working);
        markStates(working, [left, mid, right], "comparing");
        push();

        merge(left, mid, right);
      };

      mergeSort(0, working.length - 1);
      finalizeAllSorted();
      return steps;
    }

    if (algorithmId === "heap-sort") {
      const heapify = (n: number, i: number) => {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n) {
          resetStates(working);
          markStates(working, [i, left], "comparing");
          push();
          if (working[left].value > working[largest].value) {
            largest = left;
          }
        }

        if (right < n) {
          resetStates(working);
          markStates(working, [largest, right], "comparing");
          push();
          if (working[right].value > working[largest].value) {
            largest = right;
          }
        }

        if (largest !== i) {
          resetStates(working);
          markStates(working, [i, largest], "swapping");
          push();

          swap(i, largest);
          push();

          heapify(n, largest);
        }
      };

      const n = working.length;

      // Build max heap
      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(n, i);
      }

      // Extract elements one by one
      for (let end = n - 1; end > 0; end--) {
        resetStates(working);
        markStates(working, [0, end], "swapping");
        push();

        swap(0, end);
        working[end].state = "sorted";
        push();

        heapify(end, 0);
      }

      if (n > 0) {
        working[0].state = "sorted";
        push();
      }

      finalizeAllSorted();
      return steps;
    }

    // Fallback (should not happen for current sorting list)
    finalizeAllSorted();
    return steps;
  }, [array, algorithmId]);

  const maxValue = useMemo(() => {
    return Math.max(1, ...array.map((b) => b.value));
  }, [array]);

  const referenceTicks = useMemo(() => {
    const top = maxValue;
    const mid = Math.round(maxValue / 2);
    return [top, mid, 0] as const;
  }, [maxValue]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    if (stepsRef.current.length === 0) {
      stepsRef.current = generateSortingSteps();
    }

    const steps = stepsRef.current;
    if (steps.length === 0) {
      setIsPlaying(false);
      return;
    }

    if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    const delay = Math.max(12, 210 - (speed[0] ?? 55) * 2);
    const id = window.setTimeout(() => {
      const next = currentStep + 1;
      if (next >= steps.length) {
        setIsPlaying(false);
        return;
      }
      setCurrentStep(next);
      setArray(steps[next]);
    }, delay);

    timeoutRef.current = id;
    return () => {
      window.clearTimeout(id);
    };
  }, [currentStep, generateSortingSteps, isPlaying, speed]);

  const handlePlay = useCallback(() => {
    if (stepsRef.current.length === 0) {
      stepsRef.current = generateSortingSteps();
      setArray(stepsRef.current[0] ?? array);
      setCurrentStep(0);
    }
    setIsPlaying(true);
  }, [array, generateSortingSteps]);

  const handleStepForward = useCallback(() => {
    if (stepsRef.current.length === 0) {
      stepsRef.current = generateSortingSteps();
    }

    setCurrentStep((prev) => {
      const next = Math.min(prev + 1, stepsRef.current.length - 1);
      setArray(stepsRef.current[next] ?? array);
      return next;
    });
  }, [array, generateSortingSteps]);

  const handleStepBackward = useCallback(() => {
    handlePause();
    setCurrentStep((prev) => {
      const next = Math.max(0, prev - 1);
      setArray(stepsRef.current[next] ?? array);
      return next;
    });
  }, [array, handlePause]);

  const handleReset = useCallback(() => {
    handlePause();
    generateArray();
  }, [generateArray, handlePause]);

  const totalSteps = stepsRef.current.length;

  const containerStyle = {
    backgroundColor: "rgba(var(--foreground), 0.02)",
    border: "1px solid rgba(var(--foreground), 0.08)",
  } as const;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div
        className="rounded-2xl p-5 flex flex-wrap items-center gap-4"
        style={containerStyle}
      >
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleStepBackward}
            disabled={currentStep === 0}
            aria-label="Step backward"
          >
            <SkipBack className="w-4 h-4" />
          </Button>

          <Button
            variant="default"
            size="icon"
            onClick={isPlaying ? handlePause : handlePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleStepForward}
            disabled={totalSteps > 0 ? currentStep >= totalSteps - 1 : false}
            aria-label="Step forward"
          >
            <SkipForward className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleReset}
            aria-label="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-3 flex-1 min-w-55">
          <span className="text-sm whitespace-nowrap" style={{ opacity: 0.7 }}>
            Speed
          </span>
          <Slider
            value={speed}
            onValueChange={setSpeed}
            min={1}
            max={100}
            step={1}
            className="flex-1"
          />
        </div>

        <div className="flex items-center gap-3 flex-1 min-w-55">
          <span className="text-sm whitespace-nowrap" style={{ opacity: 0.7 }}>
            Size
          </span>
          <Slider
            value={arraySize}
            onValueChange={(v) => {
              setArraySize(v);
            }}
            min={5}
            max={50}
            step={1}
            className="flex-1"
          />
          <span className="text-sm w-8 text-right" style={{ opacity: 0.7 }}>
            {arraySize[0]}
          </span>
        </div>
      </div>

      {/* Visualization */}
      <div className="rounded-2xl p-6" style={containerStyle}>
        <div className="relative">
          {/* Reference scale */}
          <div
            className="absolute inset-y-0 left-0 w-9 flex flex-col justify-between text-[10px] tabular-nums"
            style={{ opacity: 0.6 }}
            aria-hidden="true"
          >
            {referenceTicks.map((tick, idx) => (
              <div key={`${tick}-${idx}`} className="leading-none">
                {tick}
              </div>
            ))}
          </div>

          <div className="pl-9">
            <div className="flex items-end justify-center gap-1 h-64">
              {array.map((bar, index) => {
                const widthPct = Math.max(
                  100 / Math.max(array.length, 1) - 1,
                  1.8,
                );

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-end h-full"
                    style={{ width: `${widthPct}%` }}
                  >
                    <motion.div
                      layout
                      initial={false}
                      animate={{ height: `${(bar.value / maxValue) * 100}%` }}
                      transition={{ duration: 0.12 }}
                      className={cn(
                        "w-full rounded-t-sm transition-colors duration-100",
                        bar.state === "default" &&
                          "bg-[rgb(var(--secondary))] opacity-80",
                        bar.state === "comparing" && "bg-amber-400",
                        bar.state === "swapping" && "bg-rose-500",
                        bar.state === "sorted" && "bg-emerald-500",
                      )}
                    />

                    <div
                      className="mt-1 text-[9px] sm:text-[10px] leading-none tabular-nums select-none"
                      style={{ opacity: 0.7 }}
                      aria-label={`Value ${bar.value}`}
                    >
                      {bar.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div
          className="mt-4 flex flex-wrap items-center justify-center gap-5 text-xs"
          style={{ opacity: 0.7 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[rgb(var(--secondary))] opacity-80" />
            <span>Default</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-amber-400" />
            <span>Comparing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-rose-500" />
            <span>Swapping</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-emerald-500" />
            <span>Sorted</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="text-center text-sm" style={{ opacity: 0.7 }}>
        Step {currentStep} of {totalSteps > 0 ? totalSteps - 1 : "?"}
      </div>
    </div>
  );
}
