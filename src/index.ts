import Canvas from './canvas'
import { SaveMessage, LoadMessage } from './data'


export const Save = (imagePath: string, message: string) => {
  const canvas = new Canvas(imagePath)
  SaveMessage(canvas, message)
}

export const Load = (imagePath: string) => {
  const canvas = new Canvas(imagePath)
  return LoadMessage(canvas)
}
