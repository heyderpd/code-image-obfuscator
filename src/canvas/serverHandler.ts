import * as fs from 'fs'
import { createCanvas, loadImage } from 'canvas'


const checkImagePath = pathFile => {
  if (pathFile && typeof(pathFile) === 'string' && pathFile.length > 0) {
    if (pathFile.split('.').pop() !== 'png') {
      throw new Error('image need to be png')
    }
    return null
  }
  throw new Error(`invalid path=${pathFile}`)
}

export const load = async (imagePath: string) => {
  console.log('loading png')
  checkImagePath(imagePath)
  const originalCanvas = await loadImage(imagePath)
  const newCanvas = createCanvas(originalCanvas.width, originalCanvas.height)
  return [ originalCanvas, newCanvas ]
}

export const save = async (imagePath: string, canvas: any) => {
  return new Promise(resolve => {
    try {
      setTimeout(resolve, 300) //TODO: remove this and close out gracefully
      checkImagePath(imagePath)
      const out = fs.createWriteStream(imagePath)
      const stream = canvas.pngStream()
      stream.on('end', _ => console.log('stream-> new png created'))
      stream.pipe(out)
    } catch (err) {
      console.error(err)
    }
  })
}
