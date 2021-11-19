import Canvas from './canvas'
import { SaveMessage, LoadMessage } from './data'


export const Save = async (imagePath: string, message: string, newImagePath: string = null) => {
  const canvas = new Canvas(imagePath)
  await SaveMessage(canvas, message)
  canvas.save(newImagePath)
}

export const Load = async (imagePath: string) => {
  const canvas = new Canvas(imagePath)
  return LoadMessage(canvas)
}
