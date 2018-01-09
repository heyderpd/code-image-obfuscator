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
    throwError(`param "${name}" is invalid`, value)

  } else {
    throwError(`param "${name}" is undefined`)
  }
}

const setData = function ({ imgId, canvasId, text }) {
  validateString('canvasId', canvasId)
  validateString('text', text)

  if (typeof(imgId) === 'string') {
    state.imgLoaded = true
    const img = document.getElementById(imgId)
    const canvas = document.createElement('canvas')
    createDraw(img, canvas)
    injectDataToCanvas(text, true)

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
  Dw.Canvas.id = Canvas.id
  Dw.Canvas.style = Canvas.style
  Dw.Canvas.className = Canvas.className
  Canvas.parentNode.replaceChild(Dw.Canvas, Canvas)
};

const cio = {
  set: setData,
  get: setData,
  canvas: {
    set: setCanvas,
    get: getCanvas
  },
  render
}

// window.module = { cio: cio }

module.exports = cio
