import * as fs from 'fs'
import * as npmCanvas from 'canvas'
const Image = npmCanvas.Image


const checkImagePath = pathFile => {
  if (pathFile && typeof(pathFile) === 'string' && pathFile.length > 0) {
    if (pathFile.split('.').pop() !== 'png') {
      throw new Error('image need to be png')
    }
    return null
  }
  throw new Error(`invalid path=${pathFile}`)
}

export const load = (imagePath: string) => {
  console.log('loading png')
  checkImagePath(imagePath)
  const originalCanvas = new Image()
  originalCanvas.src = fs.readFileSync(imagePath)
  const newCanvas = new npmCanvas(originalCanvas.width, originalCanvas.height)
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
