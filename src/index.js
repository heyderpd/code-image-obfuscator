
/*!
 * code-image-obfuscator
 * Copyright (c) 2016 heyderpd <heyderpd@gmail.com>
 * MIT Licensed
 */

const setImg = function(pathFile) {
  if (pathFile.split('.').pop() !== 'png') { throw 'img-obfuscator: image need to be png' }
  if (typeof(pathFile) === 'string') {
    const photo = fs.readFileSync(pathFile)

    const img = new image
    img.src = photo

    const canvas = new npmCanvas(img.width, img.height)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, img.width, img.height)

    Dw.Initialize(canvas, ctx)
  }
}

const setData = function(config) {
  if (config.text  === undefined) { throw 'img-obfuscator: param "text" is undefined' }
  if (typeof(config.pathFile) === 'string') {
    setImg(config.pathFile)
    Dt.Set(config.text)
  } else {
    Dt.Set(config.text, false)
  }
}

const getData = function() {
  return Dt.Get()
}

const getCanvas = function() {
  return Dw.Canvas
}

const savePng = function(pathFile) {
  if (typeof(pathFile) === 'string') {
    const out = fs.createWriteStream(pathFile)
    const stream = Dw.Canvas.pngStream()

    stream.on('data', function(chunk){
      out.write(chunk)
    })

    stream.on('end', function(){
      console.log('new png created')
    })
  }
}

// required's
const { Co, Dt, Dw, MLib } = require('./lib')
const fs = require('fs')
const npmCanvas = require('canvas')
const image = npmCanvas.Image

module.exports = {
  load: setImg,
  save: savePng,
  convert: setData,
  revert:  getData,
  canvas: getCanvas
}
