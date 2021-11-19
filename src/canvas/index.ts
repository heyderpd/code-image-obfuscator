
import { PixelPostion, Color } from '../interfaces'

const canvasHandler = process.env['WEB']
  ? require('./client')
  : require('./server')

export class Canvas {

  path = null
  canvas = null
  context = null

  constructor(imagePath: any){
    this.canvas = canvasHandler.load(imagePath)
    this.context = this.canvas.getContext('2d')
  }

  setPixel (Pixel: PixelPostion, C: Color) {
    this.context.fillStyle = `rgba(${C.R},${C.G},${C.B},${C.A})`
    this.context.fillRect(Pixel.X, Pixel.Y, 1, 1)
  }

  getPixel (Pixel: PixelPostion) {
    return this.context.getImageData(Pixel.X, Pixel.Y, 1, 1).data
  }

  save (imagePath: string) {
    canvasHandler.save(imagePath, this.canvas)
  }

}

export default Canvas
