async function imageDataToHTMLImageElement(
  imageData: ImageData
): Promise<HTMLImageElement> {
  const converterCanvas = document.createElement("canvas");
  let converterCtx = converterCanvas.getContext("2d");
  if (!converterCtx) {
    throw new Error("fail to get converter context for the image");
  }

  converterCanvas.width = imageData.width;
  converterCanvas.height = imageData.height;

  converterCtx.putImageData(imageData, 0, 0);
  let img = new Image();
  const imageLoadPromise = new Promise((resolve) => {
    img.onload = resolve;
    img.src = converterCanvas.toDataURL();
  });

  await imageLoadPromise;

  converterCanvas.remove();
  return img;
}

async function imageToPixel(imageData: ImageData): Promise<ImageData> {
  const tempCanvas = document.createElement("canvas");

  let scale = 0.1;
  let ctx = tempCanvas.getContext("2d");

  if (!ctx) {
    throw new Error("fail to get context when pixelate the image");
  }

  tempCanvas.width = imageData.width;
  tempCanvas.height = imageData.height;

  let scaledW = tempCanvas.width * scale;
  let scaledH = tempCanvas.height * scale;
  ctx.imageSmoothingEnabled = false;

  let img = await imageDataToHTMLImageElement(imageData);
  ctx.drawImage(img, 0, 0, scaledW, scaledH);
  ctx.drawImage(
    tempCanvas,
    0,
    0,
    scaledW,
    scaledH,
    0,
    0,
    imageData.width,
    imageData.height
  );
  let result = ctx.getImageData(0, 0, imageData.width, imageData.height);
  tempCanvas.remove();
  return result;
}

export default imageToPixel;
