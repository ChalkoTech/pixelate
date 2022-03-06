import { useEffect, useRef, Dispatch, SetStateAction } from "react";

export interface CanvasProps {
  height: number;
  width: number;
  image: HTMLImageElement;
  setRawData?: Dispatch<SetStateAction<Uint8ClampedArray>>;
}

function Canvas(props: CanvasProps) {
  const { height, width, image, setRawData } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    let ctx = (canvasRef.current as HTMLCanvasElement).getContext("2d");
    if (!ctx) return;
    ctx.drawImage(image, 0, 0, width, height);

    if (setRawData) {
      setRawData(ctx.getImageData(0, 0, width, height).data);
    }
  }, []);

  return <canvas width={width} height={height} ref={canvasRef}></canvas>;
}

export default Canvas;
