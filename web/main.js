
/*!
 * code-image-obfuscator
 * Copyright (c) 2016 heyderpd <heyderpd@gmail.com>
 * MIT Licensed
 */

const setData = function (config) {
  if (config.imgId  === undefined) { throw 'img-obfuscator: param "imgId" is undefined' }
  if (config.text  === undefined) { throw 'img-obfuscator: param "text" is undefined' }
  if (typeof(config.imgId) === 'string') {
    var img = document.getElementById(config.imgId)

    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, img.width, img.height)

    Dw.Initialize(canvas, ctx)
    Dt.Set(config.text)

    if(config.canvasId) {
      writeCanvas(config.canvasId)
    }
  } else {
    Dt.Set(config.text, false)
  }
}

const getData = function() {
  return Dt.Get()
}

const setCanvas = function() { // TODO funcao incompleta
}

const getCanvas = function() {
  Dw.Canvas
}

var writeCanvas = function writeCanvas(CanvasID) {
  var Canvas = document.getElementById(CanvasID)
  Dw.Canvas.id = Canvas.id
  Dw.Canvas.style = Canvas.style
  Dw.Canvas.className = Canvas.className
  Canvas.parentNode.replaceChild(Dw.Canvas, Canvas)
};

// required's
const { Co, Dt, Dw, MLib } = require('../src/lib')

const cio = {
  setData: setData,
  getData: getData,
  setCanvas: getCanvas,
  getCanvas: getCanvas,
  renderCanvas: writeCanvas
}

window.module = { cio: cio }

module.exports = cio
