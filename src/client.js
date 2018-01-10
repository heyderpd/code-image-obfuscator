import throwError from './throw'
import {
  createDraw,
  getCanvas as _getCanvas,
  getInjectedData,
  injectDataToCanvas
} from './main'

const state = {}

const validateString = (name, value) => {
  if (value) {
    if (typeof(value) !== 'string') {
      throwError(`param "${name}" is invalid`, value)
    }

  } else {
    throwError(`param "${name}" is undefined`)
  }
}

const loadImg = function (imgId) {
  validateString('imgId', imgId)

  state.imgLoaded = true
  const img = document.getElementById(imgId)
  const canvas = document.createElement('canvas')
  createDraw(img, canvas)
}

const loadCanvas = function (canvasId) {
  validateString('canvasId', canvasId)

  state.imgLoaded = true
  const canvas = document.getElementById(canvasId)
  const ctx = canvas.getContext('2d')
  createDraw(false, canvas, ctx)
}

const setData = function ({ imgId, canvasId, text }) {
  canvasId && validateString('canvasId', canvasId)
  validateString('text', text)

  if (typeof(imgId) === 'string') {
    state.imgLoaded = true
    loadImg(imgId)
    injectDataToCanvas(text, true)
    if (canvasId) {
      writeCanvas(canvasId)
    }

  } else {
    state.imgLoaded = false
    injectDataToCanvas(text, false)
  }
}

const getData = function() {
  if (state.imgLoaded) {
    return getInjectedData(true)
  } else {
    return getInjectedData(false)
  }
}

const getCanvas = _getCanvas

const writeCanvas = function writeCanvas(CanvasID) {
  const Canvas = document.getElementById(CanvasID)
  const _Canvas = _getCanvas()
  _Canvas.id = Canvas.id
  _Canvas.style = Canvas.style
  _Canvas.className = Canvas.className
  Canvas.parentNode.replaceChild(_Canvas, Canvas)
};

const cio = {
  load:{
    img: loadImg,
    canvas: loadCanvas
  },
  data: {
    set: setData,
    get: getData
  },
  canvas: {
    set: writeCanvas,
    get: getCanvas
  }
}

if (window.module) {
  window.module.cio = cio

} else {
  window.module = { cio }
}
