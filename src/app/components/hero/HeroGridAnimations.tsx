"use client";

import {
  AVLRotationMini,
  BFSMini,
  BinarySearchMini,
  BubbleSortMini,
  DFSMini,
  DijkstraMini,
  DPGridFillMini,
  LinearSearchMini,
  MergeSortMini,
  QuickSortMini,
  StackOperationsMini,
  TowerOfHanoiMini,
} from "./mini-animations";

/**
 * 4×3 grid — similar algorithms kept apart (no shared edges).
 *
 * | linear    | hanoi     | bfs       | merge     |
 * | avl       | binary    | quick     | dfs       |
 * | dijkstra  | stack     | dp        | bubble    |
 */
const HERO_ANIMATIONS = [
  { id: "linear-search", Component: LinearSearchMini },
  { id: "tower-of-hanoi", Component: TowerOfHanoiMini },
  { id: "bfs", Component: BFSMini },
  { id: "merge-sort", Component: MergeSortMini },
  { id: "avl-rotations", Component: AVLRotationMini },
  { id: "binary-search", Component: BinarySearchMini },
  { id: "quick-sort", Component: QuickSortMini },
  { id: "dfs", Component: DFSMini },
  { id: "dijkstra", Component: DijkstraMini },
  { id: "stack-operations", Component: StackOperationsMini },
  { id: "dp-grid-fill", Component: DPGridFillMini },
  { id: "bubble-sort", Component: BubbleSortMini },
] as const;

export function HeroGridAnimations() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 grid grid-cols-4 grid-rows-3 opacity-[0.72] dark:opacity-[0.65]"
    >
      {HERO_ANIMATIONS.map(({ id, Component }) => (
        <div key={id} className="relative overflow-hidden">
          <Component />
        </div>
      ))}
    </div>
  );
}
