import { useState } from "react";
import "./App.css";
import Canvas from "./Canvas";
import Processor from "./Processor";

const DEFAULT_WIDTH = 256;

function App() {
  const [image, setImage] = useState<HTMLImageElement | null>();
  useState<HTMLImageElement | null>();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [rawData, setRawData] = useState<Uint8ClampedArray>(
    new Uint8ClampedArray()
  );

  function parseImageFromFile(file: File | null) {
    setImageLoaded(false);
    setRawData(new Uint8ClampedArray());

    if (!file) {
      alert("not able to parse the image");
      return;
    }
    let fr = new FileReader();
    fr.addEventListener("load", () => {
      let img = new Image();
      let result = fr.result?.toString() || "";
      img.src = result;

      img.onload = () => {
        setImageLoaded(true);
      };
      setImage(img);
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
        <>
          <Canvas
            height={calculateImageHeight(image)}
            width={DEFAULT_WIDTH}
            image={image}
            setRawData={setRawData}
          />
          <Processor
            originalData={rawData}
            height={calculateImageHeight(image)}
            width={DEFAULT_WIDTH}
          />
        </>
      )}
    </div>
  );
}

function calculateImageHeight(img: HTMLImageElement): number {
  return (DEFAULT_WIDTH / img.width) * img.height;
}

export default App;
