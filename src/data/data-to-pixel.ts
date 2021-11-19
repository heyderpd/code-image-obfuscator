import { IsODD } from '../utils'
import { Pixel, CastPixel } from '../interfaces'
import { messageVisible, pixelSize } from '../config'


export const ConvertDataToPixel = (P: Pixel, data: boolean[]) => {
  const pixel = P.Array
  data.map((bit, color) => {
    let value = pixel[color]
    const odd = IsODD(value)
    if (odd && !bit) {
      value -= 1
    } else if (!odd && bit) {
      value += 1
    }
    if (messageVisible) {
      if (bit) {
        value = 99
      } else {
        value = 44
      }
    }
    pixel[color] = value
  })
  return CastPixel(pixel)
}

export const ConvertPixelToData = (P: Pixel) => {
  const pixel = new Array(pixelSize)
  P.Array
    .slice(0, pixelSize)
    .map((color, pos) => pixel[pos] = IsODD(color))
  return pixel
}
