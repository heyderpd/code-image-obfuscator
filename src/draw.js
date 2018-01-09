
import { PtoXY, Round } from './math'

const draw = function (_canvas, _ctx, dataLength) {
  let offset = null
  let canvas = null
  let ctx = null

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
    const [R, G, B, A] = C
    ctx.fillStyle = `rgba(${R},${G},${B},${A})`
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

  initialize(_canvas, _ctx, dataLength)

  return {
    reset,
    getCanvas,
    getOffset,
    setNext,
    getNext
  }
}

export default draw
