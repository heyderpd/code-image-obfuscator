import { colorLength, chunkSize } from '../config'
import { PositionToXY, IsODD, createFilledZeros } from '../utils'


export const SaveIterator = (canvas: any) => {
  return {
    [Symbol.iterator]: function() {
      this._pixel = 0
      this._cache = []
      const savePixel = () => {
        const { x, y } = PositionToXY(this._pixel, canvas.width)
        const pixel = canvas.getPixel(x, y)
        this._cache
          .map((bitStr, color) => {
            let value = pixel[color]
            const bit = bitStr === '1'
            const odd = IsODD(value)
            if (odd && !bit) {
              value -= 1
            } else if (!odd && bit) {
              value += 1
            }
            pixel.setColor(color, value)
          })
        canvas.setPixel(x, y, pixel)
        this._pixel += 1
      }
      return {
        next: (data: string, flush: boolean = false) => {
          if (flush) {
            const needed = colorLength - this._cache.length
            data = createFilledZeros(needed)
          }
          data
            .split('')
            .map(bit => {
              this._cache.append(bit)
              if (this._cache.length == colorLength) {
                savePixel()
                this._cache = []
              }
            })
        }
      }
    }
  }
}

export const loadIterator = (canvas: any) => {
  return {
    [Symbol.iterator]: function() {
      this._pixel = 0
      const loadPixel = () => {
        const { x, y } = PositionToXY(this._pixel, canvas.width)
        const pixel = canvas.getPixel(x, y)
        this._pixel += 1
        return pixel
          .map(color => IsODD(color))
      }
      return {
        next: () => {
          const value = loadPixel()
          if (!value) {
            return {
              done: true,
            }
          }
          return {
            value: value,
            done: false,
          }
        }
      }
    }
  }
}
