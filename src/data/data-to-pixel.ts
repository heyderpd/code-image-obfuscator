import { IsODD } from '../utils'


export const ConvertDataToPixel = (pixel: number[], data: boolean[]) => {
  console.log('ConvertDataToPixel', { pixel, data })
  data.map((bit, color) => {
    let value = pixel[color]
    const odd = IsODD(value)
    if (odd && !bit) {
      value -= 1
    } else if (!odd && bit) {
      value += 1
    }
    pixel[color] = value
  })
  return pixel
}

export const ConvertPixelToData = (pixel: number[]) => {
  return pixel.map(color => IsODD(color))
}
