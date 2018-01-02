import fs from 'fs'
import npmCanvas, { Image } from 'canvas'

import config from './config'
import math from './math'
import draw from './draw'
import data from './data'

/*
var Co = _require.Co
var Dt = _require.Dt
var Dw = _require.Dw
var MLib = _require.MLib

var fs = require('fs')
var npmCanvas = require('canvas')
var image = npmCanvas.Image
*/

export const load = pathFile => {
  if (pathFile.split('.').pop() !== 'png') {
    throw 'img-obfuscator: image need to be png'
  }
  if (typeof pathFile === 'string') {
    var photo = fs.readFileSync(pathFile)

    var img = new Image()
    img.src = photo

    var canvas = new npmCanvas(img.width, img.height)
    var ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, img.width, img.height)

    Dw.Initialize(canvas, ctx)
  }
}

export const save = pathFile => {
  if (typeof pathFile === 'string') {
    (function () {
      var out = fs.createWriteStream(pathFile)
      var stream = Dw.Canvas.pngStream()

      stream.on('data', function (chunk) {
        out.write(chunk)
      })

      stream.on('end', function () {
        console.log('new png created')
      })
    })()
  }
}

export const convert = config => {
  if (config.text === undefined) {
    throw 'img-obfuscator: param "text" is undefined'
  }
  if (typeof config.pathFile === 'string') {
    setImg(config.pathFile)
    Dt.Set(config.text)
  } else {
    Dt.Set(config.text, false)
  }
}

export const revert = _ => Dt.Get()

export const getCanvas = _ => Dw.Canvas
