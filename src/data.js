import { characterLimit, colorLength, pixelSize, wordLength } from './config'
import { Round, ToCode, ToChar, Process } from './math'
import throwError from './throw'

const head = '{2-0A}->'
const tail = '<-{NPM~CODE-IMAGE-OBFUSCATOR}'
const extractPattern = new RegExp(`^(${head})([\\w\\W]*)(${tail})[\\w\\W]*$`)
let message = ''

const clearMessage = _ => {
  message = ''
}

const createMessage = text => {
  message = head +text +tail
}

const extractMessage = _ => {
  let result = null
  if ((result = extractPattern.exec(message)) !== null) {
    if (head === result[1] && result[3] === tail) {
      return message = result[2]
    }
  }
  throw new Error("image don't have hide data")
}

const throwIfCantSuportMessage = draw => {
  const canvas = draw.getCanvas()
  if (canvas && message.length /characterLimit > canvas.width *canvas.height /pixelSize) {
    throw new Error("text is too long, this img can't suport this")
  }
}

export const dataSet = (draw, text, merge = false) => {
  createMessage(text)
  throwIfCantSuportMessage(draw)
  draw.reset()

  if (merge) {
    const limit = Round(message.length, characterLimit)
    let STREAM, BIN, BIT, ODD, Pixel, msgRef, cvsRef

    for (let i = 0; i < limit; i++) {

      msgRef = i *characterLimit
      STREAM = ''
      for (let b = 0; b < characterLimit; b++) {
        BIN = ToCode(message[b +msgRef]).toString(2)
        while (BIN.length < wordLength) {
          BIN = '0' + BIN
        }
        STREAM += BIN
      }

      for (let j = 0; j < pixelSize; j++) {
        cvsRef = j *colorLength
        Pixel = draw.getOffset()

        for (let p = 0; p < colorLength; p++) {
          ODD = Pixel[p] %2
          BIT = STREAM[p +cvsRef]
          if (!ODD && BIT === '1') {
            Pixel[p] += 1
          } else if (ODD && BIT === '0') {
            Pixel[p] -= 1
          }
        }

        const [R, G, B] = Pixel
        draw.setNext([R, G, B, 255])
      }
    }

  } else {
    const limit = Round(message.length, 4)
    let offset, R, G, B, Color

    for (var i = 0; i < limit; i++) {
      offset = i * 3
      R = message[offset]
      G = message[offset +1]
      B = message[offset +2]
      Color = Process(MLib.ToCode, [R, G, B, 255])
      draw.getOffset()
      draw.setNext(Color)
    }
  }

  return draw.getCanvas()
}

export const dataGet = (draw, merge = false) => {
  draw.reset()
  clearMessage()

  if (merge) {
    const Canvas = draw.getCanvas()
    const limit = Round(Canvas.width *Canvas.height, pixelSize)
    let STREAM, BIN, BIT, Pixel, msgRef

    for (let i = 0; i < limit; i++) {
      STREAM = ''
      for (let j = 0; j < pixelSize; j++) {
        Pixel = draw.getNext()
        for (let p = 0; p < colorLength; p++) {
          BIT = String(Pixel[p] % 2)
          STREAM += BIT
        }
      }

      for (let j = 0; j < characterLimit; j++) {
        msgRef = j *wordLength
        BIN = ''
        for (let k = 0; k < wordLength; k++) {
          BIN += STREAM[k +msgRef]
        }
        message += ToChar(parseInt(BIN, 2))
      }
    }

  } else {
    const limit = draw.Canvas.width *draw.Canvas.height
    let Pixel, R, G, B
    for (let i = 0; i < limit; i++) {
      [R, G, B] = draw.getNext()
      message += Process(ToChar, [R, G, B]).join('')
    }
  }

  return extractMessage()
}
