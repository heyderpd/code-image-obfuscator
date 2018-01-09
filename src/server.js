import fs from 'fs'
import npmCanvas, { Image } from 'canvas'

import throwError from './throw'
import {
  createDraw,
  getCanvas as _getCanvas,
  getInjectedData,
  injectDataToCanvas
} from './main'

let fileLoaded = false

const validateStringPath = pathFile => {
  if (pathFile && typeof(pathFile) === 'string' && pathFile.length > 0) {
    if (pathFile.split('.').pop() !== 'png') {
      throwError('image need to be png')
    }
    return null
  }
  throwError('invalid path', pathFile)
}

export const load = pathFile => {
  validateStringPath(pathFile)
  try {
    const img = new Image()
    img.src = fs.readFileSync(pathFile)

    const canvas = new npmCanvas(img.width, img.height)
    createDraw(img, canvas)
    fileLoaded = true

  } catch (err) {
    console.log(err)
    fileLoaded = false
  }
}

export const save = pathFile => {
  validateStringPath(pathFile)

  const out = fs.createWriteStream(pathFile)
  const stream = _getCanvas().pngStream()

  stream.on('data', chunk => out.write(chunk))
  stream.on('end', _ => console.log('new png created'))
}

export const injectData = text => {
  if (fileLoaded) {
    injectDataToCanvas(text, true)
  }
}

export const recoveryData = _ => {
  if (fileLoaded) {
    return getInjectedData(true)
  }
}

export const getCanvas = _getCanvas
