"use client";

import { useEffect, useRef } from "react";

const COLOR_PALETTES = [
  ["rgba(107, 70, 193, 0.55)", "rgba(45, 197, 253, 0.45)"],
  ["rgba(255, 111, 145, 0.55)", "rgba(255, 204, 112, 0.45)"],
  ["rgba(67, 233, 123, 0.55)", "rgba(56, 249, 215, 0.4)"],
];

const PLANETS = [
  { radius: 140, speed: 0.0008, xOffset: 240, yOffset: -120 },
  { radius: 70, speed: -0.0014, xOffset: -160, yOffset: 80 },
];

export function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio ?? 1;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.resetTransform();
      context.scale(ratio, ratio);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    let frameId: number;
    let time = 0;

    const render = () => {
      const { width, height } = canvas.getBoundingClientRect();
      context.clearRect(0, 0, width, height);
      time += 1;

      COLOR_PALETTES.forEach((palette, index) => {
        const gradient = context.createRadialGradient(
          width * (0.2 + Math.sin(time * 0.0006 + index) * 0.2),
          height * (0.3 + Math.cos(time * 0.0004 + index) * 0.2),
          0,
          width * (0.5 + Math.sin(time * 0.0002 + index) * 0.4),
          height * (0.6 + Math.sin(time * 0.0003 + index * 2) * 0.3),
          width * 0.8,
        );
        gradient.addColorStop(0, palette[0]);
        gradient.addColorStop(1, palette[1]);

        context.globalCompositeOperation = "screen";
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
      });

      PLANETS.forEach((planet, index) => {
        const angle = time * planet.speed;
        const x =
          width / 2 +
          planet.xOffset +
          Math.sin(angle + index) * (planet.radius + 60);
        const y =
          height / 2 +
          planet.yOffset +
          Math.cos(angle - index) * (planet.radius + 100);

        const radialGradient = context.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          planet.radius,
        );
        radialGradient.addColorStop(0, "rgba(255,255,255,0.35)");
        radialGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        context.globalCompositeOperation = "lighter";
        context.fillStyle = radialGradient;
        context.beginPath();
        context.arc(x, y, planet.radius, 0, Math.PI * 2);
        context.fill();
      });

      context.globalCompositeOperation = "source-over";
      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="aurora-canvas"
      role="presentation"
      aria-hidden="true"
    />
  );
}
