
import { PixelPostion, Color } from '../interfaces'

const canvasHandler = process.env['WEB']
  ? require('./client')
  : require('./server')

export class Canvas {

  path = null
  canvas = null
  context = null
  width = 0
  height = 0

  constructor(imagePath: any){
    const [ originalCanvas, canvas ] = canvasHandler.load(imagePath)
    console.log({ originalCanvas, canvas })
    this.canvas = canvas
    this.width = canvas.width
    this.height = canvas.height
    this.context = this.canvas.getContext('2d')
    this.context.drawImage(
      originalCanvas, 0, 0,
      this.width, this.height
    )
  }

  setPixel (Pixel: PixelPostion, C: Color) {
    this.context.fillStyle = `rgba(${C.R},${C.G},${C.B},${C.A})`
    this.context.fillRect(Pixel.X, Pixel.Y, 1, 1)
  }

  getPixel (Pixel: PixelPostion) {
    return this.context.getImageData(Pixel.X, Pixel.Y, 1, 1).data
  }

  async save (imagePath: string) {
    await canvasHandler.save(imagePath, this.canvas)
  }

}

export default Canvas
