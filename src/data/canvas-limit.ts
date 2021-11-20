import { wordLength, pixelSize } from '../config'


const canvasMessageLimit = (width: number, height: number): number => {
  return width * height * pixelSize
}

const messageSize = (length: number): number => {
  return length * wordLength
}

const canvasSuportLimit = (canvasWidth: number, canvasHeight: number, messageLength: number): number => {
  return messageSize(messageLength) / canvasMessageLimit(canvasWidth, canvasHeight)
}

export const canvasSuportSugest = value => {
  value = value - 1
  value = Math.round(value * 100)
  value = `%${value}`
  throw new Error(`insuficiente image size, suggest image ${value} bigger`)
}

export const checkCanvasSuportMessage = (canvasWidth: number, canvasHeight: number, messageLength: number) => {
  const value = canvasSuportLimit(canvasWidth, canvasHeight, messageLength)
  if (value > 1) {
    canvasSuportSugest(value)
  }
}
