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
  checkImagePath(imagePath)
  const originalCanvas = new Image()
  originalCanvas.src = fs.readFileSync(imagePath)
  const newCanvas = new npmCanvas(originalCanvas.width, originalCanvas.height)
  return [ originalCanvas, newCanvas ]
}

export const save = async (imagePath: string, canvas: any) => {
  return new Promise(resolve => {
    try {
      checkImagePath(imagePath)
      const out = fs.createWriteStream(imagePath)
      console.log('***********1', { out, canvas })
      const stream = canvas.pngStream()
      console.log('***********2', { stream })
      stream.on('data', chunk => out.write(chunk))
      stream.on('end', _ => {
        console.log('new png created')
        resolve('created')
      })
    } catch (err) {
      console.error(err)
    }
  })
}
