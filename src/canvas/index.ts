
import { PixelPostion, Pixel, CastPixel } from '../interfaces'
import * as canvasHandler from './serverHandler'


export class Canvas {

  path = null
  canvas = null
  context = null
  width = 0
  height = 0

  constructor () {
  }

  setPixel (positon: PixelPostion, pixel: Pixel) {
    this.context.fillStyle = `rgba(${pixel.R},${pixel.G},${pixel.B},${pixel.A})`
    this.context.fillRect(positon.X, positon.Y, 1, 1)
  }

  getPixel (Pixel: PixelPostion) {
    const pixel = this.context.getImageData(Pixel.X, Pixel.Y, 1, 1).data
    return CastPixel(pixel)
  }

  async load (imagePath: string) {
    const [ originalCanvas, canvas ] = await canvasHandler.load(imagePath)
    this.canvas = canvas
    this.width = canvas.width
    this.height = canvas.height
    this.context = this.canvas.getContext('2d')
    this.context.drawImage(
      originalCanvas, 0, 0,
      this.width, this.height
    )
  }

  async save (imagePath: string) {
    await canvasHandler.save(imagePath, this.canvas)
  }

}

export default Canvas
