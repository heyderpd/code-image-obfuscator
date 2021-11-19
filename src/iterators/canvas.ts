import { pixelSize, chunkSize } from '../config'
import { PositionToXY, IsODD, createFilledZeros } from '../utils'
import { Iterator } from './helper'
import { ConvertDataToPixel, ConvertPixelToData } from '../data/data-to-pixel'


export class CanvasReaderIterator extends Iterator {

  size = pixelSize

  constructor () {
    super()
    this._getItem = () => {
    }
  }

  _getItem () {
    return null
  }

  _process (item) {
    return null
  }

}

export class CanvasWriterIterator extends Iterator {

  size = pixelSize
  index = 0
  _iterator = null

  constructor (dataIterator: Iterator, canvasWrapper: any) {
    super()
    this._iterator = dataIterator.getIterator()
    this._getItem = () => {
      const item = this._iterator.next()
      if (item.done) {
        // throw new Error('not enough data')
        this.done = true
        return null
      }
      return item.value
    }
    this._process = (data: boolean[]) => {
      const position = PositionToXY(this.index++, canvasWrapper.width, canvasWrapper.height)
      console.log('_process', { canvasWrapper })
      console.log('_process', { position, data })
      if (position == null) {
        if (data.length > 0) {
          throw new Error('data will be lost')
        }
        this.done = true
        return null
      }
      const pixel = canvasWrapper.getPixel(position)
      const newPixel = ConvertDataToPixel(pixel, data)
      canvasWrapper.setPixel(position, newPixel)
    }
  }

}
