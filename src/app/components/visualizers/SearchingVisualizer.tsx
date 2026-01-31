"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Pause,
  Play,
  RotateCcw,
  SkipBack,
  SkipForward,
  Search,
} from "lucide-react";

import { Button } from "@/app/components/ui/button";
import { Slider } from "@/app/components/ui/slider";
import { cn } from "@/lib/utils";

interface SearchingVisualizerProps {
  algorithmId: string;
}

type CellState =
  | "default"
  | "checking"
  | "found"
  | "eliminated"
  | "current-range"
  | "jump-block";

interface ArrayCell {
  value: number;
  state: CellState;
  originalIndex: number;
}

function cloneCells(cells: ArrayCell[]): ArrayCell[] {
  return cells.map((cell) => ({ ...cell }));
}

function resetStates(cells: ArrayCell[]): void {
  for (const cell of cells) {
    if (cell.state !== "found" && cell.state !== "eliminated") {
      cell.state = "default";
    }
  }
}

function markStates(
  cells: ArrayCell[],
  indexes: number[],
  state: CellState,
): void {
  for (const idx of indexes) {
    if (idx >= 0 && idx < cells.length) {
      cells[idx].state = state;
    }
  }
}

function markRange(
  cells: ArrayCell[],
  start: number,
  end: number,
  state: CellState,
): void {
  for (let i = start; i <= end && i < cells.length; i++) {
    if (cells[i].state !== "found") {
      cells[i].state = state;
    }
  }
}

export function SearchingVisualizer({ algorithmId }: SearchingVisualizerProps) {
  const [array, setArray] = useState<ArrayCell[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState([55]);
  const [arraySize, setArraySize] = useState([15]);
  const [currentStep, setCurrentStep] = useState(0);
  const [target, setTarget] = useState<number>(0);
  const [targetFound, setTargetFound] = useState<boolean | null>(null);
  const [foundIndex, setFoundIndex] = useState<number | null>(null);

  const stepsRef = useRef<ArrayCell[][]>([]);
  const timeoutRef = useRef<number | null>(null);
  const targetRef = useRef<number>(0);

  const generateArray = useCallback(() => {
    const size = arraySize[0] ?? 15;

    // Generate sorted array for binary/jump search, unsorted for linear
    const values: number[] = [];
    if (algorithmId === "linear-search") {
      // Generate random unsorted array
      for (let i = 0; i < size; i++) {
        values.push(Math.floor(Math.random() * 100) + 1);
      }
    } else {
      // Generate sorted array for binary and jump search
      let current = Math.floor(Math.random() * 5) + 1;
      for (let i = 0; i < size; i++) {
        values.push(current);
        current += Math.floor(Math.random() * 8) + 2;
      }
    }

    const newArray: ArrayCell[] = values.map((value, index) => ({
      value,
      state: "default" as const,
      originalIndex: index,
    }));

    // Pick a target (either in array or sometimes not)
    const shouldExist = Math.random() > 0.15;
    let newTarget: number;
    if (shouldExist && values.length > 0) {
      newTarget = values[Math.floor(Math.random() * values.length)];
    } else {
      // Pick a value not in array
      newTarget = Math.floor(Math.random() * 100) + 1;
      while (values.includes(newTarget)) {
        newTarget = Math.floor(Math.random() * 100) + 1;
      }
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsPlaying(false);

    stepsRef.current = [];
    setCurrentStep(0);
    setArray(newArray);
    setTarget(newTarget);
    targetRef.current = newTarget;
    setTargetFound(null);
    setFoundIndex(null);
  }, [arraySize, algorithmId]);

  useEffect(() => {
    generateArray();
  }, [generateArray]);

  const generateSearchSteps = useCallback(() => {
    const working = array.map((cell) => ({
      ...cell,
      state: "default" as CellState,
    }));
    const steps: ArrayCell[][] = [cloneCells(working)];
    const searchTarget = targetRef.current;

    const push = () => steps.push(cloneCells(working));

    if (algorithmId === "linear-search") {
      for (let i = 0; i < working.length; i++) {
        // Reset previous states except eliminated
        for (let j = 0; j < working.length; j++) {
          if (
            working[j].state !== "eliminated" &&
            working[j].state !== "found"
          ) {
            working[j].state = "default";
          }
        }

        // Mark current element being checked
        working[i].state = "checking";
        push();

        if (working[i].value === searchTarget) {
          working[i].state = "found";
          push();
          return steps;
        }

        // Mark as eliminated
        working[i].state = "eliminated";
        push();
      }

      // Target not found
      return steps;
    }

    if (algorithmId === "binary-search") {
      let left = 0;
      let right = working.length - 1;

      while (left <= right) {
        // Reset states and show current search range
        for (let i = 0; i < working.length; i++) {
          if (
            working[i].state !== "eliminated" &&
            working[i].state !== "found"
          ) {
            working[i].state =
              i >= left && i <= right ? "current-range" : "eliminated";
          }
        }
        push();

        const mid = Math.floor((left + right) / 2);

        // Highlight middle element being checked
        working[mid].state = "checking";
        push();

        if (working[mid].value === searchTarget) {
          working[mid].state = "found";
          push();
          return steps;
        }

        if (working[mid].value < searchTarget) {
          // Eliminate left half including mid
          for (let i = left; i <= mid; i++) {
            working[i].state = "eliminated";
          }
          left = mid + 1;
        } else {
          // Eliminate right half including mid
          for (let i = mid; i <= right; i++) {
            working[i].state = "eliminated";
          }
          right = mid - 1;
        }
        push();
      }

      return steps;
    }

    if (algorithmId === "jump-search") {
      const n = working.length;
      const jumpSize = Math.floor(Math.sqrt(n));
      let prev = 0;
      let curr = 0;

      // Jump phase
      while (curr < n && working[curr].value < searchTarget) {
        // Reset states
        for (let i = 0; i < working.length; i++) {
          if (
            working[i].state !== "eliminated" &&
            working[i].state !== "found"
          ) {
            working[i].state = "default";
          }
        }

        // Highlight the jump block
        for (let i = prev; i <= Math.min(curr, n - 1); i++) {
          if (working[i].state !== "eliminated") {
            working[i].state = "jump-block";
          }
        }
        working[curr].state = "checking";
        push();

        if (working[curr].value >= searchTarget) {
          break;
        }

        // Mark jumped-over block as eliminated if value at curr is less than target
        for (let i = prev; i < curr; i++) {
          working[i].state = "eliminated";
        }

        prev = curr;
        curr = Math.min(curr + jumpSize, n - 1);

        // If we've reached the end
        if (prev === curr) {
          if (working[curr].value < searchTarget) {
            working[curr].state = "eliminated";
          }
          break;
        }

        push();
      }

      // Linear search phase in the identified block
      const searchEnd = Math.min(curr, n - 1);

      for (let i = prev; i <= searchEnd; i++) {
        if (working[i].state === "eliminated") continue;

        // Reset non-eliminated states in block
        for (let j = prev; j <= searchEnd; j++) {
          if (
            working[j].state !== "eliminated" &&
            working[j].state !== "found"
          ) {
            working[j].state = "current-range";
          }
        }

        working[i].state = "checking";
        push();

        if (working[i].value === searchTarget) {
          working[i].state = "found";
          push();
          return steps;
        }

        working[i].state = "eliminated";
        push();

        // If we've passed the target value (array is sorted)
        if (working[i].value > searchTarget) {
          break;
        }
      }

      return steps;
    }

    return steps;
  }, [array, algorithmId]);

  const maxValue = useMemo(() => {
    return Math.max(1, ...array.map((c) => c.value));
  }, [array]);

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
      stepsRef.current = generateSearchSteps();
    }

    const steps = stepsRef.current;
    if (steps.length === 0) {
      setIsPlaying(false);
      return;
    }

    if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
      // Check final state
      const finalArray = steps[steps.length - 1];
      const foundCell = finalArray.find((c) => c.state === "found");
      setTargetFound(foundCell !== undefined);
      setFoundIndex(foundCell ? foundCell.originalIndex : null);
      return;
    }

    const delay = Math.max(50, 400 - (speed[0] ?? 55) * 3.5);
    const id = window.setTimeout(() => {
      const next = currentStep + 1;
      if (next >= steps.length) {
        setIsPlaying(false);
        return;
      }
      setCurrentStep(next);
      setArray(steps[next]);

      // Check if found in this step
      const foundCell = steps[next].find((c) => c.state === "found");
      if (foundCell) {
        setTargetFound(true);
        setFoundIndex(foundCell.originalIndex);
      }
    }, delay);

    timeoutRef.current = id;
    return () => {
      window.clearTimeout(id);
    };
  }, [currentStep, generateSearchSteps, isPlaying, speed]);

  const handlePlay = useCallback(() => {
    if (stepsRef.current.length === 0) {
      stepsRef.current = generateSearchSteps();
      setArray(stepsRef.current[0] ?? array);
      setCurrentStep(0);
    }
    setTargetFound(null);
    setFoundIndex(null);
    setIsPlaying(true);
  }, [array, generateSearchSteps]);

  const handleStepForward = useCallback(() => {
    if (stepsRef.current.length === 0) {
      stepsRef.current = generateSearchSteps();
    }

    setCurrentStep((prev) => {
      const next = Math.min(prev + 1, stepsRef.current.length - 1);
      const nextArray = stepsRef.current[next] ?? array;
      setArray(nextArray);

      // Check if found
      const foundCell = nextArray.find((c) => c.state === "found");
      if (foundCell) {
        setTargetFound(true);
        setFoundIndex(foundCell.originalIndex);
      } else if (next === stepsRef.current.length - 1) {
        setTargetFound(false);
        setFoundIndex(null);
      }

      return next;
    });
  }, [array, generateSearchSteps]);

  const handleStepBackward = useCallback(() => {
    handlePause();
    setCurrentStep((prev) => {
      const next = Math.max(0, prev - 1);
      setArray(stepsRef.current[next] ?? array);
      setTargetFound(null);
      setFoundIndex(null);
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

  const algorithmInfo = useMemo(() => {
    switch (algorithmId) {
      case "linear-search":
        return {
          name: "Linear Search",
          description:
            "Checks each element sequentially until the target is found",
          sorted: false,
        };
      case "binary-search":
        return {
          name: "Binary Search",
          description:
            "Divides sorted array in half repeatedly to find the target",
          sorted: true,
        };
      case "jump-search":
        return {
          name: "Jump Search",
          description:
            "Jumps ahead by √n steps, then performs linear search in block",
          sorted: true,
        };
      default:
        return {
          name: "Search",
          description: "",
          sorted: false,
        };
    }
  }, [algorithmId]);

  return (
    <div className="space-y-6">
      {/* Target Display */}
      <div className="rounded-2xl p-5" style={containerStyle}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(141, 118, 233, 0.12)",
                border: "1px solid rgba(141, 118, 233, 0.25)",
              }}
            >
              <Search
                className="w-5 h-5"
                style={{ color: "rgb(141, 118, 233)" }}
              />
            </div>
            <div>
              <p className="text-sm" style={{ opacity: 0.7 }}>
                Searching for
              </p>
              <p
                className="text-2xl font-semibold font-mono"
                style={{ color: "rgb(141, 118, 233)" }}
              >
                {target}
              </p>
            </div>
          </div>

          {targetFound !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium",
                targetFound
                  ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                  : "bg-rose-500/15 text-rose-500 border border-rose-500/30",
              )}
            >
              {targetFound
                ? `Found at index ${foundIndex}`
                : "Not found in array"}
            </motion.div>
          )}

          <div className="text-right">
            <p className="text-xs" style={{ opacity: 0.5 }}>
              {algorithmInfo.sorted ? "Sorted Array" : "Unsorted Array"}
            </p>
            <p className="text-sm" style={{ opacity: 0.7 }}>
              {algorithmInfo.description}
            </p>
          </div>
        </div>
      </div>

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
            max={30}
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
        <div className="flex items-end justify-center gap-1 h-64">
          {array.map((cell, index) => {
            const widthPct = Math.max(100 / Math.max(array.length, 1) - 1, 2);
            const isTarget = cell.value === target;

            return (
              <div
                key={index}
                className="flex flex-col items-center justify-end h-full"
                style={{ width: `${widthPct}%` }}
              >
                <motion.div
                  layout
                  initial={false}
                  animate={{ height: `${(cell.value / maxValue) * 85}%` }}
                  transition={{ duration: 0.15 }}
                  className={cn(
                    "w-full rounded-t-sm transition-colors duration-150 relative",
                    cell.state === "default" &&
                      "bg-[rgb(var(--secondary))] opacity-80",
                    cell.state === "checking" && "bg-amber-400",
                    cell.state === "found" && "bg-emerald-500",
                    cell.state === "eliminated" && "bg-gray-400/40",
                    cell.state === "current-range" && "bg-blue-400/70",
                    cell.state === "jump-block" && "bg-purple-400/60",
                  )}
                >
                  {isTarget && cell.state !== "found" && (
                    <div
                      className="absolute inset-0 rounded-t-sm border-2 border-dashed"
                      style={{ borderColor: "rgb(141, 118, 233)" }}
                    />
                  )}
                </motion.div>

                <div
                  className={cn(
                    "mt-1 text-[9px] sm:text-[10px] leading-none tabular-nums select-none font-mono",
                    cell.state === "found" && "font-bold text-emerald-500",
                    cell.state === "eliminated" && "opacity-40",
                  )}
                  style={{ opacity: cell.state === "eliminated" ? 0.4 : 0.7 }}
                >
                  {cell.value}
                </div>

                <div
                  className="text-[8px] tabular-nums"
                  style={{ opacity: 0.4 }}
                >
                  [{index}]
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div
          className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs"
          style={{ opacity: 0.7 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[rgb(var(--secondary))] opacity-80" />
            <span>Default</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-amber-400" />
            <span>Checking</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-emerald-500" />
            <span>Found</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gray-400/40" />
            <span>Eliminated</span>
          </div>
          {algorithmId !== "linear-search" && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-400/70" />
              <span>Search Range</span>
            </div>
          )}
          {algorithmId === "jump-search" && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-purple-400/60" />
              <span>Jump Block</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded border-2 border-dashed"
              style={{ borderColor: "rgb(141, 118, 233)" }}
            />
            <span>Target</span>
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
