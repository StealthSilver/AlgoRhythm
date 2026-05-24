/** Factually correct step sequences for hero mini visualizations */

export type BarState =
  | "default"
  | "comparing"
  | "swapping"
  | "sorted"
  | "pivot"
  | "eliminated"
  | "in-range";

// ─── Linear search ───────────────────────────────────────────────────────────
export const LINEAR_VALUES = [4, 2, 7, 1, 9, 3, 5] as const;
export const LINEAR_TARGET = 9;

export type LinearStep = {
  idx: number;
  found: boolean;
  states: BarState[];
  hint: string;
};

export function buildLinearSearchSteps(): LinearStep[] {
  const steps: LinearStep[] = [];
  const n = LINEAR_VALUES.length;

  for (let i = 0; i < n; i++) {
    const states: BarState[] = LINEAR_VALUES.map((_, k) => {
      if (k < i) return "eliminated";
      if (k === i) return "comparing";
      return "default";
    });
    const match = LINEAR_VALUES[i] === LINEAR_TARGET;
    steps.push({
      idx: i,
      found: match,
      states,
      hint: `arr[${i}]=${LINEAR_VALUES[i]} ${match ? "= target ✓" : `≠ ${LINEAR_TARGET}`}`,
    });
    if (match) {
      states[i] = "sorted";
      steps[steps.length - 1].states = [...states];
      steps[steps.length - 1].hint = `found at index ${i}`;
      return steps;
    }
    states[i] = "eliminated";
    steps.push({
      idx: i,
      found: false,
      states: [...states],
      hint: `reject index ${i} · continue`,
    });
  }

  steps.push({
    idx: -1,
    found: false,
    states: LINEAR_VALUES.map(() => "eliminated"),
    hint: `target ${LINEAR_TARGET} not found`,
  });
  return steps;
}

// ─── Binary search ───────────────────────────────────────────────────────────
export const BINARY_VALUES = [2, 4, 6, 8, 10, 12, 14] as const;
export const BINARY_TARGET = 10;

export type BinaryStep = {
  low: number;
  high: number;
  mid: number;
  found: boolean;
  states: BarState[];
  hint: string;
};

export function buildBinarySearchSteps(): BinaryStep[] {
  const steps: BinaryStep[] = [];
  let low = 0;
  let high = BINARY_VALUES.length - 1;

  const makeStates = (
    l: number,
    h: number,
    mid: number,
    phase: "range" | "check" | "found" | "eliminate-left" | "eliminate-right",
  ): BarState[] =>
    BINARY_VALUES.map((_, i) => {
      if (phase === "found" && i === mid) return "sorted";
      if (i === mid && phase === "check") return "comparing";
      if (i >= l && i <= h) return "in-range";
      return "eliminated";
    });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    steps.push({
      low,
      high,
      mid,
      found: false,
      states: makeStates(low, high, mid, "range"),
      hint: `search [${low}…${high}]`,
    });
    steps.push({
      low,
      high,
      mid,
      found: false,
      states: makeStates(low, high, mid, "check"),
      hint: `M=${mid} · arr[M]=${BINARY_VALUES[mid]}`,
    });

    if (BINARY_VALUES[mid] === BINARY_TARGET) {
      steps.push({
        low,
        high,
        mid,
        found: true,
        states: makeStates(low, high, mid, "found"),
        hint: `arr[${mid}] = target · found`,
      });
      return steps;
    }

    if (BINARY_VALUES[mid] < BINARY_TARGET) {
      steps.push({
        low,
        high,
        mid,
        found: false,
        states: BINARY_VALUES.map((_, i) =>
          i <= mid ? "eliminated" : i >= low && i <= high ? "in-range" : "eliminated",
        ),
        hint: `arr[M] < ${BINARY_TARGET} · L = M+1`,
      });
      low = mid + 1;
    } else {
      steps.push({
        low,
        high,
        mid,
        found: false,
        states: BINARY_VALUES.map((_, i) =>
          i >= mid ? "eliminated" : i >= low && i <= high ? "in-range" : "eliminated",
        ),
        hint: `arr[M] > ${BINARY_TARGET} · H = M−1`,
      });
      high = mid - 1;
    }
  }

  steps.push({
    low: -1,
    high: -1,
    mid: -1,
    found: false,
    states: BINARY_VALUES.map(() => "eliminated"),
    hint: `target ${BINARY_TARGET} not in array`,
  });
  return steps;
}

// ─── Bubble sort ─────────────────────────────────────────────────────────────
export const BUBBLE_INIT = [38, 12, 28, 9, 22] as const;

export type BubbleStep = {
  values: number[];
  states: BarState[];
  hint: string;
};

export function buildBubbleSortSteps(): BubbleStep[] {
  const values = [...BUBBLE_INIT];
  const steps: BubbleStep[] = [
    {
      values: [...values],
      states: values.map(() => "default"),
      hint: "pass 1 · compare neighbors",
    },
  ];
  const n = values.length;

  for (let pass = 0; pass < n - 1; pass++) {
    let swapped = false;
    for (let j = 0; j < n - pass - 1; j++) {
      steps.push({
        values: [...values],
        states: values.map((_, k) =>
          k === j || k === j + 1
            ? "comparing"
            : k >= n - pass
              ? "sorted"
              : "default",
        ),
        hint: `compare ${values[j]} & ${values[j + 1]}`,
      });
      if (values[j] > values[j + 1]) {
        [values[j], values[j + 1]] = [values[j + 1], values[j]];
        swapped = true;
        steps.push({
          values: [...values],
          states: values.map((_, k) =>
            k === j || k === j + 1
              ? "swapping"
              : k >= n - pass
                ? "sorted"
                : "default",
          ),
          hint: `swap · ${values[j]} > ${values[j + 1]}`,
        });
      }
    }
    steps.push({
      values: [...values],
      states: values.map((_, k) => (k >= n - 1 - pass ? "sorted" : "default")),
      hint: swapped
        ? `pass ${pass + 1} done · max at index ${n - 1 - pass}`
        : `pass ${pass + 1} · no swap (early stop possible)`,
    });
  }
  steps.push({
    values: [...values],
    states: values.map(() => "sorted"),
    hint: "fully sorted",
  });
  return steps;
}

// ─── Merge sort (merge phase of two sorted runs) ─────────────────────────────
export const MERGE_LEFT = [3, 15, 8] as const;
export const MERGE_RIGHT = [4, 11, 7] as const;

export type MergeStep = {
  left: number[];
  right: number[];
  merged: number[];
  li: number;
  ri: number;
  pick: "left" | "right" | "idle" | "done";
  hint: string;
};

export function buildMergeSortSteps(): MergeStep[] {
  const steps: MergeStep[] = [
    {
      left: [...MERGE_LEFT],
      right: [...MERGE_RIGHT],
      merged: [],
      li: 0,
      ri: 0,
      pick: "idle",
      hint: "divide done · merge runs",
    },
  ];
  const left = [...MERGE_LEFT];
  const right = [...MERGE_RIGHT];
  let li = 0;
  let ri = 0;
  const merged: number[] = [];

  while (li < left.length || ri < right.length) {
    const takeLeft =
      li < left.length && (ri >= right.length || left[li] <= right[ri]);
    const pick: "left" | "right" = takeLeft ? "left" : "right";
    const idx = takeLeft ? li : ri;
    const val = takeLeft ? left[li] : right[ri];

    steps.push({
      left: [...left],
      right: [...right],
      merged: [...merged],
      li,
      ri,
      pick,
      hint: takeLeft
        ? `left[${li}]=${val} ≤ right[${ri}] · take left`
        : `right[${ri}]=${val} · take right`,
    });

    if (takeLeft) merged.push(left[li++]);
    else merged.push(right[ri++]);

    steps.push({
      left: [...left],
      right: [...right],
      merged: [...merged],
      li,
      ri,
      pick: "idle",
      hint: `output ← ${val}`,
    });
  }

  steps.push({
    left: [...left],
    right: [...right],
    merged: [...merged],
    li,
    ri,
    pick: "done",
    hint: `merged [${merged.join(", ")}]`,
  });
  return steps;
}

// ─── Quick sort (Lomuto partition, pivot = last) ─────────────────────────────
export const QUICK_INIT = [42, 17, 31, 8, 25] as const;

export type QuickStep = {
  values: number[];
  states: BarState[];
  pivotIdx: number;
  iPtr: number;
  jPtr: number;
  hint: string;
};

export function buildQuickSortSteps(): QuickStep[] {
  const arr = [...QUICK_INIT];
  const steps: QuickStep[] = [];
  const pivotIdx = arr.length - 1;
  const pivot = arr[pivotIdx];

  steps.push({
    values: [...arr],
    states: arr.map((_, k) => (k === pivotIdx ? "pivot" : "default")),
    pivotIdx,
    iPtr: 0,
    jPtr: -1,
    hint: `Lomuto · pivot P=${pivot} (last)`,
  });

  let i = 0;
  for (let j = 0; j < pivotIdx; j++) {
    steps.push({
      values: [...arr],
      states: arr.map((_, k) => {
        if (k === pivotIdx) return "pivot";
        if (k === j) return "comparing";
        if (k === i) return "in-range";
        if (k < i) return "sorted";
        return "default";
      }),
      pivotIdx,
      iPtr: i,
      jPtr: j,
      hint: `j=${j}: arr[j]=${arr[j]} < P → swap into left`,
    });

    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      steps.push({
        values: [...arr],
        states: arr.map((_, k) => {
          if (k === pivotIdx) return "pivot";
          if (k === i || k === j) return "swapping";
          if (k < i) return "sorted";
          return "default";
        }),
        pivotIdx,
        iPtr: i,
        jPtr: j,
        hint: `swap i=${i} ↔ j=${j} · i++`,
      });
      i++;
    } else {
      steps.push({
        values: [...arr],
        states: arr.map((_, k) => {
          if (k === pivotIdx) return "pivot";
          if (k === j) return "comparing";
          if (k < i) return "sorted";
          return "default";
        }),
        pivotIdx,
        iPtr: i,
        jPtr: j,
        hint: `arr[j] ≥ P · skip`,
      });
    }
  }

  [arr[i], arr[pivotIdx]] = [arr[pivotIdx], arr[i]];
  steps.push({
    values: [...arr],
    states: arr.map((_, k) => (k === i ? "sorted" : k === pivotIdx ? "swapping" : "default")),
    pivotIdx: i,
    iPtr: i,
    jPtr: pivotIdx,
    hint: "swap pivot into final place",
  });
  steps.push({
    values: [...arr],
    states: arr.map((_, k) => (k <= i ? "sorted" : "default")),
    pivotIdx: i,
    iPtr: i,
    jPtr: -1,
    hint: `pivot at ${i} · ≤ left · ≥ right`,
  });
  return steps;
}

// ─── Tower of Hanoi ──────────────────────────────────────────────────────────
export type HanoiStep = {
  pegs: number[][];
  lift?: { disk: number; peg: number };
  place?: { disk: number; peg: number };
  hint: string;
};

export function buildHanoiSteps(): HanoiStep[] {
  const pegs: number[][] = [[3, 2, 1], [], []];
  const steps: HanoiStep[] = [
    { pegs: pegs.map((p) => [...p]), hint: "3 disks on A → move all to C" },
  ];

  const moves: [number, number][] = [
    [0, 2],
    [0, 1],
    [2, 1],
    [0, 2],
    [0, 1],
    [2, 1],
    [0, 2],
  ];

  const labels = ["A", "B", "C"];
  for (const [from, to] of moves) {
    const disk = pegs[from][pegs[from].length - 1];
    steps.push({
      pegs: pegs.map((p) => [...p]),
      lift: { disk, peg: from },
      hint: `lift disk ${disk} from ${labels[from]}`,
    });
    pegs[from].pop();
    steps.push({
      pegs: pegs.map((p) => [...p]),
      place: { disk, peg: to },
      hint: `place disk ${disk} on ${labels[to]}`,
    });
    pegs[to].push(disk);
    steps.push({
      pegs: pegs.map((p) => [...p]),
      hint: `only smaller on top · legal move`,
    });
  }
  steps.push({ pegs: [[], [], [3, 2, 1]], hint: "all disks on C · done" });
  return steps;
}

// ─── Graph traversals ────────────────────────────────────────────────────────
export const GRAPH_ADJ: number[][] = [
  [1, 2],
  [0, 3, 4],
  [0, 5],
  [1],
  [1, 5],
  [2, 4],
];

export const GRAPH_LABELS = ["A", "B", "C", "D", "E", "F"];

function edgeKey(a: number, b: number) {
  return `${Math.min(a, b)}-${Math.max(a, b)}`;
}

export type DfsStep = {
  active: number;
  visited: number[];
  stack: number[];
  treeEdge: string | null;
  hint: string;
};

export function buildDFSSteps(): DfsStep[] {
  const steps: DfsStep[] = [];
  const stack: number[] = [0];
  const visited: number[] = [];
  const parent: Record<number, number | null> = { 0: null };

  while (stack.length > 0) {
    const u = stack.pop()!;
    if (visited.includes(u)) continue;

    const treeEdge =
      parent[u] !== null && parent[u] !== undefined
        ? edgeKey(parent[u]!, u)
        : null;

    steps.push({
      active: u,
      visited: [...visited],
      stack: [...stack],
      treeEdge,
      hint:
        treeEdge === null
          ? `visit ${GRAPH_LABELS[u]} (root)`
          : `visit ${GRAPH_LABELS[u]} via ${GRAPH_LABELS[parent[u]!]}`,
    });

    visited.push(u);

    for (const v of [...GRAPH_ADJ[u]].reverse()) {
      if (!visited.includes(v) && !stack.includes(v)) {
        parent[v] = u;
        stack.push(v);
      }
    }

    steps.push({
      active: u,
      visited: [...visited],
      stack: [...stack],
      treeEdge,
      hint: `push neighbors onto stack · [${stack.map((n) => GRAPH_LABELS[n]).join(",") || "∅"}]`,
    });
  }

  steps.push({
    active: -1,
    visited: [...visited],
    stack: [],
    treeEdge: null,
    hint: "DFS complete · stack empty",
  });
  return steps;
}

export type BfsStep = {
  active: number;
  visited: number[];
  queue: string[];
  enqueued: number[];
  hint: string;
};

export function buildBFSSteps(): BfsStep[] {
  const steps: BfsStep[] = [];
  const queue: number[] = [0];
  const visited = new Set<number>([0]);

  steps.push({
    active: 0,
    visited: [],
    queue: [GRAPH_LABELS[0]],
    enqueued: [0],
    hint: "enqueue A · level 0",
  });

  while (queue.length > 0) {
    const u = queue.shift()!;
    const beforeQueue = queue.map((n) => GRAPH_LABELS[n]);

    steps.push({
      active: u,
      visited: Array.from(visited).filter((n) => n !== u),
      queue: beforeQueue,
      enqueued: [],
      hint: `dequeue ${GRAPH_LABELS[u]} · Q=[${beforeQueue.join(",") || "∅"}]`,
    });

    const enqueued: number[] = [];
    for (const v of GRAPH_ADJ[u]) {
      if (!visited.has(v)) {
        visited.add(v);
        queue.push(v);
        enqueued.push(v);
      }
    }

    steps.push({
      active: u,
      visited: Array.from(visited).filter((n) => n !== u && !queue.includes(n)),
      queue: queue.map((n) => GRAPH_LABELS[n]),
      enqueued,
      hint:
        enqueued.length > 0
          ? `enqueue ${enqueued.map((n) => GRAPH_LABELS[n]).join(", ")}`
          : "no unvisited neighbors",
    });
  }

  steps.push({
    active: -1,
    visited: Array.from(visited),
    queue: [],
    enqueued: [],
    hint: "BFS complete · level order",
  });
  return steps;
}

// ─── Dijkstra (5-node subgraph A–E) ──────────────────────────────────────────
export const DIJKSTRA_NODES = [0, 1, 2, 3, 4] as const;
export const DIJKSTRA_EDGES: { a: number; b: number; w: number }[] = [
  { a: 0, b: 1, w: 4 },
  { a: 0, b: 2, w: 2 },
  { a: 1, b: 3, w: 5 },
  { a: 2, b: 3, w: 8 },
  { a: 2, b: 4, w: 3 },
  { a: 3, b: 4, w: 1 },
];

export type DijkstraStep = {
  active: number;
  visited: number[];
  dist: Record<number, number | "∞">;
  relaxing: string | null;
  path: number[];
  hint: string;
};

export function buildDijkstraSteps(): DijkstraStep[] {
  const steps: DijkstraStep[] = [];
  const dist: Record<number, number | "∞"> = { 0: 0, 1: "∞", 2: "∞", 3: "∞", 4: "∞" };
  const visited = new Set<number>();
  const prev: Record<number, number | null> = { 0: null, 1: null, 2: null, 3: null, 4: null };

  steps.push({
    active: 0,
    visited: [],
    dist: { ...dist },
    relaxing: null,
    path: [0],
    hint: "dist[A]=0 · source",
  });

  while (visited.size < 5) {
    let u = -1;
    let best = Infinity;
    for (const n of DIJKSTRA_NODES) {
      if (!visited.has(n) && dist[n] !== "∞" && dist[n] < best) {
        best = dist[n] as number;
        u = n;
      }
    }
    if (u < 0) break;

    visited.add(u);
    steps.push({
      active: u,
      visited: Array.from(visited),
      dist: { ...dist },
      relaxing: null,
      path: rebuildPath(prev, u),
      hint: `pick ${GRAPH_LABELS[u]} · dist=${dist[u]}`,
    });

    for (const { a, b, w } of DIJKSTRA_EDGES) {
      if (a !== u && b !== u) continue;
      const v = a === u ? b : a;
      if (visited.has(v)) continue;
      const du = dist[u] as number;
      if (dist[v] === "∞" || du + w < (dist[v] as number)) {
        dist[v] = du + w;
        prev[v] = u;
        steps.push({
          active: u,
          visited: Array.from(visited),
          dist: { ...dist },
          relaxing: edgeKey(u, v),
          path: rebuildPath(prev, v),
          hint: `relax ${GRAPH_LABELS[u]}→${GRAPH_LABELS[v]} · d=${dist[v]}`,
        });
      }
    }
  }

  steps.push({
    active: -1,
    visited: Array.from(visited),
    dist: { ...dist },
    relaxing: null,
    path: rebuildPath(prev, 3),
    hint: `shortest A→D = ${dist[3]} via A-C-E-D`,
  });
  return steps;
}

function rebuildPath(prev: Record<number, number | null>, end: number): number[] {
  const path: number[] = [];
  let cur: number | null = end;
  while (cur !== null) {
    path.unshift(cur);
    cur = prev[cur];
  }
  return path;
}

// ─── AVL right rotation (LL) ─────────────────────────────────────────────────
export type AvlStep = {
  nodes: { val: number; x: number; y: number; role: "root" | "left" | "right" | "new" }[];
  edges: [number, number][];
  hint: string;
};

export const AVL_STEPS: AvlStep[] = [
  {
    nodes: [
      { val: 30, x: 50, y: 14, role: "root" },
      { val: 20, x: 32, y: 44, role: "left" },
    ],
    edges: [[0, 1]],
    hint: "BST: 30 root · left 20",
  },
  {
    nodes: [
      { val: 30, x: 50, y: 14, role: "root" },
      { val: 20, x: 32, y: 44, role: "left" },
      { val: 10, x: 18, y: 72, role: "new" },
    ],
    edges: [
      [0, 1],
      [1, 2],
    ],
    hint: "insert 10 · left-left chain",
  },
  {
    nodes: [
      { val: 30, x: 50, y: 14, role: "root" },
      { val: 20, x: 32, y: 44, role: "left" },
      { val: 10, x: 18, y: 72, role: "new" },
    ],
    edges: [
      [0, 1],
      [1, 2],
    ],
    hint: "BF(30)=−2 · LL imbalance",
  },
  {
    nodes: [
      { val: 20, x: 50, y: 20, role: "root" },
      { val: 10, x: 32, y: 54, role: "left" },
      { val: 30, x: 68, y: 54, role: "right" },
    ],
    edges: [
      [0, 1],
      [0, 2],
    ],
    hint: "right rotate · 20 new root",
  },
  {
    nodes: [
      { val: 20, x: 50, y: 20, role: "root" },
      { val: 10, x: 32, y: 54, role: "left" },
      { val: 30, x: 68, y: 54, role: "right" },
    ],
    edges: [
      [0, 1],
      [0, 2],
    ],
    hint: "balanced · |BF| ≤ 1",
  },
];

// ─── Stack ───────────────────────────────────────────────────────────────────
export const STACK_VALUES = [12, 24, 36, 48] as const;

export type StackStep =
  | { op: "push"; items: number[]; incoming: number; hint: string }
  | { op: "pop"; items: number[]; hint: string };

export function buildStackSteps(): StackStep[] {
  const steps: StackStep[] = [];
  const items: number[] = [];

  for (const v of STACK_VALUES) {
    steps.push({
      op: "push",
      items: [...items],
      incoming: v,
      hint: `push(${v}) · O(1)`,
    });
    items.push(v);
    steps.push({
      op: "push",
      items: [...items],
      hint: `top = ${items[items.length - 1]} · size ${items.length}`,
    });
  }

  while (items.length > 0) {
    const top = items[items.length - 1];
    steps.push({
      op: "pop",
      items: [...items],
      hint: `pop() → ${top}`,
    });
    items.pop();
    steps.push({
      op: "pop",
      items: [...items],
      hint: items.length ? `top = ${items[items.length - 1]}` : "stack empty",
    });
  }

  return steps;
}

// ─── DP min path sum ─────────────────────────────────────────────────────────
export const DP_GRID = [
  [1, 3, 1],
  [2, 1, 3],
  [5, 1, 2],
] as const;

export type DpStep = {
  filled: [number, number][];
  active: [number, number] | null;
  values: number[][];
  deps: [number, number][];
  hint: string;
};

export function buildDPSteps(): DpStep[] {
  const rows = DP_GRID.length;
  const cols = DP_GRID[0].length;
  const dp: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(0),
  );
  const steps: DpStep[] = [];
  const order: [number, number][] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      order.push([r, c]);
    }
  }

  for (let k = 0; k < order.length; k++) {
    const [r, c] = order[k];
    const deps: [number, number][] = [];
    if (r > 0) deps.push([r - 1, c]);
    if (c > 0) deps.push([r, c - 1]);

    steps.push({
      filled: order.slice(0, k),
      active: [r, c],
      values: dp.map((row) => [...row]),
      deps,
      hint:
        r === 0 && c === 0
          ? `dp[0][0] = cost ${DP_GRID[0][0]}`
          : `dp[${r}][${c}] = cost + min(↑, ←)`,
    });

    if (r === 0 && c === 0) dp[r][c] = DP_GRID[r][c];
    else {
      const up = r > 0 ? dp[r - 1][c] : Infinity;
      const left = c > 0 ? dp[r][c - 1] : Infinity;
      dp[r][c] = DP_GRID[r][c] + Math.min(up, left);
    }

    steps.push({
      filled: order.slice(0, k + 1),
      active: null,
      values: dp.map((row) => [...row]),
      deps: [],
      hint: `dp[${r}][${c}] = ${dp[r][c]}`,
    });
  }

  steps.push({
    filled: order,
    active: null,
    values: dp.map((row) => [...row]),
    deps: [],
    hint: `min path = ${dp[rows - 1][cols - 1]}`,
  });
  return steps;
}
