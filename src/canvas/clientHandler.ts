export const load = (canvasId: string) => {
  const originalCanvas = document.getElementById(canvasId)
  const newCanvas = document.createElement('canvas')
  return [ originalCanvas, newCanvas ]
}

export const save = (canvasId: string, canvas: any) => {
  const newCanvas: any = document.getElementById(canvasId)
  const ctx = newCanvas.getContext('2d')
  ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height)
}
