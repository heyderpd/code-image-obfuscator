import { IsODD } from '../utils'
import { Pixel, CastPixel } from '../interfaces'
import { messageVisible } from '../config'


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

export const ConvertPixelToData = (pixel: number[]) => {
  return pixel.map(color => IsODD(color))
}
