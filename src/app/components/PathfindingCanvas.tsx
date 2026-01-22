"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  visited: boolean;
  wave: number;
  opacity: number;
  birthTime: number;
}

export default function PathfindingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Grid configuration - smaller cells for finer detail
    const gridSize = 30;
    let cols = Math.floor(canvas.width / gridSize);
    let rows = Math.floor(canvas.height / gridSize);

    // Initialize grid
    let grid: Node[][] = [];
    const initGrid = () => {
      cols = Math.floor(canvas.width / gridSize);
      rows = Math.floor(canvas.height / gridSize);
      grid = [];

      for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
          grid[i][j] = {
            x: j * gridSize,
            y: i * gridSize,
            visited: false,
            wave: -1,
            opacity: 0,
            birthTime: 0,
          };
        }
      }
    };

    initGrid();

    // BFS wavefront animation from center
    let queue: { row: number; col: number; wave: number }[] = [];
    let currentTime = 0;
    let animationComplete = false;
    let fadeOutStartTime = 0;

    const resetAnimation = () => {
      initGrid();
      queue = [];
      currentTime = 0;
      animationComplete = false;
      fadeOutStartTime = 0;

      // Start from center
      const centerRow = Math.floor(rows / 2);
      const centerCol = Math.floor(cols / 2);

      queue.push({ row: centerRow, col: centerCol, wave: 0 });
      grid[centerRow][centerCol].wave = 0;
      grid[centerRow][centerCol].birthTime = currentTime;
    };

    const expandWave = () => {
      if (queue.length === 0) {
        if (!animationComplete) {
          animationComplete = true;
          fadeOutStartTime = currentTime;
        }
        return;
      }

      const batchSize = 3; // Process multiple nodes per frame for smooth expansion
      for (let b = 0; b < batchSize && queue.length > 0; b++) {
        const current = queue.shift();
        if (!current) continue;

        const { row, col, wave } = current;

        if (grid[row][col].visited) continue;
        grid[row][col].visited = true;

        // 8-directional expansion (grid-like)
        const directions = [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1], // cardinal
          [-1, -1],
          [-1, 1],
          [1, -1],
          [1, 1], // diagonal
        ];

        // Add slight randomness to timing for organic feel
        const delay = Math.random() * 0.3;

        for (const [dr, dc] of directions) {
          const newRow = row + dr;
          const newCol = col + dc;

          if (
            newRow >= 0 &&
            newRow < rows &&
            newCol >= 0 &&
            newCol < cols &&
            grid[newRow][newCol].wave === -1
          ) {
            grid[newRow][newCol].wave = wave + 1;
            grid[newRow][newCol].birthTime = currentTime + delay;
            queue.push({
              row: newRow,
              col: newCol,
              wave: wave + 1,
            });
          }
        }
      }
    };

    // Drawing function
    const draw = () => {
      // Dark background - Black
      ctx.fillStyle = "rgb(0, 0, 0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nodeColor = "rgb(141, 118, 233)";
      const edgeColor = "rgba(141, 118, 233, ";

      // Fade out phase
      let globalFade = 1;
      if (animationComplete) {
        const fadeProgress = (currentTime - fadeOutStartTime) / 60;
        globalFade = Math.max(0, 1 - fadeProgress);

        if (globalFade <= 0) {
          resetAnimation();
          return;
        }
      }

      // Draw edges first (underneath nodes)
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const node = grid[i][j];
          if (node.wave < 0) continue;

          // Calculate opacity based on age and fade
          const age = currentTime - node.birthTime;
          let opacity = 0;

          if (age > 0) {
            // Fade in over 15 frames
            opacity = Math.min(1, age / 15);
          }

          node.opacity = opacity * globalFade;

          if (node.opacity <= 0.01) continue;

          const x = node.x + gridSize / 2;
          const y = node.y + gridSize / 2;

          // Draw connections to adjacent nodes
          const directions = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1],
          ];

          for (const [dr, dc] of directions) {
            const ni = i + dr;
            const nj = j + dc;

            if (
              ni >= 0 &&
              ni < rows &&
              nj >= 0 &&
              nj < cols &&
              grid[ni][nj].wave >= 0 &&
              grid[ni][nj].opacity > 0.01
            ) {
              // Use average opacity of both nodes
              const avgOpacity = (node.opacity + grid[ni][nj].opacity) / 2;

              // Dimmer for visited, brighter for frontier
              const isFrontier = queue.some(
                (q) =>
                  (q.row === i && q.col === j) ||
                  (q.row === ni && q.col === nj),
              );

              const edgeOpacity = isFrontier
                ? avgOpacity * 0.25
                : avgOpacity * 0.1;

              ctx.strokeStyle = edgeColor + edgeOpacity + ")";
              ctx.lineWidth = 0.5;
              ctx.shadowBlur = 0;

              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(
                grid[ni][nj].x + gridSize / 2,
                grid[ni][nj].y + gridSize / 2,
              );
              ctx.stroke();
            }
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const node = grid[i][j];
          if (node.wave < 0 || node.opacity <= 0.01) continue;

          const x = node.x + gridSize / 2;
          const y = node.y + gridSize / 2;

          // Check if this node is on the frontier
          const isFrontier = queue.some((q) => q.row === i && q.col === j);
          const isOrigin =
            i === Math.floor(rows / 2) && j === Math.floor(cols / 2);

          if (isOrigin) {
            // Origin node - glowing
            ctx.fillStyle = nodeColor;
            ctx.shadowBlur = 20;
            ctx.shadowColor = nodeColor;
            ctx.globalAlpha = node.opacity;
            ctx.beginPath();
            ctx.arc(x, y, 2.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
          } else if (isFrontier) {
            // Frontier nodes - medium glow
            ctx.fillStyle = nodeColor;
            ctx.shadowBlur = 8;
            ctx.shadowColor = nodeColor;
            ctx.globalAlpha = node.opacity * 0.8;
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
          } else {
            // Visited nodes - subtle
            ctx.fillStyle = nodeColor;
            ctx.globalAlpha = node.opacity * 0.3;
            ctx.beginPath();
            ctx.arc(x, y, 0.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        }
      }
    };

    // Animation loop
    let running = true;
    resetAnimation();

    const animate = () => {
      if (!running) return;

      currentTime++;
      expandWave();
      draw();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      running = false;
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full sm:inset-0 inset-x-0 top-1/2 -translate-y-1/2 sm:translate-y-0"
      style={{ pointerEvents: "none" }}
    />
  );
}
