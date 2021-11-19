import { IsODD } from '../utils'
import { Pixel, CastPixel } from '../interfaces'
import { messageVisible, pixelSize } from '../config'


export const ConvertDataToPixel = (P: Pixel, data: boolean[]) => {
  const pixel = P.Array
  const data2 = data.map((bit, color) => {
    let value = pixel[color]
    console.log({ value })
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
    return value
  })
  console.log({ data2, C: CastPixel(data2) })
  // throw 7
  return CastPixel(data2)
}

export const ConvertPixelToData = (P: Pixel) => {
  const pixel = new Array(pixelSize)
  P.Array
    .slice(0, pixelSize)
    .map((color, pos) => pixel[pos] = IsODD(color))
  return pixel
}
