
/*!
 * code-image-obfuscator
 * Copyright (c) 2016 heyderpd <heyderpd@gmail.com>
 * MIT Licensed
 */

//config
const Co = {
  R: 3, //RGBA
  C: 3, //CHAR
  L: 8, //CHAR LEN
  P: 8  //PIXEL
}

//Data
const Dt = {
  Head: '!NPM',
  Tail: 'code-image-obfuscator!',
  Merge: false,
  Memo: '',
  Base: null,
  Set: function(text) {
    Dt.Memo = Dt.Head +text +Dt.Tail
    Dw.offset = 0
    if (Dt.Merge) {
      const limit = MLib.Round(Dt.Memo.length, Co.C)
      for (let i=0; i<limit; i++) {
        let r = i *Co.C
        let STREAM = ''
        for (let b=0; b<Co.C; b++) {
          let BIN = MLib.ToCode(Dt.Memo[b +r]).toString(2)
          while (BIN.length < Co.L){
            BIN = '0'+BIN
          }
          STREAM += BIN
        }
        for (let j=0; j<Co.P; j++) {
          let r = j *Co.R
          let Pixel = Dw.getOffset()
          for (let p=0; p<Co.R; p++) {
            let odd = Pixel[p] %2
            let BIT = STREAM[p +r]
            if (!odd && BIT === '1') {
              Pixel[p] += 1
            } else if (odd && BIT === '0') {
              Pixel[p] -= 1
            }
          }
          let Color = [ Pixel[0], Pixel[1], Pixel[2], 255 ]
          Dw.setNext(Color)
        }
      }
    } else {
      const limit = MLib.Round(Dt.Memo.length, 4)
      for (let i=0; i<limit; i++) {
        let j = i *3
        let C = [ Dt.Memo[j], Dt.Memo[j+1], Dt.Memo[j+2], Dt.Memo[j+3] ]
        C = MLib.Process(MLib.ToCode, C)
        Dw.getOffset()
        Dw.setNext(C)
      }
    }
    return Dw.Canvas
  },
  Get: function() {
    Dw.offset = 0
    Dt.Memo = ''
    if (Dt.Merge) {
      const limit = MLib.Round(Dw.Canvas.width *Dw.Canvas.height, Co.P)
      for (let i=0; i<limit; i++) {
        let STREAM = ''
        for (let j=0; j<Co.P; j++) {
          let Pixel = Dw.getNext()
          for (let p=0; p<Co.R; p++) {
            let Color = Pixel[p]
            let BIT = String(Pixel[p] %2)
            STREAM += BIT
          }
        }
        for (let j=0; j<Co.C; j++) {
          let r = j *Co.L
          let BIN = ''
          for (let k=0; k<Co.L; k++) {
            BIN += STREAM[k +r]
          }
          let DEC = parseInt(BIN, 2)
          Dt.Memo += MLib.ToChar(DEC)
        }
      }
    } else {
      const limit = Dw.Canvas.width *Dw.Canvas.height
      for (let i=0; i<limit; i++) {
        let Pixel = Dw.getNext()
        let C = [ Pixel[0], Pixel[1], Pixel[2], Pixel[3] ]
        C = MLib.Process(MLib.ToChar, C)
        Dt.Memo += C[0] +C[1] +C[2] +C[3]
      }
    }
    const Pattern = new RegExp(`^(${Dt.Head})([\\w\\W]*)(${Dt.Tail})[\\w\\W]*$`)
    let result = null
    if ((result = Pattern.exec(Dt.Memo)) !== null) {
      if (Dt.Head === result[1] && result[3] === Dt.Tail) {
        Dt.Memo = result[2]
        return Dt.Memo
      }
    }
    throw new Error("image don't have hide data")
  }
}

//Draw
const Dw = {
  Canvas: null,
  Ctx: null,
  offset: null,
  Initialize: function(canvas, ctx) {
    if (canvas) {
      if (Dt.Memo.length /Co.C > canvas.width *canvas.height /Co.P)
        throw new Error("text is too long, this img can't suport this")
      Dt.Base = canvas.width
      Dw.Canvas = canvas
      Dw.Ctx = ctx
      Dt.Merge = true
    } else {
      let sqrt = Math.sqrt( MLib.Round(Dt.Memo.length, 3) )
      Dt.Base = MLib.Round(sqrt, 1)
      if(Dt.Base %1)
        Dt.Base += 1

      Dw.Canvas = new npmCanvas(Dt.Base, Dt.Base)
      Dw.Ctx = Dw.Canvas.getContext('2d')
    }
  },
  setOffset: function(C) {
    Dw.xNext(Dw.setPixel, Dw.offset, C)
  },
  setNext: function(C) {
    Dw.setOffset(C)
    Dw.offset += 1
  },
  setPixel: function(P, C) {
    Dw.Ctx.fillStyle = 'rgba('+C[0]+','+C[1]+','+C[2]+','+C[3]+')'
    Dw.Ctx.fillRect(P.x, P.y, 1, 1)
  },
  xNext: function(F, P, C) {
    P = new MLib.PtoXY(P, Dt.Base)
    return F(P, C)
  },
  getOffset: function() {
    return Dw.xNext(Dw.getPixel, Dw.offset)
  },
  getNext: function() {
    let Px = Dw.getOffset()
    Dw.offset += 1
    return Px
  },
  getPixel: function(P) {
    return Dw.Ctx.getImageData(P.x,P.y, 1,1).data
  }
}

//Math Lib
const MLib = {
  PtoXY: function(P, B) {
    this.x = P %B,
    this.y = (P -this.x) /B
  },
  Round: function(Num, Div) {
    let R = Num %Div
    let Res = Math.round((Num -R) /Div)
    if (Res && R)
      Res += 1
    return Res
  },
  Process: function(Work, List) {
    Object.keys(List).forEach( function(key) {
      List[key] = Work(List[key])
    })
    return List
  },
  ToCode: function(Item) {
    if(Item == undefined)
      Item = String.fromCharCode(0)
    return Item.charCodeAt()
  },
  ToChar: function(Item) {
    return String.fromCharCode(Item)
  }
}

module.exports = {
  Co : Co,
  Dt : Dt,
  Dw : Dw,
  MLib : MLib
}
