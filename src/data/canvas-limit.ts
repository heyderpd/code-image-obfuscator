import { characterLimit, pixelSize } from '../config'
import throwError from '../throw'

const canvasMessageLimit = (width: number, height: number): number => {
  return width * height / pixelSize
}

const messageSize = (length: number): number => {
  return length / characterLimit
}

const checkCanvasSuportMessage = (canvasWidth: number, canvasHeight: number, messageLength: number): boolean => {
  return canvasMessageLimit(canvasWidth, canvasHeight) > messageSize(messageLength)
}

export default checkCanvasSuportMessage
