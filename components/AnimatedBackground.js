"use client";
import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;

    const mouse = { x: -9999, y: -9999 };

    // --- Grid settings ---
    const CELL_SIZE      = 65; // Decreased from 80 for slightly smaller boxes
    const DOT_RADIUS     = 2.0;
    const REPEL_RADIUS   = 110;
    const REPEL_STRENGTH = 30;
    const LINE_COLOR = "rgba(34, 197, 94, 0.18)";
    const DOT_COLOR  = "rgba(22, 163, 74,  0.20)"; // Reduced opacity from 0.42

    let cols, rows, vertices;

    const buildGrid = () => {
      cols = Math.ceil(width  / CELL_SIZE) + 2;
      rows = Math.ceil(height / CELL_SIZE) + 2;
      vertices = [];
      for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
          row.push({
            ox: c * CELL_SIZE,
            oy: r * CELL_SIZE,
            x:  c * CELL_SIZE,
            y:  r * CELL_SIZE,
            vx: 0,
            vy: 0,
          });
        }
        vertices.push(row);
      }
    };

    const resize = () => {
      width  = window.innerWidth;
      height = window.innerHeight;
      canvas.width  = width;
      canvas.height = height;
      buildGrid();
    };

    resize();

    const onMouseMove  = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onMouseLeave = ()    => { mouse.x = -9999;    mouse.y = -9999;     };

    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize",     resize);

    let raf;
    const startTime = performance.now();

    const draw = () => {
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, width, height);

      const t = (performance.now() - startTime) / 1000;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const v = vertices[r][c];

          const targetX = v.ox;
          const targetY = v.oy;

          // Spring toward animated target
          let fx = (targetX - v.x) * 0.09;
          let fy = (targetY - v.y) * 0.09;

          // Mouse repulsion
          const mdx   = v.x - mouse.x;
          const mdy   = v.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < REPEL_RADIUS && mdist > 0) {
            const force = (1 - mdist / REPEL_RADIUS) * REPEL_STRENGTH;
            fx += (mdx / mdist) * force;
            fy += (mdy / mdist) * force;
          }

          v.vx = (v.vx + fx) * 0.68;
          v.vy = (v.vy + fy) * 0.68;
          v.x  += v.vx;
          v.y  += v.vy;
        }
      }

      // --- Draw lines ---
      ctx.strokeStyle = LINE_COLOR;
      ctx.lineWidth   = 1;
      ctx.beginPath();

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const a = vertices[r][c], b = vertices[r][c + 1];
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
        }
      }
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 1; r++) {
          const a = vertices[r][c], b = vertices[r + 1][c];
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
        }
      }
      ctx.stroke();

      // --- Draw dots ---
      ctx.fillStyle = DOT_COLOR;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const v = vertices[r][c];
          ctx.beginPath();
          ctx.arc(v.x, v.y, DOT_RADIUS, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize",     resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
