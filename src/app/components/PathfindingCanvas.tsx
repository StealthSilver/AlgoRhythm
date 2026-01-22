"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  visited: boolean;
  visiting: boolean;
  path: boolean;
  distance: number;
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

    // Grid configuration
    const gridSize = 20;
    const cols = Math.floor(canvas.width / gridSize);
    const rows = Math.floor(canvas.height / gridSize);

    // Initialize grid
    const grid: Node[][] = [];
    for (let i = 0; i < rows; i++) {
      grid[i] = [];
      for (let j = 0; j < cols; j++) {
        grid[i][j] = {
          x: j * gridSize,
          y: i * gridSize,
          visited: false,
          visiting: false,
          path: false,
          distance: Infinity,
        };
      }
    }

    // Start and end points
    let startRow = Math.floor(rows / 2);
    let startCol = Math.floor(cols / 4);
    let endRow = Math.floor(rows / 2);
    let endCol = Math.floor((3 * cols) / 4);

    // BFS Animation
    const queue: { row: number; col: number; parent: any }[] = [];
    let animationFrame = 0;
    let path: { row: number; col: number }[] = [];

    const resetGrid = () => {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          grid[i][j].visited = false;
          grid[i][j].visiting = false;
          grid[i][j].path = false;
          grid[i][j].distance = Infinity;
        }
      }
      queue.length = 0;
      path = [];
      animationFrame = 0;

      // Randomize start and end more frequently
      startRow = Math.floor(Math.random() * rows);
      startCol = Math.floor(Math.random() * cols);
      endRow = Math.floor(Math.random() * rows);
      endCol = Math.floor(Math.random() * cols);

      queue.push({ row: startRow, col: startCol, parent: null });
      grid[startRow][startCol].distance = 0;
    };

    const bfsStep = () => {
      if (queue.length === 0) return false;

      const current = queue.shift();
      if (!current) return false;

      const { row, col, parent } = current;

      if (row === endRow && col === endCol) {
        // Reconstruct path
        let temp = { row, col, parent };
        while (temp) {
          path.push({ row: temp.row, col: temp.col });
          temp = temp.parent;
        }
        return false;
      }

      if (grid[row][col].visited) return true;

      grid[row][col].visited = true;
      grid[row][col].visiting = false;

      // Check neighbors (including diagonals for more spreading)
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

      // Shuffle directions for more randomness
      for (let i = directions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [directions[i], directions[j]] = [directions[j], directions[i]];
      }

      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          !grid[newRow][newCol].visited
        ) {
          grid[newRow][newCol].visiting = true;
          queue.push({
            row: newRow,
            col: newCol,
            parent: { row, col, parent },
          });
        }
      }

      return true;
    };

    // Drawing function
    const draw = () => {
      ctx.fillStyle = "rgb(0, 0, 0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid nodes
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const node = grid[i][j];
          const x = node.x + gridSize / 2;
          const y = node.y + gridSize / 2;

          // Draw connections for visited nodes
          if (node.visited || node.visiting) {
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
                (grid[ni][nj].visited || grid[ni][nj].visiting)
              ) {
                ctx.strokeStyle = node.visited
                  ? "rgba(141, 118, 233, 0.08)"
                  : "rgba(141, 118, 233, 0.2)";
                ctx.lineWidth = 0.5;
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

          // Draw node
          if (i === startRow && j === startCol) {
            // Start node
            ctx.fillStyle = "rgb(141, 118, 233)";
            ctx.shadowBlur = 15;
            ctx.shadowColor = "rgb(141, 118, 233)";
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          } else if (i === endRow && j === endCol) {
            // End node
            ctx.fillStyle = "rgb(141, 118, 233)";
            ctx.shadowBlur = 15;
            ctx.shadowColor = "rgb(141, 118, 233)";
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          } else if (node.visiting) {
            // Currently visiting
            ctx.fillStyle = "rgba(141, 118, 233, 0.6)";
            ctx.shadowBlur = 10;
            ctx.shadowColor = "rgb(141, 118, 233)";
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          } else if (node.visited) {
            // Visited node
            ctx.fillStyle = "rgba(141, 118, 233, 0.15)";
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Draw path
      if (path.length > 0) {
        ctx.strokeStyle = "rgb(141, 118, 233)";
        ctx.lineWidth = 3;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgb(141, 118, 233)";
        ctx.beginPath();
        ctx.moveTo(
          grid[path[0].row][path[0].col].x + gridSize / 2,
          grid[path[0].row][path[0].col].y + gridSize / 2,
        );

        for (let i = 1; i < path.length; i++) {
          ctx.lineTo(
            grid[path[i].row][path[i].col].x + gridSize / 2,
            grid[path[i].row][path[i].col].y + gridSize / 2,
          );
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    };

    // Animation loop
    let running = true;
    let frameCount = 0;
    resetGrid();

    const animate = () => {
      if (!running) return;

      frameCount++;

      // Run BFS step faster for rapid spreading effect
      for (let i = 0; i < 5; i++) {
        const continuing = bfsStep();
        if (!continuing) {
          // Animation complete, reset after shorter delay
          setTimeout(() => {
            resetGrid();
          }, 1000);
          break;
        }
      }

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
      className="absolute inset-0 w-full h-full opacity-60"
      style={{ pointerEvents: "none" }}
    />
  );
}
