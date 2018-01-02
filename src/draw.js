
import { PtoXY, Round } from './math'

const draw = function (...args) {
  let offset = null
  let canvas = null
  let ctx = null
  initialize(...args)

  const initialize = (_canvas, _ctx, dataLength = 0) => {
    canvas = _canvas
    ctx = _ctx
    reset()
  }

  const reset = _ => {
    offset = 0
  }

  const getCanvas = _ => canvas

  const xNext = (F, P, C) => {
    P = PtoXY(P, canvas.width)
    return F(P, C)
  }

  const setOffset = C => {
    xNext(setPixel, offset, C)
  }

  const setNext = C => {
    setOffset(C)
    offset += 1
  }

  const setPixel = (P, C) => {
    ctx.fillStyle = 'rgba(' + C[0] + ',' + C[1] + ',' + C[2] + ',' + C[3] + ')'
    ctx.fillRect(P.x, P.y, 1, 1)
  }

  const getPixel = P => {
    return ctx.getImageData(P.x, P.y, 1, 1).data
  }

  const getOffset = _ => {
    return xNext(getPixel, offset)
  }

  const getNext = _ => {
    var Px = getOffset()
    offset += 1
    return Px
  }

  return {
    initialize,
    reset,
    getCanvas,
    getOffset,
    setNext,
    getNext
  }
}

export default draw
