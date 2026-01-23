export interface Algorithm {
  name: string;
  slug: string;
  category: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  steps: string[];
  useCases: string[];
}

type AlgorithmData = {
  [key: string]: Algorithm;
};

export const algorithmData: AlgorithmData = {
  "bubble-sort": {
    name: "Bubble Sort",
    slug: "bubble-sort",
    category: "Sorting",
    description:
      "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. The algorithm gets its name because smaller elements 'bubble' to the top of the list.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    steps: [
      "Start from the first element of the array",
      "Compare the current element with the next element",
      "If the current element is greater than the next element, swap them",
      "Move to the next element and repeat steps 2-3",
      "Continue until the end of the array is reached",
      "Repeat the entire process until no swaps are needed",
    ],
    useCases: [
      "Educational purposes to understand sorting concepts",
      "Small datasets where simplicity is more important than efficiency",
      "Nearly sorted data where it can perform better than expected",
    ],
  },
  "quick-sort": {
    name: "Quick Sort",
    slug: "quick-sort",
    category: "Sorting",
    description:
      "Quick Sort is an efficient, in-place sorting algorithm that uses a divide-and-conquer strategy. It works by selecting a 'pivot' element and partitioning the array around it, such that elements smaller than the pivot come before it and elements greater come after it. This process is then recursively applied to the sub-arrays.",
    timeComplexity: "O(n log n) average, O(n²) worst",
    spaceComplexity: "O(log n)",
    steps: [
      "Choose a pivot element from the array",
      "Partition the array so elements less than pivot are on the left, greater are on the right",
      "Recursively apply the same process to the left sub-array",
      "Recursively apply the same process to the right sub-array",
      "Combine the results to get the sorted array",
    ],
    useCases: [
      "General-purpose sorting for large datasets",
      "When average-case performance is more important than worst-case",
      "Systems where in-place sorting is required to save memory",
    ],
  },
  "merge-sort": {
    name: "Merge Sort",
    slug: "merge-sort",
    category: "Sorting",
    description:
      "Merge Sort is a stable, divide-and-conquer sorting algorithm that divides the input array into two halves, recursively sorts them, and then merges the two sorted halves. It guarantees O(n log n) time complexity in all cases, making it very predictable and reliable.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    steps: [
      "Divide the unsorted array into two halves",
      "Recursively sort the first half",
      "Recursively sort the second half",
      "Merge the two sorted halves into a single sorted array",
      "During merge, compare elements from both halves and place them in order",
    ],
    useCases: [
      "When stable sorting is required",
      "Sorting linked lists efficiently",
      "External sorting where data doesn't fit in memory",
      "When predictable O(n log n) performance is needed",
    ],
  },
  "insertion-sort": {
    name: "Insertion Sort",
    slug: "insertion-sort",
    category: "Sorting",
    description:
      "Insertion Sort builds the final sorted array one item at a time. It iterates through an input array and removes one element per iteration, finds the place it belongs in the sorted portion, and inserts it there. It's much like sorting playing cards in your hands.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    steps: [
      "Start with the second element (first element is considered sorted)",
      "Compare the current element with elements in the sorted portion",
      "Shift all larger elements in the sorted portion one position to the right",
      "Insert the current element at its correct position",
      "Repeat for all elements in the array",
    ],
    useCases: [
      "Small datasets where simplicity matters",
      "Nearly sorted data (performs in O(n) time)",
      "Online algorithms where data arrives one piece at a time",
    ],
  },
  "selection-sort": {
    name: "Selection Sort",
    slug: "selection-sort",
    category: "Sorting",
    description:
      "Selection Sort divides the array into a sorted and unsorted region. It repeatedly finds the minimum element from the unsorted region and moves it to the end of the sorted region. Despite its simplicity, it performs poorly on large lists.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    steps: [
      "Set the first position as the minimum",
      "Search through the entire array to find the actual minimum",
      "Swap the minimum with the element at the first position",
      "Move to the next position and repeat steps 1-3",
      "Continue until the entire array is sorted",
    ],
    useCases: [
      "When memory space is limited (in-place sorting)",
      "Small datasets",
      "When the cost of swapping is high (makes minimum number of swaps)",
    ],
  },
  "heap-sort": {
    name: "Heap Sort",
    slug: "heap-sort",
    category: "Sorting",
    description:
      "Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It first builds a max heap from the input data, then repeatedly extracts the maximum element and rebuilds the heap until all elements are sorted.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    steps: [
      "Build a max heap from the input data",
      "Swap the root (maximum) with the last element",
      "Reduce the heap size by one",
      "Heapify the root element",
      "Repeat steps 2-4 until the heap size is 1",
    ],
    useCases: [
      "When consistent O(n log n) performance is needed",
      "Systems with limited memory (in-place sorting)",
      "Priority queue implementations",
    ],
  },
  "linear-search": {
    name: "Linear Search",
    slug: "linear-search",
    category: "Searching",
    description:
      "Linear Search is the simplest searching algorithm that checks every element in the list sequentially until the target element is found or the list ends. It doesn't require the data to be sorted and works on any type of list.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    steps: [
      "Start from the first element of the array",
      "Compare the current element with the target value",
      "If they match, return the current index",
      "If not, move to the next element",
      "Repeat until the element is found or the end is reached",
    ],
    useCases: [
      "Unsorted or small datasets",
      "When data structure doesn't support faster search methods",
      "When simplicity is more important than performance",
    ],
  },
  "binary-search": {
    name: "Binary Search",
    slug: "binary-search",
    category: "Searching",
    description:
      "Binary Search is an efficient algorithm for finding an item in a sorted array. It works by repeatedly dividing the search interval in half. If the target value is less than the middle element, search the left half; otherwise, search the right half.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1) iterative, O(log n) recursive",
    steps: [
      "Start with the middle element of the sorted array",
      "If the target equals the middle element, return its position",
      "If the target is less than the middle, search the left half",
      "If the target is greater than the middle, search the right half",
      "Repeat until the element is found or the search space is empty",
    ],
    useCases: [
      "Searching in sorted arrays or lists",
      "Database indexing",
      "Finding elements in large sorted datasets efficiently",
    ],
  },
  "jump-search": {
    name: "Jump Search",
    slug: "jump-search",
    category: "Searching",
    description:
      "Jump Search is a searching algorithm for sorted arrays. It works by jumping ahead by fixed steps and then performing a linear search in the identified block. The optimal jump size is √n, making it faster than linear search but slower than binary search.",
    timeComplexity: "O(√n)",
    spaceComplexity: "O(1)",
    steps: [
      "Determine the optimal jump size (usually √n)",
      "Jump through the array by the jump size",
      "When a jump overshoots the target, go back one jump",
      "Perform linear search in that block",
      "Return the index if found, otherwise return not found",
    ],
    useCases: [
      "Sorted arrays where binary search is not feasible",
      "Systems where jumping is faster than direct access",
      "Compromise between linear and binary search",
    ],
  },
  "two-pointers": {
    name: "Two Pointers",
    slug: "two-pointers",
    category: "Arrays",
    description:
      "Two Pointers is a technique where two pointers iterate through an array, typically from different ends or at different speeds. It's commonly used to solve array problems in linear time and constant space, especially for sorted arrays.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    steps: [
      "Initialize two pointers (usually at the start and end, or both at start)",
      "Move the pointers based on certain conditions",
      "Process elements at pointer positions",
      "Continue until pointers meet or cross",
      "Return the result based on problem requirements",
    ],
    useCases: [
      "Finding pairs with a specific sum in sorted arrays",
      "Removing duplicates from sorted arrays",
      "Container with most water problem",
      "Palindrome checking",
    ],
  },
  "sliding-window": {
    name: "Sliding Window",
    slug: "sliding-window",
    category: "Arrays",
    description:
      "Sliding Window is a technique for processing arrays or lists by maintaining a window of elements and sliding it through the data structure. It's useful for problems involving subarrays or substrings with specific properties.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(k) where k is window size",
    steps: [
      "Initialize the window with the first k elements",
      "Process the current window to compute the result",
      "Slide the window by removing the leftmost element and adding the next element",
      "Update the result based on the new window",
      "Continue until the end of the array is reached",
    ],
    useCases: [
      "Finding maximum sum subarray of size k",
      "Longest substring with k distinct characters",
      "Minimum window substring problems",
      "Moving average calculations",
    ],
  },
  "kadanes-algorithm": {
    name: "Kadane's Algorithm",
    slug: "kadanes-algorithm",
    category: "Arrays",
    description:
      "Kadane's Algorithm is used to find the maximum sum of a contiguous subarray within a one-dimensional array. It uses dynamic programming principles and runs in linear time, making it very efficient.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    steps: [
      "Initialize max_so_far and max_ending_here to the first element",
      "Iterate through the array starting from the second element",
      "For each element, update max_ending_here as max(element, max_ending_here + element)",
      "Update max_so_far if max_ending_here is greater",
      "Return max_so_far as the maximum subarray sum",
    ],
    useCases: [
      "Finding maximum profit in stock trading",
      "Image processing for feature detection",
      "Analyzing time series data",
      "Maximum subarray sum problems",
    ],
  },
  "dutch-national-flag": {
    name: "Dutch National Flag",
    slug: "dutch-national-flag",
    category: "Arrays",
    description:
      "The Dutch National Flag algorithm is a sorting algorithm that partitions an array into three parts. It's commonly used to sort an array of 0s, 1s, and 2s in linear time using constant space.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    steps: [
      "Initialize three pointers: low, mid, and high",
      "Traverse the array with the mid pointer",
      "If element is 0, swap with low pointer and increment both low and mid",
      "If element is 1, just increment mid pointer",
      "If element is 2, swap with high pointer and decrement high",
      "Continue until mid crosses high",
    ],
    useCases: [
      "Sorting arrays with three distinct values",
      "Partitioning algorithms",
      "Color sorting problems",
      "Three-way partitioning in quick sort",
    ],
  },
  "reverse-linked-list": {
    name: "Reverse Linked List",
    slug: "reverse-linked-list",
    category: "Linked Lists",
    description:
      "Reversing a linked list involves changing the direction of all the pointers in the list so that the last node becomes the first node. This can be done iteratively or recursively.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1) iterative, O(n) recursive",
    steps: [
      "Initialize three pointers: previous (null), current (head), and next",
      "Iterate through the list",
      "Store the next node before changing the pointer",
      "Reverse the current node's pointer to point to previous",
      "Move previous and current one step forward",
      "Repeat until current becomes null",
    ],
    useCases: [
      "Reversing navigation history",
      "Undo operations in applications",
      "Problem solving in interviews",
      "Implementing stack operations",
    ],
  },
  "detect-cycle": {
    name: "Detect Cycle",
    slug: "detect-cycle",
    category: "Linked Lists",
    description:
      "Floyd's Cycle Detection Algorithm (Tortoise and Hare) detects if a linked list contains a cycle. It uses two pointers moving at different speeds - if there's a cycle, they will eventually meet.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    steps: [
      "Initialize slow and fast pointers at the head",
      "Move slow pointer one step at a time",
      "Move fast pointer two steps at a time",
      "If fast pointer reaches null, there's no cycle",
      "If slow and fast pointers meet, there's a cycle",
    ],
    useCases: [
      "Detecting infinite loops in linked lists",
      "Memory leak detection",
      "Graph cycle detection",
      "Validating data structures",
    ],
  },
  "merge-two-lists": {
    name: "Merge Two Lists",
    slug: "merge-two-lists",
    category: "Linked Lists",
    description:
      "Merging two sorted linked lists involves comparing nodes from both lists and linking them in ascending order to create a single sorted list. This is a fundamental operation used in merge sort.",
    timeComplexity: "O(n + m)",
    spaceComplexity: "O(1)",
    steps: [
      "Create a dummy node to simplify edge cases",
      "Initialize a current pointer to the dummy node",
      "Compare the current nodes of both lists",
      "Link the smaller node to current and move that list's pointer",
      "Continue until one list is exhausted",
      "Attach the remaining nodes from the non-empty list",
    ],
    useCases: [
      "Merge sort implementation for linked lists",
      "Combining sorted data streams",
      "Database merge operations",
      "Priority queue merging",
    ],
  },
  "remove-nth-node": {
    name: "Remove Nth Node",
    slug: "remove-nth-node",
    category: "Linked Lists",
    description:
      "Removing the nth node from the end of a linked list can be efficiently done using the two-pointer technique. One pointer moves n steps ahead, then both pointers move together until the first reaches the end.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    steps: [
      "Create a dummy node pointing to the head",
      "Initialize fast pointer n+1 steps ahead of slow pointer",
      "Move both pointers together until fast reaches the end",
      "The slow pointer now points to the node before the target",
      "Remove the target node by updating pointers",
      "Return the head of the modified list",
    ],
    useCases: [
      "Removing elements from lists",
      "Implementing deletion operations",
      "List manipulation problems",
      "Cache eviction strategies",
    ],
  },
  "tree-traversal": {
    name: "Tree Traversal",
    slug: "tree-traversal",
    category: "Trees",
    description:
      "Tree traversal refers to visiting all nodes in a tree data structure. Common methods include In-order (left, root, right), Pre-order (root, left, right), and Post-order (left, right, root) for binary trees, and Level-order for breadth-first traversal.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h) where h is height",
    steps: [
      "Choose a traversal method based on requirements",
      "For In-order: recursively visit left subtree, visit root, visit right subtree",
      "For Pre-order: visit root, recursively visit left subtree, visit right subtree",
      "For Post-order: recursively visit left subtree, visit right subtree, visit root",
      "For Level-order: use a queue to visit nodes level by level",
    ],
    useCases: [
      "Searching for nodes in a tree",
      "Serializing and deserializing trees",
      "Expression evaluation (post-order)",
      "Directory traversal",
    ],
  },
  "binary-search-tree": {
    name: "Binary Search Tree",
    slug: "binary-search-tree",
    category: "Trees",
    description:
      "A Binary Search Tree (BST) is a tree data structure where each node has at most two children. For each node, all values in the left subtree are less than the node's value, and all values in the right subtree are greater.",
    timeComplexity: "O(log n) average, O(n) worst",
    spaceComplexity: "O(n)",
    steps: [
      "Start at the root node",
      "Compare the target value with the current node",
      "If equal, the search is successful",
      "If less, move to the left child",
      "If greater, move to the right child",
      "Repeat until the value is found or a null child is reached",
    ],
    useCases: [
      "Maintaining sorted data with fast insertions and deletions",
      "Database indexing",
      "Priority queue implementation",
      "Expression parsing",
    ],
  },
  "avl-tree": {
    name: "AVL Tree",
    slug: "avl-tree",
    category: "Trees",
    description:
      "An AVL tree is a self-balancing binary search tree where the heights of the two child subtrees of any node differ by at most one. When this balance is violated, rotations are performed to restore balance.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(n)",
    steps: [
      "Perform standard BST insertion or deletion",
      "Update the height of the current node",
      "Calculate the balance factor (left height - right height)",
      "If balance factor > 1, perform right rotation",
      "If balance factor < -1, perform left rotation",
      "Handle left-right and right-left cases with double rotations",
    ],
    useCases: [
      "Applications requiring frequent insertions and deletions with guaranteed O(log n) time",
      "Database implementations",
      "File systems",
      "In-memory tables",
    ],
  },
  "segment-tree": {
    name: "Segment Tree",
    slug: "segment-tree",
    category: "Trees",
    description:
      "A Segment Tree is a tree data structure used for storing intervals or segments. It allows for efficient query operations over an array, particularly for range queries and updates.",
    timeComplexity: "O(log n) query and update",
    spaceComplexity: "O(n)",
    steps: [
      "Build the tree by recursively dividing the array into segments",
      "Store aggregated information (sum, min, max) at each node",
      "For queries, combine results from relevant segments",
      "For updates, modify the affected nodes from leaf to root",
      "Use lazy propagation for range updates if needed",
    ],
    useCases: [
      "Range sum queries with updates",
      "Finding minimum or maximum in a range",
      "Computational geometry problems",
      "Game development for collision detection",
    ],
  },
  dfs: {
    name: "Depth-First Search (DFS)",
    slug: "dfs",
    category: "Graphs",
    description:
      "Depth-First Search is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It uses a stack (or recursion) to remember where to go next after reaching a dead end.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    steps: [
      "Start at the source node and mark it as visited",
      "Explore an unvisited adjacent node",
      "Recursively apply DFS to that node",
      "Backtrack when no unvisited adjacent nodes remain",
      "Continue until all reachable nodes are visited",
    ],
    useCases: [
      "Finding connected components",
      "Detecting cycles in graphs",
      "Topological sorting",
      "Solving maze problems",
      "Path finding in games",
    ],
  },
  bfs: {
    name: "Breadth-First Search (BFS)",
    slug: "bfs",
    category: "Graphs",
    description:
      "Breadth-First Search is a graph traversal algorithm that explores all neighbors at the present depth before moving to nodes at the next depth level. It uses a queue to keep track of nodes to visit.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    steps: [
      "Start at the source node and add it to the queue",
      "Mark the node as visited",
      "Dequeue a node and explore all its unvisited neighbors",
      "Add unvisited neighbors to the queue and mark them as visited",
      "Repeat until the queue is empty",
    ],
    useCases: [
      "Finding shortest path in unweighted graphs",
      "Level-order traversal of trees",
      "Web crawling",
      "Social network analysis",
      "GPS navigation systems",
    ],
  },
  dijkstras: {
    name: "Dijkstra's Algorithm",
    slug: "dijkstras",
    category: "Graphs",
    description:
      "Dijkstra's Algorithm finds the shortest path from a source node to all other nodes in a weighted graph with non-negative edge weights. It greedily selects the node with the smallest known distance.",
    timeComplexity: "O((V + E) log V) with priority queue",
    spaceComplexity: "O(V)",
    steps: [
      "Initialize distances to all nodes as infinity, except source (0)",
      "Add source to priority queue",
      "Extract node with minimum distance from queue",
      "For each neighbor, calculate tentative distance",
      "If tentative distance is less than current distance, update it",
      "Repeat until all nodes are processed",
    ],
    useCases: [
      "GPS navigation and route planning",
      "Network routing protocols",
      "Robot path planning",
      "Flight itinerary planning",
    ],
  },
  "bellman-ford": {
    name: "Bellman-Ford",
    slug: "bellman-ford",
    category: "Graphs",
    description:
      "Bellman-Ford Algorithm computes shortest paths from a source node to all other nodes in a weighted graph. Unlike Dijkstra's, it can handle negative edge weights and detect negative cycles.",
    timeComplexity: "O(V × E)",
    spaceComplexity: "O(V)",
    steps: [
      "Initialize distances to all nodes as infinity, except source (0)",
      "Relax all edges V-1 times",
      "For each edge, if distance to destination can be shortened, update it",
      "After V-1 iterations, check for negative cycles",
      "If any distance can still be reduced, a negative cycle exists",
    ],
    useCases: [
      "Graphs with negative edge weights",
      "Detecting negative cycles",
      "Currency arbitrage detection",
      "Network routing with varying costs",
    ],
  },
  kruskals: {
    name: "Kruskal's Algorithm",
    slug: "kruskals",
    category: "Graphs",
    description:
      "Kruskal's Algorithm finds the minimum spanning tree of a graph by sorting edges by weight and adding them one by one, ensuring no cycles are formed. It uses the Union-Find data structure.",
    timeComplexity: "O(E log E)",
    spaceComplexity: "O(V)",
    steps: [
      "Sort all edges by weight in ascending order",
      "Initialize each vertex as its own tree (using Union-Find)",
      "For each edge, check if it connects different trees",
      "If yes, add the edge to MST and merge the trees",
      "Continue until V-1 edges are added",
    ],
    useCases: [
      "Network design (laying cables, pipes)",
      "Clustering algorithms",
      "Approximation algorithms",
      "Circuit design",
    ],
  },
  fibonacci: {
    name: "Fibonacci",
    slug: "fibonacci",
    category: "Dynamic Programming",
    description:
      "The Fibonacci sequence is a series where each number is the sum of the two preceding ones. Dynamic programming optimizes its calculation by storing previously computed values to avoid redundant calculations.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n) or O(1) with optimization",
    steps: [
      "Define base cases: F(0) = 0, F(1) = 1",
      "Create an array to store computed values",
      "For each number n, compute F(n) = F(n-1) + F(n-2)",
      "Store the result in the array",
      "Return F(n)",
    ],
    useCases: [
      "Understanding recursion and dynamic programming",
      "Pattern recognition in nature",
      "Algorithm analysis",
      "Financial modeling",
    ],
  },
  knapsack: {
    name: "Knapsack Problem",
    slug: "knapsack",
    category: "Dynamic Programming",
    description:
      "The 0/1 Knapsack Problem involves selecting items with given weights and values to maximize total value without exceeding a weight capacity. Each item can be included or excluded.",
    timeComplexity: "O(n × W) where W is capacity",
    spaceComplexity: "O(n × W)",
    steps: [
      "Create a 2D table dp[n+1][W+1]",
      "Initialize first row and column to 0",
      "For each item and weight, decide: include or exclude",
      "If including: dp[i][w] = value[i] + dp[i-1][w-weight[i]]",
      "If excluding: dp[i][w] = dp[i-1][w]",
      "Take maximum of both choices",
    ],
    useCases: [
      "Resource allocation problems",
      "Budget planning",
      "Cargo loading",
      "Portfolio optimization",
    ],
  },
  "longest-common-subsequence": {
    name: "Longest Common Subsequence",
    slug: "longest-common-subsequence",
    category: "Dynamic Programming",
    description:
      "LCS finds the longest subsequence common to two sequences. Unlike substrings, subsequences don't need to be contiguous. It's solved using dynamic programming with a 2D table.",
    timeComplexity: "O(m × n)",
    spaceComplexity: "O(m × n)",
    steps: [
      "Create a 2D table dp[m+1][n+1]",
      "Initialize first row and column to 0",
      "If characters match: dp[i][j] = dp[i-1][j-1] + 1",
      "If they don't match: dp[i][j] = max(dp[i-1][j], dp[i][j-1])",
      "The bottom-right cell contains the length of LCS",
    ],
    useCases: [
      "DNA sequence analysis",
      "File comparison (diff tools)",
      "Plagiarism detection",
      "Version control systems",
    ],
  },
  "edit-distance": {
    name: "Edit Distance",
    slug: "edit-distance",
    category: "Dynamic Programming",
    description:
      "Edit Distance (Levenshtein Distance) measures the minimum number of operations (insertion, deletion, substitution) required to transform one string into another. It's widely used in spell checking and DNA analysis.",
    timeComplexity: "O(m × n)",
    spaceComplexity: "O(m × n)",
    steps: [
      "Create a 2D table dp[m+1][n+1]",
      "Initialize first row with indices (0, 1, 2, ...)",
      "Initialize first column with indices",
      "If characters match: dp[i][j] = dp[i-1][j-1]",
      "If they don't: dp[i][j] = 1 + min(insert, delete, replace)",
      "Return dp[m][n]",
    ],
    useCases: [
      "Spell checkers",
      "DNA sequence comparison",
      "Natural language processing",
      "Fuzzy string matching",
    ],
  },
  "activity-selection": {
    name: "Activity Selection",
    slug: "activity-selection",
    category: "Greedy",
    description:
      "Activity Selection Problem involves selecting the maximum number of non-overlapping activities from a set of activities with start and end times. The greedy approach sorts by finish time and selects activities that don't conflict.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    steps: [
      "Sort activities by finish time",
      "Select the first activity",
      "For each remaining activity, check if its start time is after the last selected finish time",
      "If yes, select this activity",
      "Continue until all activities are processed",
    ],
    useCases: [
      "Meeting room scheduling",
      "Task scheduling",
      "Resource allocation",
      "Event planning",
    ],
  },
  "huffman-coding": {
    name: "Huffman Coding",
    slug: "huffman-coding",
    category: "Greedy",
    description:
      "Huffman Coding is a lossless data compression algorithm that assigns variable-length codes to characters based on their frequencies. More frequent characters get shorter codes.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    steps: [
      "Calculate frequency of each character",
      "Create a leaf node for each character and build a min heap",
      "Extract two nodes with minimum frequency",
      "Create a new internal node with these two as children",
      "Add the new node back to the heap",
      "Repeat until only one node remains (the root)",
    ],
    useCases: [
      "File compression (ZIP, GZIP)",
      "Image compression (JPEG)",
      "Data transmission",
      "Morse code",
    ],
  },
  "fractional-knapsack": {
    name: "Fractional Knapsack",
    slug: "fractional-knapsack",
    category: "Greedy",
    description:
      "Fractional Knapsack allows taking fractions of items to maximize value within weight capacity. Unlike 0/1 Knapsack, items can be broken into smaller pieces. The greedy approach sorts by value-to-weight ratio.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    steps: [
      "Calculate value-to-weight ratio for each item",
      "Sort items by this ratio in descending order",
      "Start adding items with highest ratio",
      "If an item doesn't fit completely, take a fraction of it",
      "Continue until knapsack is full",
    ],
    useCases: [
      "Resource allocation with divisible resources",
      "Investment portfolio optimization",
      "Bandwidth allocation",
      "Loading containers with divisible goods",
    ],
  },
  "n-queens": {
    name: "N-Queens",
    slug: "n-queens",
    category: "Backtracking",
    description:
      "The N-Queens problem involves placing N chess queens on an N×N chessboard so that no two queens attack each other. It uses backtracking to try all possible placements and backtrack when conflicts occur.",
    timeComplexity: "O(N!)",
    spaceComplexity: "O(N²)",
    steps: [
      "Start with an empty board",
      "Place a queen in the first column of the first row",
      "Move to the next row and try placing a queen in each column",
      "Check if the placement is safe (no conflicts)",
      "If safe, move to next row; if not, try next column",
      "If no column works, backtrack to previous row",
    ],
    useCases: [
      "Constraint satisfaction problems",
      "Chess programming",
      "Scheduling problems",
      "Resource allocation with conflicts",
    ],
  },
  "sudoku-solver": {
    name: "Sudoku Solver",
    slug: "sudoku-solver",
    category: "Backtracking",
    description:
      "Sudoku Solver uses backtracking to fill a 9×9 grid with digits so that each column, row, and 3×3 subgrid contains all digits from 1 to 9. It tries values and backtracks when constraints are violated.",
    timeComplexity: "O(9^(n²)) worst case",
    spaceComplexity: "O(n²)",
    steps: [
      "Find an empty cell in the grid",
      "Try digits 1-9 in that cell",
      "Check if the digit is valid (row, column, and box constraints)",
      "If valid, recursively try to fill the rest of the grid",
      "If we can fill the entire grid, we're done",
      "If not, backtrack and try the next digit",
    ],
    useCases: [
      "Puzzle solving applications",
      "Game development",
      "Constraint satisfaction",
      "Logic problem solving",
    ],
  },
  "rat-in-maze": {
    name: "Rat in Maze",
    slug: "rat-in-maze",
    category: "Backtracking",
    description:
      "Rat in Maze finds a path from the start to the end of a maze. The rat can move in four directions, and backtracking is used when a path leads to a dead end.",
    timeComplexity: "O(2^(n²))",
    spaceComplexity: "O(n²)",
    steps: [
      "Start at the top-left corner",
      "Mark the current cell as part of the solution path",
      "Try moving right; if possible, recursively solve from that position",
      "If right doesn't work, try down",
      "If neither works, backtrack: unmark current cell and return false",
      "If destination is reached, return true",
    ],
    useCases: [
      "Pathfinding in games",
      "Robot navigation",
      "Maze solving applications",
      "Network routing",
    ],
  },
};

export const algorithmCategories = [
  {
    name: "Sorting",
    algorithms: [
      "bubble-sort",
      "quick-sort",
      "merge-sort",
      "insertion-sort",
      "selection-sort",
      "heap-sort",
    ],
  },
  {
    name: "Searching",
    algorithms: ["linear-search", "binary-search", "jump-search"],
  },
  {
    name: "Arrays",
    algorithms: [
      "two-pointers",
      "sliding-window",
      "kadanes-algorithm",
      "dutch-national-flag",
    ],
  },
  {
    name: "Linked Lists",
    algorithms: [
      "reverse-linked-list",
      "detect-cycle",
      "merge-two-lists",
      "remove-nth-node",
    ],
  },
  {
    name: "Trees",
    algorithms: [
      "tree-traversal",
      "binary-search-tree",
      "avl-tree",
      "segment-tree",
    ],
  },
  {
    name: "Graphs",
    algorithms: ["dfs", "bfs", "dijkstras", "bellman-ford", "kruskals"],
  },
  {
    name: "Dynamic Programming",
    algorithms: [
      "fibonacci",
      "knapsack",
      "longest-common-subsequence",
      "edit-distance",
    ],
  },
  {
    name: "Greedy",
    algorithms: ["activity-selection", "huffman-coding", "fractional-knapsack"],
  },
  {
    name: "Backtracking",
    algorithms: ["n-queens", "sudoku-solver", "rat-in-maze"],
  },
];
