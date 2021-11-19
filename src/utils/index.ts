import { wordLength } from '../config'
import { PixelPostion } from '../interfaces'

export const PositionToXY = (Position: number, Base: number): PixelPostion => {
  const X = Position % Base
  const Y = (Position - X) / Base
  return {
    X,
    Y,
  }
}

export const IsODD = (value) => {
  return value % 2
}

export const Round = (Num, Div) => {
  const res = Math.round((Num -(Num %Div)) /Div)
  return Num %Div
    ? res +1
    : res
}

export const Process = (Work, List) => {
  Object
    .keys(List)
    .forEach(key => List[key] = Work(List[key]))
  return List
}

const filledZeros = new Array(wordLength).fill(0).join('')

export const convertCharToBinary = (char = '\u0000') => {
  return (
    filledZeros + char
      .charCodeAt(0)
      .toString(2)
  ).substr(-wordLength)
}

export const ToChar = Item => String.fromCharCode(Item)
