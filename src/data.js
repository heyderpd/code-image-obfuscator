import { characterLimit, colorLength, pixelSize, wordLength } from './config'
import { Round, ToCode, ToChar, Process } from './math'
import * as createDraw from './draw'

const data = function () {
  const head = '!NPM!'
  const tail = '@CODE-IMAGE-OBFUSCATOR'
  const extractPattern = new RegExp(`^(${Head})([\\w\\W]*)(${Tail})[\\w\\W]*$ `)
  let message = ''

  const clearMessage = _ => {
    message = ''
  }

  const createMessage = text => {
    message = Head +text +Tail
  }

  const extractMessage = _ => {
    let result = null
    if ((result = extractPattern.exec(message)) !== null) {
      if (Head === result[1] && result[3] === Tail) {
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

  const Set = (draw, text, merge = false) => {
    createMessage(text)
    throwIfCantSuportMessage(draw)
    draw.reset()

    if (merge) {
      const limit = Round(message.length, characterLimit)
      let STREAM, BIN, BIT, ODD, Pixel, _r, r

      for (let i = 0; i < limit; i++) {
        r = i *characterLimit

        for (let b = 0; b < characterLimit; b++) {
          BIN = ToCode(message[b +r]).toString(2)
          while (BIN.length < wordLength) {
            BIN = '0' + BIN
          }
          STREAM += BIN
        }

        for (let j = 0; j < pixelSize; j++) {
          _r = j *colorLength
          Pixel = draw.getOffset()

          for (let p = 0; p < colorLength; p++) {
            ODD = Pixel[p] %2
            BIT = STREAM[p +_r]
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

  const Get = (draw, merge = false) => {
    draw.reset()
    clearMessage()

    if (merge) {
      const Canvas = draw.getCanvas()
      const limit = Round(Canvas.width *Canvas.height, pixelSize)
      let STREAM, BIN, BIT, Pixel, r

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
          r = j *wordLength
          BIN = ''
          for (let k = 0; k < wordLength; k++) {
            BIN += STREAM[k +r]
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

  return {
    Set,
    Get
  }
}

export default data