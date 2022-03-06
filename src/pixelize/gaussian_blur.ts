import * as math from "mathjs";

const SIGMA = 1;

function hypotenus(x1: number, y1: number, x2: number, y2: number): number {
  let deltaX = x1 - x2;
  let deltaY = y1 - y2;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

function generateGaussianKernel(dimension: number): number[] {
  if (
    dimension % 2 == 0 ||
    Math.floor(dimension) !== dimension ||
    dimension < 3
  ) {
    throw new Error(
      "the dimension must be an odd integer that's greater or equal to 3"
    );
  }
  let kernel: number[] = [];

  let twoSigmaSquare = 2 * SIGMA * SIGMA;
  let center = (dimension - 1) / 2;

  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      let distance = hypotenus(i, j, center, center);

      // The following is an algorithm that came from the gaussian blur
      // wikipedia page [1].
      //
      // http://en.wikipedia.org/w/index.php?title=Gaussian_blur&oldid=608793634#Mechanics
      let gaussian =
        (1 / Math.sqrt(Math.PI * twoSigmaSquare)) *
        Math.exp(-1 * (Math.pow(distance, 2) / twoSigmaSquare));

      kernel.push(gaussian);
    }
  }

  const sum = kernel.reduce((p, c) => c + p);
  return kernel.map((v) => v / sum);
}

function getKernelPixels(
  index: number,
  dimension: number,
  imageData: ImageData
): number[] {
  // there are always 4 channels for the image.
  const STEP = 4;
  const radius = (dimension - 1) / 2;
  let upperLeftIdx = index - radius * imageData.width * STEP - radius * STEP;

  let result: number[] = [];
  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      let curIdx = upperLeftIdx + i * imageData.width * STEP + j * STEP;
      // if our of boundary, use the original pixel value.
      result.push(imageData.data[curIdx] || imageData.data[index]);
    }
  }

  return result;
}

function gaussianBlur(dimension: number, imageData: ImageData): ImageData {
  let kernel = generateGaussianKernel(dimension);
  let result = new Uint8ClampedArray(imageData.data.length);
  for (let i = 0; i < imageData.data.length; i++) {
    // don't touch alpha channel.
    if (i % 4 == 3) {
      result[i] = imageData.data[i];
      continue;
    }

    let pixelData = getKernelPixels(i, dimension, imageData);
    result[i] = math.dot(pixelData, kernel);
  }

  return new ImageData(result, imageData.width, imageData.height);
}

export default gaussianBlur;
