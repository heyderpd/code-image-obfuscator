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
  const img = new Image()
  img.src = fs.readFileSync(imagePath)
  return new npmCanvas(img.width, img.height)
}

export const save = (imagePath: string, canvas: any) => {
  checkImagePath(imagePath)
  const out = fs.createWriteStream(imagePath)
  const stream = canvas.pngStream()
  stream.on('data', chunk => out.write(chunk))
  stream.on('end', _ => console.log('new png created'))
}
