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

interface SearchingMemoryMapVisualizerProps {
  algorithmId: string;
}

type HeapEntryKind = "array";

type HeapEntryStatus = "alive";

interface HeapEntry {
  id: string;
  kind: HeapEntryKind;
  label: string;
  value: number[];
  status: HeapEntryStatus;
  highlights?: number[];
  eliminatedIndexes?: number[];
}

interface StackFrame {
  id: string;
  fn: string;
  locals: Record<string, string | number | null>;
}

interface MemoryStep {
  stack: StackFrame[];
  heap: HeapEntry[];
  message: string;
  target: number;
  foundIndex?: number;
}

type DetailLevel = "simple" | "detailed";

function cloneHeap(heap: HeapEntry[]): HeapEntry[] {
  return heap.map((h) => ({
    ...h,
    value: h.value.slice(),
    highlights: h.highlights?.slice(),
    eliminatedIndexes: h.eliminatedIndexes?.slice(),
  }));
}

function cloneStack(stack: StackFrame[]): StackFrame[] {
  return stack.map((f) => ({
    ...f,
    locals: { ...f.locals },
  }));
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatPtr(id: string): string {
  return `@${id}`;
}

function isPtr(value: unknown): value is string {
  return typeof value === "string" && value.startsWith("@");
}

function ptrId(ptr: string): string {
  return ptr.slice(1);
}

function heapLabelById(heap: HeapEntry[], id: string): string {
  return heap.find((h) => h.id === id)?.label ?? id;
}

function describeLocalValue(value: string | number | null, heap: HeapEntry[]) {
  if (value === null) return { text: "null", hint: null as string | null };
  if (typeof value === "number") {
    return { text: String(value), hint: "number" };
  }
  if (isPtr(value)) {
    const id = ptrId(value);
    const label = heapLabelById(heap, id);
    return { text: `${label} (heap)`, hint: "reference" };
  }
  return { text: value, hint: null as string | null };
}

function makeSearchingMemorySteps(
  input: number[],
  target: number,
  algorithmId: string,
): MemoryStep[] {
  const arr = input.slice();

  const heap: HeapEntry[] = [
    {
      id: "A",
      kind: "array",
      label: "arr",
      value: arr.slice(),
      status: "alive",
      highlights: [],
      eliminatedIndexes: [],
    },
  ];

  const stack: StackFrame[] = [
    {
      id: "F0",
      fn: "search",
      locals: { arr: formatPtr("A"), target },
    },
  ];

  const steps: MemoryStep[] = [];

  const push = (message: string, foundIndex?: number) => {
    steps.push({
      stack: cloneStack(stack),
      heap: cloneHeap(heap),
      message,
      target,
      foundIndex,
    });
  };

  const setLocal = (key: string, value: string | number | null) => {
    const top = stack[stack.length - 1];
    if (!top) return;
    top.locals[key] = value;
  };

  const setHighlights = (indexes: number[]) => {
    const main = heap.find((h) => h.id === "A");
    if (main) main.highlights = indexes;
  };

  const addEliminated = (indexes: number[]) => {
    const main = heap.find((h) => h.id === "A");
    if (main) {
      const existing = main.eliminatedIndexes ?? [];
      main.eliminatedIndexes = [...new Set([...existing, ...indexes])];
    }
  };

  const clearHighlights = () => {
    const main = heap.find((h) => h.id === "A");
    if (main) main.highlights = [];
  };

  push(`Initialize: searching for target=${target} in array`);

  if (algorithmId === "linear-search") {
    stack[0]!.fn = "linearSearch";

    for (let i = 0; i < arr.length; i++) {
      setLocal("i", i);
      setHighlights([i]);
      push(`Check arr[${i}]=${arr[i]} against target=${target}`);

      if (arr[i] === target) {
        push(`Found! arr[${i}]=${arr[i]} equals target`, i);
        return steps;
      }

      addEliminated([i]);
      push(`arr[${i}]=${arr[i]} ≠ ${target}, continue to next element`);
    }

    clearHighlights();
    push(`Target ${target} not found in array`);
    return steps;
  }

  if (algorithmId === "binary-search") {
    stack[0]!.fn = "binarySearch";

    let left = 0;
    let right = arr.length - 1;

    setLocal("left", left);
    setLocal("right", right);
    push(`Initialize left=${left}, right=${right}`);

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      setLocal("mid", mid);
      setHighlights([mid]);

      // Show search range
      const rangeIndexes: number[] = [];
      for (let i = left; i <= right; i++) rangeIndexes.push(i);
      setHighlights(rangeIndexes);
      push(`Search range: [${left}..${right}], mid=${mid}`);

      setHighlights([mid]);
      push(`Compare arr[${mid}]=${arr[mid]} with target=${target}`);

      if (arr[mid] === target) {
        push(`Found! arr[${mid}]=${arr[mid]} equals target`, mid);
        return steps;
      }

      if (arr[mid] < target) {
        // Eliminate left half including mid
        const eliminated: number[] = [];
        for (let i = left; i <= mid; i++) eliminated.push(i);
        addEliminated(eliminated);

        push(`arr[${mid}]=${arr[mid]} < ${target}, search right half`);
        left = mid + 1;
        setLocal("left", left);
      } else {
        // Eliminate right half including mid
        const eliminated: number[] = [];
        for (let i = mid; i <= right; i++) eliminated.push(i);
        addEliminated(eliminated);

        push(`arr[${mid}]=${arr[mid]} > ${target}, search left half`);
        right = mid - 1;
        setLocal("right", right);
      }
    }

    clearHighlights();
    push(`Target ${target} not found (left > right)`);
    return steps;
  }

  if (algorithmId === "jump-search") {
    stack[0]!.fn = "jumpSearch";

    const n = arr.length;
    const step = Math.floor(Math.sqrt(n));

    setLocal("n", n);
    setLocal("step", step);
    push(`Initialize: n=${n}, step size=√${n}≈${step}`);

    let prev = 0;
    let curr = 0;
    setLocal("prev", prev);
    setLocal("curr", curr);

    // Jump phase
    while (curr < n && arr[curr] < target) {
      setHighlights([curr]);
      push(`Jump: check arr[${curr}]=${arr[curr]} against target=${target}`);

      if (arr[curr] >= target) {
        break;
      }

      // Eliminate jumped block
      const eliminated: number[] = [];
      for (let i = prev; i < curr; i++) eliminated.push(i);
      if (eliminated.length > 0) {
        addEliminated(eliminated);
        push(`Block [${prev}..${curr - 1}] eliminated (all values < target)`);
      }

      prev = curr;
      curr = Math.min(curr + step, n - 1);
      setLocal("prev", prev);
      setLocal("curr", curr);

      // If we've reached the end
      if (prev === curr && arr[curr] < target) {
        addEliminated([curr]);
        break;
      }
    }

    // Linear search phase
    const searchEnd = Math.min(curr, n - 1);
    push(`Linear search in block [${prev}..${searchEnd}]`);

    for (let i = prev; i <= searchEnd; i++) {
      // Skip already eliminated
      const main = heap.find((h) => h.id === "A");
      if (main?.eliminatedIndexes?.includes(i)) continue;

      setLocal("i", i);
      setHighlights([i]);
      push(`Linear: check arr[${i}]=${arr[i]} against target=${target}`);

      if (arr[i] === target) {
        push(`Found! arr[${i}]=${arr[i]} equals target`, i);
        return steps;
      }

      addEliminated([i]);

      if (arr[i] > target) {
        push(`arr[${i}]=${arr[i]} > ${target}, target cannot be further`);
        break;
      }

      push(`arr[${i}]=${arr[i]} ≠ ${target}, continue linear search`);
    }

    clearHighlights();
    push(`Target ${target} not found in array`);
    return steps;
  }

  push("Memory map not yet implemented for this searching algorithm.");
  return steps;
}

export function SearchingMemoryMapVisualizer({
  algorithmId,
}: SearchingMemoryMapVisualizerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState([50]);
  const [arraySize, setArraySize] = useState([12]);
  const [currentStep, setCurrentStep] = useState(0);

  const [detailLevel, setDetailLevel] = useState<DetailLevel>("simple");

  const stepsRef = useRef<MemoryStep[]>([]);
  const timeoutRef = useRef<number | null>(null);

  const [seedArray, setSeedArray] = useState<number[]>([]);
  const [target, setTarget] = useState<number>(0);
  const [stepView, setStepView] = useState<MemoryStep | null>(null);

  const generateArray = useCallback(() => {
    const size = arraySize[0] ?? 12;

    let newArray: number[];
    if (algorithmId === "linear-search") {
      // Unsorted for linear search
      newArray = Array.from({ length: size }, () => randomInt(5, 99));
    } else {
      // Sorted for binary and jump search
      newArray = [];
      let current = randomInt(1, 5);
      for (let i = 0; i < size; i++) {
        newArray.push(current);
        current += randomInt(2, 8);
      }
    }

    // Pick target
    const shouldExist = Math.random() > 0.15;
    let newTarget: number;
    if (shouldExist && newArray.length > 0) {
      newTarget = newArray[Math.floor(Math.random() * newArray.length)];
    } else {
      newTarget = randomInt(1, 100);
      while (newArray.includes(newTarget)) {
        newTarget = randomInt(1, 100);
      }
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setIsPlaying(false);
    setCurrentStep(0);
    stepsRef.current = [];
    setSeedArray(newArray);
    setTarget(newTarget);
    setStepView(null);
  }, [arraySize, algorithmId]);

  useEffect(() => {
    generateArray();
  }, [generateArray]);

  const ensureSteps = useCallback(() => {
    if (stepsRef.current.length > 0) return stepsRef.current;

    const steps = makeSearchingMemorySteps(seedArray, target, algorithmId);
    stepsRef.current = steps;
    setStepView(steps[0] ?? null);
    return steps;
  }, [algorithmId, seedArray, target]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const steps = ensureSteps();
    if (steps.length === 0) {
      setIsPlaying(false);
      return;
    }

    if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    const delay = Math.max(100, 500 - (speed[0] ?? 50) * 4);
    const id = window.setTimeout(() => {
      const next = Math.min(currentStep + 1, steps.length - 1);
      setCurrentStep(next);
      setStepView(steps[next] ?? null);
    }, delay);

    timeoutRef.current = id;
    return () => {
      window.clearTimeout(id);
    };
  }, [currentStep, ensureSteps, isPlaying, speed]);

  const handlePlay = useCallback(() => {
    const steps = ensureSteps();
    if (steps.length === 0) return;
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
      setStepView(steps[0] ?? null);
    }
    setIsPlaying(true);
  }, [currentStep, ensureSteps]);

  const handleStepForward = useCallback(() => {
    const steps = ensureSteps();
    setCurrentStep((prev) => {
      const next = Math.min(prev + 1, steps.length - 1);
      setStepView(steps[next] ?? null);
      return next;
    });
  }, [ensureSteps]);

  const handleStepBackward = useCallback(() => {
    handlePause();
    const steps = ensureSteps();
    setCurrentStep((prev) => {
      const next = Math.max(0, prev - 1);
      setStepView(steps[next] ?? null);
      return next;
    });
  }, [ensureSteps, handlePause]);

  const handleReset = useCallback(() => {
    handlePause();
    generateArray();
  }, [generateArray, handlePause]);

  const totalSteps = stepsRef.current.length;

  const containerStyle = {
    backgroundColor: "rgba(var(--foreground), 0.02)",
    border: "1px solid rgba(var(--foreground), 0.08)",
  } as const;

  const active = stepView;

  const mainHeap = useMemo(() => {
    return active?.heap.find((h) => h.id === "A") ?? null;
  }, [active]);

  const topFrame = useMemo(() => {
    if (!active) return null;
    return active.stack[active.stack.length - 1] ?? null;
  }, [active]);

  const isFound = active?.foundIndex !== undefined;

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
                Target Value
              </p>
              <p
                className="text-2xl font-semibold font-mono"
                style={{ color: "rgb(141, 118, 233)" }}
              >
                {target}
              </p>
            </div>
          </div>

          {isFound && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
            >
              Found at index {active.foundIndex}
            </motion.div>
          )}
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
            onValueChange={(v) => setArraySize(v)}
            min={5}
            max={20}
            step={1}
            className="flex-1"
          />
          <span className="text-sm w-8 text-right" style={{ opacity: 0.7 }}>
            {arraySize[0]}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm whitespace-nowrap" style={{ opacity: 0.7 }}>
            View
          </span>
          <div
            className="inline-flex gap-1 p-1 rounded-xl"
            style={{
              backgroundColor: "rgba(var(--background), 0.28)",
              border: "1px solid rgba(var(--foreground), 0.08)",
            }}
            role="tablist"
            aria-label="Memory map detail"
          >
            <Button
              type="button"
              variant={detailLevel === "simple" ? "default" : "ghost"}
              onClick={() => setDetailLevel("simple")}
              className="h-8 px-3"
              role="tab"
              aria-selected={detailLevel === "simple"}
            >
              Simple
            </Button>
            <Button
              type="button"
              variant={detailLevel === "detailed" ? "default" : "ghost"}
              onClick={() => setDetailLevel("detailed")}
              className="h-8 px-3"
              role="tab"
              aria-selected={detailLevel === "detailed"}
            >
              Detailed
            </Button>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div
        className="rounded-2xl p-5"
        style={{
          background:
            "linear-gradient(135deg, rgba(141, 118, 233, 0.10) 0%, rgba(200, 180, 255, 0.06) 100%)",
          border: "1px solid rgba(141, 118, 233, 0.18)",
        }}
      >
        <div className="space-y-2">
          <p className="text-sm" style={{ opacity: 0.85 }}>
            Quick guide: <span className="font-medium">Stack</span> = local
            variables,
            <span className="font-medium"> Heap</span> = array data.
          </p>
          <p className="text-xs" style={{ opacity: 0.72 }}>
            Watch how pointers like <span className="font-medium">left</span>,{" "}
            <span className="font-medium">right</span>, and{" "}
            <span className="font-medium">mid</span> narrow down the search
            space.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <div
              className="rounded-lg px-2 py-1 text-xs"
              style={{
                backgroundColor: "rgba(141, 118, 233, 0.10)",
                border: "1px solid rgba(141, 118, 233, 0.18)",
              }}
            >
              Purple = active frame
            </div>
            <div
              className="rounded-lg px-2 py-1 text-xs"
              style={{
                backgroundColor: "rgba(245, 158, 11, 0.16)",
                border: "1px solid rgba(245, 158, 11, 0.30)",
              }}
            >
              Yellow = checking
            </div>
            <div
              className="rounded-lg px-2 py-1 text-xs"
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.16)",
                border: "1px solid rgba(16, 185, 129, 0.30)",
              }}
            >
              Green = found
            </div>
            <div
              className="rounded-lg px-2 py-1 text-xs"
              style={{
                backgroundColor: "rgba(156, 163, 175, 0.20)",
                border: "1px solid rgba(156, 163, 175, 0.30)",
              }}
            >
              Gray = eliminated
            </div>
          </div>
        </div>
      </div>

      {/* Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stack */}
        <div className="rounded-2xl p-6" style={containerStyle}>
          <h3
            className="text-lg font-semibold mb-4"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Stack
          </h3>

          {!active ? (
            <div className="text-sm" style={{ opacity: 0.7 }}>
              Press play to generate steps.
            </div>
          ) : (
            <div className="space-y-4">
              <div
                className="rounded-xl p-4"
                style={{
                  backgroundColor: "rgba(141, 118, 233, 0.10)",
                  border: "1px solid rgba(141, 118, 233, 0.18)",
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium">
                    {topFrame?.fn ?? "?"}()
                  </div>
                  <div className="text-xs" style={{ opacity: 0.7 }}>
                    Variables
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(topFrame?.locals ?? {}).map(([k, v]) => {
                    const described = describeLocalValue(v, active.heap);
                    const isPointer = k === "arr";

                    return (
                      <div
                        key={k}
                        className="rounded-lg px-2 py-2"
                        style={{
                          backgroundColor: "rgba(var(--background), 0.35)",
                          border: "1px solid rgba(var(--foreground), 0.06)",
                        }}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span style={{ opacity: 0.75 }}>{k}</span>
                          {described.hint ? (
                            <span
                              className="text-[10px]"
                              style={{ opacity: 0.6 }}
                            >
                              {described.hint}
                            </span>
                          ) : null}
                        </div>
                        <div
                          className={cn(
                            "mt-1 text-sm",
                            isPointer && "font-mono",
                          )}
                          style={{ opacity: 0.9 }}
                        >
                          {described.text}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {detailLevel === "detailed" && active.stack.length > 1 && (
                <div className="space-y-3">
                  <div className="text-xs" style={{ opacity: 0.6 }}>
                    Call Stack (newest on top)
                  </div>
                  {[...active.stack]
                    .slice()
                    .reverse()
                    .slice(1)
                    .map((frame) => (
                      <div
                        key={frame.id}
                        className="rounded-xl p-4"
                        style={{
                          backgroundColor: "rgba(var(--foreground), 0.03)",
                          border: "1px solid rgba(var(--foreground), 0.08)",
                        }}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-sm font-medium">
                            {frame.fn}()
                          </div>
                          <div className="text-xs" style={{ opacity: 0.7 }}>
                            {frame.id}
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                          {Object.entries(frame.locals).map(([k, v]) => (
                            <div
                              key={k}
                              className="rounded-lg px-2 py-1"
                              style={{
                                backgroundColor:
                                  "rgba(var(--background), 0.35)",
                                border:
                                  "1px solid rgba(var(--foreground), 0.06)",
                              }}
                            >
                              <span style={{ opacity: 0.7 }}>{k}:</span>{" "}
                              <span style={{ opacity: 0.9 }}>
                                {v === null ? "null" : String(v)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Heap */}
        <div className="rounded-2xl p-6" style={containerStyle}>
          <h3
            className="text-lg font-semibold mb-4"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Heap
          </h3>

          {!active ? (
            <div className="text-sm" style={{ opacity: 0.7 }}>
              Press play to generate steps.
            </div>
          ) : (
            <div className="space-y-3">
              {mainHeap && (
                <div
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor: "rgba(141, 118, 233, 0.10)",
                    border: "1px solid rgba(141, 118, 233, 0.18)",
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium">
                        {mainHeap.label}{" "}
                        {detailLevel === "detailed" ? (
                          <span style={{ opacity: 0.65 }}>
                            ({formatPtr(mainHeap.id)})
                          </span>
                        ) : null}
                      </div>
                      <div className="text-xs" style={{ opacity: 0.7 }}>
                        {algorithmId === "linear-search"
                          ? "Unsorted Array"
                          : "Sorted Array"}
                      </div>
                    </div>
                    <div className="text-xs" style={{ opacity: 0.7 }}>
                      len={mainHeap.value.length}
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {mainHeap.value.map((v, idx) => {
                      const isHighlighted = mainHeap.highlights?.includes(idx);
                      const isEliminated =
                        mainHeap.eliminatedIndexes?.includes(idx);
                      const isFoundCell = active.foundIndex === idx;
                      const isTargetValue = v === target;

                      return (
                        <motion.div
                          key={idx}
                          layout
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-xs relative"
                          style={{
                            backgroundColor: isFoundCell
                              ? "rgba(16, 185, 129, 0.25)"
                              : isHighlighted
                                ? "rgba(245, 158, 11, 0.22)"
                                : isEliminated
                                  ? "rgba(156, 163, 175, 0.15)"
                                  : "rgba(var(--background), 0.45)",
                            border: isFoundCell
                              ? "1px solid rgba(16, 185, 129, 0.50)"
                              : isHighlighted
                                ? "1px solid rgba(245, 158, 11, 0.45)"
                                : isTargetValue && !isEliminated
                                  ? "2px dashed rgba(141, 118, 233, 0.5)"
                                  : "1px solid rgba(var(--foreground), 0.06)",
                            color: isEliminated
                              ? "rgba(var(--foreground), 0.4)"
                              : "rgb(var(--foreground))",
                            opacity: isEliminated ? 0.6 : 1,
                          }}
                        >
                          <div className="relative w-full h-full flex items-center justify-center">
                            <span
                              className="absolute left-1 top-0.5 text-[9px]"
                              style={{ opacity: 0.45 }}
                            >
                              {idx}
                            </span>
                            <span
                              className={cn(
                                isFoundCell && "font-bold text-emerald-600",
                                isEliminated && "line-through",
                              )}
                            >
                              {v}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Status */}
      <div
        className="rounded-2xl p-5"
        style={{
          backgroundColor: isFound
            ? "rgba(16, 185, 129, 0.08)"
            : "rgba(var(--foreground), 0.02)",
          border: isFound
            ? "1px solid rgba(16, 185, 129, 0.20)"
            : "1px solid rgba(var(--foreground), 0.08)",
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div
            className={cn("text-sm", isFound && "text-emerald-600 font-medium")}
            style={{ opacity: isFound ? 1 : 0.85 }}
          >
            {active?.message ?? "Ready."}
          </div>
          <div className="text-sm" style={{ opacity: 0.7 }}>
            Step {totalSteps > 0 ? currentStep + 1 : 0} / {totalSteps || "?"}
          </div>
        </div>
      </div>
    </div>
  );
}
