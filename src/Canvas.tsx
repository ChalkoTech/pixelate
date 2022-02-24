import { useEffect, useRef } from "react";

export interface CanvasProps {
  height: number;
  width: number;
  image: HTMLImageElement;
}

function Canvas(props: CanvasProps) {
  const { height, width, image } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    let ctx = (canvasRef.current as HTMLCanvasElement).getContext("2d");
    if (!ctx) return;
    ctx.drawImage(image, 0, 0, width, height);
  });

  return <canvas width={width} height={height} ref={canvasRef}></canvas>;
}

export default Canvas;
