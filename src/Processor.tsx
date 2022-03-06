import React, { useEffect, useRef } from "react";
import { pixelize, PixelizeSettings } from "./pixelize/pixelize";

export interface ProcessorProps {
  originalData: Uint8ClampedArray;
  height: number;
  width: number;
}

export const Processor = React.memo((props: ProcessorProps) => {
  const { originalData, height, width } = props;

  // This line must be places before `useRef` because otherwise React will
  // complain that more hooks are rendered than previous time.
  if (originalData.length === 0) {
    return null;
  }

  const canvasRef = useRef(null);

  useEffect(() => {
    if (originalData.length === 0 || !canvasRef.current) return;
    let ctx = (canvasRef.current as HTMLCanvasElement).getContext("2d");
    if (!ctx) return;

    const imageData = new ImageData(originalData, width, height);
    let processedImg = pixelize(imageData, {
      dimension: 3,
    } as PixelizeSettings);
    processedImg.then((i) => ctx?.putImageData(i, 0, 0));
  });

  return <canvas width={width} height={height} ref={canvasRef}></canvas>;
});

export default Processor;
