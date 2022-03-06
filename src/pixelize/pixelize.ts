import gaussianBlur from "./gaussian_blur";
import imageToPixel from "./image_to_pixel";

export interface PixelizeSettings {
  // The kernel dimension that will be used for Gaussian Blur
  dimension: number;
}

export async function pixelize(
  imagaData: ImageData,
  settings: PixelizeSettings
): Promise<ImageData> {
  let blurredImg = gaussianBlur(settings.dimension, imagaData);
  return imageToPixel(blurredImg);
}
