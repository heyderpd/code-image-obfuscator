import Canvas from './canvas'
import { SaveMessage, LoadMessage } from './data'
import { checkCanvasSuportMessage } from './data/canvas-limit'


export const Save = async (imagePath: string, message: string, newImagePath: string = null) => {
  const canvasWrapper = new Canvas(imagePath)
  checkCanvasSuportMessage(canvasWrapper.width, canvasWrapper.height, message.length)
  await SaveMessage(canvasWrapper, message)
  await canvasWrapper.save(newImagePath)
}

export const Load = async (imagePath: string) => {
  const canvas = new Canvas(imagePath)
  return LoadMessage(canvas)
}
