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
    <div className="hero-grid-bg hero-grid-mobile relative grid w-[min(100vw,1280px)] max-sm:ml-auto max-sm:w-[148vw] max-sm:translate-x-[14vw] max-sm:gap-4 shrink-0 grid-cols-4 grid-rows-3 opacity-[0.55]">
      {HERO_ANIMATIONS.map(({ id, Component }) => (
        <div
          key={id}
          className="relative flex min-h-[210px] max-sm:min-h-[252px] items-center justify-center overflow-hidden sm:min-h-[230px] lg:min-h-[260px]"
        >
          <div className="hero-mini-viz shrink-0">
            <Component />
          </div>
        </div>
      ))}
      <div aria-hidden className="hero-viz-fade absolute inset-0" />
    </div>
  );
}
