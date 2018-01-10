import throwError from './throw'
import newDraw from './draw'
import { dataSet, dataGet } from './data'

let Draw

const needInitializeDraw = () => {
  const reset = Draw && Draw.reset
  if (!Draw || typeof(reset) !== 'function') {
    throwError('need initialize draw')
  }
}

export const createDraw = (img, canvas, ctx = false) => {
  if (!ctx) {
    ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, img.width, img.height)
  }
  Draw = newDraw(canvas, ctx)
}

export const injectDataToCanvas = (text, merge) => {
  needInitializeDraw()
  if (text === undefined) {
    throwError('param "text" is undefined')
  }
  dataSet(Draw, text, merge)
}

export const getInjectedData = merge => {
  needInitializeDraw()
  return dataGet(Draw, merge)
}

export const getCanvas = () => {
  needInitializeDraw()
  return Draw.getCanvas()
}
