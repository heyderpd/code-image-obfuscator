export const load = (canvasId: string) => {
  const originalCanvas = document.getElementById(canvasId)
  const newCanvas = document.createElement('canvas')
  return [ originalCanvas, newCanvas ]
}

export const save = async (imagePath: string, canvas: any) => {}
