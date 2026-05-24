import type { LucideIcon } from "lucide-react";
import {
  Cpu,
  Hash,
  Layers,
  Link2,
  ListOrdered,
  MousePointerClick,
  Repeat,
  Route,
  Search,
  Share2,
  Shuffle,
  Sparkles,
  TreePine,
  Workflow,
} from "lucide-react";

export type LibraryTopic = { name: string; slug: string };

export type LibraryCategory = {
  name: string;
  algorithms: LibraryTopic[];
};

export const libraryCategories: LibraryCategory[] = [
  {
    name: "Arrays & Basic Operations",
    algorithms: [
      { name: "Array Traversal", slug: "array-traversal" },
      { name: "Insertion in Array", slug: "insertion-in-array" },
      { name: "Deletion in Array", slug: "deletion-in-array" },
      { name: "Rotation of Array", slug: "rotation-of-array" },
      { name: "Prefix Sum", slug: "prefix-sum" },
      { name: "Sliding Window Technique", slug: "sliding-window" },
      { name: "Two Pointer Technique", slug: "two-pointers" },
      { name: "Kadane's Algorithm", slug: "kadanes-algorithm" },
      { name: "Majority Element (Moore's Voting)", slug: "majority-element" },
      { name: "Dutch National Flag Algorithm", slug: "dutch-national-flag" },
    ],
  },
  {
    name: "Searching Algorithms",
    algorithms: [
      { name: "Linear Search", slug: "linear-search" },
      { name: "Binary Search", slug: "binary-search" },
      { name: "Ternary Search", slug: "ternary-search" },
      { name: "Jump Search", slug: "jump-search" },
      { name: "Interpolation Search", slug: "interpolation-search" },
      { name: "Exponential Search", slug: "exponential-search" },
    ],
  },
  {
    name: "Sorting Algorithms",
    algorithms: [
      { name: "Bubble Sort", slug: "bubble-sort" },
      { name: "Selection Sort", slug: "selection-sort" },
      { name: "Insertion Sort", slug: "insertion-sort" },
      { name: "Merge Sort", slug: "merge-sort" },
      { name: "Quick Sort", slug: "quick-sort" },
      { name: "Heap Sort", slug: "heap-sort" },
      { name: "Counting Sort", slug: "counting-sort" },
      { name: "Radix Sort", slug: "radix-sort" },
      { name: "Bucket Sort", slug: "bucket-sort" },
      {
        name: "Stable vs Unstable Sorting",
        slug: "stable-vs-unstable-sorting",
      },
      {
        name: "In-place vs Out-of-place Sorting",
        slug: "inplace-vs-outofplace-sorting",
      },
    ],
  },
  {
    name: "Recursion Patterns",
    algorithms: [
      { name: "Basic Recursion", slug: "basic-recursion" },
      { name: "Tail Recursion", slug: "tail-recursion" },
      { name: "Factorial", slug: "factorial" },
      { name: "Fibonacci", slug: "fibonacci" },
      { name: "Tower of Hanoi", slug: "tower-of-hanoi" },
      { name: "Subset Generation", slug: "subset-generation" },
      { name: "Permutations", slug: "permutations" },
    ],
  },
  {
    name: "Linked Lists",
    algorithms: [
      { name: "Singly Linked List", slug: "singly-linked-list" },
      { name: "Doubly Linked List", slug: "doubly-linked-list" },
      { name: "Circular Linked List", slug: "circular-linked-list" },
      { name: "Insertion Operations", slug: "linked-list-insertion" },
      { name: "Deletion Operations", slug: "linked-list-deletion" },
      { name: "Reverse Linked List", slug: "reverse-linked-list" },
      { name: "Detect Cycle (Floyd's Algorithm)", slug: "detect-cycle" },
      { name: "Merge Two Sorted Lists", slug: "merge-two-lists" },
      {
        name: "Intersection of Linked Lists",
        slug: "intersection-of-linked-lists",
      },
    ],
  },
  {
    name: "Stack Algorithms",
    algorithms: [
      { name: "Stack Push / Pop", slug: "stack-push-pop" },
      { name: "Stack using Array", slug: "stack-using-array" },
      { name: "Stack using Linked List", slug: "stack-using-linked-list" },
      { name: "Balanced Parentheses", slug: "balanced-parentheses" },
      { name: "Infix to Postfix", slug: "infix-to-postfix" },
      { name: "Postfix Evaluation", slug: "postfix-evaluation" },
      { name: "Next Greater Element", slug: "next-greater-element" },
      {
        name: "Largest Rectangle in Histogram",
        slug: "largest-rectangle-histogram",
      },
    ],
  },
  {
    name: "Queue Algorithms",
    algorithms: [
      { name: "Queue Operations", slug: "queue-operations" },
      { name: "Circular Queue", slug: "circular-queue" },
      { name: "Deque", slug: "deque" },
      { name: "Priority Queue", slug: "priority-queue" },
      { name: "Queue using Stack", slug: "queue-using-stack" },
      { name: "Stack using Queue", slug: "stack-using-queue" },
    ],
  },
  {
    name: "Hashing",
    algorithms: [
      { name: "Hash Table", slug: "hash-table" },
      { name: "Hash Functions", slug: "hash-functions" },
      { name: "Collision Handling", slug: "collision-handling" },
      { name: "Chaining", slug: "chaining" },
      { name: "Open Addressing", slug: "open-addressing" },
      { name: "Linear Probing", slug: "linear-probing" },
      { name: "Quadratic Probing", slug: "quadratic-probing" },
      { name: "Double Hashing", slug: "double-hashing" },
    ],
  },
  {
    name: "Trees",
    algorithms: [
      { name: "Tree Terminology", slug: "tree-terminology" },
      { name: "Binary Tree", slug: "binary-tree" },
      { name: "Inorder Traversal", slug: "inorder-traversal" },
      { name: "Preorder Traversal", slug: "preorder-traversal" },
      { name: "Postorder Traversal", slug: "postorder-traversal" },
      { name: "Level Order Traversal", slug: "level-order-traversal" },
      { name: "BST Insertion", slug: "bst-insertion" },
      { name: "BST Deletion", slug: "bst-deletion" },
      { name: "BST Search", slug: "bst-search" },
      { name: "AVL Tree (Rotations)", slug: "avl-tree" },
      { name: "Red-Black Tree", slug: "red-black-tree" },
      { name: "Min Heap", slug: "min-heap" },
      { name: "Max Heap", slug: "max-heap" },
      { name: "Heapify", slug: "heapify" },
      { name: "Segment Tree", slug: "segment-tree" },
      { name: "Fenwick Tree (Binary Indexed Tree)", slug: "fenwick-tree" },
      { name: "Trie (Prefix Tree)", slug: "trie" },
    ],
  },
  {
    name: "Graph Algorithms",
    algorithms: [
      { name: "Graph Representation", slug: "graph-representation" },
      {
        name: "Directed vs Undirected Graph",
        slug: "directed-vs-undirected",
      },
      {
        name: "Weighted vs Unweighted Graph",
        slug: "weighted-vs-unweighted",
      },
      { name: "Breadth First Search (BFS)", slug: "bfs" },
      { name: "Depth First Search (DFS)", slug: "dfs" },
      { name: "Dijkstra's Algorithm", slug: "dijkstras" },
      { name: "Bellman-Ford Algorithm", slug: "bellman-ford" },
      { name: "Floyd-Warshall Algorithm", slug: "floyd-warshall" },
      { name: "A* Algorithm", slug: "a-star" },
      { name: "Kruskal's Algorithm", slug: "kruskals" },
      { name: "Prim's Algorithm", slug: "prims" },
      { name: "Topological Sort", slug: "topological-sort" },
      { name: "Union Find (Disjoint Set)", slug: "union-find" },
      { name: "Cycle Detection", slug: "cycle-detection" },
    ],
  },
  {
    name: "Dynamic Programming",
    algorithms: [
      { name: "Memoization", slug: "memoization" },
      { name: "Tabulation", slug: "tabulation" },
      { name: "Fibonacci DP", slug: "fibonacci-dp" },
      { name: "Climbing Stairs", slug: "climbing-stairs" },
      { name: "Coin Change", slug: "coin-change" },
      { name: "0/1 Knapsack", slug: "knapsack" },
      { name: "Unbounded Knapsack", slug: "unbounded-knapsack" },
      {
        name: "Longest Common Subsequence",
        slug: "longest-common-subsequence",
      },
      {
        name: "Longest Increasing Subsequence",
        slug: "longest-increasing-subsequence",
      },
      {
        name: "Matrix Chain Multiplication",
        slug: "matrix-chain-multiplication",
      },
      { name: "Edit Distance", slug: "edit-distance" },
    ],
  },
  {
    name: "Greedy Algorithms",
    algorithms: [
      { name: "Activity Selection", slug: "activity-selection" },
      { name: "Fractional Knapsack", slug: "fractional-knapsack" },
      { name: "Job Sequencing", slug: "job-sequencing" },
      { name: "Huffman Coding", slug: "huffman-coding" },
      { name: "Optimal Merge Pattern", slug: "optimal-merge-pattern" },
    ],
  },
  {
    name: "Backtracking",
    algorithms: [
      { name: "Subset Sum", slug: "subset-sum" },
      { name: "Permutations", slug: "backtracking-permutations" },
      { name: "Combinations", slug: "combinations" },
      { name: "N-Queens Problem", slug: "n-queens" },
      { name: "Sudoku Solver", slug: "sudoku-solver" },
      { name: "Rat in a Maze", slug: "rat-in-maze" },
    ],
  },
  {
    name: "Advanced Algorithms",
    algorithms: [
      { name: "KMP String Matching", slug: "kmp-string-matching" },
      { name: "Rabin-Karp Algorithm", slug: "rabin-karp" },
      { name: "Z Algorithm", slug: "z-algorithm" },
      { name: "Manacher's Algorithm", slug: "manachers-algorithm" },
      { name: "Suffix Array", slug: "suffix-array" },
      { name: "Suffix Tree", slug: "suffix-tree" },
      { name: "Network Flow (Ford-Fulkerson)", slug: "ford-fulkerson" },
      { name: "Edmonds-Karp Algorithm", slug: "edmonds-karp" },
    ],
  },
];

export const libraryCategoryIconMap: Record<string, LucideIcon> = {
  "Arrays & Basic Operations": MousePointerClick,
  "Searching Algorithms": Search,
  "Sorting Algorithms": Shuffle,
  "Recursion Patterns": Repeat,
  "Linked Lists": Link2,
  "Stack Algorithms": Layers,
  "Queue Algorithms": ListOrdered,
  Hashing: Hash,
  Trees: TreePine,
  "Graph Algorithms": Share2,
  "Dynamic Programming": Workflow,
  "Greedy Algorithms": Sparkles,
  Backtracking: Route,
  "Advanced Algorithms": Cpu,
};

export const totalLibraryTopics = libraryCategories.reduce(
  (sum, category) => sum + category.algorithms.length,
  0,
);
