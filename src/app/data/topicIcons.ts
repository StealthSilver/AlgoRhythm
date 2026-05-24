import type { LucideIcon } from "lucide-react";
import {
  ArrowDownUp,
  ArrowLeftRight,
  ArrowRight,
  ArrowUpDown,
  Binary,
  Boxes,
  Braces,
  BrainCircuit,
  Calculator,
  ChartNetwork,
  CircleDot,
  Crown,
  FileCode2,
  Footprints,
  GitBranch,
  GitCompare,
  Grid3x3,
  Hash,
  Layers,
  Link2,
  ListOrdered,
  ListTree,
  Map,
  MousePointerClick,
  Network,
  Package,
  Puzzle,
  Repeat,
  Route,
  ScanSearch,
  Search,
  Share2,
  Shuffle,
  Sparkles,
  SquareStack,
  Table2,
  Target,
  TextSearch,
  TreePine,
  TrendingUp,
  Waypoints,
  Workflow,
  Zap,
} from "lucide-react";

import { libraryCategoryIconMap } from "./algorithmLibrary";

const slugIconMap: Record<string, LucideIcon> = {
  "array-traversal": ListTree,
  "insertion-in-array": ArrowRight,
  "deletion-in-array": ArrowLeftRight,
  "rotation-of-array": ArrowDownUp,
  "prefix-sum": Calculator,
  "sliding-window": SquareStack,
  "two-pointers": MousePointerClick,
  "kadanes-algorithm": TrendingUp,
  "majority-element": Target,
  "dutch-national-flag": Grid3x3,
  "linear-search": ScanSearch,
  "binary-search": Search,
  "ternary-search": Search,
  "jump-search": Zap,
  "interpolation-search": ChartNetwork,
  "exponential-search": TrendingUp,
  "bubble-sort": ArrowUpDown,
  "selection-sort": Target,
  "insertion-sort": ArrowRight,
  "merge-sort": GitCompare,
  "quick-sort": Zap,
  "heap-sort": Layers,
  "counting-sort": Table2,
  "radix-sort": Hash,
  "bucket-sort": Boxes,
  "stable-vs-unstable-sorting": GitBranch,
  "inplace-vs-outofplace-sorting": ArrowLeftRight,
  "basic-recursion": Repeat,
  "tail-recursion": Repeat,
  factorial: Calculator,
  fibonacci: TrendingUp,
  "tower-of-hanoi": Layers,
  "subset-generation": Braces,
  permutations: Shuffle,
  "singly-linked-list": Link2,
  "doubly-linked-list": Link2,
  "circular-linked-list": CircleDot,
  "linked-list-insertion": ArrowRight,
  "linked-list-deletion": ArrowLeftRight,
  "reverse-linked-list": ArrowDownUp,
  "detect-cycle": CircleDot,
  "merge-two-lists": GitCompare,
  "intersection-of-linked-lists": Share2,
  "stack-push-pop": Layers,
  "stack-using-array": SquareStack,
  "stack-using-linked-list": Link2,
  "balanced-parentheses": Braces,
  "infix-to-postfix": FileCode2,
  "postfix-evaluation": Calculator,
  "next-greater-element": TrendingUp,
  "largest-rectangle-histogram": ChartNetwork,
  "queue-operations": ListOrdered,
  "circular-queue": CircleDot,
  deque: ArrowLeftRight,
  "priority-queue": Target,
  "queue-using-stack": Layers,
  "stack-using-queue": ListOrdered,
  "hash-table": Hash,
  "hash-functions": Hash,
  "collision-handling": Share2,
  chaining: Link2,
  "open-addressing": Map,
  "linear-probing": ArrowRight,
  "quadratic-probing": TrendingUp,
  "double-hashing": Hash,
  "tree-terminology": TreePine,
  "binary-tree": TreePine,
  "inorder-traversal": ArrowRight,
  "preorder-traversal": ArrowDownUp,
  "postorder-traversal": ArrowUpDown,
  "level-order-traversal": ListTree,
  "bst-insertion": ArrowRight,
  "bst-deletion": ArrowLeftRight,
  "bst-search": Search,
  "avl-tree": GitBranch,
  "red-black-tree": CircleDot,
  "min-heap": Layers,
  "max-heap": Layers,
  heapify: ArrowDownUp,
  "segment-tree": ChartNetwork,
  "fenwick-tree": Table2,
  trie: TextSearch,
  "graph-representation": Network,
  "directed-vs-undirected": Share2,
  "weighted-vs-unweighted": Target,
  bfs: Share2,
  dfs: GitBranch,
  dijkstras: Route,
  "bellman-ford": Route,
  "floyd-warshall": Network,
  "a-star": Target,
  kruskals: GitBranch,
  prims: TreePine,
  "topological-sort": ArrowDownUp,
  "union-find": Link2,
  "cycle-detection": CircleDot,
  memoization: BrainCircuit,
  tabulation: Table2,
  "fibonacci-dp": TrendingUp,
  "climbing-stairs": TrendingUp,
  "coin-change": CircleDot,
  knapsack: Package,
  "unbounded-knapsack": Boxes,
  "longest-common-subsequence": TextSearch,
  "longest-increasing-subsequence": TrendingUp,
  "matrix-chain-multiplication": Table2,
  "edit-distance": FileCode2,
  "activity-selection": Target,
  "fractional-knapsack": Package,
  "job-sequencing": ListOrdered,
  "huffman-coding": Binary,
  "optimal-merge-pattern": GitCompare,
  "subset-sum": Calculator,
  "backtracking-permutations": Shuffle,
  combinations: Braces,
  "n-queens": Crown,
  "sudoku-solver": Grid3x3,
  "rat-in-maze": Footprints,
  "kmp-string-matching": TextSearch,
  "rabin-karp": Hash,
  "z-algorithm": TextSearch,
  "manachers-algorithm": TextSearch,
  "suffix-array": ListTree,
  "suffix-tree": TreePine,
  "ford-fulkerson": Network,
  "edmonds-karp": Waypoints,
};

export function getTopicIcon(
  slug: string,
  name: string,
  categoryName: string,
): LucideIcon {
  if (slugIconMap[slug]) return slugIconMap[slug];

  const haystack = `${slug} ${name}`.toLowerCase();

  if (/queen|sudoku|maze|backtrack|subset|combin/.test(haystack)) {
    if (/queen/.test(haystack)) return Crown;
    if (/sudoku/.test(haystack)) return Grid3x3;
    if (/maze/.test(haystack)) return Footprints;
    return Puzzle;
  }
  if (/string|suffix|kmp|rabin|manacher|subsequence|edit/.test(haystack)) {
    return TextSearch;
  }
  if (/graph|bfs|dfs|dijkstra|bellman|kruskal|prim|topological|flow/.test(haystack)) {
    return Share2;
  }
  if (/tree|heap|bst|avl|segment|fenwick|trie|inorder|preorder|postorder/.test(haystack)) {
    return TreePine;
  }
  if (/stack|parenthes|postfix|infix|histogram/.test(haystack)) return Layers;
  if (/queue|deque/.test(haystack)) return ListOrdered;
  if (/hash|prob|chain|collision/.test(haystack)) return Hash;
  if (/knapsack|coin|matrix|memo|tabulat|dynamic|dp/.test(haystack)) {
    return Workflow;
  }
  if (/greedy|huffman|activity|fractional/.test(haystack)) return Sparkles;
  if (/sort|radix|bucket|counting|stable/.test(haystack)) return ArrowUpDown;
  if (/search|binary|linear|jump|ternary/.test(haystack)) return Search;
  if (/linked|cycle|list/.test(haystack)) return Link2;
  if (/recursion|factorial|permut|subset|hanoi|tower/.test(haystack)) return Repeat;
  if (/array|pointer|window|kadane|dutch|rotation|prefix|majority/.test(haystack)) {
    return MousePointerClick;
  }

  return libraryCategoryIconMap[categoryName] ?? Sparkles;
}
