"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play, RotateCcw, SkipBack, SkipForward } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import { Slider } from "@/app/components/ui/slider";
import { cn } from "@/lib/utils";

interface MemoryMapVisualizerProps {
  algorithmId: string;
}

type HeapEntryKind = "array" | "tempArray";

type HeapEntryStatus = "alive" | "garbage";

interface HeapEntry {
  id: string;
  kind: HeapEntryKind;
  label: string;
  value: number[];
  status: HeapEntryStatus;
}

interface StackFrame {
  id: string;
  fn: string;
  locals: Record<string, string | number | null>;
}

interface MemoryHighlight {
  heapId?: string;
  arrayIndexes?: number[];
}

type GCEvent = "none" | "mark" | "sweep";

interface MemoryStep {
  stack: StackFrame[];
  heap: HeapEntry[];
  message: string;
  highlight?: MemoryHighlight;
  gcEvent?: GCEvent;
}

type DetailLevel = "simple" | "detailed";

function cloneHeap(heap: HeapEntry[]): HeapEntry[] {
  return heap.map((h) => ({
    ...h,
    value: h.value.slice(),
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

function makeSortingMemorySteps(
  input: number[],
  algorithmId: string,
): MemoryStep[] {
  const working = input.slice();

  const heap: HeapEntry[] = [
    {
      id: "A",
      kind: "array",
      label: "arr",
      value: working.slice(),
      status: "alive",
    },
  ];

  const stack: StackFrame[] = [
    {
      id: "F0",
      fn: "sort",
      locals: { arr: formatPtr("A") },
    },
  ];

  const steps: MemoryStep[] = [];

  const push = (
    message: string,
    highlight?: MemoryHighlight,
    gcEvent: GCEvent = "none",
  ) => {
    steps.push({
      stack: cloneStack(stack),
      heap: cloneHeap(heap),
      message,
      highlight,
      gcEvent,
    });
  };

  const updateMainArray = () => {
    const main = heap.find((h) => h.id === "A");
    if (main) main.value = working.slice();
  };

  const setLocal = (key: string, value: string | number | null) => {
    const top = stack[stack.length - 1];
    if (!top) return;
    top.locals[key] = value;
  };

  const swap = (i: number, j: number) => {
    [working[i], working[j]] = [working[j], working[i]];
    updateMainArray();
  };

  const sweepGarbage = () => {
    for (let i = heap.length - 1; i >= 0; i--) {
      if (heap[i]?.status === "garbage") heap.splice(i, 1);
    }
  };

  push("Heap alloc: arr created (conceptual)");

  if (algorithmId === "bubble-sort") {
    stack[0]!.fn = "bubbleSort";

    for (let i = 0; i < working.length - 1; i++) {
      setLocal("i", i);
      push(`Outer loop i=${i}`);

      for (let j = 0; j < working.length - i - 1; j++) {
        setLocal("j", j);
        push(
          `Compare arr[${j}]=${working[j]} and arr[${j + 1}]=${working[j + 1]}`,
          { heapId: "A", arrayIndexes: [j, j + 1] },
        );

        if (working[j]! > working[j + 1]!) {
          push(`Swap arr[${j}] and arr[${j + 1}]`, {
            heapId: "A",
            arrayIndexes: [j, j + 1],
          });
          swap(j, j + 1);
          push("After swap", { heapId: "A", arrayIndexes: [j, j + 1] });
        }
      }
    }

    push("Sorted (conceptual)");
    return steps;
  }

  if (algorithmId === "selection-sort") {
    stack[0]!.fn = "selectionSort";

    for (let i = 0; i < working.length - 1; i++) {
      let minIdx = i;
      setLocal("i", i);
      setLocal("minIdx", minIdx);
      push(`Select position i=${i}; set minIdx=${minIdx}`, {
        heapId: "A",
        arrayIndexes: [i],
      });

      for (let j = i + 1; j < working.length; j++) {
        setLocal("j", j);
        push(
          `Compare current min arr[${minIdx}]=${working[minIdx]} with arr[${j}]=${working[j]}`,
          { heapId: "A", arrayIndexes: [minIdx, j] },
        );
        if (working[j]! < working[minIdx]!) {
          minIdx = j;
          setLocal("minIdx", minIdx);
          push(`Update minIdx=${minIdx}`, {
            heapId: "A",
            arrayIndexes: [minIdx],
          });
        }
      }

      if (minIdx !== i) {
        push(`Swap i=${i} with minIdx=${minIdx}`, {
          heapId: "A",
          arrayIndexes: [i, minIdx],
        });
        swap(i, minIdx);
        push("After swap", { heapId: "A", arrayIndexes: [i, minIdx] });
      }
    }

    push("Sorted (conceptual)");
    return steps;
  }

  if (algorithmId === "insertion-sort") {
    stack[0]!.fn = "insertionSort";

    for (let i = 1; i < working.length; i++) {
      const key = working[i]!;
      setLocal("i", i);
      setLocal("key", key);
      push(`Take key=arr[${i}]=${key} (stored on stack)`, {
        heapId: "A",
        arrayIndexes: [i],
      });

      let j = i - 1;
      setLocal("j", j);

      while (j >= 0 && working[j]! > key) {
        push(`Shift arr[${j}]=${working[j]} right to arr[${j + 1}]`, {
          heapId: "A",
          arrayIndexes: [j, j + 1],
        });
        working[j + 1] = working[j]!;
        updateMainArray();
        push("After shift", { heapId: "A", arrayIndexes: [j, j + 1] });
        j--;
        setLocal("j", j);
      }

      push(`Insert key=${key} at index ${j + 1}`, {
        heapId: "A",
        arrayIndexes: [j + 1],
      });
      working[j + 1] = key;
      updateMainArray();
      push("After insert", { heapId: "A", arrayIndexes: [j + 1] });
    }

    push("Sorted (conceptual)");
    return steps;
  }

  if (algorithmId === "quick-sort") {
    stack[0]!.fn = "quickSort";

    const pushFrame = (
      fn: string,
      locals: Record<string, string | number | null>,
    ) => {
      stack.push({ id: `F${stack.length}`, fn, locals });
    };

    const popFrame = () => {
      stack.pop();
    };

    const quickSort = (low: number, high: number) => {
      pushFrame("quickSort", { arr: formatPtr("A"), low, high });
      push(`Call quickSort(low=${low}, high=${high})`);

      if (low >= high) {
        push("Base case; return");
        popFrame();
        return;
      }

      const pivotIndex = high;
      const pivotValue = working[pivotIndex]!;
      setLocal("pivotIndex", pivotIndex);
      setLocal("pivotValue", pivotValue);
      push(`Choose pivot arr[${pivotIndex}]=${pivotValue}`, {
        heapId: "A",
        arrayIndexes: [pivotIndex],
      });

      let i = low - 1;
      setLocal("i", i);

      for (let j = low; j < high; j++) {
        setLocal("j", j);
        push(`Compare arr[${j}]=${working[j]} with pivot=${pivotValue}`, {
          heapId: "A",
          arrayIndexes: [j, pivotIndex],
        });

        if (working[j]! < pivotValue) {
          i++;
          setLocal("i", i);
          push(`Swap to partition: swap arr[${i}] and arr[${j}]`, {
            heapId: "A",
            arrayIndexes: [i, j],
          });
          swap(i, j);
          push("After swap", { heapId: "A", arrayIndexes: [i, j] });
        }
      }

      push(`Place pivot: swap arr[${i + 1}] and arr[${pivotIndex}]`, {
        heapId: "A",
        arrayIndexes: [i + 1, pivotIndex],
      });
      swap(i + 1, pivotIndex);
      push("After placing pivot", {
        heapId: "A",
        arrayIndexes: [i + 1],
      });

      const p = i + 1;
      push(`Pivot settled at index ${p}; recurse left and right`);

      quickSort(low, p - 1);
      quickSort(p + 1, high);

      push("Return from quickSort");
      popFrame();
    };

    quickSort(0, working.length - 1);
    push("Sorted (conceptual)");
    return steps;
  }

  if (algorithmId === "merge-sort") {
    stack[0]!.fn = "mergeSort";

    let tempIdCounter = 0;

    const allocTemp = (label: string, arr: number[]) => {
      const id = `T${++tempIdCounter}`;
      heap.push({
        id,
        kind: "tempArray",
        label,
        value: arr.slice(),
        status: "alive",
      });
      return id;
    };

    const markTempGarbage = (id: string) => {
      const entry = heap.find((h) => h.id === id);
      if (entry) entry.status = "garbage";
    };

    const pushFrame = (
      fn: string,
      locals: Record<string, string | number | null>,
    ) => {
      stack.push({ id: `F${stack.length}`, fn, locals });
    };

    const popFrame = () => {
      stack.pop();
    };

    const merge = (left: number, mid: number, right: number) => {
      pushFrame("merge", { arr: formatPtr("A"), left, mid, right });

      const leftSlice = working.slice(left, mid + 1);
      const rightSlice = working.slice(mid + 1, right + 1);
      const leftId = allocTemp("leftSlice", leftSlice);
      const rightId = allocTemp("rightSlice", rightSlice);

      setLocal("leftRef", formatPtr(leftId));
      setLocal("rightRef", formatPtr(rightId));

      push(`Alloc temp arrays for merge [${left}..${right}]`, {
        heapId: "A",
        arrayIndexes: [left, right],
      });

      let i = 0;
      let j = 0;
      let k = left;
      setLocal("i", i);
      setLocal("j", j);
      setLocal("k", k);

      while (i < leftSlice.length && j < rightSlice.length) {
        const pickLeft = leftSlice[i]! <= rightSlice[j]!;
        push(
          `Merge write arr[${k}] = ${pickLeft ? `left[${i}]` : `right[${j}]`}`,
          { heapId: "A", arrayIndexes: [k] },
        );

        if (pickLeft) {
          working[k] = leftSlice[i]!;
          i++;
          setLocal("i", i);
        } else {
          working[k] = rightSlice[j]!;
          j++;
          setLocal("j", j);
        }
        updateMainArray();
        k++;
        setLocal("k", k);
        push("After write", { heapId: "A", arrayIndexes: [k - 1] });
      }

      while (i < leftSlice.length) {
        push(`Copy remaining left[${i}] into arr[${k}]`, {
          heapId: "A",
          arrayIndexes: [k],
        });
        working[k] = leftSlice[i]!;
        updateMainArray();
        i++;
        k++;
        setLocal("i", i);
        setLocal("k", k);
        push("After write", { heapId: "A", arrayIndexes: [k - 1] });
      }

      while (j < rightSlice.length) {
        push(`Copy remaining right[${j}] into arr[${k}]`, {
          heapId: "A",
          arrayIndexes: [k],
        });
        working[k] = rightSlice[j]!;
        updateMainArray();
        j++;
        k++;
        setLocal("j", j);
        setLocal("k", k);
        push("After write", { heapId: "A", arrayIndexes: [k - 1] });
      }

      push("Temp arrays out of scope → eligible for GC", undefined, "mark");
      markTempGarbage(leftId);
      markTempGarbage(rightId);
      push("GC sweep (conceptual): reclaim temp arrays", undefined, "sweep");
      sweepGarbage();

      push("Return from merge");
      popFrame();
    };

    const mergeSort = (left: number, right: number) => {
      pushFrame("mergeSort", { arr: formatPtr("A"), left, right });
      push(`Call mergeSort(left=${left}, right=${right})`);

      if (left >= right) {
        push("Base case; return");
        popFrame();
        return;
      }

      const mid = Math.floor((left + right) / 2);
      setLocal("mid", mid);
      push(`Compute mid=${mid}`);

      mergeSort(left, mid);
      mergeSort(mid + 1, right);
      merge(left, mid, right);

      push("Return from mergeSort");
      popFrame();
    };

    mergeSort(0, working.length - 1);
    push("Sorted (conceptual)");
    return steps;
  }

  if (algorithmId === "heap-sort") {
    stack[0]!.fn = "heapSort";

    const pushFrame = (
      fn: string,
      locals: Record<string, string | number | null>,
    ) => {
      stack.push({ id: `F${stack.length}`, fn, locals });
    };

    const popFrame = () => {
      stack.pop();
    };

    const heapify = (n: number, i: number) => {
      pushFrame("heapify", { arr: formatPtr("A"), n, i });

      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      setLocal("largest", largest);
      setLocal("left", left);
      setLocal("right", right);

      push(`heapify(n=${n}, i=${i})`, { heapId: "A", arrayIndexes: [i] });

      if (left < n) {
        push(`Compare left child arr[${left}] with arr[${largest}]`, {
          heapId: "A",
          arrayIndexes: [left, largest],
        });
        if (working[left]! > working[largest]!) {
          largest = left;
          setLocal("largest", largest);
          push(`Update largest=${largest}`);
        }
      }

      if (right < n) {
        push(`Compare right child arr[${right}] with arr[${largest}]`, {
          heapId: "A",
          arrayIndexes: [right, largest],
        });
        if (working[right]! > working[largest]!) {
          largest = right;
          setLocal("largest", largest);
          push(`Update largest=${largest}`);
        }
      }

      if (largest !== i) {
        push(`Swap to fix heap: swap arr[${i}] and arr[${largest}]`, {
          heapId: "A",
          arrayIndexes: [i, largest],
        });
        swap(i, largest);
        push("After swap", { heapId: "A", arrayIndexes: [i, largest] });
        popFrame();
        heapify(n, largest);
        return;
      }

      push("Heap property holds; return");
      popFrame();
    };

    const n = working.length;

    push(`Build max heap (n=${n})`);
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      setLocal("buildIdx", i);
      heapify(n, i);
    }

    push("Extract max repeatedly");
    for (let end = n - 1; end > 0; end--) {
      setLocal("end", end);
      push(`Swap max at root with arr[${end}]`, {
        heapId: "A",
        arrayIndexes: [0, end],
      });
      swap(0, end);
      push("After swap", { heapId: "A", arrayIndexes: [0, end] });
      heapify(end, 0);
    }

    push("Sorted (conceptual)");
    return steps;
  }

  push("Memory map not yet implemented for this sorting algorithm.");
  return steps;
}

export function MemoryMapVisualizer({ algorithmId }: MemoryMapVisualizerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState([50]);
  const [arraySize, setArraySize] = useState([14]);
  const [currentStep, setCurrentStep] = useState(0);

  const [detailLevel, setDetailLevel] = useState<DetailLevel>("simple");
  const [showHelperArraysInSimple, setShowHelperArraysInSimple] =
    useState(false);

  const stepsRef = useRef<MemoryStep[]>([]);
  const timeoutRef = useRef<number | null>(null);

  const [seedArray, setSeedArray] = useState<number[]>([]);
  const [stepView, setStepView] = useState<MemoryStep | null>(null);

  const generateArray = useCallback(() => {
    const size = arraySize[0] ?? 14;
    const newArray = Array.from({ length: size }, () => randomInt(5, 99));

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setIsPlaying(false);
    setCurrentStep(0);
    stepsRef.current = [];
    setSeedArray(newArray);
    setStepView(null);
  }, [arraySize]);

  useEffect(() => {
    generateArray();
  }, [generateArray]);

  const ensureSteps = useCallback(() => {
    if (stepsRef.current.length > 0) return stepsRef.current;

    const steps = makeSortingMemorySteps(seedArray, algorithmId);
    stepsRef.current = steps;
    setStepView(steps[0] ?? null);
    return steps;
  }, [algorithmId, seedArray]);

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

    const delay = Math.max(20, 260 - (speed[0] ?? 50) * 2.2);
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

  const heapPrimary = useMemo(() => {
    if (!active) return [] as HeapEntry[];
    const primary = active.heap.filter((h) => h.id === "A");
    const others = active.heap.filter((h) => h.id !== "A");
    return [...primary, ...others];
  }, [active]);

  const simpleHeapList = useMemo(() => {
    if (!active) return [] as HeapEntry[];
    const base = heapPrimary.filter((h) => h.id === "A");
    if (showHelperArraysInSimple) return heapPrimary;
    return base;
  }, [active, heapPrimary, showHelperArraysInSimple]);

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
            onValueChange={(v) => setArraySize(v)}
            min={5}
            max={30}
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
        {detailLevel === "simple" ? (
          <div className="space-y-2">
            <p className="text-sm" style={{ opacity: 0.85 }}>
              Quick guide: <span className="font-medium">Stack</span> =
              variables,
              <span className="font-medium"> Heap</span> = arrays.
            </p>
            <p className="text-xs" style={{ opacity: 0.72 }}>
              If you see <span className="font-medium">arr → heap</span>, it
              means the variable <span className="font-medium">arr</span> points
              to the array stored in the heap.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <div
                className="rounded-lg px-2 py-1 text-xs"
                style={{
                  backgroundColor: "rgba(141, 118, 233, 0.10)",
                  border: "1px solid rgba(141, 118, 233, 0.18)",
                }}
              >
                Purple = focus
              </div>
              <div
                className="rounded-lg px-2 py-1 text-xs"
                style={{
                  backgroundColor: "rgba(245, 158, 11, 0.16)",
                  border: "1px solid rgba(245, 158, 11, 0.30)",
                }}
              >
                Yellow = active indexes
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm" style={{ opacity: 0.8 }}>
            This is a conceptual memory model (stack frames, heap objects, and a
            simplified GC). Real JavaScript engines may differ, but the idea is
            to visualize what the algorithm “allocates” and how data flows.
          </p>
        )}
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
              {detailLevel === "simple" ? (
                <>
                  <div
                    className="rounded-xl p-4"
                    style={{
                      backgroundColor: "rgba(141, 118, 233, 0.10)",
                      border: "1px solid rgba(141, 118, 233, 0.18)",
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-medium">
                        Current function: {topFrame?.fn ?? "?"}()
                      </div>
                      <div className="text-xs" style={{ opacity: 0.7 }}>
                        Variables
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {Object.entries(topFrame?.locals ?? {}).map(([k, v]) => {
                        const described = describeLocalValue(v, active.heap);
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
                              className="mt-1 text-sm"
                              style={{ opacity: 0.9 }}
                            >
                              {described.text}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <details
                    className="rounded-xl p-4"
                    style={{
                      backgroundColor: "rgba(var(--foreground), 0.03)",
                      border: "1px solid rgba(var(--foreground), 0.08)",
                    }}
                  >
                    <summary
                      className="cursor-pointer text-sm"
                      style={{ opacity: 0.8 }}
                    >
                      More details: full call stack
                    </summary>
                    <div className="mt-3 space-y-3">
                      {[...active.stack]
                        .slice()
                        .reverse()
                        .map((frame, idx) => {
                          const isTop = idx === 0;
                          return (
                            <div
                              key={frame.id}
                              className={cn("rounded-xl p-4", isTop ? "" : "")}
                              style={{
                                backgroundColor: isTop
                                  ? "rgba(141, 118, 233, 0.10)"
                                  : "rgba(var(--foreground), 0.03)",
                                border: isTop
                                  ? "1px solid rgba(141, 118, 233, 0.18)"
                                  : "1px solid rgba(var(--foreground), 0.08)",
                              }}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div className="text-sm font-medium">
                                  {frame.fn}()
                                </div>
                                <div
                                  className="text-xs"
                                  style={{ opacity: 0.7 }}
                                >
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
                          );
                        })}
                    </div>
                  </details>
                </>
              ) : (
                <div className="space-y-3">
                  {[...active.stack]
                    .slice()
                    .reverse()
                    .map((frame, idx) => {
                      const isTop = idx === 0;
                      return (
                        <div
                          key={frame.id}
                          className={cn("rounded-xl p-4", isTop ? "" : "")}
                          style={{
                            backgroundColor: isTop
                              ? "rgba(141, 118, 233, 0.10)"
                              : "rgba(var(--foreground), 0.03)",
                            border: isTop
                              ? "1px solid rgba(141, 118, 233, 0.18)"
                              : "1px solid rgba(var(--foreground), 0.08)",
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
                      );
                    })}
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
              {detailLevel === "simple" &&
              active.heap.some((h) => h.id !== "A") ? (
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs" style={{ opacity: 0.7 }}>
                    Showing main array.
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowHelperArraysInSimple((v) => !v)}
                    className="h-8"
                  >
                    {showHelperArraysInSimple
                      ? "Hide helper arrays"
                      : "Show helper arrays"}
                  </Button>
                </div>
              ) : null}

              {(detailLevel === "simple" ? simpleHeapList : heapPrimary).map(
                (entry) => {
                  const isHighlighted = active.highlight?.heapId === entry.id;

                  return (
                    <div
                      key={entry.id}
                      className="rounded-xl p-4"
                      style={{
                        backgroundColor: isHighlighted
                          ? "rgba(141, 118, 233, 0.10)"
                          : "rgba(var(--foreground), 0.03)",
                        border: isHighlighted
                          ? "1px solid rgba(141, 118, 233, 0.18)"
                          : "1px solid rgba(var(--foreground), 0.08)",
                        opacity: entry.status === "garbage" ? 0.55 : 1,
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-medium">
                            {entry.label}{" "}
                            {detailLevel === "detailed" ? (
                              <span style={{ opacity: 0.65 }}>
                                ({formatPtr(entry.id)})
                              </span>
                            ) : null}
                          </div>
                          <div className="text-xs" style={{ opacity: 0.7 }}>
                            {entry.kind === "array"
                              ? "Array"
                              : detailLevel === "simple"
                                ? "Helper array"
                                : "Temp Array"}
                            {detailLevel === "detailed" ? (
                              <> · {entry.status}</>
                            ) : entry.status === "garbage" ? (
                              <> · removed</>
                            ) : null}
                          </div>
                        </div>

                        {entry.id === "A" && mainHeap ? (
                          <div className="text-xs" style={{ opacity: 0.7 }}>
                            len={mainHeap.value.length}
                          </div>
                        ) : null}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {entry.value.map((v, idx) => {
                          const isIdxHighlighted =
                            entry.id === active.highlight?.heapId &&
                            (active.highlight.arrayIndexes ?? []).includes(idx);

                          return (
                            <motion.div
                              key={idx}
                              layout
                              className="w-10 h-10 rounded-lg flex items-center justify-center text-xs"
                              style={{
                                backgroundColor: isIdxHighlighted
                                  ? "rgba(245, 158, 11, 0.22)"
                                  : "rgba(var(--background), 0.45)",
                                border: isIdxHighlighted
                                  ? "1px solid rgba(245, 158, 11, 0.45)"
                                  : "1px solid rgba(var(--foreground), 0.06)",
                                color: "rgb(var(--foreground))",
                              }}
                            >
                              <div className="relative w-full h-full flex items-center justify-center">
                                {detailLevel === "simple" ? (
                                  <span
                                    className="absolute left-1 top-1 text-[10px]"
                                    style={{ opacity: 0.55 }}
                                  >
                                    {idx}
                                  </span>
                                ) : null}
                                <span>{v}</span>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  );
                },
              )}

              {detailLevel === "simple" &&
              !showHelperArraysInSimple &&
              active.heap.some((h) => h.id !== "A") ? (
                <details
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor: "rgba(var(--foreground), 0.03)",
                    border: "1px solid rgba(var(--foreground), 0.08)",
                  }}
                >
                  <summary
                    className="cursor-pointer text-sm"
                    style={{ opacity: 0.8 }}
                  >
                    More details: other heap objects
                  </summary>
                  <div className="mt-3 space-y-3">
                    {heapPrimary
                      .filter((h) => h.id !== "A")
                      .map((entry) => {
                        const isHighlighted =
                          active.highlight?.heapId === entry.id;
                        return (
                          <div
                            key={entry.id}
                            className="rounded-xl p-4"
                            style={{
                              backgroundColor: isHighlighted
                                ? "rgba(141, 118, 233, 0.10)"
                                : "rgba(var(--foreground), 0.03)",
                              border: isHighlighted
                                ? "1px solid rgba(141, 118, 233, 0.18)"
                                : "1px solid rgba(var(--foreground), 0.08)",
                              opacity: entry.status === "garbage" ? 0.55 : 1,
                            }}
                          >
                            <div className="text-sm font-medium">
                              {entry.label}
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {entry.value.map((v, idx) => {
                                const isIdxHighlighted =
                                  entry.id === active.highlight?.heapId &&
                                  (
                                    active.highlight.arrayIndexes ?? []
                                  ).includes(idx);

                                return (
                                  <motion.div
                                    key={idx}
                                    layout
                                    className="w-10 h-10 rounded-lg flex items-center justify-center text-xs"
                                    style={{
                                      backgroundColor: isIdxHighlighted
                                        ? "rgba(245, 158, 11, 0.22)"
                                        : "rgba(var(--background), 0.45)",
                                      border: isIdxHighlighted
                                        ? "1px solid rgba(245, 158, 11, 0.45)"
                                        : "1px solid rgba(var(--foreground), 0.06)",
                                      color: "rgb(var(--foreground))",
                                    }}
                                  >
                                    {v}
                                  </motion.div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </details>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {/* Status */}
      <div
        className="rounded-2xl p-5"
        style={{
          backgroundColor: "rgba(var(--foreground), 0.02)",
          border: "1px solid rgba(var(--foreground), 0.08)",
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-sm" style={{ opacity: 0.85 }}>
            {active?.message ?? "Ready."}
          </div>
          <div className="text-sm" style={{ opacity: 0.7 }}>
            Step {totalSteps > 0 ? currentStep + 1 : 0} / {totalSteps || "?"}
            {detailLevel === "detailed" &&
            active?.gcEvent &&
            active.gcEvent !== "none" ? (
              <span className="ml-3" style={{ color: "rgb(141,118,233)" }}>
                GC: {active.gcEvent}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
