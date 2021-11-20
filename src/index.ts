import Canvas from './canvas'
import { SaveMessage, LoadMessage } from './data'


export const Save = async (imagePath: string, message: string, newImagePath: string = null) => {
  const canvasWrapper = new Canvas(imagePath)
  await SaveMessage(canvasWrapper, message)
  await canvasWrapper.save(newImagePath)
}

export const Load = async (imagePath: string) => {
  const canvas = new Canvas(imagePath)
  return LoadMessage(canvas)
}
