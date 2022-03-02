import { useEffect, useState } from "react";
import "./App.css";
import Canvas from "./Canvas";
import init, { process } from "wasm-lib";
import { ConvertBase64ToBytes, ConvertBytesToBase64 } from "./utils";

const DEFAULT_WIDTH = 256;
const IMAGE_DATA_DELIMINATOR = ",";

function App() {
  const [image, setImage] = useState<HTMLImageElement | null>();
  const [processedImage, setProcessedImage] =
    useState<HTMLImageElement | null>();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [processedImageLoaded, setProcessedImageLoaded] =
    useState<boolean>(false);
  const [wasmLoaded, setWasmLoaded] = useState<boolean>(false);

  // Initialize wasm package
  useEffect(() => {
    init().then(() => setWasmLoaded(true));
  }, []);

  function parseImageFromFile(file: File | null) {
    setImageLoaded(false);
    setProcessedImageLoaded(false);

    if (!file) {
      alert("not able to parse the image");
      return;
    }
    let fr = new FileReader();
    fr.addEventListener("load", () => {
      let img = new Image();
      let result = fr.result?.toString() || "";
      img.src = result;
      let FormatAndData = result.split(IMAGE_DATA_DELIMINATOR);

      img.onload = () => {
        setImageLoaded(true);
      };
      setImage(img);

      if (wasmLoaded) {
        let processedData = process(
          FormatAndData[0],
          ConvertBase64ToBytes(FormatAndData[1])
        );

        let processedImg = new Image();
        let processedResult =
          FormatAndData[0] +
          IMAGE_DATA_DELIMINATOR +
          ConvertBytesToBase64(processedData);
        processedImg.src = processedResult;

        processedImg.onload = () => {
          setProcessedImageLoaded(true);
        };
        setProcessedImage(processedImg);
      }
    });

    fr.readAsDataURL(file);
  }

  return (
    <div className="App">
      <input
        type="file"
        onChange={(e) => parseImageFromFile(e.target.files?.item(0) || null)}
      />

      {image && imageLoaded && (
        <Canvas
          height={calculateImageHeight(image)}
          width={DEFAULT_WIDTH}
          image={image}
        />
      )}

      {processedImage && processedImageLoaded && (
        <Canvas
          height={calculateImageHeight(processedImage)}
          width={DEFAULT_WIDTH}
          image={processedImage}
        />
      )}
    </div>
  );
}

function calculateImageHeight(img: HTMLImageElement): number {
  return (DEFAULT_WIDTH / img.width) * img.height;
}

export default App;
