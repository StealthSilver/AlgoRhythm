"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  AVL_STEPS,
  BINARY_VALUES,
  buildBinarySearchSteps,
  buildBubbleSortSteps,
  buildDFSSteps,
  buildBFSSteps,
  buildDijkstraSteps,
  buildDPSteps,
  buildHanoiSteps,
  buildLinearSearchSteps,
  buildMergeSortSteps,
  buildQuickSortSteps,
  buildStackSteps,
  DIJKSTRA_EDGES,
  GRAPH_ADJ,
  LINEAR_VALUES,
} from "./mini-algorithm-steps";
import {
  BAR_DEFAULT,
  MiniBars,
  MiniChip,
  MiniSvgStage,
  MiniVizShell,
  NODE_ACTIVE,
  NODE_DEFAULT,
  NODE_FRONTIER,
  NODE_PATH,
  NODE_VISITED,
  MINI_SPEED,
  useMiniLoop,
} from "./mini-viz-shared";

const LINEAR_STEPS = buildLinearSearchSteps();
const BINARY_STEPS = buildBinarySearchSteps();
const BUBBLE_STEPS = buildBubbleSortSteps();
const MERGE_STEPS = buildMergeSortSteps();
const QUICK_STEPS = buildQuickSortSteps();
const HANOI_STEPS = buildHanoiSteps();
const DFS_STEPS = buildDFSSteps();
const BFS_STEPS = buildBFSSteps();
const DIJKSTRA_STEPS = buildDijkstraSteps();
const STACK_STEPS = buildStackSteps();
const DP_STEPS = buildDPSteps();

const GRAPH_NODES = [
  { id: 0, x: 50, y: 10, label: "A" },
  { id: 1, x: 22, y: 38, label: "B" },
  { id: 2, x: 78, y: 38, label: "C" },
  { id: 3, x: 12, y: 72, label: "D" },
  { id: 4, x: 40, y: 72, label: "E" },
  { id: 5, x: 74, y: 72, label: "F" },
];

const GRAPH_EDGES: [number, number][] = GRAPH_ADJ.flatMap((adj, a) =>
  adj.filter((b) => a < b).map((b) => [a, b] as [number, number]),
);

const DIJKSTRA_NODE_IDS = [0, 1, 2, 3, 4];

const DIJKSTRA_GRAPH_EDGES: [number, number][] = DIJKSTRA_EDGES.map(({ a, b }) => [
  a,
  b,
]);

const DIJKSTRA_WEIGHTS: Record<string, number> = Object.fromEntries(
  DIJKSTRA_EDGES.map(({ a, b, w }) => [edgeKey(a, b), w]),
);

function edgeKey(a: number, b: number) {
  return `${Math.min(a, b)}-${Math.max(a, b)}`;
}

function MiniGraph({
  nodeIds = [0, 1, 2, 3, 4, 5],
  nodeStates,
  edgeStates,
  edges = GRAPH_EDGES,
  showWeights = false,
  weights,
  visitOrder,
  distLabels,
}: {
  nodeIds?: number[];
  nodeStates: Record<number, "default" | "active" | "visited" | "path" | "frontier">;
  edgeStates?: Record<string, "default" | "active" | "path">;
  edges?: [number, number][];
  showWeights?: boolean;
  weights?: Record<string, number>;
  visitOrder?: Record<number, number>;
  distLabels?: Record<number, string>;
}) {
  const visible = GRAPH_NODES.filter((n) => nodeIds.includes(n.id));

  return (
    <MiniSvgStage>
      {edges
        .filter(([a, b]) => nodeIds.includes(a) && nodeIds.includes(b))
        .map(([a, b]) => {
          const n1 = GRAPH_NODES[a];
          const n2 = GRAPH_NODES[b];
          const key = edgeKey(a, b);
          const state = edgeStates?.[key] ?? "default";
          const mx = (n1.x + n2.x) / 2;
          const my = (n1.y + n2.y) / 2;
          return (
            <g key={key}>
              <line
                x1={n1.x}
                y1={n1.y + 5}
                x2={n2.x}
                y2={n2.y + 5}
                stroke={
                  state === "path"
                    ? "#8a4d98"
                    : state === "active"
                      ? "#fbbf24"
                      : "rgba(var(--foreground), 0.14)"
                }
                strokeWidth={state === "path" ? 2.2 : state === "active" ? 2 : 1.3}
              />
              {showWeights && weights?.[key] !== undefined && (
                <text
                  x={mx}
                  y={my + 2}
                  textAnchor="middle"
                  fontSize="6.5"
                  fill="rgba(var(--foreground), 0.45)"
                >
                  {weights[key]}
                </text>
              )}
            </g>
          );
        })}
      {visible.map((node) => {
        const state = nodeStates[node.id] ?? "default";
        const order = visitOrder?.[node.id];
        return (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y + 5}
              r={8}
              className={cn(
                state === "default" && NODE_DEFAULT,
                state === "active" && NODE_ACTIVE,
                state === "visited" && NODE_VISITED,
                state === "path" && NODE_PATH,
                state === "frontier" && NODE_FRONTIER,
              )}
            />
            <text
              x={node.x}
              y={node.y + 7}
              textAnchor="middle"
              fontSize="7"
              fill="white"
              fontWeight="600"
            >
              {node.label}
            </text>
            {order !== undefined && (
              <text
                x={node.x + 10}
                y={node.y}
                fontSize="6"
                fill="#fbbf24"
                fontWeight="600"
              >
                {order}
              </text>
            )}
            {distLabels?.[node.id] && (
              <text
                x={node.x}
                y={node.y + 19}
                textAnchor="middle"
                fontSize="5.5"
                fill="rgba(var(--foreground), 0.5)"
              >
                {distLabels[node.id]}
              </text>
            )}
          </g>
        );
      })}
    </MiniSvgStage>
  );
}

function MergeCell({
  value,
  state,
  label,
}: {
  value: number;
  state: "default" | "active" | "done" | "merged";
  label?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      {label && (
        <span className="text-[6px] font-medium" style={{ opacity: 0.45 }}>
          {label}
        </span>
      )}
      <div
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-sm text-[9px] font-medium text-white",
          state === "default" && BAR_DEFAULT,
          state === "active" && "bg-amber-400",
          state === "done" && "opacity-35",
          state === "merged" && "bg-emerald-500",
        )}
      >
        {value}
      </div>
    </div>
  );
}

// ─── Linear Search ───────────────────────────────────────────────────────────
export function LinearSearchMini() {
  const step = useMiniLoop(LINEAR_STEPS.length, MINI_SPEED.search);
  const { states, hint, idx } = LINEAR_STEPS[step];
  const markers: Record<number, string> = {};
  if (idx >= 0) markers[idx] = "i";

  return (
    <MiniVizShell hint={hint}>
      <MiniBars values={[...LINEAR_VALUES]} states={states} markers={markers} />
    </MiniVizShell>
  );
}

// ─── Binary Search ───────────────────────────────────────────────────────────
export function BinarySearchMini() {
  const step = useMiniLoop(BINARY_STEPS.length, MINI_SPEED.search);
  const { states, hint, low, high, mid } = BINARY_STEPS[step];
  const markers: Record<number, string> = {};
  if (low >= 0) {
    if (low === mid && high === mid) markers[mid] = "L/M/H";
    else {
      markers[low] = "L";
      markers[mid] = "M";
      markers[high] = "H";
    }
  }

  return (
    <MiniVizShell hint={hint}>
      <MiniBars values={[...BINARY_VALUES]} states={states} markers={markers} />
    </MiniVizShell>
  );
}

// ─── Bubble Sort ─────────────────────────────────────────────────────────────
export function BubbleSortMini() {
  const step = useMiniLoop(BUBBLE_STEPS.length, MINI_SPEED.sort);
  const { values, states, hint } = BUBBLE_STEPS[step];
  return (
    <MiniVizShell hint={hint}>
      <MiniBars values={values} states={states} />
    </MiniVizShell>
  );
}

// ─── Merge Sort ──────────────────────────────────────────────────────────────
export function MergeSortMini() {
  const step = useMiniLoop(MERGE_STEPS.length, MINI_SPEED.merge);
  const { left, right, merged, li, ri, pick, hint } = MERGE_STEPS[step];

  return (
    <MiniVizShell hint={hint}>
      <div className="flex h-full w-full flex-col justify-center gap-2">
        <div className="flex items-end justify-center gap-1">
          <div className="flex gap-0.5">
            {left.map((v, i) => (
              <MergeCell
                key={`l-${i}`}
                value={v}
                label={i === 0 ? "L" : undefined}
                state={i < li ? "done" : pick === "left" && i === li ? "active" : "default"}
              />
            ))}
          </div>
          <span className="px-0.5 text-[9px] font-medium" style={{ opacity: 0.35 }}>
            +
          </span>
          <div className="flex gap-0.5">
            {right.map((v, i) => (
              <MergeCell
                key={`r-${i}`}
                value={v}
                label={i === 0 ? "R" : undefined}
                state={i < ri ? "done" : pick === "right" && i === ri ? "active" : "default"}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-0.5 border-t border-[rgb(var(--foreground)/0.1)] pt-2">
          {merged.map((v, i) => (
            <MergeCell key={`m-${i}`} value={v} state="merged" />
          ))}
          {pick !== "done" && merged.length < left.length + right.length && (
            <div className="h-6 w-6 rounded-sm border border-dashed border-[rgb(var(--foreground)/0.18)]" />
          )}
        </div>
      </div>
    </MiniVizShell>
  );
}

// ─── Quick Sort ──────────────────────────────────────────────────────────────
export function QuickSortMini() {
  const step = useMiniLoop(QUICK_STEPS.length, MINI_SPEED.sort);
  const { values, states, hint, pivotIdx, iPtr } = QUICK_STEPS[step];
  const markers: Record<number, string> = {};
  if (states[pivotIdx] === "pivot") markers[pivotIdx] = "P";
  if (iPtr >= 0 && iPtr < values.length) markers[iPtr] = "i";

  return (
    <MiniVizShell hint={hint}>
      <MiniBars values={values} states={states} markers={markers} />
    </MiniVizShell>
  );
}

// ─── Tower of Hanoi ──────────────────────────────────────────────────────────
const PEG_LABELS = ["A", "B", "C"];

export function TowerOfHanoiMini() {
  const step = useMiniLoop(HANOI_STEPS.length, MINI_SPEED.struct);
  const { pegs, lift, place, hint } = HANOI_STEPS[step];

  return (
    <MiniVizShell hint={hint}>
      <div className="flex h-full w-full items-end justify-center gap-3">
        {pegs.map((peg, pegIdx) => (
          <div
            key={pegIdx}
            className="relative flex h-[68px] w-10 flex-col items-center justify-end"
          >
            <span
              className="absolute -top-0.5 text-[8px] font-semibold"
              style={{ opacity: 0.5 }}
            >
              {PEG_LABELS[pegIdx]}
            </span>
            <div
              className="absolute bottom-0 h-0.5 w-full rounded-full"
              style={{ backgroundColor: "rgba(var(--foreground), 0.18)" }}
            />
            <div className="flex w-full flex-col-reverse items-center gap-0.5 pb-0.5">
              {peg.map((disk, diskIdx) => {
                const isLifted =
                  lift?.peg === pegIdx && lift.disk === disk && diskIdx === peg.length - 1;
                const isPlacing =
                  place?.peg === pegIdx && place.disk === disk && diskIdx === peg.length - 1;
                return (
                  <motion.div
                    key={`${pegIdx}-${disk}-${diskIdx}`}
                    layout
                    className={cn(
                      "flex h-3 items-center justify-center rounded-sm text-[7px] font-medium text-white",
                      isLifted && "bg-amber-400 -translate-y-1",
                      isPlacing && "bg-emerald-500",
                      !isLifted && !isPlacing && BAR_DEFAULT,
                    )}
                    style={{ width: `${disk * 24 + 28}%` }}
                    transition={{ duration: 0.35 }}
                  >
                    {disk}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </MiniVizShell>
  );
}

// ─── DFS ─────────────────────────────────────────────────────────────────────
export function DFSMini() {
  const step = useMiniLoop(DFS_STEPS.length, MINI_SPEED.graph);
  const { active, visited, treeEdge, treeEdges, hint } = DFS_STEPS[step];

  const nodeStates: Record<number, "default" | "active" | "visited" | "path"> = {};
  GRAPH_NODES.forEach((n) => {
    nodeStates[n.id] = "default";
  });
  visited.forEach((id) => {
    nodeStates[id] = "visited";
  });
  if (active >= 0) nodeStates[active] = "active";

  const edgeStates: Record<string, "default" | "active" | "path"> = {};
  treeEdges.forEach((e) => {
    edgeStates[e] = "path";
  });
  if (treeEdge) edgeStates[treeEdge] = "active";

  const visitOrder: Record<number, number> = {};
  visited.forEach((id, i) => {
    visitOrder[id] = i + 1;
  });
  if (active >= 0 && !visited.includes(active)) visitOrder[active] = visited.length + 1;

  return (
    <MiniVizShell hint={hint}>
      <MiniGraph nodeStates={nodeStates} edgeStates={edgeStates} visitOrder={visitOrder} />
    </MiniVizShell>
  );
}

// ─── BFS ─────────────────────────────────────────────────────────────────────
export function BFSMini() {
  const step = useMiniLoop(BFS_STEPS.length, MINI_SPEED.graph);
  const { active, visited, queue, enqueued, hint } = BFS_STEPS[step];

  const visitedIds = visited;
  const activeId = active;
  const frontierIds = enqueued;

  const nodeStates: Record<number, "default" | "active" | "visited" | "frontier"> = {};
  GRAPH_NODES.forEach((n) => {
    nodeStates[n.id] = "default";
  });
  visitedIds.forEach((id) => {
    nodeStates[id] = "visited";
  });
  frontierIds.forEach((id) => {
    if (nodeStates[id] !== "visited") nodeStates[id] = "frontier";
  });
  if (activeId >= 0) nodeStates[activeId] = "active";

  const visitOrder: Record<number, number> = {};
  visitedIds.forEach((id, i) => {
    visitOrder[id] = i + 1;
  });
  if (activeId >= 0) visitOrder[activeId] = visitedIds.length + 1;

  return (
    <MiniVizShell hint={hint}>
      <div className="flex h-full w-full flex-col items-center justify-center gap-0.5">
        <MiniGraph nodeStates={nodeStates} visitOrder={visitOrder} />
        {queue.length > 0 && (
          <MiniChip tone="muted">Q: {queue.join(" ")}</MiniChip>
        )}
      </div>
    </MiniVizShell>
  );
}

// ─── Dijkstra ────────────────────────────────────────────────────────────────
export function DijkstraMini() {
  const step = useMiniLoop(DIJKSTRA_STEPS.length, MINI_SPEED.graph);
  const { active, visited, dist, relaxing, path, hint } = DIJKSTRA_STEPS[step];

  const nodeStates: Record<number, "default" | "active" | "visited" | "path"> = {};
  DIJKSTRA_NODE_IDS.forEach((id) => {
    nodeStates[id] = "default";
  });
  visited.forEach((id) => {
    nodeStates[id] = path.includes(id) ? "path" : "visited";
  });
  if (active >= 0) nodeStates[active] = "active";

  const edgeStates: Record<string, "default" | "active" | "path"> = {};
  DIJKSTRA_GRAPH_EDGES.forEach(([a, b]) => {
    edgeStates[edgeKey(a, b)] = "default";
  });
  for (let i = 0; i < path.length - 1; i++) {
    edgeStates[edgeKey(path[i], path[i + 1])] = "path";
  }
  if (relaxing) edgeStates[relaxing] = "active";

  const distLabels: Record<number, string> = {};
  DIJKSTRA_NODE_IDS.forEach((id) => {
    distLabels[id] = dist[id] === "∞" ? "∞" : String(dist[id]);
  });

  return (
    <MiniVizShell hint={hint}>
      <MiniGraph
        nodeIds={DIJKSTRA_NODE_IDS}
        nodeStates={nodeStates}
        edgeStates={edgeStates}
        edges={DIJKSTRA_GRAPH_EDGES}
        showWeights
        weights={DIJKSTRA_WEIGHTS}
        distLabels={distLabels}
      />
    </MiniVizShell>
  );
}

// ─── AVL Rotation ───────────────────────────────────────────────────────────
export function AVLRotationMini() {
  const step = useMiniLoop(AVL_STEPS.length, MINI_SPEED.tree);
  const { nodes, edges, hint } = AVL_STEPS[step];

  const roleStyle = (role: string) => {
    if (role === "new") return NODE_ACTIVE;
    if (role === "root" && step >= 3) return NODE_VISITED;
    return NODE_DEFAULT;
  };

  return (
    <MiniVizShell hint={hint}>
      <MiniSvgStage>
        {edges.map(([a, b], i) => (
          <line
            key={`e-${i}`}
            x1={nodes[a].x}
            y1={nodes[a].y + 6}
            x2={nodes[b].x}
            y2={nodes[b].y + 6}
            stroke="rgba(var(--foreground), 0.14)"
            strokeWidth="1.4"
          />
        ))}
        {nodes.map((node, i) => (
          <motion.g key={`${node.val}-${i}-${step}`} layout transition={{ duration: 0.4 }}>
            <motion.circle
              cx={node.x}
              cy={node.y + 6}
              r={9}
              layout
              className={cn(roleStyle(node.role), step === 2 && node.role === "root" && "fill-[#8a4d98]")}
              transition={{ duration: 0.4 }}
            />
            <text
              x={node.x}
              y={node.y + 9}
              textAnchor="middle"
              fontSize="8"
              fill="white"
              fontWeight="600"
            >
              {node.val}
            </text>
            {node.role === "new" && (
              <text x={node.x + 12} y={node.y + 4} fontSize="6" fill="#fbbf24">
                +
              </text>
            )}
          </motion.g>
        ))}
        {step === 2 && (
          <motion.path
            d="M 58 32 A 14 14 0 0 1 42 50"
            fill="none"
            stroke="#8a4d98"
            strokeWidth="1.8"
            strokeDasharray="4 3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </MiniSvgStage>
    </MiniVizShell>
  );
}

// ─── Stack ───────────────────────────────────────────────────────────────────
export function StackOperationsMini() {
  const step = useMiniLoop(STACK_STEPS.length, MINI_SPEED.struct);
  const current = STACK_STEPS[step];
  const hint = current.hint;

  if (current.op === "push") {
    const { items, incoming } = current;
    return (
      <MiniVizShell hint={hint}>
        <div className="flex h-full w-[56px] flex-col items-center justify-end">
          <span className="mb-1 text-[7px] font-semibold uppercase" style={{ opacity: 0.45 }}>
            top →
          </span>
          <div className="relative flex h-[62px] w-full flex-col-reverse items-stretch gap-0.5 border-x border-b border-[rgb(var(--foreground)/0.14)] rounded-b-md px-1 pb-1">
            {items.map((val, i) => (
              <div
                key={`${val}-${i}`}
                className={cn(
                  "flex h-4 w-full items-center justify-center rounded-sm text-[8px] font-medium text-white",
                  BAR_DEFAULT,
                )}
              >
                {val}
              </div>
            ))}
            {incoming !== undefined && (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-6 flex h-4 w-full items-center justify-center rounded-sm bg-amber-400 text-[8px] font-medium text-white"
              >
                {incoming}
              </motion.div>
            )}
          </div>
          <MiniChip tone="active">push</MiniChip>
        </div>
      </MiniVizShell>
    );
  }

  const { items } = current;
  return (
    <MiniVizShell hint={hint}>
      <div className="flex h-full w-[56px] flex-col items-center justify-end">
        <span className="mb-1 text-[7px] font-semibold uppercase" style={{ opacity: 0.45 }}>
          top →
        </span>
        <div className="relative flex h-[62px] w-full flex-col-reverse items-stretch gap-0.5 border-x border-b border-[rgb(var(--foreground)/0.14)] rounded-b-md px-1 pb-1">
          <AnimatePresence mode="popLayout">
            {items.map((val, i) => (
              <motion.div
                key={`${val}-${i}-${items.length}`}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                className={cn(
                  "flex h-4 w-full items-center justify-center rounded-sm text-[8px] font-medium text-white",
                  i === items.length - 1 ? "bg-rose-500" : BAR_DEFAULT,
                )}
                transition={{ duration: 0.35 }}
              >
                {val}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <MiniChip tone="accent">pop</MiniChip>
      </div>
    </MiniVizShell>
  );
}

// ─── DP Grid ─────────────────────────────────────────────────────────────────
export function DPGridFillMini() {
  const step = useMiniLoop(DP_STEPS.length, MINI_SPEED.struct);
  const { filled, active, values, deps, hint } = DP_STEPS[step];
  const filledSet = new Set(filled.map(([r, c]) => `${r}-${c}`));
  const rows = values.length;
  const cols = values[0]?.length ?? 0;

  return (
    <MiniVizShell hint={hint}>
      <div className="flex flex-col items-center gap-0.5">
        <div className="flex gap-0.5 pl-3">
          {Array.from({ length: cols }).map((_, c) => (
            <span
              key={`c-${c}`}
              className="flex h-3 w-5 items-center justify-center text-[6px] font-medium"
              style={{ opacity: 0.4 }}
            >
              c{c}
            </span>
          ))}
        </div>
        {Array.from({ length: rows }).map((_, r) => (
          <div key={`r-${r}`} className="relative flex items-center gap-0.5">
            <span className="w-3 text-[6px] font-medium" style={{ opacity: 0.4 }}>
              r{r}
            </span>
            {Array.from({ length: cols }).map((_, c) => {
              const key = `${r}-${c}`;
              const isFilled = filledSet.has(key);
              const isActive = active?.[0] === r && active?.[1] === c;
              const isDep = deps.some(([dr, dc]) => dr === r && dc === c);
              return (
                <motion.div
                  key={key}
                  layout
                  className={cn(
                    "relative flex h-5 w-5 items-center justify-center rounded-sm text-[7px] font-medium",
                    isFilled && "bg-emerald-500 text-white",
                    isActive && "bg-amber-400 text-white ring-1 ring-amber-300/50",
                    isDep && !isActive && "ring-1 ring-amber-400/40",
                    !isFilled &&
                      !isActive &&
                      "bg-[rgb(var(--secondary))] text-white opacity-45",
                  )}
                  transition={{ duration: 0.3 }}
                >
                  {isFilled || isActive ? values[r][c] || "·" : "·"}
                </motion.div>
              );
            })}
          </div>
        ))}
        <MiniChip tone="muted">cost grid</MiniChip>
      </div>
    </MiniVizShell>
  );
}
