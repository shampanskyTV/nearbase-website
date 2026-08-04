"use client";

import React, { useEffect, useRef } from "react";

interface NoiseProps {
  patternSize?: number;
  patternScaleX?: number;
  patternScaleY?: number;
  patternRefreshInterval?: number;
  patternAlpha?: number;
}

const Noise: React.FC<NoiseProps> = ({
  patternSize = 250,
  patternScaleX = 1,
  patternScaleY = 1,
  patternRefreshInterval = 2,
  patternAlpha = 15,
}) => {
  const grainRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const patternDimension = Math.max(16, Math.floor(patternSize));
    const alpha = Math.max(0, Math.min(255, Math.floor(patternAlpha)));
    const refreshInterval = Math.max(1, Math.floor(patternRefreshInterval));
    const scaleX = Math.max(0.1, patternScaleX);
    const scaleY = Math.max(0.1, patternScaleY);

    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = patternDimension;
    patternCanvas.height = patternDimension;
    const patternContext = patternCanvas.getContext("2d", { alpha: true });
    if (!patternContext) return;

    let frame = 0;
    let animationId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      const width = parent?.clientWidth ?? window.innerWidth;
      const height = parent?.clientHeight ?? window.innerHeight;
      canvas.width = Math.max(1, Math.floor(width));
      canvas.height = Math.max(1, Math.floor(height));
    };

    const drawGrain = () => {
      const imageData = patternContext.createImageData(patternDimension, patternDimension);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = alpha;
      }

      patternContext.putImageData(imageData, 0, 0);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;
      ctx.save();
      ctx.scale(scaleX, scaleY);
      ctx.drawImage(
        patternCanvas,
        0,
        0,
        canvas.width / scaleX,
        canvas.height / scaleY
      );
      ctx.restore();
    };

    const loop = () => {
      if (frame % refreshInterval === 0) {
        drawGrain();
      }
      frame++;
      animationId = window.requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize);
    resize();
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationId);
    };
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha]);

  return (
    <canvas
      className="pointer-events-none absolute inset-0 h-full w-full"
      ref={grainRef}
      style={{
        imageRendering: "pixelated",
      }}
    />
  );
};

export default Noise;
