import { pixelSize, pixelChunkSize } from '../config'
import { PositionToXY, IsODD, createFilledZeros } from '../utils'
import { Iterator } from './helper'
import { ConvertDataToPixel, ConvertPixelToData } from '../data/data-to-pixel'
import { IteratorResponse, PixelPostion, Pixel, CastPixel } from '../interfaces'


export class CanvasReaderIterator extends Iterator {

  _size = pixelChunkSize
  _canvasWrapper = null

  constructor (canvasWrapper: any) {
    super()
    this._canvasWrapper = canvasWrapper
  }

  getItem () {
    const position = PositionToXY(this._index++, this._canvasWrapper.width, this._canvasWrapper.height)
    if (position == null) {
      this._done = true
      return {
        done: true,
      } as IteratorResponse
    }
    const value = this._canvasWrapper.getPixel(position)
    return {
      value,
    } as IteratorResponse
  }

  process (data: Pixel[]): boolean[] {
    return Array().concat(...data.map(ConvertPixelToData))
  }

}

export class CanvasWriterIterator extends Iterator {

  _size = pixelSize
  _canvasWrapper = null

  constructor (dataIterator: Iterator, canvasWrapper: any) {
    super(dataIterator)
    // this._iterator = dataIterator.getIterator()
    this._canvasWrapper = canvasWrapper
  }

  // getItem () {
  //   const item = this._iterator.next()
  //   if (item.done) {
  //     // throw new Error('not enough data')
  //     this.done = true
  //     return null
  //   }
  //   return item.value
  // }

  process (data: boolean[]) {
    const position = PositionToXY(this._index++, this._canvasWrapper.width, this._canvasWrapper.height)
    if (position == null) {
      if (data.length > 0) {
        throw new Error('data will be lost')
      }
      this._done = true
      return null
    }
    const pixel = this._canvasWrapper.getPixel(position)
    const newPixel = ConvertDataToPixel(pixel, data)
    console.log({newPixel})
    this._canvasWrapper.setPixel(position, newPixel)
  }

}
