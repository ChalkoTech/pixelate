import { useEffect, useState } from "react";
import "./App.css";
import Canvas from "./Canvas";
import init, { greet } from "wasm-lib";

const DEFAULT_WIDTH = 256;

function App() {
  init().then(() => greet("webpack loaded"));

  const [image, setImage] = useState<HTMLImageElement | null>();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  function parseImageFromFile(file: File | null) {
    setImageLoaded(false);
    if (!file) {
      alert("not able to parse the image");
      return;
    }
    let fr = new FileReader();
    fr.addEventListener("load", () => {
      let img = new Image();
      img.src = fr.result?.toString() || "";

      img.onload = () => setImageLoaded(true);
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
        <Canvas
          height={calculateImageHeight(image)}
          width={DEFAULT_WIDTH}
          image={image}
        />
      )}
    </div>
  );
}

function calculateImageHeight(img: HTMLImageElement): number {
  return (DEFAULT_WIDTH / img.width) * img.height;
}

export default App;
